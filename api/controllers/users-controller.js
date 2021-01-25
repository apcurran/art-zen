"use strict";

const db = require("../../db/index");
const SQL = require("sql-template-strings");

const { streamUploadToCloudinary } = require("../../utils/stream-upload-to-cloudinary");
const { userPatchValidation } = require("../validation/users-validation");

// GET controller
async function getUserInfo(req, res, next) {
    const { userId } = req.params;
    
    try {
        const userInfo = (await db.query(SQL`
            SELECT app_user.username, app_user.bio_description, app_user.avatar_img_url
            FROM app_user
            WHERE app_user.user_id = ${userId}
        `)).rows[0];

        res.status(200).json(userInfo);

    } catch (err) {
        next(err);
    }
}

// POST controller
async function postUserFollower(req, res, next) {
    const { userId } = req.params;
    const followerId = req.user._id;

    try {
        await db.query(SQL`
            INSERT INTO follower(follower_user_id, account_user_id)
            VALUES (${followerId}, ${userId})
        `);
    
        res.status(201).json({ message: "New follower added." });
        
    } catch (err) {
        next(err);
    }
}

// PATCH controller
async function patchUser(req, res, next) {
    try {
        await userPatchValidation(req.body);
        
    } catch (err) {
        return res.status(400).json({ error: err.details[0].message });
    }
        
    try {
        const { bioDesc } = req.body;
        // If user did not send a new img to replace avatar img with, keep the old one.
        const avatarImgUrl = req.file ? (await streamUploadToCloudinary(req, "art-zen-app/user-avatars")).secure_url : null;
        const userId = req.user._id;

        await db.query(SQL`
            UPDATE app_user
            SET
                bio_description = COALESCE(${bioDesc}, bio_description),
                avatar_img_url = COALESCE(${avatarImgUrl}, avatar_img_url)
            WHERE app_user.user_id = ${userId}
        `);

        res.status(200).json({ message: "User info updated." });

    } catch (err) {
        next(err);
    }
}

// DELETE controllers
async function deleteUserFollower(req, res, next) {
    const { userId } = req.params;
    const followerId = req.user._id;

    try {
        await db.query(SQL`
            DELETE FROM follower
            WHERE (follower.follower_user_id = ${followerId}) AND (follower.account_user_id = ${userId})
        `);

        res.status(200).json({ message: `Follower with user id, ${followerId} deleted from account with user id, ${userId}.` });

    } catch (err) {
        next(err);
    }
}

async function deleteUser(req, res, next) {
    const userId = req.user._id;

    try {
        await db.query(SQL`
            DELETE FROM app_user
            WHERE app_user.user_id = ${userId}
        `);

        res.status(200).json({ message: `User with id, ${userId} deleted.` });

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getUserInfo,
    postUserFollower,
    patchUser,
    deleteUserFollower,
    deleteUser
};