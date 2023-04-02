import Head from "next/head";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../components/db/Firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { signIn, useSession } from "next-auth/react";

const AddTrivia = ({ auth_users }) => {
  const { data: session } = useSession();

  const [validated, setValidated] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadType, setUploadType] = useState("");

  useEffect(() => {
    auth_users.map((user) => {
      if (user.email === session?.user?.email) {
        setValidated(true);
      }
    });
  }, [session]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    // console.log(file);
    let storageRef;
    if (uploadType === "question") {
      storageRef = ref(storage, `trivia/question.jpg`);
    } else if (uploadType === "answer") {
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
        setProgress(0);
        alert(uploadType + " Upload succesful");

        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const docRef = doc(db, "trivia", uploadType);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            //update

            const uploadRef = doc(db, "trivia", uploadType);
            await updateDoc(uploadRef, {
              src: downloadURL,
            });
          } else {
            // doc.data() will be undefined in this case
            //insert new question or answer
            const docRef = await addDoc(collection(db, "trivia", uploadType), {
              src: downloadURL,
            });
          }
        });
      }
    );
  };
  if (!session) {
    return (
      <div className="h-screen w-screen flex flex-col space-y-4 items-center justify-center">
        <p>You need to sign in to access this page!</p>
        <button
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            signIn();
          }}
        >
          Sign in
        </button>
      </div>
    );
  }

  if (!validated) {
    return (
      <div className="h-screen w-screen flex flex-col space-y-4 items-center justify-center">
        Sorry, you are not authorised to access this page!
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>Add trivia questions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <p className="text-center mt-4 text-3xl">Add Trivia Question</p>
      <form className="my-2 w-2/3 mx-auto" onSubmit={handleSubmit}>
        <input type="file" required />
        <input
          className="border border-black py-2 px-4 my-2"
          type="submit"
          value="Upload the picture"
          onClick={() => {
            setUploadType("question");
          }}
        />
      </form>
      <p>Progress: {progress}/100%</p>

      <p className="text-center mt-4 text-3xl">Add Trivia Answers</p>

      <form className="my-2 w-2/3 mx-auto" onSubmit={handleSubmit}>
        <input type="file" required />
        <input
          onClick={() => {
            setUploadType("answer");
          }}
          className="border border-black py-2 px-4 my-2"
          type="submit"
          value="Upload the picture"
        />
      </form>
    </div>
  );
};

export default AddTrivia;

export async function getServerSideProps(context) {
  const querySnapshot = await getDocs(collection(db, "auth_users"));

  let auth_users = [];

  querySnapshot.forEach((doc) => {
    auth_users.push(doc.data());
  });

  return {
    props: {
      auth_users,
    },
  };
}
