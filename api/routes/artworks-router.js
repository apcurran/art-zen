"use strict";

const express = require("express");
const router = express.Router();

const artworksController = require("../controllers/artworks-controller");
const verifyAuth = require("../middleware/verify-auth");

// GET specific user artworks based on user id
router.get("/users/:userId", artworksController.getUserArtworks);
// GET search results for artwork title or genre
router.get("/search", artworksController.getSearch);
// GET specific artwork based on artwork id
router.get("/:artworkId", artworksController.getUserArtwork);
// GET all artworks
router.get("/", artworksController.getArtworks);
// POST new artwork like
router.get("/:artworkId/likes", artworksController.postUserArtworkLike);
// POST new artwork comment
router.post("/:id/comments", verifyAuth, artworksController.postUserArtworkComment);
// POST new artwork favorite
router.post("/:id/favorites", verifyAuth, artworksController.postUserArtworkFavorite);
// POST new artwork
router.post("/", verifyAuth, artworksController.postUserArtwork);
// DELETE artwork like
router.delete("/:artworkId/likes/:likeId", verifyAuth, artworksController.deleteUserArtworkLike);
// DELETE artwork favorite
router.delete("/:artworkId/favorites/:favoriteId", verifyAuth, artworksController.deleteUserArtworkFavorite);
// DELETE artwork
router.delete("/:artworkId", verifyAuth, artworksController.deleteUserArtwork);

module.exports = router;