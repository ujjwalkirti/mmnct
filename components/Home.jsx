import Image from "next/image";
import React, { useEffect, useState } from "react";
// import { SiGooglemaps } from "react-icons/si";
// import Banner from "./Banner";

function HomePage() {
  const [screenSize, setScreenSize] = useState(0);

  useEffect(() => {
    setScreenSize(window.innerWidth);
  }, []);
  return (
    <div className="flex flex-col md:w-11/12 md:mx-auto tournament-name-container ">
      {/* displaying live score of current match */}
      {/* <Banner /> */}
      <div className="mt-6 w-4/5 mx-auto">
        <p className="tournament-name">MMNCT</p>
        <p className="tournament-name-fullform mb-3">
          Manoj Memorial
          <br className="md:hidden" /> Night Cricket Tournament
        </p>
        <div className="md:flex md:gap-4 md:items-center">
          {" "}
          <p className="bg-white py-2 px-3 text-[#F9BD48] font-[800] w-[180px] h-[36px] text-[20px] md:text-[40px] mb-3 flex justify-center items-center md:w-[360px] md:h-[66px]">
            16<sup>th</sup> <span className="ml-2">EDITION</span>
          </p>
          <p className="font-[800] text-[16px] md:text-[24px] md:leading-[29.26px] md:ml-[40px]">
            26<sup>th</sup> - 29<sup>th</sup> <br className="hidden md:flex" />
            January, 2023
          </p>
          <p className="font-[600] text-[12px] mb-7 md:hidden">
            Bring back the Cheers! Bring back the Slogans!
          </p>
        </div>
      </div>

      <div className="w-full md:w-4/5 md:mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
        {/* graphic and venue along with days to go */}

        <div>
          <div className=" flex justify-center items-center w-4/5 md:w-[400px] days-counter mx-auto md:mx-0 md:mb-4 md:gap-4 h-[116px] md:h-[150px]">
            <span className="text-[#F45178] font-[800] text-[96px] md:-[120px] leading-[117px] md:leading-[146.28px] text-center w-1/2 md:w-[35%]">
              {daysCaluclator()}
            </span>
            <div className="text-[#991746]">
              <p className="font-[700] text-[40px] md:text-[48px] leading-[49px]">
                DAYS
              </p>
              <p className="font-[500] text-[40px] md:text-[48px] leading-[49px]">
                {" "}
                TO GO
              </p>
            </div>
          </div>
          <p className="font-[600] text-[20px] hidden md:flex my-10  md:mx-auto leading-[24.38px]">
            Bring back the Cheers! Bring back the Slogans!
          </p>
        </div>
        <div className="h-[200px] lg:hidden relative">
          <div className={` w-[${screenSize}] h-[230px]`}>
            <Image
              height={250}
              width={392}
              src={`/vector-1.png`}
              alt="ground picture"
              priority
              className={`z-40 absolute md:relative top-0 -left-[60px]`}
            />
          </div>
        </div>

        {/* the following component will be shown when screen size is larger than 1024 pixels */}

        <div className="w-[791px] lg:block relative  hidden">
          <div className="w-full ">
            <img
              src={`/vector-1.png`}
              alt="ground picture"
              priority
              className="w-[791px] h-[396px]"
            />
          </div>
        </div>
      </div>

      {/* more information about the tournament */}
    </div>
  );
}

export default HomePage;

function daysCaluclator() {
  var today = new Date();
  var date_to_reply = new Date("2023-01-26");
  var timeinmilisec = date_to_reply.getTime() - today.getTime();
  // console.log(Math.floor(timeinmilisec / (1000 * 60 * 60 * 24)));
  return Math.floor(timeinmilisec / (1000 * 60 * 60 * 24));
}
