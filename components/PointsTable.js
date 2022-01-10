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
      <div className="bg-gradient-to-r autoHeight from-blue-500 to-blue-800 text-white  my-1 mx-auto pt-6">
        {/* for actual points table */}
        {showStandings && (
          <div className="">
            <div className="flex justify-evenly  font-bold w-11/12">
              <p>TEAM</p>
              <p>PLD</p>

              <p>FORM</p>
            </div>
            <div className="pb-2">
              <div className="flex justify-evenly items-center bg-white text-black  font-bold my-2 mx-2 p-2 shadow-md rounded-lg">
                <p>Akkadians</p>
                <p>14</p>
                <p className="flex w-32 justify-evenly">
                  <LoseSymbol />
                  <WinSymbol />
                  <WinSymbol />
                </p>
              </div>
              <div className="flex justify-evenly items-center bg-white text-black  font-bold my-2 mx-2 p-2 shadow-md rounded-lg">
                <p>Akkadians</p>
                <p>14</p>
                <p className="flex w-32 justify-evenly">
                  <LoseSymbol />
                  <WinSymbol />
                  <WinSymbol />
                </p>
              </div>
              <div className="flex justify-evenly items-center bg-white text-black  font-bold my-2 mx-2 p-2 shadow-md rounded-lg">
                <p>Akkadians</p>
                <p>14</p>
                <p className="flex w-32 justify-evenly">
                  <LoseSymbol />
                  <WinSymbol />
                  <WinSymbol />
                </p>
              </div>
              <div className="flex justify-evenly items-center bg-white text-black  font-bold my-2 mx-2 p-2 shadow-md rounded-lg">
                <p>Akkadians</p>
                <p>14</p>
                <p className="flex w-32 justify-evenly">
                  <LoseSymbol />
                  <WinSymbol />
                  <WinSymbol />
                </p>
              </div>
              <div className="flex justify-evenly items-center bg-white text-black  font-bold my-2 mx-2 p-2 shadow-md rounded-lg">
                <p>Akkadians</p>
                <p>14</p>
                <p className="flex w-32 justify-evenly">
                  <LoseSymbol />
                  <WinSymbol />
                  <WinSymbol />
                </p>
              </div>
              <div className="flex justify-evenly items-center bg-white text-black  font-bold my-2 mx-2 p-2 shadow-md rounded-lg">
                <p>Akkadians</p>
                <p>14</p>
                <p className="flex w-32 justify-evenly">
                  <LoseSymbol />
                  <WinSymbol />
                  <WinSymbol />
                </p>
              </div>
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
            <div className="w-full flex justify-center">
              <button className="bg-yellow-600 p-2 font-bold text-xl mt-1 mb-3 mx-auto rounded">
                View Full table
              </button>
            </div>
          </div>
        )}

        {/* for playoffs data for last year */}
        {!showStandings && (
          <div className=" flex items-center justify-center  mt-2 h-80">
            <div className="text-black p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-800">
              <p className="text-2xl text-white font-bold">
                Playoffs haven't started yet.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PointsTable;
