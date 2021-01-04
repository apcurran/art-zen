const { combineUserArtworksDataToObj } = require("../combine-user-artworks-data-to-obj");

test("reformats user artworks data into the target obj structure", () => {
    const userArtworksData = [
        {
            "artwork_id": 31,
            "user_id": 29,
            "artwork_img_url": "http://cooltestimg.com",
            "username": "Alex",
            "avatar_img_url": null,
            "bio_description": "I love to draw everyday.",
            "total_creations": "2",
            "total_followers": "0"
        },
        {
            "artwork_id": 29,
            "user_id": 29,
            "artwork_img_url": "testing.com/test",
            "username": "Alex",
            "avatar_img_url": null,
            "bio_description": "I love to draw everyday.",
            "total_creations": "2",
            "total_followers": "0"
        }
    ];

    const targetObj = {
        user_id: 29,
        username: "Alex",
        avatar_img_url: null,
        bio_description: "I love to draw everyday.",
        total_creations: "2",
        total_followers: "0",
        artworks: [
            {
                artwork_id: 31,
                artwork_img_url: "http://cooltestimg.com",
            },
            {
                artwork_id: 29,
                artwork_img_url: "testing.com/test"
            }
        ]
    };

    expect(combineUserArtworksDataToObj(userArtworksData)).toEqual(targetObj);
});