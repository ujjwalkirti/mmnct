import Link from "next/link";
import { ImCircleRight } from "react-icons/im";

const PointCardElimination = (props) => {
  const teamStyle = "flex items-center justify-center";
  const teamName = "font-extrabold text-lg";
  const shortformstyle = "h-[48px] md:h-[60px] rounded-full";
  if (!props.data[0]) {
    return <></>;
  }
  var ind = 0;
  return (
    <>
      {props.data[0].map((curElem, index) => {
        curElem.teamLogo = (curElem.teamLogo.length ? curElem.teamLogo : "https://mir-s3-cdn-cf.behance.net/projects/404/168243107813919.Y3JvcCwzMDAwLDIzNDYsMCw0MjM.jpg");
        if (props.data[1] === "male" && curElem.teamGender === "Male" && curElem.qualified === props.data[2]) {
          ind = ind + 1;
          return (
            <div className="flex flex-row md:flex-row pt-5 pb-5  justify-center md:justify-evenly items-center my-2 bg-white w-full lg:w-full  min-h-79 lg:h-[90px] xl:h-[150px] rounded-[8px] mx-auto shadow-lg ">
              <div className="w-1/4 flex  items-center justify-center">
                <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                  {ind}
                </p>
              </div>
              <div className="w-2/3 flex  items-center flex-col md:flex-row">
                <img
                  alt="team-logo"
                  className={shortformstyle}
                  style={{ backgroundColor: curElem.themeColor }}
                  src={curElem.teamLogo}
                />
                <div className="flex flex-1 flex-col items-strat justify-center ml-2">
                  <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                    {curElem.teamName}
                  </p>
                  <p className="text-[15px] hidden lg:flex text-gray-600 font-[600]">
                    {curElem.teamType}
                  </p>
                </div>
              </div>
              <div className="w-1/4 flex  items-center justify-center">
                <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                  {curElem.pointselimination}
                </p>
              </div>
              <div className="w-1/4 flex  items-center justify-center">
                <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                  {curElem.matcheliminationPlayed}
                </p>
              </div>
              <div className="w-1/4 flex  items-center justify-center">
                <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                  {curElem.matcheliminationWon}
                </p>
              </div>
              <div className="w-1/4 flex  items-center justify-center">
                <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                  {curElem.matcheliminationPlayed - curElem.matcheliminationWon}
                </p>
              </div>
            </div>
          );
        } else if (
          props.data[1] === "female" &&
          curElem.teamGender === "Female" && props.data[2] === curElem.qualified
        ) {
          ind = ind + 1;
          return (
            <div className="flex flex-row md:flex-row pt-5 pb-5  justify-center md:justify-evenly items-center my-2 bg-white w-full lg:w-full  min-h-79 lg:h-[90px] xl:h-[150px] rounded-[8px] mx-auto shadow-lg">
              <div className="w-1/4 flex  items-center justify-center">
                <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                  {ind}
                </p>
              </div>
              <div className="w-2/3 flex  items-center flex-col md:flex-row">
                <img
                  alt="team-logo"
                  className={shortformstyle}
                  style={{ backgroundColor: curElem.themeColor }}
                  src={curElem.teamLogo}
                />
                <div className="flex flex-1 flex-col items-strat justify-center ml-2">
                  <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                    {curElem.teamName}
                  </p>
                  <p className="text-[15px] hidden lg:flex text-gray-600 font-[600]">
                    {curElem.teamType}
                  </p>

                </div>
              </div>
              <div className="w-1/4 flex  items-center justify-center">
                <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                  {curElem.pointselimination}
                </p>
              </div>
              <div className="w-1/4 flex  items-center justify-center">
                <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                  {curElem.matcheliminationPlayed}
                </p>
              </div>
              <div className="w-1/4 flex  items-center justify-center">
                <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                  {curElem.matcheliminationWon}
                </p>
              </div>
              <div className="w-1/4 flex  items-center justify-center">
                <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                  {curElem.matcheliminationPlayed - curElem.matcheliminationWon}
                </p>
              </div>
            </div>
          );
        }
      })}
    </>
  );
};
export default PointCardElimination;
