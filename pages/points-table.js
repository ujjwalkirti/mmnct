import Head from "next/head";
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function PointsTable() {
  return (
    <div>
      <Head>
        <title>Points-Table</title>
      </Head>
      <Navbar />
      <div className="min-h-screen">
        <div className="flex items-center justify-center text-center">
          <p className="mt-80 text-3xl font-semibold">Coming soon...</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PointsTable;
