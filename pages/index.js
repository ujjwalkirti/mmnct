import { collection, getDocs } from "firebase/firestore";
import Head from "next/head";
import { db } from "../components/db/Firebase";
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

export default function Home({ teamList }) {
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
      <SponsorCarousel />

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  let data = [];

  const querySnapshot = await getDocs(collection(db, "participating-teams"));
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return {
    props: {
      teamList: data,
    },
  };
}
