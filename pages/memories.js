import Head from "next/head";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { storage } from "../components/db/Firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Footer from "../components/Footer";

function Memories() {
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "memories/");

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          setImageList((imageList) => [...imageList, url]);
        });
      });
    });
  }, []);

  return (
    <>
      <Head>
        <title>Memories from the past versions!</title>
      </Head>
      <Navbar />
      <div className="min-h-screen">
        <div className="flex items-center justify-center mb-4 text-gray-800 text-center h-72 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200">
          <div className="p-5 bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border-transparent shadow-xl rounded-lg">
            <p className="text-4xl font-bold">Memories</p>
            <p className="mt-4 font-light md:text-2xl">
              Have a look how spectacle the past versions were!
            </p>
          </div>
        </div>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry>
            {imageList.length == 0 ? (
              <img src="/loading.jpg" className="mx-1 rounded-md" />
            ) : (
              imageList.map((url, index) => {
                return (
                  <div className="mx-1" key={index}>
                    <LazyLoadImage
                      className="shadow-lg rounded-md"
                      placeholderSrc="/loading.jpg"
                      effect="blur"
                      src={url}
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

export default Memories;
