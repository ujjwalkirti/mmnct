import Head from "next/head";
import HomePage from "../components/Home";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>MMNCT</title>
        <meta name="description" content="MMNCT, SVNIT, Surat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage />
    </div>
  );
}
