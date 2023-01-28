import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BsRecordFill } from "react-icons/bs";
import { db, database } from "../components/db/Firebase";
import { ref, onValue } from "firebase/database";
import { totalScore, getOver } from "../components/matchFunctions";
import teams from "./teams";

const HomeCard = () => {
  const [team, setteam] = useState([]);
  const getdata = async () => {
    const temp = ref(database, "matchDetail/");
    onValue(temp, async (snapshot) => {
      const data = await snapshot.val();
      setteam(data.filter((ele) => ele.status == "ongoing"));
    });
  };
  const shortformstyle = "h-[38px] w-[52px] md:h-[50px] md:w-[62px]";
  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      {team?.length === 0 ? (
        <>
          <div></div>
        </>
      ) : (
        <div className=" flex flex-col justify-center ml-12 pr-16 pl-3 w-fit md:w-fit md:pr-28 days-counter md:mx-auto md:mb-4 h-fit">
          <div
            className="bg-lime-500 w-fit px-3 py-0.5 mt-2.5 flex flex-row items-center justify-center ml-2 rounded-md font-semibold text-white mr-2"
            id="top"
          >
            <BsRecordFill />
            <p>Live</p>
          </div>
          <div className="flex flex-row pb-2.5 pt-2.5 pl-1.5" id="middle">
            <div id="logo" className="">
              <img
                alt="team-logo"
                className={shortformstyle}
                style={{ backgroundColor: teams[team[0].Team1Id].themeColor }}
                src={teams[team[0].Team1Id].teamLogo}
              />
            </div>
            <div
              className="pl-2.5 font-bold pt-2.5 text-xl text-black"
              id="name"
            >
              <p>{teams[team[0].Team1Id].teamCode}</p>
            </div>
            {totalScore(
              team[0].Team1Score,
              team[0].Team1Extra,
              team[0].Team1Wicket
            ) === "0/0" &&
            getOver(
              team[0].Team1Score,
              team[0].Team1prev,
              team[0].Team1Extra
            )[0] === "0.0" ? (
              <div
                className="flex flex-row ml-3.5 pt-3 text-red-600 text-xl font-semibold"
                id="comment"
              >
                <p>Yet to bat</p>
              </div>
            ) : (
              <div
                className="flex flex-row ml-3.5 pt-3 text-red-600 text-xl font-semibold"
                id="comment"
              >
                <p>
                  {totalScore(
                    team[0].Team1Score,
                    team[0].Team1Extra,
                    team[0].Team1Wicket
                  )}{" "}
                  (
                  {
                    getOver(
                      team[0].Team1Score,
                      team[0].Team1prev,
                      team[0].Team1Extra
                    )[0]
                  }
                  )
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-row pb-2.5 pl-1.5" id="bottom">
            <div id="logo">
              <img
                alt="team-logo"
                className={shortformstyle}
                style={{ backgroundColor: teams[team[0].Team2Id].themeColor }}
                src={teams[team[0].Team2Id].teamLogo}
              />
            </div>
            <div
              className="pl-2.5 font-bold pt-2.5 text-xl text-black"
              id="name"
            >
              <p>{teams[team[0].Team2Id].teamCode}</p>
            </div>
            {totalScore(
              team[0].Team2Score,
              team[0].Team2Extra,
              team[0].Team2Wicket
            ) === "0/0" &&
            getOver(
              team[0].Team2Score,
              team[0].Team2prev,
              team[0].Team2Extra
            )[0] === "0.0" ? (
              <div
                className="flex flex-row ml-3.5 pt-3 text-red-600 text-xl font-semibold"
                id="comment"
              >
                <p>Yet to bat</p>
              </div>
            ) : (
              <div
                className="flex flex-row ml-3.5 pt-3 text-red-600 text-xl font-semibold"
                id="comment"
              >
                <p>
                  {totalScore(
                    team[0].Team2Score,
                    team[0].Team2Extra,
                    team[0].Team2Wicket
                  )}{" "}
                  (
                  {
                    getOver(
                      team[0].Team2Score,
                      team[0].Team2prev,
                      team[0].Team2Extra
                    )[0]
                  }
                  )
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HomeCard;

function daysCaluclator() {
  var today = new Date();
  var date_to_reply = new Date("2023-01-26");
  var timeinmilisec = today.getTime() - date_to_reply.getTime();
  // console.log(Math.floor(timeinmilisec / (1000 * 60 * 60 * 24)));
  return Math.floor(timeinmilisec / (1000 * 60 * 60 * 24));
}
