import  { database }  from "./db/Firebase";
import { child, ref, get, set, update } from "firebase/database";

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
    finalComment: "Match "+ID,
    status: "upcoming",
    category: category
  }).then(() => {
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

export {
  getOver, totalScore, createMatch, fetchData, Team1Update, Team2Update
};
