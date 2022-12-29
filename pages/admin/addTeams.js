import Head from "next/head";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../components/db/Firebase";
import { collection, setDoc, doc, getDoc, getDocs } from "firebase/firestore";

import Image from "next/image";
import Modal from "../../components/Modal";

// Next js getserversideprops for getting the data from the database
export async function getServerSideProps() {
  const teamsRef = collection(db, "participating-teams");
  const teamsSnap = await getDocs(teamsRef);
  const teams = teamsSnap.docs.map((doc) => doc.data());

  return {
    props: {
      teams: teams,
    },
  };
}

const AddTeams = ({ teams }) => {
  const [loading, setLoading] = useState(false);
  const [newTeam, setNewTeam] = useState(false);
  const [updateTeam, setUpdateTeam] = useState(false);

  const addTeamDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Get file from input
    const file = e.target[0].files[0];
    //Get Team name from input
    const teamName = e.target[1].value;
    //Get Team type from input
    const teamType = e.target[2].value;
    //Get Team gender from input
    const teamGender = e.target[3].value;

    let storageRef = ref(storage, `teams_logo/${teamName}.jpg`);

    const metadata = {
      contentType: "image/jpeg",
    };

    //Check if the team already exists
    const docRef = doc(db, "participating-teams", teamName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      alert("Team already exists");
      setLoading(false);
    } else {
      let downloadURL = "";
      if (file != null) {
        //Upload image to firebase storage
        await uploadBytes(storageRef, file, metadata).then(
          (snapshot) => {
            console.log("Uploaded the file!");
            //Get the download url of the image
            getDownloadURL(storageRef).then(async (URL) => {
              downloadURL = URL;
            });
          },
          (error) => {
            console.log(error);
            setLoading(false);
          }
        );
      }
      await setDoc(doc(db, "participating-teams", teamName), {
        teamName: teamName,
        teamType: teamType,
        teamLogo: downloadURL,
        teamGender: teamGender,
      });
      alert("Team added successfully");
      setLoading(false);
      location.reload();
    }
  };
  return (
    <div>
      <Head>
        <title>Team details update</title>
      </Head>
      <Navbar />
      <div className="flex justify-center items-center mt-8">
        <button
          className="border border-black py-2 px-4 my-2"
          onClick={() => {
            setNewTeam(true);
            setUpdateTeam(false);
          }}
        >
          Add new Team
        </button>
        <button
          className="border border-black py-2 px-4 my-2"
          onClick={() => {
            setNewTeam(false);
            setUpdateTeam(true);
          }}
        >
          Update existing Team
        </button>
      </div>

      {teams.length == 0 && !newTeam && (
        <p className="text-center my-10 text-3xl">No teams added yet</p>
      )}

      {teams.length != 0 && !newTeam && !updateTeam && (
        <div>
          <p className="text-center my-10 text-3xl">Existing Team details</p>
          <div className="flex justify-center text-center px-1">
            <div className="text-sm md:text-base">
              <table className="table-auto">
                <thead className="border-b bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 md:px-10 py-2">Team Logo</th>
                    <th className="px-4 md:px-10 py-2">Team Name</th>
                    <th className="px-4 md:px-10 py-2">Team Type</th>
                    <th className="px-4 md:px-10 py-2">Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => (
                    <tr className="border-b" key={index}>
                      <td className="px-4 py-2">
                        {team.teamLogo != "" ? (
                          <Image
                            src={team.teamLogo}
                            width={100}
                            height={100}
                            className="border"
                            alt="No logo"
                          />
                        ) : (
                          <p className="text-left pl-3">No logo</p>
                        )}
                      </td>
                      <td className="px-4 py-auto">{team.teamName}</td>
                      <td className="px-4 py-auto">{team.teamType}</td>
                      <td className="px-4 py-auto">{team.teamGender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {newTeam && (
        <div>
          <p className="text-center my-10 text-3xl">Add Team details</p>

          <form class="w-full max-w-sm mx-auto px-4" onSubmit={addTeamDetails}>
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
                  required
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
                  required
                />
              </div>
            </div>

            <div class="md:flex md:items-center mb-6">
              <div class="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  for="team_gender"
                >
                  Team Type
                </label>
              </div>
              <div class="md:w-2/3">
                <select
                  class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="team_gender"
                  required
                >
                  <option value="Male" selected>
                    Male
                  </option>
                  <option value="Female"> Female </option>
                </select>
              </div>
            </div>

            <div class="md:flex md:items-center">
              <div class="md:w-1/3"></div>
              <div class="md:w-2/3">
                <button
                  class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                >
                  Add Team
                </button>
              </div>
            </div>
          </form>

          {loading && (
            <p className="text-center mt-10 text-2xl">Please wait.....</p>
          )}
        </div>
      )}
      {teams.length != 0 && updateTeam && (
        <div>
          <p className="text-center my-10 text-3xl">Update Team details</p>
          <div className="flex justify-center text-center px-1">
            <div className="text-sm md:text-base">
              <table className="table-auto">
                <thead className="border-b bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 md:px-10 py-2">Update</th>
                    <th className="px-4 md:px-10 py-2">Team Logo</th>
                    <th className="px-4 md:px-10 py-2">Team Name</th>
                    <th className="px-4 md:px-10 py-2">Team Type</th>
                    <th className="px-4 md:px-10 py-2">Gender </th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => (
                    <tr className="border-b" key={index}>
                      <td className="px-4 py-auto">
                        <Modal details={team} />
                      </td>
                      <td className="px-4 py-2">
                        {team.teamLogo != "" ? (
                          <Image
                            src={team.teamLogo}
                            width={100}
                            height={100}
                            className="border"
                            alt="Team Logo"
                          />
                        ) : (
                          <p className="text-left pl-3">No logo</p>
                        )}
                      </td>
                      <td className="px-4 py-auto">{team.teamName}</td>
                      <td className="px-4 py-auto">{team.teamType}</td>
                      <td className="px-4 py-auto">{team.teamGender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTeams;
