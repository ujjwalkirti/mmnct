import Image from "next/image";
import React, { useEffect, useState } from "react";
import MatchCard from "./MatchCard";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const ParticipatingTeams = ({ teamList }) => {
  const [selectedGender, setSelectedGender] = useState("male");
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
    teamList.map((team) => {
      if (team.teamGender.toLowerCase() === "male") {
        localMaleTeams.push(team);
      } else {
        localFemaleTeams.push(team);
      }
    });
    setMaleTeams(localMaleTeams);
    setFemaleTeams(localFemaleTeams);
  }

  //don't convert both these useEffect to getServerSideProps
  useEffect(() => {
    setRange({ start: 5 * (page - 1), end: 5 * page });
  }, [page]);

  useEffect(() => {
    divisionOfTeamsbasedonGender();
  }, []);

  useEffect(() => {
    let maleCount = maleTeams.length;

    let pages = maleCount / 5;
    if (maleCount % 5 !== 0) {
      pages++;
    }
    // console.log(maleCount, femaleCount);
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
    <div className={`bg-gradient-to-b ${decisionsBasedonGender()} to-white`}>
      <div className="md:hidden">
        <p className="font-[800] text-[28px] leading-[34.13px] text-[#FFFDFA] text-center  pt-10 mb-3">
          Participating Teams
        </p>
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
                        location.assign("/team-details/" + team.id);
                      }}
                    >
                      {" "}
                      <MatchCard
                        type={`short`}
                        team={team}
                        key={index}
                        genderColor={maleColor}
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
                    onClick={(e) => {
                      e.preventDefault();
                      location.assign("/team-details/" + team.id);
                    }}
                  >
                    <MatchCard
                      type={`short`}
                      team={team}
                      key={index}
                      genderColor={femaleColor}
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
          <div className="flex justify-center items-center">
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

            <p className="font-[800] text-white text-[48px] leading-[58.51px] my-10">
              Participating Teams
            </p>
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
                          location.assign("/team-details/" + team.id);
                        }}
                      >
                        <MatchCard
                          type={`short`}
                          team={team}
                          key={index}
                          genderColor={maleColor}
                        />
                      </div>
                      <div className="hidden lg:flex">
                        <MatchCard
                          type={`short`}
                          team={team}
                          key={index}
                          genderColor={maleColor}
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
                        location.assign("/team-details/" + team.id);
                      }}
                    >
                      <MatchCard
                        type={`short`}
                        team={team}
                        key={index}
                        genderColor={femaleColor}
                      />
                    </div>
                    <div className="hidden lg:flex">
                      <MatchCard
                        type={`short`}
                        team={team}
                        key={index}
                        genderColor={femaleColor}
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
        </div>
      </div>
    </div>
  );
};

export default ParticipatingTeams;
