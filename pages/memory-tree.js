import Head from "next/head";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { collection, addDoc } from "firebase/firestore";

function MemoryTree() {
  const [showForm, setShowForm] = useState(false);
  const [story, setStory] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Head>
        <title>Memory Tree</title>
      </Head>
      <Navbar />
      <div className="text-justify mt-2 lg:mt-6 mb-7 lg:flex lg:items-center lg:shadow-lg">
        <div className="relative h-[500px] flex flex-col justify-evenly items-center lg:h-[600px] text-xl lg:w-3/5 z-10 ">
          <p className="text-5xl xl:text-[80px] font-bold text-center mb-4 pt-6">
            Memory-Tree
          </p>
          <div className="text-lg  w-4/5 mx-auto mb-2">
            <p className="italic">
              <span className="font-bold">"</span> Written in these walls are
              the stories that I can't explain... <br />I leave my heart open
              but it stays right here empty for days{"  "}
              <span className="font-bold">"</span>
            </p>
            <p className="text-right font-bold text-gray-500">
              ~ One-Direction
            </p>
          </div>
          <div className="lg:text-2xl lg:font-semibold lg:w-11/12 lg:mx-auto">
            <p className=" px-2">
              Do you have any interesting encounters or memories related to
              MMNCT?
            </p>
            <p className=" px-2">Why not share it with others?</p>

            <p className="lg:mt-10 mt-5 px-2">
              We have something special planned for you, which will give your
              experience a platform so that it can reach more people!
            </p>
          </div>
          {/* <div className="h-[400px] w-full lg:h-[600px] lg:w-full absolute bottom-0 bg-gradient-to-b to-black from-transparent -z-10"></div> */}
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-2/5  text-xl flex flex-col items-center gap-4 mb-4 px-2"
        >
          <p className="">Here, write it down and send it to us right away. </p>
          <textarea
            placeholder="Start typing here..."
            className="px-2 py-2 focus:bg-white focus:border-purple-500 xl:h-[360px] rounded-md border-black w-full lg:w-4/5 mx-auto h-44"
            value={story}
            onChange={(e) => {
              setStory(e.target.value);
            }}
          ></textarea>
          <p className="">Or do you have any special snap of the occasion?</p>
          <input type={`file`} className="mx-auto w-[250px]" />
          <input
            type={`submit`}
            className="w-2/5 border bg-pink-500 text-white py-2 rounded-md hover:shadow-lg font-semibold cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
}

export default MemoryTree;
