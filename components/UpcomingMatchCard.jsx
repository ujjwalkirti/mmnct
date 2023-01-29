import Image from "next/image";
import teams from "./teams";

const UpcomingMatchCard = (props) => {
  const teamStyle = "flex flex-col items-center gap-2 justify-center";
  const teamName = "font-extrabold text-lg md:text-lg";
  const shortformstyle = "h-[68px] md:h-[80px] rounded-full";
  console.log(props.matchdata);
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
          curElem.status !== "upcoming" ||
          curElem.category !== props.matchData[1]
        ) {
          return <></>;
        }
        return (
          <>
            <div className="flex flex-col bg-white md:justify-evenly lg:w-10/12 w-11/12 text-sm items-center justify-center shadow-lg pb-4 mx-4 rounded-lg">
             {curElem.tag === "" ? (
              	<div></div>
              ) : (<div className="border-[#7f1d1d] bg-[#fde047] flex flex-col items-center justify-center w-full px-3 lg:px-6 py-1.5 mb-3">
                <p className="text-[#7f1d1d] font-semibold w-fit px-1 flex-nowrap">
                  {curElem.tag}
                </p>
              </div>)}
              <div className="flex justify-evenly w-full pt-4">
                {" "}
                {/* team 1 */}
                <div className={teamStyle}>
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
                </div>
                <div>
                  {" "}
                  <Image src="/vector-8.png" height={80} width={80} />
                </div>
                {/* team 2 */}
                <div className={teamStyle}>
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
                </div>
              </div>
              {/* timing and date */}
              <div className="flex flex-col items-center justify-center w-fit px-3 lg:px-6">
                <p className="text-black-400 w-fit px-1 flex-nowrap">
                  {curElem.finalComment}
                </p>
                <p className="text-black-400 w-fit px-1 flex-nowrap">
                  <sup>{curElem.timeDate}</sup>
                </p>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};
export default UpcomingMatchCard;
