import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BsRecordFill } from "react-icons/bs";
import { db, database } from "../components/db/Firebase";
import { ref, onValue } from "firebase/database";
import { totalScore, getOver } from '../components/matchFunctions';
import teams from "./teams"

const HomeCard = () => {
  const [team, setteam] = useState([]);
  const getdata = async () => {
    const temp = ref(database, "matchDetail/");
    onValue(temp, async (snapshot) => {
      const data = await snapshot.val();
      setteam(data.filter((ele) => ele.status == "ongoing"));
    });
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      {team?.length === 0 ? (
        <></>
      ) : (
        <div className="mt-6 w-4/5 mx-auto">
          <div className="flex flex-col bg-white text-black rounded-lg pr-3 w-72 md: w-80 lg: w-full">
            <div
              className="bg-lime-500	w-fit px-3 py-0.5 mt-2.5 flex flex-row items-center justify-center ml-2 rounded-md font-semibold text-white mr-2"
              id="top"
            >
              <BsRecordFill />
              <p>Live</p>
            </div>
            <div className="flex flex-row pb-2.5 pt-2.5 pl-1.5" id="middle">
              <div id="logo">
                <img
                  alt="team-logo"
                  className="team-logo"
                  style={{ backgroundColor: teams[team[0].Team1Id].themeColor }}
                  src={teams[team[0].Team1Id].teamLogo}
                />
              </div>
              <div className="pl-2.5 font-bold" id="name">
                <p>{teams[team[0].Team1Id].teamCode}</p>
              </div>
              <div className="flex flex-row pl-2.5" id="comment">
                <p>{totalScore(team[0].Team1Score, team[0].Team1Extra, team[0].Team1Wicket)}</p>
                <p>({getOver(team[0].Team1Score, team[0].Team1prev, team[0].Team1Extra)[0]})</p>
              </div>
            </div>
            <div className="flex flex-row pb-2.5 pl-1.5" id="bottom">
              <div id="logo">
                <img
                  alt="team-logo"
                  className="team-logo"
                  style={{ backgroundColor: teams[team[0].Team2Id].themeColor }}
                  src={teams[team[0].Team2Id].teamLogo}
                />
              </div>
              <div className="pl-2.5 font-bold" id="name">
                <p>{teams[team[0].Team2Id].teamCode}</p>
              </div>
              <div className="flex flex-row pl-2.5" id="comment">
                <p>{totalScore(team[0].Team2Score, team[0].Team2Extra, team[0].Team2Wicket)}</p>
                <p>({getOver(team[0].Team2Score, team[0].Team2prev, team[0].Team2Extra)[0]})</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeCard;
