import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BsRecordFill } from "react-icons/bs";
import { db, database } from "../components/db/Firebase";
import { ref, onValue } from "firebase/database";
import { totalScore, getOver } from "../components/matchFunctions";
import teams from "./teams";
import { VscCircleFilled } from "react-icons/vsc";
import Image from "next/image";
import { getPlayerScore } from "../components/matchFunctions";
import { GiCricketBat, GiTennisBall } from "react-icons/gi";

const HomeCard = () => {
  const [over_summary, setover_summary] = useState([]);
  const [team, setTeam] = useState([]);
  const getdata = async () => {
    const temp = ref(database, "matchDetail/");
    onValue(temp, async (snapshot) => {
      const matchObject = await snapshot.val();
      let data = [];
      if (matchObject)
        Object.keys(matchObject).map((key) => {
          data.push(matchObject[key]);
        });
      setTeam(data.filter((ele) => ele.status == "ongoing"));
    });
  };

  useEffect(() => {
    const setCurrOver = () => {
      if (team[0]) {
        if (team[0].currBattingTeam === team[0].Team1Id) {
          const val = getOver(
            team[0].Team1Score,
            team[0].Team1prev,
            team[0].Team1Extra
          )[1];
          const data = val.split(" ");
          data.pop();
          setover_summary(data);
        } else {
          const val = getOver(
            team[0].Team2Score,
            team[0].Team2prev,
            team[0].Team2Extra
          )[1];
          const data = val.split(" ");
          data.pop();
          setover_summary(data);
        }
      }
    };
    setCurrOver();
  }, [team]);

  const shortformstyle = " rounded-full h-[62px] aspect-square w-[62px] ";
  useEffect(() => {
    getdata();
  }, []);

  // const over_summary = [1, 4, 6, "W", "2NB", 0, "2WD", 3, "W"];
  const over = over_summary.map((bowl_value) => (
    <div
      key={bowl_value}
      className={`h-[25px] w-[25px] text-xs font-semibold ${bowl_value.toString().slice(-2).toUpperCase().endsWith("W") ||
        bowl_value.toString().slice(-2).toUpperCase().endsWith("R")
        ? "bg-red-600"
        : bowl_value === "4" || bowl_value === "6"
          ? "bg-[#6360FF]"
          : bowl_value.toString().slice(-2).toUpperCase().endsWith("WD") ||
            bowl_value.toString().slice(-2).toUpperCase().endsWith("NB")
            ? "bg-green-500 text-[10px]"
            : "bg-gray-500"
        }  flex justify-center items-center rounded-full text-white ring-2 ring-[#F9BD48]`}>
      <span className="  ">{bowl_value.toUpperCase() === "0W" ? "W" : bowl_value.slice(-1).toUpperCase() === "R" ? `${parseInt(bowl_value, 10)}w` : bowl_value}</span>
    </div>
  ));

  return (
    <>
      {team?.length === 0 ? (
        <>
          {daysCaluclator() < 0 ?
            <>
              <div className=" flex justify-center items-center w-4/5 md:w-[400px] days-counter mx-auto md:mx-0 md:mb-4 md:gap-4 h-[116px] md:h-[150px]">
                <span className="text-[#F45178] font-[800] text-[96px] md:-[120px] leading-[117px] md:leading-[146.28px] text-center w-1/2 md:w-[35%]">
                  {-daysCaluclator()}
                </span>
                <div className="text-[#991746]">
                  <p className="font-[700] text-[40px] md:text-[48px] leading-[49px]">
                    DAYS
                  </p>
                  <p className="font-[500] text-[40px] md:text-[48px] leading-[49px]">
                    {" "}
                    TO GO
                  </p>
                </div>
              </div>
            </>
            :
            <>
            <div className=" flex justify-center items-center w-4/5 md:w-[400px] days-counter mx-auto md:mx-0 md:mb-4 md:gap-4 h-[116px] md:h-[150px]">
                {/* <span className="text-[#F45178] font-[800] text-[96px] md:-[120px] leading-[117px] md:leading-[146.28px] text-center w-1/2 md:w-[35%]">
                  {daysCaluclator()}
                </span> */}
                <div className="text-[#991746]">
                  <p className="font-[700] text-[40px] md:text-[48px] leading-[49px]">
                    DAY
                  </p>
                  {/* <p className="font-[500] text-[40px] md:text-[48px] leading-[49px]">
                    {" "}
                    TO GO
                  </p> */}
                </div>
                <span className="text-[#F45178] font-[800] text-[96px] md:-[120px] leading-[117px] md:leading-[146.28px] text-center w-1/2 md:w-[35%]">
                  {daysCaluclator() + 1}
                </span>
              </div>
              </>
          }
        </>
      ) : (
        <Link href={`/scorecard?matchId=${team[0].id}`}>
          <div className=" w-4/5 md:w-[400px] days-counter mx-auto md:mx-0 md:mb-4 md:gap-4 h-auto pt-1 ">
            <div className=" w-full my-2 px-2">
              <div className=" flex justify-between text-black items-center">
                <p className="  text-2xl font-extrabold text-[#F8C156] px-2 bg-white shadow-lg rounded-2xl">
                  {" "}
                  <span className=" text-green-600 mx-1 rounded-full">
                    <VscCircleFilled className=" animate-pulse inline-block  text-sm bg-green-600 overflow-hidden rounded-full t" />
                  </span>
                  Live
                </p>
                <p className=" text-sm font-bold text-[#F8C156]">
                  {/* Match Date */}
                  Match {team[0].id}
                </p>
              </div>
            </div>
            <div className=" teams  flex px-2 mb-1">
              <div className=" team_1 flex justify-around  w-[43%]">
                <div className=" flex justify-center text-center items-center w-full sm:w-[50%] flex-col  ">
                  <div className="flex flex-row  " id="middle">
                    <div id="logo" className="">
                      <img
                        alt="team-logo"
                        className={shortformstyle}
                        style={{
                          backgroundColor: teams[team[0].Team1Id].themeColor,
                        }}
                        src={teams[team[0].Team1Id].teamLogo}
                      />
                    </div>
                  </div>
                  {/* Team 1 name info */}
                  <p className=" text-black text-sm font-bold">
                    {teams[team[0].Team1Id].teamCode}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    ({teams[team[0].Team1Id].teamType})
                  </p>
                </div>
                <div className=" score text-red-600 w-auto sm:w-[50%] mt-5 text-center  ">
                  {/* team 1 score */}
                  <p className=" text-sm font-bold">
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
                      "Yet to bat"
                    ) : (
                      <>
                        {totalScore(
                          team[0].Team1Score,
                          team[0].Team1Extra,
                          team[0].Team1Wicket
                        )}
                        <p className=" text-xs font-thin">
                          (
                          {totalScore(
                            team[0].Team1Score,
                            team[0].Team1Extra,
                            team[0].Team1Wicket
                          ) === "0/0" &&
                            getOver(
                              team[0].Team1Score,
                              team[0].Team1prev,
                              team[0].Team1Extra
                            )[0] === "0.0"
                            ? "Yet to bat"
                            : getOver(
                              team[0].Team1Score,
                              team[0].Team1prev,
                              team[0].Team1Extra
                            )[0]}
                          )
                        </p>{" "}
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className=" w-[14%] mt-3 ">
                <Image
                  src="/vector-8.png"
                  height={60}
                  width={60}
                  className=" object-contain aspect-square"
                />
              </div>
              <div className=" team_2 flex  flex-row-reverse justify-around  w-[43%]">
                <div className=" flex justify-center text-center items-center w-full sm:w-[50%] flex-col  ">
                  <div className="flex flex-row " id="middle">
                    <div id="logo" className=" ">
                      <img
                        alt="team-logo"
                        className={shortformstyle}
                        style={{
                          backgroundColor: teams[team[0].Team2Id].themeColor,
                        }}
                        src={teams[team[0].Team2Id].teamLogo}
                      />
                    </div>
                  </div>
                  {/* team 2 name info */}
                  <p className=" text-black text-sm font-bold">
                    {teams[team[0].Team2Id].teamCode}
                  </p>
                  <p className=" text-[10px] text-gray-500">
                    ({teams[team[0].Team2Id].teamType})
                  </p>
                </div>
                <div className=" score w-auto sm:w-[50%] text-red-600 mt-5 text-center ">
                  <p className=" text-sm font-bold ">
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
                      "Yet to bat"
                    ) : (
                      <>
                        {totalScore(
                          team[0].Team2Score,
                          team[0].Team2Extra,
                          team[0].Team2Wicket
                        )}
                        <p className=" text-xs font-thin">
                          (
                          {totalScore(
                            team[0].Team2Score,
                            team[0].Team2Extra,
                            team[0].Team2Wicket
                          ) === "0/0" &&
                            getOver(
                              team[0].Team2Score,
                              team[0].Team2prev,
                              team[0].Team2Extra
                            )[0] === "0.0"
                            ? "Yet to bat"
                            : getOver(
                              team[0].Team2Score,
                              team[0].Team2prev,
                              team[0].Team2Extra
                            )[0]}
                          )
                        </p>{" "}
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <hr className=" h-0 border-dashed bg-[#F8C156]   w-[95%] mx-auto" />
            <div className=" Bat_and_bowl_stats flex justify-between text-black px-5 mb-1">
              {team[0].currBattingTeam === team[0].Team1Id ? (
                <>
                  <div className=" Bat_stat text-left  ">
                    {/* batting team stats -- striker and non-striker */}
                    <p className=" text-sm font-bold mb-1">
                      {teams[team[0].Team1Id].teamCode} Batting
                    </p>
                    <p className=" text-xs font-semibold">
                      {
                        team[0].Team1Players[team[0].striker]?.playerName.split(
                          " "
                        )[0]
                      }
                      :{" "}
                      {getPlayerScore(team[0]?.Team1Players, team[0]?.striker)}
                      <span className="">
                        <GiCricketBat className=" inline-block rotate-180 text-pink-600 " />
                      </span>
                    </p>
                    <p className="text-xs font-light pr-1">
                      {
                        team[0].Team1Players[
                          team[0].nonStriker
                        ]?.playerName.split(" ")[0]
                      }
                      :{" "}
                      {getPlayerScore(
                        team[0]?.Team1Players,
                        team[0]?.nonStriker
                      )}
                    </p>
                  </div>
                  <div className=" Bowl_stat text-right">
                    {/* Active Bowler info */}
                    <p className=" text-sm font-bold">
                      {teams[team[0].Team2Id].teamCode}-Bowling
                    </p>
                    <p className=" text-xs font-light">
                      <GiTennisBall className=" inline-block rotate-180 text-pink-600 " />{" "}
                      {
                        team[0].Team2Players[team[0].baller]?.playerName.split(
                          " "
                        )[0]
                      }
                      : {team[0].Team2Players[team[0].baller]?.score[14]}-
                      {team[0].Team2Players[team[0].baller]?.score[13]}(
                      {Math.floor(
                        team[0].Team2Players[team[0].baller]?.score[12] === undefined ? 0 : team[0].Team2Players[team[0].baller]?.score[12] / 6
                      )}
                      .{team[0].Team2Players[team[0].baller]?.score[12] === undefined ? 0 : team[0].Team2Players[team[0].baller]?.score[12] % 6})
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* {console.log(team[0].Team2Players[team[0].baller]?.score[14]}-{team[0]?.Team2Players[team[0].baller]?.score[13]}({Math.floor(team[0]?.Team2Players[team[0].baller]?.score[12] / 6)}.{team[0]?.Team2Players[team[0]?.baller]?.score[12] % 6))} */}
                  <div className=" Bowl_stat text-left">
                    {/* Active Bowler info */}
                    <p className=" text-sm font-bold">
                      {team[0]?.Team1Id.teamCode} Bowling
                    </p>
                    <p className=" text-xs font-light">
                      <GiTennisBall className=" inline-block rotate-180 text-pink-600 " />{" "}
                      {
                        team[0]?.Team1Players[
                          team[0]?.baller
                        ]?.playerName.split(" ")[0]
                      }
                      : {team[0]?.Team1Players[team[0].baller]?.score[14]}-
                      {team[0]?.Team1Players[team[0].baller]?.score[13]}(
                      {Math.floor(
                        team[0]?.Team1Players[team[0].baller]?.score[12] === undefined ? 0 : team[0]?.Team1Players[team[0].baller]?.score[12] / 6
                      )}
                      .{team[0]?.Team1Players[team[0]?.baller]?.score[12] === undefined ? 0 : team[0]?.Team1Players[team[0]?.baller]?.score[12] % 6})
                    </p>
                  </div>
                  <div className=" Bat_stat text-right  ">
                    {/* batting team stats -- striker and non-striker */}
                    <p className=" text-sm font-bold mb-1">
                      {teams[team[0].Team2Id].teamCode} Batting
                    </p>
                    <p className=" text-xs font-semibold">
                      <span className="">
                        <GiCricketBat className=" inline-block rotate-180 text-pink-600 " />
                      </span>
                      {
                        team[0]?.Team2Players[
                          team[0].striker
                        ]?.playerName.split(" ")[0]
                      }
                      :{" "}
                      {getPlayerScore(team[0]?.Team2Players, team[0]?.striker)}
                    </p>
                    <p className="text-xs font-light pr-1">
                      {
                        team[0]?.Team2Players[
                          team[0].nonStriker
                        ]?.playerName.split(" ")[0]
                      }
                      :{" "}
                      {getPlayerScore(
                        team[0]?.Team2Players,
                        team[0]?.nonStriker
                      )}
                    </p>
                  </div>
                </>
              )}
            </div>
            <hr className=" h-0 border-dashed bg-[#F8C156]  w-[95%] mx-auto" />
            <div className="Over pb-3 px-2">
              <div className=" flex justify-center text-sm mb-1 font-bold  text-black ">
                THIS OVER
              </div>
              <div className=" Over_detail flex justify-center flex-wrap gap-4 ">
                {over}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default HomeCard;
function fetchDate() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month.toString().length === 1) {
    month = "0" + month;
  }

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${year}-${month}-${day}`;
  console.log("currentDate",currentDate);
  return currentDate;
}
function daysCaluclator() {
  var date = fetchDate();
  var today = new Date(date);
  var date_to_reply = new Date("2023-10-26");
  var timeinmilisec = today.getTime() - date_to_reply.getTime();
  // console.log(Math.floor(timeinmilisec / (1000 * 60 * 60 * 24)));
  return Math.floor(timeinmilisec / (1000 * 60 * 60 * 24));
}
