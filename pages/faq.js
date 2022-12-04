import Head from "next/head";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/db/Firebase";

function FAQ() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    getAllDocs();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>FAQs-MMNCT</title>
      </Head>
      <Navbar />
      <p className="text-xl font-bold text-center mt-5">
        Here's the answer to all your queries!
      </p>
      <div>
        {Array(3)
          .fill(1)
          .map((el, i) => (
            <div className="text-left my-4 p-2 bg-white mx-2 rounded-lg shandow-lg">
              <p>{i + 1}. When will the tournament be conducted?</p>
              <p>
                The final dates are as follows: 26<sup>th</sup> January - 29
                <sup>th</sup> January, 2023.
              </p>
            </div>
          ))}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default FAQ;

async function getAllDocs() {
  const querySnapshot = await getDocs(collection(db, "faqs"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}
