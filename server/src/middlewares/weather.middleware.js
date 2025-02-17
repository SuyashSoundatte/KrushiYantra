import joi from "joi";
import ApiError from "../utils/ApiError.js";

const weatherSchema = joi.object({
  city: joi.string().required(),
  crop: joi.string().required(),
  soil: joi.string().required(),
  irrigation_date: joi.string().pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
});

const validateWeather = (req, res, next) => {
  const { error } = weatherSchema.validate(req.body);
  
  if (error) {
    throw new ApiError(400, "Invalid weather data", error.details);
  }

  next();
}

export { validateWeather };