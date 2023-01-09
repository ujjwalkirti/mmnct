import Head from "next/head";
import React from "react";
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
    contact: "918789276024",
  },
  {
    name: "Manish Kumar",
    position: "Coordinator, MMNCT",
    contact: "916203215516",
  },

  {
    name: "Anupam Kumar",
    position: "Volunteer, MMNCT",
    contact: "917463926104",
  },
  {
    name: "Ayushman",
    position: "Volunteer, MMNCT",
    contact: "916202561409",
  },
];

// Next js server side props for fetching sponsorship data from firebase
export async function getServerSideProps() {
  const docRef = doc(db, "sponsorship", "brochure");
  const docSnap = await getDoc(docRef);
  let brochureLink = "";
  if (docSnap.exists()) {
    brochureLink = docSnap.data().src;
  } else {
    // doc.data() will be undefined in this case
  }
  return {
    props: {
      brochureLink,
    },
  };
}

export default function Sponsors({ brochureLink }) {
  return (
    <div className=" bg-gray-100 ">
      <Head>
        <title>Sponsorship-MMNCT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {/* Sponsors */}
      <div
        className={`lg:items-center md:min-h-scree pt-20 lg:flex lg:flex-col lg:justify-center lg:gap-[60px]`}
      >
        <div className="flex flex-col justify-center gap-5">
          <p className="font-bold text-5xl lg:text-[50px] text-center">
            Welcome!
          </p>
          <p className="text-xl text-justify px-6 lg:w-9/12 lg:mx-auto py-6">
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
          <div className="bg-white px-2 py-1 border-2 w-1/2 text-center text-2xl mt-4 mb-8 rounded-lg text-pink-600 hover:text-white hover:bg-pink-600 border-pink-600 font-semibold mx-auto cursor-pointer">
            <Link href={`${brochureLink.length !== 0 ? brochureLink : ""}`}>
              Read here!
            </Link>
          </div>
        </div>
        <TournamentDetails />
        <div className="mt-10 lg:mt-0 mb-12 lg:w-1/2">
          <p className="text-center px-1 text-2xl font-semibold">
            Meanwhile if you have any queries, please contact:
          </p>
          <div className="lg:grid lg:grid-cols-2 lg:w-full mt-8">
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
                  className="mt-4 bg-green-400 hover:bg-white hover:text-green-400 border border-green-400 text-lg text-white py-2 rounded-lg flex justify-center items-center gap-3"
                >
                  {/* <FiPhoneCall /> */}
                  <AiOutlineWhatsApp />
                  <p>
                    {showPhoneNumberinCorrectformat(contact_person.contact)}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center mb-8">
        <p className="flex flex-col font-semibold gap-2 items-center justify-center lg:text-2xl">
          Alternatively you can also mail us your queries.
          <FaRegHandPointDown className="text-3xl" />
        </p>
        <p className="flex justify-center items-center gap-1 md:gap-3 lg:gap-4 bg-white py-3 w-4/5 lg:w-2/5  mx-auto hover:shadow-xl rounded-lg mt-2 border border-red-600 cursor-pointer">
          <Link href="mailto:mmnct.info@gmail.com">
            <SiGmail className="text-red-600" />
          </Link>
          <Link href="mailto:mmnct.info@gmail.com">mmnct.info@gmail.com</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}

function showPhoneNumberinCorrectformat(contactNumber) {
  return "+91-" + contactNumber.slice(2);
}
