import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const PlayerPastRecord = (props) => {
    const boxStyle = {
        // width: "320px", // Set the width of individual carousel items
        height: "", // Set the height of individual carousel items
        backgroundColor: "#f0f0f0",
        border: "1px solid #ccc",
        display: "flex-column",
        justifyContent: "center",
        alignItems: "center",
    };

    const getPlayerScore = (score) => {
        var totalRuns = 0;
        //var ballPlayed = 0;
        if (score) {
            for (var i = 0; i < 10; i++) {
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
            for (var i = 0; i < 10; i++) {
                if (score) {

                    ballPlayed += score[i];
                }
            }
        }
        return ballPlayed;
    }
    const calculateStrikeRate = (runs, balls) => {
        if (balls === 0) {
            return 0; // Avoid division by zero
        }
        const strikeRate = (runs / balls) * 100;
        return strikeRate.toFixed(1); // Round to 2 decimal places
    };
    const gender = props?.gender
    //console.log(props)
    return (
        <>

            <div style={boxStyle} className=" w-4/5 p-2 rounded-lg mx-auto my-5 ">
                <div
                    className={`${gender === "girl"
                        ? " text-center w-full bg-pink-500 text-lg font-bold rounded-xl text-white space-x-3 "
                        : "text-center w-full bg-blue-500 text-lg font-bold rounded-xl text-white space-x-3"
                        }`}
                >
                    {" "}
                    Match No. {props?.id}
                </div>
                <div className="w-full p-2 m-1 ">
                    <div className=" rounded-xl flex m-3 mx-auto  ">
                        <p className="  text-center w-full  text-lg font-bold  rounded-l-md text-black space-x-3">
                            {" "}
                            VS
                        </p>
                        <p className="   text-center w-full  text-lg font-bold rounded-r-md text-black space-x-3">
                            {" "}
                            {props?.value?.opponent}
                        </p>
                        <hr className=" bg-red-400" />
                    </div>
                    <hr
                        className={`${gender === "girl"
                            ? " h-1 bg-pink-400 m-4 "
                            : "h-1 bg-blue-500 m-4"
                            }`}
                    />

                    <div className=" rounded-xl flex m-3  ">
                        <p className="  text-center w-full text-lg font-bold  rounded-l-md text-black space-x-3">
                            {" "}
                            Runs
                        </p>
                        <p className="   text-center w-full  text-lg font-bold rounded-r-md text-black space-x-3">
                            {" "}
                            {getPlayerScore(props?.value?.score)}
                        </p>
                        <hr className=" bg-red-400" />
                    </div>
                    <hr
                        className={`${gender === "girl"
                            ? " h-1 bg-pink-400 m-4 "
                            : "h-1 bg-blue-500 m-4"
                            }`}
                    />
                    <div className=" rounded-xl flex m-3  ">
                        <p className="  text-center w-full  text-lg font-bold  rounded-l-md text-black space-x-3">
                            {" "}
                            No. of 4's
                        </p>
                        <p className="   text-center w-full  text-lg font-bold rounded-r-md text-black space-x-3">
                            {" "}
                            {props.value && props.value.score && props.value.score[4] ? props.value.score[4] : 0}
                        </p>
                        <hr className=" bg-red-400" />
                    </div>
                    <hr
                        className={`${gender === "girl"
                            ? " h-1 bg-pink-400 m-4 "
                            : "h-1 bg-blue-500 m-4"
                            }`}
                    />
                    <div className=" rounded-xl flex m-3  ">
                        <p className="  text-center w-full  text-lg font-bold  rounded-l-md text-black space-x-3">
                            {" "}
                            No. of 6's
                        </p>
                        <p className="   text-center w-full  text-lg font-bold rounded-r-md text-black space-x-3">
                            {" "}
                            {props.value && props.value.score && props.value.score[6] ? props.value.score[6] : 0}
                        </p>
                        <hr className=" bg-red-400" />
                    </div>
                    <hr
                        className={`${gender === "girl"
                            ? " h-1 bg-pink-400 m-4 "
                            : "h-1 bg-blue-500 m-4"
                            }`}
                    />
                    <div className=" rounded-xl flex m-3  ">
                        <p className="  text-center w-full text-lg font-bold  rounded-l-md text-black space-x-3">
                            Wickets
                        </p>
                        <p className="   text-center w-full text-lg font-bold rounded-r-md text-black space-x-3">
                            {" "}
                            {props.value && props.value.score && props.value.score[14] ? props.value.score[14] : 0}
                        </p>
                        <hr className=" bg-red-400" />
                    </div>
                    <hr
                        className={`${gender === "girl"
                            ? " h-1 bg-pink-400 m-4 "
                            : "h-1 bg-blue-500 m-4"
                            }`}
                    />
                    <div className=" rounded-xl flex m-3  ">
                        <p className="  text-center w-full  text-lg font-bold  rounded-l-md text-black space-x-3">
                            Strike rate
                        </p>
                        <p className="   text-center w-full  text-lg font-bold rounded-r-md text-black space-x-3">
                            {" "}
                            {calculateStrikeRate(getPlayerScore(props.value.score), getPlayerBalls(props.value.score))}
                        </p>
                        <hr className=" bg-red-400" />
                    </div>
                    <hr
                        className={`${gender === "girl"
                            ? " h-1 bg-pink-400 m-4 "
                            : "h-1 bg-blue-500 m-4"
                            }`}
                    />
                </div>
            </div>
        </>
    )
};

export default PlayerPastRecord;