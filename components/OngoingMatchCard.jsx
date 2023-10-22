import Link from "next/link";
import Image from "next/image";
import {
  totalScore,
  getOver,
  getPlayerScore,
  extraOfInnings,
} from "../components/matchFunctions";
import teams from "./teams";
import { TiStar } from "react-icons/ti";
import { GiCricketBat, GiTennisBall } from "react-icons/gi";

const OngoingMatchCard = (props) => {
  const teamStyle =
    "flex items-center gap-0 justify-between md:justify-evenly w-2/5 ";
  const teamName = "font-extrabold text-lg md:text-lg";
  const shortformstyle = "h-[68px] md:h-[80px] md:w-[80px] rounded-full";
  const teamNameStyle = "text-center flex flex-col items-center";
  if (!props.matchData) {
    return <></>;
  }
  if (!props.matchData[0]) {
    return <></>;
  }
  let matchData = props["matchData"][0];
  return (
    <>
      {matchData.map((curElem) => {
        if (
          curElem.status !== "ongoing" ||
          curElem.category !== props.matchData[1]
        ) {
          return <></>;
        }
        //console.log(curElem);
        return (
          <>
            <div className="flex flex-col bg-white md:justify-evenly lg:w-10/12 w-11/12 text-sm items-center justify-center shadow-lg pb-4 mx-4 rounded-lg">
              {curElem.tag === "" ? (
                <div></div>
              ) : (
                <div className="border-[#7f1d1d] bg-[#fde047] flex flex-col items-center justify-center w-full px-3 lg:px-6 py-1.5 mb-3">
                  <p className="text-[#7f1d1d] font-semibold w-fit px-1 flex-nowrap">
                    {curElem.tag}
                  </p>
                </div>
              )}
              <Link
                href={`/scorecard?matchId=${curElem.id}`}
                className=" w-full px-2">
                <div className="flex justify-evenly w-full items-center">
                  {/* team 1 */}
                  <div className={`${teamStyle}`}>
                    <div className={teamNameStyle}>
                      <img
                        alt="team-logo"
                        className={shortformstyle}
                        style={{
                          backgroundColor: teams[curElem.Team1Id].themeColor,
                        }}
                        src={teams[curElem.Team1Id].teamLogo}
                      />
                      <p className={`${teamName} ml-1 lg:hidden`}>
                        {teams[curElem.Team1Id].teamCode}
                      </p>
                      <p className={`${teamName} ml-1 hidden lg:flex`}>
                        {curElem.Team1Id}
                      </p>
                      <p className="text-[12px] text-gray-500">
                        ({teams[curElem.Team1Id].teamType})
                      </p>
                      {curElem.currBattingTeam === curElem.Team1Id ? (
                        <div>
                          {curElem.striker && curElem.striker !== undefined ? (
                            <div className="flex flex-col items-center">
                              {" "}
                              <p className="text-black-400">
                                {/* sticker */}
                                <p className=" text-xs text-center font-semibold text-balance 
                                ">
                                  <span className="">
                                    <GiCricketBat className=" inline-block rotate-180 text-pink-600 " />
                                  </span>
                                  {
                                    curElem.Team1Players[
                                      curElem.striker
                                    ]?.playerName.split(" ")[0]
                                  }{" "}
                                  {getPlayerScore(
                                    curElem.Team1Players,
                                    curElem.striker
                                  )}
                                </p>{" "}
                              </p>
                              {/* Non-striker */}
                              <p className="text-black-400 text-center  text-[10px]">
                                {
                                  curElem.Team1Players[
                                    curElem.nonStriker
                                  ]?.playerName.split(" ")[0]
                                }{" "}
                                {getPlayerScore(
                                  curElem.Team1Players,
                                  curElem.nonStriker
                                )}
                              </p>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      ) : (
                        <p className="text-black-400">
                          {curElem.baller && curElem.baller !== undefined ? (
                            <div className=" flex flex-col text-center">
                              {/* Bowler */}
                              <p>
                                {" "}
                                <GiTennisBall className=" inline-block rotate-180 text-pink-600 " />{" "}
                                <span className=" text-xs font-semibold">
                                  {
                                    curElem.Team1Players[
                                      curElem.baller
                                    ]?.playerName.split(" ")[0]
                                  }{" "}
                                </span>
                              </p>
                              <p className=" text-[12px]">
                                {
                                  curElem.Team1Players[curElem.baller]
                                    ?.score[14]
                                }
                                -
                                {
                                  curElem.Team1Players[curElem.baller]
                                    ?.score[13]
                                }
                                (
                                {Math.floor(
                                  curElem.Team1Players[curElem.baller]
                                    ?.score[12] / 6
                                )}
                                .
                                {curElem.Team1Players[curElem.baller]
                                  ?.score[12] % 6}
                                )
                              </p>

                              <p className="text-xs">
                                {
                                  getOver(
                                    curElem.Team2Score,
                                    curElem.Team2prev,
                                    curElem.Team2Extra
                                  )[1]
                                }
                              </p>
                            </div>
                          ) : (
                            <></>
                          )}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-orange-500 font-bold">
                        {totalScore(
                          curElem.Team1Score,
                          curElem.Team1Extra,
                          curElem.Team1Wicket
                        )}
                      </p>
                      <p className="text-orange-500 font-bold">
                        (
                        {
                          getOver(
                            curElem.Team1Score,
                            curElem.Team1prev,
                            curElem.Team1Extra
                          )[0]
                        }
                        )
                      </p>
                      {/* <p className="text-orange-500 font-bold">
                     extras:  {extraOfInnings(
                        curElem.Team1Score,
                        curElem.Team1Extra,
                      )}
                    </p> */}
                    </div>
                  </div>
                  <div>
                    {" "}
                    <Image src="/vector-8.png" height={65} width={65} />
                  </div>
                  {/* current score and over */}

                  <div className={teamStyle}>
                    <div>
                      <p className="text-orange-500 font-bold">
                        {totalScore(
                          curElem.Team2Score,
                          curElem.Team2Extra,
                          curElem.Team2Wicket
                        )}
                      </p>
                      <p className="text-orange-500 font-bold">
                        (
                        {
                          getOver(
                            curElem.Team2Score,
                            curElem.Team2prev,
                            curElem.Team2Extra
                          )[0]
                        }
                        )
                      </p>
                      {/* <p className="text-orange-500 font-bold">
                     extras:  {extraOfInnings(
                        curElem.Team2Score,
                        curElem.Team2Extra,
                      )}
                    </p> */}
                    </div>
                    <div className={teamNameStyle}>
                      <img
                        alt="team-logo"
                        className={shortformstyle}
                        style={{
                          backgroundColor: teams[curElem.Team2Id].themeColor,
                        }}
                        src={teams[curElem.Team2Id].teamLogo}
                      />
                      <p className={`${teamName} ml-1 lg:hidden`}>
                        {teams[curElem.Team2Id].teamCode}
                      </p>
                      <p className={`${teamName} ml-1 hidden lg:flex`}>
                        {curElem.Team2Id}
                      </p>
                      <p className="text-[12px] text-gray-500">
                        ({teams[curElem.Team2Id].teamType})
                      </p>
                      {curElem.currBattingTeam === curElem.Team2Id ? (
                        <div className=" h-auto w-auto">
                          {curElem.striker && curElem.striker !== undefined ? (
                            <div className=" flex flex-col items-center">
                              {" "}
                              <p className="text-black-400 ">
                                {/* stricker */}
                                <p className=" text-xs text-center font-semibold  text-balance ">
                                  <span className="">
                                    <GiCricketBat className=" inline-block rotate-180 text-pink-600 " />
                                  </span>
                                  {
                                    curElem.Team2Players[
                                      curElem.striker
                                    ]?.playerName.split(" ")[0]
                                  }{" "}
                                  {getPlayerScore(
                                    curElem.Team2Players,
                                    curElem.striker
                                  )}
                                </p>{" "}
                              </p>
                              <p className="text-black-400 text-center  text-[10px] ">
                                {/* non-sticker */}
                                {
                                  curElem.Team2Players[
                                    curElem.nonStriker
                                  ]?.playerName.split(" ")[0]
                                }{" "}
                                {getPlayerScore(
                                  curElem.Team2Players,
                                  curElem.nonStriker
                                )}
                              </p>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      ) : (
                        <p className="text-black-400">
                          {curElem.baller && curElem.baller !== undefined ? (
                            <div className=" flex flex-col text-center">
                              {/* Bowler */}
                              <p>
                                <GiTennisBall className=" inline-block rotate-180 text-pink-600 " />{" "}
                                <span>
                                  {
                                    curElem.Team2Players[
                                      curElem.baller
                                    ]?.playerName.split(" ")[0]
                                  }{" "}
                                </span>
                              </p>
                              <p className=" text-[12px]">
                                {
                                  curElem.Team2Players[curElem.baller]
                                    ?.score[14]
                                }
                                -
                                {
                                  curElem.Team2Players[curElem.baller]
                                    ?.score[13]
                                }
                                (
                                {Math.floor(
                                  curElem.Team2Players[curElem.baller]
                                    ?.score[12] / 6
                                )}
                                .
                                {curElem.Team2Players[curElem.baller]
                                  ?.score[12] % 6}
                                )
                              </p>

                              <p className="text-xs" >
                                {
                                  getOver(
                                    curElem.Team1Score,
                                    curElem.Team1prev,
                                    curElem.Team1Extra
                                  )[1]
                                }
                              </p>
                            </div>
                          ) : (
                            <></>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/* timing and date */}
                <div className="flex flex-col items-center justify-center px-2.5">
                  <p className="text-black-400">{curElem.finalComment}</p>
                  <p className="text-black-400">
                    <sup>{curElem.timeDate}</sup>
                  </p>
                </div>
              </Link>
            </div>
          </>
        );
      })}
    </>
  );
};
export default OngoingMatchCard;
