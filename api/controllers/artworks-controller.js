"use strict";

const { db } = require("../../db/index");

const {
    streamUploadToCloudinary,
} = require("../../utils/stream-upload-to-cloudinary");
const {
    userArtworkValidation,
    userArtworkCommentValidation,
} = require("../validation/artworks-validation");

// GET controllers
// Various artists sorted by most recent
async function getArtworks(req, res, next) {
    try {
        const artworks = await db.manyOrNone(`
            SELECT
                artwork.artwork_id, artwork.title, artwork.img_url, artwork.img_alt_txt,
                app_user.username
            FROM artwork
            LEFT JOIN app_user
                ON artwork.user_id = app_user.user_id
            ORDER BY artwork.created_at DESC
        `);

        res.status(200).json(artworks);
    } catch (err) {
        next(err);
    }
}

async function getUserArtwork(req, res, next) {
    try {
        const { artworkId } = req.params;

        // One req to postgres db with multiple queries concatenated
        const queriesText = `
            SELECT
                artwork.artwork_id, artwork.user_id, artwork.title, artwork.description, artwork.img_url, artwork.created_at AS artwork_created_at, artwork.genre, artwork.img_url, artwork.img_width, artwork.img_height, artwork.img_alt_txt,
                app_user.username, app_user.avatar_img_url
            FROM artwork
            LEFT JOIN app_user
                ON artwork.user_id = app_user.user_id
            WHERE artwork.artwork_id = $<artworkId>;

            SELECT
                artwork_comment.comment_id, artwork_comment.user_id, artwork_comment.text, artwork_comment.created_at AS comment_created_at,
                app_user.username AS comment_username, app_user.avatar_img_url AS comment_avatar_img
            FROM artwork_comment
            LEFT JOIN app_user
                ON app_user.user_id = artwork_comment.user_id
            WHERE artwork_comment.artwork_id = $<artworkId>;

            SELECT artwork_like.like_id, artwork_like.user_id
            FROM artwork_like
            WHERE artwork_like.artwork_id = $<artworkId>;

            SELECT artwork_favorite.favorite_id, artwork_favorite.user_id
            FROM artwork_favorite
            WHERE artwork_favorite.artwork_id = $<artworkId>;
        `;

        const [artworkAndUserDataArr, commentsData, likesData, favoritesData] =
            await db.multi(queriesText, { artworkId });
        const formattedFinalObj = {
            ...artworkAndUserDataArr[0],
            comments: commentsData,
            likes: likesData,
            favorites: favoritesData,
        };

        res.status(200).json(formattedFinalObj);
    } catch (err) {
        next(err);
    }
}

async function getUserArtworks(req, res, next) {
    try {
        const { userId } = req.params;
        const queriesText = `
            SELECT
                app_user.username, app_user.avatar_img_url, app_user.bio_description
            FROM app_user
            WHERE app_user.user_id = $<userId>;

            SELECT follower.follower_user_id
            FROM follower
            WHERE follower.account_user_id = $<userId>;

            SELECT
                artwork.artwork_id, artwork.user_id, artwork.img_url AS artwork_img_url, artwork.img_alt_txt, artwork.img_width, artwork.img_height
            FROM artwork
            WHERE artwork.user_id = $<userId>
            ORDER BY artwork.created_at DESC;
        `;

        const [resolvedUserData, resolvedFollowerData, resolvedArtworkData] =
            await db.multi(queriesText, { userId });

        res.status(200).json({
            userData: resolvedUserData[0],
            followerData: resolvedFollowerData,
            artworkData: resolvedArtworkData,
        });
    } catch (err) {
        next(err);
    }
}

async function getSearch(req, res, next) {
    try {
        const { q } = req.query;
        const revisedWildcardQuery = `%${q}%`;
        const searchResults = await db.manyOrNone(
            `
            SELECT
                artwork.artwork_id, artwork.title, artwork.img_url, artwork.genre, artwork.img_alt_txt,
                app_user.username
            FROM artwork
            LEFT JOIN app_user
                ON artwork.user_id = app_user.user_id
            WHERE title ILIKE TRIM($<revisedWildcardQuery>) OR
                  genre ILIKE TRIM($<revisedWildcardQuery>)
            ORDER BY artwork.created_at DESC
        `,
            { revisedWildcardQuery },
        );

        res.status(200).json(searchResults);
    } catch (err) {
        next(err);
    }
}

