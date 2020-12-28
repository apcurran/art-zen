"use strict";

const db = require("../../db/index");
const SQL = require("sql-template-strings");

async function postNewUser(req, res, next) {
    
}

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
    const userId = req.user._id;

    try {
        await db.query(SQL`
            UPDATE app_user
            SET
                bio_description = COALESCE(${bio_description}, bio_description)
                avatar_img_url = COALESCE(${avatar_img_url}, avatar_img_url)
            WHERE app_user.user_id = ${userId}
        `);

        res.status(200).json({ message: "User updated." });

    } catch (err) {
        next(err);
    }
}

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

module.exports = {
    postNewUser,
    postUserFollower,
    patchUser,
    deleteUserFollower,
};