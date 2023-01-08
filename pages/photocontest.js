import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../components/db/Firebase";
import {
  collection,
  addDoc,
  query,
  updateDoc,
  getDocs,
  doc,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import moment from "moment";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import imageCompression from "browser-image-compression";

//Sever side props to get the post data from the firestore
export async function getServerSideProps(context) {
  const postsRef = collection(db, "photocontest");
  const postsSnapshot = await getDocs(postsRef);
  // Stores in JSON format where key is id and value is the post data
  const posts = postsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // If user is logged in
  const session = await getSession(context);
  if (session) {
    const q = query(
      collection(db, "photocontest-likes"),
      where("googleId", "==", session.user.email)
    );
    const querySnapshot = await getDocs(q);
    const likes = querySnapshot.docs.map((doc) => doc.data());

    // Store the post likes in posts
    posts.forEach((post) => {
      post.liked = likes.some((like) => like.postId === post.id);
    });
  }

  // Add a field called isLoading to posts
  posts.forEach((post) => {
    post.isLoading = false;
  });

  // Sort the posts in descending order of likes
  posts.sort((a, b) => b.likes - a.likes);

  return {
    props: {
      posts: posts,
    },
  };
}

const photocontest = ({ posts }) => {
  const { data: session } = useSession();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postCount, setPostCount] = useState(3);
  const [likeUpdate, setLikeUpdate] = useState(false);

  //Function to upload the image into firebase storage
  const uploadImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    const file = selectedImage;
    //Get the name and enroll no. of the user
    const name = document.getElementById("name").value;
    const enroll = document.getElementById("enroll").value;

    // Alert if the user has not entered the name and enroll no.
    if (name === "" || enroll === "") {
      alert("Please enter your name and enroll no.");
      setLoading(false);
      return;
    }

    // Get current timestamp and store in string
    const date = new Date();
    const timestamp = date.getTime();

    // Get firebase storage reference
    const storageRef = ref(
      storage,
      `photocontest/${enroll + "-" + timestamp.toString()}`
    );

    // Compress the image
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(file, options);

    // Upload the image to firebase storage
    const uploadTask = await uploadBytes(storageRef, compressedFile);

    // Get the download url of the image
    const downloadUrl = await getDownloadURL(uploadTask.ref);

    // Add the image to the database
    const docRef = await addDoc(collection(db, "photocontest"), {
      name: name,
      enroll: enroll,
      timestamp: timestamp,
      likes: 0,
      downloadUrl: downloadUrl,
    });

    //Update new post in posts
    posts.push({
      name: name,
      enroll: enroll,
      timestamp: timestamp,
      likes: 0,
      downloadUrl: downloadUrl,
      id: docRef.id,
    });

    setLoading(false);
    setImageUrl(null);
    setSelectedImage(null);
  };

  // Function to like or unlike the post
  const likePost = async (post) => {
    // If the user is not signed in then alert the user to sign in
    if (!session) {
      alert("Please sign in to like the post");
      return;
    }
    const id = post.id;

    posts.forEach((post) => {
      if (post.id === id) {
        post.isLoading = true;
      }
    });

    setLikeUpdate(!likeUpdate);

    // Increment the likes if the user has not liked the post else decrement the likes
    if (post.liked) {
      await updateDoc(doc(db, "photocontest", id), {
        likes: post.likes - 1,
      });
      await deleteDoc(
        doc(db, "photocontest-likes", id + "-" + session.user.email)
      );
    } else {
      await updateDoc(doc(db, "photocontest", id), {
        likes: post.likes + 1,
      });
      await setDoc(
        doc(db, "photocontest-likes", id + "-" + session.user.email),
        {
          postId: id,
          googleId: session.user.email,
        }
      );
    }

    posts.forEach((post) => {
      if (post.id === id) {
        post.isLoading = false;
      }
    });

    setLikeUpdate(!likeUpdate);

    // Update the post in posts
    post.liked = !post.liked;
    post.likes = post.liked ? post.likes + 1 : post.likes - 1;
  };

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  return (
    <div>
      <Head>
        <title>Click-a-Sensation</title>
      </Head>
      <Navbar />
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-gray-200 bg-opacity-50">
          <Image
            src="/loader.gif"
            alt="loading"
            width={300}
            height={300}
            className="rounded-full"
          />
        </div>
      )}
      {imageUrl && selectedImage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-11/12 md:w-2/3 lg:w-6/12 rounded-xl shadow-lg">
            <div className="flex flex-col items-center justify-center gay-y-2">
              <div className="my-4 w-11/12 shadow-lg">
                <Image
                  src={imageUrl}
                  alt={selectedImage.name}
                  width={1920}
                  height={1080}
                />
              </div>
              <input
                type="text"
                placeholder="Enter your Enroll No."
                className="w-11/12 px-4 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-[#F4A68D]"
                id="enroll"
              />
              <input
                type="text"
                placeholder="Enter your Name"
                className="w-11/12 px-4 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-[#F4A68D]"
                id="name"
              />

              <div className="flex flex-row items-center justify-center gap-4 py-4">
                <button
                  className="bg-[#F4A68D] text-white px-4 py-2 rounded-lg"
                  onClick={() => {
                    setImageUrl(null);
                    setSelectedImage(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#F4A68D] text-white px-4 py-2 rounded-lg"
                  onClick={uploadImage}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="min-h-screen pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Image
            src="/contest-hero.jpeg"
            alt="Contest"
            width={1920}
            height={1080}
          />
          <div className="flex flex-col items-center justify-center px-8 lg:px-16">
            <div className="text-center">
              <p className="text-3xl lg:text-4xl font-semibold">
                Hola {session ? session.user.name.split(" ")[0] : "Amigos"}!
              </p>
              <p className="text-xl md:text-2xl pt-4 lg:pt-8 font-light">
                Explore the wonderful pictures clicked by people and don't
                forget to like them.
              </p>
              <input
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: "none" }}
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
              <div className="flex flex-row items-center justify-center gap-4 pt-12">
                {session ? (
                  <>
                    <div
                      className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 cursor-pointer"
                      onClick={() =>
                        document.getElementById("select-image").click()
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-10 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <p className="text-lg md:text-xl">Add your memory</p>
                  </>
                ) : (
                  <button
                    className="bg-[#F4A68D] text-white px-4 py-2 rounded-lg text-lg md:text-xl"
                    onClick={() => {
                      signIn("google");
                    }}
                  >
                    Sign in with Google
                  </button>
                )}
              </div>
              {/* {session && (
                <button
                  onClick={() => {
                    signOut();
                    
                  }}
                  className="mt-4 text-lg md:text-xl bg-[#F4A68D] text-white px-4 py-2 rounded-lg"
                >
                  Sign out
                </button>
              )} */}
            </div>
          </div>
        </div>
        {posts.length > 0 ? (
          <>
            <p className="mt-14 lg:mt-0 text-center text-2xl font-semibold">
              Photos posted by others
            </p>
            <div className="mt-2 mb-12 lg:mb-12 border-b-4 border-[#F4A68D] w-10/12 md:w-2/5 lg:w-3/12 mx-auto"></div>
            {posts
              .slice(0, Math.min(postCount, posts.length))
              .map((post, index) => (
                <div
                  className="mt-8 flex flex-col items-center justify-center"
                  key={index}
                >
                  <div className="shadow-lg border w-11/12 md:w-2/3 lg:w-1/3">
                    <p className="py-4 bg-gray-100 px-4 font-semibold">
                      {post.enroll} - {post.name}
                    </p>
                    <Image
                      src={post.downloadUrl}
                      alt="Contest"
                      width={1920}
                      height={1080}
                    />
                    <div className="flex flex-row justify-between items-center py-4 bg-gray-100 px-4">
                      <div className="flex justify-center items-center gap-x-3">
                        <div
                          className="cursor-pointer text-xl"
                          onClick={(e) => {
                            e.preventDefault();
                            likePost(post);
                          }}
                        >
                          {post.isLoading && (
                            <div role="status">
                              <svg
                                aria-hidden="true"
                                class="inline w-5 h-5 items-center text-gray-200 animate-spin dark:text-gray-600 fill-red-600 mt-0"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                              <span class="sr-only">Loading...</span>
                            </div>
                          )}
                          {post.liked
                            ? !post.isLoading && (
                                <p>
                                  <FcLike />
                                </p>
                              )
                            : !post.isLoading && (
                                <p>
                                  <AiOutlineHeart />
                                </p>
                              )}
                        </div>
                        <p>{post.likes} likes</p>
                      </div>
                      <div className="text-sm font-light">
                        {moment(post.timestamp).fromNow()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {postCount < posts.length && (
              <div className="flex justify-center items-center mt-8">
                <button
                  className="bg-[#F4A68D] text-white px-4 py-2 rounded-lg w-11/12 md:w-2/3 lg:w-1/3"
                  onClick={() => {
                    setPostCount(postCount + 3);
                  }}
                >
                  Load more Posts
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="py-28 lg:mt-0 text-center text-2xl font-semibold">
            No photos posted by others
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default photocontest;
