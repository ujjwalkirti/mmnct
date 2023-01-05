import Head from "next/head";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { db, storage } from "../components/db/Firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

// Next js navigation dynamic import
import dynamic from "next/dynamic";
import { getDownloadURL, getMetadata, listAll, ref } from "firebase/storage";
import Link from "next/link";
const Footer = dynamic(() => import("../components/Footer"));

export async function getServerSideProps() {
  let noticeDates = [];
  const docRef = doc(db, "notice-upload-dates", "date-array");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    noticeDates = docSnap.data().dates;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

  return {
    props: {
      noticeDates,
    },
  };
}

export default function Notice({ noticeDates }) {
  return (
    <>
      <Head>
        <title>Notice and Announcements</title>
      </Head>
      <Navbar />
      <div className="min-h-screen bg-gray-200 py-3">
        <p className="text-center lg:text-4xl text-3xl font-bold pt-2 mb-4">
          Notice and Announcements
        </p>
        {noticeDates.map((noticeDate, index) => {
          return (
            <NoticeCard key={index} noticeDate={noticeDate} index={index} />
          );
        })}
      </div>
      <Footer />
    </>
  );
}

const NoticeCard = ({ noticeDate, index }) => {
  const [images, setImages] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [showNotice, setShowNotice] = useState(false);

  return (
    <div
      onClick={() => {
        const listRef = ref(storage, `notice/${noticeDate.date}`);
        let imgUrls = [];
        let pdfUrls = [];

        // Find all the prefixes and items.
        listAll(listRef)
          .then((res) => {
            res.prefixes.forEach((folderRef) => {});
            res.items.forEach((itemRef) => {
              getMetadata(itemRef)
                .then((metadata) => {
                  if (metadata.contentType === "application/pdf") {
                    getDownloadURL(itemRef).then((url) => {
                      pdfUrls.push(url);
                      setPdfs(pdfUrls);
                    });
                  } else if (
                    metadata.contentType === "image/png" ||
                    "image/jpg" ||
                    "image/jpeg"
                  ) {
                    getDownloadURL(itemRef).then((url) => {
                      imgUrls.push(url);
                      setImages(imgUrls);
                    });
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            });
            setShowNotice(true);
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error);
          });
      }}
      className="shadow-lg w-11/12 mx-auto py-4 my-2 bg-gradient-to-r from-[#F9BD48] to-white rounded-lg"
    >
      <div className="lg:flex lg:justify-center">
        <p className="text-center text-xl mt-3 lg:mr-10">{noticeDate.date}</p>
        <p className="text-center text-xl font-bold underline lg:text-3xl cursor-pointer">
          {index + 1}
          {". "}
          {noticeDate.caption}
        </p>
      </div>
      {showNotice && (
        <div>
          <div className="lg:grid lg:grid-cols-2 lg:w-4/5 lg:mx-auto lg:gap-4">
            {images.map((url, index) => (
              <Image
                key={index}
                alt="MMNCT Notice and Announcement"
                src={url}
                height={300}
                width={500}
                className="my-4 lg:rounded-lg lg:shadow-lg mx-auto"
              />
            ))}
          </div>
          {pdfs.map((url, index) => (
            <div key={index} className="flex justify-center">
              <object
                data={url}
                className="mx-auto hidden md:flex"
                width={1000}
                height={800}
              ></object>
              <Link
                href={url}
                className="md:hidden bg-purple-600 text-white px-2 py-2 rounded-lg font-bold text-xl"
              >
                Download Notice
              </Link>
            </div>
          ))}
          {images.length === 0 && pdfs.length === 0 && (
            <div className="flex justify-center">
              <Image
                src={`/loader.gif`}
                height={300}
                width={300}
                alt="Loading gif"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
