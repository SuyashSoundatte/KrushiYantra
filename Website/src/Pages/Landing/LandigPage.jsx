import React from "react";
import { useTranslation } from "react-i18next";
import { GridDistortion } from "../../components/component";
import Aurora from "../../components/Animated/Aurora";
// import landingImage from "../../assets/images/landing.jpg";
import { Button } from "../../components/component";
import RotatingText from "../../components/Animated/RotatingText";
import FlowingMenu from "../../components/Animated/FlowingMenu";
import TiltedCard from "../../components/Animated/TitleCard";
import CircularText from "../../components/Animated/CircularText";
import Products from "../../components/Products";

const LandingPage = () => {
  const { t } = useTranslation(); // Initialize translation function
  document.title = t("landing_page_title"); // Update page title dynamically

  const demoItems = [
    {
      link: "#",
      text: "Mojave",
      image: "https://picsum.photos/600/400?random=1",
    },
    {
      link: "#",
      text: "Sonoma",
      image: "https://picsum.photos/600/400?random=2",
    },
    {
      link: "#",
      text: "Monterey",
      image: "https://picsum.photos/600/400?random=3",
    },
    {
      link: "#",
      text: "Sequoia",
      image: "https://picsum.photos/600/400?random=4",
    },
  ];
  return (
    <div className="relative w-full">
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
          <div
            className="absolute w-full top-[50%] xl:top-[65%] -translate-y-1/2 px-4 sm:px-6 md:px-10 lg:px-16 text-white"
            style={{
              pointerEvents: "none",
            }}
          >
            {/* Join Button */}
            <div className="mb-6 sm:mb-8">
              <Button
                variant="default"
                className="text-white text-sm sm:text-base backdrop-blur-3xl font-thin border border-white"
              >
                {t("join_farmers")}
              </Button>
            </div>

            {/* Main Text */}
            <div className="font-['textStruct']">
              <div className="masker">
                <div className="w-fit flex items-baseline">
                  <h1 className="font-['textStruct'] uppercase text-5xl md:text-8xl lg:text-9xl leading-[48px] md:leading-[95px]">
                    {t("get_into_ai")}
                  </h1>
                </div>
              </div>

              <div className="masker">
                <div className="w-fit flex items-baseline">
                  <h1 className="font-['textStruct'] uppercase text-5xl md:text-8xl lg:text-9xl leading-[48px] md:leading-[95px] mr-4">
                    {t("world")}
                  </h1>
                  <RotatingText
                    texts={t("rotating_text", { returnObjects: true })}
                    mainClassName="uppercase text-5xl md:text-8xl lg:text-9xl leading-[48px] md:leading-[95px] font-['textStruct']"
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={3500} // Faster speed (3s per word)
                  />
                </div>
              </div>
            </div>

            {/* Info Text */}
            <div className="mt-8">
              <p className="text-xs sm:text-sm md:text-base w-full sm:w-3/4 md:w-1/2 leading-relaxed">
                {t("info_text", { returnObjects: true })}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-5 md:px-20 py-10 md:py-20">
        <div className="header bg-pink-300 text-4xl md:text-7xl font-['Navbar'] text-center md:text-left">
          <h1>
            <span>{t("take_a_look")}</span> {t("cutting_edge", { returnObjects: true })}
          </h1>
          <h1>
            {t("services_for_you", { returnObjects: true })}
          </h1>
        </div>
        <div className="w-full h-fit mt-10">
          <Products />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
