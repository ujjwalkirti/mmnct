import Image from "next/image";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PointCard from "/components/PointCard";
import PointCardElimination from "/components/PointCardElimination";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../components/db/Firebase";

export async function getServerSideProps() {
  const querySnapshot = await getDocs(
    query(collection(db, "participating-teams"), orderBy("pointselimination", "desc"))
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
  const [selectedGender, setSelectedGender] = useState("male");
  const [selectedPool, setSelectedPool] = useState("pool1");
  const [selectedType, setSelectedType] = useState("flb");
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


const StylesBasedonPool = (gender, pool) => {
    if (selectedGender === gender && selectedPool === pool) {
     
      if (gender === "male") {
        return "bg-[#508CD4] font-[500] text-[20px] h-[50px] md:text-[30px] md:h-[50px] leading-[24.38px] text-white px-2 shadow-lg whitespace-nowrap w-fit";
      } else if (gender === "female") {
        return "bg-[#CE3AB3] font-[500] text-[20px] h-[50px] md:text-[30px] md:h-[50px] leading-[24.38px] text-white px-3 shadow-lg whitespace-nowrap w-fit";
      }
    } else {
      return "";
    }
  };

const StylesBasedonType = (gender, type) => {
      if (selectedGender === gender && selectedType === type) {
     
      if (gender === "male") {
        return "bg-[#508CD4] font-[500] text-[20px] h-[50px] md:text-[30px] md:h-[50px] leading-[24.38px] text-white px-2 shadow-lg whitespace-nowrap w-fit";
      } else if (gender === "female") {
        return "bg-[#CE3AB3] font-[500] text-[20px] h-[50px] md:text-[30px] md:h-[50px] leading-[24.38px] text-white px-3 shadow-lg whitespace-nowrap w-fit";
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
      <Head>
        <title>Points Table</title>
      </Head>
      <Navbar />
      <div className={`bg-gradient-to-b ${decisionsBasedonGender()} to-white`}>
        <div className="md:hidden pt-10">
          <div className="bg-white text-gray-500 flex justify-evenly w-[223px] mx-auto text-center font-[600] text-[16px] rounded-lg mb-10">
            <div
              onClick={() => {
                setSelectedGender("male");
                setSelectedPool("pool1");
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
                setSelectedPool("pool1");
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

	   <div className="bg-white text-gray-500 flex justify-evenly w-[323px] mx-auto text-center font-[600] text-[16px] rounded-lg mb-10">
			<div onClick={() => {
                  setSelectedType("gs");
                }} className={` h-[44px] flex justify-center items-center cursor-pointer px-3`} id="pool1"><p className={`${StylesBasedonType(
                      selectedGender,
                      "gs"
                    )} flex items-center rounded-lg`}>Group Stage</p></div>
                    <div onClick={() => {
                  setSelectedType("flb");
                }} className={` h-[44px] flex justify-center items-center cursor-pointer px-3`} id="pool1"><p className={`${StylesBasedonType(
                      selectedGender,
                      "flb"
                    )} flex items-center rounded-lg`}>Playoff</p></div>
            </div>
          
          {selectedType === "gs"? (
          <div>
          {selectedGender === "male" ? (

            <div className="bg-white text-gray-500 flex justify-evenly w-[323px] mx-auto text-center font-[600] text-[16px] rounded-lg mb-10 px-2">
              <div onClick={() => {
                setSelectedPool("pool1");
              }} className={` h-[44px] flex justify-center items-center cursor-pointer `} id="pool1"><p className={`${StylesBasedonPool(
                selectedGender,
                "pool1"
              )} text-[15px] flex items-center justify-center w-fit rounded-lg`}>Pool A</p></div>


              <div onClick={() => {
                setSelectedPool("pool2");
              }} className={` h-[44px] flex justify-center items-center cursor-pointer`} id="pool1"><p className={`${StylesBasedonPool(
                selectedGender,
                "pool2"
              )} text-[15px] flex items-center justify-center w-fit rounded-lg`}>Pool B</p></div>


              <div onClick={() => {
                setSelectedPool("pool3");
              }} className={` h-[44px] flex justify-center items-center cursor-pointer `} id="pool1"><p className={`${StylesBasedonPool(
                selectedGender,
                "pool3"
              )} text-[15px] flex items-center justify-center w-fit rounded-lg`}>Pool C</p></div>


              <div onClick={() => {
                setSelectedPool("pool4");
              }} className={` h-[44px] flex justify-center items-center cursor-pointer `} id="pool1"><p className={`${StylesBasedonPool(
                selectedGender,
                "pool4"
              )} text-[15px] flex items-center justify-center w-fit rounded-lg`}>Pool D</p></div>



              <div onClick={() => {
                setSelectedPool("pool5");
              }} className={` h-[44px] flex justify-center items-center cursor-pointer `} id="pool1"><p className={`${StylesBasedonPool(
                selectedGender,
                "pool5"
              )} text-[15px] flex items-center justify-center w-fit rounded-lg`}>Pool E</p></div>

            </div>



          ) : (
            <div className="bg-white text-gray-500 flex justify-evenly w-[183px] mx-auto text-center font-[600] text-[16px] rounded-lg mb-10">
              <div onClick={() => {
                setSelectedPool("pool1");
              }} className={` h-[44px] flex justify-center items-center cursor-pointer `} id="pool1"><p className={`${StylesBasedonPool(
                selectedGender,
                "pool1"
              )} flex items-center justify-center w-fit rounded-lg`}>Pool A</p></div>


              <div onClick={() => {
                setSelectedPool("pool2");
              }} className={` h-[44px] flex justify-center items-center cursor-pointer`} id="pool1"><p className={`${StylesBasedonPool(
                selectedGender,
                "pool2"
              )} flex items-center justify-center w-fit rounded-lg`}>Pool B</p></div>



            </div>

          )}
	  </div>) : (<div></div>)}
	  
	  
          <div className="relative h-[540px] overflow-x-hidden mx-auto px-4">
            <div className="grid grid-cols-1 gap-2 mx-auto max-w-lg">
              
              
             {selectedType === "gs"? (
                <div>
                <div className="flex text-sm text-white leading-7">
                <div className="w-1/4 flex  items-center justify-center ">
                  <p className="">NRR</p>
                </div>
                <div className="w-2/3 flex  items-center justify-center ">
                  <p className="">Team</p>
                </div>
                <div className="w-1/4 flex  items-center justify-center ">
                  <p>Points</p>
                </div>
                <div className="w-1/4 flex  items-center justify-center pl-2">
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
                  <PointCard data={[maleTable, selectedGender, selectedPool]} />
                ) : (
                  <PointCard data={[femaleTable, selectedGender, selectedPool]} />
                )}
                </div>) : (
                <div>
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
                <div className="w-1/4 flex  items-center justify-center pl-2">
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
                  <PointCardElimination data={[maleTable, selectedGender, "yes"]} />
                ) : (
                  <PointCardElimination data={[femaleTable, selectedGender, "yes"]} />
                )}
                </div>
                )}
            </div>


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
          <div className="flex-1 ">
            <div className="flex justify-center items-center mt-10">
              {/* buttons to switch between men and women team */}
              <div className="flex items-center justify-between mr-10 bg-white text-gray-500 px-4 py-2 gap-2 text-center rounded-lg font-[600] text-[30px]">
                {/* male button */}
                <div
                  onClick={() => {
                    setSelectedGender("male");
                    setSelectedPool("pool1");
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
                    setSelectedPool("pool1");
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
	     <div className="flex w-fit mx-auto items-center justify-between bg-white text-gray-500 px-4 gap-3 text-center rounded-lg font-[500] text-[20px] mt-10">
			<div onClick={() => {
                  setSelectedType("gs");
                }} className={` h-[44px] flex justify-center items-center cursor-pointer px-3`} id="pool1"><p className={`${StylesBasedonType(
                      selectedGender,
                      "gs"
                    )} flex items-center rounded-lg`}>Group Stage</p></div>
                    <div onClick={() => {
                  setSelectedType("flb");
                }} className={` h-[44px] flex justify-center items-center cursor-pointer px-3`} id="pool1"><p className={`${StylesBasedonType(
                      selectedGender,
                      "flb"
                    )} flex items-center rounded-lg`}>Playoff</p></div>
            </div>
            
            
            {selectedType === "gs"? (
            <div>
            {selectedGender === "male" ? (


              <div className="flex w-fit mx-auto items-center justify-between bg-white text-gray-500 px-4 gap-3 text-center rounded-lg font-[500] text-[20px] mt-10">
                <div onClick={() => {
                  setSelectedPool("pool1");
                }} className={` h-[44px] flex justify-center items-center cursor-pointer px-3`} id="pool1"><p className={`${StylesBasedonPool(
                  selectedGender,
                  "pool1"
                )} flex items-center rounded-lg`}>Pool A</p></div>


                <div onClick={() => {
                  setSelectedPool("pool2");
                }} className={` h-[44px] flex justify-center items-center cursor-pointer px-3`} id="pool1"><p className={`${StylesBasedonPool(
                  selectedGender,
                  "pool2"
                )} flex items-center rounded-lg`}>Pool B</p></div>


                <div onClick={() => {
                  setSelectedPool("pool3");
                }} className={` h-[44px] flex justify-center items-center cursor-pointer px-3`} id="pool1"><p className={`${StylesBasedonPool(
                  selectedGender,
                  "pool3"
                )} flex items-center rounded-lg`}>Pool C</p></div>


                <div onClick={() => {
                  setSelectedPool("pool4");
                }} className={` h-[44px] flex justify-center items-center cursor-pointer px-3`} id="pool1"><p className={`${StylesBasedonPool(
                  selectedGender,
                  "pool4"
                )} flex items-center rounded-lg`}>Pool D</p></div>



                <div onClick={() => {
                  setSelectedPool("pool5");
                }} className={` h-[44px] flex justify-center items-center cursor-pointer px-3`} id="pool1"><p className={`${StylesBasedonPool(
                  selectedGender,
                  "pool5"
                )} flex items-center rounded-lg`}>Pool E</p></div>

              </div>




            ) : (
              <div className="flex w-fit mx-auto items-center justify-between bg-white text-gray-500 px-4 gap-3 text-center rounded-lg font-[500] text-[20px] mt-10">
                <div onClick={() => {
                  setSelectedPool("pool1");
                }} className={` h-[44px] flex justify-center items-center cursor-pointer px-3`} id="pool1"><p className={`${StylesBasedonPool(
                  selectedGender,
                  "pool1"
                )} flex items-center rounded-lg`}>Pool A</p></div>


                <div onClick={() => {
                  setSelectedPool("pool2");
                }} className={` h-[44px] flex justify-center items-center cursor-pointer px-3`} id="pool1"><p className={`${StylesBasedonPool(
                  selectedGender,
                  "pool2"
                )} flex items-center rounded-lg`}>Pool B</p></div>
              </div>
            )}
           </div>
           ) : ( <div></div> )}
            <div className="float-none mt-20">
              <div className="grid gap-3 mx-10 grid-cols-1 md:mx-10 lg:mx-20 xl:mx-40">
                
                
                {selectedType === "gs"? (
                <div>
                
                <div className="flex text-sm text-white leading-7">
                  <div className="w-1/4 flex  items-center justify-center ">
                    <p className="">NRR</p>
                  </div>
                  <div className="w-2/3 flex  items-center  pl-20">
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
                  <PointCard data={[maleTable, selectedGender, selectedPool]} />
                ) : (
                  <PointCard data={[femaleTable, selectedGender, selectedPool]} />
                )}
                </div>) : (
                <div>
                <div className="flex text-sm text-white leading-7">
                  <div className="w-1/4 flex  items-center justify-center ">
                    <p className="">Rank</p>
                  </div>
                  <div className="w-2/3 flex  items-center  pl-20">
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
                  <PointCardElimination data={[maleTable, selectedGender, "yes"]} />
                ) : (
                  <PointCardElimination data={[femaleTable, selectedGender, "yes"]} />
                )}
                </div>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
