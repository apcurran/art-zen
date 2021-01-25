"use strict";

const express = require("express");
const router = express.Router();
const multer = require("multer");

const fileUpload = multer();

const usersController = require("../controllers/users-controller");
const verifyAuth = require("../middleware/verify-auth");

// POST new account follower
router.post("/:userId/followers", verifyAuth, usersController.postUserFollower); // tested
// GET user info
router.get("/:userId", verifyAuth, usersController.getUserInfo);
// PATCH user account
router.patch("/:userId", verifyAuth, fileUpload.single("avatarImg"), usersController.patchUser); // tested
// DELETE account follower
router.delete("/:userId/followers/:followerId", verifyAuth, usersController.deleteUserFollower); // tested
// DELETE user account
router.delete("/:userId", verifyAuth, usersController.deleteUser); // tested

module.exports = router;