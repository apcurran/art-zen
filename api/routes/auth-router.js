"use strict";

const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth-controller");

router.post("/signup", authController.postUserSignup); // tested

router.post("/login", authController.postUserLogin); // tested

module.exports = router;