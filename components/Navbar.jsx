import Image from "next/image";
import React, { useState } from "react";
import { VscCloseAll } from "react-icons/vsc";
const options = [
  { name: "Fixtures", url: "/fixtures" },
  { name: "Points Table", url: "/points-table" },
  { name: "Polls", url: "/polls" },
  { name: "Memories", url: "/memories" },
  { name: "Organising Team", url: "/organisers" },
];

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="p-2 relative flex justify-end">
      <Image
        src="/ham.png"
        height={30}
        width={30}
        alt="Man playing cricket"
        className="hover:shadow-lg cursor-pointer"
        onClick={() => {
          setShowMenu(true);
        }}
      />
      {showMenu && (
        <div className="absolute flex flex-col w-full h-screen z-40 top-0 left-0 bg-white px-4 py-2">
          <VscCloseAll
            className="font-semibold text-2xl absolute top-0 right-0 m-4 hover:cursor-pointer"
            onClick={() => {
              setShowMenu(false);
            }}
          />
          {options.map((option) => (
            <a
              className="my-4 font-semibold text-3xl hover:underline"
              href={option.url}
            >
              {option.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;
