import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { RiTeamFill } from "react-icons/ri";
import { TbCricket } from "react-icons/tb";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";
// import { useRouter } from 'next/router';
import { database } from "../components/db/Firebase";
import { ref, get, onValue } from "firebase/database";
import {
  totalScore,
  getOver,
  extraOfInnings,
} from "../components/matchFunctions";
import Link from "next/link";
import teams from "../components/teams";
const Scorecard = () => {
  const router = useRouter();
  const { matchId } = router.query;

  // Sample data (replace with your actual data)
  const [selectedTeam, setSelectedTeam] = useState("team1");
  const [matchData, setMatchData] = useState(null);
  const [team1BattingData, setTeam1BattingData] = useState([]); // State to store team1 batting data
  const [team2BattingData, setTeam2BattingData] = useState([]); // State to store team2 batting data
  const [team1BowlingData, setTeam1BowlingData] = useState([]);
  const [team2BowlingData, setTeam2BowlingData] = useState([]);
  const [team1Totalrun, setTeam1Totalrun] = useState([]);
  const [team2Totalrun, setTeam2Totalrun] = useState([]);
  const [team1Over, setTeam1Over] = useState([]);
  const [team2Over, setTeam2Over] = useState([]);
  const [team1Extras, setTeam1Extras] = useState([]);
  const [team2Extras, setTeam2Extras] = useState([]);
  const [male_color, setmale_color] = useState(true);
  const getPlayerScore = (score) => {
    var totalRuns = 0;
    //var ballPlayed = 0;
    if (score) {
      for (var i = 0; i < 10; i++) {
        if (score[i]) {
          // console.log(score[i]);
          totalRuns += i * score[i];
        }
      }
    }
    return totalRuns;
  };
  const getPlayerBalls = (score) => {
    //var totalRuns = 0;
    var ballPlayed = 0;
    if (score) {
      for (var i = 0; i < 10; i++) {
        if (score) {
          ballPlayed += score[i];
        }
      }
    }
    return ballPlayed;
  };
  const ballsToOvers = (balls) => {
    const overs = Math.floor(balls / 6) + (balls % 6) / 10;
    return overs.toFixed(1); // Return overs with one decimal place
  };
  function calculateEconomyRate(runsConceded, noOfBallsBowled) {
    if (noOfBallsBowled === 0) {
      console.error("Overs bowled cannot be zero.");
      return null;
    }

    const economyRate = (runsConceded / noOfBallsBowled) * 6;
    return economyRate.toFixed(2); // Rounding to two decimal places
  }
  useEffect(() => {
    if (matchId) {
      const matchRef = ref(database, "matchDetail/" + matchId);

      const unsubscribe = onValue(matchRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          // console.log("helooo" + data);
          setMatchData(data);
          setTeam1BattingData(data.Team1Players);
          setTeam2BattingData(data.Team2Players);
          setTeam1BowlingData(data.Team1Players);
          setTeam2BowlingData(data.Team2Players);
          setTeam1Totalrun(
            totalScore(data.Team1Score, data.Team1Extra, data.Team1Wicket)
          );
          setTeam2Totalrun(
            totalScore(data.Team2Score, data.Team2Extra, data.Team2Wicket)
          );
          setTeam1Over(
            getOver(data.Team1Score, data.Team1prev, data.Team1Extra)[0]
          );
          setTeam2Over(
            getOver(data.Team2Score, data.Team2prev, data.Team2Extra)[0]
          );
          setTeam1Extras(extraOfInnings(data.Team1Score, data.Team1Extra));
          setTeam2Extras(extraOfInnings(data.Team2Score, data.Team2Extra));
          setmale_color(data.category === "male" ? true : false);
          //console.log(data);
        } else {
          console.log("No match data available");
        }
      });

      // Cleanup the listener when the component unmounts
      return () => {
        unsubscribe();
      };
    }
  }, [matchId]);
  var runs;
  var balls;
  // Function to calculate the strike rate
  const calculateStrikeRate = (runs, balls) => {
    if (balls === 0) {
      return 0; // Avoid division by zero
    }
    const strikeRate = (runs / balls) * 100;
    return strikeRate.toFixed(1); // Round to 2 decimal places
  };
  // console.log(matchData +" helo000");
  const team1Datas = teams[matchData?.Team1Id];
  const team2Datas = teams[matchData?.Team2Id];

  //console.log(team1Datas);
  const color1 = team1Datas?.themeColor;
  //console.log(color1);
  const color2 = team2Datas?.themeColor;

  //console.log(color2);
  // const team1_color = "bg-[#1f1f1f]";

  // const team2_color = `bg-[${color2}]`;
  // console.log("hii" + team2_color);
  // const color_1 = "[#1f1f1f]";
  // const color_2 = "[#fdffff]";
  const team1_color = `bg-[${teams[matchData?.Team1Id]?.themeColor}]`;
  const team2_color = `bg-[${teams[matchData?.Team2Id]?.themeColor}]`;
  const ballteam2 = `bowling_stats w-full h-12 mt-[7px] ${team2_color} flex align-middle items-center justify-between rounded-3xl text-white text-sm sm:text-xl  px-4`;

  //   const teamColor=(TeamId)=>{
  //     const teamDatas=teams[TeamId];
  //     const color2=teamDatas?.themeColor;
  //     const teamColor = `bg-[${color2}]`
  //  return teamColor
  //   }

  const populateBattingStats = (battingData) => {
    const battingPlayers = [];
    const yetToBatPlayers = [];

    Object.keys(battingData).forEach((playerId) => {
      const player = battingData[playerId];

      if (player.status === "Did Not Bat") {
        yetToBatPlayers.push(player);
      } else {
        battingPlayers.push({ ...player, playerId });
      }
    });

    // Sort battingPlayers by batting order
    battingPlayers.sort((a, b) => a.battingOrder - b.battingOrder);

    //const players = [1, 2, 3, 4, 5]; // Active player

    // when Batsman starts playing ********
    return (
      <>
        <Head>
          <title>Scorecard</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {battingPlayers.map((player) => (
          <div key={player.playerName} className="wrapp">
            <div className="player_stat text-black text-sm sm:text-md md:text-lg lg:texl-xl flex align-middle items-center justify-between px-4  ">
              <div className="  w-[40%] ">
                <p className=" not-italic font-semibold leading-[normal] ">
                  {/* Batsman name */}
                  <Link href={`/player-details/${player.playerId}`}>
                    {player.playerName}
                  </Link>
                </p>
              </div>
              <div className=" w-[60%]  flex text-right">
                <p className=" not-italic font-medium leading-[normal] w-[30%]">
                  {/* batsmans score */}
                  {/* 200 */}
                  {getPlayerScore(player.score)}
                  <span className=" text-xs font-light">
                    {/* total ball played */}
                    {/* (34) */}({getPlayerBalls(player.score)})
                  </span>
                </p>

                <p className=" not-italic font-normal leading-[normal] w-[20%]">
                  {/* No of 4s */}
                  {player.score[4]}
                </p>
                <p className=" not-italic font-normal leading-[normal] w-[20%]">
                  {/* No of 6s */}
                  {player.score[6]}
                </p>
                <p className=" not-italic font-normal leading-[normal] w-[30%]">
                  {/* strike rate */}
                  {calculateStrikeRate(
                    getPlayerScore(player.score),
                    getPlayerBalls(player.score)
                  )}
                </p>
              </div>
            </div>
            <p className=" my-1 px-4 text-black  text-xs sm:text-sm not-italic font-normal leading-[normal] tracking-wider">
              {" "}
              {/* our detail or not out if playing */}
              {/* c player x,b player y */}
              {player.status}
            </p>
            <hr className=" w-[95%] text-center mx-auto bg-black h-0 mb-2" />
          </div>
        ))}
      </>
    );
  };

  const yetToBatStats = (battingData) => {
    let yetToBat = [];

    Object.keys(battingData).forEach((playerId) => {
      let player = battingData[playerId];
      // console.log("kii" + player);

      if (player.status === "Did Not Bat") {
        yetToBat.push({ playerId, ...player });
      }
    });

    return yetToBat;
  };
  // const teamName =  matchData.Team1Id;

  // // Find the team data based on the team name
  // const teamData = Object.values(teams).find(team => team.teamName === teamName);

  const populateBowlingStats = (bowlingData) => {
    return Object.keys(bowlingData).map((playerId) => {
      const player = bowlingData[playerId];

      if (player.score[12] === 0) {
        return null;
      }
      return (
        <div className="wrapp">
          <div className="player_stat flex text-black  text-sm sm:text-md md:text-lg lg:text-xl align-middle items-center justify-between px-4 my-2 mt-4  ">
            <div className="sm:w-[40%] w-[50%]  ">
              <p className=" not-italic  font-semibold leading-[normal] ">
                {/* Bowler name */}
                <Link href={`/player-details/${playerId}`}>
                  {player.playerName}
                </Link>
              </p>
            </div>
            <div className=" w-[50%]  sm:w-[60%] flex text-right">
              <p className=" not-italic font-normal leading-[normal] w-[25%] ">
                {/* No of over */}
                {ballsToOvers(player.score[12])}
              </p>
              <p className=" not-italic font-normal leading-[normal] w-[20%]">
                {/* total run spend */}
                {player.score[13]}
              </p>
              <p className="not-italic font-normal leading-[normal] w-[20%]">
                {/* No of wickets */}
                {player.score[14]}
              </p>
              <p className=" not-italic font-normal leading-[normal] w-[35%]">
                {/* Bowler Economy */}
                {/* 6.95 */}
                {calculateEconomyRate(player.score[13], player.score[12])}
              </p>
            </div>
          </div>
          <hr className=" w-[95%] text-center mx-auto bg-black" />
        </div>
      );
    });
  };

  // Extra Runs ***********

  const team1kaExtra = (
    <div className="Extra  ">
      <div className="flex flex-direction=row text-sm sm:text-md md:text-lg lg:text-xl item-left sm:flex-row h-auto justify-between align-middle py-2">
        <p className=" px-4 text-black  not-italic font-semibold leading-[normal] tracking-[2px]">
          Extras
        </p>
        <p className="text-[#000F95] px-4 text-left text-xs sm:text-sm md:text-md lg:text-lg  not-italic font-semibold leading-[normal] tracking-[2px] ">
          {/* Total Extra */}
          {team1Extras}
          {/* <span className="text-black  not-italic font-light leading-[normal]">
          
            (NB 4 , W 3, LB 4)
          </span> */}
        </p>
      </div>
      <hr className="w-[95%] text-center  mx-auto bg-black my-1" />
    </div>
  );
  const team2kaExtra = (
    <div className="Extra  ">
      <div className="flex flex-direction=row text-sm sm:text-md md:text-lg lg:text-xl item-left sm:flex-row h-auto justify-between align-middle py-2">
        <p className=" px-4 text-black  not-italic font-semibold leading-[normal] tracking-[2px]">
          Extras
        </p>
        <p className="text-[#000F95] px-4 text-left text-xs sm:text-sm md:text-md lg:text-lg  not-italic font-semibold leading-[normal] tracking-[2px] ">
          {/* Total Extra */}
          {team2Extras}
          {/* <span className="text-black  not-italic font-light leading-[normal]">
          
            (NB 4 , W 3, LB 4)
          </span> */}
        </p>
      </div>
      <hr className="w-[95%] text-center  mx-auto bg-black my-1" />
    </div>
  );

  // Total Runs ********

  const team1Total_runs = (
    <div className="Extra  ">
      <div className=" px-4 flex flex-direction=row font-semibold text-sm sm:text-md md:text-lg lg:text-xl text-black item-left sm:flex-row h-auto justify-between align-middle py-2">
        <p className="  not-italic font-semibold leading-[normal] tracking-[2px]">
          Total runs
        </p>
        <p className="text-[#000F95]  text-left text-xs sm:text-sm md:text-md lg:text-lg  not-italic font-semibold leading-[normal] tracking-[2px] ">
          {/* Total run of a team */}
          {team1Totalrun}
          <span className="text-black  not-italic font-light leading-[normal]">
            {/* summary */}({team1Over})
          </span>
        </p>
      </div>
      <hr className="w-[95%] text-center mx-auto bg-black" />
    </div>
  );
  const team2Total_runs = (
    <div className="Extra  ">
      <div className=" px-4 flex flex-direction=row font-semibold text-sm sm:text-md md:text-lg lg:text-xl text-black item-left sm:flex-row h-auto justify-between align-middle py-2">
        <p className="  not-italic font-semibold leading-[normal] tracking-[2px]">
          Total runs
        </p>
        <p className="text-[#000F95]  text-left text-xs sm:text-sm md:text-md lg:text-lg  not-italic font-semibold leading-[normal] tracking-[2px] ">
          {/* Total run of a team */}
          {team2Totalrun}
          <span className="text-black  not-italic font-light leading-[normal]">
            {/* summary */}({team2Over})
          </span>
        </p>
      </div>
      <hr className="w-[95%] text-center mx-auto bg-black" />
    </div>
  );

  // for changing the team1 to team2

  const [team_1, seteam_1] = useState(true);
  const [team_2, seteam_2] = useState(false);

  const handlechange_1 = () => {
    if (team_1 === false) {
      seteam_1(true);
      seteam_2(false);
      //console.log("1");
    }
  };

  const handlechange_2 = () => {
    if (team_2 === false) {
      seteam_2(true);
      seteam_1(false);
      // console.log("2");
    }
  };

  //  overall  team 1 REcord *****************************************888***

  //   const team1Datas =  teams[matchData?.Team1Id];

  //  const team2Datas =  teams[matchData?.Team2Id];

  // const teamno_1 = (
  //   <div>
  //     {team_1 && (
  //       <div className="team_1">
  //         {yetToBatStats(team1BattingData).length !== 11 && (
  //           <div className=" batting px-3   ">

  //             <div
  //               className={`batting_stats w-full  h-12 ${team_1 ? `bg-[${teams[matchData?.Team1Id]?.themeColor}]` : `bg-[${teams[matchData?.TeamId]?.themeColor}]`} flex align-middle items-center justify-between rounded-3xl mt-3  px-4 text-white text-sm sm:text-xl mb-2`}>
  //               <p className="w-[40%]  not-italic font-semibold leading-[normal] tracking-[2px] ">
  //                 Batting
  //               </p>

  //               <div className=" w-[60%] flex text-right">
  //                 <p className=" not-italic font-bold leading-[normal] w-[30%] ">
  //                   R(B)
  //                 </p>

  //                 <p className=" not-italic font-bold leading-[normal] w-[20%]">
  //                   4s
  //                 </p>
  //                 <p className=" not-italic font-bold leading-[normal] w-[20%]">
  //                   6s
  //                 </p>
  //                 <p className=" not-italic font-bold leading-[normal] w-[30%]">
  //                   S/R
  //                 </p>
  //               </div>
  //             </div>
  //             {populateBattingStats(team1BattingData)}
  //             {team1kaExtra}
  //             {team1Total_runs}
  //             {/* Yet to bat team 1  */}
  //             <div className=" px-4  font-semibold text-sm sm:text-md md:text-lg lg:text-xl text-black item-left sm:flex-row h-auto justify-between align-middle py-2">
  //               <p className="  not-italic font-semibold leading-[normal] tracking-[2px]">
  //                 Yet To Bat
  //               </p>
  //               <p className="text-[#000F95]  text-left text-xs sm:text-sm md:text-md lg:text-lg   not-italic font-medium leading-[normal]  ">
  //                 {yetToBatStats(team1BattingData).map((player, index, array) => (
  //                   <span key={player.playerId}>
  //                     {/* Render relevant information about the player */}
  //                     {player.playerName}
  //                     {/* Add a comma and space after each player name, except for the last one */}
  //                     {index < array.length - 1 ? ', ' : ''}
  //                   </span>
  //                 ))}
  //               </p>
  //             </div>
  //           </div>
  //         {/* {*****************Bowling***********} */}
  //         <div className="bowling px-3 py-4">
  //           <div
  //             className={ballteam2}>
  //             <p className=" sm:w-[40%] w-[50%] not-italic font-semibold leading-[normal] tracking-[2px] ">
  //               Bowlers
  //             </p>
  //             <div className=" flex w-[50%] sm:w-[60%] text-right">
  //               <p className=" not-italic font-bold leading-[normal] w-[25%] ">
  //                 O
  //               </p>
  //               <p className=" not-italic font-bold leading-[normal] w-[20%] ">
  //                 R
  //               </p>
  //               <p className=" not-italic font-bold leading-[normal] w-[20%]">
  //                 W
  //               </p>
  //               <p className=" not-italic font-bold leading-[normal] w-[35%]">
  //                 ECO
  //               </p>
  //             </div>
  //           </div>
  //           {/* {console.log(team2BowlingData)} */}
  //           {populateBowlingStats(team2BowlingData)}
  //         </div>
  //         )
  //         }
  //       </div>

  //     )}
  //   </div>

  // );
  //   const teamno_1 = (
  //     <div>
  //       {team_1 && (
  //         <div className="team_1">
  //           {yetToBatStats(team1BattingData).length !== 11 && (
  //             <div className="batting px-3">
  //               <div
  //                 className="batting_stats w-full h-12 ${team_1? `background-color-[${teams[matchData?.Team1Id]?.themeColor}]` : `background-color-[${teams[matchData?.TeamId]?.themeColor}]`} flex align-middle items-center justify-between rounded-3xl mt-3 px-4 text-white text-sm sm:text-xl mb-2" style={{
  //   backgroundColor: team_1
  //     ? `${teams[matchData?.Team1Id]?.themeColor}`
  //     : `${teams[matchData?.TeamId]?.themeColor}`,
  // }}

  //               >
  //                 <p className="w-[40%] not-italic font-semibold leading-[normal] tracking-[2px]" >
  //                   Batting
  //                 </p>
  //                 <div className=" w-[60%] flex text-right">
  //                   <p className="not-italic font-bold leading-[normal] w-[30%]">
  //                     R(B)
  //                   </p>
  //                   <p className="not-italic font-bold leading-[normal] w-[20%]">
  //                     4s
  //                   </p>
  //                   <p className="not-italic font-bold leading-[normal] w-[20%]">
  //                     6s
  //                   </p>
  //                   <p className="not-italic font-bold leading-[normal] w-[30%]">
  //                     S/R
  //                   </p>
  //                 </div>
  //               </div>
  //               {populateBattingStats(team1BattingData)}
  //               {team1kaExtra}
  //               {team1Total_runs}
  //               {/* Yet to bat team 1  */}
  //               <div className=" px-4 font-semibold text-sm sm:text-md md:text-lg lg:text-xl text-black item-left sm:flex-row h-auto justify-between align-middle py-2">
  //                 <p className="not-italic font-semibold leading-[normal] tracking-[2px]">
  //                   Yet To Bat
  //                 </p>
  //                 <p className="text-[#000F95] text-left text-xs sm:text-sm md:text-md lg:text-lg not-italic font-medium leading-[normal]">
  //                   {yetToBatStats(team1BattingData).map(
  //                     (player, index, array) => (
  //                       <span key={player.playerId}>
  //                         {/* Render relevant information about the player */}
  //                         {player.playerName}
  //                         {/* Add a comma and space after each player name, except for the last one */}
  //                         {index < array.length - 1 ? ', ' : ''}
  //                       </span>
  //                     )
  //                   )}
  //                 </p>
  //               </div>
  //             </div>
  //           )}
  //           {yetToBatStats(team1BattingData).length === 11 && (
  //   <div>
  //     <p className="w-[40%] not-italic font-semibold leading-[normal] tracking-[2px]">
  //       TeamLineUp
  //     </p>

  //     <div className="batting px-3 wrapp player_stat text-black text-sm sm:text-md md:text-lg lg:texl-xl flex align-middle items-center justify-between px-4">
  //       <div className="w-[40%]">
  //         {yetToBatStats(team1BattingData).map((player, index, array) => (
  //           <span key={player.playerId}>
  //             <p className="not-italic font-semibold leading-[normal]">
  //               {/* Batsman name */}
  //               {player.playerName}
  //             </p>
  //             <hr className="w-[95%] text-center mx-auto bg-black h-0 mb-2" />
  //           </span>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // )}

  //           {/* {*****************Bowling***********} */}
  //           <div className="bowling px-3 py-4" >
  //             <div className={ballteam2}>
  //               <p className="sm:w-[40%] w-[50%] not-italic font-semibold leading-[normal] tracking-[2px]" >
  //                 Bowlers
  //               </p>
  //               <div className="flex w-[50%] sm:w-[60%] text-right">
  //                 <p className="not-italic font-bold leading-[normal] w-[25%]">O</p>
  //                 <p className="not-italic font-bold leading-[normal] w-[20%]">R</p>
  //                 <p className="not-italic font-bold leading-[normal] w-[20%]">W</p>
  //                 <p className="not-italic font-bold leading-[normal] w-[35%]">
  //                   ECO
  //                 </p>
  //               </div>
  //             </div>
  //             {/* {console.log(team2BowlingData)} */}
  //             {populateBowlingStats(team2BowlingData)}
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );

  let teamColor = team_1
    ? teams[matchData?.Team1Id]?.themeColor
    : teams[matchData?.Team2Id]?.themeColor;
  const bgColor = `bg-${teamColor}`;

  const team_1_11 = (
    <div>
      {" "}
      {team_1 && (
        <div>
          <p
            className=" text-black text-3xl text-center font-extrabold tracking-wider mb-1 flex items-center justify-center "
            style={{
              color: team_1
                ? `${teams[matchData?.Team1Id]?.themeColor}`
                : `${teams[matchData?.Team2Id]?.themeColor}`,
            }}>
            {" "}
            <RiTeamFill className=" inline-block mx-2" /> TEAMLINE UP
          </p>

          <div className="text-[#000F95]  text-left text-xs sm:text-sm md:text-md lg:text-lg  not-italic font-bold leading-[normal]  flex flex-col  ">
            {/* LOW opacity team1 color change by changing index */}
            {yetToBatStats(team1BattingData).map((player, index, array) =>{ 
              if(index%2=== 0)
              {
                return (
                  <p
                    key={player.playerId}
                    className={` py-2   text-center `}>
                    {console.log(teamColor)}
                    <Link href={`/player-details/${player.playerId}`}>
                      {player.playerName}
                    </Link>
                    {/* {index < array.length - 1 ? ', ' : ''} */}
                  </p>
                )
              }
              else
              {
                return (
                  <p
                    key={player.playerId}
                    className={` py-2 text-center`}  style={{
                      backgroundColor: team_1
                        ? `${teams[matchData?.Team1Id]?.themeColor}`
                        : `${teams[matchData?.Team2Id]?.themeColor}`,
                      
                    }}>
                    {console.log(teamColor)}
                    <Link href={`/player-details/${player.playerId}`}>
                      {player.playerName}
                    </Link>
                    {/* {index < array.length - 1 ? ', ' : ''} */}
                  </p>
                )
              }})}
          </div>
        </div>
      )}
    </div>
  );

  const team_2_11 = (
    <div>
      {" "}
      {team_2 && (
        <div>
          <p
            className=" text-black text-3xl text-center font-extrabold tracking-wider mb-1 flex items-center justify-center "
            style={{
              color: team_1
                ? `${teams[matchData?.Team1Id]?.themeColor}`
                : `${teams[matchData?.Team2Id]?.themeColor}`,
            }}>
            {" "}
            <RiTeamFill className=" inline-block mx-2" /> TEAMLINE UP
          </p>

          <div className="text-[#000F95]  text-left text-xs sm:text-sm md:text-md lg:text-lg  not-italic font-bold leading-[normal]  flex flex-col  ">
            {/* LOW opacity team2 color change by changing index */}
            {yetToBatStats(team2BattingData).map((player, index, array) => (
              <p
                key={player.playerId}
                className={` py-2 ${
                  index % 2 === 0
                    ? "bg-white"
                    : `bg-[${teamColor.substring(1, teamColor.length - 1)}]`
                }  text-center `}>
                {console.log(teamColor)}
                <Link href={`/player-details/${player.playerId}`}>
                  {player.playerName}
                </Link>
                {/* {index < array.length - 1 ? ', ' : ''} */}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const teamno_1 = (
    <div>
      {team_1 && (
        <div className="team_1">
          <div className=" batting px-3   ">
            <div
              className="batting_stats w-full  h-12 flex align-middle items-center justify-between rounded-3xl mt-3  px-4 text-white text-sm sm:text-xl mb-2"
              style={{
                backgroundColor: team_1
                  ? `${teams[matchData?.Team1Id]?.themeColor}`
                  : `${teams[matchData?.Team2Id]?.themeColor}`,
              }}>
              <p className="w-[40%]  not-italic font-semibold leading-[normal] tracking-[2px] ">
                Batting
              </p>
              <div className=" w-[60%] flex text-right">
                <p className=" not-italic font-bold leading-[normal] w-[30%] ">
                  R(B)
                </p>

                <p className=" not-italic font-bold leading-[normal] w-[20%]">
                  4s
                </p>
                <p className=" not-italic font-bold leading-[normal] w-[20%]">
                  6s
                </p>
                <p className=" not-italic font-bold leading-[normal] w-[30%]">
                  S/R
                </p>
              </div>
            </div>
            {populateBattingStats(team1BattingData)}

            {team1kaExtra}
            {team1Total_runs}
            {/* yet to bat for team two */}
            <div className=" px-4  font-semibold text-sm sm:text-md md:text-lg lg:text-xl text-black item-left sm:flex-row h-auto justify-between align-middle py-2">
              <p className="  not-italic font-semibold leading-[normal] tracking-[2px]">
                Yet To Bat
              </p>
              <p className="text-[#000F95]  text-left text-xs sm:text-sm md:text-md lg:text-lg  not-italic font-medium leading-[normal]  ">
                {yetToBatStats(team1BattingData).map((player, index, array) => (
                  <span key={player.playerId}>
                    <Link href={`/player-details/${player.playerId}`}>
                      {player.playerName}
                    </Link>
                    {index < array.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </div>
          </div>
          {/* {*****************Bowling***********} */}
          <div className="bowling px-3 py-4">
            <div
              className="bowling_stats w-full h-12 mt-[7px] flex align-middle items-center justify-between rounded-3xl text-white text-sm sm:text-xl  px-4"
              style={{
                backgroundColor: team_1
                  ? `${teams[matchData?.Team2Id]?.themeColor}`
                  : `${teams[matchData?.Team1Id]?.themeColor}`,
              }}>
              <p className=" sm:w-[40%] w-[50%] not-italic font-semibold leading-[normal] tracking-[2px] ">
                Bowlers
              </p>
              <div className=" flex w-[50%] sm:w-[60%] text-right">
                <p className=" not-italic font-bold leading-[normal] w-[25%] ">
                  O
                </p>
                <p className=" not-italic font-bold leading-[normal] w-[20%] ">
                  R
                </p>
                <p className=" not-italic font-bold leading-[normal] w-[20%]">
                  W
                </p>
                <p className=" not-italic font-bold leading-[normal] w-[35%]">
                  ECO
                </p>
              </div>
            </div>
            {populateBowlingStats(team2BowlingData)}
          </div>
        </div>
      )}
    </div>
  );

  //  overall  team 2 REcord ********************************
  const teamno_2 = (
    <div>
      {team_2 && (
        <div className="team_1">
          <div className=" batting px-3   ">
            <div
              className="batting_stats w-full  h-12 flex align-middle items-center justify-between rounded-3xl mt-3  px-4 text-white text-sm sm:text-xl mb-2"
              style={{
                backgroundColor: team_2
                  ? `${teams[matchData?.Team2Id]?.themeColor}`
                  : `${teams[matchData?.TeamId]?.themeColor}`,
              }}>
              <p className="w-[40%]  not-italic font-semibold leading-[normal] tracking-[2px] ">
                Batting
              </p>
              <div className=" w-[60%] flex text-right">
                <p className=" not-italic font-bold leading-[normal] w-[30%] ">
                  R(B)
                </p>

                <p className=" not-italic font-bold leading-[normal] w-[20%]">
                  4s
                </p>
                <p className=" not-italic font-bold leading-[normal] w-[20%]">
                  6s
                </p>
                <p className=" not-italic font-bold leading-[normal] w-[30%]">
                  S/R
                </p>
              </div>
            </div>
            {populateBattingStats(team2BattingData)}

            {team2kaExtra}
            {team2Total_runs}
            {/* yet to bat for team two */}
            <div className=" px-4  font-semibold text-sm sm:text-md md:text-lg lg:text-xl text-black item-left sm:flex-row h-auto justify-between align-middle py-2">
              <p className="  not-italic font-semibold leading-[normal] tracking-[2px]">
                Yet To Bat
              </p>
              <p className="text-[#000F95]  text-left text-xs sm:text-sm md:text-md lg:text-lg  not-italic font-medium leading-[normal]  ">
                {yetToBatStats(team2BattingData).map((player, index, array) => (
                  <span key={player.playerId}>
                    <Link href={`/player-details/${player.playerId}`}>
                      {player.playerName}
                    </Link>
                    {index < array.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </div>
          </div>
          {/* {*****************Bowling***********} */}
          <div className="bowling px-3 py-4">
            <div
              className="bowling_stats w-full h-12 mt-[7px] flex align-middle items-center justify-between rounded-3xl text-white text-sm sm:text-xl  px-4"
              style={{
                backgroundColor: team_2
                  ? `${teams[matchData?.Team1Id]?.themeColor}`
                  : `${teams[matchData?.Team2Id]?.themeColor}`,
              }}>
              <p className=" sm:w-[40%] w-[50%] not-italic font-semibold leading-[normal] tracking-[2px] ">
                Bowlers
              </p>
              <div className=" flex w-[50%] sm:w-[60%] text-right">
                <p className=" not-italic font-bold leading-[normal] w-[25%] ">
                  O
                </p>
                <p className=" not-italic font-bold leading-[normal] w-[20%] ">
                  R
                </p>
                <p className=" not-italic font-bold leading-[normal] w-[20%]">
                  W
                </p>
                <p className=" not-italic font-bold leading-[normal] w-[35%]">
                  ECO
                </p>
              </div>
            </div>
            {populateBowlingStats(team1BowlingData)}
          </div>
        </div>
      )}
    </div>
  );

  // man of the match ******************************************************

  const man_of_the_match = matchData?.manofthematch !== "" ? (
    <div className="man_of_the_match h-[100px] shadow-sm w-5/6 mx-auto justify-center rounded-md my-3 flex flex-col align-middle items-center bg-blue-900">
      <p className="text-white text-sm sm:text-2xl not-italic font-bold leading-[normal]">
        Man of the match
      </p>
      <p className=" text-white text-sm sm:text-2xl not-italic font-normal leading-[normal]">
        {matchData?.manofthematch}
      </p>
    </div>
  ) : null;
  return (
    <div>
      <div
        className={`  ${
          !male_color
            ? "bg-gradient-to-b from-[#AA277E] to-white"
            : "bg-gradient-to-b from-[#272CAA] to-white"
        } text-white`}>
        <div className="text-black">
          <Navbar />
        </div>

        <div className=" w-5/6 mx-auto text-center my-4 sm:text-7xl leading-snug  tracking-widest italic text-3xl  font-bold">
          {" "}
          <p> Scorecard</p>
        </div>

        <div
          className={`scorecard_main w-11/12 mb-0 sm:mb-4 my-4  ${
            !male_color
              ? "bg-gradient-to-b from-pink-100 to-white"
              : "bg-gradient-to-b from-blue-100 to-white"
          } rounded-2xl sm:w-5/6 mx-auto  pt-0 pb-0  sm:pb-5 `}>
          <div className="upper_section shadow-inner  ">
            <p className="text-center text-sm md:text-lg  lg:text-xl text-black font-bold pt-8" >{matchData?.toss} won the Toss and Chose to {matchData?.decision} first</p>
            <div
              className={`match_stats rounded-2xl pt-4 px-2 sm:p-4 flex grow justify-between w-full sm:w-5/6  overflow-x-hidden z-1 mx-auto mb-3 items-center align-middle text-center   text-black `}>
              <div className=" flex items-center flex-col sm:flex-row gap-0 sm:gap-10 w-[45%] ">
                <div className=" grow w-full  sm:w-[60%]  ">
                  <div className=" h-full w-full  flex flex-row sm:flex-col align-middle items-center    font-semibold leading-[normal] text-center  grow text-sm sm:text-2xl  ">
                    <div className="    rounded-full p-0 sm:p-3">
                      {/* team 1 logo image */}
                      <Image
                        src={team1Datas?.teamLogo}
                        alt="team_image"
                        height={125}
                        width={125}
                        style={{ backgroundColor: team1Datas?.themeColor }}
                        className=" object-cover aspect-square h-full w-full  rounded-full  "
                      />
                    </div>

                    <div className=" w-full  text-wrap-balance break-normal box-content ">
                      {/* team 1 short Name */}

                      <h4 className="  font-bold"> {team1Datas?.teamCode} </h4>
                      <h3 className=" text-center block sm:hidden  not-italic font-bold leading-[normal]">
                        {/* team 1 summary */}
                        {team1Totalrun}
                        <span className=" font-light text-sm">
                          ({team1Over})
                        </span>
                      </h3>
                    </div>

                    {/* <hr className=" block sm:hidden bg-black w-full mt-2 h-1" /> */}
                  </div>
                </div>
                <div className="grow w-full hidden sm:block  sm:w-[40%] text-sm sm:text-4xl ">
                  <div>
                    {/* team 1 summary */}
                    <h3 className=" text-center  not-italic font-bold leading-[normal]">
                      {team1Totalrun}
                    </h3>
                    <p className=" text-base">({team1Over})</p>
                  </div>
                </div>
              </div>

              <div className=" flex justify-center items-center w-[10%] ">
                <Image
                  src={`/vector-8.png`}
                  responsive
                  width={75}
                  height={75}
                  alt="vs"
                  className=" "
                />
                {/* <p>vs</p> */}
              </div>

              <div className=" w-[45%]  flex justify-center items-center align-middle gap-0 sm:gap-10   ">
                <div className="grow w-full hidden sm:block  sm:w-[40%] text-sm sm:text-4xl ">
                  <div>
                    {/* team 2 summary */}
                    <h3 className=" text-center  not-italic font-bold leading-[normal]">
                      {team2Totalrun}
                    </h3>
                    <p className=" text-base">({team2Over})</p>
                  </div>
                </div>
                <div className=" grow w-full  sm:w-[60%]  ">
                  <div className=" h-auto w-auto flex flex-row-reverse sm:flex-col align-middle items-center    font-semibold leading-[normal] text-center  grow text-sm sm:text-2xl  ">
                    <div className=" rounded-full   h-auto w-auto  p-0 sm:p-3 ">
                      {/* team 2 logo image */}
                      <Image
                        src={team2Datas?.teamLogo}
                        alt="team_image"
                        height={125}
                        width={125}
                        style={{ backgroundColor: team2Datas?.themeColor }}
                        className="  object-fit  aspect-square rounded-full  "
                      />
                    </div>

                    <div className=" w-full  text-wrap-balance break-normal box-content ">
                      {/* Team 2 short name */}

                      <p className="  font-bold"> {team2Datas?.teamCode}</p>
                      {/* team 2 summary */}
                      <h3 className=" text-center block sm:hidden  not-italic font-bold leading-[normal]">
                        {team2Totalrun}
                        <span className=" font-light text-sm">
                          ({team2Over})
                        </span>
                      </h3>
                    </div>

                    {/* <hr className=" block sm:hidden bg-black w-full mt-2 h-1" /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className=" text-center">
              <p className="text-[#1E1E1E] text-md sm:text-2xl not-italic font-normal leading-[normal]">
                {" "}
                {/* match summary */}
                {/* IMR won by 4 wickets */}
                {matchData && matchData.finalComment}
                {/* {console.log(matchData && matchData.finalComment)} */}
              </p>
              <p className="text-[#7F7F7F] text-md sm:text-2xl not-italic font-normal leading-[normal]">
                {" "}
                {/* match detail */}
                MMNCT 2023 | Match<span> {matchData && matchData.id}</span>
              </p>
            </div>
            <hr className=" h-1 border bg-blue-700 border-none my-4 w-[80%] mx-auto" />
            <div className="inner_set w-full  mx-auto mt-4 pb-0 sm:pb-5 ">
              <div className=" flex w-[95%] mx-auto text-center rounded-3xl ">
                <button
                  className="btnn1 h-12  w-[50%] flex rounded-tl-3xl rounded-bl-3xl items-center justify-center text-white text-sm sm:text-xl  not-italic font-bold leading-[normal]"
                  style={{
                    backgroundColor: team_1
                      ? teams[matchData?.Team1Id]?.themeColor
                      : teams[matchData?.Team1Id]?.themeColor,
                    opacity: team_1 ? 1 : 0.75,
                  }}
                  onClick={handlechange_1}>
                  {/* Team 1 Full Name */}
                  <div className=" px-2 ">
                    {" "}
                    {matchData && matchData.Team1Id}
                  </div>
                </button>
                <button
                  className="btnn2 rounded-tr-3xl rounded-br-3xl h-12  w-[50%]  flex items-center justify-center text-white text-sm sm:text-xl  not-italic font-bold leading-[normal]"
                  style={{
                    backgroundColor: team_2
                      ? teams[matchData?.Team2Id]?.themeColor
                      : teams[matchData?.Team2Id]?.themeColor,
                    opacity: team_2 ? 1 : 0.75,
                  }}
                  onClick={handlechange_2}>
                  {/* Team 2 Full name */}
                  <div className=" px-2">
                    {" "}
                    {matchData && matchData.Team2Id}{" "}
                  </div>
                </button>
              </div>
              <div className="w-[90%] mx-auto -z-10">
                <hr
                  className={`h-2 mt-2  rounded-xl bg-teal-800 border-none w-[50%]  delay-150 transition-all ${
                    team_1 ? " translate-x-0" : " translate-x-full"
                  } `}
                />
              </div>
              <div className="team_stats w-full sm:w-4/6 mx-auto my-3 border-sky-500 shadow-2xl pb-[35px] ">
                {team_1 ? (
                  yetToBatStats(team1BattingData).length === 11 ? (
                    <>
                      {/* team___________1 */}
                      {team_1_11}
                    </>
                  ) : (
                    <>
                      {/* team__________1 */}
                      {teamno_1}
                      {/* team__________2 */}
                      {teamno_2}
                      {/* Man of Match__________3 */}
                      {man_of_the_match}
                    </>
                  )
                ) : yetToBatStats(team2BattingData).length === 11 ? (
                  <>
                    {/* team___________1 */}
                    {team_2_11}
                  </>
                ) : (
                  <>
                    {/* team__________1 */}
                    {teamno_1}
                    {/* team__________2 */}
                    {teamno_2}
                    {/* Man of Match__________3 */}
                    {man_of_the_match}
                  </>
                )}
                {/* { console.log(yetToBatStats(team2BattingData).length)} */}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Scorecard;
