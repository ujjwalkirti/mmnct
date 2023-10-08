import { database } from "./db/Firebase";
import { child, ref, get, set, update } from "firebase/database";
import { db } from "./db/Firebase";
//import { getFirestore, doc, updateDoc } from "firebase/firestore";
import {
  collection,
  doc,
  query,
  getDocs,
  getDoc,
  updateDoc,
  where,
} from "firebase/firestore";
const createMatch = async (ID, dateTime, Team1ID, Team2ID, category) => {
  await set(ref(database, "matchDetail/" + ID), {
    id: ID,
    timeDate: dateTime,
    Team1Id: Team1ID,
    Team2Id: Team2ID,
    Team1Score: ['-'],
    Team2Score: ['-'],
    Team1Extra: 0,
    Team2Extra: 0,
    Team1Wicket: 0,
    Team2Wicket: 0,
    Team1prev: 1,
    Team2prev: 1,
    finalComment: "Match " + ID,
    status: "upcoming",
    category: category,
    currOrder: 1
  }).then(() => {
    console.log("mattch added");
  }).catch(err => console.log(err));
}

const fetchData = async (matchId) => {
  const dbref = ref(database);
  let snapshot = await get(child(dbref, "matchDetail/" + matchId));
  return snapshot.val();
}

const Team1Update = async (matchID, wicket, extras, run, prev, score, status, comment) => {
  let nowScore;
  if (run.length === 0) nowScore = [...score];
  else nowScore = [...score, run];
  await update(ref(database, "matchDetail/" + matchID), {
    "Team1Wicket": wicket, "Team1Extra": extras, "Team1prev": prev, "Team1Score": nowScore, "status": status, "finalComment": comment
  }).then(() => {
  }).catch(err => console.log(err));
};

const Team2Update = async (matchID, wicket, extras, run, prev, score, status, comment) => {
  let nowScore;
  if (run.length === 0) nowScore = [...score];
  else nowScore = [...score, run];
  await update(ref(database, "matchDetail/" + matchID), {
    "Team2Wicket": wicket, "Team2Extra": extras, "Team2prev": prev, "Team2Score": nowScore, "status": status, "finalComment": comment
  }).then(() => {
  }).catch(err => console.log(err));
};

const totalScore = (score, extra, wicket) => {
  let currscore = 0;
  for (var i = 1; i < score.length; i++) {
    if (score[i].length > 1)
      currscore += parseInt((score[i][0]));
    else currscore += parseInt((score[i]));
  }
  currscore += extra;
  return currscore.toString() + "/" + wicket.toString();
};

const extraOfInnings = (score, extra) => {

  let extra2 = extra;
  for (var i = 1; i < score.length; i++) {
    if (score[i].endsWith("nb")) {
      extra2 = extra2 + 0;
    }
    else if (score[i].endsWith("wd") || score[i].endsWith("b")) {
      extra2 = extra2 + parseInt(score[i]);
    }

  }
  return extra2;
}
const getOver = (score, prev, extra) => {
  const thisOver = new Array();
  let curr = score.length - 1;
  let currOver = Math.floor((curr - extra) / 6);
  let currBall = (curr - extra) % 6;
  for (let i = prev; i <= curr; i++) {
    thisOver.push(score[i]);
  }
  let Over = "";
  thisOver.forEach(item => {
    Over += item;
    Over += " ";
  })
  let overFormat = (currOver.toString()) + "." + currBall.toString();
  return [overFormat, Over]
}
const addPlayerToMatch = async (matchID, teamID, playerID, playerName) => {
  // Retrieve the current match data
  //let teamID="Team1Players";
  const matchRef = ref(database, "matchDetail/" + matchID);
  const matchSnapshot = await get(matchRef);
  const matchData = matchSnapshot.val();
  //console.log(teamID);
  if (!matchData) {
    console.log("Match not found."); // Handle the case where the match doesn't exist
    return;
  }

  //Create the player object
  const playerObject = {
    playerName: playerName,
    score: Array(15).fill(0),
    status: "Did Not Bat",
    battingOrder: 0,
  };

  //Check if the team exists in the match data
  if (matchData[teamID]) {
    // Check if the players object exists for the tea

    if (matchData[teamID][playerID]) {
      console.log("Player is already added to the team.");
      return;
    }

    //Add the player object to the team's players
    matchData[teamID][playerID] = playerObject;

    //Update the database with the modified match data
    try {
      await set(matchRef, matchData);
      console.log("Player added successfully.");
    } catch (err) {
      console.error("Error adding player:", err);
    }
  } else {
    matchData[teamID] = {
      [playerID]: playerObject
    };
    await set(matchRef, matchData);
    //console.log("Team not found in the match data."); // Handle the case where the team doesn't exist in the match
  }
};

