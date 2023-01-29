import React, { useState } from "react";
import Footer from "../components/Footer";
import Match from "../components/Match";
import Navbar from "../components/Navbar";

function stylesBasedOnGender(gender) {
  if (gender === 0) {
    return "";
  } else {
    return "";
  }
}

const Final = () => {
  const [genders, setGenders] = useState(["male", "female"]);
  const [selectedGender, setSelectedGender] = useState(0);
  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-br from-orange-500 to-orange-300 text-white min-h-screen pt-4">
        <p className="text-center bg-white text-orange-500 w-4/5 mx-auto py-1 px-3 rounded-lg font-bold text-3xl">
          Final Scoreboard
        </p>
        <div className="w-[300px] rounded-md mx-auto my-4 bg-white text-orange-400 flex  justify-evenly items-center h-[30px] text-2xl">
          {genders.map((gender) => {
            return (
              <button
                className={`font-semibold h-[45px] w-2/5 bg-red-600 rounded-lg text-white ${stylesBasedOnGender(
                  selectedGender
                )}`}
              >
                {gender}
              </button>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Final;
