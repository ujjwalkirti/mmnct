import Image from "next/image";
import React from "react";

const TournamentHistory = () => {
  return (
    <div className="mmnct-about md:mx-auto md:text-xl xl:text-2xl xl:items-center xl:flex">
      {/* <span className="font-bold text-5xl">"</span> */}
      <div className="xl:w-1/2">
        <div className="bg-white h-[327px] xl:h-[493px] w-[327px] xl:w-[493px] rounded-full flex justify-center items-center mx-auto shadow-lg mt-5">
          <Image
            src="/main.png"
            height={191}
            width={307}
            className="h-[250px] w-[250px] xl:h-[370px] xl:w-[370px]"
          />
        </div>
      </div>
      <div className="text-[15px] md:text-[20px] font-[500] leading-[18.29px] md:leading-[25px]  text-justify w-11/12 xl:w-1/2 xl:px-5 mx-auto xl:mr-10 mt-10 text-[#302206]">
        <strong>
          <span className="text-[25px] font-[700] leading-[18.29px]">M</span>
          anoj Memorial Night Cricket Tournament
        </strong>
        , popularly known as <strong>MMNCT</strong>, is a day-night cricket
        tournament organized by SVNIT, Surat. It began in 2006 in memory of the
        late <strong>Shri Manoj Kumar</strong>, an electrical engineering
        student of the institute who unfortunately passed away due to dengue
        fever. He was a cricket aficionado and loved the game to his death.
        <strong>
          Though we lost a braveheart, through this event, we keep the passion
          and spirit of fighting alive among us
        </strong>
        . <br />
        <br />
        The <strong>16th</strong> edition of the tournament will commence on 
        <strong> January 26</strong> and end with the{" "}
        <strong>finale on January 29</strong>. <br />
        <br />
        The teams will comprise of B.Tech, M.Sc., M.Tech, Ph.D. students,
        localites, mess staff, and Faculty members. <br />
        <br />
        The tournament features 15 men's and 5 women's teams competing against
        each other to claim the ultimate title in their category.
      </div>
      {/* <br /> */}
      {/* <span className="font-bold text-5xl"> "</span> */}
    </div>
  );
};

export default TournamentHistory;
