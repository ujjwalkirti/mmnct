import Head from "next/head";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import dynamic from "next/dynamic";
import { fetchData, Team1Update, Team2Update, } from '../../components/matchFunctions.js';
import { child, ref, get } from "firebase/database";
import { database } from "../../components/db/Firebase";

const updateMatch = () => {
  const [formData, setFormData] = React.useState({
    team1Run: "",
    team2Run: "",
    comment: ""
  });
  const [currId, setcurrId] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [team1name, setteam1name] = useState("Team 1");
  const [team2name, setteam2name] = useState("Team 2");

  const getMatchDetails = async (matchId) => {
    setcurrId(matchId.target.value);
    const dbref = ref(database);
    let snapshot = await get(child(dbref, "matchDetail/" + matchId.target.value));
    setteam1name(snapshot?.val().Team1Id);
    setteam2name(snapshot?.val().Team2Id);
  }
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    const { team1Run, team2Run, comment } = formData;
    let matchStatus = "ongoing";
    if (isChecked) matchStatus = "past";
    console.log(currId);
    let data = await fetchData(currId);
    console.log(data);
    if (team1Run.length != 0) {
      let totalBall = data.Team1Score.length - 1;
      let wicket = data.Team1Wicket;
      let extras = data.Team1Extra;
      let prev = data.Team1prev;
      if ((totalBall - extras) % 6 == 0)
        prev = totalBall + 1;
      if (team1Run.length == 2 && team1Run[1] === 'w')
        wicket++;
      else if (team1Run.length == 3)
        extras++;
      await Team1Update(currId, wicket, extras, team1Run, prev, data.Team1Score, matchStatus, comment);
    } else {
      let totalBall = data.Team2Score.length;
      let wicket = data.Team2Wicket;
      let extras = data.Team2Extra;
      let prev = data.Team2prev;
      if ((totalBall - extras) % 6 == 0)
        prev = totalBall;
      if (team2Run.length == 2 && team2Run[1] === 'w')
        wicket++;
      else if (team2Run.length == 3)
        extras++;
      await Team2Update(currId, wicket, extras, team2Run, prev, data.Team2Score, matchStatus, comment);
    }
    setFormData({
      team1Run: "",
      team2Run: "",
      comment: formData.comment,
    });
    setIsChecked(false);
    alert("Match Updated successfully");
  };

  return (
    <div>
      <Head>
        <title>Update Match</title>
      </Head>
      <Navbar />

      <div className="overflow-x-auto">
        <p className="text-center my-10 text-3xl">Update Match</p>
        <div className="justify-center items-center ml-4">
          <h2>Instructions</h2>
          <p>If team1 is batting then add the score achieved on that ball only for team1, leave team2 run field empty and vice versa</p>
          <p>If run is scored than enter the number of runs scored</p>
          <p>If there's wicket down then input will be : RUNWICKET (i.e. 0w, 1w ,2w) </p>
          <p>In case of no-ball input will be : RUN NoBall (i.e. 0nb, 1nb ,2nb) </p>
          <p>In case of wide input will be : RUN Wide (i.e. 0wd, 1wd ,2wd)</p>
        </div>
        <div class="md:flex md:items-center mb-6 w-full max-w-sm mx-auto px-4">
          <div class="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="team_name"
            >
              Match ID
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="match_id"
              name="matchID"
              type="text"
              onChange={getMatchDetails}
              required
            />
          </div>
        </div>
        <form class="w-full max-w-sm mx-auto px-4" method="POST">


          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="team_name"
              >
                Enter {team1name} run on this ball
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="match_id"
                name="team1Run"
                type="text"
                value={formData.team1Run}
                onChange={handleChange}

              />
            </div>
          </div>

          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="team_name"
              >
                Enter {team2name} run on this ball
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="match_id"
                name="team2Run"
                type="text"
                value={formData.team2Run}
                onChange={handleChange}

              />
            </div>
          </div>


          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="team_name">Is match Finished ?</label>
            </div>
            <input type="checkbox" id="isFinished" name="isFinished" checked={isChecked} onChange={handleOnChange} />
          </div>

          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="team_name"
              >
                Enter comments
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="match_id"
                name="comment"
                type="text"
                value={formData.comment}
                onChange={handleChange}
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
                Update Match
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default updateMatch;
