"use strict";

const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users-controller");
// TODO pull in verification middleware

router.get("/artworks", usersController.getArtworks);

router.get("/artworks/:id", usersController.getUserArtwork);

module.exports = router;