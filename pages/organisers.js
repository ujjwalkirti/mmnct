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
  const coordinators = [];
  const developers = [];
  const designers = [];
  const content_creators = [];

  querySnapshot.forEach((doc) => {
    let data = doc.data();
    if (data.position == "coordinator") {
      coordinators.push(data);
    } else if (data.position == "developer") {
      developers.push(data);
    } else if (data.position == "designer") {
      designers.push(data);
    } else {
      content_creators.push(data);
    }
  });
  return {
    props: {
      coordinators,
      developers,
      designers,
      content_creators,
    },
  };
}

export default function Organisers({
  coordinators,
  developers,
  designers,
  content_creators,
}) {
  return (
    <div>
      <Head>
        <title>Organising Team</title>
      </Head>
      <Navbar />
      <div className="text-center mt-10 mb-24">
        <h1 className="text-3xl font-bold mb-10">Coordinators</h1>
        {coordinators.length == 0 && (
          <Image
            src="/loader.gif"
            width={330}
            height={400}
            className="w-full md:w-2/5 md:mx-auto md:rounded-xl"
            alt="loading"
          />
        )}
        <div className="grid gap-2 lg:grid-cols-2 justify-items-center place-items-center ">
          {coordinators.length != 0 &&
            coordinators.map((coordinator, index) => {
              return <Teamcard details={coordinator} key={index} />;
            })}
        </div>
      </div>
      <div className="text-center mt-28 mb-10">
        <h1 className="text-3xl font-bold mb-10">Content</h1>
        {content_creators.length == 0 && (
          <Image
            src="/loader.gif"
            width={330}
            height={400}
            className="w-full md:w-2/5 md:mx-auto md:rounded-xl"
            alt="loading"
          />
        )}
        <div className="grid gap-2 lg:grid-cols-1 justify-items-center place-items-center ">
          {content_creators.length != 0 &&
            content_creators.map((content_creator, index) => {
              return <Teamcard details={content_creator} key={index} />;
            })}
        </div>
      </div>
      <div className="text-center mt-28 mb-10">
        <h1 className="text-3xl font-bold mb-10">Developers</h1>
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
      <div className="text-center mt-28 mb-10">
        <h1 className="text-3xl font-bold mb-10">Designers</h1>
        {designers.length == 0 && (
          <Image
            src="/loader.gif"
            width={330}
            height={400}
            className="w-full md:w-2/5 md:mx-auto md:rounded-xl"
            alt="loading"
          />
        )}
        <div className="grid gap-2 lg:grid-cols-2 justify-items-center place-items-center ">
          {designers.length != 0 &&
            designers.map((designer, index) => {
              return <Teamcard details={designer} key={index} />;
            })}
        </div>
      </div>
      <SuggestionsFromUsers />
      <Footer />
    </div>
  );
}
