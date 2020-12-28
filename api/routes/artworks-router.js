"use strict";

const express = require("express");
const router = express.Router();

const artworksController = require("../controllers/artworks-controller");
// TODO: pull in verification middleware
const verifyAuth = require("../middleware/verify-auth");

// GET specific user artworks based on user id
router.get("/users/:id", artworksController.getUserArtworks);
// GET search results for artwork title or genre
router.get("/search", artworksController.getSearch);
// GET specific artwork based on artwork id
router.get("/:id", artworksController.getUserArtwork);
// GET all artworks
router.get("/", artworksController.getArtworks);
// POST new account follower
router.post("/users/:id/followers", verifyAuth, artworksController.postUserFollower);
// POST new artwork comment
router.post("/:id/comments", verifyAuth, artworksController.postUserArtworkComment);
// POST new artwork
router.post("/", verifyAuth, artworksController.postUserArtwork);
// PATCH user account
router.patch("/users/:id", verifyAuth, artworksController.patchUser);
// DELETE account follower
router.delete("/users/:userId/followers/:followerId", verifyAuth, artworksController.deleteUserFollower);
// DELETE user account
router.delete("/users/:id", verifyAuth, artworksController.deleteUser);
// DELETE artwork
router.delete("/:id", verifyAuth, artworksController.deleteUserArtwork);

module.exports = router;