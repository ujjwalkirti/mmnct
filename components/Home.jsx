import Image from "next/image";
import React from "react";
import { SiGooglemaps } from "react-icons/si";
import Banner from "./Banner";
function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center font-extrabold">
      <Banner/>
      <p className="text-5xl mt-5 text-center md:text-left ">Manoj Memorial</p>
      <p className="text-2xl text-center md:text-left">
        Night Cricket Tournament
      </p>

      <Image src="/vector-1.jpg" width={300} height={300} />
      <div className="text-center flex items-center">
        <SiGooglemaps className="text-3xl mr-4" />
        <div>
          <p className="text-xl">SVNIT, Surat</p>
          <p>SAC Ground</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
