import Head from "next/head";
// import Image from "next/image";
import React from "react";
import Navbar from "../components/Navbar";
import Teamcard from "../components/Teamcard";
import Footer from "../components/Footer";

function Organisers() {
  return (
    <div>
      <Head>
        <title>Organising Team</title>
      </Head>
      <Navbar />
      <div className="text-center my-10">
        <h1 className="text-3xl font-bold mb-10">Coordinators</h1>
        <div className="grid gap-2 lg:grid-cols-2 justify-items-center place-items-center ">
          <Teamcard />
          <Teamcard />
        </div>
      </div>
      <div className="text-center mt-48 mb-24">
        <h1 className="text-3xl font-bold mb-10">Developers</h1>
        <div className="grid gap-2 lg:grid-cols-2 justify-items-center place-items-center ">
          <Teamcard />
          <Teamcard />
          <Teamcard />
          <Teamcard />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Organisers;
