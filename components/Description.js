import Image from "next/image";
import React, { useState } from "react";
import CarouselComponent from "./CarouselComponent";
import { BsPinMapFill } from "react-icons/bs";

const Description = () => {
  const description =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";
  return (
    <div className="px-3">
      <div className="mt-24 flex flex-col">
        <p className="text-center text-gray-500">SVNIT, Surat</p>
        <div className="mx-auto">
          <Image src="/main.png" height={400} width={400} layout="fixed" />
        </div>
      </div>
      <p className="text-center mb-8 text-gray-500">
        January 25<sup>th</sup> - 29<sup>th</sup>
      </p>
      <hr />
      <p className="text-center leading-8 text-gray-700 text-lg px-3 my-7">
        {description}
      </p>
      <hr />
      <CarouselComponent />

      <p className="text-center text-gray-500 px-4 my-24 text-8xl font-semibold">
        <p className="text-6xl">"SVNIT's</p> largest{" "}
        <p className="text-6xl">Cricket tournament"</p>
      </p>
      <hr />
      <div
        className="my-20 text-white text-4xl text-center mx-6 flex flex-col justify-evenly"
        style={{
          backgroundImage: "url(/carousel/c-4.JPG)",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "500px",
        }}
      >
        {" "}
        <p className="text-sm -mb-16 font-semibold">
          Jaunary 25<sup>th</sup> - 29<sup>th</sup>
        </p>
        <p className="sm:text-9xl text-8xl font-semibold">SVNIT</p>
        <p className="text-2xl flex justify-center items-center">
          <BsPinMapFill className="mr-3" /> SAC Ground
        </p>
        <p className=" border-2 text-2xl sm:text-4xl border-white w-3/5 mx-auto p-4 cursor-pointer hover:bg-white hover:text-black transition duration-150 ease-in-out">
          View Fixtures
        </p>
      </div>
      <hr />
    </div>
  );
};

export default Description;
