import React from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import OptionsRouter from "./OptionsRouter";

const options = [
  {
    name: "TRIVIAS",
    url: "/trivias",
    from: "",
    via: "",
    to: "",
    special: true,
  },
  {
    name: "FIXTURES",
    url: "/fixtures",
    from: "from-purple-400",
    via: "via-purple-600 ",
    to: "to-purple-900",
    special: false,
  },
  {
    name: "POINTS TABLE",
    url: "/points-table",
    from: "from-green-400",
    via: "via-green-600",
    to: "to-green-900",
    special: false,
  },
  {
    name: "POLLS",
    url: "/polls",
    from: "from-red-700",
    via: "via-red-400",
    to: "to-orange-500",
    special: false,
  },
  {
    name: "MEMORIES",
    url: "/memories",
    from: "from-yellow-400",
    via: "via-yellow-600",
    to: "to-orange-700",
    special: false,
  },
  {
    name: "ORGANISING TEAM",
    url: "/organisers",
    from: "from-blue-700",
    via: "via-blue-500",
    to: "to-purple-500",
    special: false,
  },
];

const description =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

const Followup = () => {
  return (
    <div className="text-center">
      <p>We are glad that you dropped by.</p>
      <p>Please scroll down to know more!</p>
      <BsArrowDownCircle className="animate-pulse text-center w-full text-3xl my-4" />
      {/* About Section */}
      {/* <div className="mx-2"> */}
      {/* <Image src="/main.png" width={200} height={200} /> */}
      {/* <p className="text-left">{description}</p> */}
      {/* </div> */}
      {/* Options to go to */}
      <div>
        {options.map((option) => {
          return (
            <OptionsRouter
              from={option.from}
              via={option.via}
              to={option.to}
              title={option.name}
              route={option.url}
              special={option.special}
            />
          );
        })}
      </div>
      {/* Details */}
    </div>
  );
};

//fix this function and make it fetch the data from firebase
export async function getServerSideProps(context) {
  // Fetch data from external API

  const description =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

  // Pass data to the page via props
  return { props: description };
}

export default Followup;
