"use strict";

const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users-controller");
// TODO pull in verification middleware

// GET all artworks
router.get("/artworks", usersController.getArtworks);
// GET specific artwork based on artwork id
router.get("/artworks/:id", usersController.getUserArtwork);
// GET specific user artworks based on user id
router.get("/:id/artworks", usersController.getUserArtworks);
// POST new artwork
router.post("/artworks", usersController.postUserArtwork);

module.exports = router;