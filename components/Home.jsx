import Image from "next/image";
import React from "react";
import { SiGooglemaps } from "react-icons/si";
import Banner from "./Banner";

function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center font-extrabold">
      {/* displaying live score of current match */}
      <Banner />

      {/* name of tournament */}
      <div className="mt-6 ">
        {/* <div className="blur">
          <Image src="/8.JPG" height={400} width={400} />
        </div> */}
        <div className="text-center w-full">
          {/* <p className=" my-5  text-center md:text-left ">Manoj Memorial</p> */}
          <h2 style={{ marginBottom: "60px", marginTop: "30px" }}> Manoj</h2>
          <h2 style={{ marginBottom: "40px" }}> Memorial</h2>
          <p className="text-3xl text-center md:text-left">
            Night Cricket Tournament
          </p>
        </div>
      </div>

      {/* graphic and venue */}
      <Image src="/vector-1.jpg" width={300} height={300} />
      <div className="text-center flex items-center">
        <SiGooglemaps className="text-3xl mr-4" />
        <div>
          <p className="text-xl">SVNIT, Surat</p>
          <p>SAC Ground</p>
        </div>
      </div>

      {/* more information about the tournament */}
      <div className="mb-4 mmnct-about">
        <p className="font-normal w-full px-2 bg-white rounded-lg shadow-lg ">
          <span className="font-bold text-5xl">"</span>
          <span className="text-4xl font-bold">M</span>anoj Memorial Night Cricket
          Tournament, popularly known as <strong>MMNCT</strong>, is a day-night
          cricket tournament organized by SVNIT, Surat. It began in 2006 in
          memory of the late <strong>Shri Manoj Kumar</strong>, an electrical
          engineering student of the institute who unfortunately passed away due
          to dengue fever. He was a cricket aficionado and loved the game to his
          death.
          <strong>
            Though we lost a braveheart, through this event, we keep the passion
            and spirit of fighting alive among us
          </strong>
          . <br />
          The <strong>16th</strong> edition of the tournament will commence on
          January 26 and end with the finale on January 29. <br />
          The teams will comprise of B.Tech, M.Sc., M.Tech, Ph.D. students,
          localites, mess staff, and Faculty members. <br />
          The tournament features 15 men's and 5 women's teams competing against
          each other to claim the ultimate title in their category.
          {/* <br /> */}
          <span className="font-bold text-5xl"> "</span>
        </p>
      </div>
    </div>
  );
}

export default HomePage;
