import { CiCircleChevRight } from "react-icons/ci";
import React from "react";
import Link from "next/link";

const TournamentDetails = () => {
  return (
    <div className="my-5 md:my-10 md:w-4/5 bg-[#191799]  text-white w-[328px] rounded-lg font-bold flex items-center mx-auto px-8 py-8 justify-center md:text-[24px] md:gap-4">
      <p className="w-4/5 md:w-auto">
        See the frequently <br className="md:hidden"/>
        Asked questions <br className="md:hidden"/>
        about MMNCT
      </p>
      <Link href="/faq" className="text-5xl cursor-pointer">
        <CiCircleChevRight className="" />
      </Link>
    </div>
  );
};

export default TournamentDetails;
