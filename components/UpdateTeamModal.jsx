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
import { updateDoc, doc } from "firebase/firestore";

export default function UpdateTeamModal({ details }) {
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

  const updateTeamDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    let removeLogo = false;
    let file = null;
    let teamName = "";
    let teamType = "";
    let teamGender = "";
    let themeColor = "";
    let teamCode = "";
    let pool = "";
    if (details.teamLogo != "") {
      // Get input for removing background
      removeLogo = e.target[0].checked;
      // Get input for file
      file = e.target[1].files[0];
      //Get Team name from input
      teamName = e.target[2].value;
      //Get Team type from input
      teamType = e.target[3].value;
      // Get Theme color from input
      themeColor = e.target[4].value;
      // Get Team code from input
      teamCode = e.target[5].value;
      // Get Team pool from input
      pool = e.target[6].value;
      //Get Team gender from input
      teamGender = e.target[7].value;
    } else {
      // Get input for file
      file = e.target[0].files[0];
      //Get Team name from input
      teamName = e.target[1].value;
      //Get Team type from input
      teamType = e.target[2].value;
      // Get Theme color from input
      themeColor = e.target[3].value;
      // Get Team code from input
      teamCode = e.target[4].value;
      // Get Team pool from input
      pool = e.target[5].value;
      //Get Team gender from input
      teamGender = e.target[6].value;
    }
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

    if (themeColor == "") {
      themeColor = details.themeColor;
    }

    if (teamCode == "") {
      teamCode = details.teamCode;
    }

    if (pool == "") {
      pool = details.pool;
    }

    let storageRef = ref(storage, `teams_logo/${teamName}.jpg`);

    let fileName = "";
    if (details.teamLogo != "") {
      let jsonFile = details.teamLogo.split("?alt=media")[0];

      // Fetch JSON file
      let response = await fetch(jsonFile);
      let data = await response.json();

      // Get file name
      fileName = data.name;
    }

    if (removeLogo && file == null) {
      await deleteLogo({ fileName });
      details.teamLogo = "";
    }

    if (file != null) {
      await uploadBytes(storageRef, file, metadata).then(
        async (snapshot) => {
          console.log("Uploaded the file!");
          await getDownloadURL(storageRef).then(async (downloadURL) => {
            details.teamLogo = downloadURL;
          });

          if (teamName != details.teamName && details.teamLogo != "") {
            await deleteLogo({ fileName });
          }
        },
        (error) => {
          alert(error);
        }
      );
    }

    // Update team details
    await updateDoc(doc(db, "participating-teams", details.id), {
      teamName: teamName,
      teamType: teamType,
      teamLogo: details.teamLogo,
      teamGender: teamGender,
      themeColor: themeColor,
      teamCode: teamCode,
      pool: pool,
    });

    alert("Team details updated successfully");
    setShowModal(false);
    setLoading(false);
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
                  onSubmit={updateTeamDetails}
                >
                  <div className="mb-6 ml-2 md:ml-6">
                    {details.teamLogo != "" ? (
                      <div>
                        <Image
                          src={details.teamLogo}
                          width={300}
                          height={300}
                          className="border"
                          style={{ backgroundColor: details.themeColor }}
                          alt="Team Logo"
                        />
                        <div className="mt-4">
                          <input type="radio" id="removeLogo" />
                          <label for="removeLogo">Remove Logo</label>
                        </div>
                      </div>
                    ) : (
                      <p className="py-3">No logo uploaded</p>
                    )}
                  </div>

                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="file"
                      >
                        Team Logo
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input id="file" type="file" />
                    </div>
                  </div>

                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="team_name"
                      >
                        Team Name
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="team_name"
                        type="text"
                        placeholder={details.teamName}
                      />
                    </div>
                  </div>

                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="team_type"
                      >
                        Team Type
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="team_type"
                        type="text"
                        placeholder={details.teamType}
                      />
                    </div>
                  </div>

                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="theme_color"
                      >
                        HEX Code
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="theme_color"
                        type="text"
                        placeholder={details.themeColor}
                      />
                    </div>
                  </div>

                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="team_code"
                      >
                        Team Code
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="team_code"
                        type="text"
                        placeholder={details.teamCode}
                      />
                    </div>
                  </div>

                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="pool"
                      >
                        Pool
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="pool"
                        type="text"
                        placeholder={details.pool}
                      />
                    </div>
                  </div>

                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                        for="team_gender"
                      >
                        Gender
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <select
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
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
