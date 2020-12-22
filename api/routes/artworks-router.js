"use strict";

const express = require("express");
const router = express.Router();

const artworksController = require("../controllers/artworks-controller");
// TODO: pull in verification middleware

// GET all artworks
router.get("/", artworksController.getArtworks);
// GET specific artwork based on artwork id
router.get("/:id", artworksController.getUserArtwork);
// GET specific user artworks based on user id
router.get("/users/:id", artworksController.getUserArtworks);
// POST new artwork
router.post("/", artworksController.postUserArtwork);
// POST new comment
router.post("/:id/comments", artworksController.postUserArtworkComment);
// POST new account follower
router.post("/users/:id/followers", artworksController.postUserFollower);
// PATCH user account
router.patch("/users/:id", artworksController.patchUser);
// DELETE user account
router.delete("/users/:id", artworksController.deleteUser);
// DELETE artwork
router.delete("/:id", artworksController.deleteUserArtwork);
// DELETE account follower
router.delete("/users/:id/followers/:id", artworksController.deleteUserFollower);

module.exports = router;