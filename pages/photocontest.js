import Head from "next/head";
import Image from "next/image";
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";

const photocontest = () => {
  return (
    <div>
      <Head>
        <title>Click-a-Sensation</title>
      </Head>
      <Navbar />
      <div className="min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Image
            src="/contest-1.jpg"
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
              <div className="flex flex-row items-center justify-center gap-4 pt-12">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100">
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
        <p className="mt-14 lg:mt-0 text-center text-2xl font-semibold">
          Photos posted by others
        </p>
        <div className="mt-2 border-b-4 border-[#F4A68D] w-10/12 md:w-2/5 lg:w-3/12 mx-auto"></div>
        <div className="mt-16 lg:mt-12 flex flex-col items-center justify-center">
          <div className="shadow-lg border w-11/12 md:w-2/3 lg:w-1/3">
            <p className="py-4 bg-gray-100 pl-4 font-semibold">Shubham kumar</p>
            <Image
              src="/contest-1.jpg"
              alt="Contest"
              width={1920}
              height={1080}
            />
            <div className="flex flex-row justify-between py-4 bg-gray-100 px-4">
              <div className="flex justify-center items-center gap-x-3">
                <p className="text-xl">
                  <FcLike />
                </p>
                <p>90 likes</p>
              </div>
              <div className="text-sm">
                <p>Posted 2hrs ago</p>
              </div>

              {/* <AiOutlineHeart /> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default photocontest;
