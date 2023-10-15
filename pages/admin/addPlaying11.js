
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { addPlayerToMatch, getPlayersByTeamName } from "../../components/matchFunctions";
import { child, ref, get } from "firebase/database";
import { db, database } from "../../components/db/Firebase";
import { signIn, useSession } from "next-auth/react";
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

function AddPlaying11({ auth_users }) {
  const router = useRouter();
  const { matchId } = router.query;
  const { data: session } = useSession();
  const [validated, setValidated] = useState(false);
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [selectedTeam1Player, setSelectedTeam1Player] = useState("");
  const [selectedTeam2Player, setSelectedTeam2Player] = useState("");
  const [selectedPlayersTeam1, setSelectedPlayersTeam1] = useState([]);
  const [selectedPlayersTeam2, setSelectedPlayersTeam2] = useState([]);
  const [team1Name, setteam1name] = useState("Team 1");
  const [team2Name, setteam2name] = useState("Team 2");
  const [currId, setcurrId] = useState(0);

  useEffect(() => {
    if (team1Name) {
      getPlayersByTeamName(team1Name)
        .then((players) => {
          setTeam1Players(players);
        })
        .catch((error) => {
          console.error("Error fetching Team 1 players:", error);
        });
    }
  }, [team1Name]);

  useEffect(() => {
    if (team2Name) {
      getPlayersByTeamName(team2Name)
        .then((players) => {
          setTeam2Players(players);
        })
        .catch((error) => {
          console.error("Error fetching Team 2 players:", error);
        });
    }
  }, [team2Name]);

  useEffect(() => {
    auth_users.map((user) => {
      if (user.email === session?.user?.email) {
        setValidated(true);
      }
    });
  }, [session]);

  const getMatchDetails = async (matchId) => {
    setcurrId(matchId.target.value);
    const dbref = ref(database);
    let snapshot = await get(
      child(dbref, "matchDetail/" + matchId.target.value)
    );
    setteam1name(snapshot?.val().Team1Id);
    setteam2name(snapshot?.val().Team2Id);
  };

  const handleTeam1PlayerChange = (e) => {
    setSelectedTeam1Player(e.target.value);
  };

  const handleTeam2PlayerChange = (e) => {
    setSelectedTeam2Player(e.target.value);
  };

  const handleSubmitTeam1 = () => {
    if (selectedTeam1Player && selectedPlayersTeam1.length < 11) {
      // Check if the player is already selected
      const isPlayerSelected = selectedPlayersTeam1.some(
        (player) => player.playerName === selectedTeam1Player
      );

      if (!isPlayerSelected) {
        // Create a new object with player name and ID and add it to the selected players array for Team 1
        const player = {
          playerName: selectedTeam1Player,
          playerId: team1Players.find(
            (player) => player.playerName === selectedTeam1Player
          )?.id || "",
        };
        setSelectedPlayersTeam1([...selectedPlayersTeam1, player]);
        // Clear the selection
        setSelectedTeam1Player("");
      } else {
        alert("This player is already selected for Team 1.");
      }
    } else if (selectedPlayersTeam1.length >= 11) {
      alert("You have already selected 11 players for Team 1.");
    }
  };

  const handleSubmitTeam2 = () => {
    if (selectedTeam2Player && selectedPlayersTeam2.length < 11) {
      // Check if the player is already selected
      const isPlayerSelected = selectedPlayersTeam2.some(
        (player) => player.playerName === selectedTeam2Player
      );

      if (!isPlayerSelected) {
        // Create a new object with player name and ID and add it to the selected players array for Team 2
        const player = {
          playerName: selectedTeam2Player,
          playerId: team2Players.find(
            (player) => player.playerName === selectedTeam2Player
          )?.id || "",
        };
        setSelectedPlayersTeam2([...selectedPlayersTeam2, player]);
        // Clear the selection
        setSelectedTeam2Player("");
      } else {
        alert("This player is already selected for Team 2.");
      }
    } else if (selectedPlayersTeam2.length >= 11) {
      alert("You have already selected 11 players for Team 2.");
    }
  };

  const handleDeselectTeam1 = (playerName) => {
    // Remove the player from the selected players array for Team 1
    setSelectedPlayersTeam1(
      selectedPlayersTeam1.filter((player) => player.playerName !== playerName)
    );
  };

  const handleDeselectTeam2 = (playerName) => {
    // Remove the player from the selected players array for Team 2
    setSelectedPlayersTeam2(
      selectedPlayersTeam2.filter((player) => player.playerName !== playerName)
    );
  };
  // const handleFinalSubmit = () => {
  //   // Submit selected players for Team 1
  //   selectedPlayersTeam1.forEach((player) => {
  //     console.log(player.playerId + "  "+ player.playerName+"   " );
  //      addPlayerToMatch(matchId, "Team1Players", player.playerId, player.playerName);
  //   });

  //   // Submit selected players for Team 2
  //   selectedPlayersTeam2.forEach((player) => {
  //     console.log(player.playerId + "  "+ player.playerName+"   " );
  //     addPlayerToMatch(matchId, "Team2Players", player.playerId, player.playerName);
  //   });

  //   // Clear the selected players arrays
  //   //setSelectedPlayersTeam1([]);
  //   //setSelectedPlayersTeam2([]);
  // };
  const handleFinalSubmit = async () => {
    // Define a function to submit players for a specific team
    const submitPlayers = async (teamID, players) => {
      for (const player of players) {
        await addPlayerToMatch(currId, teamID, player.playerId, player.playerName);
      }
    };

    // Use the defined function to submit players for Team 1
    await submitPlayers("Team1Players", selectedPlayersTeam1);

    // Use the defined function to submit players for Team 2
    await submitPlayers("Team2Players", selectedPlayersTeam2);

    // Clear the selected players arrays
    setSelectedPlayersTeam1([]);
    setSelectedPlayersTeam2([]);
  };
  if (!session) {
    return (
      <div className="h-screen w-screen flex flex-col space-y-4 items-center justify-center">
        <p>You need to sign in to access this page!</p>
        <button
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            signIn();
          }}
        >
          Sign in
        </button>
      </div>
    );
  }
  //console.log(session);
  if (!validated) {
    return (
      <div className="h-screen w-screen flex flex-col space-y-4 items-center justify-center">
        Sorry, you are not authorised to access this page!
      </div>
    );
  }

  return (
    <><div class="md:flex md:items-center mb-6 w-full max-w-sm mx-auto px-4">
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
          required />
      </div>
    </div>
      <div className="bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">Match ID: {currId}</h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Team 1: {team1Name}</h2>
          <div className="mb-4">
            <label className="block text-gray-600">Select a player for Team 1:</label>
            <select
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={selectedTeam1Player}
              onChange={handleTeam1PlayerChange}
            >

              <option value="">Select a player</option>
              {team1Players &&
                team1Players.map((player) => (
                  <option key={player.id} value={player.playerName}>
                    {player.playerName}
                  </option>
                ))}
            </select>
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={handleSubmitTeam1}
          >
            Submit for Team 1
          </button>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Selected Players for Team 1:</h3>
            <ul className="mt-2">
              {selectedPlayersTeam1.map((player, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between mb-2 border-b pb-2"
                >
                  {`${player.playerName} (ID: ${player.playerId})`}
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                    onClick={() => handleDeselectTeam1(player.playerName)}
                  >
                    Deselect
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Team 2: {team2Name}</h2>
          <div className="mb-4">
            <label className="block text-gray-600">Select a player for Team 2:</label>
            <select
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={selectedTeam2Player}
              onChange={handleTeam2PlayerChange}
            >
              <option value="">Select a player</option>
              {team2Players &&
                team2Players.map((player) => (
                  <option key={player.id} value={player.playerName}>
                    {player.playerName}
                  </option>
                ))}
            </select>
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={handleSubmitTeam2}
          >
            Submit for Team 2
          </button>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Selected Players for Team 2:</h3>
            <ul className="mt-2">
              {selectedPlayersTeam2.map((player, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between mb-2 border-b pb-2"
                >
                  {`${player.playerName} (ID: ${player.playerId})`}
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                    onClick={() => handleDeselectTeam2(player.playerName)}
                  >
                    Deselect
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
            onClick={handleFinalSubmit}
          >
            Final Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default AddPlaying11;

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
