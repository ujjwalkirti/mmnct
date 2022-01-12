import { FaPollH } from "react-icons/fa";
function Navbar() {
  return (
    <div className="text-white bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 h-16 flex px-10  justify-between">
      <a className="h-full items-center flex" href="/">
        <img src="main.png" className="rounded-md mx-2 shadow-lg h-14" />
      </a>
      <div className="flex items-center w-3/5 justify-around text-lg font-semibold">
        <a href="/matches" className="cursor-pointer ">
          MATCHES
        </a>
        {/* <a href="/stats" className="cursor-pointer ">STATS</a> */}
        <a href="/stats" className="cursor-pointer ">
          POINTS TABLE
        </a>
        <a href="/teams" className="cursor-pointer ">
          TEAMS
        </a>
        {/* <a className="cursor-pointer "></a> */}
      </div>
      <a
        href="/polls"
        className="flex items-center text-2xl font-bold cursor-pointer text-yellow-500"
      >
        <FaPollH className="mx-2" />
        Polls
        {/* <span className=" text-2xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-red-400">
          <p className="text-transparent">Polls</p>
        </span> */}
      </a>
    </div>
  );
}

export default Navbar;
