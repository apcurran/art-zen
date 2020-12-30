"use strict";

const db = require("../../db/index");
const SQL = require("sql-template-strings");

const { userArtworkValidation, userArtworkCommentValidation } = require("../validation/artworks-validation");

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
    // Combine artwork, comments, likes(count and your 'like'), and favorites(count and your 'favorite') tables
    try {
        const { artworkId } = req.params;
        const { rows } = await db.query(SQL`
            SELECT
                artwork.artwork_id, artwork.user_id, artwork.title, artwork.description, artwork.img_url, artwork.created_at AS artwork_created_at,
                app_user.username, app_user.avatar_img_url,
                artwork_comment.comment_id, artwork_comment.user_id AS commenter_user_id, artwork_comment.text, artwork_comment.created_at AS artwork_comment_created_at
            FROM artwork
            LEFT JOIN app_user
                ON artwork.user_id = app_user.user_id
            LEFT JOIN artwork_comment
                ON artwork.artwork_id = artwork_comment.artwork_id
            WHERE artwork.artwork_id = ${artworkId} AND artwork_comment.artwork_id = ${artworkId}
        `);

        res.status(200).json(rows[0]);

    } catch (err) {
        next(err);
    }
}

async function getUserArtworks(req, res, next) {
    try {
        const { userId } = req.params;
        const { rows } = await db.query(SQL`
            SELECT
                artwork.artwork_id, artwork.user_id, artwork.img_url,
                app_user.username, app_user.avatar_img_url
            FROM artwork
            INNER JOIN app_user
                ON artwork.user_id = app_user.user_id
            WHERE artwork.user_id = ${userId}
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
        await userArtworkValidation(req.body);

    } catch (err) {
        return res.status(400).json({ error: err.details[0].message });
    }

    try {
        const userId = req.user._id;
        // Data is now valid
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

async function postUserArtworkLike(req, res, next) {
    const { artworkId } = req.params;
    const userId = req.user._id;

    try {
        await db.query(SQL`
            INSERT INTO artwork_like(artwork_id, user_id)
            VALUES (${artworkId}, ${userId})
        `);

        res.status(201).json({ message: "New Like added." });

    } catch (err) {
        next(err);
    }
}

async function postUserArtworkComment(req, res, next) {
    try {
        await userArtworkCommentValidation(req.body);

    } catch (err) {
        return res.status(400).json({ error: err.details[0].message });
    }

    const userId = req.user._id;
    const { artworkId } = req.params;
    // Data now valid
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

async function postUserArtworkFavorite(req, res, next) {
    const { artworkId } = req.params;
    const userId = req.user._id;

    try {
        await db.query(SQL`
            INSERT INTO artwork_favorite(artwork_id, user_id)
            VALUES (${artworkId}, ${userId})
        `);

        res.status(201).json({ message: "New favorited added." });

    } catch (err) {
        next(err);
    }
}

// DELETE controllers
async function deleteUserArtworkLike(req, res, next) {
    const { likeId } = req.params;
    const userId = req.user._id;

    try {
        await db.query(SQL`
            DELETE FROM artwork_like
            WHERE (artwork_like.like_id = ${likeId}) AND (artwork_like.user_id = ${userId})
        `);

        res.status(200).json({ message: "Deleted artwork like." });

    } catch (err) {
        next(err);
    }
}

async function deleteUserArtworkFavorite(req, res, next) {
    const { favoriteId } = req.params;
    const userId = req.user._id;

    try {
        await db.query(SQL`
            DELETE FROM artwork_favorite
            WHERE (artwork_favorite.favorite_id = ${favoriteId}) AND (artwork_favorite.user_id = ${userId})
        `);

        res.status(200).json({ message: "Deleted artwork favorite." });

    } catch (err) {
        next(err);
    }
}

async function deleteUserArtwork(req, res, next) {
    const { artworkId } = req.params;
    const userId = req.user._id;

    try {
        await db.query(SQL`
            DELETE FROM artwork
            WHERE (artwork.artwork_id = ${artworkId}) AND (artwork.user_id = ${userId})
        `);

        res.status(200).json({ message: `Artwork with id, ${artworkId} deleted.` });

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getArtworks,
    getUserArtwork,
    getUserArtworks,
    getSearch,
    postUserArtwork,
    postUserArtworkLike,
    postUserArtworkComment,
    postUserArtworkFavorite,
    deleteUserArtworkLike,
    deleteUserArtworkFavorite,
    deleteUserArtwork
};