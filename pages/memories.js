import Head from "next/head";
import React from "react";
import Navbar from "../components/Navbar";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { storage } from "../components/db/Firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";
import Image from "next/image";

// Next js navigation dynamic import
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("../components/Footer"));

export async function getServerSideProps() {
  const imageListRef = ref(storage, "memories/");
  const imageList = await listAll(imageListRef);
  const urls = await Promise.all(
    imageList.items.map(async (imageRef) => {
      const url = await getDownloadURL(imageRef);
      return url;
    })
  );
  return {
    props: {
      imageList: urls,
    },
  };
}

export default function Memories({ imageList }) {
  return (
    <>
      <Head>
        <title>Memories from the past versions!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="min-h-screen">
        <div className="flex items-center justify-center mb-4 text-gray-800 text-center h-72 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200">
          <div className="p-5 bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-transparent shadow-xl rounded-lg">
            <p className="text-4xl font-bold">Memories</p>
            <p className="mt-4 font-light md:text-2xl">
              Have a look at how spectacular the previous editions were!            
            </p>
          </div>
        </div>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry>
            {imageList.length == 0 ? (
              <Image
                className="shadow-lg rounded-md"
                src="/loading.jpg"
                width={500}
                height={450}
                alt="loading"
              />
            ) : (
              imageList.map((url, index) => {
                return (
                  <div className="mx-1 pb-2" key={index}>
                    {/* <LazyLoadImage
                      className="shadow-lg rounded-md"
                      placeholderSrc="/loading.jpg"
                      effect="blur"
                      src={url}
                    /> */}
                    <Image
                      className="shadow-lg rounded-md"
                      src={url}
                      alt="memory"
                      width={500}
                      height={450}
                      placeholder="blur"
                      blurDataURL="/loading.jpg"
                    />
                  </div>
                );
              })
            )}
          </Masonry>
        </ResponsiveMasonry>
      </div>
      <Footer />
    </>
  );
}
