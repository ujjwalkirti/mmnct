import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { app } from "../components/db/Firebase";
import { getStorage, getDownloadURL, listAll, ref } from "firebase/storage";

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
      <Navbar />
      <div className="bg-black">
        <div className="flex text-white text-center h-72 bg-gray-900 bg-opacity-40">
          <div className="m-auto">
            <p className="text-4xl font-bold">Memories</p>
            <p className="mt-8 text-2xl font-light">
              Have a look how spectacle the past versions were!
            </p>
          </div>
        </div>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry>
            <img
              src="https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg"
              className="m-3 rounded-lg"
            />
            <img
              src="https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg"
              className="m-3 rounded-lg"
            />
            <img
              src="https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg"
              className="m-3 rounded-lg"
            />
            {imageList.map((url) => {
              return <img src={url} className="m-3 rounded-lg" />;
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
}

export default Memories;
