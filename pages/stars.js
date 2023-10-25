// pages/FirestorePage.js
import { useEffect, useState } from "react";
import { db } from "../components/db/Firebase";
import { collection, where, getDocs, query } from "firebase/firestore";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Footer from "../components/Footer";
import Image from "next/image";
import teams from "../components/teams";
import { TfiArrowCircleRight, TfiArrowCircleLeft } from "react-icons/tfi";

const getTeamCategory = (teamId) => {
  var result;
  Object.keys(teams).map((key) => {
    const value = teams[key];
    if (value.teamId === teamId) {
      result = key;
    }
  });
  return result;
};
const getPlayerScored = (score) => {
  var totalRuns = 0;
  //var ballPlayed = 0;
  if (score) {
    for (var i = 0; i < 10; i++) {
      if (score[i]) {
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
const calculateStrikeRate = (runs, balls) => {
  if (balls === 0) {
    return 0; // Avoid division by zero
  }
  const strikeRate = (runs / balls) * 100;
  return strikeRate.toFixed(1); // Round to 2 decimal places
};
function calculateEconomyRate(runsConceded, noOfBallsBowled) {
  if (noOfBallsBowled === 0) {
    console.error("Overs bowled cannot be zero.");
    return null;
  }

  const economyRate = (runsConceded / noOfBallsBowled) * 6;
  return economyRate.toFixed(2); // Rounding to two decimal places
}

const responsive = {
  largeDesktop: {
    breakpoint: { max: 3000, min: 1275 },
    items: 4,
    partialVisibilityGutter: 40,
  },
  desktop: {
    breakpoint: { max: 1275, min: 950 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 950, min: 550 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 550, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};
export default function Stars({ playerStats }) {
  const [malePlayers, setmalePlayers] = useState([]);
  const [femalePlayers, setfemalePlayers] = useState([]);
  const [top5malebatsman, setTop5malebatsman] = useState([]);
  const [top5femalebatsman, setTop5femalebatsman] = useState([]);
  const [top5malebowler, setTop5malebowler] = useState([]);
  const [top5femalebowler, setTop5femalebowler] = useState([]);
  const [top5malesixer, setTop5malesixer] = useState([]);
  const [top5femalesixer, setTop5femalesixer] = useState([]);
  const [top5malefourer, setTop5malefourer] = useState([]);
  const [top5femalefourer, setTop5femalefourer] = useState([]);
  const [top5malehighestbatsman, setTop5malehighestbatsman] = useState([]);
  const [top5femalehighestbatsman, setTop5femalehighestbatsman] = useState([]);
  const [top5maletutktukbatsman, setTop5maletuktukbatsman] = useState([]);
  const [top5femaletuktukbatsman, setTop5femaletuktukbatsman] = useState([]);

  const getGender = (teamid) => {
    let result;
    for (const val in teams) {
      const value = teams[val];
      if (value.teamId === teamid) {
        result = value.teamCategory;
        break;
      }
    }
    return result;
  };

  const getTopBatsman = () => {
    setTop5malebatsman(
      [...malePlayers]
        .sort((a, b) => {
          if (a.stats === undefined && b.stats === undefined) return 0;
          else if (a.stats === undefined) return 1;
          else if (b.stats === undefined) return -1;

          const scoreDiff = getPlayerScored(b.stats) - getPlayerScored(a.stats);

          if (scoreDiff === 0) {
            const strikeRateDiff =
              calculateStrikeRate(
                getPlayerScored(b.stats),
                getPlayerBalls(b.stats)
              ) -
              calculateStrikeRate(
                getPlayerScored(a.stats),
                getPlayerBalls(a.stats)
              );
            return strikeRateDiff;
          }

          return scoreDiff;
        })
        .slice(0, 5)
    );

    setTop5femalebatsman(
      [...femalePlayers]
        .sort((a, b) => {
          if (a.stats === undefined && b.stats === undefined) return 0;
          else if (a.stats === undefined) return 1;
          else if (b.stats === undefined) return -1;

          const scoreDiff = getPlayerScored(b.stats) - getPlayerScored(a.stats);

          if (scoreDiff === 0) {
            const strikeRateDiff =
              calculateStrikeRate(
                getPlayerScored(b.stats),
                getPlayerBalls(b.stats)
              ) -
              calculateStrikeRate(
                getPlayerScored(a.stats),
                getPlayerBalls(a.stats)
              );
            return strikeRateDiff;
          }

          return scoreDiff;
        })
        .slice(0, 5)
    );
  };

  const getTopBaller = () => {
    setTop5malebowler(
      [...malePlayers]
        .sort((a, b) => {
          if (a.stats === undefined && b.stats === undefined) return 0;
          else if (a.stats === undefined) return 1;
          else if (b.stats === undefined) return -1;

          const wicketDiff = b.stats[14] - a.stats[14];

          if (wicketDiff === 0) {
            // If wickets are the same, sort based on economy rate
            const economyRateDiff =
              calculateEconomyRate(a.stats[13], a.stats[12]) -
              calculateEconomyRate(b.stats[13], b.stats[12]);
            return economyRateDiff;
          }

          return wicketDiff;
        })
        .slice(0, 5)
    );

    setTop5femalebowler(
      [...femalePlayers]
        .sort((a, b) => {
          if (a.stats === undefined && b.stats === undefined) return 0;
          else if (a.stats === undefined) return 1;
          else if (b.stats === undefined) return -1;

          const wicketDiff = b.stats[14] - a.stats[14];

          if (wicketDiff === 0) {
            // If wickets are the same, sort based on economy rate
            const economyRateDiff =
              calculateEconomyRate(a.stats[13], a.stats[12]) -
              calculateEconomyRate(b.stats[13], b.stats[12]);
            return economyRateDiff;
          }

          return wicketDiff;
        })
        .slice(0, 5)
    );
  };

  const getTopSixer = () => {
    setTop5malesixer(
      [...malePlayers]
        .sort((a, b) => {
          if (a.stats === undefined && b.stats === undefined) return 0;
          else if (a.stats === undefined) return 1;
          else if (b.stats === undefined) return -1;

          const sixesDiff = b.stats[6] - a.stats[6];
          if (sixesDiff === 0) {
            // If the number of sixes is the same, sort based on strike rate
            const strikeRateDiff =
              calculateStrikeRate(
                getPlayerScored(b.stats),
                getPlayerBalls(b.stats)
              ) -
              calculateStrikeRate(
                getPlayerScored(a.stats),
                getPlayerBalls(a.stats)
              );
            return strikeRateDiff;
          }

          return sixesDiff;
        })
        .slice(0, 5)
    );

    setTop5femalesixer(
      [...femalePlayers]
        .sort((a, b) => {
          if (a.stats === undefined && b.stats === undefined) return 0;
          else if (a.stats === undefined) return 1;
          else if (b.stats === undefined) return -1;

          const sixesDiff = b.stats[6] - a.stats[6];
          if (sixesDiff === 0) {
            // If the number of sixes is the same, sort based on strike rate
            const strikeRateDiff =
              calculateStrikeRate(
                getPlayerScored(b.stats),
                getPlayerBalls(b.stats)
              ) -
              calculateStrikeRate(
                getPlayerScored(a.stats),
                getPlayerBalls(a.stats)
              );
            return strikeRateDiff;
          }

          return sixesDiff;
        })
        .slice(0, 5)
    );
  };

  const getTopfourer = () => {
    setTop5malefourer(
      [...malePlayers]
        .sort((a, b) => {
          if (a.stats === undefined && b.stats === undefined) return 0;
          else if (a.stats === undefined) return 1;
          else if (b.stats === undefined) return -1;

          const fourDiff = b.stats[4] - a.stats[4];
          if (fourDiff === 0) {
            // If the number of sixes is the same, sort based on strike rate
            const strikeRateDiff =
              calculateStrikeRate(
                getPlayerScored(b.stats),
                getPlayerBalls(b.stats)
              ) -
              calculateStrikeRate(
                getPlayerScored(a.stats),
                getPlayerBalls(a.stats)
              );
            return strikeRateDiff;
          }

          return fourDiff;
        })
        .slice(0, 5)
    );

    setTop5femalefourer(
      [...femalePlayers]
        .sort((a, b) => {
          if (a.stats === undefined && b.stats === undefined) return 0;
          else if (a.stats === undefined) return 1;
          else if (b.stats === undefined) return -1;

          const fourDiff = b.stats[4] - a.stats[4];
          if (fourDiff === 0) {
            // If the number of sixes is the same, sort based on strike rate
            const strikeRateDiff =
              calculateStrikeRate(
                getPlayerScored(b.stats),
                getPlayerBalls(b.stats)
              ) -
              calculateStrikeRate(
                getPlayerScored(a.stats),
                getPlayerBalls(a.stats)
              );
            return strikeRateDiff;
          }

          return fourDiff;
        })
        .slice(0, 5)
    );
  };

  const getTophighestbatsaman = () => {
    setTop5malehighestbatsman(
      [...malePlayers]
        .sort((a, b) => {
          if (a.stats === undefined && b.stats === undefined) return 0;
          else if (a.stats === undefined) return 1;
          else if (b.stats === undefined) return -1;

          const highestDiff = b.stats[11] - a.stats[11];
          if (highestDiff === 0) {
            // If the number of sixes is the same, sort based on strike rate
            const strikeRateDiff =
              calculateStrikeRate(
                getPlayerScored(b.stats),
                getPlayerBalls(b.stats)
              ) -
              calculateStrikeRate(
                getPlayerScored(a.stats),
                getPlayerBalls(a.stats)
              );
            return strikeRateDiff;
          }

          return highestDiff;
        })
        .slice(0, 5)
    );
    setTop5femalehighestbatsman(
      [...femalePlayers]
        .sort((a, b) => {
          if (a.stats === undefined && b.stats === undefined) return 0;
          else if (a.stats === undefined) return 1;
          else if (b.stats === undefined) return -1;

          const highestDiff = b.stats[11] - a.stats[11];
          if (highestDiff === 0) {
            // If the number of sixes is the same, sort based on strike rate
            const strikeRateDiff =
              calculateStrikeRate(
                getPlayerScored(b.stats),
                getPlayerBalls(b.stats)
              ) -
              calculateStrikeRate(
                getPlayerScored(a.stats),
                getPlayerBalls(a.stats)
              );
            return strikeRateDiff;
          }

          return highestDiff;
        })
        .slice(0, 5)
    );
  };

  const getToptuktukbatsman = () => {
    setTop5maletuktukbatsman(
      [...malePlayers]
        .sort((a, b) => {
          if (a.stats === undefined && b.stats === undefined) return 0;
          else if (a.stats === undefined) return 1;
          else if (b.stats === undefined) return -1;

          const tuktukDiff = b.stats[0] - a.stats[0];
          if (tuktukDiff === 0) {
            // If the number of sixes is the same, sort based on strike rate
            const strikeRateDiff =
              calculateStrikeRate(
                getPlayerScored(a.stats),
                getPlayerBalls(a.stats)
              ) -
              calculateStrikeRate(
                getPlayerScored(b.stats),
                getPlayerBalls(b.stats)
              );
            return strikeRateDiff;
          }

          return tuktukDiff;
        })
        .slice(0, 5)
    );

    setTop5femaletuktukbatsman(
      [...femalePlayers]
        .sort((a, b) => {
          if (a.stats === undefined && b.stats === undefined) return 0;
          else if (a.stats === undefined) return 1;
          else if (b.stats === undefined) return -1;

          const tuktukDiff = b.stats[0] - a.stats[0];
          if (tuktukDiff === 0) {
            // If the number of sixes is the same, sort based on strike rate
            const strikeRateDiff =
              calculateStrikeRate(
                getPlayerScored(a.stats),
                getPlayerBalls(a.stats)
              ) -
              calculateStrikeRate(
                getPlayerScored(b.stats),
                getPlayerBalls(b.stats)
              );
            return strikeRateDiff;
          }

          return tuktukDiff;
        })
        .slice(0, 5)
    );
  };

  useEffect(() => {
    const getData = async () => {
      const maleData = [];
      const femaleData = [];
      const querySnapshot = await getDocs(
        query(
          collection(db, "participating-team-member"),
          where("edition", "==", "17")
        )
      );
      querySnapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        if (getGender(data.teamId) === "male") {
          maleData.push(data);
        } else {
          femaleData.push(data);
        }
      });
      setmalePlayers(maleData);
      setfemalePlayers(femaleData);
    };
    getData();
  }, []);

  useEffect(() => {
    const setData = () => {
      getTopBatsman();
      getTopBaller();
      getTopSixer();
      getTopfourer();
      getTophighestbatsaman();
      getToptuktukbatsman();
    };
    setData();
  }, [malePlayers, femalePlayers]);

  const [selectedGender, setSelectedGender] = useState("male");
  const maleColor = "[#508CD4]";
  const femaleColor = "[#CE3AB3]";
  const StylesBasedonGender = (gender) => {
    if (selectedGender === gender) {
      if (gender === "male") {
        return "bg-[#508CD4] font-[700] text-[20px] md:text-[39px] md:w-auto md:h-[71px] leading-[24.38px] text-white h-[51px] w-[103px] px-2 shadow-lg";
      } else if (gender === "female") {
        return "bg-[#CE3AB3] font-[700] text-[20px] md:text-[39px] md:w-auto md:h-[71px] leading-[24.38px] text-white h-[51px] w-[124px] px-2 shadow-lg";
      }
    } else {
      return "";
    }
  };

  function decisionsBasedonGender() {
    let finalDecision = "";
    if (selectedGender === "male") {
      finalDecision = "from-[#272CAA]";
    } else {
      finalDecision = "from-[#AA277E]";
    }

    return finalDecision;
  }
  return (
    <div>
      <Head>
        <title>MMNCT Stars</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <div className={`bg-gradient-to-b ${decisionsBasedonGender()} to-white`}>
        <div>
          {" "}
          <p className=" text-4xl md:text-7xl font-extrabold text-white py-4 text-center tracking-widest">
            MMNCT'23 STARS
          </p>
        </div>
        <div className="bg-white my-2 mt-4 text-gray-500 flex justify-evenly w-[270px] md:w-[290px] mx-auto text-center font-[600] text-[16px] rounded-lg mb-6">
          <div
            onClick={() => {
              setSelectedGender("male");
            }}
            className={`cursor-pointer h-[44px] flex justify-center items-center`}
          >
            <p
              className={`${StylesBasedonGender(
                "male"
              )} flex items-center text-2xl font-semibold  justify-center rounded-lg`}
            >
              Men's
            </p>
          </div>
          <div
            onClick={() => {
              setSelectedGender("female");
            }}
            className={`cursor-pointer h-[44px] flex justify-center items-center`}
          >
            <p
              className={`${StylesBasedonGender(
                "female"
              )} flex items-center text-2xl font-semibold justify-center rounded-lg`}
            >
              Women's
            </p>
          </div>
        </div>
        <div>
          <div className=" w-5/6 mx-auto gap-2 grid-cols-1 md:grid-cols-2  grid lg:grid-cols-3">
            {selectedGender === "male" ? (
              <>
                <Link href={`/player-details/${top5malebatsman[0]?.id}`}>
                  <HighestScoreCard
                    playerStats={top5malebatsman[0]}
                    title="Most Runs"
                    selectedGender={selectedGender}
                  />
                </Link>
                <Link href={`/player-details/${top5malebowler[0]?.id}`}>
                  <HighestScoreCard
                    playerStats={top5malebowler[0]}
                    title="Most Wickets"
                    selectedGender={selectedGender}
                  />
                </Link>
                <Link href={`/player-details/${top5malefourer[0]?.id}`}>
                  <HighestScoreCard
                    playerStats={top5malefourer[0]}
                    title="Most 4s"
                    selectedGender={selectedGender}
                  />
                </Link>
                <Link href={`/player-details/${top5malesixer[0]?.id}`}>
                  <HighestScoreCard
                    playerStats={top5malesixer[0]}
                    title="Most 6s"
                    selectedGender={selectedGender}
                  />
                </Link>
                <Link href={`/player-details/${top5maletutktukbatsman[0]?.id}`}>
                  <HighestScoreCard
                    playerStats={top5maletutktukbatsman[0]}
                    title="Most Dot Balls"
                    selectedGender={selectedGender}
                  />
                </Link>
                <Link href={`/player-details/${top5malehighestbatsman[0]?.id}`}>
                  <HighestScoreCard
                    playerStats={top5malehighestbatsman[0]}
                    title="Highest Score"
                    selectedGender={selectedGender}
                  />
                </Link>
              </>
            ) : (
              <>
                <Link href={`/player-details/${top5femalebatsman[0]?.id}`}>
                  <HighestScoreCard
                    playerStats={top5femalebatsman[0]}
                    title="Most Runs"
                    selectedGender={selectedGender}
                  />
                </Link>
                <Link href={`/player-details/${top5femalebowler[0]?.id}`}>
                  <HighestScoreCard
                    playerStats={top5femalebowler[0]}
                    title="Most Wickets"
                    selectedGender={selectedGender}
                  />
                </Link>
                <Link href={`/player-details/${top5femalefourer[0]?.id}`}>
                  <HighestScoreCard
                    playerStats={top5femalefourer[0]}
                    title="Most 4s"
                    selectedGender={selectedGender}
                  />
                </Link>
                <Link href={`/player-details/${top5femalesixer[0]?.id}`}>
                  <HighestScoreCard
                    playerStats={top5femalesixer[0]}
                    title="Most 6s"
                    selectedGender={selectedGender}
                  />
                </Link>
                <Link
                  href={`/player-details/${top5femaletuktukbatsman[0]?.id}`}
                >
                  <HighestScoreCard
                    playerStats={top5femaletuktukbatsman[0]}
                    title="Most Dot Balls"
                    selectedGender={selectedGender}
                  />
                </Link>
                <Link
                  href={`/player-details/${top5femalehighestbatsman[0]?.id}`}
                >
                  <HighestScoreCard
                    playerStats={top5femalehighestbatsman[0]}
                    title="Highest Score"
                    selectedGender={selectedGender}
                  />
                </Link>
              </>
            )}
          </div>
          <div className="w-full  flex-col mx-auto mt-10 ">
            <p className="text-center  text-2xl md:text-4xl font-bold mb-5  text-black ">
              Top 5 Batsmen
            </p>

            {/* <button
                onClick={() => {
                  const container = document.querySelector(".bat");
                  const scrollAmount = -300; // You can adjust the scroll amount as needed
                  container.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                  });
                }}
              >
                <TfiArrowCircleLeft className="h-[25px] w-[25px] md:h-[40px] md:w-[40px] mx-1 md:mr-2" />
              </button> */}
            <div className="w-full mx-auto  rounded-md p-5 ">
              <Carousel
                itemClass="react-multi-carousel-item"
                partialVisible={false}
                responsive={responsive}
                swipeable={true}
                draggable={true}
                arrows={false}
                showDots={true}
                keyBoardControl={true}
                className="gd-carousel"
                containerClass="carousel-container"
                
                
              >
                {selectedGender === "male"
                  ? top5malebatsman.map((player, index) => {
                      return (
                        <Link href={`/player-details/${player.id}`} key={index}>
                          <PlayerProfilecard
                            playerStats={player}
                            selectedGender={selectedGender}
                            title={"batsman"}
                            Rank={index + 1}
                          />{" "}
                        </Link>
                      );
                    })
                  : top5femalebatsman.map((player, index) => (
                      <Link href={`/player-details/${player.id}`} key={index}>
                        <PlayerProfilecard
                          playerStats={player}
                          selectedGender={selectedGender}
                          title={"batsman"}
                          Rank={index + 1}
                        />
                      </Link>
                    ))}
              </Carousel>
            </div>
            {/* <button
                onClick={() => {
                  const container = document.querySelector(".bat");
                  const scrollAmount = 300; // You can adjust the scroll amount as needed
                  container.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                  });
                }}
              >
                <TfiArrowCircleRight className="h-[25px] w-[25px] md:h-[40px] md:w-[40px] mx-1 md:ml-2" />
              </button> */}
          </div>
          <div className="w-full  flex-col mx-auto mt-10 ">
            <p className="text-center  text-2xl md:text-4xl font-bold mb-5  text-black ">
              Top 5 Bowlers
            </p>
            {/* <div
              className="w-full grid grid-flow-col overflow-x-auto   gap-x-5 scrollbar-hide "
              style={{}}
            >
              {selectedGender === "male"
                ? top5malebowler.map(player => {
                  return <Link href={`/player-details/${player.id}`}><PlayerProfilecard
                    playerStats={player}
                    selectedGender={selectedGender}
                    title={"bowler"}
                  /></Link>
                })
                : top5femalebowler.map(player => {
                  return <Link href={`/player-details/${player.id}`}><PlayerProfilecard
                    playerStats={player}
                    selectedGender={selectedGender}
                    title={"bowler"}
                  /></Link>

                })
              }
            </div> */}

            {/* <button
                onClick={() => {
                  const container = document.querySelector(".ixer");
                  const scrollAmount = -300; // You can adjust the scroll amount as needed
                  container.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                  });
                }}
              >
                <TfiArrowCircleLeft className="h-[25px] w-[25px] md:h-[40px] md:w-[40px] mx-1 md:mr-2" />
              </button> */}
            <div className="w-full mx-auto  rounded-md p-5 ">
              <Carousel
                itemClass="react-multi-carousel-item"
                partialVisible={false}
                responsive={responsive}
                swipeable={true}
                draggable={true}
                arrows={false}
                showDots={true}
                keyBoardControl={true}
                className="gd-carousel"
                containerClass="carousel-container"
                
               
              >
                {selectedGender === "male"
                  ? top5malebowler.map((player, index) => (
                      <Link
                        href={`/player-details/${player.id}`}
                        key={player.id}
                      >
                        <PlayerProfilecard
                          playerStats={player}
                          selectedGender={selectedGender}
                          title={"bowler"}
                          Rank={index + 1}
                        />
                      </Link>
                    ))
                  : top5femalebowler.map((player, index) => (
                      <Link
                        href={`/player-details/${player.id}`}
                        key={player.id}
                      >
                        <PlayerProfilecard
                          playerStats={player}
                          selectedGender={selectedGender}
                          title={"bowler"}
                          Rank={index + 1}
                        />
                      </Link>
                    ))}
              </Carousel>
            </div>
            {/* <button
                onClick={() => {
                  const container = document.querySelector(".ixer");
                  const scrollAmount = 300; // You can adjust the scroll amount as needed
                  container.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                  });
                }}
              >
                <TfiArrowCircleRight className="h-[25px] w-[25px] md:h-[40px] md:w-[40px] mx-1 md:ml-2" />
              </button> */}
          </div>
          <div className="w-full  flex-col mx-auto mt-10 ">
            <p className="text-center  text-2xl md:text-4xl font-bold mb-5  text-black ">
              Top 5 Sixers
            </p>

            {/* <button
                onClick={() => {
                  const container = document.querySelector(".sixer");
                  const scrollAmount = -300; // You can adjust the scroll amount as needed
                  container.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                  });
                }}
              >
                <TfiArrowCircleLeft className="h-[25px] w-[25px] md:h-[40px] md:w-[40px] mx-1 md:mr-2" />
              </button> */}
            <div className="w-full mx-auto  rounded-md p-5 ">
              <Carousel
                itemClass="react-multi-carousel-item"
                partialVisible={false}
                responsive={responsive}
                swipeable={true}
                draggable={true}
                arrows={false}
                showDots={true}
                keyBoardControl={true}
                className="gd-carousel"
                containerClass="carousel-container"
                
                
              >
                {selectedGender === "male"
                  ? top5malesixer.map((player, index) => {
                      return (
                        <Link href={`/player-details/${player.id}`} key={index}>
                          <PlayerProfilecard
                            playerStats={player}
                            selectedGender={selectedGender}
                            title={"six"}
                            Rank={index + 1}
                          />
                        </Link>
                      );
                    })
                  : top5femalesixer.map((player, index) => {
                      return (
                        <Link href={`/player-details/${player.id}`} key={index}>
                          <PlayerProfilecard
                            playerStats={player}
                            selectedGender={selectedGender}
                            title={"six"}
                            Rank={index + 1}
                          />
                        </Link>
                      );
                    })}
              </Carousel>
            </div>
            {/* <button
                onClick={() => {
                  const container = document.querySelector(".sixer");
                  const scrollAmount = 300; // You can adjust the scroll amount as needed
                  container.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                  });
                }}
              >
                <TfiArrowCircleRight className="h-[25px] w-[25px] md:h-[40px] md:w-[40px] mx-1 md:ml-2" />
              </button> */}
          </div>
          <div className="w-full  flex-col mx-auto mt-10 ">
            <p className="text-center  text-2xl md:text-4xl font-bold mb-5  text-black ">
              Top 5 Fourers
            </p>

            {/* <button
                onClick={() => {
                  const container = document.querySelector(".fourer");
                  const scrollAmount = -300; // You can adjust the scroll amount as needed
                  container.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                  });
                }}
              >
                <TfiArrowCircleLeft className="h-[25px] w-[25px] md:h-[40px] md:w-[40px] mx-1 md:mr-2" />
              </button> */}

            {/* <div
                className="w-full grid grid-flow-col overflow-x-auto fourer  gap-x-5 scrollbar-hide "
                data-selected-gender={selectedGender}
              > */}
            <div className="w-full mx-auto  rounded-md p-5 ">
              <Carousel
                itemClass="react-multi-carousel-item"
                partialVisible={false}
                responsive={responsive}
                swipeable={true}
                draggable={true}
                arrows={false}
                showDots={true}
                keyBoardControl={true}
                className="gd-carousel"
                containerClass="carousel-container"
               
                
              >
                {selectedGender === "male"
                  ? top5malefourer.map((player, index) => {
                      return (
                        <Link href={`/player-details/${player.id}`} key={index}>
                          <PlayerProfilecard
                            playerStats={player}
                            selectedGender={selectedGender}
                            title={"four"}
                            Rank={index + 1}
                          />
                        </Link>
                      );
                    })
                  : top5femalefourer.map((player, index) => {
                      return (
                        <Link href={`/player-details/${player.id}`} key={index}>
                          <PlayerProfilecard
                            playerStats={player}
                            selectedGender={selectedGender}
                            title={"four"}
                            Rank={index + 1}
                          />
                        </Link>
                      );
                    })}
              </Carousel>
            </div>
            {/* </div> */}
            {/* <button
                onClick={() => {
                  const container = document.querySelector(".fourer");
                  const scrollAmount = 300; // You can adjust the scroll amount as needed
                  container.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                  });
                }}
              >
                <TfiArrowCircleRight className="h-[25px] w-[25px] md:h-[40px] md:w-[40px] mx-1 md:ml-2" />
              </button> */}
          </div>
          <div className="w-full  flex-col mx-auto mt-10 ">
            <p className="text-center  text-2xl md:text-4xl font-bold mb-5  text-black ">
              Top 5 Highest Scores
            </p>

            {/* <button
                onClick={() => {
                  const container = document.querySelector(".highest");
                  const scrollAmount = -300; // You can adjust the scroll amount as needed
                  container.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                  });
                }}
              >
                <TfiArrowCircleLeft className="h-[25px] w-[25px] md:h-[40px] md:w-[40px] mx-1 md:mr-2" />
              </button> */}

            <div className="w-full mx-auto  rounded-md p-5 ">
              <Carousel
                itemClass="react-multi-carousel-item"
                partialVisible={false}
                responsive={responsive}
                swipeable={true}
                draggable={true}
                arrows={false}
                showDots={true}
                keyBoardControl={true}
                className="gd-carousel"
                containerClass="carousel-container"
               
              >
                {selectedGender === "male"
                  ? top5malehighestbatsman.map((player, index) => {
                      return (
                        <Link href={`/player-details/${player.id}`} key={index}>
                          <PlayerProfilecard
                            playerStats={player}
                            selectedGender={selectedGender}
                            title={"highestScore"}
                            Rank={index + 1}
                          />
                        </Link>
                      );
                    })
                  : top5femalehighestbatsman.map((player, index) => (
                      <Link href={`/player-details/${player.id}`} key={index}>
                        <PlayerProfilecard
                          playerStats={player}
                          selectedGender={selectedGender}
                          title={"highestScore"}
                          Rank={index + 1}
                        />
                      </Link>
                    ))}
              </Carousel>
            </div>
            {/* <button
                onClick={() => {
                  const container = document.querySelector(".highest");
                  const scrollAmount = 300; // You can adjust the scroll amount as needed
                  container.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                  });
                }}
              >
                <TfiArrowCircleRight className="h-[25px] w-[25px] md:h-[40px] md:w-[40px] mx-1 md:ml-2" />
              </button> */}
          </div>
          <div className="w-full  flex-col mx-auto mt-10 ">
            <p className="text-center  text-2xl md:text-4xl font-bold mb-5  text-black ">
              Top 5 Tuk Tuk Players
            </p>

            {/* <button
                onClick={() => {
                  const container = document.querySelector(".tuktuk");
                  const scrollAmount = -300; // You can adjust the scroll amount as needed
                  container.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                  });
                }}
              >
                <TfiArrowCircleLeft className="h-[25px] w-[25px] md:h-[40px] md:w-[40px] mx-1 md:mr-2" />
              </button> */}

            <div className="w-full mx-auto  rounded-md p-5 ">
              <Carousel
                itemClass="react-multi-carousel-item"
                partialVisible={false}
                responsive={responsive}
                swipeable={true}
                draggable={true}
                arrows={false}
                showDots={true}
                keyBoardControl={true}
                className="gd-carousel"
                containerClass="carousel-container"
              >
                {selectedGender === "male"
                  ? top5maletutktukbatsman.map((player, index) => {
                      return (
                        <Link href={`/player-details/${player.id}`} key={index}>
                          <PlayerProfilecard
                            playerStats={player}
                            selectedGender={selectedGender}
                            title={"tuktuk"}
                            Rank={index + 1}
                          />
                        </Link>
                      );
                    })
                  : top5femaletuktukbatsman.map((player, index) => {
                      return (
                        <Link href={`/player-details/${player.id}`} key={index}>
                          <PlayerProfilecard
                            playerStats={player}
                            selectedGender={selectedGender}
                            title={"tuktuk"}
                            Rank={index + 1}
                          />
                        </Link>
                      );
                    })}
              </Carousel>
            </div>
            {/* <button
                onClick={() => {
                  const container = document.querySelector(".tuktuk");
                  const scrollAmount = 300; // You can adjust the scroll amount as needed
                  container.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                  });
                }}
              >
                <TfiArrowCircleRight className="h-[25px] w-[25px] md:h-[40px] md:w-[40px] mx-1 md:ml-2" />
              </button> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
const PlayerProfilecard = ({ playerStats, selectedGender, title, Rank }) => {
  let statTitle1 = "",
    statTitle2 = "",
    statTitle3 = "",
    stat1Value = 0,
    stat2Value = 0,
    stat3Value = 0;
  if (title == "batsman") {
    statTitle1 = "Matches Played";
    statTitle2 = "Runs Scored";
    statTitle3 = "Strike Rate";
  } else if (title == "bowler") {
    statTitle1 = "Matches Played";
    statTitle2 = "Wickets";
    statTitle3 = "Economy";
  } else if (title == "six") {
    statTitle1 = "Matches Played";
    statTitle2 = "Sixes";
    statTitle3 = "";
  } else if (title == "four") {
    statTitle1 = "Matches Played";
    statTitle2 = "Fours";
    statTitle3 = "";
  } else if (title == "tuktuk") {
    statTitle1 = "Matches Played";
    statTitle2 = "Dot Balls";
    statTitle3 = "Strike Rate";
  } else if (title == "highestScore") {
    statTitle1 = "Matches Played";
    statTitle2 = "Highest Score";
    statTitle3 = "Strike Rate";
  }
  return (
    <div className="w-[250px] md:w-[280px] lg:w-[300px] border-2 mx-auto bg-white rounded-lg my-8">
      {/* w-[300px] */}
      <div className=" w-full justify-center  p-4 flex-col   gap-1 border-none  ">
        <div
          className={`font-bold text-center align-middle items-center rounded-full aspect-square border-2 ${
            selectedGender === "female"
              ? "border-pink-500 text-pink-600"
              : "border-blue-500 text-blue-600"
          } text-lg  h-[30px] w-[30px]`}
        >
          {Rank}{" "}
        </div>
        <div className="h-[100px] w-[100px] items-center justify-center mx-auto">
          <Image
            src={
              playerStats?.imgUrl !== ""
                ? playerStats?.imgUrl
                : selectedGender == "male"
                ? "/male.jpg"
                : "/female.jpg"
            }
            alt="profile_pic"
            width={80}
            height={80}
            className={`${
              selectedGender === "female"
                ? " rounded-full flex justify-center   mx-auto aspect-square   align-middle items-center ring-4 ring-offset-4 ring-pink-500 sm:align-middle  "
                : " rounded-full flex justify-center     mx-auto aspect-square   align-middle items-center ring-4 ring-offset-4 ring-blue-500 sm:align-middle "
            }
                 `}
          />
        </div>

        {/* <hr className=" h-1  bg-green-500 my-3 lg:hidden md:hidden sm:block" /> */}
        <div className="  w-full  px-2  ">
          <p className=" text-md md:text-lg font-medium  text-center   ">
            {/* Sunny Das */}
            {playerStats?.name}
            {/* {player Name} */}
          </p>
          <p
            className={
              selectedGender == "male"
                ? `text-md font-bold  text-center  text-blue-900`
                : `text-md font-bold text-center   text-pink-500`
            }
          >
            {" "}
            {/* {playerTeam} */}
            {/* Vengeance */}
            {getTeamCategory(playerStats?.teamId)}
          </p>
          <p className="text-sm font-bold  text-center  ">
            {" "}
            {playerStats?.roll_no}
            {/* U21CS102 */}
            {/* {player Roll No} */}
          </p>
          <p className="text-md font-bold  text-center ">
            {playerStats?.type}
            {/* {branch} */}
          </p>
          <p className="text-sm font-bold text-center  ">
            {playerStats?.branch}
            {/* {branch} */}
            {/* Computer Science And Engineering */}
          </p>
        </div>
      </div>
      <hr
        className={`${
          selectedGender === "female"
            ? " h-1 bg-pink-400 m-1 "
            : "h-1 bg-blue-500 m-1"
        }`}
      />
      <div className="p-3 mx-auto  w-full">
        <div className=" rounded-xl w-5/6 mx-auto sm:flex md:flex-row gap-1">
          <div className="w-full p-1 ">
            <div className="  w-full mx-auto flex gap-5 justify-between px-2">
              <span className=" text-center   text-sm font-bold  rounded-l-md text-black space-x-1">
                {" "}
                {statTitle1}
              </span>
              <span className="   text-center    text-sm font-bold  text-black space-x-1">
                {" "}
                {playerStats && playerStats?.stats && playerStats?.stats[10]
                  ? playerStats?.stats[10]
                  : 0}
              </span>
            </div>
            <hr
              className={`${
                selectedGender === "female"
                  ? " h-1 bg-pink-400 my-4 "
                  : "h-1 bg-blue-500 my-4"
              }`}
            />
            <div className="  w-full mx-auto flex gap-5 justify-between px-2">
              <span className=" text-center   text-sm font-bold  rounded-l-md text-black space-x-1">
                {" "}
                {statTitle2}
              </span>
              <span className="   text-center    text-sm font-bold  text-black space-x-1">
                {" "}
                {playerStats && playerStats?.stats && playerStats?.stats[10]
                  ? statTitle2 === "Runs Scored"
                    ? getPlayerScored(playerStats?.stats)
                    : statTitle2 === "Wickets"
                    ? playerStats?.stats[14]
                    : statTitle2 === "Sixes"
                    ? playerStats?.stats[6]
                    : statTitle2 === "Fours"
                    ? playerStats?.stats[4]
                    : statTitle2 === "Dot Balls"
                    ? playerStats?.stats[0]
                    : statTitle2 === "Highest Score"
                    ? playerStats?.stats[11]
                    : 0
                  : 0}
              </span>
            </div>
            <hr
              className={`${
                selectedGender === "female"
                  ? " h-1 bg-pink-400 my-4 "
                  : "h-1 bg-blue-500 my-4"
              }`}
            />
            {statTitle3 !== "" && (
              <div className="  w-full mx-auto flex gap-5 justify-between px-2">
                <span className=" text-center   text-sm font-bold  rounded-l-md text-black space-x-1">
                  {" "}
                  {statTitle3}
                </span>
                <span className="   text-center    text-sm font-bold  text-black space-x-1">
                  {" "}
                  {playerStats && playerStats?.stats
                    ? statTitle3 === "Economy" && playerStats?.stats[12]
                      ? calculateEconomyRate(
                          playerStats?.stats[13],
                          playerStats?.stats[12]
                        )
                      : statTitle3 === "Strike Rate"
                      ? (() => {
                          const strikeRate = calculateStrikeRate(
                            getPlayerScored(playerStats?.stats),
                            getPlayerBalls(playerStats?.stats)
                          );
                          {
                            /* console.log(playerStats?.name+" "+getPlayerBalls(playerStats?.stats)); */
                          }
                          return strikeRate;
                        })()
                      : 0
                    : 0}
                </span>
              </div>
            )}
            {/* {statTitle3 !== "" && (
              <hr
                className={`${
                  selectedGender === "female"
                    ? " h-1 bg-pink-400 my-4 "
                    : "h-1 bg-blue-500 my-4"
                }`}
              />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

const HighestScoreCard = ({ playerStats, title, selectedGender }) => {
  return (
    <div className="flex flex-col border-2 rounded-lg gap-8 h-[285px] w-full bg-white">
      <div
        className={`text-center mx-auto font-bold text-3xl mt-2 ${
          selectedGender == "male" ? `text-[#508CD4]` : `text-[#CE3AB3]`
        } `}
      >
        {title}
      </div>
      <div className="flex ">
        <div className="w-1/2">
          <div className="h-[120px] w-[120px] items-center flex-col justify-center mx-auto ">
            <Image
              src={
                playerStats?.imgUrl !== ""
                  ? playerStats?.imgUrl
                  : selectedGender == "male"
                  ? "/male.jpg"
                  : "/female.jpg"
              }
              // src={"/male.jpg"}
              alt="profile_pic"
              width={100}
              height={100}
              className="rounded-full flex justify-center   mx-auto aspect-square   align-middle items-center  border-2 sm:align-middle "
            />
            <p
              className={
                selectedGender == "male"
                  ? `text-md font-bold  text-center  text-blue-900`
                  : `text-md font-bold text-center   text-pink-500`
              }
            >
              {" "}
              {getTeamCategory(playerStats?.teamId)} {/*teamName*/}
            </p>
          </div>
        </div>
        <div className="mx-auto text-center w-1/2 ">
          <p className="text-center space-y-1 font-medium">
            {playerStats?.name} {/*playerName*/}{" "}
          </p>
          <p className="text-center space-y-1 font-medium">
            {playerStats?.roll_no} {/*playerRollNo*/}{" "}
          </p>

          <p className="text-center space-y-1 font-medium">
            {playerStats?.type}
            {/*playerDepartment*/}{" "}
          </p>
          <p className="text-center space-y-1 font-medium">
            {playerStats?.branch}
            {/*playerDepartment*/}{" "}
          </p>
        </div>
      </div>
      <div
        className={`mx-auto text-5xl font-bold mb-5  ${
          selectedGender == "male" ? `text-[#508CD4]` : `text-[#CE3AB3]`
        }`}
      >
        {/* 152 count */}
        {playerStats && playerStats?.stats && playerStats?.stats[10]
          ? title === "Most Runs"
            ? getPlayerScored(playerStats?.stats)
            : title === "Most Wickets"
            ? playerStats?.stats[14]
            : title === "Most 6s"
            ? playerStats?.stats[6]
            : title === "Most 4s"
            ? playerStats?.stats[4]
            : title === "Most Dot Balls"
            ? playerStats?.stats[0]
            : title === "Highest Score"
            ? playerStats?.stats[11]
            : 0
          : 0}{" "}
      </div>
    </div>
  );
};
