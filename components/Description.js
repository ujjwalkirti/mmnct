import Image from "next/image";
import React from "react";
import CarouselComponent from "./CarouselComponent";


const Description = () => {
  const description =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";
  return (
    <div>
      <div className="mt-24">
        <p className="text-center text-gray-500">SVNIT, Surat</p>
        <Image src="/main.png" height={100} width={100} layout="responsive" />
      </div>
      <p className="text-center mb-5 text-gray-500">
        January 25<sup>th</sup> - 29<sup>th</sup>
      </p>
      <hr />
      <p className="text-center leading-8 text-gray-700 text-lg px-3 my-7">
        {description}
      </p>
      <hr />
      <CarouselComponent/>
      
    </div>
  );
};

export default Description;
