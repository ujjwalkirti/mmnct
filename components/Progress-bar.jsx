import React from "react";

const Progress_bar = ({ bgcolor1, bgcolor2, progress, progress2, height }) => {
  const Childdiv1 = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: bgcolor1,
    // borderRadius: 40,
    textAlign: "center",
  };
  const Childdiv2 = {
    height: "100%",
    width: `${progress2}%`,
    backgroundColor: bgcolor2,
    // borderRadius: 40,
    textAlign: "center",
  };

  const progresstext = {
    padding: 10,
    color: "white",
    fontWeight: 900,
  };

  return (
    <div>
      
        <div className="flex rounded-full h-[30px] md:w-11/12 mx-auto my-5">
          <div style={Childdiv1}>
            <span style={progresstext}>{`${progress}%`}</span>
          </div>

          <div style={Childdiv2}>
            <span style={progresstext}>{`${progress2}%`}</span>
          </div>
        </div>
      
    
    </div>
  );
};

export default Progress_bar;
