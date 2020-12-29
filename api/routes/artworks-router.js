"use strict";

const express = require("express");
const router = express.Router();

const artworksController = require("../controllers/artworks-controller");
const verifyAuth = require("../middleware/verify-auth");

// GET specific user artworks based on user id
router.get("/users/:userId", artworksController.getUserArtworks); // tested
// GET search results for artwork title or genre
router.get("/search", artworksController.getSearch); // tested
// GET specific artwork based on artwork id
router.get("/:artworkId", artworksController.getUserArtwork); // tested
// GET all artworks
router.get("/", artworksController.getArtworks); // tested
// POST new artwork like
router.post("/:artworkId/likes", verifyAuth, artworksController.postUserArtworkLike); // tested
// POST new artwork comment
router.post("/:artworkId/comments", verifyAuth, artworksController.postUserArtworkComment); // tested
// POST new artwork favorite
router.post("/:artworkId/favorites", verifyAuth, artworksController.postUserArtworkFavorite); // tested
// POST new artwork
router.post("/", verifyAuth, artworksController.postUserArtwork); // tested
// DELETE artwork like
router.delete("/:artworkId/likes/:likeId", verifyAuth, artworksController.deleteUserArtworkLike); // tested
// DELETE artwork favorite
router.delete("/:artworkId/favorites/:favoriteId", verifyAuth, artworksController.deleteUserArtworkFavorite); // tested
// DELETE artwork
router.delete("/:artworkId", verifyAuth, artworksController.deleteUserArtwork); // tested

module.exports = router;