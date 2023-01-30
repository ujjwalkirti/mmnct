import Image from "next/image";
import React from "react";
import Link from "next/link";
import { BsInstagram, BsYoutube, BsFacebook } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="mt-4 w-42 bg-[#422C67] text-white px-[26px] lg:px-[81px] pt-[41px] pb-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
        <div className="flex flex-row justify-center lg:justify-start col-span-1">
          <Image
            className="my-auto"
            src="/trans_logo.png"
            height={112}
            width={112}
            alt="MMNCT"
          />
          <div className="w-[2px] h-[112px] bg-white ml-[19px] mr-[12px] my-auto" />
          <Image
            className="my-auto"
            src="/trans_svnit.png"
            height={131}
            width={131}
            alt="SVNIT"
          />
        </div>
        <div className="flex flex-col mt-8 lg:my-auto leading-7 tracking-wide lg:col-span-3">
          <div className="lg:flex font-semibold lg:font-bold text-xl lg:text-2xl gap-x-2 text-center">
            <p>Manoj Memorial</p>
            <p>Night Cricket Tournament</p>
          </div>

          <p className="lg:flex text-lg lg:text-xl text-center pt-2">
            Sardar Vallabhbhai National Institute of Technology, Surat
          </p>
        </div>
      </div>
      <div className="lg:hidden w-full h-[2px] bg-white mt-6" />
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="grid grid-cols-3 lg:flex lg:flex-wrap mt-6 lg:mt-10 lg:col-span-2 justify-around justify-items-center text-base lg:text-lg">
          <Link href="/">
            <p>Home</p>
          </Link>
          <Link href="/fixtures">
            <p>Fixtures</p>
          </Link>
          <Link href="/points-table">
            <p>Point Table</p>
          </Link>
          <Link href="/polls">
            <p>Polls</p>
          </Link>
          <Link href="/memories">
            <p>Memories</p>
          </Link>
          <Link href="/trivias">
            <p>Trivia</p>
          </Link>
          <Link href="/organisers" className="flex gap-2">
            <p>Organisers</p>
          </Link>
          <Link href="/sponsors">
            <p>Sponsors</p>
          </Link>
          <Link href="/faq">
            <p>FAQs</p>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 lg:mt-10 col-span-1 gap-y-5">
          <div className="lg:col-span-2 flex lg:justify-end justify-center">
            <p className="font-medium lg:mr-6">Follow us on</p>
          </div>

          <div className="grid grid-cols-3 justify-items-center">
            <Link href="https://www.instagram.com/mmnct_svnit/">
              <BsInstagram className="h-[28px] w-[28px]" />
            </Link>
            <Link href="https://www.facebook.com/mmnctsvnit/">
              <BsFacebook className="h-[28px] w-[28px]" />
            </Link>
            <Link href="https://www.youtube.com/@mmnctsvnit8059">
              <BsYoutube className="h-[30px] w-[30px]" />
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-white mt-8" />
      <div className="font-light pt-2 text-sm lg:text-base flex justify-center lg:justify-start">
        <p>© All the Rights are Reserved with MMNCT</p>{" "}
      </div>
    </div>
  );
};

export default Footer;
