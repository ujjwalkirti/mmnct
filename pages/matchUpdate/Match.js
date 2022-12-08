import React, { useEffect, useState } from "react";
import PastMatchCard from "./PastMatchCard";
import OngoingMatchCard from "./OngoingMatchCard";
import UpcomingMatchCard from "./UpcomingMatchCard";
import { database } from "../../components/db/Firebase";
import { ref, onValue } from "firebase/database";
import styles from "../../styles/Match.module.css";

const Match = () => {
  let MatchD;
  let status = "ongoing",
    category = "male";
  const [matchData, setMatchData] = useState(MatchD);
  const [tempDataName, settempDataName] = useState(status, category);

  useEffect(() => {
    const temp = ref(database, "matchDetail/");
    onValue(temp, async (snapshot) => {
      const data = await snapshot.val();
      setMatchData(data);
    });
  }, [tempDataName]);

  return (
    <div className={styles.main}>
      <nav className={styles.navbar1}>
        <div>
          <button
            className={styles.btn_group__item}
            onClick={() => {
              category = "male";
              settempDataName(status, category);
            }}
          >
            Male
          </button>
          <button
            className={styles.btn_group__item}
            onClick={() => {
              category = "female";
              settempDataName(status, category);
            }}
          >
            Female
          </button>
        </div>

        <nav className={styles.navbar}>
          <div>
            <button
              className={styles.btn_group__item}
              onClick={() => {
                status = "past";
                settempDataName(status, category);
              }}
            >
              Past Matches
            </button>
            <button
              className={styles.btn_group__item}
              onClick={() => {
                status = "ongoing";
                settempDataName(status, category);
              }}
            >
              Ongoing Matches
            </button>
            <button
              className={styles.btn_group__item}
              onClick={() => {
                status = "upcoming";
                settempDataName(status, category);
              }}
            >
              Upcoming Matches
            </button>
          </div>
        </nav>
      </nav>

      {/* {tempDataName === "past" ? (
        <PastMatchCard matchData={matchData} />
      ) : tempDataName === "ongoing" ? (
        <OngoingMatchCard matchData={matchData} />
      ) : (
        <UpcomingMatchCard matchData={matchData} />
      )} */}

      <h1 className={styles.cs}>Coming Soon....</h1>
    </div>
  );
};
export default Match;
