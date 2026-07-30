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
router.post("/:userId/followers", verifyAuth, usersController.postUserFollower);
// GET user info
router.get("/:userId", verifyAuth, usersController.getUserInfo);
// PATCH user account
router.patch("/:userId", verifyAuth, usersController.patchUser);
// DELETE account follower
router.delete(
    "/:userId/followers/:followerId",
    verifyAuth,
    usersController.deleteUserFollower,
);
// DELETE user account
router.delete("/:userId", verifyAuth, usersController.deleteUser);

export default router;
