import Link from "next/link";
import { ImCircleRight } from "react-icons/im";
import  { db }  from "./db/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const UpcomingMatchCard = (props) => {
  const getimageURL = async (teamName) => {
    const q = query(collection(db, "participating-teams"), where("teamName", "==", teamName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc,index) => {
      console.log(index,"=",doc.data())
      if (doc.data().teamLogo.length < 1) 
      return ["https://mir-s3-cdn-cf.behance.net/projects/404/168243107813919.Y3JvcCwzMDAwLDIzNDYsMCw0MjM.jpg",""];
      return [doc.data().teamLogo, doc.data().themeColor];
    });
  }
  const teamStyle = "flex flex-1 items-center justify-center flex-wrap flex-row";
  const teamName = "font-extrabold text-xs md:text-lg";
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
            <div className="flex bg-white md:justify-evenly flex-1 text-sm items-center justify-center shadow-lg py-4 mx-4 rounded-lg">
              {/* team 1 */}
              <div className={teamStyle}>
                <img
                  alt="team-logo"
                  className="team-logo"
                  src={getimageURL(curElem?.Team1Id)[0]}
                />
                <p className={teamName}>{curElem.Team1Id}</p>
              </div>


              {/* timing and date */}
              <div className="flex flex-col items-center justify-center px-5">
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
                  src={getimageURL(curElem.Team2Id)[0]}
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
