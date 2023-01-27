import Image from "next/image";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineClose } from "react-icons/ai";

const options = [
  { name: "Fixtures", url: "/fixtures" },
  { name: "Points Table", url: "/points-table" },
 { name: "Polls", url: "/polls" },
  { name: "Memories", url: "/memories" },
  { name: "Notice", url: "/notice" },
  { name: "Organising Team", url: "/organisers" },
];

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="relative flex md:h-[75px] bg-white justify-end shadow-md">
      {/* <div className="flex items-center font-bold">
        
        <p className="ml-2 text-3xl">MMNCT</p>
      </div> */}
      <div className="hover:shadow-lg pt-2 cursor-pointer flex justify-between w-full px-5 md:hidden">
        <Link href="/">
          <Image
            src="/main.png"
            height={50}
            width={51}
            alt="MMNCT logo"
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
          className="mt-2 hover:text-green-600  text-4xl"
          onClick={() => {
            setShowMenu(true);
          }}
        />
      </div>
      {showMenu && (
        <div className="absolute flex flex-col w-full md:w-2/5 z-50 xl:w-1/5 top-0 right-0 bg-white text-black px-4 py-2">
          <div className="flex justify-between">
            <Link href="/">
              <Image
                src="/main.png"
                height={50}
                width={51}
                alt="MMNCT logo"
                className="mb-2 ml-1"
              />
            </Link>
            <AiOutlineClose
              className="mt-3 mb-2 mr-2 font-semibold text-3xl hover:cursor-pointer"
              onClick={() => {
                setShowMenu(false);
              }}
            />
          </div>
          {options.map((option, index) => (
            <Link
              className="my-3 font-semibold hover:bg-slate-600 hover:text-white px-4 py-2 text-3xl"
              href={option.url}
              key={index}
            >
              {option.name}
            </Link>
          ))}
        </div>
      )}

      {/* content to be shown when screen size is medium and above */}
      <div className="w-full md:flex font-bold px-10 text-xl justify-between hidden  items-center">
        <Link href="/">
          <Image src="/main.png" height={54} width={65} alt="logo" />
        </Link>
        <div className="flex items-center">
          {options.map((option, index) => {
            if (option.name !== "Organising Team") {
              return (
                <Link
                  className={`my-2  px-4 py-2 border-white hover:text-[#F8C156] border-b-4 mx-2 hover:border-b-[#F8C156] ${emphasiseRoute(
                    option.url
                  )}`}
                  href={option.url}
                  key={index}
                >
                  {option.name}
                </Link>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

function emphasiseRoute(url) {
  const router = useRouter();
  return router.asPath === url
    ? "text-[#F8C156]"
    : "text-black text-xl font-normal";
}

export default Navbar;
