import React from "react";
import { collection, getDocs } from "firebase/firestore";
import Head from "next/head";
import { db, dbRef, storage } from "../components/db/Firebase";
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
import Link from "next/link";
import { TfiWrite } from "react-icons/tfi";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { child, get } from "firebase/database";

export default function Home({ teamList, sponsorImgList, matches }) {
  return (
    <div className="text-xl">
      <Head>
        <title>MMNCT</title>
        <meta name="description" content="MMNCT, SVNIT, Surat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <HomePage />

      <div className="flex flex-col justify-center items-center mt-10">
        <p className="font-semibold">Links</p>
        <div className="border-b-4 border-[#F4A68D] w-5/12 md:w-1/5 lg:w-2/12 mx-auto mt-1"></div>
      </div>
      <Followup />
      {/* <div className="flex flex-col justify-center items-center pl-2 pr-1 mt-12 mb-8 md:mt-8">
        <p className="font-semibold">Share your MMNCT Experience</p>
        <div className="border-b-4 border-[#F4A68D] w-full md:w-3/5 lg:w-3/12 mx-auto mb-4 mt-1"></div>
        <Link
          href="/memory-tree"
          className="flex justify-between items-center bg-gradient-to-r from-[#FEC1A1] via-[#FEC1B1] to-[#FEC1C1] text-white font-semibold py-5 w-full md:w-2/5 lg:w-2/12 rounded-lg hover:shadow-lg px-4"
        >
          <div className="flex justify-center items-center gap-x-3">
            <TfiWrite /> <p className="text-xl md:text-lg">Memory Tree</p>
          </div>
          <BsFillArrowRightCircleFill className="text-2xl" />
        </Link>
      </div> */}
      <UpcomingMatches matches={matches} />
      <ParticipatingTeams teamList={teamList} />
      <TournamentDetails />
      <TournamentHistory />
      {/* new feature where users can upload there selfies on the matchdays with unique moments which will then be voted by others and one who receives most votes will win */}
      <ImageUploadContest />
      <div className="flex justify-center item-center mt-8">
        <Link href="/photocontest">
          <button className="bg-[#ffc4b1] text-white font-semibold py-3 px-20 rounded-full">
            {/* Participate Now! */} See Winners!
          </button>
        </Link>
      </div>
      <SponsorCarousel urls={sponsorImgList} />

      <Footer />
    </div>
  );
}

function fetchDate() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month.toString().length === 1) {
    month = "0" + month;
  }

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${year}-${month}-${day}`;
  return currentDate;
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

  let matches = [];
  let localMatches = [];
  let snapshot = await get(child(dbRef, "matchDetail/"));
  localMatches = snapshot.val();
  let todayDate = fetchDate();
  localMatches.shift();
  localMatches.map((match) => {
    if (match.timeDate === todayDate && match.status !== "past") {
      matches.push(match);
    }
  });

  return {
    props: {
      teamList: data,
      sponsorImgList: sponsor_img,
      matches: matches,
    },
  };
}
