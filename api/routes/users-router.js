"use strict";

const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users-controller");
const verifyAuth = require("../middleware/verify-auth");

// POST new account follower
router.post("/:userId/followers", verifyAuth, usersController.postUserFollower);
// PATCH user account
router.patch("/:userId", verifyAuth, usersController.patchUser);
// DELETE account follower
router.delete("/:userId/followers/:followerId", verifyAuth, usersController.deleteUserFollower);
// DELETE user account
router.delete("/:userId", verifyAuth, usersController.deleteUser);

module.exports = router;