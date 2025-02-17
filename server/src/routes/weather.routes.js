import { Router } from "express";
const router = Router();

import { postWeather } from "../controllers/weather.controller.js";
import { validateWeather } from "../middlewares/weather.middleware.js";
import verifyToken from "../middlewares/Verify.middleware.js";

// add verify token after testing phase
router.post("/irrigation", validateWeather, postWeather);

export default router;