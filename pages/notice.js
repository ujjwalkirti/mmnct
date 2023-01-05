import Head from "next/head";
import React from "react";
import Navbar from "../components/Navbar";
import { storage } from "../components/db/Firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import Image from "next/image";

// Next js navigation dynamic import
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("../components/Footer"));

export async function getServerSideProps() {
  const imageListRef = ref(storage, "notice/");
  const imageList = await listAll(imageListRef);
  let data = {};
  await Promise.all(
    imageList.items.map(async (imageRef) => {
      const url = await getDownloadURL(imageRef);
      //store url and name in data
      data[imageRef.name] = url;
    })
  );
  return {
    props: {
      imageList: data,
    },
  };
}

export default function Notice({ imageList }) {
  return (
    <>
      <Head>
        <title>MMNCT:Notice Page</title>
      </Head>
      <Navbar />
      <div className="min-h-screen">
        <div className="lg:px-80 pt-16">
          <Image
            src={imageList["1.png"]}
            width={1920}
            height={1080}
            alt="Notice"
            className="shadow-lg"
          />
        </div>
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8 px-4 lg:px-40">
          <div>
            <Image
              src={imageList["2.png"]}
              width={1920}
              height={1080}
              alt="Notice"
              className="shadow-lg"
            />
          </div>
          <div>
            <Image
              src={imageList["3.png"]}
              width={1920}
              height={1080}
              alt="Notice"
              className="shadow-lg"
            />
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  );
}
