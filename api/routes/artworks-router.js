"use strict";

const express = require("express");
const router = express.Router();

const artworksController = require("../controllers/artworks-controller");
// TODO: pull in verification middleware

// GET specific user artworks based on user id
router.get("/users/:id", artworksController.getUserArtworks);
// GET search results for artwork title or genre
router.get("/search", artworksController.getSearch);
// GET specific artwork based on artwork id
router.get("/:id", artworksController.getUserArtwork);
// GET all artworks
router.get("/", artworksController.getArtworks);
// POST new account follower
router.post("/users/:id/followers", artworksController.postUserFollower);
// POST new artwork comment
router.post("/:id/comments", artworksController.postUserArtworkComment);
// POST new artwork
router.post("/", artworksController.postUserArtwork);
// PATCH user account
router.patch("/users/:id", artworksController.patchUser);
// DELETE account follower
router.delete("/users/:id/followers/:id", artworksController.deleteUserFollower);
// DELETE user account
router.delete("/users/:id", artworksController.deleteUser);
// DELETE artwork
router.delete("/:id", artworksController.deleteUserArtwork);

module.exports = router;