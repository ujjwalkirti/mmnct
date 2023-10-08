import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { database } from '../components/db/Firebase';
import { ref, get,onValue } from "firebase/database";
import { totalScore, getOver ,extraOfInnings} from "../components/matchFunctions";
{/* <p className="text-orange-500 font-bold">
{totalScore(
  curElem.Team1Score,
  curElem.Team1Extra,
  curElem.Team1Wicket
)}
</p> */}
const Scorecard = () => {
  const router = useRouter();
  const { matchId } = router.query;

  // Sample data (replace with your actual data)
  const [selectedTeam, setSelectedTeam] = useState('team1');
  const [matchData, setMatchData] = useState(null);
  const [team1BattingData, setTeam1BattingData] = useState([]); // State to store team1 batting data
  const [team2BattingData, setTeam2BattingData] = useState([]); // State to store team2 batting data
  const [team1BowlingData, setTeam1BowlingData] = useState([]);
  const [team2BowlingData, setTeam2BowlingData] = useState([]);
  const[team1Totalrun,setTeam1Totalrun]=useState([]);
  const[team2Totalrun,setTeam2Totalrun]=useState([]);
  const [team1Over, setTeam1Over] = useState([]);
const [team2Over, setTeam2Over] = useState([]);
const[team1Extras,setTeam1Extras]=useState([]);
const[team2Extras,setTeam2Extras]=useState([]);
  const getPlayerScore = (score) => {
    var totalRuns = 0;
    //var ballPlayed = 0;
    if (score) {
      for (var i = 0; i <= 10; i++) {
        if (score[i]) {
         // console.log(score[i]);
          totalRuns += i * score[i];
         
        }
      }
    }
    return totalRuns;
  }
  const getPlayerBalls = (score) => {
    //var totalRuns = 0;
    var ballPlayed = 0;
    if (score) {
      for (var i = 0; i <= 10; i++) {
        if (score) {
        
          ballPlayed +=score[i];
        }
      }
    }
    return ballPlayed;
  }
  const ballsToOvers = (balls) => {
    const overs = Math.floor(balls / 6) + (balls % 6) / 10;
    return overs.toFixed(1); // Return overs with one decimal place
  };

  useEffect(() => {
    if (matchId) {
      const matchRef = ref(database, "matchDetail/" + matchId);
  
      const unsubscribe = onValue(matchRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setMatchData(data);
          setTeam1BattingData(data.Team1Players);
          setTeam2BattingData(data.Team2Players);
          setTeam1BowlingData(data.Team1Players);
          setTeam2BowlingData(data.Team2Players);
          setTeam1Totalrun(totalScore(data.Team1Score,data.Team1Extra,data.Team1Wicket));
          setTeam2Totalrun(totalScore(data.Team2Score,data.Team2Extra,data.Team2Wicket));
          setTeam1Over(getOver(data.Team1Score,data.Team1prev,data.Team1Extra)[0]);
          setTeam2Over(getOver(data.Team2Score,data.Team2prev,data.Team2Extra)[0]);
          setTeam1Extras(extraOfInnings(data.Team1Score,data.Team1Extra));
          setTeam2Extras(extraOfInnings(data.Team2Score,data.Team2Extra));

          //console.log(data);
        } else {
         // console.log("No match data available");
        }
      });
  
      // Cleanup the listener when the component unmounts
      return () => {
        unsubscribe();
      };
    }
  }, [matchId]);
var runs;
var balls;
  // Function to calculate the strike rate
  const calculateStrikeRate = (runs, balls) => {
    if (balls === 0) {
      return 0; // Avoid division by zero
    }
    const strikeRate = (runs / balls) * 100;
    return strikeRate.toFixed(2); // Round to 2 decimal places
  };

  const populateBattingStats = (battingData) => {
    const battingPlayers = [];
    const yetToBatPlayers = [];
  
    Object.keys(battingData).forEach((playerId) => {
      const player = battingData[playerId];
  
      if (player.status === 'Did Not Bat') {
        yetToBatPlayers.push(player);
      } else {
        battingPlayers.push(player);
      }
    });
  
    // Sort battingPlayers by batting order
    battingPlayers.sort((a, b) => a.battingOrder - b.battingOrder);
  
    return (
      <div>
        <h2 className="text-xl font-semibold mb-2">Batting Card</h2>
        <table className="table-auto">
          <thead>
            <tr>
              <th>Player Name</th>
              <th>Runs</th>
              <th>4s</th>
              <th>6s</th>
              <th>Balls</th>
              <th>Strike Rate</th>
            </tr>
          </thead>
          <tbody>
            {battingPlayers.map((player) => (
              <tr key={player.playerName}>
                <td>{player.playerName}</td>
                <td>{getPlayerScore(player.score)}</td>
                <td>{player.score[4]}</td>
                <td>{player.score[6]}</td>
                <td>{getPlayerBalls(player.score)}</td>
                <td>{calculateStrikeRate(getPlayerScore(player.score), getPlayerBalls(player.score))}</td>
                <td>{player.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {yetToBatPlayers.length > 0 && (
  <div>
    <h2 className="text-xl font-semibold mb-2">Yet to Bat</h2>
    <p>{yetToBatPlayers.map((player) => player.playerName).join(', ')}</p>
  </div>
)}
      </div>
    );
  };
  
  const populateBowlingStats = (bowlingData) => {
    return (
      <table className="table-auto">
        <thead>
          <tr>
            <th>Bowler Name</th>
            <th>Overs</th>
            <th>Runs</th>
            <th>Wickets</th>
          </tr>
        </thead>
       
        <tbody>
          {Object.keys(bowlingData).map((playerId) => {
          const player = bowlingData[playerId];
          if(player.score[12]===0){
            return null;
          }
          return (
            <>
            <tr key={playerId}>
              <td>{player.playerName}</td>
              <td>{ballsToOvers(player.score[12])}</td>
              <td>{player.score[13]}</td>
                <td>{player.score[14]}</td>
            </tr>

                
                  </>
          );
        })}
        </tbody>
      </table>
    );
  };
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Match Scorecard</h1>

      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 ${
            selectedTeam === 'team1' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => setSelectedTeam('team1')}
        >
          {matchData && matchData.Team1Id}
        </button>
        <button
          className={`px-4 py-2 ${
            selectedTeam === 'team2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
          onClick={() => setSelectedTeam('team2')}
        >
          {matchData && matchData.Team2Id}
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{selectedTeam === 'team1' ? 'Team 1' : 'Team 2'}</h2>
        {selectedTeam === 'team1' ? populateBattingStats(team1BattingData) : null}
        {selectedTeam === 'team2' ? populateBattingStats(team2BattingData) : null}
      </div>
     

{/* Display total score for Team 1 */}
{selectedTeam === 'team1' && (
       <div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Total Score: {team1Totalrun}</h3>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Overs: {team1Over}</h3>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Extras: {team1Extras}</h3>
          </div>
          </div>
        )}

        {/* Display total score for Team 2 */}
        {selectedTeam === 'team2' && (
          <div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Total Score: {team2Totalrun}</h3>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Overs: {team2Over}</h3>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Extras: {team2Extras}</h3>
          </div>
          </div>
        )}

      <div>
        <h2 className="text-xl font-semibold mb-2">Bowling Statistics</h2>
        {selectedTeam === 'team1' ? populateBowlingStats(team2BowlingData) : null}
        {selectedTeam === 'team2' ? populateBowlingStats(team1BowlingData) : null}
      </div>
    </div>
  );
};

export default Scorecard;
