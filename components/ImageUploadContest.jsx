import React, { useState } from "react";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import Image from "next/image";

const questions = [
  {
    q: "What is click-a-sensation?",
    a: "It's an event where contestants upload one of their clicks during the tournament. And the pics with the most vote(s) win.",
  },
  {
    q: "What kind of photos can be uploaded during the contest?",
    a: "Pics can include selfies, surroundings, portraits, macro lens shots or any other aesthetic view. Any objectionable entry will lead to immediate debarment from the contest.",
  },
  {
    q: "Where should photographs be uploaded?",
    a: "Pics should be uploaded to the MMNCT official website; entries commence on the same day the MMNCT begins.",
  },
  {
    q: "When will the Contest Start?",
    a: "The contest begins on January 26, 2023, and ends on January 29, 2023.",
  },
  {
    q: "How will the winner be decided?",
    a: "The winner will be judged solely by votes received on the official website of MMNCT.",
  },
  {
    q: "Who will be the Winners?",
    a: "The contestant with the most votes at the end of the day wins that day's click-a-sensation competition.",
  },
  {
    q: "What if You win?",
    a: "A surprise gift awaits you at the end of the tournament.",
  },
];

const ImageUploadContest = () => {
  return <Page1 />;
};

export default ImageUploadContest;

function Page1() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className=" overflow-x-scroll">
      <div className="mt-5 shadow-lg bg-gradient-to-b from-white via-white to-[#FFD9CD] py-3 text-left px-3 ml-[20px] overflow-hidden relative -z-20 rounded-bl-xl text-[#411F0D] leading-tight">
        <p className="font-semibold text-3xl px-2 mb-5">Hey! 👋</p>
        <p className="text-justify my-3 px-2">
          We have something exciting
          <br /> coming up for you,
          <br /> and it is called..
        </p>

        <p className="bg-[#FFD9CD] w-[270px] contest-title my-4 px-2 text-2xl py-1">
          CLICK-A-SENSATION
        </p>

        <p className="px-2 my-4">Confused? Curious?</p>
        <p className="text-justify px-2">
          Well, here's all the <br />
          what-abouts for the
          <br /> tournament
        </p>
        <button
          onClick={() => {
            setShowDetails(!showDetails);
            console.log("button clicked");
          }}
          className="bg-[#F4A68D] text-white cursor-pointer py-2 px-4 rounded-lg mt-40 h-[60px] ml-2 shadow-lg"
        >
          <AiOutlineDoubleLeft className="left-icon font-extrabold text-3xl" />
        </button>
        <p className="text-sm mb-20 font-medium pl-2 my-2">{`${
          showDetails ? "Show less" : "Click to know More"
        }`}</p>
        <div className="contest-image-container">
          <img
            alt="picture of a girl with camera"
            src="/vector-3.jpg"
            className="-z-10"
          />
        </div>
      </div>

      {/* 2nd component for questions will pop up */}

      {showDetails && (
        <div className=" border bg-white flex flex-col ml-[20px] rounded-l-lg">
          <Image
            src={`/vector-2.jpg`}
            width={400}
            height={400}
            className="rounded-l-lg"
          />

          {questions.map((question, index) => {
            return (
              <div className="text-left my-2">
                <p className="font-semibold text-lg mb-2">
                  {index + 1}. {question.q}
                </p>
                <p>{question.a}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
