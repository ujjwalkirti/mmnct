import Link from "next/link";
import { ImCircleRight } from "react-icons/im";
import { totalScore, getOver } from "../components/matchFunctions";
import teams from "./teams";

const PastMatchCard = (props) => {
  const teamStyle =
    "flex flex-col items-center justify-center";
  const teamName = "font-extrabold text-xs md:text-lg";
  const shortformstyle = "h-[48px] md:h-[60px] rounded-full";
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
          curElem.status !== "past" ||
          curElem.category !== props.matchData[1]
        ) {
          return <></>;
        }
        return (
          <>
            <div className="flex bg-white md:justify-evenly flex-1 text-sm items-center justify-center shadow-lg py-4 mx-4 rounded-lg">
              {/* team 1 */}
              <div className={`${teamStyle} pl-5`}>
                <img
                  alt="team-logo"
                  className={shortformstyle}
                  style={{ backgroundColor: teams[curElem.Team1Id].themeColor }}
                  src={teams[curElem.Team1Id].teamLogo}
                />
                <p className={`${teamName} pl-1`}>
                  {teams[curElem.Team1Id].teamCode}
                </p>
              </div>

              {/* current score and over */}
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
              </div>

              {/* timing and date */}
              <div className="flex flex-col items-center justify-center px-2.5">
                <p className="text-black-400">{curElem.finalComment}</p>
                <p className="text-black-400">
                  <sup>{curElem.timeDate}</sup>
                </p>
              </div>

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
              </div>

              <div className={teamStyle}>
                <img
                  alt="team-logo"
                  className={shortformstyle}
                  style={{ backgroundColor: teams[curElem.Team2Id].themeColor }}
                  src={teams[curElem.Team2Id].teamLogo}
                />
                <p className={`${teamName} pr-5 pl-1`}>
                  {teams[curElem.Team2Id].teamCode}
                </p>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};
export default PastMatchCard;
