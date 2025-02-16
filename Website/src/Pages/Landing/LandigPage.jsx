import React from "react";
import { GridDistortion } from "../../components/component";
import Aurora from "../../components/Animated/Aurora";
import landingImage from "../../assets/images/landing.jpg";

const LandigPage = () => {
  document.title = "Landing Page";

  return (
    <div className="w-full min-h-screen flex justify-between items-center relative ">
      {/* Grid Distortion with Image */}
      <div className="w-full h-screen relative  ">
        <GridDistortion
          // imageSrc="https://picsum.photos/1920/1080?grayscale"
          // imageSrc= {landingImage}
          imageSrc="https://plus.unsplash.com/premium_photo-1661907005604-cec7ffb6a042?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          grid={10}
          mouse={0.1}
          strength={0.15}
          relaxation={0.9}
          className="custom-class"
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-start text-white text-4xl font-bold text-center mx-auto px-4 sm:px-6 lg:px-20 lg:py-2">
          <h1>Utilization of Technology in Agriculture</h1>
        </div>
      </div>
    </div>
  );
};

export default LandigPage;
