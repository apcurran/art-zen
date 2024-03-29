"use strict";

const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth-controller");

router.post("/sign-up", authController.postUserSignup); // tested

router.post("/log-in", authController.postUserLogin); // tested

module.exports = router;