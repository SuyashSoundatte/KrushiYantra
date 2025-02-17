import { Bell, Leaf, Settings, Thermometer } from "lucide-react";
import { VscAccount, VscArchive, VscHome } from "react-icons/vsc";
import Dock from "../../components/Animated/Dock";
import NutrientChart from "../../components/UI/NutrientChart";
import WeatherCard from "../../components/UI/WeatherCard";
import { FaUser } from "react-icons/fa";
import { Sun, CloudSun, Moon } from "lucide-react";

const Farmer = () => {
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

  const dockItems = [
    {
      icon: <VscHome size={18} />,
      label: "Home",
      onClick: () => alert("Home!"),
    },
    {
      icon: <Leaf size={18} />,
      label: "Fields",
      onClick: () => alert("Fields!"),
    },
    {
      icon: <VscArchive size={18} />,
      label: "Archive",
      onClick: () => alert("Archive!"),
    },
    {
      icon: <VscAccount size={18} />,
      label: "Profile",
      onClick: () => alert("Profile!"),
    },
    {
      icon: <Settings size={18} />,
      label: "Settings",
      onClick: () => alert("Settings!"),
    },
  ];

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      {/* <div className="w-16">
        <Dock items={dockItems} panelWidth={64} baseItemSize={40} magnification={56} />
      </div> */}

      <div className="flex-1 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="flex items-center gap-4 text-2xl font-bold text-gray-900">
                {text} Krushi {icon}
              </h1>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <WeatherCard
              icon={<Thermometer className="h-6 w-6" />}
              label="Air Temp"
              value="+24"
              unit="°C"
              status="Good"
              bgColor="bg-blue-50"
            />
            {/* <SpotlightCard
              className="custom-spotlight-card"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <WeatherCard
                className="w-full"
                icon={<Thermometer className="h-6 w-6" />}
                label="Air Temp"
                value="+24"
                unit="°C"
                status="Good"
                bgColor="bg-blue-50"
              />
            </SpotlightCard> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farmer;
