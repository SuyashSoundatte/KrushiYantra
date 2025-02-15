import express from "express";
import { googleLogin } from "../controllers/google.controller.js";

const router = express.Router();

router.get("/google", googleLogin);

export default router;