async function getUserFavorites(req, res, next) {
    const userId = req.user._id;

    try {
        const favorites = await db.manyOrNone(
            `
            SELECT
                artwork.artwork_id, artwork.img_url, artwork.title, artwork.img_alt_txt,
                artwork_favorite.favorite_id
            FROM artwork
            INNER JOIN artwork_favorite
                ON artwork.artwork_id = artwork_favorite.artwork_id
            WHERE artwork_favorite.user_id = $<userId>
        `,
            { userId },
        );

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
        const { public_id, width, height } = await streamUploadToCloudinary(
            req,
            "art-zen-app",
        );
        const { title, description, genre, altTxt } =
            await userArtworkValidation(req.body);
        // Data is now valid
        const addedArtwork = await db.one(
            `
            INSERT INTO artwork
                (user_id, title, description, genre, img_url, img_width, img_height, img_alt_txt)
            VALUES
                ($<userId>, $<title>, $<description>, $<genre>, $<public_id>, $<width>, $<height>, $<altTxt>)
            RETURNING artwork.artwork_id, artwork.img_url
        `,
            {
                userId,
                title,
                description,
                genre,
                public_id,
                width,
                height,
                altTxt,
            },
        );

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
        const addedLike = await db.one(
            `
            INSERT INTO artwork_like
                (artwork_id, user_id)
            VALUES
                ($<artworkId>, $<userId>)
            RETURNING artwork_like.like_id, artwork_like.user_id
        `,
            { artworkId, userId },
        );

        res.status(201).json({ likesData: addedLike });
    } catch (err) {
        next(err);
    }
}

async function postUserArtworkComment(req, res, next) {
    const userId = req.user._id;
    const { artworkId } = req.params;

    try {
        const { text } = await userArtworkCommentValidation(req.body);
        // using db.task() from pg-promise to chain queries while only using one connection
        // better utilization of connections from db connection pool
        const commentsDataArr = await db.task(
            "user-comments-task",
            async (currTask) => {
                // insert new comment first
                await currTask.none(
                    `
                INSERT INTO artwork_comment
                    (artwork_id, user_id, text)
                VALUES
                    ($<artworkId>, $<userId>, $<text>)
                `,
                    {
                        artworkId,
                        userId,
                        text,
                    },
                );

                // retrieve all comments for artwork page
                return currTask.manyOrNone(
                    `
                SELECT
                    artwork_comment.comment_id, artwork_comment.user_id, artwork_comment.text, artwork_comment.created_at AS comment_created_at,
                    app_user.username AS comment_username, app_user.avatar_img_url AS comment_avatar_img
                FROM artwork_comment
                LEFT JOIN app_user
                    ON artwork_comment.user_id = app_user.user_id
                WHERE artwork_comment.artwork_id = $<artworkId>
                `,
                    {
                        artworkId,
                    },
                );
            },
        );

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
        const addedFavorite = await db.one(
            `
            INSERT INTO artwork_favorite
                (artwork_id, user_id)
            VALUES
                ($<artworkId>, $<userId>)
            RETURNING artwork_favorite.favorite_id, artwork_favorite.user_id
        `,
            { artworkId, userId },
        );

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
        await db.none(
            `
            DELETE FROM artwork_like
            WHERE (artwork_like.like_id = $<likeId>) AND (artwork_like.user_id = $<userId>)
        `,
            { likeId, userId },
        );

        res.status(200).json({ message: "Deleted artwork like." });
    } catch (err) {
        next(err);
    }
}

async function deleteUserComment(req, res, next) {
    const { commentId } = req.params;
    const userId = req.user._id;

    try {
        await db.none(
            `
            DELETE FROM artwork_comment
            WHERE (artwork_comment.comment_id = $<commentId>) AND (artwork_comment.user_id = $<userId>)
        `,
            { commentId, userId },
        );

        res.status(200).json({ message: "Deleted artwork comment." });
    } catch (err) {
        next(err);
    }
}

async function deleteUserArtworkFavorite(req, res, next) {
    const { favoriteId } = req.params;
    const userId = req.user._id;

    try {
        await db.none(
            `
            DELETE FROM artwork_favorite
            WHERE (artwork_favorite.favorite_id = $<favoriteId>) AND (artwork_favorite.user_id = $<userId>)
        `,
            { favoriteId, userId },
        );

        res.status(200).json({ message: "Deleted artwork favorite." });
    } catch (err) {
        next(err);
    }
}

async function deleteUserArtwork(req, res, next) {
    const { artworkId } = req.params;
    const userId = req.user._id;

    try {
        await db.none(
            `
            DELETE FROM artwork
            WHERE (artwork.artwork_id = $<artworkId>) AND (artwork.user_id = $<userId>)
        `,
            { artworkId, userId },
        );

        res.status(200).json({
            message: `Artwork with id, ${artworkId} deleted.`,
        });
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
    deleteUserArtwork,
};
