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
import { useRouter } from "next/router";
import Image from "next/image";

function teamDetails() {
  const router = useRouter();
  const [teamDetails, setTeamDetails] = useState({});
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTeamDetails = async (Id) => {
    setLoading(true);
    await getDoc(doc(db, "participating-teams", Id)).then((docSnap) => {
      if (docSnap.exists()) {
        let data = docSnap.data();
        data.id = docSnap.id;
        setTeamDetails(data);

        // Get all the documents from the collection participating-team-member having the teamId as data.id
        let member_col = collection(db, "participating-team-member");
        let q = query(member_col, where("teamId", "==", data.id));
        getDocs(q).then((querySnapshot) => {
          let member = [];
          querySnapshot.forEach((doc) => {
            let data = doc.data();
            data.id = doc.id;
            data.teamId = Id;
            member.push(data);
          });
          setMembers(member);
        });
      } else {
        console.log("No such document!");
      }
    });
    setLoading(false);
  };

  useEffect(() => {
    //Wait for router to be ready before accessing query
    if (!router.isReady) return;
    const Id = router.query.team_id;
    getTeamDetails(Id);
  }, [router.isReady]);

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
