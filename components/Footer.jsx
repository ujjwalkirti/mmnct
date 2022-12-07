import Image from "next/image";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-4 pt-4 pb-1 h-44 bg-gray-800 grid grid-rows-3 justify-items-center items-center gap-y-1">
      <div>
        <p className="font-semibold tracking-wide text-xl text-white">
          Follow MMNCT on Social Media
        </p>
      </div>

      <div className="grid grid-cols-3 gap-x-16">
        <Link href="https://www.instagram.com/mmnct_svnit/">
          <Image src="/ig.png" height={44} width={44} alt="IG" />
        </Link>
        <Link href="https://www.facebook.com/mmnctsvnit/">
          <Image src="/fb.png" height={44} width={44} alt="FB" />
        </Link>
        <Link href="#">
          <Image src="/twitter.png" height={44} width={44} alt="Twitter" />
        </Link>
      </div>
      <div>
        <p className="font-light tracking-wide text-sm text-white">
          © All the Rights are Reserved with MMNCT
        </p>
      </div>
    </div>
  );
};

export default Footer;