const forcefullyChangeStriker = async (matchId) => {
  try {
    const dbRef = ref(database);

    //Get the current data from the match node
    let snapshot = await get(child(dbRef, "matchDetail/" + matchId));

    //Ensure that the match node exists
    if (snapshot) {
      const matchData = snapshot.val();

      //Swap the data in the striker and non-striker fields
      const updatedData = {};
      updatedData["striker"] = matchData["nonStriker"];
      updatedData["nonStriker"] = matchData["striker"];

      //Update the data in the database
      await update(child(dbRef, "matchDetail/" + matchId), updatedData);

      //console.log("Striker and non-striker data swapped successfully.");
    } else {
      //console.log("Match node does not exist.");
    }
  } catch (error) {
    //console.error("Error swapping striker and non-striker data:", error);
  }
};

const strikerChange = async (matchId, run) => {
  try {
    const dbRef = ref(database);

    //Get the current data from the match node
    let snapshot = await get(child(dbRef, "matchDetail/" + matchId));

    //Ensure that the match node exists
    run = parseInt(run);
    if (run % 2 != 0) {
      const matchData = snapshot.val();

      //Swap the data in the striker and non-striker fields
      const updatedData = {};
      updatedData["striker"] = matchData["nonStriker"];
      updatedData["nonStriker"] = matchData["striker"];

      //Update the data in the database
      await update(child(dbRef, "matchDetail/" + matchId), updatedData);

      console.log("Striker and non-striker data swapped successfully.");
    } else {
      console.log("Match node does not exist.");
    }
  } catch (error) {
    console.error("Error swapping striker and non-striker data:", error);
  }

};
async function getTeamIdFromName(teamName) {
  try {
    //Query the "participating-teams" collection for the team with the given name
    const teamsCollection = collection(db, "participating-teams");
    const teamQuery = query(teamsCollection, where("teamName", "==", teamName));
    const querySnapshot = await getDocs(teamQuery);

    //If there is a matching team document, return its ID
    if (!querySnapshot.empty) {
      const teamDoc = querySnapshot.docs[0];
      return teamDoc.id;
    } else {
      console.log("Team not found.");
      return null;
      //Return null if the team is not found
    }
  } catch (error) {
    console.error("Error fetching team ID:", error);
    return null;
    //Handle the error and return null
  }
}

