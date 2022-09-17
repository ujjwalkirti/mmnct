import React from "react";
import {GiHamburgerMenu} from 'react-icons/gi';

export default function Navbar({}) {
  return (
    <div className="flex justify-evenly w-full items-center mt-2">
      <span className="text-center font-bold w-4/5 text-2xl">
        <p>Manoj Memorial </p>
        <p>Night Cricket Tournament</p>
      </span>
      <GiHamburgerMenu className="text-3xl cursor-pointer  hover:shadow-sm hover:shadow-orange-500"/>
    </div>
  );
}
