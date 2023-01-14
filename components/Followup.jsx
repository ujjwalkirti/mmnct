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
    name: "ORGANISING TEAM",
    url: "/organisers",
    from: "from-blue-700",
    via: "via-blue-500",
    to: "to-purple-500",
    special: false,
  },
];

const Followup = () => {
  const [showForm, setShowForm] = useState(false);
  const [story, setStory] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="text-center">
      <div className=" md:mx-auto md:w-11/12 mt-5">
        {/* <div className="text-justify mt-2 lg:mt-6 mb-7 lg:flex lg:items-center lg:shadow-lg">
          <div className="relative lg:h-[600px] text-white text-xl lg:w-3/5 memory-tree z-10 ">
            <p className="text-5xl xl:text-[80px] font-bold text-center mb-4 pt-6">
              Memory-Tree
            </p>
            <div className="text-lg  w-4/5 mx-auto mb-5">
              <p className="italic">
                <span className="font-bold">"</span> Written in these walls are
                the stories that I can't explain... <br />I leave my heart open
                but it stays right here empty for days{"  "}
                <span className="font-bold">"</span>
              </p>
              <p className="text-right font-bold">~ One-Direction</p>
            </div>
            <div className="lg:text-2xl lg:font-semibold lg:w-11/12 lg:mx-auto">
              <p className=" px-2">
                Do you have any interesting encounters or memories related to
                MMNCT?
              </p>
              <p className=" px-2">Why not share it with others?</p>

              <p className="lg:mt-10 mt-5 px-2">
                We will give it a platform so that it can reach more people!
              </p>
            </div>
            <div className="h-[400px] w-full lg:h-[600px] lg:w-full absolute bottom-0 bg-gradient-to-b to-black from-transparent -z-10"></div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-2/5 flex flex-col items-center gap-4 mb-4 px-2"
          >
            <p className="">
              Here, write it down and send it to us right away.{" "}
            </p>
            <textarea
              placeholder="Start typing here..."
              className="px-2 py-2 focus:bg-white focus:border-purple-500 xl:h-[360px] rounded-md border-black w-full lg:w-4/5 mx-auto h-44 border-none"
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
          </form> */}

        {/* </div> */}
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

      {/* ask for suggestions from viewers */}
      <div></div>

      {/* Details */}
    </div>
  );
};

export default Followup;
