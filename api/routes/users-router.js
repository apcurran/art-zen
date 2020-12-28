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
// DELETE account follower
router.delete("/:userId/followers/:followerId", verifyAuth, usersController.deleteUserFollower);
// DELETE user account
router.delete("/:id", verifyAuth, usersController.deleteUser);

module.exports = router;