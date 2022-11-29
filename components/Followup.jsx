import Image from "next/image";
import React from "react";
import TournamentDetails from "./TournamentDetails";
import { SlCalender } from "react-icons/sl";
import { MdOutlineFormatListBulleted, MdPoll } from "react-icons/md";
import { AiFillPicture } from "react-icons/ai";
import { BsArrowDownCircle, BsFillArrowRightCircleFill } from "react-icons/bs";

const options = [
  { name: "Fixtures", url: "/fixtures" },
  { name: "Points Table", url: "/points-table" },
  { name: "Polls", url: "/polls" },
  { name: "Memories", url: "/memories" },
  { name: "Organising Team", url: "/organisers" },
];

const description =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
const Followup = () => {
  return (
    <div className="text-center">
      <p>We are glad that you dropped by.</p>
      <p>Please scroll down to know more!</p>
      <BsArrowDownCircle className="animate-pulse text-center w-full text-3xl my-4" />
      {/* About Section */}
      {/* <div className="mx-2"> */}
      {/* <Image src="/main.png" width={200} height={200} /> */}
      {/* <p className="text-left">{description}</p> */}
      {/* </div> */}
      {/* Options to go to */}
      <div>
        <div className="flex items-center rounded-lg justify-between px-5 py-6 bg-gradient-to-r from-red-700 via-red-400 mx-4 to-orange-500 text-white mb-4">
          <div className="flex items-center">
            <MdPoll className="text-3xl" />
            <p className="ml-4 text-lg font-semibold">POLLS</p>
          </div>
          <BsFillArrowRightCircleFill className="text-2xl" />
        </div>
        <div className="flex items-center rounded-lg justify-between px-5 py-6 bg-gradient-to-r from-purple-400 via-purple-600 mx-4 to-purple-900 text-white mb-4">
          <div className="flex items-center">
            <SlCalender className="text-3xl" />
            <p className="ml-4 text-lg font-semibold">FIXTURES</p>
          </div>
          <BsFillArrowRightCircleFill className="text-2xl" />
        </div>
        <div className="flex items-center rounded-lg justify-between px-5 py-6 bg-gradient-to-r from-green-400 via-green-600 mx-4 to-green-900 text-white mb-4">
          <div className="flex items-center">
            <MdOutlineFormatListBulleted className="text-3xl" />
            <p className="ml-4 text-lg font-semibold">POINTS TABLE</p>
          </div>
          <BsFillArrowRightCircleFill className="text-2xl" />
        </div>
        <div className="flex items-center rounded-lg justify-between px-5 py-6 bg-gradient-to-r from-yellow-400 via-yellow-600 mx-4 to-orange-700 text-white">
          <div className="flex items-center">
            <AiFillPicture className="text-3xl" />
            <p className="ml-4 text-lg font-semibold">MEMORIES</p>
          </div>
          <BsFillArrowRightCircleFill className="text-2xl" />
        </div>
      </div>
      {/* Details */}
      <TournamentDetails />
    </div>
  );
};

//fix this function and make it fetch the data from firebase
export async function getServerSideProps(context) {
  // Fetch data from external API

  const description =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

  // Pass data to the page via props
  return { props: description };
}

export default Followup;
