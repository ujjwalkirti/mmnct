import Link from "next/link";
import { ImCircleRight } from "react-icons/im";
import { totalScore, getOver } from '../components/matchFunctions'; 

const PastMatchCard = (props) => {
  const teamStyle = "flex items-center justify-center";
  const teamName = "font-extrabold text-lg";

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
  console.log(matchData);
  return (
    <>
      {matchData.map((curElem) => {
        if (curElem.status !== "past" || curElem.category !== props.matchData[1]) {
          return (
            <></>
          )
        }
        return (
          <>
            <div className="flex bg-white md:justify-evenly md:w-full md:mx-auto text-sm items-center justify-center shadow-lg py-4 mx-4 rounded-lg">
              {/* team 1 */}
              <div className={`${teamStyle} pl-5`}>
                <p className={teamName}>{curElem.Team1Id}</p>
                <img
                  alt="team-logo"
                  className="team-logo"
                  src="https://mir-s3-cdn-cf.behance.net/projects/404/168243107813919.Y3JvcCwzMDAwLDIzNDYsMCw0MjM.jpg"
                />
              </div>

              {/* current score and over */}
              <div>
                <p className="text-orange-500 font-bold">{totalScore(curElem.Team1Score, curElem.Team1Extra, curElem.Team1Wicket)}</p>
                <p className="text-orange-500 font-bold">({getOver(curElem.Team1Score, curElem.Team1prev, curElem.Team1Extra)[0]})</p>
              </div>

              {/* timing and date */}
              <div className="flex flex-col items-center justify-center px-2.5">
                <p className="text-gray-400">{curElem.finalComment}</p>
                <p className="text-orange-500 font-bold">{curElem.timeDate.split("T")[1]}</p>
                <p className="text-gray-400">
                  <sup>{curElem.timeDate.split("T")[0]}</sup>
                </p>
              </div>


              <div>
                <p className="text-orange-500 font-bold">{totalScore(curElem.Team2Score, curElem.Team2Extra, curElem.Team2Wicket)}</p>
                <p className="text-orange-500 font-bold">({getOver(curElem.Team2Score, curElem.Team2prev, curElem.Team2Extra)[0]})</p>
              </div>


              <div className={teamStyle}>
                <img
                  alt="team-logo"
                  className="team-logo"
                  src="https://mir-s3-cdn-cf.behance.net/projects/404/168243107813919.Y3JvcCwzMDAwLDIzNDYsMCw0MjM.jpg"
                />
                <p className={`${teamName} pr-5`}>{curElem.Team2Id}</p>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};
export default PastMatchCard;
