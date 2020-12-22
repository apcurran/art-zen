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
            ORDER BY artwork.created_at ASC
        `);

        res.status(200).json(rows);

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getArtworks,
};