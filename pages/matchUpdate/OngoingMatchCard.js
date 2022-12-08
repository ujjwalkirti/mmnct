import React from 'react';
import styles from "../../styles/Match.module.css"
import { totalScore, getOver } from '../../components/matchFunctions'; 

const OngoingMatchCard = (props) => {
  console.log(props);
  if (!(props.matchData)) {
    return (
      <>
      </>
    );
  }
  let matchData = props["matchData"];
  console.log(matchData);
  return (
    <>
      <section className={styles.main_card_container}>
        {matchData.map((curElem) => {
          if (curElem.category !== "ongoing") {
            return (
              <></>
            )
          }
          return (
            <>
              <div className={styles.card_container} key={curElem.id}>

                <div className={styles.team1}>
                  <div className={styles.logo1}>
                    <img src="./images/team1.png" alt="vs" className={styles.l1} />
                  </div>
                  <br />
                  <div className={styles.txt1}><h4>Team 1</h4></div>
                </div>
                <div className={styles.sc1}>
                  <h4>{totalScore(curElem.Team1Score, curElem.Team1Extra, curElem.Team1Wicket)}</h4>
                  <h5>({getOver(curElem.Team1Score, curElem.Team1prev, curElem.Team1Extra)[0]})</h5>
                </div>
                <div className={styles.vs}>
                  <br />
                  <br />
                  <h5>{curElem.timeDate.split("T")[0]}</h5>
                  <h5>{curElem.timeDate.split("T")[1]}</h5>
                </div>
                <div className={styles.sc2}>
                  <h4>{totalScore(curElem.Team2Score, curElem.Team2Extra, curElem.Team2Wicket)}</h4>
                  <h5>({getOver(curElem.Team2Score, curElem.Team2prev, curElem.Team2Extra)[0]})</h5>
                </div>
                <div className={styles.team2}>
                  <div className={styles.logo1}>
                    <img src="./images/team2.jpeg" alt="vs" className={styles.l1} />
                  </div>
                  <br />
                  <div className={styles.txt2}><h4>Team 2</h4></div>
                </div>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
}
export default OngoingMatchCard;
