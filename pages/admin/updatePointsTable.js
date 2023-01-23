import Head from "next/head";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { db, storage } from "../../components/db/Firebase";
import { collection, doc, updateDoc, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import dynamic from "next/dynamic";

const UpdatePointsTable = () => {
  const [formData, setFormData] = React.useState({
    teamName: "",
    points: 0,
    matchWon: 0
  });
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setFormData({ ...formData, [name]: value });
  }

  const [pointsData, setpointsData] = React.useState({
    teamID: "",
    currpoints: 0,
    currmatchWon: 0,
    currmatchPlayed: 0
  });

  const getPointsTable = async (teamName) => {
    const q = query(collection(db, "participating-teams"), where("teamName", "==", teamName.target.value));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setpointsData({
        teamID: doc.id,
        currpoints: doc.data().points,
        currmatchWon: doc.data().matchWon,
        currmatchPlayed: doc.data().matchPlayed
      })
    });
  }

  const submitData = async (e) => {
    e.preventDefault();
    const data = {
      matchPlayed: pointsData.currmatchPlayed + 1,
      matchWon: Number(pointsData.currmatchWon) + Number(formData.matchWon),
      points: Number(pointsData.currpoints) + Number(formData.points)
    };
    const docRef = doc(db, "participating-teams", pointsData.teamID);
    await updateDoc(docRef, data);
    alert("Point Table Updated Successfully");
  };

  return (
    <div>
      <Head>
        <title>Update Points Table</title>
      </Head>
      <Navbar />



      <div className="overflow-x-auto">
        <p className="text-center my-10 text-3xl">Update Points Table</p>

        <form class="w-full max-w-sm mx-auto px-4" method="POST">

          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="team1"
              >
                Team Name
              </label>
            </div>
            <div class="md:w-2/3">
              <select
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="team_name"
                name="teamName"
                value={formData.teamName}
                onChange={e => { handleChange(e), getPointsTable(e) }}
                required
              >
                <option value="---">---</option>
                <option value="IMMORTALS">IMMORTALS</option>
                <option value="SHAOLIN MONKS">SHAOLIN MONKS</option>
                <option value="BELONIANS" >BELONIANS</option>
                <option value="AVENGERS">AVENGERS</option>
                <option value="VENGEANCE" >VENGEANCE</option>
                <option value="HERCULEANS">HERCULEANS</option>
                <option value="VALKAYRIES">VALKAYRIES</option>
                <option value="SCORPIANS">SCORPIANS</option>
                <option value="SPARTANS">SPARTANS</option>
                <option value="KNIGHT TEMPLARS">KNIGHT TEMPLARS</option>
                <option value="ATHENIANS">ATHENIANS</option>
                <option value="ASSYRIANS">ASSYRIANS</option>
                <option value="NINJAS">NINJAS</option>
                <option value="VIKINGS">VIKINGS</option>
                <option value="SAMARTIANS" >SAMARTIANS</option>
                <option value="AMORITES">AMORITES</option>
                <option value="SUMERIANS">SUMERIANS</option>
                <option value="AMAZONS">AMAZONS</option>
                <option value="AKKADIANS">AKKADIANS</option>
                <option value="SAMURAI">SAMURAI</option>
              </select>
            </div>
          </div>


          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="team_name"
              >
                Points scored in this match
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"

                name="points"
                type="number"
                value={formData.points}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="team_name"
              >
                If the team won enter 1 else 0
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"

                name="matchWon"
                type="number"
                value={formData.matchWon}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
              <button
                class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick={submitData}
              >
                Update Points Table
              </button>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default UpdatePointsTable;
