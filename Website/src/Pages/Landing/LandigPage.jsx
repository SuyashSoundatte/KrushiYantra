import React from "react";
import { GridDistortion } from "../../components/component";
import Aurora from "../../components/Animated/Aurora";
import landingImage from "../../assets/images/landing.jpg";
import { Button } from "../../components/component";

const LandingPage = () => {
  document.title = "Landing Page";
  return (
    <div className="relative w-full min-h-screen">
      <div className="w-full p-4">
        <div className="relative w-full h-screen">
        {/* Grid Distortion with Image */}
          <GridDistortion
            imageSrc="https://images.unsplash.com/photo-1563201515-adbe35c669c5?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            grid={10}
            mouse={0.1}
            strength={0.15}
            relaxation={0.9}
            className="custom-class invert-[-50] rounded-lg"
          />

          {/* Content Overlay */}
          <div className="absolute w-full top-[50%] xl:top-[65%] -translate-y-1/2 px-4 sm:px-6 md:px-10 lg:px-16 text-white"
            style={{
              pointerEvents: "none"
            }}
          >
            {/* Join Button */}
            <div className="mb-6 sm:mb-8">
              <Button
                variant="default"
                className="text-white text-sm sm:text-base backdrop-blur-2xl font-thin border border-white"
              >
                Join the 1000+ farmers
              </Button>
            </div>

            {/* Main Text */}
            <div className="font-['textStruct']">
              {["Get Into the World", "Of Agriculture"].map((item, index) => (
                <div key={index} className="masker">
                  <div className="w-fit flex items-baseline">
                    <h1 className="font-['textStruct'] uppercase text-5xl md:text-8xl lg:text-9xl leading-[48px] md:leading-[95px]">
                      {item}
                    </h1>
                    {/* {index === 1 && (
                      <Button
                        variant="default"
                        className="text-[#039812] -tracking-normal bg-[#F7F7F7]  backdrop-blur-2xl font-thin border-[1px] border-white mb-4"
                      >
                        Join
                      </Button>
                    )} */}
                  </div>
                </div>
              ))}
            </div>  

            {/* Info Text */}
            <div className="mt-8">
              <p className="text-xs sm:text-sm md:text-base w-full sm:w-3/4 md:w-1/2 leading-relaxed">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere sed fugit dolorem modi tempore ullam consequuntur qui necessitatibus quos illo vel accusantium laudantium nam optio cupiditate asperiores, dolore numquam eaque sapiente? Minima!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen w-full bg-purple-400"></div>
    </div>
  );
};

export default LandingPage;