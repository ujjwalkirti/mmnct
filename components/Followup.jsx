import Image from "next/image";
import React, { useState } from "react";
import {
  BsArrowDownCircle,
  BsArrowUpCircle,
  BsVectorPen,
} from "react-icons/bs";
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
  // {
  //   name: "NOTICE & ANNOUNCEMENTS",
  //   url: "/notice",
  //   from: "from-purple-700",
  //   via: "via-red-400",
  //   to: "to-orange-500",
  //   special: false,
  // },
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
    name: "DEVELOPERS ❤️",
    url: "/developer",
    from: "from-blue-700",
    via: "via-blue-500",
    to: "to-purple-500",
    special: false,
  },
];

const Followup = () => {
  
 
  return (
    <div className=" md:mx-auto md:w-11/12 mt-5">
      <div className="md:grid md:grid-cols-3 xl:grid-cols-6">
        {/* <div className="lg:w-1/2 lg:grid lg:grid-cols-2"> */}
        {options.map((option, index) => {
          return (
            <OptionsRouter
              from={option.from}
              via={option.via}
              to={option.to}
              key={index}
              title={option.name}
              route={option.url}
              special={option.special}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Followup;
