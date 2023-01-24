import Head from "next/head";
import React from "react";
import Navbar from "../components/Navbar";
import Teamcard from "../components/Teamcard";
import Footer from "../components/Footer";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../components/db/Firebase";
import Image from "next/image";
import SuggestionsFromUsers from "../components/SuggestionsFromUsers";

//Net js server side props for fetching data from firebase
export async function getServerSideProps() {
  const querySnapshot = await getDocs(
    query(collection(db, "team"), orderBy("name", "desc"))
  );
  let developers = [];

  querySnapshot.forEach((doc) => {
    let data = doc.data();
    if (data.position == "developer") {
      developers.push(data);
    }
  });
  return {
    props: {
      developers,
    },
  };
}

export default function developer({ developers }) {
  return (
    <div>
      <Head>
        <title>Developers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="text-center mt-10 mb-10">
        <h1 className="text-3xl font-semibold mb-2">Developers</h1>
        <div className="border-b-4 border-[#F4A68D] w-9/12 md:w-2/5 lg:w-2/12 mx-auto mb-4 lg:mb-8"></div>
        {developers.length == 0 && (
          <Image
            src="/loader.gif"
            width={330}
            height={400}
            className="w-full md:w-2/5 md:mx-auto md:rounded-xl"
            alt="loading"
          />
        )}
        <div className="grid gap-2 lg:grid-cols-2 justify-items-center place-items-center ">
          {developers.length != 0 &&
            developers.map((developer, index) => {
              return <Teamcard details={developer} key={index} />;
            })}
        </div>
      </div>
      <SuggestionsFromUsers />
      <Footer />
    </div>
  );
}
