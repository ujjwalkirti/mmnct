import Head from "next/head";
import React from "react";
import Navbar from "../components/Navbar";

function Fixtures() {
  const status = "this is a status";
  return (
    <div>
      <Head>
        <title>Fxitures</title>
      </Head>
      <Navbar />
      {status}
    </div>
  );
}

export default Fixtures;
