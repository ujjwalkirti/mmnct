import React from "react";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { AiFillRightCircle } from "react-icons/ai";
import Image from "next/image";

const SponsorCarousel = ({ urls }) => {
  const carouselItem = "md:w-full md:mx-auto md:h-[400px]";
  return (
    <div className="mt-8 mb-8 lg:w-[95%] md:w-3/50 md:mx-auto lg:flex">
      <div className="lg:w-3/5">
        <div className="flex justify-center">
          <p className="sponsor-title w-full md:w-9/12 text-center lg:text-3xl font-semibold text-3xl px-2 py-4 text-white">
            Our proud Sponsors
          </p>
        </div>
        <Carousel
          className="shadow-md mt-4 md:w-3/5 md:mx-auto px-2 shadow-gray-500"
          infiniteLoop={true}
          showThumbs={false}
          autoPlay={true}
          dynamicHeight={true}
          swipeable={false}
        >
          {urls.map((url, index) => (
            <div className={carouselItem} key={index}>
              <Image src={url} height={500} width={500} alt="sponsor" />
            </div>
          ))}
        </Carousel>
      </div>
      <Image
        src={`/vector-5.jpg`}
        height={300}
        width={200}
        placeholder="blur"
        blurDataURL="/vector-5.jpg"
        className="hidden lg:flex"
      />
      <div className="flex flex-col items-center mt-14 justify-center lg:w-1/5">
        <p className="text-center text-3xl mt-2 mb-1 font-semibold">
          Want to Sponsor us?
        </p>
        <div className="border-b-4 border-[#F4A68D] w-4/5 md:w-3/5 lg:w-2/5 mx-auto mb-6"></div>
        <Link
          href="/sponsors"
          className="w-3/5 md:w-2/5 lg:w-full  flex justify-center items-center gap-2 text-center font-semibold text-2xl border rounded-full hover:bg-[#F4A68D] hover:text-white border-[#F4A68D] px-4 py-2 "
        >
          Click here! <AiFillRightCircle className="lg:hidden xl:flex" />
        </Link>
      </div>
    </div>
  );
};

export default SponsorCarousel;
