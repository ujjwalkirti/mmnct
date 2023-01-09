import Head from "next/head";
import React from "react";
import Navbar from "../components/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/db/Firebase";
import Footer from "../components/Footer";
import Image from "next/image";

// Next js server side props for getting data from firebase
export async function getServerSideProps() {
  const querySnapshot = await getDocs(collection(db, "faqs"));
  let list = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    list.push(doc.data());
  });
  return {
    props: {
      questions: list,
    },
  };
}

export default function FAQ({ questions }) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>FAQs-MMNCT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <p className="text-xl font-bold text-center mt-5">
        Here's the answer to all your queries!
      </p>
      {questions.length !== 0 ? (
        <div className="lg:w-4/5 lg:mx-auto">
          {questions.map((question, index) => (
            <div
              key={index}
              className="text-left my-4 p-2 bg-white mx-2 rounded-lg shandow-lg"
            >
              <p className="mb-3">
                {index + 1}. <span className="font-semibold">{question.q}</span>
              </p>
              <p>{question.a}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center font-bold text-2xl">
          <Image
            src="/loader.gif"
            width={100}
            height={100}
            className="w-3/5 mx-auto"
          />
          Loading
        </div>
      )}
      <Footer />
    </div>
  );
}
