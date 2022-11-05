import Head from "next/head";
import Image from "next/image";
import React from "react";
import Navbar from "../components/Navbar";

function Memories() {
  return (
    <div className="text-xl text-center">
      <Head>
        <title>Memories from the past versions!</title>
      </Head>
      <Navbar />
      <p className="text-3xl font-bold text-center">Memories</p>
      <div className="mx-auto w-3/5">
        <Image src="/vector-4.jpg" width={200} height={200} />
      </div>
      <p className="mx-2">Have a look how spectacle the past versions were!</p>
      
    </div>
  );
}

export default Memories;
