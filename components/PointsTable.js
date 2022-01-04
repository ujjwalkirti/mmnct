import { useState } from "react";
import LoseSymbol from "./LoseSymbol";
import WinSymbol from "./WinSymbol";

function PointsTable() {
  const [showStandings, setShowStandings] = useState(true);
  return (
    <div className="h-full w-2/5 mr-2">
      {/* for heading */}
      <div className="w-full flex text-white mt-2">
        <p
          onClick={() => {
            setShowStandings(true);
          }}
          className={` ${
            showStandings ? "bg-yellow-600" : "bg-blue-600"
          } w-1/2 text-center p-3 text-xl font-bold cursor-pointer`}
        >
          Standings
        </p>
        <p
          onClick={() => {
            setShowStandings(false);
          }}
          className={` ${
            !showStandings ? "bg-yellow-600" : "bg-blue-600"
          } w-1/2 text-center p-3 text-xl font-bold cursor-pointer`}
        >
          Playoffs
        </p>
      </div>

      {/* for actual points table */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-800 text-white  my-1 mx-auto">
        <div className="flex justify-evenly  font-bold w-11/12">
          <p>TEAM</p>
          <p>PLD</p>

          <p>FORM</p>
        </div>
        <div>
          <div className="flex justify-evenly items-center bg-white text-black  font-bold my-2 mx-2 p-2 shadow-md rounded-lg">
            <p>Akkadians</p>
            <p>14</p>
            <p className="flex w-32 justify-evenly">
              <LoseSymbol />
              <WinSymbol />
              <WinSymbol />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PointsTable;
