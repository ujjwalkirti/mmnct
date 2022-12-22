import Head from "next/head";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { GrContactInfo } from "react-icons/gr";
import { AiOutlineWhatsApp } from "react-icons/ai";
import Link from "next/link";
import Footer from "../components/Footer";
import { FaRegHandPointDown } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { db } from "../components/db/Firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import TournamentDetails from "../components/TournamentDetails";

const contact_persons = [
  {
    name: "Avtar Kumar",
    position: "Coordinator, MMNCT",
    contact: "8789276024",
  },
  {
    name: "Manish Kumar",
    position: "Coordinator, MMNCT",
    contact: "6203215516",
  },

  {
    name: "Anupam Kumar",
    position: "Volunteer, MMNCT",
    contact: "7463926104",
  },
  {
    name: "Ayushman",
    position: "Volunteer, MMNCT",
    contact: "6202561409",
  },
];

const Sponsors = () => {
  const [brochureLink, setBrochureLink] = useState("");

  useEffect(() => {
    async function getBrochureUrl() {
      const docRef = doc(db, "sponsorship", "brochure");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBrochureLink(docSnap.data().src);
        // console.log(brochureLink);
      } else {
        // doc.data() will be undefined in this case
      }
    }
    getBrochureUrl();
  }, []);
  return (
    <div className=" bg-gray-100 ">
      <Head>
        <title>Sponsorship-MMNCT</title>
      </Head>
      <Navbar />
      {/* Sponsors */}
      <div
        className={`lg:items-center md:min-h-scree pt-5 lg:flex lg:flex-col lg:justify-center lg:gap-[60px]`}
      >
        <div className="flex flex-col justify-center gap-5">
          <p className="font-bold text-5xl lg:text-[50px] text-center">
            Welcome!
          </p>
          <p className="text-xl text-justify px-2 lg:w-11/12 lg:mx-auto">
            MMNCT, has become a brand itself over the past several years due to
            consistency it has provided in terms of thrill, grandeur and
            excitement. The hype around this tournament is surreal in SVNIT,
            Surat and we want more organisations to be part of this tournament.
            <br /> Hence if you are wondering where to begin from why don't you
            go through our brochure!
          </p>
          <div className="lg:w-10/12 lg:mx-auto px-2 hidden lg:flex">
            {brochureLink.length !== 0 ? (
              <object
                data={brochureLink}
                className="mx-auto"
                width={1000}
                height={800}
              ></object>
            ) : (
              <div className="w-full">
                <Image
                  src="/loader.gif"
                  height={200}
                  width={500}
                  className="mx-auto"
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-full lg:hidden">
          <div className="bg-white px-2 py-1 border-2 w-1/2 text-center text-2xl  my-4 rounded-lg text-pink-600 hover:text-white hover:bg-pink-600 border-pink-600 font-semibold mx-auto cursor-pointer">
            <Link href={`${brochureLink.length !== 0 ? brochureLink : ""}`}>
              Read here!
            </Link>
          </div>
          <TournamentDetails />
        </div>

        <div className="my-6 lg:w-1/2 ">
          <p className="text-center px-1">
            Meanwhile if you have any queries, please contact:
          </p>
          <div className="lg:grid lg:grid-cols-2 lg:w-full">
            {contact_persons.map((contact_person, index) => (
              <div
                key={index}
                className="rounded-lg flex flex-col gap-2 shadow-lg text-center bg-white my-2 mx-2 py-3 px-2"
              >
                <p className="font-bold text-xl">{contact_person.name}</p>
                <p className="flex justify-center items-center gap-3">
                  <GrContactInfo />
                  {contact_person.position}
                </p>
                <Link
                  href={`https://wa.me/${contact_person.contact}`}
                  className="bg-green-400 hover:bg-white hover:text-green-400 border border-green-400 text-2xl text-white py-2 rounded-lg flex justify-center items-center gap-3"
                >
                  {/* <FiPhoneCall /> */}
                  <AiOutlineWhatsApp />
                  {contact_person.contact}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="flex flex-col font-bold gap-2 items-center justify-center lg:text-3xl">
          Alternatively you can also mail us your queries.
          <FaRegHandPointDown className="text-3xl" />
        </p>
        <p className="flex justify-center items-center gap-4 bg-white py-3 w-3/5 lg:w-2/5  mx-auto shadow-xl rounded-lg mt-2 border border-red-600 cursor-pointer">
          <Link href="mailto:mmnct.info@gmail.com">
            <SiGmail className="text-red-600" />
          </Link>
          <Link href="mailto:mmnct.info@gmail.com">mmnct.info@gmail.com</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Sponsors;
