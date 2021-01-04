"use strict";

function combineDataToObj(artworkAndUserData, commentsData, likesData, favsData, countsData) {
    return {
        ...artworkAndUserData,
        counts: {
            ...countsData
        },
        comments: [
            ...commentsData
        ],
        likes: [
            ...likesData
        ],
        favorites: [
            ...favsData
        ]
    };
}

module.exports = { combineDataToObj };