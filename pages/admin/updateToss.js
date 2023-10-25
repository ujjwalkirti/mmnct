import Head from "next/head";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { fetchData } from "../../components/matchFunctions.js";
import { updateToss } from "../../components/matchFunctions.js";
import { collection, getDocs } from "firebase/firestore";
import { child, ref, get } from "firebase/database";
import { database, db } from "../../components/db/Firebase";
import { signIn, useSession } from "next-auth/react";
import teams from "../../components/teams";
const UpdateMan = ({ auth_users }) => {
  const { data: session } = useSession();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = React.useState({
    tossWinner: "",
    decision: "",
  });
  const [currId, setCurrId] = useState(0);
  const [team1name, setteam1name] = useState("Team 1");
  const [team2name, setteam2name] = useState("Team 2");

  useEffect(() => {
    auth_users.forEach((user) => {
      if (user.email === session?.user?.email) {
        setValidated(true);
      }
    });
  }, [session]);

  const getMatchDetails = async (matchId) => {
    const enteredMatchId = matchId.target.value;
    setCurrId(enteredMatchId);
    const dbref = ref(database);

    try {
      if (enteredMatchId.trim() === "") {
        // If the match ID is empty, reset team names
        setteam1name("Team 1");
        setteam2name("Team 2");
        return;
      }

      let snapshot = await get(child(dbref, "matchDetail/" + enteredMatchId));

      // Assuming snapshot.val() contains the required data structure
      setteam1name(teams[snapshot.val().Team1Id].teamCode);
      setteam2name(teams[snapshot.val().Team2Id].teamCode);
      // Other data you might want to set

      // Uncomment the line below if you want to update the form data as well
      // setFormData({ ManOfTheMatch: snapshot?.val()?.ManOfTheMatch });
    } catch (error) {
      console.error("Error fetching match details:", error);
    }
  };
  useEffect(() => {
    // Here, you can perform any actions after the state has been updated
    // console.log("Team Names Updated:", team1name, team2name);
  }, [team1name, team2name]);
  // const getMatchDetails = async (matchId) => {
  //     setcurrId(matchId.target.value);
  //     const dbref = ref(database);
  //     let snapshot = await get(
  //       child(dbref, "matchDetail/" + matchId.target.value)
  //     );
  const submitData = async (e) => {
    e.preventDefault();

    // Assuming you have a function to update the Man of the Match in the database
    try {
      // Assuming you want to update the "ManOfTheMatch" field with the value from the form
      //  UpdateManOfTheMatch(currId, formData.ManOfTheMatch);
      await updateToss(currId, formData.tossWinner, formData.decision);
    console.log(formData);
      alert("Toss Updated successfully");
    } catch (error) {
      console.error("Error updating Man of the Match:", error);
      alert("Failed to update Toss");
    }
  };

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
        Sorry, you are not authorized to access this page!
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Update Toss</title>
      </Head>
      <Navbar />

      <div className="overflow-x-auto">
        <p className="text-center my-10 text-3xl">Update Toss </p>

        <div className="md:flex md:items-center mb-6 w-full max-w-sm mx-auto px-4">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="match_id"
            >
              Match ID
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="match_id"
              name="matchID"
              type="text"
              onChange={getMatchDetails}
              required
            />
          </div>
        </div>

        <form className="w-full max-w-sm mx-auto px-4" method="POST">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Match Teams
              </label>
            </div>
            <div className="md:w-2/3">
              <p className="text-gray-700">
                {" "}
                {team1name} vs {team2name}
              </p>
            </div>
          </div>
          {/* Man of the Match input */}
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="manOfTheMatch"
              >
                Toss Winner
              </label>
            </div>
            <div className="md:w-2/3">
              {/* <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="manOfTheMatch"
                name="manOfTheMatch"
                type="text"
                value={formData.tossWinner}
                onChange={(e) => setFormData({ tossWinner: e.target.value })}
                required
              /> */}

              <select
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="team1_name"
                name="Team1Id"
                value={formData.tossWinner}
                onChange={(e) => setFormData({...formData, tossWinner: e.target.value })}
                required
              >
                <option value="">---</option>
                <option value={`${team1name}`}>{`${team1name}`}</option>
                <option value={`${team2name}`}>{`${team2name}`}</option>
              </select>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="manOfTheMatch"
              >
                Decision
              </label>
            </div>
            <div className="md:w-2/3">
              {/* <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="manOfTheMatch"
                name="manOfTheMatch"
                type="text"
                value={formData.tossWinner}
                onChange={(e) => setFormData({ tossWinner: e.target.value })}
                required
              /> */}
               <select
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="team1_name"
                name="Team1Id"
                value={formData.decision}
                onChange={(e) => setFormData({...formData, decision: e.target.value })}
                required
              >
                <option value="">---</option>
                <option value="Bat">Bat</option>
                <option value="Field">Field</option>
              </select>
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick={submitData}
              >
                Update Toss
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateMan;
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
