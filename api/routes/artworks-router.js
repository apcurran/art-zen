"use strict";

const express = require("express");
const router = express.Router();

const artworksController = require("../controllers/artworks-controller");
// TODO pull in verification middleware

// GET all artworks
router.get("/", artworksController.getArtworks);
// GET specific artwork based on artwork id
router.get("/:id", artworksController.getUserArtwork);
// GET specific user artworks based on user id
router.get("/users/:id", artworksController.getUserArtworks);
// POST new artwork
router.post("/", artworksController.postUserArtwork);

module.exports = router;