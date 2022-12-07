import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AiFillInstagram } from "react-icons/ai";
import Link from "next/link";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../components/db/Firebase";
import Footer from "../components/Footer";

const data = [
  {
    ques: "dajbfkjbdkjfbksdf",
    ans: "dassdfsdfsdfdsf",
    options: ["dsad", "fdsfs", "dasdas", "dasdas"],
  },
  {
    ques: "dajbfkjbdkjfbksdf",
    ans: "dassdfsdfsdfdsf",
    options: ["dsad", "fdsfs", "dasdas", "dasdas"],
  },
];
function Trivias() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");


  const handleSubmit=(e)=>{
    e.preventDefault();
  }

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "trivia", "question"), (doc) => {
      // console.log("Current data: ", doc.data());
      setQuestion(doc.data().src);
    });
  }, []);
  return (
    <div>
      <Head>
        <title>Exciting Trivias</title>
      </Head>
      <Navbar />
      <p className="text-center text-4xl font-bold mt-5">Trivias</p>
      <div className="w-11/12 mx-auto py-2 px-2">
        <Image
          src={question}
          width={330}
          height={400}
          className="w-full"
          alt="MMNCT trivia image"
        />
      </div>
      <p className="text-center font-semibold text-2xl">
        Wanna answer? here you go!
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col my-5 mx-2 gap-4 ">
        <input
          className="px-3 py-2 border-none"
          type="text"
          required
          placeholder="Enter your name!"
        />
        <textarea
          className="px-3 py-2 border-none h-32"
          type="text"
          required
          placeholder="Enter your answer"
        />
        <button
          type="submit"
          className="border bg-green-800 text-white font-bold  border-green-600 py-2 rounded-full text-3xl cursor-pointer"
        >
          Submit Answer
        </button>
      </form>
      <p className="text-center">Alternatively you can also DM us the answers here:</p>
      <Link href="" className="flex justify-center">
        <Image src="/ig.png" width={60} height={60} />
      </Link>
      <div className="text-center mt-3">
        <p>We will soon be releasing the answer!</p>
        <p>Stay tuned and follow us!</p>
      </div>
      <Footer />
    </div>
  );
}

export default Trivias;
