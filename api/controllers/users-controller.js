"use strict";

const { db } = require("../../db/index");
const { streamUploadToCloudinary } = require("../../utils/stream-upload-to-cloudinary");
const { userPatchValidation } = require("../validation/users-validation");

// GET controller
async function getUserInfo(req, res, next) {
    const { userId } = req.params;
    
    try {
        const userInfo = await db.one(`
            SELECT app_user.username, app_user.bio_description, app_user.avatar_img_url
            FROM app_user
            WHERE app_user.user_id = $1
        `, [userId]);

        res.status(200).json(userInfo);

    } catch (err) {
        next(err);
    }
}

// GET user subscriptions
async function getSubscriptions(req, res, next) {
    const { userId } = req.params;

    try {
        const subscriptionsArtworks = await db.manyOrNone(`
            SELECT
                artwork.artwork_id, artwork.user_id, artwork.title, artwork.img_url, artwork.genre, artwork.created_at, artwork.img_alt_txt,
                app_user.username
            FROM artwork
            INNER JOIN follower ON artwork.user_id = follower.account_user_id
            INNER JOIN app_user ON follower.account_user_id = app_user.user_id
            WHERE follower.follower_user_id = $1
        `, [userId]);

        res.status(200).json({ subscriptionsArtworks });

    } catch (err) {
        next(err);
    }
}

// POST controller
async function postUserFollower(req, res, next) {
    const { userId } = req.params;
    const followerId = req.user._id;

    try {
        const addedFollower = await db.one(`
            INSERT INTO follower
                (follower_user_id, account_user_id)
            VALUES
                ($1, $2)
            RETURNING follower.follower_user_id
        `, [followerId, userId]);
    
        res.status(201).json({ addedFollower });
        
    } catch (err) {
        next(err);
    }
}

// PATCH controller
async function patchUser(req, res, next) {
    try {
        const { bioDesc } = await userPatchValidation(req.body);
        // If user did not send a new img to replace avatar img with, keep the old one.
        const avatarImgUrl = req.file ? (await streamUploadToCloudinary(req, "art-zen-app/user-avatars")).secure_url : null;
        const userId = req.user._id;

        await db.none(`
            UPDATE app_user
            SET
                bio_description = COALESCE($1, bio_description),
                avatar_img_url = COALESCE($2, avatar_img_url)
            WHERE app_user.user_id = $3
        `, [bioDesc, avatarImgUrl, userId]);

        res.status(200).json({ message: "User info updated." });

    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({ error: err.message });
        }

        next(err);
    }
}

// DELETE controllers
async function deleteUserFollower(req, res, next) {
    const { userId } = req.params;
    const followerId = req.user._id;

    try {
        await db.none(`
            DELETE FROM follower
            WHERE (follower.follower_user_id = $1) AND (follower.account_user_id = $2)
        `, [followerId, userId]);

        res.status(200).json({ message: `Follower with user id, ${followerId} deleted from account with user id, ${userId}.` });

    } catch (err) {
        next(err);
    }
}

async function deleteUser(req, res, next) {
    const userId = req.user._id;

    try {
        await db.none(`
            DELETE FROM app_user
            WHERE app_user.user_id = $1
        `, [userId]);

        res.status(200).json({ message: `User with id, ${userId} deleted.` });

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getUserInfo,
    getSubscriptions,
    postUserFollower,
    patchUser,
    deleteUserFollower,
    deleteUser
};