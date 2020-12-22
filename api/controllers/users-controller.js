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

}

// POST controllers

async function postUserArtwork(req, res, next) {
    try {
        

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getArtworks,
    getUserArtwork,
    getUserArtworks,
    postUserArtwork,
};