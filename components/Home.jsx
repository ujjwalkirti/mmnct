import Image from "next/image";
import React from "react";
import { SiGooglemaps } from "react-icons/si";
import Banner from "./Banner";

function HomePage() {
  return (
    <div className="flex flex-col md:w-11/12 md:mx-auto tournament-name-container">
      {/* displaying live score of current match */}
      {/* <Banner /> */}
      <div className="mt-6 w-4/5 mx-auto">
        <p className="tournament-name">MMNCT</p>
        <p className="tournament-name-fullform mb-3">
          Manoj Memorial
          <br /> Night Cricket Tournament
        </p>
        <p className="bg-white py-2 px-3 text-[#F9BD48] font-[800] w-[180px] h-[36px] text-[20px] mb-3 flex justify-center items-center">
          16<sup>th</sup> <span className="ml-2">EDITION</span>
        </p>
        <p className="font-[800] text-[16px]">
          26<sup>th</sup> - 29<sup>th</sup> January, 2023
        </p>
        <p className="font-[600] text-[12px] mb-7">
          Bring back the Cheers! Bring back the Slogans!
        </p>
      </div>

      <div className="md:w-1/2 w-full flex flex-col">
        {/* graphic and venue along with days to go */}

        <div className=" flex justify-center items-center w-4/5 mx-auto days-counter  h-[116px]">
          <span className="text-[#F45178] font-[800] text-[96px] leading-[117px] text-center w-1/2">
            21
          </span>
          <div className="text-[#991746]">
            <p className="font-[700] text-[40px] leading-[49px]">DAYS</p>
            <p className="font-[500] text-[40px] leading-[49px]"> TO GO</p>
          </div>
        </div>

        <div className="relative h-[200px]">
          <div className="w-full">
            <Image
              src={`/vector-1.png`}
              height={600}
              width={600}
              className="absolute top-0 -left-[72px] w-[500px] h-[230px]"
            />
            <Image
              src={`/location-pointer.png`}
              height={200}
              width={70}
              className="absolute left-[90px] top-[15px]"
            />
          </div>
          <div className="absolute font-[700] text-[14px] leading-[17px] text-[#392908] left-[153px] top-[20px]">
            <p>SAC Ground</p>
            <p>SVNIT</p>
          </div>
        </div>
      </div>

      {/* more information about the tournament */}
    </div>
  );
}

export default HomePage;
