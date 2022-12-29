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
import { setDoc, deleteDoc, doc } from "firebase/firestore";

export default function Modal({ details }) {
  const [showModal, setShowModal] = React.useState(false);

  const updateTeamDetails = async (e) => {
    e.preventDefault();
    // Get file from input
    let file = e.target[0].files[0];
    //Get Team name from input
    let teamName = e.target[1].value;
    //Get Team type from input
    let teamType = e.target[2].value;
    //Get Team gender from input
    let teamGender = e.target[3].value;

    const metadata = {
      contentType: "image/jpeg",
    };

    if (teamName == "") {
      teamName = details.teamName;
    }

    if (teamType == "") {
      teamType = details.teamType;
    }

    if (teamGender == "") {
      teamGender = details.teamGender;
    }

    let storageRef = ref(storage, `teams_logo/${teamName}.jpg`);

    if (file != null) {
      await uploadBytes(storageRef, file, metadata).then(
        async (snapshot) => {
          console.log("Uploaded the file!");
          await getDownloadURL(storageRef).then(async (downloadURL) => {
            details.teamLogo = downloadURL;
          });

          if (teamName != details.teamName) {
            // Create a reference to the file to delete
            const desertRef = ref(
              storage,
              `teams_logo/${details.teamName}.jpg`
            );

            // Delete the file
            await deleteObject(desertRef)
              .then(() => {
                console.log("File deleted successfully");
              })
              .catch((error) => {
                alert(error);
              });
          }
        },
        (error) => {
          alert(error);
        }
      );
    }

    if (teamName != details.teamName) {
      // Delete the old document and create a new one
      await deleteDoc(doc(db, "participating-teams", details.teamName));
    }
    await setDoc(doc(db, "participating-teams", teamName), {
      teamName: teamName,
      teamType: teamType,
      teamLogo: details.teamLogo,
      teamGender: teamGender,
    });
    alert("Team details updated successfully");
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
                  class="w-full max-w-sm mx-auto px-4 py-6"
                  onSubmit={updateTeamDetails}
                >
                  <div class="mb-6 ml-2 md:ml-6">
                    {details.teamLogo != "" ? (
                      <Image
                        src={details.teamLogo}
                        width={300}
                        height={300}
                        className="border"
                      />
                    ) : (
                      <p className="py-3">No logo uploaded</p>
                    )}
                  </div>
                  <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                      <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="file"
                      >
                        Team Logo
                      </label>
                    </div>
                    <div class="md:w-2/3">
                      <input id="file" type="file" />
                    </div>
                  </div>

                  <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                      <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="team_name"
                      >
                        Team Name
                      </label>
                    </div>
                    <div class="md:w-2/3">
                      <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="team_name"
                        type="text"
                        placeholder={details.teamName}
                      />
                    </div>
                  </div>

                  <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                      <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="team_type"
                      >
                        Team Type
                      </label>
                    </div>
                    <div class="md:w-2/3">
                      <input
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="team_type"
                        type="text"
                        placeholder={details.teamType}
                      />
                    </div>
                  </div>

                  <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                      <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="team_gender"
                      >
                        Gender
                      </label>
                    </div>
                    <div class="md:w-2/3">
                      <select
                        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="team_gender"
                        required
                      >
                        {details.teamGender === "Male" ? (
                          <>
                            <option value="Male" selected>
                              Male
                            </option>
                            <option value="Female"> Female </option>
                          </>
                        ) : (
                          <>
                            <option value="Male">Male</option>
                            <option value="Female" selected>
                              Female
                            </option>
                          </>
                        )}
                      </select>
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
