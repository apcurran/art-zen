"use strict";

const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users-controller");
const verifyAuth = require("../middleware/verify-auth");

// POST new account follower
router.post("/users/:userId/followers", verifyAuth, usersController.postUserFollower);
// POST new account
router.post("/", verifyAuth, usersController.postNewUser);
// PATCH user account
// router.patch("/users/:id", verifyAuth, artworksController.patchUser);
// DELETE account follower
// router.delete("/users/:userId/followers/:followerId", verifyAuth, artworksController.deleteUserFollower);
// DELETE user account
// router.delete("/users/:id", verifyAuth, artworksController.deleteUser);

module.exports = router;