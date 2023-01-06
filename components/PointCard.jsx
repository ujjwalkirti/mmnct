import { useState, useEffect } from "react";
import Link from "next/link";
import { ImCircleRight } from "react-icons/im";
import ReactPaginate from "react-paginate";

const PointCard = (props) => {
  const teamStyle = "flex items-center justify-center";
  const teamName = "font-extrabold text-lg";
  const shortformstyle = "h-[48px] md:h-[60px]";
  //========================================================
   if (!props.data[0]) {
    return <></>;
  }
 
  
    return (
      <>
         {props.data[0].map((curElem, index) => {
        if (props.data[1] === "male" && curElem.teamGender === "Male") {
              return (
                <div
                  key={index + 1}
                  className="flex flex-row md:flex-row pt-5 pb-5  justify-center md:justify-evenly items-center my-2 bg-white w-full lg:w-full  min-h-79 lg:h-[90px] xl:h-[150px] rounded-[8px] mx-auto shadow-lg "
                >
                  <div className="w-1/4 flex  items-center justify-center">
                    <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                      {index + 1}
                    </p>
                  </div>
                  <div className="w-2/3 flex  items-center flex-wrap md:flex-nowrap justify-start flex-col sm:flex-row text-center">
                    <img
                      alt="team-logo"
                      className={shortformstyle}
                      src="https://mir-s3-cdn-cf.behance.net/projects/404/168243107813919.Y3JvcCwzMDAwLDIzNDYsMCw0MjM.jpg"
                    />
                    <div className="flex flex-1 flex-col items-strat justify-center">
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
                      {curElem.points}
                    </p>
                  </div>
                  <div className="w-1/4 flex  items-center justify-center">
                    <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                      {curElem.matchPlayed}
                    </p>
                  </div>
                  <div className="w-1/4 flex  items-center justify-center">
                    <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                      {curElem.matchWon}
                    </p>
                  </div>
                  <div className="w-1/4 flex  items-center justify-center">
                    <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                      {curElem.matchPlayed - curElem.matchWon}
                    </p>
                  </div>
                </div>
              );
            } else if (
              props.data[1] === "female" &&
              curElem.teamGender === "Female"
            ) {
              return (
                <div
                  key={index + 1}
                  className="flex flex-row md:flex-row pt-5 pb-5  justify-center md:justify-evenly items-center my-2 bg-white w-full lg:w-full  min-h-79 lg:h-[90px] xl:h-[150px] rounded-[8px] mx-auto shadow-lg "
                >
                  <div className="w-1/4 flex  items-center justify-center">
                    <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                      {index + 1}
                    </p>
                  </div>
                  <div className="w-2/3 flex  items-center flex-wrap md:flex-nowrap justify-start flex-col sm:flex-row">
                    <img
                      alt="team-logo"
                      className={shortformstyle}
                      src="https://mir-s3-cdn-cf.behance.net/projects/404/168243107813919.Y3JvcCwzMDAwLDIzNDYsMCw0MjM.jpg"
                    />
                    <div className="flex flex-1 flex-col items-strat justify-center">
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
                      {curElem.points}
                    </p>
                  </div>
                  <div className="w-1/4 flex  items-center justify-center">
                    <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                      {curElem.matchPlayed}
                    </p>
                  </div>
                  <div className="w-1/4 flex  items-center justify-center">
                    <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                      {curElem.matchWon}
                    </p>
                  </div>
                  <div className="w-1/4 flex  items-center justify-center">
                    <p className="text-[15px] xl:text-[25px] lg:text-[20px] font-[600]">
                      {curElem.matchPlayed - curElem.matchWon}
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
