import express from "express";
import { googleLogin } from "../controllers/google.controller.js";
import verifyToken from "../middlewares/Verify.middleware.js";
import  { validateRegisterUser, validateLoginUser } from "../middlewares/user.middleware.js";
import { registerUser, loginUser, logOutUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/google", googleLogin);
router.post('/register', validateRegisterUser, registerUser);
router.post('/login', validateLoginUser, loginUser);
router.post('/logout', verifyToken, logOutUser);

export default router;
