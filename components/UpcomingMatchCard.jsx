import Link from "next/link";
import { ImCircleRight } from "react-icons/im";

const UpcomingMatchCard = (props) => {
  const teamStyle = "flex items-center justify-center";
  const teamName = "font-extrabold text-lg";
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
  console.log(matchData);
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
            <div className="flex bg-white md:justify-evenly md:w-4/5 md:mx-auto text-sm items-center justify-center shadow-lg py-4 mx-4 rounded-lg">
              {/* team 1 */}
              <div className={teamStyle}>
                <p className={teamName}>{curElem.Team1Id}</p>
                <img
                  alt="team-logo"
                  className="team-logo"
                  src="https://mir-s3-cdn-cf.behance.net/projects/404/168243107813919.Y3JvcCwzMDAwLDIzNDYsMCw0MjM.jpg"
                />
              </div>


              {/* timing and date */}
              <div className="flex flex-col items-center justify-center px-2.5">
                <p className="text-gray-400">{curElem.finalComment}</p>
                <p className="text-orange-500 font-bold">{curElem.timeDate.split("T")[1]}</p>
                <p className="text-gray-400">
                  <sup>{curElem.timeDate.split("T")[0]}</sup>
                </p>
              </div>


              {/* team 2 */}
              <div className={teamStyle}>
                <img
                  alt="team-logo"
                  className="team-logo"
                  src="https://mir-s3-cdn-cf.behance.net/projects/404/168243107813919.Y3JvcCwzMDAwLDIzNDYsMCw0MjM.jpg"
                />
                <p className={teamName}>{curElem.Team2Id}</p>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};
export default UpcomingMatchCard;
