import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="mt-4 pt-4 pb-1 h-44 bg-gray-800 grid grid-rows-3 justify-items-center items-center gap-y-1">
      <div>
        <p className="font-semibold tracking-wide text-xl text-white">
          Follow MMNCT on Social Media
        </p>
      </div>

      <div className="grid grid-cols-3 gap-x-16">
        <a href="https://www.instagram.com/mmnct_svnit/">
          <img src="/ig.png" className="h-11" alt="IG" />
        </a>
        <a href="https://www.facebook.com/mmnctsvnit/">
          <img src="/fb.png" className="h-11" alt="FB" />
        </a>
        <a href="#">
          <img src="/twitter.png" className="h-11" alt="Twitter" />
        </a>
      </div>
      <div>
        <p className="font-light tracking-wide text-sm text-white">
          © All the Rights are Reserved to MMNCT
        </p>
      </div>
    </div>
  );
};

export default Footer;
