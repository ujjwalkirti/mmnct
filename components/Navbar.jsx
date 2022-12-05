import Image from "next/image";
import React, { useState } from "react";
import { VscCloseAll } from "react-icons/vsc";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { useRouter } from "next/router";

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
    <div className="pt-2 relative flex bg-white justify-end shadow-md">
      {/* <div className="flex items-center font-bold">
        
        <p className="ml-2 text-3xl">MMNCT</p>
      </div> */}
      <div className="hover:shadow-lg cursor-pointer flex justify-between w-full px-5 md:hidden">
        <Link href="/">
          <Image
            src="/main.png"
            height={50}
            width={51}
            alt="logo"
            className="pb-2"
          />
        </Link>
        {/* <Image
          src="/ham.png"
          height={30}
          width={30}
          layout="fixed"
          alt="Man playing cricket"
          onClick={() => {
            setShowMenu(true);
          }}
        /> */}
        <GiHamburgerMenu
          className="mt-2 hover:text-green-600  text-4xl border border-gray-500 rounded-md"
          onClick={() => {
            setShowMenu(true);
          }}
        />
      </div>
      {showMenu && (
        <div className="absolute flex flex-col w-full md:w-2/5 z-40 xl:w-1/5 top-0 right-0 bg-white text-black px-4 py-2">
          <VscCloseAll
            className="font-semibold text-2xl absolute top-0 right-0 m-4 hover:cursor-pointer"
            onClick={() => {
              setShowMenu(false);
            }}
          />
          {options.map((option, index) => (
            <Link
              className="my-4 font-semibold hover:bg-slate-600 hover:text-white px-4 py-2 text-3xl"
              href={option.url}
              key={index}
            >
              {option.name}
            </Link>
          ))}
        </div>
      )}

      {/* content to be shown when screen size is medium and above */}
      <div className="w-full md:flex font-bold px-10 text-xl justify-between hidden ">
        <Link href="/">
          <Image src="/main.png" height={54} width={55} alt="logo" />
        </Link>
        <div className="flex items-center">
          {options.map((option, index) => (
            <Link
              className={`my-2  px-4 py-2  ${emphasiseRoute(option.url)}`}
              href={option.url}
              key={index}
            >
              {option.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function emphasiseRoute(url) {
  const router = useRouter();
  return router.asPath === url
    ? ""
    : "text-gray-300 text-xl font-normal hover:font-semibold hover:text-black";
}

export default Navbar;
