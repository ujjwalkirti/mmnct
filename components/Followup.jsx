import Image from "next/image";
import React from "react";
import TournamentDetails from "./TournamentDetails";
 const description =
   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
const Followup = () => {
  return (
    <div className="text-center">
      <p>We are glad that you dropped by.</p>
      <p>Please scroll down to know more!</p>
      {/* About Section */}
      <div>
        <Image src="/main.png" width={200} height={200} />
        <p>{description}</p>
      </div>
      {/* Details */}
      <TournamentDetails/>
    </div>
  );
};


//fix this function and make it fetch the data from firebase
export async function getServerSideProps(context) {
  // Fetch data from external API

  const description =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

  // Pass data to the page via props
  return { props:  description  };
}

export default Followup;
