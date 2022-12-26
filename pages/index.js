import Head from "next/head";
import Followup from "../components/Followup";
import Footer from "../components/Footer";
import HomePage from "../components/Home";
import ImageUploadContest from "../components/ImageUploadContest";
import Navbar from "../components/Navbar";
import ParticipatingTeams from "../components/ParticipatingTeams";
import SponsorCarousel from "../components/SponsorCarousel";

import TournamentDetails from "../components/TournamentDetails";
import UpcomingMatches from "../components/UpcomingMatches";

export default function Home() {
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
      <ParticipatingTeams />
      {/* new feature where users can upload there selfies on the matchdays with unique moments which will then be voted by others and one who receives most votes will win */}
      <ImageUploadContest />
      <SponsorCarousel />

      <TournamentDetails />

      <Footer />
    </div>
  );
}
