import Head from "next/head";
import React from "react";
import Navbar from "../components/Navbar";
import Match from "../pages/matchUpdate/Match"

function Fixtures() {
  return (
    <div>
      <Head>
        <title>Fixtures</title>
      </Head>
      <Navbar />
      <Match />
    </div>
  );
}

export default Fixtures;
