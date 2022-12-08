import Head from "next/head";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { GrContactInfo } from "react-icons/gr";
import { AiOutlineWhatsApp } from "react-icons/ai";
import Link from "next/link";
import Footer from "../components/Footer";

const Sponsors = () => {
  const [brochureLink, setBrochureLink] = useState("");
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
  return (
    <div>
      <Head>
        <title>Sponsorship-MMNCT</title>
      </Head>
      <Navbar />
      {/* Sponsors */}
      <div
        className={` bg-gray-100 lg:items-center min-h-screen pt-5 lg:flex lg:justify-center lg:gap-[60px]`}
      >
        <div>
          <p className="font-bold text-5xl lg:text-[100px] text-center mb-4">
            Coming Soon
          </p>
        </div>

        <div className="my-6 lg:w-1/2 ">
          <p className="text-center">
            Meanwhile if you have any queries, please contact:
          </p>
          <div className="lg:grid lg:grid-cols-2 lg:w-full">
            {contact_persons.map((contact_person) => (
              <div className="rounded-lg flex flex-col gap-2 shadow-lg text-center bg-white my-2 mx-2 py-3 px-2">
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
      <Footer/>
    </div>
  );
};

export default Sponsors;
