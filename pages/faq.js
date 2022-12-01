import Head from "next/head";
import React from "react";
import Navbar from "../components/Navbar";

function FAQ() {
  return (
    <div>
      <Head><title>FAQs-MMNCT</title></Head>
      <Navbar/>
      {Array(10)
        .fill(1)
        .map((el, i) => (
          <div className="text-left my-4 p-2">
            <p>{i + 1}. When will the tournament be conducted?</p>
            <p>
              The final dates are as follows: 26<sup>th</sup> January - 29
              <sup>th</sup> January, 2023.
            </p>
          </div>
        ))}
    </div>
  );
}

export default FAQ;
