import React, { useEffect } from "react";
import { useState } from "react";
import Head from "next/head";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { db, storage } from "../../../components/db/Firebase";
import {
  collection,
  addDoc,
  doc,
  query,
  getDocs,
  getDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useRouter } from "next/router";
import Image from "next/image";
import { AiFillDelete } from "react-icons/ai";

import dynamic from "next/dynamic";
// Dynamic import the UpdatePlayerModal component
const UpdatePlayerModal = dynamic(
  () => import("../../../components/UpdatePlayerModal"),
  { ssr: false }
);

//getserversideprops for fetching url query params
export async function getServerSideProps(context) {
  const { teamId } = context.query;
  let teamDetails = {};
  let members = [];

  // Get the document from the collection participating-teams having the id as team_id
  await getDoc(doc(db, "participating-teams", teamId)).then(async (docSnap) => {
    if (docSnap.exists()) {
      let data = docSnap.data();
      data.id = teamId;
      teamDetails = data;

      // Get all the documents from the collection participating-team-member having the teamId as data.id
      let member_col = collection(db, "participating-team-member");
      let q = query(member_col, where("teamId", "==", teamId));
      await getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let temp = doc.data();
          temp.id = doc.id;
          temp.teamId = teamId;
          members.push(temp);
        });
      });
    } else {
      console.log("No such document!");
    }
  });

  return {
    props: {
      teamDetails,
      members,
    },
  };
}

