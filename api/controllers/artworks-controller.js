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
        res.send("getUserArtworks ran");
        // const { id } = req.params;
        // TODO: test once followers are created

        // const { rows } = await db.query(SQL`
        //     SELECT *
        //     FROM artwork
        //     INNER JOIN app_user
        //     ON artwork.user_id = app_user.user_id
        //     INNER JOIN followers
        //     ON app_user.user_id = followers.user_id 
        //     WHERE artwork.user_id = ${id}
        // `);

    } catch (err) {
        next(err);
    }
}

async function getSearch(req, res, next) {
    try {
        const { q } = req.query;

        res.send(q);

    } catch (err) {
        next(err);
    }
}

// POST controllers

async function postUserArtwork(req, res, next) {
    try {
        

    } catch (err) {
        next(err);
    }
}

async function postUserArtworkComment(req, res, next) {

}

async function postUserFollower(req, res, next) {

}

// PATCH controller

async function patchUser(req, res, next) {

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