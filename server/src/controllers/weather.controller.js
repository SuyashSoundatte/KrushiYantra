import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import axios from "axios";
import logger from "../utils/logger.js";

const postWeather = asyncHandler(async (req, res) => {
  const { city, crop, soil, irrigation_date } = req.body;

  if (!city || !crop || !soil || !irrigation_date) {
    throw new ApiError(400, "All fields are required!");
  }

  const data = {
    city,
    crop,
    soil,
    last_irrigation: irrigation_date, 
  };

  const url = "http://localhost:5050/predict/weather"; 

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // logger.info("Irrigation Data Fetched Successfully");

    return res.status(200).json(new ApiResponse(200, response.data, "Weather Prediction Fetched!"));
  } catch (error) {
    // logger.error("Error fetching ML prediction", error);
    throw new ApiError(500, "ML Model Internal Server Error!");
  }
});

export { postWeather };
