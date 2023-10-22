import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import { TbCricket } from "react-icons/tb";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import { db } from "../../components/db/Firebase";
import PlayerPastRecord from "../../components/playerpastrecord";
import teams from "../../components/teams";
import Head from "next/head";
import {
  collection,
  doc,
  query,
  getDocs,
  getDoc,
  where,
} from "firebase/firestore";
// import useWindowSize from 'react-use/lib/useWindowSize'
// import Confetti from "react-confetti";
// import { BsFullscreen } from "react-icons/bs";
const PlayerDetails = () => {
  const router = useRouter();
  const [gender, setGender] = useState("boy");
  const [playerTeam,setPlayerTeam] = useState("");
  const getTeamCategory = () => {
    Object.keys(teams).map((key) => {
      const value = teams[key];
      if (value.teamId === playerStats.teamId) {
        //console.log(value.teamCategory);
        (value.teamCategory === "female" ? setGender("girl") : setGender("boy"));
      }
    })
  }
  const player = router.query.playerId;
  const [playerStats, setPlayerStats] = useState("");
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
  }
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
  }

  const calculateStrikeRate = (runs, balls) => {
    if (balls === 0) {
      return 0; // Avoid division by zero
    }
    const strikeRate = (runs / balls) * 100;
    return strikeRate.toFixed(1); // Round to 2 decimal places
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = await doc(db, 'participating-team-member', player);
        await getDoc(query(docRef)).then((querySnapshot) => {
          let data = querySnapshot.data();
          setPlayerStats(data);
          getTeamCategory();
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

  }, [player]);

  useEffect(() => {
    const getTeamCategory = () => {
      Object.keys(teams).map((key) => {
        const value = teams[key];
        if (value.teamId === playerStats.teamId) {
         // console.log(value.teamCategory);
          (value.teamCategory === "female" ? setGender("girl") : setGender("boy"));
          setPlayerTeam(key);
        }
      })
    };
    getTeamCategory();
  }) , [playerStats]
  
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 703 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 703, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };
  // const carouselContainerStyle = {
  //   maxWidth: "1000px", // Set your desired maximum width
  //   margin: "0 auto", // Center the carousel
  // };
  const boxStyle = {
    // width: "320px", // Set the width of individual carousel items
    height: "", // Set the height of individual carousel items
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    display: "flex-column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
    <Head>
        <title>Player Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {" "}
      <Navbar />
      <div className={`${gender === "girl" ? " " : ""}text-white`}>
        <div className="w-5/6 mx-auto my-4 shadow-lg text-black bg-white rounded-md">
          <div className="w-fit mx-auto flex justify-center  p-4 flex-col md:flex-row  gap-10 border-none  ">
            
              <Image
                src={playerStats.imgUrl !== ""
                  ? playerStats.imgUrl
                  : gender == "boy"
                    ? "/male.jpg"
                    : "/female.jpg"}
                alt="profile_pic"
                width={200}
                height={100}
                className={`${gender === "girl"
                  ? " rounded-full flex justify-center h-[280px] w-[280px]  mx-auto aspect-square   align-middle items-center ring-4 ring-offset-4 ring-pink-500 sm:align-middle  "
                  : " rounded-full flex justify-center h-[280px] w-[280px]    mx-auto aspect-square   align-middle items-center ring-4 ring-offset-4 ring-blue-500 sm:align-middle "
                  }
                 `}
              />
            

            {/* <hr className=" h-1  bg-green-500 my-3 lg:hidden md:hidden sm:block" /> */}
            <div className="     px-2  ">
              <p className=" text-3xl font-bold uppercase md:mt-4 text-center md:text-left lg:text-left mt-2 ">
                {" "}
                {playerStats?.name}
                {/* {player Name} */}
              </p>
              <p className={gender == "boy" ? `text-lg font-medium md:mt-4 text-center md:text-left lg:text-left mt-2 text-blue-500` 
              :`text-lg font-medium md:mt-4 text-center md:text-left lg:text-left mt-2 text-pink-500`}>
                {" "}
                {playerTeam}
              </p>
              <p className="text-lg font-bold md:mt-4 text-center md:text-left lg:text-left mt-2">
                {" "}
                {playerStats?.roll_no}
                {/* {player Roll No} */}
              </p>
              <p className="text-lg font-bold md:mt-4 text-center md:text-left lg:text-left mt-2">
                {playerStats?.type}
                {/* {branch} */}
              </p>
              <p className="text-lg font-bold md:mt-4 text-center md:text-left lg:text-left mt-2">
                {playerStats?.branch}
                {/* {branch} */}
              </p>
              <p className=" flex  text-lg font-bold text-center md:text-left lg:text-left md:mt-4 justify-center md:justify-start lg:justify-start mt-2">
                {/* Role :{" "} */}
                {/* <TbCricket className=" text-lg mx-2 font-medium h-[30px] w-[20px]" />{" "} */}
                {playerStats.role}
                {/* {Role} */}
              </p>
            </div>
          </div>
          <hr
            className={`${gender === "girl"
              ? " h-1 bg-pink-400 m-4 "
              : "h-1 bg-blue-500 m-4"
              }`}
          />
          <div className="p-3 mx-auto  w-5/6">
            <div className=" rounded-xl  sm:flex md:flex-row gap-5">

              <div className="sm:w-1/2  md:w-full p-1 m-1 ">
                <p
                  className={`${gender === "girl"
                    ? " text-center w-full bg-pink-500 text-lg font-bold rounded-xl text-white space-x-3 "
                    : "text-center w-full bg-blue-500 text-lg font-bold rounded-xl text-white space-x-3 m-2"
                    } `}
                >
                  {" "}
                  Stats
                </p>

                <div className=" rounded-xl flex m-2  ">
                  <p className="  text-center w-full pl-5 text-lg font-bold  rounded-l-md text-black space-x-3">
                    {" "}
                    Match Played
                  </p>
                  <p className="   text-center w-full pl-5  text-lg font-bold rounded-r-md text-black space-x-3">
                    {" "}
                    {playerStats && playerStats.stats && playerStats.stats[10] ? playerStats.stats[10] : 0}
                  </p>
                  <hr className=" bg-red-400" />
                </div>
                {/* <hr
                  className={`${gender === "girl"
                    ? " h-1 bg-pink-400 m-4 "
                    : "h-1 bg-blue-500 m-4"
                    }`}
                />

                <div className=" rounded-xl flex m-3  ">
                  <p className="  text-center w-full pl-5 text-lg font-bold  rounded-l-md text-black space-x-3">
                    {" "}
                    Runs
                  </p>
                  <p className="   text-center w-full pl-5  text-lg font-bold rounded-r-md text-black space-x-3">
                    {" "}
                    120
                  </p>
                  <hr className=" bg-red-400" />
                </div> */}
                <hr
                  className={`${gender === "girl"
                    ? " h-1 bg-pink-400 m-4 "
                    : "h-1 bg-blue-500 m-4"
                    }`}
                />
                <div className=" rounded-xl flex m-3  ">
                  <p className="  text-center w-full pl-5 text-lg font-bold  rounded-l-md text-black space-x-3">
                    {" "}
                    Total runs Scored
                  </p>
                  <p className="   text-center w-full pl-5  text-lg font-bold rounded-r-md text-black space-x-3">
                    {" "}
                    {playerStats && playerStats.stats ? getPlayerScore(playerStats.stats) : 0}
                  </p>
                  <hr className=" bg-red-400" />
                </div>
                <hr
                  className={`${gender === "girl"
                    ? " h-1 bg-pink-400 m-4 "
                    : "h-1 bg-blue-500 m-4"
                    }`}
                />
                <div className=" rounded-xl flex m-3  ">
                  <p className="  text-center w-full pl-5 text-lg font-bold  rounded-l-md text-black space-x-3">
                    Strike rate
                  </p>
                  <p className="   text-center w-full pl-5  text-lg font-bold rounded-r-md text-black space-x-3">
                    {" "}
                    {playerStats && playerStats.stats ? calculateStrikeRate(getPlayerScore(playerStats.stats), getPlayerBalls(playerStats.stats)) : 0}
                  </p>
                  <hr className=" bg-red-400" />
                </div>
                <hr
                  className={`${gender === "girl"
                    ? " h-1 bg-pink-400 m-4 "
                    : "h-1 bg-blue-500 m-4"
                    }`}
                />
                <div className=" rounded-xl flex m-3  ">
                  <p className="  text-center w-full pl-5 text-lg font-bold  rounded-l-md text-black space-x-3">
                    Highest Score
                  </p>
                  <p className="   text-center w-full pl-5  text-lg font-bold rounded-r-md text-black space-x-3">
                    {" "}
                    {playerStats && playerStats.stats && playerStats.stats[11] ? playerStats.stats[11] : 0}
                  </p>
                  <hr className=" bg-red-400" />
                </div>
                <hr
                  className={`${gender === "girl"
                    ? " h-1 bg-pink-400 m-4 "
                    : "h-1 bg-blue-500 m-4"
                    }`}
                />
                <div className=" rounded-xl flex m-3  ">
                  <p className="  text-center w-full pl-5 text-lg font-bold  rounded-l-md text-black space-x-3">
                    Total Wickets Taken
                  </p>
                  <p className="   text-center w-full pl-5  text-lg font-bold rounded-r-md text-black space-x-3">
                    {" "}
                    {playerStats && playerStats.stats && playerStats.stats[14] ? playerStats.stats[14] : 0}
                  </p>
                  <hr className=" bg-red-400" />
                </div>
                <hr
                  className={`${gender === "girl"
                    ? " h-1 bg-pink-400 m-4 "
                    : "h-1 bg-blue-500 m-4"
                    }`}
                />
              </div>
              <div className="sm:w-1/2  md:w-full  p-1 m-1 ">
                <p
                  className={`${gender === "girl"
                    ? " text-center w-full bg-pink-500 text-lg font-bold rounded-xl text-white space-x-3 "
                    : "text-center w-full bg-blue-500 text-lg font-bold rounded-xl text-white space-x-3 m-2"
                    } `}
                >
                  {" "}
                  Scoring Stats
                </p>

                <div className=" rounded-xl flex m-2  ">
                  <p className="  text-center w-full pl-5 text-lg font-bold  rounded-l-md text-black space-x-3">
                    {" "}
                    Single
                  </p>
                  <p className="   text-center w-full pl-5  text-lg font-bold rounded-r-md text-black space-x-3">
                    {" "}
                    {playerStats && playerStats.stats && playerStats.stats[1] ? playerStats.stats[1] : 0}
                  </p>
                  <hr className=" bg-red-400" />
                </div>
                <hr
                  className={`${gender === "girl"
                    ? " h-1 bg-pink-400 m-4 "
                    : "h-1 bg-blue-500 m-4"
                    }`}
                />

                <div className=" rounded-xl flex m-3  ">
                  <p className="  text-center w-full pl-5 text-lg font-bold  rounded-l-md text-black space-x-3">
                    {" "}
                    Double
                  </p>
                  <p className="   text-center w-full pl-5  text-lg font-bold rounded-r-md text-black space-x-3">
                    {" "}
                    {playerStats && playerStats.stats && playerStats.stats[2] ? playerStats.stats[2] : 0}
                  </p>
                  <hr className=" bg-red-400" />
                </div>
                <hr
                  className={`${gender === "girl"
                    ? " h-1 bg-pink-400 m-4 "
                    : "h-1 bg-blue-500 m-4"
                    }`}
                />
                <div className=" rounded-xl flex m-3  ">
                  <p className="  text-center w-full pl-5 text-lg font-bold  rounded-l-md text-black space-x-3">
                    {" "}
                    Four
                  </p>
                  <p className="   text-center w-full pl-5  text-lg font-bold rounded-r-md text-black space-x-3">
                    {" "}
                    {playerStats && playerStats.stats && playerStats.stats[4] ? playerStats.stats[4] : 0}
                  </p>
                  <hr className=" bg-red-400" />
                </div>
                <hr
                  className={`${gender === "girl"
                    ? " h-1 bg-pink-400 m-4 "
                    : "h-1 bg-blue-500 m-4"
                    }`}
                />
                <div className=" rounded-xl flex m-3  ">
                  <p className="  text-center w-full pl-5 text-lg font-bold  rounded-l-md text-black space-x-3">
                    Six
                  </p>
                  <p className="   text-center w-full pl-5  text-lg font-bold rounded-r-md text-black space-x-3">
                    {" "}
                    {playerStats && playerStats.stats && playerStats.stats[6] ? playerStats.stats[6] : 0}
                  </p>
                  <hr className=" bg-red-400" />
                </div>
                <hr
                  className={`${gender === "girl"
                    ? " h-1 bg-pink-400 m-4 "
                    : "h-1 bg-blue-500 m-4"
                    }`}
                />
                <div className=" rounded-xl flex m-3  ">
                  <p className="  text-center w-full pl-5 text-lg font-bold  rounded-l-md text-black space-x-3">
                    Dot Balls
                  </p>
                  <p className="   text-center w-full pl-5  text-lg font-bold rounded-r-md text-black space-x-3">
                    {" "}
                    {playerStats && playerStats.stats && playerStats.stats[0] ? playerStats.stats[0] : 0}
                  </p>
                  <hr className=" bg-red-400" />
                </div>
                <hr
                  className={`${gender === "girl"
                    ? " h-1 bg-pink-400 m-4 "
                    : "h-1 bg-blue-500 m-4"
                    }`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-5/6 mx-auto justify rounded-md p-5 ">
          {/* style={carouselContainerStyle} */}
          <Carousel
            itemClass="react-multi-carousel-item"
            partialVisible={false}
            responsive={responsive}
            swipeable={true}
            draggable={true}
            arrows={false}
            showDots={true}
            infinite={true}
            keyBoardControl={true}
            className="gd-carousel"
            containerClass="carousel-container"
            autoPlay={true}
          >
            {playerStats?.pastrecords ?
                Object.keys(playerStats?.pastrecords).reverse().map((key) => {
                  const value = playerStats?.pastrecords[key];
                  // Render PlayerPastRecord component here with value and key
                  return <Link href={`/scorecard?matchId=${key}`}><PlayerPastRecord value={value} id={key} key={key} gender={gender} /></Link>;
                }) :<></>}
              
            
          </Carousel>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PlayerDetails;

// const perMatchRecord=Record.map((match, index) => (
// <div style={boxStyle} key={index} className="w-4/5 p-3 mx-auto rounded-lg">
//     <div
//       className={`${
//         gender === "girl"
//           ? " text-center w-full bg-pink-500 text-lg font-bold rounded-xl text-white space-x-3 "
//           : "text-center w-full bg-blue-500 text-lg font-bold rounded-xl text-white space-x-3 m-2"
//       }`}
//     >
//       {" "}
//       Match No.{index+1}
//     </div>
//     <div className="w-full p-2 m-1 ">
//       <div className=" rounded-xl flex m-3 mx-auto  ">
//         <p className="  text-center w-full  text-lg font-bold  rounded-l-md text-black space-x-3">
//           {" "}
//           Runs
//         </p>
//         <p className="   text-center w-full  text-lg font-bold rounded-r-md text-black space-x-3">
//           {" "}
//           {match.run}
//         </p>
//         <hr className=" bg-red-400" />
//       </div>
//       <hr
//         className={`${
//           gender === "girl"
//             ? " h-1 bg-pink-400 m-4 "
//             : "h-1 bg-blue-500 m-4"
//         }`}
//       />

//       <div className=" rounded-xl flex m-3  ">
//         <p className="  text-center w-full text-lg font-bold  rounded-l-md text-black space-x-3">
//           {" "}
//           Runs
//         </p>
//         <p className="   text-center w-full  text-lg font-bold rounded-r-md text-black space-x-3">
//           {" "}
//           120
//         </p>
//         <hr className=" bg-red-400" />
//       </div>
//       <hr
//         className={`${
//           gender === "girl"
//             ? " h-1 bg-pink-400 m-4 "
//             : "h-1 bg-blue-500 m-4"
//         }`}
//       />
//       <div className=" rounded-xl flex m-3  ">
//         <p className="  text-center w-full  text-lg font-bold  rounded-l-md text-black space-x-3">
//           {" "}
//           Total runs
//         </p>
//         <p className="   text-center w-full  text-lg font-bold rounded-r-md text-black space-x-3">
//           {" "}
//           1280
//         </p>
//         <hr className=" bg-red-400" />
//       </div>
//       <hr
//         className={`${
//           gender === "girl"
//             ? " h-1 bg-pink-400 m-4 "
//             : "h-1 bg-blue-500 m-4"
//         }`}
//       />
//       <div className=" rounded-xl flex m-3  ">
//         <p className="  text-center w-full text-lg font-bold  rounded-l-md text-black space-x-3">
//           Average
//         </p>
//         <p className="   text-center w-full text-lg font-bold rounded-r-md text-black space-x-3">
//           {" "}
//           1280
//         </p>
//         <hr className=" bg-red-400" />
//       </div>
//       <hr
//         className={`${
//           gender === "girl"
//             ? " h-1 bg-pink-400 m-4 "
//             : "h-1 bg-blue-500 m-4"
//         }`}
//       />
//       <div className=" rounded-xl flex m-3  ">
//         <p className="  text-center w-full  text-lg font-bold  rounded-l-md text-black space-x-3">
//           Strike rate
//         </p>
//         <p className="   text-center w-full  text-lg font-bold rounded-r-md text-black space-x-3">
//           {" "}
//           1280
//         </p>
//         <hr className=" bg-red-400" />
//       </div>
//       <hr
//         className={`${
//           gender === "girl"
//             ? " h-1 bg-pink-400 m-4 "
//             : "h-1 bg-blue-500 m-4"
//         }`}
//       />
//     </div>
//   </div>
// ));