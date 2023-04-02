import Image from "next/image";
import React, { useEffect, useState } from "react";
import HomeCard from "./HomeCard";
// import { SiGooglemaps } from "react-icons/si";
// import Banner from "./Banner";

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

function HomePage({ teamlist }) {
  const [screenSize, setScreenSize] = useState(0);
  const [winnerTeamList, setWinnerTeamList] = useState([]);

  useEffect(() => {
    setScreenSize(window.innerWidth);
    setWinnerTeamList(() => decideWinner("SHM", "SAM", teamlist));
  }, []);

  return (
    <div className="flex flex-col md:w-11/12 md:mx-auto tournament-name-container ">
      {/* displaying live score of current match */}
      {/* <Banner /> */}
      <div className="mt-6 w-4/5 mx-auto">
        <p className="tournament-name">MMNCT</p>
        <p className="tournament-name-fullform mb-3">
          Manoj Memorial
          <br className="md:hidden" /> Night Cricket Tournament
        </p>
        <div className="md:flex md:gap-4 md:items-center">
          {" "}
          <p className="bg-white py-2 px-3 text-[#F9BD48] font-[800] w-[180px] h-[36px] text-[20px] md:text-[40px] mb-3 flex justify-center items-center md:w-[360px] md:h-[66px]">
            16<sup>th</sup> <span className="ml-2">EDITION</span>
          </p>
          <p className="font-[800] text-[16px] md:text-[24px] md:leading-[29.26px] md:ml-[40px]">
            26<sup>th</sup> - 29<sup>th</sup> <br className="hidden md:flex" />
            January, 2023
          </p>
          <p className="font-[600] text-[12px] mb-7 md:hidden">
            Bring back the Cheers! Bring back the Slogans!
          </p>
        </div>
        <WinnersAnnouncement teamlist={winnerTeamList} />
      </div>

      <div className="w-full md:w-4/5 md:mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
        {/* graphic and venue along with days to go */}

        <div>
          <HomeCard />

          <p className="font-[600] text-[20px] hidden md:flex my-10  md:mx-auto leading-[24.38px]">
            Bring back the Cheers! Bring back the Slogans!
          </p>
        </div>

        <div className="h-[200px] lg:hidden relative">
          <div className={` w-[${screenSize}] h-[230px]`}>
            <Image
              height={250}
              width={392}
              src={`/vector-1.png`}
              alt="ground picture"
              priority
              className={`z-40 absolute md:relative top-0`}
            />
          </div>
        </div>

        {/* the following component will be shown when screen size is larger than 1024 pixels */}

        <div className="w-[791px] lg:block relative  hidden">
          <div className="w-full ">
            <img
              src={`/vector-1.png`}
              alt="ground picture"
              priority="true"
              className="w-[791px] h-[396px]"
            />
          </div>
        </div>
      </div>

      {/* more information about the tournament */}
    </div>
  );
}

export default HomePage;

function daysCaluclator() {
  var today = new Date();
  var date_to_reply = new Date("2023-01-26");
  var timeinmilisec = today.getTime() - date_to_reply.getTime();
  // console.log(Math.floor(timeinmilisec / (1000 * 60 * 60 * 24)));
  return Math.floor(timeinmilisec / (1000 * 60 * 60 * 24));
}

// this component is hard coded and is used only for announcing who won

const winnerTabStyle =
  "flex items-center justify-evenly w-full md:w-2/3 lg:w-1/3 text-center my-2 py-2 rounded-md shadow-md text-2xl button";

const winnerStyle = "font-bold font-3xl";

const WinnersAnnouncement = ({ teamlist }) => {
  if (teamlist.length === 0) {
    return <div>loading...</div>;
  } else {
    return (
      <div className="flex flex-col lg:flex-row justify-evenly mt-5">
        <div className={`${winnerTabStyle} bg-[${teamlist[0].themeColor}]`}>
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
        <div className={`${winnerTabStyle} bg-[${teamlist[1].themeColor}]`}>
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
