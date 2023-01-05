import Link from "next/link";
import React from "react";
import { SlCalender } from "react-icons/sl";
import { MdOutlineFormatListBulleted, MdPoll } from "react-icons/md";
import { AiFillPicture } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { TbSpeakerphone, TbZoomQuestion } from "react-icons/tb";


const OptionsRouter = ({ from, via, to, title, route, special }) => {
  return (
    <Link
      href={route}
      className={`flex items-center hover:shadow-lg rounded-lg md:text-sm justify-between px-5 md:px-2 py-6 bg-gradient-to-r ${from} ${via} ml-2 ${to} text-white mb-4 ${specialDecorations(
        special
      )}`}
    >
      <div className={`gap-1 flex items-center w-full`}>
        {iconDecider(title)}
        <p className=" text-lg md:text-sm font-semibold text-left">{title}</p>
      </div>
      <BsFillArrowRightCircleFill className="text-2xl" />
    </Link>
  );
};

//function to provide special decorations
function specialDecorations(isSpecial) {
  const decorations = "trivia";
  return isSpecial ? decorations : "";
}

// function to decide what kind of icons will be used
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
    case "trivias":
      return <TbZoomQuestion className="text-3xl" />;
    case "notice & announcements":
      return <TbSpeakerphone className="text-3xl text-white" />;
    default:
    // code block
  }
}

export default OptionsRouter;
