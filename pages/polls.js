import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Navbar from "../components/Navbar";
import { FaWindowClose } from "react-icons/fa";
import { useSession, signIn } from "next-auth/react";
import Footer from "../components/Footer";
import { db, dbRef } from "../components/db/Firebase";
import { child, get } from "firebase/database";
import teams from "../components/teams";
import {
  arrayUnion,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Progress_bar from "../components/Progress-bar";

function fetchDate() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month.toString().length === 1) {
    month = "0" + month;
  }

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${year}-${month}-${day}`;
  return currentDate;
}
export async function getServerSideProps() {
  let matches = [];
  let localMatches = [];
  let snapshot = await get(child(dbRef, "matchDetail/"));
  localMatches = snapshot.val();
  let todayDate = fetchDate();
  localMatches.shift();
  localMatches.map((match) => {
    if (match.timeDate === todayDate && match.status !== "past") {
      matches.push(match);
    }
  });
  return {
    props: {
      matches,
    },
  };
}

function Polls({ matches }) {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Head>
        <title>Polls - Make your favorite Team win!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <p className="font-bold text-3xl my-7 text-center">
        Who do you think
        <br className="md:hidden" /> is going to win today??
      </p>
      <p className="text-center">
        (Tap on any one of the matches for whom you wish to vote, and then tap
        on your favorite team!)
      </p>
      {matches.length === 0 ? (
        <div className="text-center font-bold md:text-3xl text-xl text-red-500">
          <div className="flex justify-center">
            <Image
              src="/vector-6.jpg"
              height={400}
              width={400}
              alt="man playing a shot in cricket match"
            />
          </div>
          <p className="">Sorry there are no matches available!</p>
          <p>Try back again sometime.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((match, index) => {
            return (
              <div className=" lg:w-11/12 lg:mx-auto">
                <ShowMatch match={match} key={index} />
              </div>
            );
          })}
        </div>
      )}
      {/* <div className="md:grid md:grid-cols-3 lg:w-11/12 lg:mx-auto">
        <ShowMatch />
      </div> */}
      <Footer />
    </div>
  );
}

export default Polls;

// this is the component to show individual matches and collect polls for them
function ShowMatch({ match }) {
  const [showModal, setShowModal] = useState(false);
  const [hover, setHover] = useState(0);
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [showPercentage, setShowPercentage] = useState(false);
  const [team1Percent, setTeam1Percent] = useState(0);
  const [chosenTeam, setChosenTeam] = useState(0);
  const [showError, setShowError] = useState(false);

  const { data: session } = useSession();

  const handleClose = () => {
    return setShowModal(false);
  };

  const vote = async (teamNumber) => {
    if (!alreadyVoted) {
      //change the stats
      setChosenTeam(teamNumber);
      const washingtonRef = doc(db, "match-votes", match.id.toString());
      if (teamNumber === 1) {
        // Atomically add a new region to the "regions" array field.
        await updateDoc(washingtonRef, {
          team1Voters: arrayUnion(session.user.email),
        });
      } else {
        // Atomically add a new region to the "regions" array field.
        await updateDoc(washingtonRef, {
          team2Voters: arrayUnion(session.user.email),
        });
      }
      setShowPercentage(true);
      setAlreadyVoted(true);

      //register this ip at firestore db and prevent it from voting again
    } else {
      setShowError(true);
    }
  };

  async function createMatchRecord(data) {
    await setDoc(doc(db, "match-votes", match.id.toString()), data);
  }

  useEffect(() => {
    console.log(session?.user);
    //check whether the current singed in user has voted before for this match or not
    const unsub = onSnapshot(
      doc(db, "match-votes", match.id.toString()),
      (doc) => {
        // console.log("Current data: ", doc.data());
        if (typeof doc.data() === "undefined") {
          const data = {
            team1: match.Team1Id,
            team2: match.Team2Id,
            team1Voters: [],
            team2Voters: [],
          };
          createMatchRecord(data);
        } else {
          const localData = doc.data();
          const team1Votes = localData.team1Voters;
          const team2Votes = localData.team2Voters;
          if (team1Votes.length + team2Votes.length !== 0) {
            setTeam1Percent(
              Math.floor(
                (team1Votes.length * 100) /
                  (team1Votes.length + team2Votes.length)
              )
            );
          } else {
            setTeam1Percent(undefined);
          }

          if (session) {
            if (team1Votes.includes(session.user.email)) {
              setAlreadyVoted(true);
            } else {
              if (team2Votes.includes(session.user.email)) {
                setAlreadyVoted(true);
              }
            }
          }
        }
      }
    );
    // unsub.call();
  }, [session]);

  function backgroundDecider(teamNumber) {
    if (chosenTeam === teamNumber) {
      return "bg-green-400 text-white pt-2 gap-2";
    }
  }

  function borderDecider(choice) {
    if (hover === choice) {
      return "border-4 border-green-600";
    } else {
      return "border-4 border-yellow-500";
    }
  }

  const teamStyle =
    "flex flex-col justify-evenly items-center text-lg w-1/2 my-5 py-3 gap-2";

  return (
    <div className="flex md:hover:shadow-xl cursor-pointer bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-600 mx-2 flex-col my-4 rounded-xl ">
      {!showModal && (
        <div
          onClick={() => {
            setShowModal(true);
          }}
          className="flex mx-2 bg-white my-4 rounded-xl shadow-lg "
        >
          {/* team 1 details */}
          <div className={teamStyle}>
            <img
              alt="team logo"
              className="team-logo rounded-lg"
              style={{
                backgroundColor: teams[match.Team1Id].themeColor,
              }}
              src={teams[match.Team1Id].teamLogo}
            />
            <div className="text-start">
              <p className={`text-center ml-1 lg:hidden`}>
                {teams[match.Team1Id].teamCode}
              </p>
              <p className={` ml-1 hidden lg:flex`}>{match.Team1Id}</p>
            </div>
          </div>

          {/* vs graphic only visible when md is crossed */}
          <Image
            width={100}
            alt="versus image"
            height={40}
            src="/vector-8.png"
            className="py-4"
          />

          {/* team 2 details */}
          <div className={teamStyle}>
            <img
              className="team-logo rounded-lg"
              alt="team logo"
              style={{
                backgroundColor: teams[match.Team2Id].themeColor,
              }}
              src={teams[match.Team2Id].teamLogo}
            />
            <div className="text-center">
              <p className={`text-center ml-1 lg:hidden`}>
                {teams[match.Team2Id].teamCode}
              </p>
              <p className={` ml-1 hidden lg:flex`}>{match.Team2Id}</p>
            </div>
          </div>
        </div>
      )}

      {/* modal for voting */}
      {showModal && session && (
        <div className="bg-opacity-70 rounded-xl w-full bg-gray-300 py-4 px-2">
          <div className="bg-white px-4 py-2 h-full w-full">
            {/* error box */}
            {showError && (
              <div className="flex items-center my-3 justify-between border border-red-600 rounded-md px-3 py-2 bg-red-200 text-red-700 font-semibold text-lg">
                <p>Sorry, you have already voted for this match.</p>
                <AiOutlineCloseCircle
                  className="text-3xl ml-2 cursor-pointer"
                  onClick={() => {
                    setShowError(false);
                  }}
                />
              </div>
            )}

            <p>Tap on the team who you think is going to win!</p>
            <div className="flex">
              {/* //team 1 */}
              <div
                onMouseEnter={() => {
                  setHover(1);
                }}
                onMouseLeave={() => {
                  setHover(0);
                }}
                onClick={() => {
                  vote(1);
                }}
                className={`${teamStyle} ${borderDecider(
                  1
                )} ${backgroundDecider(
                  1
                )} hover:shadow-lg rounded-md hover:text-xl border mr-4`}
              >
                <img
                  alt="team logo"
                  className="team-logo rounded-lg"
                  style={{
                    backgroundColor: teams[match.Team1Id].themeColor,
                  }}
                  src={teams[match.Team1Id].teamLogo}
                />
                <div className="text-end lg:text-center font-semibold">
                  <p className={`text-center ml-1 lg:hidden`}>
                    {teams[match.Team1Id].teamCode}
                  </p>
                  <p className={` ml-1 hidden lg:flex`}>{match.Team1Id}</p>
                </div>
              </div>

              {/* //team 2 */}
              <div
                onMouseEnter={() => {
                  setHover(2);
                }}
                onMouseLeave={() => {
                  setHover(0);
                }}
                onClick={() => {
                  vote(2);
                }}
                className={`${teamStyle} ${borderDecider(
                  2
                )}  ${backgroundDecider(
                  2
                )} hover:shadow-lg rounded-md hover:text-xl border`}
              >
                <img
                  alt="team logo"
                  className="team-logo rounded-lg"
                  style={{
                    backgroundColor: teams[match.Team2Id].themeColor,
                  }}
                  src={teams[match.Team2Id].teamLogo}
                />
                <div className="text-end lg:text-center font-semibold">
                  <p className={` ml-1 lg:hidden`}>
                    {teams[match.Team2Id].teamCode}
                  </p>
                  <p className={` ml-1 hidden lg:flex`}>{match.Team2Id}</p>
                </div>
              </div>
            </div>

            {/* votes polled in favor and against depictor */}
            {typeof team1Percent !== "undefined" ? (
              <div className="flex flex-col w-full">
                <Progress_bar
                  bgcolor1={teams[match.Team1Id].themeColor}
                  bgcolor2={teams[match.Team2Id].themeColor}
                  progress={team1Percent}
                  progress2={100 - team1Percent}
                  height={30}
                />
              </div>
            ) : (
              <div className="">Seems like you are the first one to vote!</div>
            )}

            {/* close button */}
            <p
              onClick={handleClose}
              className="flex justify-center items-center text-xl gap-3 mt-5 border w-3/5 md:w-2/5 mx-auto py-1 bg-pink-400 text-white px-2 rounded-full font-bold hover:shadow-lg"
            >
              <FaWindowClose className="" />
              Close
            </p>
          </div>
        </div>
      )}
      {showModal && !session && (
        <div className="bg-white mx-2 my-3 rounded-lg px-2">
          <div
            className="font-semibold hover:bg-black hover:text-white hover:shadow-lg hover:shadow-amber-400 cursor-pointer text-center text-3xl md:w-3/5 mx-auto border px-3 rounded-full border-black py-1 mb-1 mt-4"
            onClick={signIn}
          >
            Sign-in
          </div>
          <p className="mb-3 text-center">
            {" "}
            as you need to register in order to vote!
          </p>
          <p className="mb-4 px-2 border border-yellow-800 bg-yellow-100 text-yellow-600">
            Don't worry we never store your email, it is a gmail based
            authentication to make sure that one person doesn't vote twice!
          </p>
        </div>
      )}
    </div>
  );
}
