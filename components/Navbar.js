import { FaPollH } from "react-icons/fa";
function Navbar() {
  return (
    <div className="text-white bg-gradient-to-br from-blue-900 via-blue-700 to-blue-900 h-28 flex px-10  justify-between">
      <img src="main.png" className="rounded-md m-2 shadow-lg" />
      <div className="flex items-center w-3/5 justify-around text-xl font-semibold">
        <p className="cursor-pointer ">MATCHES</p>
        <p className="cursor-pointer ">STATS</p>
        <p className="cursor-pointer ">POINTS TABLE</p>
        <p className="cursor-pointer ">TEAMS</p>
        <p className="cursor-pointer ">NEWS</p>
      </div>
      <div className="flex items-center text-2xl font-bold cursor-pointer text-yellow-500">
        <FaPollH  className="mx-2"/>
        Polls
        {/* <span className=" text-2xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-red-400">
          <p className="text-transparent">Polls</p>
        </span> */}
      </div>
    </div>
  );
}

export default Navbar;
