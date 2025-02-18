import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Stepper, Step, Select } from "../component";
import Input from "../UI/Input";
import axios from "axios";

const Climate = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [city, setCity] = useState("Fetching location...");
  const [weatherData, setWeatherData] = useState([]);
  const [irrigationAdvice, setIrrigationAdvice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            setCity(
              data.address.city ||
                data.address.town ||
                data.address.village ||
                "Unknown Location"
            );
          } catch (err) {
            setError("Failed to fetch location data.");
          }
        },
        () => {
          setError("Location access denied. Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const onSubmit = async (data) => {
    setSubmittedData(data);
    setFormSubmitted(true);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/weather/irrigation`,
        {
          city,
          crop: data.crop,
          soil: data.soil,
          irrigation_date: data.irrigation_date,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.status) {
        setIrrigationAdvice(response.data.data.irrigation_advice);
        setWeatherData(response.data.data.weather_data);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setError("Failed to fetch weather data. Please try again later.");
    }
  };

  return (
    <div className="font-['Navbar']">
      <form onSubmit={handleSubmit(onSubmit)}>
        {!formSubmitted ? (
          <Stepper
            initialStep={1}
            onFinalStepCompleted={handleSubmit(onSubmit)}
          >
            <Step>
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold mb-4">Crop Information</h2>
                <Input
                  label="Crop Name"
                  {...register("crop", { required: "Crop name is required" })}
                  error={errors.crop?.message}
                />
                <Select
                  label="What is your soil type?"
                  options={["Select", "sandy", "loamy", "clayey"]}
                  {...register("soil", {
                    validate: (value) =>
                      value !== "Select" || "Please select a soil type",
                  })}
                  error={errors.soil?.message}
                />
                <Input
                  label="Date of Irrigation"
                  type="date"
                  {...register("irrigation_date", {
                    required: "Date is required",
                  })}
                  error={errors.irrigation_date?.message}
                />
              </div>
            </Step>
          </Stepper>
        ) : (
          <div className="text-center p-6">
            <h1 className="text-2xl font-bold">{city}</h1>

            {/* Irrigation Advice Card */}
            <div className="mt-4 p-4 bg-blue-100 text-blue-800 border border-blue-400 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">Irrigation Advice</h2>
              <p className="text-gray-700 italic">{irrigationAdvice}</p>
            </div>

            {/* Weather Cards */}
            {weatherData.length > 0 && (
              <div className="mt-6">
                {/* Current Day Weather - Large Card */}
                <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 mb-4">
                  <h2 className="text-xl font-bold mb-2">Today’s Weather</h2>
                  <p className="text-gray-600">{weatherData[0].date}</p>
                  <p className="text-gray-700 font-medium">{weatherData[0].description}</p>
                  <div className="flex justify-around mt-2">
                    <p>🌡️ {weatherData[0].temp.toFixed(2)}°C</p>
                    <p>💧 {weatherData[0].humidity}%</p>
                    <p>🌬️ {weatherData[0].wind_speed} m/s</p>
                  </div>
                </div>

                {/* Next 4 Days Weather - Small Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {weatherData.slice(1, 5).map((day, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-100 shadow-md rounded-lg border border-gray-300 text-gray-800"
                    >
                      <h3 className="font-bold">{day.date}</h3>
                      <p className="text-gray-600">{day.description}</p>
                      <div className="flex justify-between mt-2">
                        <p>🌡️ {day.temp.toFixed(2)}°C</p>
                        <p>💧 {day.humidity}%</p>
                      </div>
                      <p className="text-sm mt-1">🌬️ {day.wind_speed} m/s</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setFormSubmitted(false)}
            >
              Go Back
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Climate;
