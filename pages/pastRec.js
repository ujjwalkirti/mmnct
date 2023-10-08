import Image from "next/image";
import React, { useEffect, useState } from "react";
import { db, dbRef, storage } from "../components/db/Firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import Link from "next/link";
import { child, get } from "firebase/database";
import PrevYearMatchCard from "../components/PrevYearMatchCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import PastMatchCard from "../components/PrevYearPastMatchCard";
// import ParticipatingTeams from "../components/PrevSquads";
import PrevEdMatch from "../components/PrevEdiMatches";
import DeveloperComponent from "../components/Developers";
export async function getServerSideProps() {
  let data = [];

  let querySnapshot = await getDocs(collection(db, "participating-teams"));
  querySnapshot.forEach((doc) => {
    let temp = doc.data();
    temp.id = doc.id;
    data.push(temp);
  });

   querySnapshot = await getDocs(collection(db, "pastYearMatches"));
  let list = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    list.push(doc.data());
  });
  list.sort((a, b) => b.MatchNo - a.MatchNo);
  // console.log(list);

  let organizers=[];
   
  // const Snapshot = await getDocs(
  //   query(collection(db, "team"), orderBy("name", "desc"))
  // );
  // Snapshot.forEach((doc) => {
  //   let data = doc.data();
  //   if (data.position == "developer" && data.edition == "16" ) {
  //     organizers.push(data);
  //   }
  // });
   querySnapshot = await getDocs(
    query(collection(db, "team"), orderBy("name", "desc"))
  );
  let coordinators = [];
  let developers = [];
  let designers = [];
  let content_creators = [];
  let in_house = [];

  querySnapshot.forEach((doc) => {
    let data = doc.data();
    if (data.position == "coordinator" && data.edition == "16") {
      coordinators.push(data);
    } else if (data.position == "developer" && data.edition == "16") {
      developers.push(data);
    } else if (data.position == "designer" && data.edition == "16") {
      designers.push(data);
    } else if (data.position == "content writer" && data.edition == "16" ) {
      content_creators.push(data);
    } else if (data.position == "Infra and In-House" && data.edition == "16" ){
      in_house.push(data);
    }
  });
  return {
    props: {
      teamList: data,
      matchData:list,
      coordinators,
      developers,
      designers,
      content_creators,
      in_house
    },
  };
}
function decideWinner(maleWinnerTeamCode, FemaleWinnerTeamCode, teamList) {
  let dataToBeReturned = [];
  teamList.map((team) => {
    if (team.teamCode === maleWinnerTeamCode) {
      dataToBeReturned[0] = team;
    } else if (team.teamCode === FemaleWinnerTeamCode) {
      dataToBeReturned[1] = team;
    }
  });
  return dataToBeReturned;
}



