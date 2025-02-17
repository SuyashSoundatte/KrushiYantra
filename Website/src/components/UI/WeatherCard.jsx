import React from "react";
import {
  Sun,
  CloudRain,
  CloudSnow,
  Cloud,
  CloudLightning,
  Wind,
  Droplets,
} from "lucide-react";
import { SpotlightCard } from "../component";

const WeatherCard = () => {
  // Dummy weather data
  const dummyWeatherData = {
    weather: [
      {
        description: "scattered clouds",
        icon: "03d",
      },
    ],
    main: {
      temp: 27,
      humidity: 65,
    },
    wind: {
      speed: 3.5,
    },
  };

  const getWeatherIcon = (weatherCode) => {
    const icons = {
      "01d": <Sun className="w-16 h-16 text-yellow-400" />,
      "01n": <Sun className="w-16 h-16 text-gray-400" />,
      "02d": <Cloud className="w-16 h-16 text-gray-400" />,
      "02n": <Cloud className="w-16 h-16 text-gray-400" />,
      "03d": <Cloud className="w-16 h-16 text-gray-500" />,
      "03n": <Cloud className="w-16 h-16 text-gray-500" />,
      "04d": <Cloud className="w-16 h-16 text-gray-600" />,
      "04n": <Cloud className="w-16 h-16 text-gray-600" />,
      "09d": <CloudRain className="w-16 h-16 text-blue-400" />,
      "09n": <CloudRain className="w-16 h-16 text-blue-400" />,
      "10d": <CloudRain className="w-16 h-16 text-blue-500" />,
      "10n": <CloudRain className="w-16 h-16 text-blue-500" />,
      "11d": <CloudLightning className="w-16 h-16 text-purple-500" />,
      "11n": <CloudLightning className="w-16 h-16 text-purple-500" />,
      "13d": <CloudSnow className="w-16 h-16 text-blue-300" />,
      "13n": <CloudSnow className="w-16 h-16 text-blue-300" />,
      "50d": <Wind className="w-16 h-16 text-gray-400" />,
      "50n": <Wind className="w-16 h-16 text-gray-400" />,
    };
    return icons[weatherCode] || <Sun className="w-16 h-16 text-yellow-400" />;
  };

  return (
    <>
      <SpotlightCard
        className="custom-spotlight-card"
        spotlightColor="rgba(255, 240, 80, 0.25)"
      >
        <div className="w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
          <div className="bg-[#539EF6] py-6 px-4 text-white">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">Weather</h2>
                <p className="text-sm opacity-90">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              {getWeatherIcon(dummyWeatherData.weather[0].icon)}
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-end">
                <span className="text-5xl font-bold">
                  {Math.round(dummyWeatherData.main.temp)}°C
                </span>
              </div>

              <p className="text-lg capitalize">
                {dummyWeatherData.weather[0].description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-6 bg-white">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-500">Humidity</span>
              </div>
              <p className="text-lg font-semibold">
                {dummyWeatherData.main.humidity}%
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Wind className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-500">Wind Speed</span>
              </div>
              <p className="text-lg font-semibold">
                {Math.round(dummyWeatherData.wind.speed)} m/s
              </p>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </>
  );
};

export default WeatherCard;
