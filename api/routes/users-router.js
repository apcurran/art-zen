import express from "express";

import * as usersController from "../controllers/users-controller.js";
import verifyAuth from "../middleware/verify-auth.js";

const router = express.Router();

// GET subscriptions artworks
router.get(
    "/:userId/subscriptions",
    verifyAuth,
    usersController.getSubscriptions,
);
// POST new account follower
router.post("/:userId/followers", verifyAuth, usersController.postUserFollower); // tested
// GET user info
router.get("/:userId", verifyAuth, usersController.getUserInfo);
// PATCH user account
router.patch("/:userId", verifyAuth, usersController.patchUser); // tested
// DELETE account follower
router.delete(
    "/:userId/followers/:followerId",
    verifyAuth,
    usersController.deleteUserFollower,
); // tested
// DELETE user account
router.delete("/:userId", verifyAuth, usersController.deleteUser); // tested

export default router;
