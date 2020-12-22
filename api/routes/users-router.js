"use strict";

const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users-controller");
// TODO pull in verification middleware

router.get("/artworks", usersController.getArtworks);

module.exports = router;