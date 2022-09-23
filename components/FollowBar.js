import { FaFacebookSquare, FaInstagram } from "react-icons/fa";

function FollowBar() {
  return (
<<<<<<< HEAD
    <div className="bg-white text-black h-6 flex justify-between mx-4 my-1 font-semibold">
      <p>25<sup>th</sup> Jan - 29<sup>th</sup> Jan, 2023</p>
=======
    <div className="bg-white text-black h-6 hidden lg:flex justify-between mx-4 my-1 font-semibold">
      <p>Dates to be announced soon!</p>
>>>>>>> 927a2377efec1b04d21f5224c6cd15b12b5bcc7b
      <div className="flex items-center">
        <img className="h-full" src="svnit_logo.jpg" />
        <a href="https://svnit.ac.in/">
          <p className="mx-2 cursor-pointer">SVNIT, Surat</p>
        </a>
      </div>
      <div className="flex items-center">
        <p className="text-gray-600 px-3">Follow MMNCT</p>
        <a href="https://www.facebook.com/mmnctsvnit/">
          <FaFacebookSquare className="mx-2" />
        </a>
        <a href="https://www.instagram.com/mmnct_svnit/">
          <FaInstagram />
        </a>
      </div>
    </div>
  );
}

export default FollowBar;
