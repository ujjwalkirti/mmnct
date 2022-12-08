import React from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import OptionsRouter from "./OptionsRouter";

const options = [
  {
    name: "TRIVIAS",
    url: "/trivias",
    from: "",
    via: "",
    to: "",
    special: true,
  },
  {
    name: "FIXTURES",
    url: "/fixtures",
    from: "from-purple-400",
    via: "via-purple-600 ",
    to: "to-purple-900",
    special: false,
  },
  {
    name: "POINTS TABLE",
    url: "/points-table",
    from: "from-green-400",
    via: "via-green-600",
    to: "to-green-900",
    special: false,
  },
  {
    name: "POLLS",
    url: "/polls",
    from: "from-red-700",
    via: "via-red-400",
    to: "to-orange-500",
    special: false,
  },
  {
    name: "MEMORIES",
    url: "/memories",
    from: "from-yellow-400",
    via: "via-yellow-600",
    to: "to-orange-700",
    special: false,
  },
  {
    name: "ORGANISING TEAM",
    url: "/organisers",
    from: "from-blue-700",
    via: "via-blue-500",
    to: "to-purple-500",
    special: false,
  },
];

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
      <div className="md:grid md:grid-cols-3 xl:grid-cols-6 md:mx-auto md:w-11/12">
        {options.map((option) => {
          return (
            <OptionsRouter
              from={option.from}
              via={option.via}
              to={option.to}
              title={option.name}
              route={option.url}
              special={option.special}
            />
          );
        })}
      </div>

      {/* ask for suggestions from viewers */}
      <div></div>

      
      {/* Details */}
    </div>
  );
};

export default Followup;
