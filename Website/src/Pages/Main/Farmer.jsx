import {
  Bell,
  Leaf,
  Settings,
  Thermometer,
  Bot,
  ArrowRight,
} from "lucide-react";
import { VscAccount, VscArchive, VscHome } from "react-icons/vsc";
import Dock from "../../components/Animated/Dock";
import NutrientChart from "../../components/UI/NutrientChart";
import WeatherCard from "../../components/UI/WeatherCard";
import { FaUser } from "react-icons/fa";
import { Sun, CloudSun, Moon } from "lucide-react";
import Card from "../../components/UI/Card";
import RotatingText from "../../components/Animated/RotatingText";
import { Button, GridDistortion } from "../../components/component";
import { Carousel } from "../../components/component";
import { useState } from "react";

const Farmer = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const botOptions = [
    {
      name: "Climate Bot",
      image:
        "https://images.unsplash.com/photo-1594771804886-a933bb2d609b?q=80&w=2082&auto=format&fit=crop",
    },
    {
      name: "Disease Bot",
      image:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Recommendation Bot",
      image:
        "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1887&auto=format&fit=crop",
    },
    {
      name: "Voice Assist",
      image:
        "https://images.unsplash.com/photo-1579546929662-711aa81148cf?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12)
      return {
        text: "Good Morning",
        icon: <Sun className="w-6 h-6 text-yellow-500" />,
      };
    if (hour < 18)
      return {
        text: "Good Afternoon",
        icon: <CloudSun className="w-6 h-6 text-orange-500" />,
      };
    return {
      text: "Good Evening",
      icon: <Moon className="w-6 h-6 text-blue-500" />,
    };
  };

  const { text, icon } = getGreeting();

  return (
    <div className="w-full h-full">
      <div className="flex flex-col w-full h-full lg:flex-row lg:items-center">
        <div className="left w-full h-full lg:w-[55%] relative">
          <div
            className="absolute top-[50%] xl:top-[30%] -translate-y-1/2 px-4 sm:px-6 md:px-10 lg:px-16 text-black z-10"
            style={{ pointerEvents: "none" }}
          >
            <div>
              <Button
                variant="default"
                className="font-extralight bg-zinc-200 backdrop-blur-3xl border border-white"
              >
                Agriculture Technology
              </Button>
            </div>
            <div>
              <div className="masker">
                <div className="w-fit flex items-baseline">
                  <h1 className="uppercase text-4xl md:text-5xl lg:text-6xl leading-[48px] md:leading-[115px]">
                    Revolutionizing
                  </h1>
                </div>
              </div>
              <div className="masker">
                <div className="w-fit flex items-baseline">
                  <h1 className="uppercase text-4xl md:text-5xl lg:text-6xl leading-[48px] md:leading-[30px] lg:leading-[25px]">
                    Agriculture Through
                  </h1>
                </div>
              </div>
              <div className="masker">
                <div className="w-fit flex items-baseline">
                  <RotatingText
                    texts={[
                      "Krushi Yantra",
                      "Climate Bot",
                      "Disease Bot",
                      "Voice Assist",
                      "Gov Schemes",
                      "Agriculture",
                    ]}
                    mainClassName="uppercase text-4xl md:text-5xl lg:text-6xl leading-[48px] md:leading-[95px]"
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={3500}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button
                variant="black"
                className="px-8 py-2 font-semibold rounded-lg"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
        <div className="right w-full h-full lg:w-[43%] px-6 md:px-10 py-6">
          <div className="img h-full w-full rounded-2xl relative z-0">
            <div className="w-full h-full object-cover rounded-2xl">
              <GridDistortion
                key={currentImage}
                imageSrc={botOptions[currentImage].image}
                grid={10}
                mouse={0.1}
                strength={0.15}
                relaxation={0.9}
                className="custom-class rounded-2xl"
              />
              {/* Go To Button */}
              <div className="absolute bottom-8 left-8 z-10">
                <button
                  className="group flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg hover:bg-[#C7E6A5] transition-all duration-300"
                  onClick={() => {
                    /* Add your navigation logic here */
                  }}
                >
                  <span className="font-semibold text-black group-hover:text-white transition-colors duration-300">
                    Go to {botOptions[currentImage].name}
                  </span>
                  <ArrowRight className="w-5 h-5 text-black group-hover:text-white transition-colors duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 absolute right-8 top-1/2 transform -translate-y-1/2">
          {botOptions.map((bot, index) => (
            <div key={index} className="group relative flex items-center">
              <button
                onClick={() => setCurrentImage(index)}
                className={`w-12 h-12 rounded-full ${
                  currentImage === index
                    ? "bg-[#C7E6A5] text-black"
                    : "bg-white text-[#C7E6A5]"
                } shadow-lg hover:scale-110 transition-transform duration-200 flex items-center justify-center font-semibold z-10`}
              >
                <Bot className="w-6 h-6" />
              </button>
              <div
                className={`absolute right-16 bg-white text-black py-2 px-4 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap ${
                  currentImage === index ? "text-black font-semibold" : ""
                }`}
              >
                {bot.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-full bg-amber-200"></div>
    </div>
  );
};

export default Farmer;
