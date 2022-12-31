import React, { useEffect, useState } from "react";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const ImageUploadContest = () => {
  return <Page1 />;
};

export default ImageUploadContest;

function Page1() {
  const [showDetails, setShowDetails] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [leftDrag, setLeftDrag] = useState(0);

  //don't convert this useEffect to getServerSideProps : shubham

  useEffect(() => {
    function leftExtentOfDrag() {
      const limit = window.innerWidth;
      // console.log(limit);
      setLeftDrag(-1 * (limit - 20));
    }
    leftExtentOfDrag();
  }, []);

  return (
    <div className="relative lg:w-4/5 lg:3/5 lg:mt-10 lg:mx-auto">
      <div className="">
        <motion.div
          drag="x"
          dragConstraints={{ left: leftDrag, right: 0 }}
          onDrag={(event, info) => {
            // console.log(info.point.x);
            if (info.point.x < 140) {
              setShowButton(true);
            } else {
              setShowButton(false);
            }
          }}
          className="mt-5 shadow-lg bg-gradient-to-b from-white via-white to-[#FFD9CD] pt-3 text-left px-3 ml-[20px] overflow-hidden rounded-bl-xl text-[#411F0D] leading-tight lg:flex lg:justify-center"
        >
          <div className="">
            <p className="font-semibold text-3xl px-2 mb-5">Hey! 👋</p>
            <p className="text-justify my-3 px-2">
              We have something exciting
              <br className="lg:hidden" /> coming up for you,
              <br /> and it is called..
            </p>
            <p className="bg-[#FFD9CD] w-[300px] lg:w-[500px] contest-title my-4 px-2 text-2xl lg:text-4xl text-center py-1 lg:py-2 lg:px-2">
              CLICK-A-SENSATION
            </p>
            <p className="px-2 my-4">Confused? Curious?</p>
            <p className="text-justify px-2">
              Well, here's all the <br className="lg:hidden" />
              what-abouts <br className="hidden lg:flex" /> for the
              <br className="lg:hidden" /> contest.
            </p>
            <div className="lg:flex lg:flex-col hidden">
              <button
                onClick={() => {
                  setShowDetails(!showDetails);
                  // console.log("button clicked");
                }}
                className="bg-[#F4A68D] text-white cursor-pointer py-2 px-4 rounded-lg w-[70px] mt-40 h-[60px] ml-2 hover:shadow-lg"
              >
                <AiOutlineDoubleLeft className="left-icon font-extrabold text-3xl md:hidden" />
                {showDetails ? (
                  <FaAngleUp className="left-icon font-extrabold text-4xl hidden md:flex " />
                ) : (
                  <FaAngleDown className="left-icon font-extrabold text-4xl hidden md:flex " />
                )}
              </button>

              <p className="text-sm lg:text-lg font-medium pl-2 pb-20 pt-4 md:hidden">
                Swipe left to know More
              </p>

              <p className="text-sm lg:text-lg font-medium pl-2 pb-20 pt-4 hidden md:flex">
                Click to know More
              </p>
            </div>
          </div>
          <Image
            src={`/vector-3.jpg`}
            height={400}
            width={550}
            className="hidden lg:flex"
          />
          <div className="relative h-full justify-between lg:hidden">
            <div className="lg:hidden">
              <button className="bg-[#F4A68D] text-white cursor-pointer py-2 px-4 rounded-lg mt-40 h-[60px] ml-2 shadow-lg">
                <AiOutlineDoubleLeft className="left-icon font-extrabold text-3xl" />
              </button>
              <p className="text-sm font-medium pl-2 pb-20 pt-4">
                Swipe left to know More
              </p>
            </div>

            <img
              alt="picture of a girl with camera"
              src="/vector-3.jpg"
              className="contest-image"
            />
          </div>
        </motion.div>

        {/* 2nd component for questions will pop up */}

        <motion.div
          drag="x"
          dragConstraints={{ left: -375, right: 0 }}
          className="absolute lg:hidden top-0 mt-5 -z-10 bg-white flex flex-col ml-[20px] rounded-l-lg text-xl"
        >
          <Image
            src={`/vector-2.jpg`}
            width={400}
            height={400}
            className="rounded-l-lg"
            alt="a man playing cricket in evening"
          />

          {questions.map((question, index) => {
            if (index < 2) {
              return (
                <div key={index} className="text-left my-2 pl-2">
                  <p className="font-semibold mb-2">
                    {index + 1}. {question.q}
                  </p>
                  <p>{question.a}</p>
                </div>
              );
            }
          })}
        </motion.div>
      </div>

      {showDetails && (
        <div className="text-xl pl-[20px] lg:hidden">
          {questions.map((question, index) => {
            if (index >= 2) {
              return (
                <div key={index} className="text-left my-2 pl-2">
                  <p className="font-semibold mb-2">
                    {index + 1}. {question.q}
                  </p>
                  <p>{question.a}</p>
                </div>
              );
            }
          })}
        </div>
      )}

      <AnimatePresence>
        {showButton && (
          <motion.div
            className="mt-10 mb-7 flex w-full lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="w-3/5 mx-auto bg-[#191799] text-white font-semibold py-3 px-2 rounded-lg"
              onClick={() => {
                setShowDetails(!showDetails);
              }}
            >
              {showDetails ? "Show less!" : "Show more!"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {showDetails && (
        <div className="text-xl pl-[20px] hidden lg:flex lg:flex-col lg:w-3/5 lg:mx-auto lg:text-3xl lg:mt-5">
          {questions.map((question, index) => {
            if (index > -1) {
              return (
                <div className="text-left my-2 pl-2">
                  <p className="font-semibold mb-2">
                    {index + 1}. {question.q}
                  </p>
                  <p className="lg:text-xl lg:pl-7">{question.a}</p>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

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
