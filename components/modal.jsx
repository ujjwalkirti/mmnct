import React, { useState , useEffect } from 'react';
import Modal from 'react-modal';
import { child, ref, get, set, update } from "firebase/database";
import { database, db } from "./db/Firebase";
Modal.setAppElement('#__next'); // Set app root element (needed for accessibility)

export default function CustomModal({ isOpen, onRequestClose, matchId, onUpdateValues }) {
    const [formData, setFormData] = React.useState({
        currBattingTeam: "",
        striker: "",
        nonstriker: "",
        baller: ""
    });
    const [currOrder, setCurrOrder] = useState(0);
    const [team1name, setteam1name] = useState("Team 1");
    const [team2name, setteam2name] = useState("Team 2");
    const [striker, setStriker] = useState("Striker");
    const [nonstriker, setnonStriker] = useState("nonStriker");
    const [baller, setBaller] = useState("baller");
    const [currBattingTeam, setCurrBattingTeam] = useState("");
    const [team1Players, setTeam1Players] = useState({});
    const [team2Players, setTeam2Players] = useState({});
    const [battingTeam, setBattingTeam] = useState({});
    const [ballerTeam, setBallerTeam] = useState({});

    const getMatchDetails = async (matchId) => {
        const dbref = ref(database);
        let snapshot = await get(
            child(dbref, "matchDetail/" + matchId)
        );
        if (snapshot.val() === undefined) {
            alert("Match Id Not valid");
            return;
        }
        const matchData = snapshot.val();
        setCurrOrder(matchData.currOrder);
        setteam1name(matchData.Team1Id);
        setteam2name(matchData.Team2Id);
        setCurrBattingTeam(matchData.currBattingTeam);
        setStriker(matchData.striker);
        setnonStriker(matchData.nonStriker);
        setBaller(matchData.baller);
        setTeam1Players(matchData.Team1Players);
        setTeam2Players(matchData.Team2Players);

        if (matchData.currBattingTeam === matchData.Team1Id) {
            setBattingTeam(matchData.Team1Players);
            setBallerTeam(matchData.Team2Players);
        } else {
            setBattingTeam(matchData.Team2Players);
            setBallerTeam(matchData.Team1Players);
        }
    }

    useEffect(() => {
        // Fetch match details when the component mounts
        getMatchDetails(matchId);
    }, [matchId]);

    let name, value;
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        if (name === "currBattingTeam") {
            if (value === team1name) {
                setBattingTeam(team1Players);
                setBallerTeam(team2Players);
            } else {
                setBattingTeam(team2Players);
                setBallerTeam(team1Players);
            }
        }
        setFormData({ ...formData, [name]: value });
    };

    const updateStatusBatsman = async () => {
        const team = (formData.currBattingTeam === "" ? currBattingTeam : formData.currBattingTeam) === team1name ? "Team1Players" : "Team2Players";
        if (formData.striker !== striker) {
            if (striker) {
                await update(ref(database, `matchDetail/${matchId}/${team}/${striker}`), {
                    "status": "out",
                });
            }
            await update(ref(database, `matchDetail/${matchId}/${team}/${formData.striker}`), {
                "status": "not out",
                "battingOrder": currOrder
            });
            setCurrOrder(currOrder + 1);
            await update(ref(database, `matchDetail/${matchId}`), {
                "currOrder": currOrder + 1
            });
        }
        if (formData.nonstriker !== nonstriker) {
            if (nonstriker)
                await update(ref(database, `matchDetail/${matchId}/${team}/${nonstriker}`), {
                    "status": "out",
                });
            await update(ref(database, `matchDetail/${matchId}/${team}/${formData.nonstriker}`), {
                "status": "not out",
                "battingOrder": currOrder
            });
            setCurrOrder(currOrder + 1);
            await update(ref(database, `matchDetail/${matchId}`), {
                "currOrder": currOrder + 1
            });
        }
    }

    const submitData = async (e) => {
        e.preventDefault();
        if (formData.baller === '') formData.baller = baller;
        if (formData.nonstriker === '') formData.nonstriker = nonstriker;
        if (formData.striker === '') formData.striker = striker;
        if (formData.currBattingTeam === '') formData.currBattingTeam = currBattingTeam;
        await update(ref(database, "matchDetail/" + matchId), {
            "striker": formData.striker,
            "nonStriker": formData.nonstriker,
            "baller": formData.baller,
            "currBattingTeam": formData.currBattingTeam
        });
        await updateStatusBatsman();
        onUpdateValues(formData.striker, formData.nonstriker, formData.baller, formData.currBattingTeam);
        alert("Match Updated successfully");
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Example Modal"
        >
            <form class="w-full max-w-sm mx-auto px-4" method="POST">
                {/* current Baating team */}
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            for="team_name"
                        >
                            Enter Current Batting Team
                        </label>
                    </div>
                    <div class="md:w-2/3">
                        <select
                            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            name="currBattingTeam"
                            value={formData.currBattingTeam === '' ? currBattingTeam : formData.currBattingTeam}
                            onChange={handleChange}
                        >
                            <option key="abcd" value="">Select a player</option>
                            <option key={team1name} value={team1name}>{team1name}</option>
                            <option key={team2name} value={team2name}>{team2name}</option>
                        </select>
                    </div>
                </div>

                {/* current Batsman */}
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            for="team_name"
                        >
                            Enter Current Striker Details :
                        </label>
                    </div>
                    <div class="md:w-2/3">
                        <select
                            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="match_id"
                            name="striker"
                            type="text"
                            value={formData.striker === '' ? striker : formData.striker}
                            onChange={handleChange}
                        >
                            <option key="abcd" value="">Select a player</option>
                            {currBattingTeam !== "" && battingTeam &&
                                Object.keys(battingTeam).map((playerId) => (
                                    battingTeam[playerId].status === "Did Not Bat" || battingTeam[playerId].status === "not out" ?
                                        (
                                            <option key={playerId} value={playerId}>
                                                {battingTeam[playerId].playerName}
                                            </option>
                                        ) :
                                        (
                                            <></>
                                        )
                                ))}
                        </select>
                    </div>
                </div>

                {/* current non-striker */}
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            for="team_name"
                        >
                            Enter Current Non-Striker Details:
                        </label>
                    </div>
                    <div class="md:w-2/3">
                        <select
                            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="match_id"
                            name="nonstriker"
                            value={formData.nonstriker === "" ? nonstriker : formData.nonstriker}
                            onChange={handleChange}
                        >
                            <option key="abcd" value="">Select a player</option>
                            {currBattingTeam !== "" && battingTeam &&
                                Object.keys(battingTeam).map((playerId) => (
                                    battingTeam[playerId].status === "Did Not Bat" || battingTeam[playerId].status === "not out" ?
                                        (
                                            <option key={playerId} value={playerId}>
                                                {battingTeam[playerId].playerName}
                                            </option>
                                        ) :
                                        (
                                            <></>
                                        )
                                ))}
                        </select>
                    </div>
                </div>
                            
                {/* current baller */}
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            for="team_name"
                        >
                            Enter Current Baller Details:
                        </label>
                    </div>
                    <div class="md:w-2/3">
                        <select
                            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="match_id"
                            name="baller"
                            value={formData.baller === "" ? baller : formData.baller}
                            onChange={handleChange}
                        >
                            <option key="abcd" value="">Select a player</option>
                            {currBattingTeam !== "" && ballerTeam &&
                                Object.keys(ballerTeam).map((playerId) => (
                                    <option key={playerId} value={playerId}>
                                        {ballerTeam[playerId].playerName}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <div class="md:flex md:items-center">
                    <div class="md:w-1/3"></div>
                    <div class="md:w-2/3">
                        <button
                            class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="submit"
                            onClick={submitData}
                        >
                            Update Details
                        </button>
                    </div>
                </div>
            </form >
        </Modal>
    );
}
