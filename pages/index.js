import Head from "next/head";
import Followup from "../components/Followup";
import Footer from "../components/Footer";
import HomePage from "../components/Home";
import Navbar from "../components/Navbar";
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
      <SponsorCarousel />
      <UpcomingMatches />
      <TournamentDetails />
      <Footer />
    </div>
  );
}
