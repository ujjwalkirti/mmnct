import Link from "next/link";
import teams from "./teams";
import { ImCircleRight } from "react-icons/im";
import Image from "next/image";

function imageUrlProducer(url) {
  if (url?.length !== 0) {
    return url;
  } else {
    return "https://mir-s3-cdn-cf.behance.net/projects/404/168243107813919.Y3JvcCwzMDAwLDIzNDYsMCw0MjM.jpg";
  }
}

const MatchCard = ({ type, team, genderColor }) => {
  const teamStyle = "flex items-center justify-center";
  const teamName = "font-extrabold text-lg";
  const shortformstyle = "h-[55px] md:h-[75px] rounded-full";

  if (type === "short") {
    return (
      <div className="flex flex-col md:flex-row gap-y-2 justify-center md:justify-evenly items-center my-2 bg-white w-full lg:w-full  h-[129px] lg:h-[90px] xl:h-[150px] rounded-[8px] mx-auto px-2 py-2 shadow-lg ">
        <img
          alt="team-logo"
          className={shortformstyle}
          src={`${imageUrlProducer(team?.teamLogo)} `}
          style={{ backgroundColor: team.themeColor }}
        />
        <div className="flex flex-col justify-center items-center gap-1">
          {" "}
          <p className="text-[15px] xl:text-[21px] lg:text-[18px] font-[600] leading-3 lg:leading-5">
            {team?.teamName}
          </p>
          <p className="text-[12px] lg:text-[15px] flex text-gray-600 font-[600] leading-3 lg:leading-5">
            {team?.teamType}
          </p>
          <Link
            href={`/team-details/${team.id}`}
            className={`mt-2 text-lg bg-[${genderColor}] hidden xl:flex text-white justify-center items-center gap-2 font-semibold py-2 px-4 rounded-lg hover:shadow-lg`}
          >
            Full squad <ImCircleRight />
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex bg-white  md:w-4/5 md:mx-auto my-4 text-sm items-center justify-evenly shadow-lg py-4 mx-4 rounded-lg">
        {/* team 1 */}
        <div className="flex flex-col">
          <img
            alt="team-logo"
            className="team-logo"
            src={teams[team.Team1Id].teamLogo}
            style={{
              backgroundColor: teams[team.Team1Id].themeColor,
            }}
          />
          <p className={`${teamName} ml-1 lg:hidden`}>
            {teams[team.Team1Id].teamCode}
          </p>
          <p className={`${teamName} ml-1 hidden lg:flex`}>{team.Team1Id}</p>
        </div>

        {/* timing and date */}
        <div>
          <Image
            src={`/vector-8.png`}
            height={60}
            width={60}
            alt="versus symbol"
          />
          <p className="text-gray-400">{team.timeDate}</p>
        </div>

        {/* Team 2 */}
        <div className="flex flex-col">
          <img
            alt="team-logo"
            className="team-logo"
            src={teams[team.Team2Id].teamLogo}
            style={{
              backgroundColor: teams[team.Team2Id].themeColor,
            }}
          />
          <p className={`${teamName} ml-1 lg:hidden`}>
            {teams[team.Team2Id].teamCode}
          </p>
          <p className={`${teamName} ml-1 hidden lg:flex`}>{team.Team2Id}</p>
        </div>
      </div>
    );
  }
};

export default MatchCard;
