import Image from "next/image";
import React from "react";
import { FiEdit } from "react-icons/fi";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "./db/Firebase";
import { setDoc, doc } from "firebase/firestore";

export default function UpdatePlayerModal({ details }) {
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const deleteLogo = async ({ fileName }) => {
    // Create a reference to the file to delete
    const desertRef = ref(storage, fileName);

    // Delete the file
    await deleteObject(desertRef)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const updatePlayerDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    let removeLogo = false;
    let file = null;
    let playerName = "";
    let playerType = "";
    let playerBranch = "";
    let roll_no = "";

    if (details.imgUrl != "") {
      // Get input for removing image
      removeLogo = e.target[0].checked;
      // Get input for file
      file = e.target[1].files[0];
      //Get player name from input
      playerName = e.target[2].value;
      //Get player type from input
      playerType = e.target[3].value;
      //Get player branch from input
      playerBranch = e.target[4].value;
      //Get player roll no from input
      roll_no = e.target[5].value;
    } else {
      // Get input for file
      file = e.target[0].files[0];
      //Get player name from input
      playerName = e.target[1].value;
      //Get player type from input
      playerType = e.target[2].value;
      //Get player branch from input
      playerBranch = e.target[3].value;
      //Get player roll no from input
      roll_no = e.target[4].value;
    }
    const metadata = {
      contentType: "image/jpeg",
    };

    if (playerName == "") {
      playerName = details.name;
    }

    if (playerType == "") {
      playerType = details.type;
    }

    if (playerBranch == "") {
      playerBranch = details.branch;
    }

    if (roll_no == "") {
      roll_no = details.roll_no;
    }

    let fileName = "";
    if (details.imgUrl != "") {
      let jsonFile = details.imgUrl.split("?alt=media")[0];

      // Fetch JSON file
      let response = await fetch(jsonFile);
      let data = await response.json();

      // Get file name
      fileName = data.name;
    }

    if (removeLogo && file == null) {
      await deleteLogo({ fileName });
      details.imgUrl = "";
    }

    if (file != null) {
      const storageRef = ref(storage, "players/" + file.name);
      const metadata = {
        contentType: "image/jpeg",
      };
      if (details.imgUrl != "") {
        await deleteLogo({ fileName });
      }
      await uploadBytes(storageRef, file, metadata).then(
        async (snapshot) => {
          console.log("Uploaded the file!");
          await getDownloadURL(storageRef).then(async (downloadURL) => {
            details.imgUrl = downloadURL;
          });
        },
        (error) => {
          alert(error);
        }
      );
    }

    await setDoc(doc(db, "participating-team-member", details.id), {
      teamId: details.teamId,
      name: playerName,
      type: playerType,
      imgUrl: details.imgUrl,
      branch: playerBranch,
      roll_no: roll_no,
    });

    alert("Player details updated successfully");
    setLoading(false);
    setShowModal(false);
    location.reload();
  };

  return (
    <>
      <button type="button" onClick={() => setShowModal(true)}>
        <FiEdit />
      </button>
      {showModal ? (
        <>
          {loading && (
            <div className="fixed top-0 left-0 w-full h-full z-51 flex justify-center items-center bg-gray-200 bg-opacity-50">
              <Image
                src="/loader.gif"
                alt="loading"
                width={300}
                height={300}
                className="rounded-full"
              />
            </div>
          )}
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="p-5 border-b border-solid border-slate-200 rounded-t">
                  <p className="text-xl font-semibold text-center">
                    Update details
                  </p>
                </div>
                {/*body*/}

                <form
                  className="w-full max-w-sm mx-auto px-4 py-6"
                  onSubmit={updatePlayerDetails}
                >
                  <div className="mb-6 ml-2 md:ml-6">
                    {details.imgUrl != "" ? (
                      <div>
                        <Image
                          src={details.imgUrl}
                          width={300}
                          height={300}
                          className="border"
                          alt="Player image"
                        />
                        <div className="mt-4">
                          <input type="radio" id="removeLogo" />
                          <label for="removeLogo">Remove image</label>
                        </div>
                      </div>
                    ) : (
                      <p className="py-3">No image uploaded</p>
                    )}
                  </div>

                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="file"
                      >
                        Image
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input id="file" type="file" accept="image/*" />
                    </div>
                  </div>

                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="name"
                      >
                        Name
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="name"
                        type="text"
                        placeholder={details.name}
                      />
                    </div>
                  </div>

                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="type"
                      >
                        Type / Degree
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="type"
                        type="text"
                        placeholder={details.type}
                      />
                    </div>
                  </div>

                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="branch"
                      >
                        Branch
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="branch"
                        type="text"
                        placeholder={details.branch}
                      />
                    </div>
                  </div>

                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="roll_no"
                      >
                        Roll No.
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="roll_no"
                        type="text"
                        placeholder={details.roll_no}
                      />
                    </div>
                  </div>

                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
