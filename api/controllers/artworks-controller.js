"use strict";

const db = require("../../db/index");
const SQL = require("sql-template-strings");

// GET controllers

// Various artists sorted by most recent
async function getArtworks(req, res, next) {
    try {
        const { rows } = await db.query(SQL`
            SELECT artwork.artwork_id, artwork.img_url
            FROM artwork
            ORDER BY artwork.created_at DESC
        `);

        res.status(200).json(rows);

    } catch (err) {
        next(err);
    }
}

async function getUserArtwork(req, res, next) {
    try {
        const { id } = req.params;
        const { rows } = await db.query(SQL`
            SELECT
                artwork.artwork_id, artwork.user_id, artwork.title, artwork.description, artwork.img_url, artwork.created_at,
                app_user.username, app_user.avatar_img_url
            FROM artwork
            INNER JOIN app_user
            ON artwork.user_id = app_user.user_id
            WHERE artwork.artwork_id = ${id}
        `);

        res.status(200).json(rows[0]);

    } catch (err) {
        next(err);
    }
}

async function getUserArtworks(req, res, next) {
    try {
        const { id } = req.params;
        const { rows } = await db.query(SQL`
            SELECT
                artwork.artwork_id, artwork.user_id, artwork.img_url,
                app_user.username, app_user.avatar_img_url
            FROM artwork
            INNER JOIN app_user
            ON artwork.user_id = app_user.user_id
            WHERE artwork.user_id = ${id}
            ORDER BY artwork.created_at DESC
        `);

        res.status(200).json(rows);

    } catch (err) {
        next(err);
    }
}

async function getSearch(req, res, next) {
    try {
        const { q } = req.query;
        const revisedWildcardQuery = `%${q}%`;

        const { rows } = await db.query(SQL`
            SELECT artwork.artwork_id, artwork.title, artwork.img_url, artwork.genre
            FROM artwork
            WHERE LOWER(title) LIKE LOWER(TRIM(${revisedWildcardQuery}))
               OR LOWER(genre) LIKE LOWER(TRIM(${revisedWildcardQuery}))
        `);

        res.send(rows);

    } catch (err) {
        next(err);
    }
}

// POST controllers

async function postUserArtwork(req, res, next) {
    try {
        const userId = req.user._id;
        const { title, description, genre, img_url } = req.body;

        await db.query(SQL`
            INSERT INTO artwork(user_id, title, description, genre, img_url)
            VALUES (${userId}, ${title}, ${description}, ${genre}, ${img_url})
        `);

        res.status(201).json({ message: "New artwork created." });

    } catch (err) {
        next(err);
    }
}

async function postUserArtworkComment(req, res, next) {
    const userId = req.user._id;
    const artworkId = req.params.id;
    const { text } = req.body;

    try {
        await db.query(SQL`
            INSERT INTO artwork_comment(artwork_id, user_id, text)
            VALUES (${artworkId}, ${userId}, ${text})
        `);
    
        res.status(201).json({ message: "New comment created." });
        
    } catch (err) {
        next(err);
    }
}

async function postUserFollower(req, res, next) {
    const userId = req.params.id;

    try {
        await db.query(SQL`
            INSERT INTO follower(user_id)
            VALUES (${userId})
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

// DELETE controllers

async function deleteUser(req, res, next) {

}

async function deleteUserArtwork(req, res, next) {

}

async function deleteUserFollower(req, res, next) {

}

module.exports = {
    getArtworks,
    getUserArtwork,
    getUserArtworks,
    getSearch,
    postUserArtwork,
    postUserArtworkComment,
    postUserFollower,
    patchUser,
    deleteUser,
    deleteUserArtwork,
    deleteUserFollower,
};