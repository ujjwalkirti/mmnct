import Head from "next/head";
import Followup from "../components/Followup";
import Footer from "../components/Footer";
import HomePage from "../components/Home";
import Navbar from "../components/Navbar";

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

      
      <Footer />
    </div>
  );
}
