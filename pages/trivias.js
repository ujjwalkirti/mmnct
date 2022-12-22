import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../components/db/Firebase";
import Footer from "../components/Footer";
import { FaRegWindowClose } from "react-icons/fa";

function Trivias() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;
    const docRef = addDoc(collection(db, "answer-for-trivias"), {
      name: name,
      answer: answer,
      contact: contact,
      date: currentDate,
    });
    docRef
      .then((o) => {
        setName("");
        setContact("");
        setAnswer("");
        setSuccess(true);
      })
      .catch((e) => {
        alert("Sorry there was some error,please try again!");
      });
  };

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "trivia", "question"), (doc) => {
      // console.log("Current data: ", doc.data());
      setQuestion(doc.data().src);
    });
  }, []);
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Exciting Trivias</title>
      </Head>
      <Navbar />
      <p className="text-center text-4xl font-bold md:my-5 mt-5">Trivias</p>

      {/* check if the image for the question url has arrived or not and do conditional rendering of components */}

      {question.length !== 0 ? (
        <div>
          <div className="w-11/12 xl:w-3/5 md:gap-4 mx-auto py-2 px-2 md:flex md:justify-evenly">
            <Image
              src={question}
              width={330}
              height={400}
              className="w-full lg:w-2/5 md:mx-auto md:rounded-xl"
              alt="MMNCT trivia image"
              priority=""
            />
            <div className="border px-5 my-4 py-4 bg-white rounded-lg md:h-[600px]  shadow-xl">
              <p className="text-center font-semibold text-2xl">
                Wanna answer? <br className="md:hidden" />
                here you go!
              </p>
              {success && (
                <p className="text-xl text-center flex items-center gap-2 px-2 text-green-800 bg-green-300 py-2">
                  Your response submitted succesfully!
                  <FaRegWindowClose
                    className="cursor-pointer"
                    onClick={() => {
                      setSuccess(false);
                    }}
                  />
                </p>
              )}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col my-5 mx-2 gap-4 "
              >
                <input
                  className="px-3 py-2"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Enter your name!"
                />
                <input
                  type="tel"
                  name="telphone"
                  placeholder="Enter your phone number!"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  title="Ten digits code"
                  required
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                  }}
                  className="px-3 py-2"
                />

                <textarea
                  className="px-3 py-2 h-32"
                  type="text"
                  required
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                  }}
                  placeholder="Enter your answer"
                />
                <button
                  type="submit"
                  className="border bg-green-800 text-white font-bold  border-green-600 py-2 rounded-full lg:text-3xl cursor-pointer hover:text-green-600 hover:bg-white"
                >
                  Submit Answer
                </button>
                <p className="text-center mx-2">
                  Alternatively you can also DM us the answers here:
                </p>
                <Link
                  href="https://www.instagram.com/mmnct_svnit/"
                  className="flex justify-center mt-2"
                >
                  <Image src="/ig.png" width={60} height={60} />
                </Link>
              </form>
            </div>
          </div>

          <div className="text-center mt-3 md:text-4xl">
            <p>
              We will soon be releasing the answer on our instagram account!
            </p>
            <p>Stay tuned and follow us!</p>
          </div>
        </div>
      ) : (
        <div>
          <Image
            src="/loader.gif"
            width={330}
            height={400}
            className="w-full lg:w-2/5 md:mx-auto md:rounded-xl"
            alt="MMNCT trivia image"
          />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Trivias;
