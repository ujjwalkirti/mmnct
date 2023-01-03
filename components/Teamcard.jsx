import autoprefixer from "autoprefixer";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsLinkedin, BsGithub } from "react-icons/bs";

const Teamcard = (props) => {
  return (
    <div className="mt-10 mx-4 rounded-2xl shadow-2xl drop-shadow-lg w-80 md:w-96">
      <div className="flex items-center justify-center flex-col">
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "auto",
            paddingBottom: "100%",
          }}
        >
          <Image
            src={props.details.img_url}
            fill
            className="w-full"
            object-fit="cover"
            alt="profile"
            priority={true}
          />
        </div>

        <h1 className="text-gray-800 font-semibold text-xl mt-3">
          {props.details.name}
        </h1>
        <div className="text-gray-500 text-sm text-center pb-4">
          <p className="font-semibold">{props.details.branch}</p>
          <p className="pt-4">{props.details.year}</p>
          {props.details.position === "coordinator" && (
            <p>Phone No.- {props.details.mob_number}</p>
          )}
        </div>
      </div>
      {props.details.position != "coordinator" &&
        (props.details.linkedin != "" || props.details.github != "") && (
          <div className="flex items-center justify-center flex-col mb-4">
            <p className="text-gray-700 text-center">Get connected</p>
            <div className="flex mt-3 mb-1">
              {props.details.linkedin != "" && (
                <Link href={props.details.linkedin}>
                  <BsLinkedin className="text-[#0A66C2] text-2xl mx-3" />
                </Link>
              )}
              {props.details.github != "" && (
                <Link href={props.details.github}>
                  <BsGithub className="text-[#333] text-2xl mx-3" />
                </Link>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default Teamcard;
