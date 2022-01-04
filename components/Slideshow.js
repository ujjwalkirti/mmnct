import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Slideshow() {
  return (
    <div className="w-4/6 h-64 m-2">
      <Carousel
        infiniteLoop={true}
        stopOnHover={true}
        useKeyboardArrows={true}
        showStatus={false}
        autoPlay={true}
        interval={3000}
        showThumbs={false}
      >
        <div className="relative">
          <div className="absolute t-0 z-20 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black"></div>
          <img src="carousel/c-1.jpg" className="h-full" />
        </div>
        <div>
          <div className="absolute t-0 z-20 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black"></div>
          <img src="carousel/c-2.jpg" className="h-full" />
        </div>
        <div>
          <div className="absolute t-0 z-20 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black"></div>
          <img src="carousel/c-3.jpg" />
        </div>
        <div>
          <div className="absolute t-0 z-20 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black"></div>
          <img src="carousel/c-4.jpg" />
        </div>
        <div>
          <div className="absolute t-0 z-20 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black"></div>
          <img src="carousel/c-5.jpg" />
        </div>
        <div>
          <div className="absolute t-0 z-20 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black"></div>
          <img src="carousel/c-6.jpg" />
        </div>
      </Carousel>
    </div>
  );
}

export default Slideshow;
