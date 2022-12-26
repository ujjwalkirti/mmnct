import Image from "next/image";
import React, { useEffect, useState } from "react";
import MatchCard from "./MatchCard";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const ParticipatingTeams = () => {
  const [teams, SetTeams] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ]);
  const [selectedGender, setSelectedGender] = useState("male");
  const [page, setPage] = useState(1);
  const [range, setRange] = useState({ start: 0, end: 5 });
  const [totalPages, setTotalPages] = useState(0);

  const StylesBasedonGender = (gender) => {
    if (selectedGender === gender) {
      if (gender === "male") {
        return "bg-[#508CD4] font-[700] text-[20px] leading-[24.38px] text-white h-[51px] w-[103px] px-2 shadow-lg";
      } else if (gender === "female") {
        return "bg-[#CE3AB3] font-[700] text-[20px] leading-[24.38px] text-white h-[51px] w-[139px] px-2 shadow-lg";
      }
    } else {
      return "";
    }
  };

  //don't convert both these useEffect to getServerSideProps
  useEffect(() => {
    setRange({ start: 5 * (page - 1), end: 5 * page });
  }, [page]);

  useEffect(() => {
    let pages = teams.length / 5;
    if (teams.length % 5 !== 0) {
      pages += 1;
    }
    setTotalPages(pages);
  }, [teams]);

  function colorDeciderForRange(buttonType) {
    if (buttonType === "previous") {
      if (page === 1) {
        return "text-[#E0E0E0] text-3xl";
      } else {
        return "text-[#4675B5] text-5xl";
      }
    } else {
      if (page === totalPages) {
        return "text-[#E0E0E0] text-3xl";
      } else {
        return "text-[#4675B5] text-5xl";
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
      <p className="font-[800] text-[28px] leading-[34.13px] text-[#FFFDFA] text-center  pt-10 mb-3">
        Participating Teams
      </p>
      <div className="bg-white text-gray-500 flex justify-evenly w-[223px] mx-auto text-center font-[600] text-[16px] rounded-lg mb-10">
        <div
          onClick={() => {
            setSelectedGender("male");
          }}
          className={` h-[44px] flex justify-center items-center`}
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
          className={` h-[44px] flex justify-center items-center`}
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
      <div className="relative h-[540px] overflow-x-hidden mx-auto">
        <div className="grid grid-cols-2 mx-auto w-[360px]">
          {teams.map((team, index) => {
            if (index >= range.start && index < range.end) {
              return <MatchCard type={`short`} key={index} />;
            }
          })}
        </div>
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
  );
};

export default ParticipatingTeams;
