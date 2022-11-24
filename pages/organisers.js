import Head from "next/head";
// import Image from "next/image";
import React from "react";
import Navbar from "../components/Navbar";

function Organisers() {
  return (
    <div>
      <Head>
        <title>Organising Team</title>
      </Head>
      <Navbar />
      <div className="text-center">
        <p>
          You must be wondering, who all are behind organising such a humongous
          event successfully!
        </p>
        <p>Well, your wait is over!</p>
        <p>Presenting before you, the organising committee!</p>
        {/* <div className="relative">
          <Image src="/vector-7.png" height={300} width={500} />
          <p className="absolute top-14  px-2 py-4 font-bold text-3xl text-white">Student community of SVNIT!</p>
        </div> */}

        <p>
          Yes you read it correctly, all the students irrespective of there
          branch and year cooperated and collaborated to help make this event a
          reality!
        </p>
      </div>
    </div>
  );
}

export default Organisers;
