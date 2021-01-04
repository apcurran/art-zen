"use strict";

function combineDataToObj(artworkAndUserData, commentsData, likesData, favsData, countsData) {
    return {
        ...artworkAndUserData,
        comments: [
            ...commentsData
        ],
        likes: [
            ...likesData
        ],
        favorites: [
            ...favsData
        ],
        counts: {
            ...countsData
        }
    };
}

module.exports = { combineDataToObj };