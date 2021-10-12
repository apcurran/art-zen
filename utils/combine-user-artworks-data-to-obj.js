"use strict";

function combineUserArtworksDataToObj(userArtworksData) {
    const {
        user_id,
        username,
        avatar_img_url,
        bio_description,
        total_creations,
        total_followers
    } = userArtworksData[0];

    const artworksData = userArtworksData.map((dataObj) => {
        return {
            artwork_id: dataObj.artwork_id,
            artwork_img_url: dataObj.artwork_img_url
        };
    });

    return {
        user_id,
        username,
        avatar_img_url,
        bio_description,
        total_creations,
        total_followers,
        artworks: [
            ...artworksData
        ]
    };
}

module.exports = { combineUserArtworksDataToObj };