import Head from "next/head";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../components/db/Firebase";

const AddTrivia = () => {
  const [progress, setProgress] = useState(0);
  const [uploadType, setUploadType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    console.log(e);
    let storageRef;
    if (uploadType === "question") {
      storageRef = ref(storage, `trivia/question.jpg`);
    } else {
      storageRef = ref(storage, `trivia/answer.jpg`);
    }
    const metadata = {
      contentType: "image/jpeg",
    };

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const local_progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(local_progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        alert("Please try again, the process failed!");
      },
      () => {
        // Handle successful uploads on complete

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };
  return (
    <div>
      <Head>
        <title>Add trivia questions</title>
      </Head>
      <Navbar />
      AddTrivia
      <form
        className="my-2 w-2/3 mx-auto"
        onSubmit={() => {
          handleSubmit();
          setUploadType("question");
        }}
      >
        <input type="file" required />
        <input
          className="border border-black py-2 px-4 my-2"
          type="submit"
          value="Upload the picture"
        />
      </form>
      <p>Progress: {progress}/100%</p>
    </div>
  );
};

export default AddTrivia;
