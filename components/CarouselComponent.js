import Image from "next/image";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const CarouselComponent = () => {
  return (
    <Carousel
      className="hidden md:flex"
      autoPlay={true}
      infiniteLoop={true}
      stopOnHover={true}
    >
      <div>
        <Image
          src="/carousel/c-1.JPG"
          width={100}
          height={100}
          layout="responsive"
        />
      </div>
      <div>
        <Image
          src="/carousel/c-2.jpg"
          width={100}
          height={100}
          layout="responsive"
        />
      </div>
      <div>
        <Image
          src="/carousel/c-3.JPG"
          width={100}
          height={100}
          layout="responsive"
        />
      </div>
      <div>
        <Image
          src="/carousel/c-4.JPG"
          width={100}
          height={100}
          layout="responsive"
        />
      </div>
      <div>
        <Image
          src="/carousel/c-5.JPG"
          width={100}
          height={100}
          layout="responsive"
        />
      </div>
      <div>
        <Image
          src="/carousel/c-6.JPG"
          width={100}
          height={100}
          layout="responsive"
        />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
