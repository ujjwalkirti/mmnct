import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TfiArrowCircleDown } from "react-icons/tfi";

const Teamcard = () => {
  return (
    <div className="mt-10 mx-4 rounded-2xl w-96 shadow-2xl drop-shadow-lg">
      <div className="flex items-center justify-center flex-col">
        <Image
          src="/ig.png"
          className="rounded-full pt-4"
          width={175}
          height={175}
          alt="profile"
        />
        <h1 className="text-gray-800 font-semibold text-xl mt-3">Name</h1>
        <h1 className="text-gray-500 text-sm">Responsibility</h1>
        <div className="text-gray-500 text-sm p-4 text-center">
          <h1>Phone number</h1>
          <h1>Branch</h1>
          <h1>Year</h1>
        </div>
      </div>

      <div className="flex items-center justify-center mb-1 flex-col">
        <div className="flex mt-2">
          <Link href="#">
            <Image
              src="/fb.png"
              alt="facebook"
              width={35}
              height={35}
              className="border-2 p-1 rounded-full mr-3"
            />
          </Link>
          <Link href="#">
            <Image
              src="/ig.png"
              alt="instagram"
              width={35}
              height={35}
              className="border-2 p-1 rounded-full mr-3"
            />
          </Link>
          <Link href="#">
            <Image
              src="/twitter.png"
              alt="twitter"
              width={35}
              height={35}
              className="border-2 p-1 rounded-full"
            />
          </Link>
        </div>
        <TfiArrowCircleDown className="mt-4 text-gray-300 text-3xl" />
      </div>
    </div>
  );
};

export default Teamcard;
