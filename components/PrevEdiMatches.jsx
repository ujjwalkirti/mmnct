import Image from "next/image";
import React, { useEffect, useState } from "react";
import OngoingMatchCard from "./OngoingMatchCard";
import UpcomingMatchCard from "./UpcomingMatchCard";
import PastMatchCard from "./PrevYearPastMatchCard";
import { database, db } from "../components/db/Firebase";
import { ref, onValue } from "firebase/database";
import { getDocs, collection } from "firebase/firestore";

// const fetchCollectionData = async (collectionName) => {
//   try {
//     const querySnapshot = await getDocs(collection(db, collectionName));
//     const dataArray = [];

//     querySnapshot.forEach((doc) => {
//       dataArray.push(doc.data());
//     });

//     return dataArray;
//   } catch (error) {
//     console.error('Error fetching documents:', error);
//     return [];
//   }
// };
// export async function getServerSideProps() {

//   const querySnapshot = await getDocs(collection(db, "pastYearMatches"));
//       const dataArray = [];
  
//       querySnapshot.forEach((doc) => {
//         dataArray.push(doc.data());
//       });
  
     

//   return {
//     props: {
//       dataArray,
//     },
//   };
// }
// export async function getServerSideProps() {
//   const querySnapshot = await getDocs(collection(db, "pastYearMatches"));
//   let list = [];
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     // console.log(doc.id, " => ", doc.data());
//     list.push(doc.data());
//   });
//   return {
//     props: {
//       dataArray: list,
//     },
//   };
// }


export default function PrevEdMatch ({matchData})  {
 // console.log(matchData);

  const [selectedGender, setSelectedGender] = useState("male");
  const [selectedTime, setSelectedTime] = useState("present");
  
 
  

  const StylesBasedonGender = (gender) => {
    if (selectedGender === gender) {
      if (gender === "male") {
        return "bg-[#508CD4] font-[700] text-[20px] md:text-[39px] md:w-auto md:h-[71px] leading-[24.38px] text-white h-[51px] px-2 shadow-lg";
      } else if (gender === "female") {
        return "bg-[#CE3AB3] font-[700] text-[20px] md:text-[39px] md:w-auto md:h-[71px] leading-[24.38px] text-white h-[51px] px-2 shadow-lg";
      }
    } else {
      return "";
    }
  };

  const StylesBasedonTime = (gender, time) => {
    if (selectedGender === gender && selectedTime === time) {
      if (gender === "male") {
        return "bg-[#508CD4] font-[500] text-[20px] md:text-[32px] md:w-auto md:h-[71px] leading-[24.38px] text-white h-[51px] w-[124px] px-2 shadow-lg";
      } else if (gender === "female") {
        return "bg-[#CE3AB3] font-[500] text-[20px] md:text-[32px] md:w-auto md:h-[71px] leading-[24.38px] text-white h-[51px] w-[124px] px-2 shadow-lg";
      }
    } else {
      return "";
    }
  };
  function decisionsBasedonGender() {
    let finalDecision = "";
    if (selectedGender === "male") {
      finalDecision = "from-[#272CAA]";
    } else {
      finalDecision = "from-[#AA277E]";
    }

    return finalDecision;
  }
  
  // console.log(matchData)
  return (
    <>
      <div className={`bg-gradient-to-b ${decisionsBasedonGender()} to-white`} >
      {/*  */}
        <div className="md:hidden flex flex-col">
          <div className="flex flex-1 flex-col items-center">
            <div className="flex justify-center items-center mt-10">
              {/* buttons to switch between men and women team */}
              <div className="bg-white text-gray-500 flex justify-evenly w-[223px] mx-auto text-center font-[600] text-[16px] rounded-lg mb-10">
                {/* male button */}
                <div
                  onClick={() => {
                    setSelectedGender("male");
                  }}
                  className={` h-[44px] flex justify-center items-center cursor-pointer`}
                >
                  <p
                    className={`${StylesBasedonGender(
                      "male"
                    )} flex items-center rounded-lg`}
                  >
                    Men's
                  </p>
                </div>

                {/* women's button */}
                <div
                  onClick={() => {
                    setSelectedGender("female");
                  }}
                  className={` h-[44px] flex justify-center items-center cursor-pointer`}
                >
                  <p
                    className={`${StylesBasedonGender(
                      "female"
                    )} flex items-center rounded-lg`}
                  >
                    Women's
                  </p>
                </div>
              </div>
            </div>
            
            <div className="float-none flex flex-1 flex-col items-center w-full mt-8">
              <div className=" gap-3 flex flex-col w-full items-center">
                
                 {matchData.length!==0 && <PastMatchCard matchData={[matchData, selectedGender]} />}
               
              </div>
            </div>
          </div>
          <div className="flex justify-start items-start mt-20 ">
            {selectedGender === "male" ? (
              <Image
                src={`/vector-4.png`}
                alt="Picture of a batsman"
                height={400}
                width={300}
                className=" h-[591px] w-[591px]"
              />
            ) : (
              <Image
                src={`/vector-7.png`}
                alt="Picture of a batsman"
                height={400}
                width={300}
                className="h-[491px] w-[491px]"
              />
            )}
          </div>
        </div>

        {/* .
    .
    .
    .
    .
    .
    . */}

        {/* follwowing component will be shown only when screen size is 725px or higher */}
        <div className="hidden md:flex">
          <div className="w-2/5 flex justify-start items-start mt-20 ml-0">
            {selectedGender === "male" ? (
              <Image
                src={`/vector-4.png`}
                alt="Picture of a batsman"
                height={400}
                width={300}
                className=" h-[591px] w-[591px]"
              />
            ) : (
              <Image
                src={`/vector-7.png`}
                alt="Picture of a batsman"
                height={400}
                width={300}
                className="h-[491px] w-[491px]"
              />
            )}
          </div>
          <div className="flex flex-1 flex-col items-center">
            <div className="flex justify-center items-center mt-10">
              {/* buttons to switch between men and women team */}
              <div className="flex items-center justify-between bg-white text-gray-500 px-4 py-2 gap-2 text-center rounded-lg font-[600] text-[30px]">
                {/* male button */}
                <div
                  onClick={() => {
                    setSelectedGender("male");
                  }}
                  className={` h-[44px] flex justify-center items-center cursor-pointer`}
                >
                  <p
                    className={`${StylesBasedonGender(
                      "male"
                    )} flex items-center rounded-lg`}
                  >
                    Men's
                  </p>
                </div>

                {/* women's button */}
                <div
                  onClick={() => {
                    setSelectedGender("female");
                  }}
                  className={` h-[44px] flex justify-center items-center cursor-pointer`}
                >
                  <p
                    className={`${StylesBasedonGender(
                      "female"
                    )} flex items-center rounded-lg`}
                  >
                    Women's
                  </p>
                </div>
              </div>
            </div>
           
            <div className="float-none flex flex-1 flex-col items-center w-full mt-20">
              <div className=" gap-3 mr-4 flex flex-col w-full items-center">
                
              {matchData.length!==0 && <PastMatchCard matchData={[matchData, selectedGender]} />}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


