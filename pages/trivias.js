import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AiFillInstagram } from "react-icons/ai";
import Link from "next/link";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../components/db/Firebase";

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

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "trivia", "question"), (doc) => {
      console.log("Current data: ", doc.data());
    });
  }, []);
  return (
    <div>
      <Head>
        <title>Exciting Trivias</title>
      </Head>
      <Navbar />
      <p>Trivias</p>
      <div>
        <Image src="" alt="MMNCT trivia image" />
      </div>

      <div>{process.env.NEXT_PUBLIC_SECRET}</div>

      <p>Alternatively you can also DM us the answers here:</p>
      <Link href="" className="flex justify-center">
        <Image src="/ig.png" width={60} height={60} />
      </Link>
    </div>
  );
}

export default Trivias;
