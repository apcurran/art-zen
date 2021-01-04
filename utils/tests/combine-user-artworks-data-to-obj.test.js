const { combineUserArtworksDataToObj } = require("../combine-user-artworks-data-to-obj");

test("reformats user artworks data into the target obj structure", () => {
    const userArtworksData = [
        {
            "artwork_id": 31,
            "user_id": 29,
            "img_url": "http://cooltestimg.com",
            "username": "Alex",
            "avatar_img_url": null,
            "bio_description": "I love to draw everyday.",
            "total_creations": "2",
            "total_followers": "0"
        },
        {
            "artwork_id": 29,
            "user_id": 29,
            "img_url": "testing.com/test",
            "username": "Alex",
            "avatar_img_url": null,
            "bio_description": "I love to draw everyday.",
            "total_creations": "2",
            "total_followers": "0"
        }
    ];

    const targetObj = {

    };
});