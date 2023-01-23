import Head from "next/head";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../../components/db/Firebase";
import {
  collection,
  addDoc,
  doc,
  query,
  getDocs,
  deleteDoc,
  getCountFromServer,
  where,
} from "firebase/firestore";
import Image from "next/image";
import dynamic from "next/dynamic";
import { AiFillDelete } from "react-icons/ai";
import Link from "next/link";
import { GoLinkExternal } from "react-icons/go";

//Next js dynamic import Modal
const UpdateTeamModal = dynamic(() =>
  import("../../components/UpdateTeamModal")
);

//Next js dynamic import Footer
const Footer = dynamic(() => import("../../components/Footer"));

// Next js getserversideprops for getting the data from the database
export async function getServerSideProps() {
  const teamsRef = collection(db, "participating-teams");
  const teamsSnap = await getDocs(teamsRef);
  const teams = teamsSnap.docs.map((doc) => doc.data());

  // Store the id of the document in the data
  teams.forEach((team, index) => {
    team.id = teamsSnap.docs[index].id;
  });

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
    // Get Theme color from input
    let themeColor = e.target[3].value;
    // Get the Team code from input
    const teamCode = e.target[4].value;
    // Get the Team Pool from input
    const pool = e.target[5].value;
    //Get Team gender from input
    const teamGender = e.target[6].value;

    if (themeColor == "") {
      themeColor = "#FFFFFF";
    }

    let storageRef = ref(storage, `teams_logo/${teamName}.jpg`);

    const metadata = {
      contentType: "image/jpeg",
    };

    //Check if the team already exists
    const coll = collection(db, "participating-teams");
    const query_ = query(coll, where("teamName", "==", teamName));
    const snapshot = await getCountFromServer(query_);

    if (snapshot.data().count > 0) {
      alert("Team already exists");
      setLoading(false);
    } else {
      let downloadURL = "";
      if (file != null) {
        //Upload image to firebase storage
        await uploadBytes(storageRef, file, metadata).then(
          async (snapshot) => {
            console.log("Uploaded the file!");
            //Get the download url of the image
            await getDownloadURL(storageRef).then((URL) => {
              downloadURL = URL;
            });
          },
          (error) => {
            console.log(error);
            setLoading(false);
          }
        );
      }

      await addDoc(collection(db, "participating-teams"), {
        teamName: teamName,
        teamType: teamType,
        teamLogo: downloadURL,
        teamGender: teamGender,
        matchPlayed: 0,
        matchWon: 0,
        points: 0,
        themeColor: themeColor,
        captainId: "",
        viceCaptainId: "",
        teamCode: teamCode,
        pool: pool,
      });

      alert("Team added successfully");
      location.reload();
    }
  };

  const deleteTeam = async (details) => {
    //Prompt the user to confirm the deletion
    const confirm = await window.confirm(
      "Are you sure you want to delete this team?"
    );
    if (!confirm) return;

    setLoading(true);
    const teamLogo = details.teamLogo;

    //Delete the team from the database
    await deleteDoc(doc(db, "participating-teams", details.id)).then(
      async () => {
        console.log("Team deleted successfully");
        // Delete all the players of the team which are in collection "participating-team-member"
        const coll = collection(db, "participating-team-member");
        const query_ = query(coll, where("teamId", "==", details.id));
        const snapshot = await getDocs(query_);
        snapshot.forEach(async (doc) => {
          if (doc.data().imgUrl != "") {
            // Delete the player image from the storage folder "players"
            let jsonFile = doc.data().imgUrl.split("?alt=media")[0];

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
                console.log("Player image deleted successfully");
              })
              .catch((error) => {
                console.log(error);
              });
          }

          // Delete the player from the database
          await deleteDoc(doc(db, "participating-team-member", doc.id)).then(
            async () => {
              console.log("Player deleted successfully");
            }
          );
        });
      }
    );

    if (teamLogo != "") {
      let jsonFile = teamLogo.split("?alt=media")[0];

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
    alert("Team deleted successfully");
    location.reload();
  };
  return (
    <div>
      <Head>
        <title>Team details update</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="min-h-screen">
        <div className="flex justify-center items-center mt-8">
          {newTeam == false ? (
            <button
              className="border border-black py-2 px-4 mx-2"
              onClick={() => {
                setNewTeam(true);
                setUpdateTeam(false);
              }}
            >
              Add new Team
            </button>
          ) : (
            <button className="border border-black py-2 px-4 mr-2 bg-gray-800 text-white">
              Add new Team
            </button>
          )}
          {updateTeam == false ? (
            <button
              className="border border-black py-2 px-4 mr-2"
              onClick={() => {
                setNewTeam(false);
                setUpdateTeam(true);
              }}
            >
              Update existing Team
            </button>
          ) : (
            <button className="border border-black py-2 px-4 mr-2 bg-gray-800 text-white">
              Update existing Team
            </button>
          )}
        </div>

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
        {teams.length == 0 && !newTeam && (
          <p className="text-center my-10 text-3xl">No teams added yet</p>
        )}
        {teams.length != 0 && !newTeam && !updateTeam && (
          <div>
            <p className="text-center my-10 text-3xl">Existing Team details</p>
            <div className="flex justify-center text-center px-1">
              <div className="text-sm md:text-base overflow-x-auto">
                <table className="table-auto">
                  <thead className="border-b bg-gray-800 text-white">
                    <tr>
                      <th className="px-10 py-2">Team Logo</th>
                      <th className="px-12 py-2">Team Name</th>
                      <th className="px-12 py-2">Team Type</th>
                      <th className="px-8 py-2">Gender</th>
                      <th className="px-8 py-2">HEX Code</th>
                      <th className="px-8 py-2">Team Code</th>
                      <th className="px-8 py-2">Pool</th>
                      <th className="px-4 py-2">Members</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team, index) => (
                      <tr className="border-b" key={index}>
                        <td className="py-2 flex justify-center items-center">
                          {team.teamLogo != "" ? (
                            <Image
                              src={team.teamLogo}
                              width={100}
                              height={100}
                              className="border"
                              style={{ backgroundColor: team.themeColor }}
                              alt="No logo"
                            />
                          ) : (
                            <p>No logo</p>
                          )}
                        </td>
                        <td className="px-4 py-auto">{team.teamName}</td>
                        <td className="px-4 py-auto">{team.teamType}</td>
                        <td className="px-4 py-auto">{team.teamGender}</td>
                        <td className="px-4 py-auto">{team.themeColor}</td>
                        <td className="px-4 py-auto">
                          {team.teamCode == "" ? "-" : team.teamCode}
                        </td>
                        <td className="px-4 py-auto">
                          {team.pool == "" ? "-" : team.pool}
                        </td>
                        <td className="py-auto">
                          <Link href={`/admin/addTeamMembers/${team.id}`}>
                            <GoLinkExternal className="cursor-pointer mx-auto" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {newTeam && (
          <div className="overflow-x-auto">
            <p className="text-center my-10 text-3xl">Add Team details</p>

            <form
              className="w-full max-w-sm mx-auto px-4"
              onSubmit={addTeamDetails}
            >
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
                    Team Type
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
                    for="theme_color"
                  >
                    HEX code
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="theme_color"
                    type="text"
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
                    <option value="Male" selected>
                      Male
                    </option>
                    <option value="Female"> Female </option>
                  </select>
                </div>
              </div>

              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <button
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
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
              <div className="text-sm md:text-base overflow-x-auto">
                <table className="table-auto">
                  <thead className="border-b bg-gray-800 text-white">
                    <tr>
                      <th className="px-4 py-2">Update</th>
                      <th className="px-10 py-2">Team Logo</th>
                      <th className="px-12 py-2">Team Name</th>
                      <th className="px-12 py-2">Team Type</th>
                      <th className="px-8 py-2">Gender</th>
                      <th className="px-8 py-2">HEX Code</th>
                      <th className="px-8 py-2">Team Code</th>
                      <th className="px-8 py-2">Pool</th>
                      <th className="px-4 py-2">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams.map((team, index) => (
                      <tr className="border-b" key={index}>
                        <td className="px-4 py-auto">
                          <UpdateTeamModal details={team} />
                        </td>
                        <td className="py-2 flex justify-center items-center">
                          {team.teamLogo != "" ? (
                            <Image
                              src={team.teamLogo}
                              width={100}
                              height={100}
                              className="border"
                              style={{ backgroundColor: team.themeColor }}
                              alt="Team Logo"
                            />
                          ) : (
                            <p>No logo</p>
                          )}
                        </td>
                        <td className="px-4 py-auto">{team.teamName}</td>
                        <td className="px-4 py-auto">{team.teamType}</td>
                        <td className="px-4 py-auto">{team.teamGender}</td>
                        <td className="px-4 py-auto">{team.themeColor}</td>
                        <td className="px-4 py-auto">
                          {team.teamCode == "" ? "-" : team.teamCode}
                        </td>
                        <td className="px-4 py-auto">
                          {team.pool == "" ? "-" : team.pool}
                        </td>
                        <td className="px-4 py-auto text-red-600">
                          <AiFillDelete
                            className="cursor-pointer mx-auto"
                            onClick={() => deleteTeam(team)}
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

export default AddTeams;
