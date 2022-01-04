import LoseSymbol from "./LoseSymbol";
import WinSymbol from "./WinSymbol";

function PointsTable() {
  return (
    <div className="h-full w-2/5">
      {/* for heading */}
      <div className="w-full flex text-white mt-2">
        <p className="bg-yellow-600 w-1/2 text-center p-3 text-xl font-bold">
          Standings
        </p>
        <p className="bg-blue-600 w-1/2 text-center p-3 text-xl font-bold">
          Playoffs
        </p>
      </div>

      {/* for actual points table */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-800 text-white  my-1 mx-auto">
        <div className="flex justify-evenly  font-bold w-11/12">
          <p>TEAM</p>
          <p>PLD</p>
          <p>NET RR</p>
          <p>FORM</p>
        </div>
        <div>
          <div className="flex justify-evenly bg-white text-black  font-bold w-full my-2 p-2 shadow-md">
            <p>Akkadians</p>
            <p>14</p>
            <p>+0.481</p>

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
