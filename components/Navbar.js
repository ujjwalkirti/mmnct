import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const options = [
  { title: "Fixtures", url: "/fixtures" },
  { title: "Points Table", url: "/points-table" },
  { title: "Polls", url: "/polls" },
  { title: "Trivias", url: "/trivias" },
  { title: "Memories", url: "/memories" },
  { title: "About the organisers!", url: "/organisers" },
];

export default function Navbar({}) {
  const [showHiddenMenu, setShowHiddenMenu] = useState(false);
  const navMenuStyle =
    " cursor-pointer hover:shadow-md text-gray-500 px-2 py-1 m-2 hover:text-white hover:bg-black";
  return (
    <div className="flex justify-evenly w-full items-center pt-2 z-20 bg-white fixed top-0">
      <span className="text-center font-bold w-4/5 text-4xl">
        <p>Manoj Memorial </p>
        <p className="text-2xl">Night Cricket Tournament</p>
      </span>
      <GiHamburgerMenu
        className="text-3xl cursor-pointer md:hidden  hover:shadow-sm hover:shadow-orange-500"
        onClick={() => setShowHiddenMenu(true)}
      />
      {showHiddenMenu && (
        <div className="absolute md:hidden bg-white z-10 p-4 text-2xl top-4 flex flex-col shadow-md shadow-orange-600 rounded-lg w-full transition duration-200 ease-in">
          {options.map((option) => {
            return (
              <a className={navMenuStyle} href={option.url}>
                {option.title}
              </a>
            );
          })}
          <p
            className="absolute right-0 font-bold w-10 h-10 text-center flex items-center justify-center top-0 ml-4 border rounded-full hover:bg-black hover:text-white cursor-pointer"
            onClick={() => setShowHiddenMenu(false)}
          >
            X
          </p>
        </div>
      )}
    </div>
  );
}
