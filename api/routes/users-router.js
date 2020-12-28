"use strict";

const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users-controller");
const verifyAuth = require("../middleware/verify-auth");

// POST new account follower
router.post("/:userId/followers", verifyAuth, usersController.postUserFollower);
// POST new account
router.post("/", verifyAuth, usersController.postNewUser);
// PATCH user account
router.patch("/:id", verifyAuth, usersController.patchUser);
// DELETE user account
// router.delete("/users/:id", verifyAuth, artworksController.deleteUser);
// DELETE account follower
router.delete("/:userId/followers/:followerId", verifyAuth, usersController.deleteUserFollower);

module.exports = router;