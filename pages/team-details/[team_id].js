import React, { useEffect } from "react";
import { useState } from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { db, storage } from "../../components/db/Firebase";
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
  let members = {};

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
        <title>Team Details</title>
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
      <div className="min-h-screen">
        <p className="pt-80 text-3xl text-center font-semibold">
          Page is under construction
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default teamDetails;
