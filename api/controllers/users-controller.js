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
            SELECT *
            FROM artwork
            JOIN app_user
            ON app_user.user_id = artwork.user_id
            WHERE artwork.artwork_id = ${id}
        `);

        res.status(200).json(rows[0]);

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getArtworks,
    getUserArtwork,
};