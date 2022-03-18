"use strict";

const SQL = require("sql-template-strings");
const db = require("../../db/index");

const { streamUploadToCloudinary } = require("../../utils/stream-upload-to-cloudinary");
const { userArtworkValidation, userArtworkCommentValidation } = require("../validation/artworks-validation");
const { combineDataToObj } = require("../../utils/combine-data-to-obj");

// GET controllers
// Various artists sorted by most recent
async function getArtworks(req, res, next) {
    try {
        const { rows } = await db.query(SQL`
            SELECT
                artwork.artwork_id, artwork.title, artwork.img_url, artwork.img_alt_txt,
                app_user.username
            FROM artwork
            LEFT JOIN app_user
                ON artwork.user_id = app_user.user_id
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
                artwork.artwork_id, artwork.user_id, artwork.title, artwork.description, artwork.img_url, artwork.created_at AS artwork_created_at, artwork.genre, artwork.img_url, artwork.img_width, artwork.img_height, artwork.img_alt_txt,
                app_user.username, app_user.avatar_img_url
            FROM artwork
            LEFT JOIN app_user
                ON artwork.user_id = app_user.user_id
            WHERE artwork.artwork_id = ${artworkId}
        `);
        // Comment table
        const commentsData = db.query(SQL`
            SELECT
                artwork_comment.comment_id, artwork_comment.user_id, artwork_comment.text, artwork_comment.created_at AS comment_created_at,
                app_user.username AS comment_username, app_user.avatar_img_url AS comment_avatar_img
            FROM artwork_comment
            LEFT JOIN app_user
                ON app_user.user_id = artwork_comment.user_id
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
        const userData = db.query(SQL`
            SELECT
                app_user.username, app_user.avatar_img_url, app_user.bio_description
            FROM app_user
            WHERE app_user.user_id = ${userId}
        `);
        const followerData = db.query(SQL`
            SELECT follower.follower_user_id
            FROM follower
            WHERE follower.account_user_id = ${userId}
        `);
        const artworkData = db.query(SQL`
            SELECT
                artwork.artwork_id, artwork.user_id, artwork.img_url AS artwork_img_url, artwork.img_alt_txt, artwork.img_width, artwork.img_height
            FROM artwork
            WHERE artwork.user_id = ${userId}
            ORDER BY artwork.created_at DESC
        `);

        const groupedData = await Promise.all([userData, followerData, artworkData]);
        const resolvedUserData = groupedData[0].rows[0];
        const resolvedFollowerData = groupedData[1].rows;
        const resolvedArtworkData = groupedData[2].rows;

        res.status(200).json({ userData: resolvedUserData, followerData: resolvedFollowerData, artworkData: resolvedArtworkData });

    } catch (err) {
        next(err);
    }
}

async function getSearch(req, res, next) {
    try {
        const { q } = req.query;
        const revisedWildcardQuery = `%${q}%`;

        const { rows } = await db.query(SQL`
            SELECT
                artwork.artwork_id, artwork.title, artwork.img_url, artwork.genre, artwork.img_alt_txt,
                app_user.username
            FROM artwork
            LEFT JOIN app_user
                ON artwork.user_id = app_user.user_id
            WHERE LOWER(title) LIKE LOWER(TRIM(${revisedWildcardQuery}))
               OR LOWER(genre) LIKE LOWER(TRIM(${revisedWildcardQuery}))
        `);

        res.status(200).json(rows);

    } catch (err) {
        next(err);
    }
}

async function getUserFavorites(req, res, next) {
    const userId = req.user._id;

    try {
        const favorites = (await db.query(SQL`
            SELECT
                artwork.artwork_id, artwork.img_url, artwork.title, artwork.img_alt_txt,
                artwork_favorite.favorite_id
            FROM artwork
            INNER JOIN artwork_favorite
                ON artwork.artwork_id = artwork_favorite.artwork_id
            WHERE artwork_favorite.user_id = ${userId}
        `)).rows;

        res.status(200).json({ favoritesData: favorites });

    } catch (err) {
        next(err);
    }
}

// POST controllers
async function postUserArtwork(req, res, next) {
    try {
        const userId = req.user._id;
        // Destucture public_id, img width, and img height from async func
        const { public_id, width, height } = await streamUploadToCloudinary(req, "art-zen-app");
        const { title, description, genre, altTxt } = await userArtworkValidation(req.body);
        // Data is now valid
        const addedArtwork = (await db.query(SQL`
            INSERT INTO artwork(user_id, title, description, genre, img_url, img_width, img_height, img_alt_txt)
            VALUES (${userId}, ${title}, ${description}, ${genre}, ${public_id}, ${width}, ${height}, ${altTxt})
            RETURNING artwork.artwork_id, artwork.img_url
        `)).rows[0];

        res.status(201).json({ addedArtwork });

    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({ error: err.message });
        }

        next(err);
    }
}

async function postUserArtworkLike(req, res, next) {
    const { artworkId } = req.params;
    const userId = req.user._id;

    try {
        const addedLike = await db.query(SQL`
            INSERT INTO artwork_like(artwork_id, user_id)
            VALUES (${artworkId}, ${userId})
            RETURNING artwork_like.like_id, artwork_like.user_id
        `);

        res.status(201).json({ likesData: addedLike.rows[0] });

    } catch (err) {
        next(err);
    }
}

async function postUserArtworkComment(req, res, next) {
    const userId = req.user._id;
    const { artworkId } = req.params;
    
    try {
        const { text } = await userArtworkCommentValidation(req.body);
        // Insert new comment
        await db.query(SQL`
            INSERT INTO artwork_comment(artwork_id, user_id, text)
            VALUES (${artworkId}, ${userId}, ${text})
        `);

        // Retrieve all comments for artwork page
        const commentsDataArr = (await db.query(SQL`
            SELECT
                artwork_comment.comment_id, artwork_comment.user_id, artwork_comment.text, artwork_comment.created_at AS comment_created_at,
                app_user.username AS comment_username, app_user.avatar_img_url AS comment_avatar_img
            FROM artwork_comment
            LEFT JOIN app_user
                ON artwork_comment.user_id = app_user.user_id
            WHERE artwork_comment.artwork_id = ${artworkId}
        `)).rows;
    
        res.status(201).json({ commentsData: commentsDataArr });
        
    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({ error: err.message });
        }

        next(err);
    }
}

async function postUserArtworkFavorite(req, res, next) {
    const { artworkId } = req.params;
    const userId = req.user._id;

    try {
        const addedFavorite = (await db.query(SQL`
            INSERT INTO artwork_favorite(artwork_id, user_id)
            VALUES (${artworkId}, ${userId})
            RETURNING artwork_favorite.favorite_id, artwork_favorite.user_id
        `)).rows[0];

        res.status(201).json({ favoriteData: addedFavorite });

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

async function deleteUserComment(req, res, next) {
    const { commentId } = req.params;
    const userId = req.user._id;

    try {
        await db.query(SQL`
            DELETE FROM artwork_comment
            WHERE (artwork_comment.comment_id = ${commentId}) AND (artwork_comment.user_id = ${userId})
        `);

        res.status(200).json({ message: "Deleted artwork comment." });

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
    getUserFavorites,
    postUserArtwork,
    postUserArtworkLike,
    postUserArtworkComment,
    postUserArtworkFavorite,
    deleteUserArtworkLike,
    deleteUserComment,
    deleteUserArtworkFavorite,
    deleteUserArtwork
};