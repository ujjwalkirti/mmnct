import Image from "next/image";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PointCard from "/components/PointCard";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../components/db/Firebase";

export async function getServerSideProps() {
  const querySnapshot = await getDocs(
    query(collection(db, "participating-teams"), orderBy("points", "desc"))
  );
  const maleTable = [];
  const femaleTable = [];
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    if (data.teamGender == "Male") {
      maleTable.push(data);
    } else {
      femaleTable.push(data);
    }
  });
  return {
    props: {
      maleTable,
      femaleTable,
    },
  };
}

export default function PointsTable({ maleTable, femaleTable }) {
  console.log("male", maleTable);
  console.log("i", femaleTable);
  const [selectedGender, setSelectedGender] = useState("male");
  const StylesBasedonGender = (gender) => {
    if (selectedGender === gender) {
      if (gender === "male") {
        return "bg-[#508CD4] font-[700] text-[20px] md:text-[39px] md:w-auto md:h-[71px] leading-[24.38px] text-white h-[51px] w-[103px] px-2 shadow-lg";
      } else if (gender === "female") {
        return "bg-[#CE3AB3] font-[700] text-[20px] md:text-[39px] md:w-auto md:h-[71px] leading-[24.38px] text-white h-[51px] w-[124px] px-2 shadow-lg";
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

  return (
    <>
      <Navbar />
      <div className={`bg-gradient-to-b ${decisionsBasedonGender()} to-white`}>
        <div className="md:hidden pt-10">
          <div className="bg-white text-gray-500 flex justify-evenly w-[223px] mx-auto text-center font-[600] text-[16px] rounded-lg mb-10">
            <div
              onClick={() => {
                setSelectedGender("male");
              }}
              className={`cursor-pointer h-[44px] flex justify-center items-center`}
            >
              <p
                className={`${StylesBasedonGender(
                  "male"
                )} flex items-center  justify-center rounded-lg`}
              >
                Men's
              </p>
            </div>
            <div
              onClick={() => {
                setSelectedGender("female");
              }}
              className={`cursor-pointer h-[44px] flex justify-center items-center`}
            >
              <p
                className={`${StylesBasedonGender(
                  "female"
                )} flex items-center  justify-center rounded-lg`}
              >
                Women's
              </p>
            </div>
          </div>

          <div className="relative h-[540px] overflow-x-hidden mx-auto px-4">
            <div className="grid grid-cols-1 gap-2 mx-auto max-w-lg">
              <div className="flex text-sm text-white leading-7">
                <div className="w-1/4 flex  items-center justify-center ">
                  <p className="">Rank</p>
                </div>
                <div className="w-2/3 flex  items-center justify-center ">
                  <p className="">Team</p>
                </div>
                <div className="w-1/4 flex  items-center justify-center ">
                  <p>Points</p>
                </div>
                <div className="w-1/4 flex  items-center justify-center ">
                  <p>Played</p>
                </div>
                <div className="w-1/4 flex items-center justify-center ">
                  <p>Won</p>
                </div>
                <div className="w-1/4 flex  items-center justify-center ">
                  <p className="">Lost</p>
                </div>
              </div>
              <div className="h-px bg-white"></div>
              {selectedGender === "male" ? (
                <PointCard data={[maleTable, selectedGender]} />
              ) : (
                <PointCard data={[femaleTable, selectedGender]} />
              )}
            </div>

            {selectedGender === "male" ? (
              <Image
                src={`/vector-4.png`}
                alt="Picture of a batsman"
                height={400}
                width={300}
                className="mx-auto bottom-0 h-[382px] w-[382px] left-[52px]"
              />
            ) : (
              <Image
                src={`/vector-7.png`}
                alt="Picture of a batsman"
                height={400}
                width={300}
                className="mx-auto bottom-0 h-[291px] w-[291px] left-[82px]"
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
          <div className="flex-1 ">
            <div className="flex justify-center items-center mt-10">
              {/* buttons to switch between men and women team */}
              <div className="flex items-center justify-between mr-10 bg-white text-gray-500 px-4 py-2 gap-2 text-center rounded-lg font-[600] text-[30px]">
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
            <div className="float-none mt-20">
              <div className="grid gap-3 mr-24 grid-cols-1 ">
              <div className="flex text-sm text-white leading-7">
                <div className="w-1/4 flex  items-center justify-center ">
                  <p className="">Rank</p>
                </div>
                <div className="w-2/3 flex  items-center justify-center ">
                  <p className="">Team</p>
                </div>
                <div className="w-1/4 flex  items-center justify-center ">
                  <p>Points</p>
                </div>
                <div className="w-1/4 flex  items-center justify-center ">
                  <p>Played</p>
                </div>
                <div className="w-1/4 flex items-center justify-center ">
                  <p>Won</p>
                </div>
                <div className="w-1/4 flex  items-center justify-center ">
                  <p className="">Lost</p>
                </div>
              </div>
              <div className="h-px bg-white"></div>
                {selectedGender === "male" ? (
                  <PointCard data={[maleTable, selectedGender]} />
                ) : (
                  <PointCard data={[femaleTable, selectedGender]} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
