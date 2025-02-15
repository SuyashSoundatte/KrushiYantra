import { Router } from "express";
const router = Router();

import verifyToken from "../middlewares/Verify.middleware.js";
import { getUser, getUserById, getAllUserOnline } from "../controllers/user.controller.js";

router.get("/users/me", verifyToken, getUser);
router.get("/user/:id", verifyToken, getUserById);
router.get("/users/online", verifyToken, getAllUserOnline);

export default router;