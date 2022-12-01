import Link from "next/link";
import React from "react";
import { SlCalender } from "react-icons/sl";
import { MdOutlineFormatListBulleted, MdPoll } from "react-icons/md";
import { AiFillPicture } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";

const OptionsRouter = ({ from, via, to, title, route }) => {
  return (
    <Link
      href={route}
      className={`flex items-center rounded-lg justify-between px-5 py-6 bg-gradient-to-r ${from} ${via} mx-4 ${to} text-white mb-4`}
    >
      <div className="flex items-center">
        {iconDecider(title)}
        <p className="ml-4 text-lg font-semibold">{title}</p>
      </div>
      <BsFillArrowRightCircleFill className="text-2xl" />
    </Link>
  );
};

function iconDecider(title) {
  title = title.toLowerCase();
  switch (title) {
    case "fixtures":
      // code block
      return <SlCalender className="text-3xl" />;
    case "points table":
      // code block
      return <MdOutlineFormatListBulleted className="text-3xl" />;
    case "polls":
      return <MdPoll className="text-3xl" />;
    case "memories":
      return <AiFillPicture className="text-3xl" />;
    case "organising team":
      return <RiTeamFill className="text-3xl" />;
    default:
    // code block
  }
}

export default OptionsRouter;
