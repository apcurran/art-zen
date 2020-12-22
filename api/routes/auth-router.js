"use strict";

const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth-controller");
// TODO pull in verification middleware

router.post("/signup", authController.postUserSignup);

router.post("/login", authController.postUserLogin);

module.exports = router;