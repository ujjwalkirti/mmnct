import Head from "next/head";
import Image from "next/image";
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
        <div className="flex text-white text-center h-72 bg-black bg-opacity-90">
          <div className="m-auto">
            <p className="text-4xl font-bold">Memories</p>
            <p className="mt-8 text-2xl font-light">
              Have a look how spectacle the past versions were!
            </p>
          </div>
        </div>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry>
            <Imgcard url="https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg" />
            <Imgcard url="https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg" />
            <Imgcard url="https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg" />
            {imageList.map((url, index) => {
              return (
                <div className="m-1 mt-2" key={index}>
                  <LazyLoadImage
                    className="shadow-lg rounded-lg"
                    effect="blur"
                    src={url}
                  />
                </div>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
}

function Imgcard(props) {
  return (
    <div className="m-1 mt-2">
      <LazyLoadImage
        className="shadow-lg rounded-lg"
        effect="blur"
        src={props.url}
      />
    </div>
  );
}

export default Memories;
