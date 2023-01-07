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
  onSnapshot,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";
import moment from "moment";

const photocontest = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  // likedpost is an array of post ids which are liked by the user
  const [likedPost, setLikedPost] = useState({});

  // get all the posts from firestore in realtime
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "photocontest"),
      (querySnapshot) => {
        // const source = querySnapshot.metadata.hasPendingWrites
        //   ? "Local"
        //   : "Server";
        // console.log(source);
        const post = [];
        querySnapshot.forEach((doc) => {
          post.push({ ...doc.data(), id: doc.id });
          if (!likedPost[doc.id]) {
            likedPost[doc.id] = false;
          }
        });
        setPosts(post);
      }
    );
    return unsubscribe;
  }, []);

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

    // Upload the image to firebase storage
    const uploadTask = await uploadBytes(storageRef, file);

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
    setLoading(false);
    // Close the modal
    setImageUrl(null);
    setSelectedImage(null);
  };

  const likePost = async (id) => {
    // Get the post from the database
    const post = posts.find((post) => post.id === id);

    // Increment the likes if the user has not liked the post else decrement the likes
    const newLikes = likedPost[id] ? post.likes - 1 : post.likes + 1;

    // Update the likedPost object
    setLikedPost({ ...likedPost, [id]: !likedPost[id] });

    // Update the likes in the database
    await updateDoc(doc(db, "photocontest", id), {
      likes: newLikes,
    });
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
              <p className="text-3xl lg:text-4xl font-semibold">Hola Amigos!</p>
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
              </div>
            </div>
          </div>
        </div>
        {posts.length > 0 ? (
          <>
            <p className="mt-14 lg:mt-0 text-center text-2xl font-semibold">
              Photos posted by others
            </p>
            <div className="mt-2 mb-12 lg:mb-12 border-b-4 border-[#F4A68D] w-10/12 md:w-2/5 lg:w-3/12 mx-auto"></div>
            {posts.map((post, index) => (
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
                  <div className="flex flex-row justify-between py-4 bg-gray-100 px-4">
                    <div className="flex justify-center items-center gap-x-3">
                      <p className="text-xl">
                        <div
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            likePost(post.id);
                          }}
                        >
                          {likedPost[post.id] ? (
                            <p>
                              <FcLike />
                            </p>
                          ) : (
                            <p>
                              <AiOutlineHeart />
                            </p>
                          )}
                        </div>
                      </p>
                      <p>{post.likes} likes</p>
                    </div>
                    <div className="text-sm font-light">
                      {moment(post.timestamp).fromNow()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
