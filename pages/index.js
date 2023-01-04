import React from "react";
import { collection, getDocs } from "firebase/firestore";
import Head from "next/head";
import { db, storage } from "../components/db/Firebase";
import Followup from "../components/Followup";
import Footer from "../components/Footer";
import HomePage from "../components/Home";
import ImageUploadContest from "../components/ImageUploadContest";
import Navbar from "../components/Navbar";
import ParticipatingTeams from "../components/ParticipatingTeams";
import SponsorCarousel from "../components/SponsorCarousel";
import TournamentDetails from "../components/TournamentDetails";
import TournamentHistory from "../components/TournamentHistory";
import UpcomingMatches from "../components/UpcomingMatches";
import { listAll, ref, getDownloadURL } from "firebase/storage";

export default function Home({ teamList, sponsorImgList }) {
  return (
    <div className="text-xl">
      <Head>
        <title>MMNCT</title>
        <meta name="description" content="MMNCT, SVNIT, Surat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <HomePage />
      <Followup />
      <UpcomingMatches />
      <ParticipatingTeams teamList={teamList} />
      <TournamentDetails />
      <TournamentHistory />
      {/* new feature where users can upload there selfies on the matchdays with unique moments which will then be voted by others and one who receives most votes will win */}
      <ImageUploadContest />
      <SponsorCarousel urls={sponsorImgList} />

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  let data = [];

  const querySnapshot = await getDocs(collection(db, "participating-teams"));
  querySnapshot.forEach((doc) => {
    let temp = doc.data();
    temp.id = doc.id;
    data.push(temp);
  });

  const imageListRef = ref(storage, "sponsors/");
  const imageList = await listAll(imageListRef);

  const sponsor_img = await Promise.all(
    imageList.items.map(async (imageRef) => {
      const url = await getDownloadURL(imageRef);
      return url;
    })
  );

  return {
    props: {
      teamList: data,
      sponsorImgList: sponsor_img,
    },
  };
}
