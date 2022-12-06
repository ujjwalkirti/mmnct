import Head from "next/head";
import Image from "next/image";
import React from "react";
import Navbar from "../components/Navbar";
import { AiFillInstagram } from "react-icons/ai";
import Link from "next/link";

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

      <div></div>

      <p>Alternatively you can also DM us the answers here:</p>
      <Link href="" className="flex justify-center">
        <Image src="/ig.png" width={60} height={60}/>
      </Link>
    </div>
  );
}

export default Trivias;
