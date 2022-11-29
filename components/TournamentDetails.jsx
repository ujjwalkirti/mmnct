import React from "react";

const TournamentDetails = () => {
  return (
    <div className="mt-10">
      <div className="p-4 mb-5 bg-gradient-to-br from-red-600 to-yellow-300 via-red-400">
        <div className=" bg-black text-white p-4 rounded-lg shadow-xl">
          <p>Having some queries related to tournament?</p>
          <p>Well, worry not! here are some of the frequently asked!</p>
        </div>
      </div>
      <p className="text-2xl text-left font-bold p-2">
        FAQs related to tournament:
      </p>

      {Array(10)
        .fill(1)
        .map((el, i) => (
          <div className="text-left my-4 p-2">
            <p>{i + 1}. When will the tournament be conducted?</p>
            <p>
              The final dates are as follows: 26<sup>th</sup> January - 29
              <sup>th</sup> January, 2023.
            </p>
          </div>
        ))}
    </div>
  );
};

export default TournamentDetails;
