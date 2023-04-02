import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../components/db/Firebase";
import { collection, addDoc, query, getDocs, where } from "firebase/firestore";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import imageCompression from "browser-image-compression";
import ContestPostCard from "../components/ContestPostCard";

function timestamptoDate(timestamp) {
  const date = new Date(timestamp);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${year}-${month}-${day}`;
  return currentDate;
}

function fetchDate() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${year}-${month}-${day}`;
  return currentDate;
}

//Sever side props to get the post data from the firestore
export async function getServerSideProps(context) {
  const postsRef = collection(db, "photocontest");
  const postsSnapshot = await getDocs(postsRef);
  const currentDate = fetchDate();
  // Stores in JSON format where key is id and value is the post data
  let posts = [];
  let winners = [];
  let max_likes_26 = 0;
  let max_likes_27 = 0;
  let max_likes_28 = 0;
  let max_likes_29 = 0;

  postsSnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.data());
    const postDate = timestamptoDate(doc.data().timestamp);
    if (postDate === currentDate) {
      posts.push({
        id: doc.id,
        ...doc.data(),
      });
    }

    // console.log(postDate);
    if (postDate === "2023-1-26" && doc.data().likes > max_likes_26) {
      winners[0] = {
        id: doc.id,
        ...doc.data(),
      };
      max_likes_26 = doc.data().likes;
    }
    if (postDate === "2023-1-27" && doc.data().likes > max_likes_27) {
      winners[1] = {
        id: doc.id,
        ...doc.data(),
      };
      max_likes_27 = doc.data().likes;
    }
    if (postDate === "2023-1-28" && doc.data().likes > max_likes_28) {
      winners[2] = {
        id: doc.id,
        ...doc.data(),
      };
      max_likes_28 = doc.data().likes;
    }
    if (postDate === "2023-1-29" && doc.data().likes > max_likes_29) {
      winners[3] = {
        id: doc.id,
        ...doc.data(),
      };
      max_likes_29 = doc.data().likes;
    }
  });

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

  // Sort the posts in descending order of likes
  posts.sort((a, b) => b.likes - a.likes);

  return {
    props: {
      posts: posts,
      winners: winners,
    },
  };
}

const photocontest = ({ posts, winners }) => {
  const { data: session } = useSession();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postCount, setPostCount] = useState(3);

  //Function to upload the image into firebase storage
  const uploadImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    const file = selectedImage;
    //Get the name and enroll no. of the user
    const name = document.getElementById("name").value;
    const enroll = document.getElementById("enroll").value;
    const mobile = document.getElementById("mobile").value;

    // Alert if the user has not entered the name and enroll no.
    if (name === "" || enroll === "" || mobile === "") {
      alert("Please enter all the fields first!");
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
      mobile: mobile,
    });

    //Update new post in posts
    posts.push({
      name: name,
      enroll: enroll,
      timestamp: timestamp,
      likes: 0,
      downloadUrl: downloadUrl,
      id: docRef.id,
      mobile: mobile,
    });

    setLoading(false);
    setImageUrl(null);
    setSelectedImage(null);
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {imageUrl && selectedImage && (
        <div className="z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white mt-4 w-11/12 md:w-2/3 lg:w-8/12 max-h-full rounded-b-xl shadow-lg overflow-auto animate-scale-in-center">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-x-4 lg:pr-4">
              <div className="shadow-lg lg:border-r-2">
                <Image
                  src={imageUrl}
                  alt={selectedImage.name}
                  height={1920}
                  width={1080}
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-y-2 w-11/12 my-6">
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
                <input
                  type="text"
                  placeholder="Enter mobile no."
                  className="w-11/12 px-4 py-2 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-[#F4A68D]"
                  id="mobile"
                />

                <div className="flex flex-row items-center justify-center gap-x-4 pt-2">
                  {!loading && (
                    <button
                      className="bg-[#F4A68D] text-white px-4 py-2 rounded-lg"
                      onClick={(e) => {
                        e.preventDefault();
                        setImageUrl(null);
                        setSelectedImage(null);
                      }}
                    >
                      Cancel
                    </button>
                  )}
                  {!loading && (
                    <button
                      className="bg-[#F4A68D] text-white px-4 py-2 rounded-lg"
                      onClick={uploadImage}
                    >
                      Upload
                    </button>
                  )}
                  {loading && (
                    <div className="bg-[#F4A68D] flex text-white px-4 py-2 rounded-lg gap-x-4">
                      Uploading
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="inline w-5 h-5 items-center text-gray-200 animate-spin fill-blue-500 mt-0"
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
                        <span className="sr-only">Uploading...</span>
                      </div>
                    </div>
                  )}
                </div>
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
              <p className="text-3xl lg:text-4xl font-semibold text-[#411F0D]">
                Hola {session ? session.user.name.split(" ")[0] : "Amigos"}!
              </p>
              <div className="text-xl md:text-2xl pt-4 lg:pt-8 font-light">
                {/* <p>Explore the wonderful pictures clicked by people and don't
                forget to like them.</p> */}
                <p className="font-normal pb-2">Thank you for participating!</p>
                <p className="text-lg md:text-xl ">
                  We are excited to announce the winners of the contest.
                </p>
              </div>
              {/* <input
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: "none" }}
                onChange={(e) => {
                  e.preventDefault();
                  setSelectedImage(e.target.files[0]);
                  //Reset the input
                  e.target.value = "";
                }}
              />
              <div className="flex flex-row items-center justify-center gap-4 pt-12">
                {session ? (
                  <>
                    <div
                      className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("select-image").click();
                      }}
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
              </div> */}
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
            <p className="mt-14 lg:mt-0 text-center text-2xl font-semibold text-[#411F0D]">
              Today's most liked Posts
            </p>
            <div className="mt-2 mb-12 lg:mb-12 border-b-4 border-[#F4A68D] w-10/12 md:w-2/5 lg:w-3/12 mx-auto"></div>
            {posts
              .slice(0, Math.min(postCount, posts.length))
              .map((post, index) => (
                <ContestPostCard key={index} post={post} />
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
          // <p className="py-28 lg:mt-0 text-center text-xl md:text-2xl font-semibold text-[#411F0D]">
          //   Sorry, no post is shared yet!
          //   <br />
          //   Be the first one to upload your memory.
          // </p>
          <>
            <p className="mt-14 lg:mt-0 text-center text-2xl font-semibold text-[#411F0D]">
              Winners of the contest
            </p>
            <div className="mt-2 mb-12 lg:mb-12 border-b-4 border-[#F4A68D] w-10/12 md:w-2/5 lg:w-3/12 mx-auto"></div>
            <div className="flex flex-col items-center justify-center">
              {winners.map((winner, index) => (
                <div className="shadow-lg w-11/12 md:w-2/3 lg:w-1/3 mb-8">
                  <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 py-2 text-center">
                    <p className="text-white font-semibold">
                      ✨ 🥇Winner - Day {index + 1} ✨
                    </p>
                  </div>
                  <div className="relative">
                    <Image
                      src={winner.downloadUrl}
                      alt="winner"
                      width={1920}
                      height={1080}
                    />
                    <div class="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-700 shadow-xl"></div>
                    <div className="absolute bottom-4 w-full text-white text-center font-light">
                      <p className="text-sm font-semibold">{winner.name}</p>
                      <p className="text-sm font-semibold">{winner.enroll}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default photocontest;
