import React from "react";
import { useState } from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { db } from "../../components/db/Firebase";
import {
  collection,
  doc,
  query,
  getDocs,
  getDoc,
  where,
} from "firebase/firestore";
import Image from "next/image";

//getserversideprops for fetching url query params
export async function getServerSideProps(context) {
  const { team_id } = context.query;
  let teamDetails = {};
  let members = [];

  // Get the document from the collection participating-teams having the id as team_id
  await getDoc(doc(db, "participating-teams", team_id)).then(
    async (docSnap) => {
      if (docSnap.exists()) {
        let data = docSnap.data();
        data.id = docSnap.id;
        teamDetails = data;

        // Get all the documents from the collection participating-team-member having the teamId as data.id
        let member_col = collection(db, "participating-team-member");
        let q = query(member_col, where("teamId", "==", data.id));
        await getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let data = doc.data();
            data.id = doc.id;
            data.teamId = team_id;
            members.push(data);
          });
        });
        // Arrange the members in the order of captain, vice-captain and other members
        members.sort((a, b) => {
          if (
            a.id == teamDetails.captainId &&
            b.id == teamDetails.viceCaptainId
          )
            return -1;
          if (
            a.id == teamDetails.viceCaptainId &&
            b.id == teamDetails.captainId
          )
            return 1;
          if (a.id == teamDetails.captainId) return -1;
          if (b.id == teamDetails.captainId) return 1;
          if (a.id == teamDetails.viceCaptainId) return -1;
          if (b.id == teamDetails.viceCaptainId) return 1;
          return 0;
        });
      } else {
        console.log("No such document!");
      }
    }
  );

  return {
    props: {
      teamDetails,
      members,
    },
  };
}

function teamDetails({ teamDetails, members }) {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <Head>
        <title>Team: {teamDetails.teamName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-gray-200 bg-opacity-50">
          <Image
            src="/loader.gif"
            alt="loading"
            width={300}
            height={300}
            className="rounded-full"
          />
        </div>
      )}
      <div className="">
        <div className="flex justify-center items-center my-4">
          <div className="w-11/12 md:w-3/4 lg:w-5/12 shadow-lg border hover:shadow-xl">
            <div className="flex flex-col md:flex-row justify-center items-center">
              <div
                className="w-full md:w-5/12"
                style={{ backgroundColor: teamDetails.themeColor }}
              >
                {teamDetails.teamLogo != "" ? (
                  <Image
                    src={teamDetails.teamLogo}
                    alt="team logo"
                    width={1920}
                    height={1080}
                    className="px-12 py-4 md:px-4 md:py-4"
                  />
                ) : (
                  <div className="flex justify-center items-center h-60 bg-white">
                    <p className="text-2xl font-semibold text-gray-500">
                      No Logo
                    </p>
                  </div>
                )}
              </div>
              <div className="md:hidden border-b-2 border-gray-100 w-full"></div>
              <div className="md:w-7/12 py-4 md:pl-10 md:border-l">
                <div className="flex flex-col justify-center items-center md:items-start gap-y-4">
                  <div className="flex flex-col justify-center items-center md:items-start">
                    <p className="font-semibold">Team Name</p>
                    <p className="text-gray-500">{teamDetails.teamName}</p>
                  </div>
                  <div className="flex flex-col justify-center items-center md:items-start">
                    <p className="font-semibold">Group</p>
                    <p className="text-gray-500">{teamDetails.teamType}</p>
                  </div>
                  <div className="flex flex-col justify-center items-center md:items-start">
                    <p className="font-semibold">Gender</p>
                    <p className="text-gray-500">{teamDetails.teamGender}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {members.length == 0 ? (
          <div className="flex flex-col justify-center items-center text-xl font-semibold text-gray-500 text-center p-x-4 h-96">
            <p>Team members are not decided yet.</p>
            <p>Please, stay tuned for more updates.</p>
          </div>
        ) : (
          <div className="pt-16 flex flex-col gap-8 pb-6">
            <div className="flex flex-col justify-center items-center">
              <p className="text-2xl font-semibold mx-auto">Team members</p>
              <div
                className="mt-2 mb-8 border-b-4 w-7/12 md:w-4/12 lg:w-3/12 mx-auto"
                style={{ borderColor: teamDetails.themeColor }}
              ></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-4 md:mx-16 gap-6">
              {members.map((member, index) => (
                <div className="relative" key={index}>
                  <Image
                    src={
                      member.imgUrl != ""
                        ? member.imgUrl
                        : teamDetails.teamGender == "Male"
                        ? "/male.jpg"
                        : "/female.jpg"
                    }
                    alt="team member"
                    width={1920}
                    height={1080}
                    className="rounded-xl"
                  />
                  <div class="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-700 shadow-xl"></div>
                  <div className="absolute bottom-2 w-full text-white text-center font-light">
                    <p className="text-sm font-semibold">{member.name}</p>
                    {member.id == teamDetails.captainId && (
                      <p className="text-xs font-semibold">Captain</p>
                    )}
                    {member.id == teamDetails.viceCaptainId && (
                      <p className="text-xs font-semibold">Vice-Captain</p>
                    )}
                    {member.roll_no != "" && (
                      <p className="text-xs">{member.roll_no}</p>
                    )}
                    {member.branch != "" && (
                      <p className="text-xs">{member.branch}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default teamDetails;
