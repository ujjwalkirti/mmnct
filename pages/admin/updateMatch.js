import Head from "next/head";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  fetchData,
  forcefullyChangeStriker,
  strikerChange,
  Team1Update,
  Team2Update,
  updateTeam1BowlersStats,
  updateTeam1PlayerScore,
  updateTeam2BowlersStats,
  updateTeam2PlayerScore,
  changeInnings,
  afterMatchClosed
} from "../../components/matchFunctions.js";
import { child, ref, get } from "firebase/database";
import { database, db } from "../../components/db/Firebase";
import { signIn, useSession } from "next-auth/react";
import { collection, getDocs } from "firebase/firestore";
import CustomModal from "../../components/modal";

const UpdateMatch = ({ auth_users }) => {
  const { data: session } = useSession();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = React.useState({
    team1Run: "",
    team2Run: "",
    comment: "",
    currBattingTeam: "",
    striker: "",
    nonstriker: "",
    baller: ""
  });
  const [currId, setcurrId] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [team1name, setteam1name] = useState("Team 1");
  const [team2name, setteam2name] = useState("Team 2");
  const [striker, setStriker] = useState("Striker");
  const [nonstriker, setnonStriker] = useState("nonStriker");
  const [baller, setBaller] = useState("baller");
  const [currBattingTeam, setCurrBattingTeam] = useState("");
  const [team1Players, setTeam1Players] = useState({});
  const [team2Players, setTeam2Players] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    auth_users.map((user) => {
      if (user.email === session?.user?.email) {
        setValidated(true);
      }
    });
  }, [session]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const getMatchDetails = async (matchId) => {
    setcurrId(matchId.target.value);
    const dbref = ref(database);
    let snapshot = await get(
      child(dbref, "matchDetail/" + matchId.target.value)
    );
    setteam1name(snapshot?.val().Team1Id);
    setteam2name(snapshot?.val().Team2Id);
    setCurrBattingTeam(snapshot?.val().currBattingTeam);
    setStriker(snapshot?.val().striker);
    setnonStriker(snapshot?.val().nonStriker);
    setBaller(snapshot?.val().baller);
    setTeam1Players(snapshot?.val().Team1Players);
    setTeam2Players(snapshot?.val().Team2Players);

    if (matchId && snapshot?.val().striker === undefined || snapshot?.val().nonStriker === undefined || snapshot?.val().baller === undefined) {
      openModal();
    }
  };
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const handleForcedStrikerChange = async (e) => {
    if (e)
      e.preventDefault();
    await forcefullyChangeStriker(currId);
    let temp1 = striker;
    let temp2 = nonstriker;
    setStriker(temp2);
    setnonStriker(temp1);
  }

  const changeMatchInnings = async(e) => {
    e.preventDefault();
    await changeInnings(currId);
    alert("Innings changed Successfully.");
    openModal();
  }

  const submitData = async (e) => {
    e.preventDefault();
    let callModal = false;
    let { team1Run, team2Run, comment } = formData;
    let matchStatus = "ongoing";
    if (isChecked) matchStatus = "past";
    let data = await fetchData(currId);
    if (team1Run.length != 0) {
      let totalBall = data.Team1Score.length;
      let wicket = data.Team1Wicket;
      let extras = data.Team1Extra;
      let prev = data.Team1prev;
      if ((totalBall - extras) % 6 == 0 && (totalBall - extras) / 6 != 0) { callModal = true; handleForcedStrikerChange() }
      if ((totalBall - extras) % 6 == 0) { prev = totalBall + 1; }
      if (team1Run.length == 2 && (team1Run[1] === "w" || team1Run[1] === "r")) { wicket++; callModal = true; }
      else if (team1Run.length == 3) extras++;
      await Team1Update(
        currId,
        wicket,
        extras,
        team1Run,
        prev,
        data.Team1Score,
        matchStatus,
        comment
      );
      await updateTeam1PlayerScore(currId, striker, team1Run);
      if(team1Run!=""){await strikerChange(currId, team1Run);}
      let Team1BatsmenRun = parseInt(team1Run)
      if (Team1BatsmenRun % 2 != 0 &&!isNaN(Team1BatsmenRun)) {
        let temp1 = striker;
        let temp2 = nonstriker;
        setStriker(temp2);
        setnonStriker(temp1);
      }
      await updateTeam2BowlersStats(currId, baller, team1Run);
    } else {
      let totalBall = data.Team2Score.length;
      let wicket = data.Team2Wicket;
      let extras = data.Team2Extra;
      let prev = data.Team2prev;
      if ((totalBall - extras) % 6 == 0 && (totalBall - extras) / 6 != 0) { callModal = true; handleForcedStrikerChange() }
      if ((totalBall - extras) % 6 == 0) { prev = totalBall + 1; }
      if (team2Run.length == 2 && (team2Run[1] === "w" || team2Run[1] === "r")) { wicket++; callModal = true; }
      else if (team2Run.length == 3) extras++;
      await Team2Update(
        currId,
        wicket,
        extras,
        team2Run,
        prev,
        data.Team2Score,
        matchStatus,
        comment
      );
      await updateTeam2PlayerScore(currId, striker, team2Run);
      if(team2Run!=""){await strikerChange(currId, team2Run);}
      
      let Team2BatsmenRun = parseInt(team2Run)
      if (Team2BatsmenRun % 2 != 0 && !isNaN(Team2BatsmenRun)) {
        let temp1 = striker;
        let temp2 = nonstriker;
        setStriker(temp2);
        setnonStriker(temp1);
      }
      await updateTeam1BowlersStats(currId, baller, team2Run);
    }

    if (matchStatus === "past") {
      await afterMatchClosed(currId);
    }
    setFormData({
      team1Run: "",
      team2Run: "",
      comment: formData.comment,
      currBattingTeam: formData.currBattingTeam,
      striker: "",
      nonstriker: "",
      baller: ""
    });
    setIsChecked(false);
    alert("Match Updated successfully");
    if (callModal) openModal();
    callModal = false;
  };

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    if (name === "currBattingTeam") {
      var data1 = team1Players;
      var data2 = team2Players;
      if (value === team1name) {
        setTeam1Players(data1);
        setTeam2Players(data2);
      } else {
        setTeam2Players(data1);
        setTeam1Players(data2);
      }
    }
    setFormData({ ...formData, [name]: value });
  };
