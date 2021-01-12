"use strict";

const db = require("../../db/index");
const SQL = require("sql-template-strings");

const { userArtworkValidation, userArtworkCommentValidation } = require("../validation/artworks-validation");
const { combineDataToObj } = require("../../utils/combine-data-to-obj");
const { combineUserArtworksDataToObj } = require("../../utils/combine-user-artworks-data-to-obj");

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
        const { artworkId } = req.params;
        // Combine only artwork and user tables
        const artworkAndUserData = db.query(SQL`
            SELECT
                artwork.artwork_id, artwork.user_id, artwork.title, artwork.description, artwork.img_url, artwork.created_at AS artwork_created_at,
                app_user.username, app_user.avatar_img_url
            FROM artwork
            LEFT JOIN app_user
                ON artwork.user_id = app_user.user_id
            WHERE artwork.artwork_id = ${artworkId}
        `);
        // Comment table
        const commentsData = db.query(SQL`
            SELECT artwork_comment.comment_id, artwork_comment.user_id, artwork_comment.text, artwork_comment.created_at AS comment_created_at,
                (
                    SELECT app_user.username
                    FROM app_user
                    WHERE app_user.user_id = artwork_comment.user_id
                ) AS comment_username,
                (
                    SELECT app_user.avatar_img_url
                    FROM app_user
                    WHERE app_user.user_id = artwork_comment.user_id
                ) AS comment_avatar_img
            FROM artwork_comment
            WHERE artwork_comment.artwork_id = ${artworkId}
        `);
        // Like table
        const likesData = db.query(SQL`
            SELECT artwork_like.like_id, artwork_like.user_id
            FROM artwork_like
            WHERE artwork_like.artwork_id = ${artworkId}
        `);
        // Favorite table
        const favoritesData = db.query(SQL`
            SELECT artwork_favorite.favorite_id, artwork_favorite.user_id
            FROM artwork_favorite
            WHERE artwork_favorite.artwork_id = ${artworkId}
        `);

        const data = await Promise.all([artworkAndUserData, commentsData, likesData, favoritesData]);
        const resolvedArtworkAndUserData = data[0].rows[0];
        const resolvedCommentsData = data[1].rows;
        const resolvedLikesData = data[2].rows;
        const resolvedFavoritesData = data[3].rows;

        const formattedFinalObj = combineDataToObj(resolvedArtworkAndUserData, resolvedCommentsData, resolvedLikesData, resolvedFavoritesData);

        res.status(200).json(formattedFinalObj);

    } catch (err) {
        next(err);
    }
}

async function getUserArtworks(req, res, next) {
    try {
        const { userId } = req.params;
        // TODO: Fix this query to return user info separately, as it fails when the user doesn't have any artwork added yet. Returns an empty array causing an error on the front-end. 
        const { rows } = await db.query(SQL`
            SELECT
                artwork.artwork_id, artwork.user_id, artwork.img_url AS artwork_img_url,
                app_user.username, app_user.avatar_img_url, app_user.bio_description,
                (
                    SELECT CAST(COUNT(follower.follower_user_id) AS int)
                    FROM follower
                    WHERE follower.account_user_id = ${userId}
                ) AS total_followers
            FROM artwork
            INNER JOIN app_user
                ON artwork.user_id = app_user.user_id
            WHERE artwork.user_id = ${userId}
            ORDER BY artwork.created_at DESC
        `);

        if (rows.length === 0) {
            res.status(200).json({ message: "No user artworks yet." });
        }

        const formattedFinalObj = combineUserArtworksDataToObj(rows);

        res.status(200).json(formattedFinalObj);

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
        const likes = await db.query(SQL`
            INSERT INTO artwork_like(artwork_id, user_id)
            VALUES (${artworkId}, ${userId})
            RETURNING artwork_like.like_id, artwork_like.user_id
        `);

        res.status(201).json({ likesData: likes.rows[0] });

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

        res.status(201).json({ message: "New favorite added." });

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