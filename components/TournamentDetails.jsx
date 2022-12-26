import { CiCircleChevRight } from "react-icons/ci";
import React from "react";
import Link from "next/link";

const TournamentDetails = () => {
  return (
    <div className="mb-5 md:my-10 md:w-2/5 bg-[#191799]  text-white w-[328px] rounded-lg font-bold flex items-center mx-auto px-8 py-8 justify-center">
      <p className="w-4/5">
        See the frequently <br />
        Asked questions <br />
        about MMNCT
      </p>
      <Link href="/faq" className="text-5xl cursor-pointer">
        <CiCircleChevRight className="" />
      </Link>
    </div>
  );
};

export default TournamentDetails;