const handleEmergencyButton =async(e)=>{
  e.preventDefault();
  openModal();
}
  
  if (!session) {
    return (
      <div className="h-screen w-screen flex flex-col space-y-4 items-center justify-center">
        <p>You need to sign in to access this page!</p>
        <button
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            signIn("google");
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
        <title>Update Match</title>
      </Head>
      <Navbar />
      {
        modalIsOpen &&

        <CustomModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          matchId={currId}
          onUpdateValues={(newStriker, newNonStriker, newBaller, newCurrBattingTeam) => {
            setStriker(newStriker);
            setnonStriker(newNonStriker);
            setBaller(newBaller);
            setCurrBattingTeam(newCurrBattingTeam);
            closeModal();
          }}
        />
        //</CustomModal>
      }
      <div className="overflow-x-auto">
        <p className="text-center my-10 text-3xl">Update Match</p>
        <div className="justify-center items-center ml-4">
          <h2>Instructions</h2>
          <p>
            If team1 is batting then add the score achieved on that ball only
            for team1, leave team2 run field empty and vice versa
          </p>
          <p>If run is scored than enter the number of runs scored</p>
          <p>
            If there's wicket down then input will be : RUNWICKET (i.e. 0w, 1w
            ,2w){" "}
          </p>
          <p>
            In case of no-ball input will be : RUN NoBall (i.e. 0nb, 1nb ,2nb){" "}
          </p>
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
          {/* current Batting team */}
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="team_name"
              >
                Enter Current Batting Team
              </label>
            </div>
            <div class="md:w-2/3">
              <select
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                name="currBattingTeam"
                value={formData.currBattingTeam === '' ? currBattingTeam : formData.currBattingTeam}
                onChange={handleChange}
              >
                <option key="abcd" value="">Select a player</option>
                <option key={team1name} value={team1name}>{team1name}</option>
                <option key={team2name} value={team2name}>{team2name}</option>
              </select>
            </div>
          </div>
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
                disabled={team1name !== currBattingTeam}
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
                disabled={team2name !== currBattingTeam}
              />
            </div>
          </div>

          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="team_name"
              >
                Is match Finished ?
              </label>
            </div>
            <input
              type="checkbox"
              id="isFinished"
              name="isFinished"
              checked={isChecked}
              onChange={handleOnChange}
            />
          </div>

          {/* current Batsman */}
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="team_name"
              >
              Current Striker Details :
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="match_id"
                name="striker"
                type="text"
                disabled
                value={team1Players && team2Players ? team1Players[striker]?.playerName || team2Players[striker]?.playerName : " "}
              />
                {/* <option key="abcd" value="">Select a player</option>
                {currBattingTeam !== "" && team1Players &&
                  Object.keys(team1Players).map((playerId) => (
                    <option key={playerId} value={playerId}>
                      {team1Players[playerId].playerName}
                    </option>
                  ))} */}
            </div>
          </div>

          {/* current non-striker */}
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="team_name"
              >
                Enter Current Non-Striker Details:
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="match_id"
                name="nonstriker"
                disabled
                value={team1Players && team2Players ? team1Players[nonstriker]?.playerName || team2Players[nonstriker]?.playerName : " "}
              />
                {/* <option key="abcd" value="">Select a player</option>
                {currBattingTeam !== "" && team1Players &&
                  Object.keys(team1Players).map((playerId) => (
                    <option key={playerId} value={playerId}>
                      {team1Players[playerId].playerName}
                    </option>
                  ))}
              </select> */}
            </div>
          </div>
          <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
              <button
                class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                // onClick={handleForcedStrikerChange}
                onClick={
                  //const confirmResult = window.confirm("Are you sure you want to change the striker?");
                  // if (confirmResult) {
                  handleForcedStrikerChange
                }
              >
                Change Striker
              </button>
            </div>
          </div>
          {/* current baller */}
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="team_name"
              >
              Current Baller Details:
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="match_id"
                name="baller"
                disabled
                value={team1Players && team2Players?  team1Players[baller]?.playerName || team2Players[baller]?.playerName : " "}
                onChange={handleChange}
              />
                {/* <option value="">Select a player</option>
                {currBattingTeam !== "" && team2Players &&
                  Object.keys(team2Players).map((playerId) => (
                    <option value={playerId}>
                      {team2Players[playerId].playerName}
                    </option>
                  ))}
              </select> */}
            </div>
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
          <br></br>
          <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
              <button
                class="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick={changeMatchInnings}
              >
                Change Innings
              </button>
            </div>
          </div>
          <br></br>
          <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
              <button
                class="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick= {handleEmergencyButton}
              >
                Emergency Button
              </button>
            </div>
          </div>
        </form >
      </div >
      <Footer />
    </div >
  );
};

export default UpdateMatch;

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