const teamId = ({ teamDetails, members }) => {
  const [loading, setLoading] = useState(false);
  const [newMember, setNewMember] = useState(false);
  const [updateMember, setUpdateMember] = useState(false);

  const addNewMember = async (e) => {
    e.preventDefault();
    setLoading(true);

    const file = e.target[0].files[0];
    const playerName = e.target[1].value;
    const playerType = e.target[2].value;
    const playerBranch = e.target[3].value;

    let downloadURL = "";
    if (file != null) {
      const storageRef = ref(storage, `players/${file.name}`);
      const metadata = {
        contentType: "image/jpeg",
      };
      await uploadBytes(storageRef, file, metadata).then(
        async (snapshot) => {
          console.log("Uploaded the image!");
          downloadURL = await getDownloadURL(storageRef);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    await addDoc(collection(db, "participating-team-member"), {
      teamId: teamDetails.id,
      name: playerName,
      type: playerType,
      imgUrl: downloadURL,
      branch: playerBranch,
    });

    alert("Player added successfully");
    location.reload();
  };

  const deletePlayer = async (details) => {
    //Prompt the user to confirm the deletion
    const confirm = await window.confirm(
      "Are you sure you want to delete this player details?"
    );
    if (!confirm) return;

    setLoading(true);
    const imgUrl = details.imgUrl;

    //Delete the team from the database
    await deleteDoc(doc(db, "participating-team-member", details.id)).then(
      () => {
        console.log("Player deleted successfully");
      }
    );

    if (imgUrl != "") {
      let jsonFile = imgUrl.split("?alt=media")[0];

      // Fetch JSON file
      let response = await fetch(jsonFile);
      let data = await response.json();

      // Get file name
      let filePath = data.name;

      // Create a reference to the file to delete
      let desertRef = ref(storage, filePath);

      // Delete the file
      await deleteObject(desertRef)
        .then(() => {
          console.log("File deleted successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    alert("Player deleted successfully");
    location.reload();
  };

  return (
    <div>
      <Head>
        <title>Team members detail update</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-gray-200 bg-opacity-50">
          <Image
            src="/loader.gif"
            alt="loading"
            width={300}
            height={300}
            className="rounded-full"
          />
        </div>
      )}
      <div className="min-h-screen">
        <div className="flex justify-center">
          <button
            className="bg-gray-800 text-white px-8 py-2 rounded-lg mt-4"
            onClick={() => router.back()}
          >
            Go back to Teams page
          </button>
        </div>
        <div className="flex flex-col">
          <p className="text-center mt-8 mb-4 text-3xl">Team details</p>
          <div className="shadow-lg mx-auto p-8 w-9/12 md:w-1/3 text-center">
            <p className="font-semibold mt-4">Team Name</p>
            <p className="text-sm text-gray-500">{teamDetails.teamName}</p>
            <p className="font-semibold mt-4">Team Type</p>
            <p className="text-sm text-gray-500">{teamDetails.teamType}</p>
            <p className="font-semibold mt-4">Gender</p>
            <p className="text-sm text-gray-500">{teamDetails.teamGender}</p>
          </div>
        </div>
        <div className="flex justify-center items-center mt-8">
          {newMember == false ? (
            <button
              className="border border-black py-2 px-4 mx-2"
              onClick={() => {
                setNewMember(true);
                setUpdateMember(false);
              }}
            >
              Add new Player
            </button>
          ) : (
            <button className="border border-black py-2 px-4 mr-2 bg-gray-800 text-white">
              Add new Player
            </button>
          )}
          {updateMember == false ? (
            <button
              className="border border-black py-2 px-4 mr-2"
              onClick={() => {
                setNewMember(false);
                setUpdateMember(true);
              }}
            >
              Update existing Players
            </button>
          ) : (
            <button className="border border-black py-2 px-4 mr-2 bg-gray-800 text-white">
              Update existing players
            </button>
          )}
        </div>
        {members.length == 0 && !newMember && (
          <p className="text-center my-10 text-3xl">No players added yet</p>
        )}
        {members.length != 0 && !newMember && !updateMember && (
          <div>
            <p className="text-center my-10 text-3xl">Team member details</p>
            <div className="flex justify-center text-center px-1">
              <div className="text-sm md:text-base overflow-x-auto">
                <table className="table-auto">
                  <thead className="border-b bg-gray-800 text-white">
                    <tr>
                      <th className="px-10 py-2">Image</th>
                      <th className="px-12 py-2">Name</th>
                      <th className="px-12 py-2">Player Type</th>
                      <th className="px-8 py-2">Branch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member, index) => (
                      <tr className="border-b" key={index}>
                        <td className="px-4 py-2">
                          {member.imgUrl != "" ? (
                            <Image
                              src={member.imgUrl}
                              width={100}
                              height={100}
                              className="border"
                              alt="No logo"
                            />
                          ) : (
                            <p className="text-center">No logo</p>
                          )}
                        </td>
                        <td className="px-4 py-auto">{member.name}</td>
                        <td className="px-4 py-auto">{member.type}</td>
                        <td className="px-4 py-auto">{member.branch}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {newMember && (
          <div className="overflow-x-auto">
            <p className="text-center my-10 text-3xl">Add Player details</p>

            <form
              className="w-full max-w-sm mx-auto px-4"
              onSubmit={addNewMember}
            >
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
                  <input id="file" type="file" />
                </div>
              </div>

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="team_name"
                  >
                    Name
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="team_name"
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="team_type"
                  >
                    Type / Degree
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="team_type"
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="team_type"
                  >
                    Branch
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="team_type"
                    type="text"
                  />
                </div>
              </div>

              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <button
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Add Player
                  </button>
                </div>
              </div>
            </form>

            {loading && (
              <p className="text-center mt-10 text-2xl">Please wait.....</p>
            )}
          </div>
        )}
        {members.length != 0 && updateMember && (
          <div>
            <p className="text-center my-10 text-3xl">Update Team details</p>
            <div className="flex justify-center text-center px-1">
              <div className="text-sm md:text-base overflow-x-auto">
                <table className="table-auto">
                  <thead className="border-b bg-gray-800 text-white">
                    <tr>
                      <th className="px-4 py-2">Update</th>
                      <th className="px-10 py-2">Image</th>
                      <th className="px-12 py-2">Player Name</th>
                      <th className="px-12 py-2">Player Type</th>
                      <th className="px-8 py-2">Branch </th>
                      <th className="px-4 py-2">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member, index) => (
                      <tr className="border-b" key={index}>
                        <td className="px-4 py-auto">
                          <UpdatePlayerModal details={member} />
                        </td>
                        <td className="px-4 py-2">
                          {member.imgUrl != "" ? (
                            <Image
                              src={member.imgUrl}
                              width={100}
                              height={100}
                              className="border"
                              alt="Team Logo"
                            />
                          ) : (
                            <p className="text-center">No logo</p>
                          )}
                        </td>
                        <td className="px-4 py-auto">{member.name}</td>
                        <td className="px-4 py-auto">{member.type}</td>
                        <td className="px-4 py-auto">{member.branch}</td>
                        <td className="text-red-600">
                          <AiFillDelete
                            className="cursor-pointer mx-auto"
                            onClick={() => deletePlayer(member)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default teamId;
