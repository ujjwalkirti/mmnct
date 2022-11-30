import Head from "next/head";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { app } from "../components/db/Firebase";
import { getStorage, getDownloadURL, listAll, ref } from "firebase/storage";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Memories() {
  const storage = getStorage(app);
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
      <div>
        <div className="flex mb-2 text-white text-center h-72 bg-gradient-to-t from-gray-600 via-gray-900 to-black ">
          <div className="m-auto">
            <p className="text-4xl font-bold">Memories</p>
            <p className="mt-8 font-light md:text-2xl">
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
                      src={url}
                    />
                  </div>
                );
              })
            )}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
}

export default Memories;
