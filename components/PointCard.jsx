import Link from "next/link";
import { ImCircleRight } from "react-icons/im";

const PointCard = (props) => {
  const teamStyle = "flex items-center justify-center";
  const teamName = "font-extrabold text-lg";
  const shortformstyle = "h-[48px] md:h-[60px] rounded-full";
  //console.log(props.data[0]);
  if (!props.data[0]) {

    return <></>;
  }
  var ind = 0;
  return (
    <>
      {props.data[0].map((curElem, index) => {
        curElem.teamLogo = (curElem.teamLogo.length ? curElem.teamLogo : "https://mir-s3-cdn-cf.behance.net/projects/404/168243107813919.Y3JvcCwzMDAwLDIzNDYsMCw0MjM.jpg");
        if (props.data[1] === "male" && curElem.teamGender === "Male" && curElem.pool === props.data[2]) {
          ind = ind + 1;
          const runRate = curElem.runRate || [];
          const superOver = curElem.superOver  || 0;
          const noOfMatchWon = runRate.filter(val => val > 0).length;
          const bonus = curElem.bonus||0;
          const noOfMatchPlayed =runRate.length;



          const arrSum = runRate.reduce((acc, val) => acc + val, 0);

          // Calculate the average
          const netRunRate =noOfMatchPlayed > 0 ?( arrSum / noOfMatchPlayed).toFixed(2) : "0.00";
        //console.log(noOfMatchPlayed + " "+bonus+" "+noOfMatchWon);

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
                  {/* {curElem.points} */}
                 {noOfMatchWon*2+superOver*2+bonus}
                </p>
              </div>
              <div className="w-1/4 flex  items-center justify-center">
                <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                  {/* {curElem.matchPlayed} */}
                  {noOfMatchPlayed}
                </p>
              </div>
              <div className="w-1/4 flex  items-center justify-center">
                <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                  {noOfMatchWon + superOver}
                </p>
              </div>
              <div className="w-1/4 flex  items-center justify-center">
                <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                  {noOfMatchPlayed - (noOfMatchWon +superOver)}
                </p>
              </div>
              <div className="w-1/4 flex  items-center justify-center">
                <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                  {netRunRate}
                </p>
              </div>
            </div>
          );
        } else if (
          props.data[1] === "female" &&
          curElem.teamGender === "Female" && props.data[2] === curElem.pool
        ) {
          ind = ind + 1;
          const runRate = curElem.runRate || [];
          const superOver = curElem.superOver  || 0;
          const noOfMatchWon = runRate.filter(val => val > 0).length;
          //const bonus = runRate.filter(val => val >= 1.25).length;
          const bonus=curElem.bonus||0;
          //console.log(bonus);
          const noOfMatchPlayed =runRate.length;
          const arrSum = runRate.reduce((acc, val) => acc + val, 0);
          const netRunRate =noOfMatchPlayed > 0 ?( arrSum / noOfMatchPlayed).toFixed(2) : "0.00";
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
                {noOfMatchWon*2+superOver*2+bonus}
                </p>
              </div>
              <div className="w-1/4 flex  items-center justify-center">
                <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                  {/* {curElem.matchPlayed} */}
                  {noOfMatchPlayed}
                </p>
              </div>
              <div className="w-1/4 flex  items-center justify-center">
                <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                  {/* {curElem.matchWon} */}
                  {noOfMatchWon + superOver}
                </p>
              </div>
              <div className="w-1/4 flex  items-center justify-center">
                <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                  {/* {curElem.matchPlayed - curElem.matchWon} */}
                  {noOfMatchPlayed - (noOfMatchPlayed +superOver)}
                </p>
              </div>
              <div className="w-1/4 flex  items-center justify-center">
                <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                   {netRunRate}
                </p>
              </div>
            </div>
          );
        }
      })}
    </>
  );
};
export default PointCard;