async function getPlayersByTeamName(teamName) {
  try {
    //Get the team ID using the provided function
    const teamId = await getTeamIdFromName(teamName);
    if (teamId) {

      //Query the "participating-team-member" collection for players with the matching "teamId"
      const playersCollection = collection(db, "participating-team-member");
      const playersQuery = query(playersCollection, where("teamId", "==", teamId));
      const querySnapshot = await getDocs(playersQuery);

      const players = [];

      //Iterate through the query result and extract only "player name" and "player id" fields
      querySnapshot.forEach((doc) => {
        const playerData = doc.data();
        players.push({
          id: doc.id,
          playerName: playerData.name,
          //Add more fields as needed, or omit fields you don't need
        });
      });

      return players;
    } else {
      console.log("Team not found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching players by team name:", error);
    return null;
  }

}
const updateTeam1PlayerScore = async (matchID, playerID, run) => {
  const matchRef = ref(database, "matchDetail/" + matchID + "/Team1Players");
  const matchSnapshot = await get(matchRef);
  const matchData = matchSnapshot.val();

  if (!matchData) {
    console.log("Match not found.");
    return;
  }


  if (matchData && matchData[playerID]) {
    const player = matchData[playerID];
    const scoreArray = player.score;

    //console.log("player is"+ player);
    //console.log(scoreArray);
    if (run.endsWith("w") || run.endsWith("r")) {
      run = parseInt(run);
      // console.log(run+"  w");
    }
    else if (run.endsWith("nb")) {
      run = parseInt(run);
      //console.log(run+"  nb");
    }
    else if (run.endsWith("b")) {
      //run=parseInt(run);
      run = 0;
    }
    if (!isNaN(run)) { // Check if 'run' is a valid number
      scoreArray[run] = (scoreArray[run] || 0) + 1;
      // Update the player's score in the database
      try {
        await update(matchRef, {
          [`${playerID}/score`]: scoreArray,
        });
      } catch (err) {
        console.error("Error updating player score:", err);
      }
    } else {
      console.log("Invalid run value. Score not updated.");
    }
  } else {
    console.log("Player or team not found in the match data.");
  }
};
const updateTeam2PlayerScore = async (matchID, playerID, run) => {
  const matchRef = ref(database, "matchDetail/" + matchID + "/Team2Players");
  const matchSnapshot = await get(matchRef);
  const matchData = matchSnapshot.val();

  if (!matchData) {
    console.log("Match not found.");
    return;
  }
  if (matchData && matchData[playerID]) {
    const player = matchData[playerID];
    const scoreArray = player.score;

    if (run.endsWith("w") || run.endsWith("r")) {
      run = parseInt(run);
      // console.log(run+"  w");
    }
    else if (run.endsWith("nb")) {
      run = parseInt(run);
      //console.log(run+"  nb");
    }
    else if (run.endsWith("b")) {
      //run=parseInt(run);
      run = 0;
    }

    if (!isNaN(run)) {
      // Check if 'run' is a valid number
      scoreArray[run] = (scoreArray[run] || 0) + 1;
      // Update the player's score in the database
      try {
        await update(matchRef, {
          [`${playerID}/score`]: scoreArray,
        });
      } catch (err) {
        console.error("Error updating player score:", err);
      }
    } else {
      console.log("Invalid run value. Score not updated.");
    }
  }
};
//for bowling stats the index of 12 used for no of ball bowled index 13 used for total runs index 14 used for  wicket 
const updateTeam1BowlersStats = async (matchID, playerID, run) => {
  const matchRef = ref(database, "matchDetail/" + matchID + "/Team1Players");
  const matchSnapshot = await get(matchRef);
  const matchData = matchSnapshot.val();

  if (!matchData) {
    console.log("Match not found.");
    return;
  }

  if (matchData && matchData[playerID]) {
    const player = matchData[playerID];
    const scoreArray = player.score;

    scoreArray[12]++;
    if (run.endsWith("w")) {
      scoreArray[14] = scoreArray[14] + 1;
    }
    else if (run.endsWith("nb") || run.endsWith("wd")) {
      scoreArray[13] = scoreArray[13] + 1;
      scoreArray[12]--;
    }
    else if (run.endsWith("b")) {
      //run=parseInt(run);
      run = 0;
    }
    var runs = parseInt(run);

    scoreArray[13] = scoreArray[13] + runs;
    // Update the player's run and wicket in the database
    try {
      await update(matchRef, {
        [`${playerID}/score`]: scoreArray,
      });
    } catch (err) {
      console.error("Error updating player bowling stats:", err);
    }
  } else {
    console.log("Player or team not found in the match data.");
  }
};
const updateTeam2BowlersStats = async (matchID, playerID, run) => {
  const matchRef = ref(database, "matchDetail/" + matchID + "/Team2Players");
  const matchSnapshot = await get(matchRef);
  const matchData = matchSnapshot.val();
  if (!matchData) {
    console.log("Match not found.");
    return;
  }

  if (matchData && matchData[playerID]) {
    const player = matchData[playerID];
    const scoreArray = player.score;

    scoreArray[12]++;
    if (run.endsWith("w")) {
      scoreArray[14] = scoreArray[14] + 1;
    }
    if (run.endsWith("nb") || run.endsWith("wd")) {
      scoreArray[13] = scoreArray[13] + 1;
      scoreArray[12]--;
    }
    else if (run.endsWith("b")) {
      //run=parseInt(run);
      run = 0;
    }
    var runs = parseInt(run);
    scoreArray[13] = scoreArray[13] + runs;
    // Update the player's run and wicket in the database
    try {
      await update(matchRef, {
        [`${playerID}/score`]: scoreArray,
      });
    } catch (err) {
      console.error("Error updating player bowling stats:", err);
    }
  } else {
    console.log("Player or team not found in the match data.");
  }
};

async function changeInnings(matchId) {
  await update(ref(database, "matchDetail/" + matchId), {
    "striker": null,
    "nonStriker": null,
    "currBattingTeam": null,
    "baller": null,
    "currOrder": 1
  });
}

async function afterMatchClosed(matchId) {
  const data = await fetchData(matchId);
  const Team1totalScore = totalScore(data.Team1Score,data.Team1Extra,data.Team1Wicket);
 const Team2totalScore = totalScore(data.Team2Score,data.Team2Extra,data.Team2Wicket);
 console.log(Team1totalScore);
 console.log(Team2totalScore);

const team1over=getOver(data.Team1Score,data.Team1prev,data.Team1Extra)[0];
const team2over=getOver(data.Team2Score,data.Team2prev,data.Team2Extra)[0];
  
const teamOneid = await getTeamIdFromName(data.Team1Id);
const teamTwoid= await getTeamIdFromName(data.Team2Id);
const team1TotalBalls = Math.floor(parseFloat(team1over) * 6) + parseInt(team1over.split('.')[1] || 0, 10);
const team2TotalBalls = Math.floor(parseFloat(team2over) * 6) + parseInt(team2over.split('.')[1] || 0, 10);

//console.log(teamOneid);
//console.log(teamTwoid);
await updateNetRunRate(teamOneid,teamTwoid,Team1totalScore,Team2totalScore,team1TotalBalls,team2TotalBalls);
  
let playerDetail = Object.entries(data.Team1Players);
  for (const [key, value] of playerDetail) {
    await updatePlayerHistory(key, value, matchId);
  }
  playerDetail = Object.entries(data.Team2Players);
  for (const [key, value] of playerDetail) {
    await updatePlayerHistory(key, value, matchId);
  }
  return 0;
}



const getPlayerScore = (players, player) => {
  var totalRuns = 0;
  var ballPlayed = 0;
  if (players) {
    for (var i = 0; i <= 10; i++) {
      if (players[player]) {
        console.log(players[player]);
        totalRuns += i * players[player]?.score[i];
        ballPlayed += players[player]?.score[i];
      }
    }
  }
  return totalRuns + "(" + ballPlayed + ")";
}

async function updatePlayerHistory(playerId, playerData, matchId) {

  const playerDocRef = doc(db, `participating-team-member/${playerId}`);
  getDoc(playerDocRef)
    .then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        if (!data.hasOwnProperty('stats')) {
          // Field does not exist, so add it
          const updateObject = {
            stats: playerData.score,
            [`pastrecords.${matchId}`]: playerData.score
          };
          return updateDoc(playerDocRef, updateObject);
        } else {
          const existingStats = data['stats'];
          const updatedStats = existingStats.map((value, index) => value + playerData.score[index]);
          const updateObject = {
            stats: updatedStats,
            [`pastrecords.${matchId}`]: playerData.score
          };
          return updateDoc(playerDocRef, updateObject);
        }
      } else {
        console.log('No such document!');
      }
    })
    .then(() => {
      console.log('Field added or updated successfully.');
    })
    .catch((error) => {
      console.error('Error adding or updating field:', error);
    });

}
function calculateRunRate(team1TotalScore,team2TotalScore,team1TotalBalls,team2TotalBalls){
  const [team1runs, team1wickets] = team1TotalScore.split('/').map(Number);
  const assumedteam1TotalBalls = team1wickets === 10 ? 48 : team1TotalBalls;
  const [team2runs, team2wickets] = team2TotalScore.split('/').map(Number);
  const assumedteam2TotalBalls = team2wickets === 10 ? 48 : team2TotalBalls;
//console.log(assumedteam1TotalBalls);
//console.log(assumedteam2TotalBalls);
  const rate= (team1runs*6)/assumedteam1TotalBalls -(team2runs*6)/assumedteam2TotalBalls ;
 // console.log(rate);
  return rate.toFixed(2);
}
async function updateNetRunRate(teamOneId, teamTwoId, team1TotalScore, team2TotalScore, team1TotalBalls, team2TotalBalls) {
  

  const team1Ref = db.collection('participating-teams').doc(teamOneId);
  const team2Ref = db.collection('participating-teams').doc(teamTwoId);

  const team1Data = await team1Ref.get();
  const team2Data = await team2Ref.get();
 // console.log(team1Data);
  //console.log(team2Data);

  const team1RunRate = team1Data.exists ? (team1Data.data().runRate || []) : [];
  const team2RunRate = team2Data.exists ? (team2Data.data().runRate || []) : [];

  const runRateTeam1 = calculateRunRate(team1TotalScore,team2TotalScore,team1TotalBalls,team2TotalBalls);
  const runRateTeam2 = (-1)*runRateTeam1;
  console.log(runRateTeam1);
  console.log(runRateTeam2);

  
  team1RunRate.push(runRateTeam1);
  team2RunRate.push(runRateTeam2);

 
  await team1Ref.update({
      runRate: team1RunRate,
  });

  await team2Ref.update({
      runRate: team2RunRate,
  });

  console.log('Run rates for the current match updated successfully!');
}

export {
  getOver, totalScore, createMatch, fetchData, Team1Update, Team2Update,
  getPlayersByTeamName,
  updateTeam1PlayerScore,
  updateTeam2PlayerScore,
  updateTeam1BowlersStats,
  updateTeam2BowlersStats,
  addPlayerToMatch,
  afterMatchClosed,
  forcefullyChangeStriker,
  strikerChange,
  getPlayerScore,
  changeInnings,
  extraOfInnings
};