const PastRec=({teamList, matchData,coordinators,
  developers,
  designers,
  content_creators,
  in_house})=>{

  
  const [winnerTeamList, setWinnerTeamList] = useState([]);
  useEffect(() => {
    
    setWinnerTeamList(() => decideWinner("SHM", "SAM", teamList));
  }, []);

  const [selectedChoice, setSelectedChoice] = useState("squads");
  const [edition, setEdition] = useState("16");
  const [selectedGender, setSelectedGender] = useState("male");
  const StylesBasedonChoice = (choice) => {
    if (selectedChoice === choice) {
      if (selectedGender === "male") {
        return "bg-[#508CD4] font-[700] text-[25px] md:text-[39px] md:w-auto md:h-[71px] leading-[24.38px] text-white h-[70px] w-[103px] px-2 shadow-lg";
      } else  {
        return "bg-[#CE3AB3] font-[700] text-[25px] md:text-[39px] md:w-auto md:h-[71px] leading-[24.38px] text-white h-[70px] w-[124px] px-2 shadow-lg";
      }
    } else {
      return "";
    }
  };
  function bgDecider() {
    let finalDecision = "";
    if (selectedGender === "male") {
      finalDecision = "from-[#272CAA]";
    } else {
      finalDecision = "from-[#AA277E]";
    }

    return finalDecision;
  }
  const ParticipatingTeams = ({ teamList, edition }) => {
    
    const [page, setPage] = useState(1);
    const [range, setRange] = useState({ start: 0, end: 5 });
    const [totalPages, setTotalPages] = useState(0);
    const [maleTeams, setMaleTeams] = useState([]);
    const [femaleTeams, setFemaleTeams] = useState([]);
    
    const maleColor = "#508CD4";
    const femaleColor = "#CE3AB3";
  
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
  
    function divisionOfTeamsbasedonGender() {
      let localMaleTeams = [];
      let localFemaleTeams = [];
      teamList?.map((team) => {
        if (team.teamGender.toLowerCase() === "male") {
          localMaleTeams.push(team);
        } else {
          localFemaleTeams.push(team);
        }
      });
      setMaleTeams(localMaleTeams);
      setFemaleTeams(localFemaleTeams);
    }
  
    useEffect(() => {
      setRange({ start: 5 * (page - 1), end: 5 * page });
    }, [page]);
  
    useEffect(() => {
      divisionOfTeamsbasedonGender();
    }, [teamList]);
  
    useEffect(() => {
      let maleCount = maleTeams.length;
  
      let pages = Math.ceil(maleCount / 5);
  
      setTotalPages(pages);
    }, [maleTeams]);
  
    function colorDeciderForRange(buttonType) {
      if (buttonType === "previous") {
        if (page === 1) {
          return "text-[#E0E0E0] text-3xl lg:text-5xl cursor-pointer";
        } else {
          return "text-[#4675B5] text-5xl lg:text-7xl cursor-pointer";
        }
      } else {
        if (page === totalPages) {
          return "text-[#E0E0E0] text-3xl lg:text-5xl cursor-pointer";
        } else {
          return "text-[#4675B5] text-5xl lg:text-7xl cursor-pointer";
        }
      }
    }
  
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
      <div className={``} >
      {/* bg-gradient-to-b ${decisionsBasedonGender()} to-white */}
      <p className="font-[800] text-[28px] leading-[34.13px] text-[#FFFDFA] text-center  pt-10 mb-3">
         
            
          </p>
         
        <div className="md:hidden">
          
          <div className="bg-white text-gray-500 flex justify-evenly w-[223px] mx-auto text-center font-[600] text-[16px] rounded-lg mb-6">
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
          <p className="text-center text-[16px] text-white mb-4">
            Tap on the Teams to know more.
          </p>
          <div className="relative h-[740px] overflow-x-hidden mx-auto">
            {selectedGender === "male" ? (
              <div className="grid grid-cols-2 gap-2 mx-auto w-screen px-2">
                {maleTeams.map((team, index) => {
                  if (index >= range.start && index < range.end) {
                    return (
                      <div
                        key={index}
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          location.assign("/pastEdition/" + team.id+ "/" + edition);
                        }}
                      >
                        {" "}
                        <PrevYearMatchCard
                          type={`short`}
                          team={team}
                          key={index}
                          genderColor={maleColor}
                          edition={edition}
                        />{" "}
                      </div>
                    );
                  }
                })}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 mx-auto w-screen px-2">
                {femaleTeams.map((team, index) => {
                  return (
                    <div
                      className="cursor-pointer"
                      key={team.id}
                      onClick={(e) => {
                        e.preventDefault();
                        location.assign("/pastEdition/" + team.id+ "/" + edition);
                      }}
                    >
                      <PrevYearMatchCard
                        type={`short`}
                        team={team}
                        key={index}
                        genderColor={femaleColor}
                        edition={edition}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            {selectedGender === "male" && (
              <div className="flex ml-[20px] items-center font-bold my-5">
                <BsChevronLeft
                  onClick={() => {
                    if (page > 1) {
                      setPage(page - 1);
                      // console.log(page);
                    }
                  }}
                  className={`${colorDeciderForRange("previous")}`}
                />
                <BsChevronRight
                  onClick={() => {
                    if (page < totalPages) setPage(page + 1);
                    // console.log(page);
                  }}
                  className={`${colorDeciderForRange("next")} z-10`}
                />
              </div>
            )}
            {selectedGender === "male" ? (
              <Image
                src={`/vector-4.png`}
                alt="Picture of a batsman"
                height={400}
                width={300}
                className="absolute bottom-0 h-[382px] w-[382px] left-[52px]"
              />
            ) : (
              <Image
                src={`/vector-7.png`}
                alt="Picture of a batsman"
                height={400}
                width={300}
                className="absolute bottom-0 h-[291px] w-[291px] left-[82px]"
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
          <div className="w-2/5 flex justify-start items-center mt-20 ml-0">
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
          <div>
            <div className="flex justify-center items-center  my-10 w-[762px] ">
              {/* buttons to switch between men and women team */}
              <div className="flex items-center justify-between mr-10 bg-white text-gray-500 px-4 py-2 gap-2 text-center rounded-lg font-[600] text-[30px]">
                {/* men's button */}
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
              {/* <p className=" text-white text-[38px] leading-[58.51px] my-10 font-bold">
                Participating Teams
                
              </p> */}
              
            </div>
  
            {selectedGender === "male" ? (
              <div className="grid gap-3 mr-4 grid-cols-2 ">
                {maleTeams.map((team, index) => {
                  if (index >= range.start && index < range.end) {
                    return (
                      <>
                        <div
                          className="lg:hidden"
                          onClick={(e) => {
                            e.preventDefault();
                            location.assign("/pastEdition/" + team.id+ "/" + edition);
                          }}
                        >
                          <PrevYearMatchCard
                            type={`short`}
                            team={team}
                            key={index}
                            genderColor={maleColor}
                            edition={edition}
                          />
                        </div>
                        <div className="hidden lg:flex">
                          <PrevYearMatchCard
                            type={`short`}
                            team={team}
                            key={index}
                            genderColor={maleColor}
                            edition={edition}
                          />
                        </div>
                      </>
                    );
                  }
                })}
              </div>
            ) : (
              <div className="grid gap-3 mr-4 grid-cols-2 ">
                {femaleTeams.map((team, index) => {
                  return (
                    <>
                      <div
                        className="lg:hidden"
                        onClick={(e) => {
                          e.preventDefault();
                          location.assign("/pastEdition/" + team.id+ "/" + edition);
                        }}
                      >
                        <PrevYearMatchCard
                          type={`short`}
                          team={team}
                          key={index}
                          genderColor={femaleColor}
                          edition={edition}
                        />
                      </div>
                      <div className="hidden lg:flex">
                        <PrevYearMatchCard
                          type={`short`}
                          team={team}
                          key={index}
                          genderColor={femaleColor}
                          edition={edition}
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            )}
  
            {selectedGender === "male" && (
              <div className="flex ml-[20px] text-4xl items-center font-bold my-5">
                <BsChevronLeft
                  onClick={() => {
                    if (page > 1) {
                      setPage(page - 1);
                    }
                  }}
                  className={`${colorDeciderForRange("previous")}`}
                />
                <BsChevronRight
                  onClick={() => {
                    if (page < totalPages) setPage(page + 1);
                  }}
                  className={`${colorDeciderForRange("next")} z-10`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      </>
    );
  }
  function PrevEdMatch ({matchData})  {
    console.log(matchData);
  
    // const [selectedGender, setSelectedGender] = useState("male");
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
        <div className={``} >
        {/* bg-gradient-to-b ${decisionsBasedonGender()} to-white */}
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
  

return (
  <>
  <Navbar/>
  <div className={`bg-gradient-to-b ${bgDecider()} to-white border-b-2 pb-5` } >
  {/*  */}
    
  <p className=" text-white text-[38px] leading-[58.51px] text-center  font-bold py-10 ">
               <span > Select Edition
                <select value={edition} onChange={(e)=>setEdition(e.target.value)} className=" cursor-pointer ml-2 font-semibold   text-[#414447]  border-2 rounded-lg text-[26px]" > 
                   
                    <option value={"16"} className="rounded-lg hover:cursor-pointer  font-semibold text-[20px] ">16</option>
                    {/* <option value={"17"}className="rounded-lg hover:cursor-pointer font-semibold text-[20px] ">17</option> */}
              </select>
              </span>
              </p>

  <WinnersAnnouncement teamlist={winnerTeamList} />
  <div className=" my-5 ">
       <div className="flex justify-center items-center py-5  ">
              {/* buttons to switch between men and women team */}
              <div className="flex items-center mx-auto border-2 bg-white text-gray-500 px-4 py-2 gap-2 text-center rounded-lg font-[600] text-[30px]">
              {/* bg-white text-gray-500 flex justify-evenly w-[223px] mx-auto text-center font-[600] text-[16px] rounded-lg mb-6 */}
                {/* men's button */}
                <div
                  onClick={() => {
                    setSelectedChoice("squads");
                  }}
                  className={` h-[40px] flex justify-center items-center cursor-pointer`}
                >
                  <p
                    className={`${StylesBasedonChoice(
                      "squads"
                    )} flex items-center rounded-lg`}
                  >
                    Squads
                  </p>
                </div>
  
                {/* women's button */}
                <div
                  onClick={() => {
                    setSelectedChoice("matches");
                  }}
                  className={` h-[40px] flex justify-center items-center cursor-pointer`}
                >
                  <p
                    className={`${StylesBasedonChoice(
                      "matches"
                    )} flex items-center rounded-lg`}
                  >
                    Matches
                  </p>
                </div>
              </div>
              
            </div>
     
  </div>
  {selectedChoice=="squads" ? <ParticipatingTeams teamList={teamList}edition={edition} /> :<PrevEdMatch matchData={matchData}/> }
  </div>
  <p className=" text-black text-[38px] leading-[58.51px] text-center  font-bold my-10 " >
    <span className="border-b-4 border-[#F4A68D] pb-2"  >
    Organizing Team
    </span>
    
    
    </p>
  {coordinators.length !== 0 && <DeveloperComponent text=" Co-ordinators" developers={coordinators} />}
   {designers.length !== 0 && <DeveloperComponent text="Designers" developers={designers}/>}
   {in_house.length !== 0 && <DeveloperComponent text="Infra-In House" developers={in_house} />}
   {content_creators.length !== 0 && <DeveloperComponent text="Content Writers" developers={content_creators} />}
  <Footer/>
  </>
)
}

export default PastRec;
const WinnersAnnouncement = ({ teamlist }) => {
  const winnerTabStyle =
    "flex items-center justify-evenly w-full md:w-2/3 md:mx-auto lg:w-1/3 text-center my-2 py-2 rounded-md shadow-md text-2xl ";

  const winnerStyle = "font-bold font-3xl";

  // console.log(teamlist);

  if (teamlist.length === 0) {
    return <div>loading...</div>;
  } else {
    return (
      <div className="flex flex-col  w-full lg:flex-row justify-evenly py-10  ">
        <div className={"bg-[#1e648f] " + winnerTabStyle}>
          <div className="flex-shrink-0 h-14 w-14">
            <Image
              src={teamlist[0].teamLogo}
              height={130}
              width={130}
              alt="MMNCT 2023 men's winner team logo"
            />
          </div>
          <div>
            <p>Mens' Winner</p>
            <p className={winnerStyle}>{teamlist[0].teamName}</p>
            <p className="text-sm">{teamlist[0].teamType}</p>
          </div>
        </div>
        <div className={"bg-[#fae039] " + winnerTabStyle}>
          <div className="flex-shrink-0 h-14 w-14">
            <Image
              src={teamlist[1].teamLogo}
              height={130}
              width={130}
              alt="MMNCT 2023 women's winner team logo"
            />
          </div>
          <div>
            <p>Womens' Winner</p>
            <p className={winnerStyle}>{teamlist[1].teamName}</p>
            <p className="text-sm">{teamlist[1].teamType}</p>
          </div>
        </div>
      </div>
    );
  }
};




