import Head from "next/head";
import React from "react";
import Navbar from "../components/Navbar";
import { GrContactInfo } from "react-icons/gr";
import { FiPhoneCall } from "react-icons/fi";
import { AiOutlineWhatsApp } from "react-icons/ai";

const Sponsors = () => {
  const contact_persons = [
    {
      name: "Avtar Kumar",
      position: "Coordinator, MMNCT",
      contact: "+91 87892 76024",
    },
    {
      name: "Manish Kumar",
      position: "Coordinator, MMNCT",
      contact: "+91 6203 215 516",
    },

    {
      name: "Anupam Kumar",
      position: "Volunteer, MMNCT",
      contact: "+91 74639 26104",
    },
    {
      name: "Ayushman Tiwari",
      position: "Volunteer, MMNCT",
      contact: "+91 6202 561 409",
    },
  ];
  return (
    <div>
      <Head>
        <title>Sponsorship-MMNCT</title>
      </Head>
      <Navbar />
      {/* Sponsors */}
      <div className=" bg-gray-100 min-h-screen pt-5">
        <p className="font-bold text-5xl text-center mb-4">Coming Soon</p>
        <p className="text-center">
          Meanwhile if you have any queries, please contact:
        </p>
        <div className="my-6">
          {contact_persons.map((contact_person) => (
            <div className="rounded-lg flex flex-col gap-2 shadow-lg text-center bg-white my-2 mx-2 py-3 px-2">
              <p className="font-bold text-xl">{contact_person.name}</p>
              <p className="flex justify-center items-center gap-3">
                <GrContactInfo />
                {contact_person.position}
              </p>
              <p className="bg-green-400 text-2xl text-white py-2 rounded-lg flex justify-center items-center gap-3">
                {/* <FiPhoneCall /> */}
                <AiOutlineWhatsApp />
                {contact_person.contact}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
