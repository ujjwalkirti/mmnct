import { FcContacts } from "react-icons/fc";
import { FaMoneyBillAlt } from "react-icons/fa";
function AboutUs() {
  return (
    <div className="text-white flex justify-between bg-gradient-to-r from-blue-700 via-blue-400 to-blue-700 py-6 px-10 h-auto">
      {/* Team details */}
      <div>
        <p className="font-semibold text-2xl">TEAMS</p>
        <ul className="text-lg flex flex-col justify-around">
          <li>Akkadians</li>
          <li>Akkadians</li>
          <li>Akkadians</li>
          <li>Akkadians</li>
          <li>Akkadians</li>
          <li>Akkadians</li>
          <li>Akkadians</li>
          <li>Akkadians</li>
          <li>Akkadians</li>
          <li>Akkadians</li>
        </ul>
      </div>

      <div className="flex w-3/5">
        <div className="flex flex-col border bg-white text-blue-700 rounded-lg p-2 items-center w-3/5 mx-4 shadow-lg">
          <p className="font-bold m-4">COORDINATOR:</p>
          <img
            src="AboutUs/coordinator.png"
            className="h-60 rounded-full w-60"
          />
          <p> Koi Final Year waale</p>
        </div>
        <div className="flex flex-col border bg-white text-blue-700 rounded-lg font-bold p-2 items-center w-3/5 mx-4 shadow-lg">
          <p className=" m-4">CO-CORDINATOR:</p>
          <img src="AboutUs/ujjwal.jpg" className="h-60 rounded-full w-60" />
          <p> Ujjwal Kirti</p>
          <p>B. Tech III</p>
          <p>Civil Engineering</p>
        </div>
        <div className="flex flex-col border bg-white text-blue-700 rounded-lg p-2 items-center w-3/5 mx-4 shadow-lg">
          <p className="font-bold m-4">CO-CORDINATOR:</p>
          <img
            src="AboutUs/coordinator.png"
            className="h-60 rounded-full w-60"
          />
          <p> Koi Third Year waale</p>
        </div>
      </div>

      {/* Contact Us */}
      <div className="font-bold text-lg mr-10">
        <p className="cursor-pointer border p-2 flex items-center">
          Contact Us <FcContacts className="ml-2" />
        </p>
        <p className="cursor-pointer border p-2 mt-2 flex items-center">
          Sponsership <FaMoneyBillAlt className="ml-2" />
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
