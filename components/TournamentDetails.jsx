import React from "react";

const TournamentDetails = () => {
  return (
    <div className="text-left mt-10 p-2">
      <p className="text-2xl font-bold">FAQs related to tournament:</p>

      {Array(10)
        .fill(1)
        .map((el, i) => (
          <div className="my-4">
            <tr>1. When will the tournament be conducted?</tr>
            <tr>
              The final dates are as follows: 26<sup>th</sup> January - 29
              <sup>th</sup> January, 2023.
            </tr>
          </div>
        ))}
    </div>
  );
};

export default TournamentDetails;
