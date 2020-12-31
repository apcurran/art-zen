function combineDataToObj(artworkAndUserData, commentsData, likesData, favsData) {
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
        ]
    };
}

module.exports = { combineDataToObj };