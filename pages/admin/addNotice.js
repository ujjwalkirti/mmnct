import Head from "next/head";
import React, { useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import Navbar from "../../components/Navbar";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../components/db/Firebase";
import { v4 as uuidv4 } from "uuid";

function AddNotice() {
  const [fields, setFields] = useState(0);

  return (
    <div>
      <Head>
        <title>Add Notice</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <p className="text-center text-4xl mt-2">
        Upload Notice and Announcements!
      </p>
      <p className="px-2 text-justify mt-4 text-xl md:text-center">
        What are the number of images or documents that are to be uploaded?
      </p>
      <div className="flex text-black items-center justify-evenly text-5xl gap-4 my-4">
        {" "}
        <p className="w-1/2 text-center">{fields}</p>
        <AiFillPlusCircle
          onClick={() => {
            setFields(fields + 1);
          }}
          className="hover:shadow-xl cursor-pointer rounded-full border border-black"
        />
        <AiFillMinusCircle
          onClick={() => {
            if (fields >= 1) {
              setFields(fields - 1);
            }
          }}
          className="hover:shadow-xl cursor-pointer rounded-full border border-black"
        />
      </div>
      <Form fields={fields} />
    </div>
  );
}

export default AddNotice;

const Form = ({ fields }) => {
  const [progress, setProgress] = useState(0);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let caption = "";
    let currentDate = `${day}-${month}-${year}`;
    let uid = uuidv4();

    for (let index = 0; index < fields; index++) {
      // console.log(e.target[index].files[0]);

      const storage = getStorage();
      const file = e.target[index].files[0];
      const storageRef = ref(
        storage,
        `notice/${currentDate}/${uid}/${e.target[index].files[0].name}`
      );

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log("File available at", downloadURL);
          });
        }
      );
    }

    caption = e.target[fields].value;
    const data = {
      date: currentDate,
      caption: caption,
      description: description,
      uid: uid,
    };
    const dateRef = doc(db, "notice-upload-dates", "date-array");

    // Atomically add a new region to the "regions" array field.
    const updateDocData = updateDoc(dateRef, {
      dates: arrayUnion(data),
    });

    updateDocData.then((result) => {
      // console.log(result);
    });
  };

  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={handleSubmit}
    >
      {Array.from(Array(fields), (e, i) => {
        return (
          <>
            <label>File {i + 1}</label>
            <input
              key={i}
              required
              type={`file`}
              placeholder="Enter here"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 mx-2 w-4/5 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 my-2"
            />
          </>
        );
      })}
      {fields !== 0 && (
        <>
          <input
            type="text"
            placeholder="Enter the caption for the notice"
            required
            className="w-11/12 mx-auto my-4 text-xl px-1 py-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded  text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
          <textarea
            type="text"
            placeholder="Enter the description or the brief summary for the notice"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-11/12 mx-auto my-4 text-xl px-1 py-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded  text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          ></textarea>

          <input
            type="submit"
            value={`Submit`}
            className="border border-black px-2 py-1 text-2xl rounded-lg hover:text-white hover:bg-black cursor-pointer"
          />
        </>
      )}
      <p className="font-bold text-3xl mt-10">Progress: {progress}</p>
    </form>
  );
};
