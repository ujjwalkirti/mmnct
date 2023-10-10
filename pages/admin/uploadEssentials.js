import { doc, setDoc, collection, getDocs } from "firebase/firestore";

import {
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { db, storage } from "../../components/db/Firebase";
import { signIn, useSession } from "next-auth/react";

const Upload = ({ auth_users }) => {
  const [progress, setProgress] = useState(0);
  const { data: session } = useSession();
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    auth_users.map((user) => {
      if (user.email === session?.user?.email) {
        setValidated(true);
      }
    });
  }, [session]);

  const SponsorhipBrochureSubmit = async (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    let storageRef = ref(storage, `sponsorship_brochure/main.pdf`);

    let uploadTask;
    await getMetadata(storageRef)
      .then((metadata) => {
        // Metadata now contains the metadata for 'sponsorship_brochure/main.pdf'

        uploadTask = uploadBytesResumable(storageRef, file, metadata);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        uploadTask = uploadBytesResumable(storageRef, file);
      });

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
        alert("Brochure Upload succesful");

        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await setDoc(doc(db, "sponsorship", "brochure"), {
            src: downloadURL,
          });
        });
      }
    );
  };
  const title = "font-bold text-center";
  const formStyle = " border border-black px-2 py-2 my-2";

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
    <div className="flex fle-col justify-center">
      <div className={formStyle}>
        <p className={title}>Upload Sponsorship Brochure</p>
        <form onSubmit={SponsorhipBrochureSubmit}>
          <input type="file" required />

          <input
            className="border border-black py-2 px-4 my-2"
            type="submit"
            value="Upload the picture"
          />
        </form>
        <p>Progress: {progress}/100%</p>
      </div>
    </div>
  );
};

export default Upload;

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
