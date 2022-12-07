import React, { useState } from "react";
import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";

const UpcomingMatches = () => {
  const [showMenMatches, setShowMenMatches] = useState(true);

  const buttonColorCalculator = (sex) => {
    let colorString = "";
    if (sex === "male") {
      colorString = showMenMatches
        ? "shadow-blue-700 shadow-md bg-blue-700 text-white"
        : "text-gray-400 bg-white shadow-gray-400";
    } else {
      colorString = !showMenMatches
        ? "shadow-pink-500 shadow-md  bg-pink-600 text-white"
        : "text-gray-400 bg-white shadow-gray-400";
    }
    return colorString;
  };

  return (
    <div className="bg-gray-100 py-6 text-center md:w-3/5 md:mx-auto">
      <p className=" font-semibold text-3xl text-gray-700">Upcoming Matches</p>

      <div className="flex justify-center">
        <p
          onClick={() => {
            setShowMenMatches(true);
          }}
          className={`flex cursor-pointer font-bold mt-4 ${buttonColorCalculator(
            "male"
          )} justify-center items-center  w-2/5 mx-auto py-4 rounded-full`}
        >
          <AiOutlineMan className="mr-4" />
          Mens
        </p>
        <p
          onClick={() => {
            setShowMenMatches(false);
          }}
          className={`flex cursor-pointer font-bold mt-4 ${buttonColorCalculator(
            "female"
          )} shadow-md justify-center items-center w-2/5 mx-auto py-4 rounded-full`}
        >
          <AiOutlineWoman className="mr-4" />
          Womens
        </p>
      </div>

      <MatchCard />
      <MatchCard />
      <MatchCard />
      {showMenMatches && (
        <>
          <MatchCard />
          <MatchCard />
        </>
      )}

   
    </div>
  );
};

export default UpcomingMatches;

export const MatchCard = () => {
  const teamStyle = "flex items-center justify-center";
  const teamName = "font-extrabold text-lg";

  return (
    <div className="flex bg-white md:justify-evenly md:w-4/5 md:mx-auto my-4 text-sm items-center justify-center shadow-lg py-4 mx-4 rounded-lg">
      {/* team 1 */}
      <div className={teamStyle}>
        <p className={teamName}>Team 1</p>
        <img
          className="team-logo"
          src="https://mir-s3-cdn-cf.behance.net/projects/404/168243107813919.Y3JvcCwzMDAwLDIzNDYsMCw0MjM.jpg"
        />
      </div>



      {/* timing and date */}
      <div>
        <p className="text-orange-500 font-bold">6:30 pm</p>
        <p className="text-gray-400">
          27<sup>th</sup> JAN
        </p>
      </div>



      {/* Team 2 */}
      <div className={teamStyle}>
        <img
          className="team-logo"
          src="https://mir-s3-cdn-cf.behance.net/projects/404/168243107813919.Y3JvcCwzMDAwLDIzNDYsMCw0MjM.jpg"
        />
        <p className={teamName}>Team 2</p>
      </div>
    </div>
  );
};
