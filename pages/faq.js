import Head from "next/head";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/db/Firebase";

function FAQ() {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    setQuestions(getAllDocs());
    console.log(typeof questions);
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
      {questions.length !== 0 && (
        <div>
          {questions.map((question, index) => (
            <div className="text-left my-4 p-2 bg-white mx-2 rounded-lg shandow-lg">
              <p>
                {index + 1}. {question.q}
              </p>
              <p>{question.a}</p>
            </div>
          ))}
        </div>
      )}
      {/* <Footer /> */}
    </div>
  );
}

export default FAQ;

async function getAllDocs() {
  const querySnapshot = await getDocs(collection(db, "faqs"));
  let list = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    list.push(doc.data());
  });
  console.log(list);
  return list;
}
