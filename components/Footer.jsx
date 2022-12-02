import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="mt-4 pt-4 pb-1 h-44 bg-gray-800 grid grid-rows-3 justify-items-center items-center gap-y-1">
      <div>
        <p className="font-semibold tracking-wide text-xl text-white">
          Follow MMNCT Page on Social Media
        </p>
      </div>

      <div className="grid grid-cols-3 gap-x-16">
        <a href="https://www.instagram.com/mmnct_svnit/">
          <img
            src="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c521.png"
            className="h-11"
          />
        </a>
        <a href="https://www.facebook.com/mmnctsvnit/">
          <img
            src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png"
            className="h-11"
          />
        </a>
        <a href="#">
          <img
            src="http://assets.stickpng.com/thumbs/5a2fe3efcc45e43754640848.png"
            className="h-11"
          />
        </a>
      </div>
      <div>
        <p className="font-light tracking-wide text-sm text-white">
          © All the Rights are Reserved to MMNCT, SVNIT-Surat
        </p>
      </div>
    </div>
  );
};

export default Footer;
