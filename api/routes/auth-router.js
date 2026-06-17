import express from "express";

import * as authController from "../controllers/auth-controller.js";

const router = express.Router();

router.post("/sign-up", authController.postUserSignup); // tested

router.post("/log-in", authController.postUserLogin); // tested

export default router;
