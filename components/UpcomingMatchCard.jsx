import Link from "next/link";
import { ImCircleRight } from "react-icons/im";
import { db } from "./db/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import teams from "./teams"

const UpcomingMatchCard = (props) => {
  const teamStyle = "flex flex-1 items-center justify-center flex-wrap flex-row";
  const teamName = "font-extrabold text-xs md:text-lg";
  const shortformstyle = "h-[48px] md:h-[60px] rounded-full";
  console.log(props.matchdata);
  if (!(props.matchData)) {
    return (
      <>
      </>
    );
  }
  if (!(props.matchData[0])) {
    return (
      <>
      </>
    );
  }
  let matchData = props["matchData"][0];
  return (
    <>
      {matchData.map((curElem) => {
        if (curElem.status !== "upcoming" || curElem.category !== props.matchData[1]) {
          return (
            <></>
          )
        }
        return (
          <>
            <div className="flex bg-white md:justify-evenly flex-1 text-sm items-center justify-center shadow-lg py-4 mx-4 rounded-lg">
              {/* team 1 */}
              <div className={teamStyle}>
                <img
                  alt="team-logo"
                  className={shortformstyle}
                  style={{ backgroundColor: teams[curElem.Team1Id].themeColor }}
                  src={teams[curElem.Team1Id].teamLogo}
                />
                <p className={`${teamName} ml-1`}>{curElem.Team1Id}</p>
              </div>


              {/* timing and date */}
              <div className="flex flex-col items-center justify-center px-5">
                <p className="text-gray-400">{curElem.finalComment}</p>
                <p className="text-gray-400">
                  <sup>{curElem.timeDate}</sup>
                </p>
              </div>


              {/* team 2 */}
              <div className={teamStyle}>
                <img
                  alt="team-logo"
                  className={shortformstyle}
                  style={{ backgroundColor: teams[curElem.Team2Id].themeColor }}
                  src={teams[curElem.Team2Id].teamLogo}
                />
                <p className={`${teamName} ml-1`}>{curElem.Team2Id}</p>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};
export default UpcomingMatchCard;
