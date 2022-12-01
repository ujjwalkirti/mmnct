import { CiCircleChevRight } from "react-icons/ci";
import React from "react";
import Link from "next/link";

const TournamentDetails = () => {
  return (
    <div className=" p-4 mb-5 bg-gradient-to-br from-red-600 to-yellow-300 via-red-400">
      <div className=" bg-black flex flex-col text-white p-4 rounded-lg shadow-xl w-full">
        <p>
          Never heard of MMNCT before? or having some queries related to
          tournament?
        </p>
        <p className="mb-6">Well, worry not, we have got you covered!</p>
        <Link
          href="/faq"
          className="bg-white flex btn btn-hover items-center font-bold text-2xl text-black px-5 py-2 w-30 rounded-lg"
          style={{ margin: "5px auto" }}
        >
          FAQs <CiCircleChevRight className="ml-4"/>
        </Link>
      </div>
    </div>
  );
};

export default TournamentDetails;
