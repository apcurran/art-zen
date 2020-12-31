const reformatUserArtworkData = require("../reformat-user-artwork-data");

test("reformats the source obj into the target obj structure", () => {
    const sourceObjArr = [
        {
            "artwork_id": 28,
            "user_id": 28,
            "title": "Ameliorated grid-enabled internet solution",
            "description": "Voluptates est vero earum est vero fugit omnis. Voluptatem culpa aut consequatur tempore tempore excepturi ut.",
            "img_url": "art-zen-app/high-king-and-dark-lord_ktxbqr",
            "artwork_created_at": "2020-12-29",
            "username": "Rosie.Graham1",
            "avatar_img_url": "http://placeimg.com/200/200/abstract",
            "comment_id": 1,
            "commenter_user_id": 29,
            "text": "Hey, nice artwork!",
            "artwork_comment_created_at": "2020-12-30"
        },
        {
            "artwork_id": 28,
            "user_id": 28,
            "title": "Ameliorated grid-enabled internet solution",
            "description": "Voluptates est vero earum est vero fugit omnis. Voluptatem culpa aut consequatur tempore tempore excepturi ut.",
            "img_url": "art-zen-app/high-king-and-dark-lord_ktxbqr",
            "artwork_created_at": "2020-12-29",
            "username": "Rosie.Graham1",
            "avatar_img_url": "http://placeimg.com/200/200/abstract",
            "comment_id": 2,
            "commenter_user_id": 29,
            "text": "Cool work",
            "artwork_comment_created_at": "2020-12-30"
        }
    ];

    const targetObj = {
        artwork_id: 28,
        user_id: 28,
        title: "Ameliorated grid-enabled internet solution",
        description: "Voluptates est vero earum est vero fugit omnis. Voluptatem culpa aut consequatur tempore tempore excepturi ut.",
        img_url: "art-zen-app/high-king-and-dark-lord_ktxbqr",
        artwork_created_at: "2020-12-29",
        username: "Rosie.Graham1",
        avatar_img_url: "http://placeimg.com/200/200/abstract",
        comments: [
            {
                comment_id: 1,
                commenter_user_id: 29,
                text: "Hey, nice artwork!",
                artwork_comment_created_at: "2020-12-30"
            },
            {
                comment_id: 2,
                commenter_user_id: 29,
                text: "Cool work",
                artwork_comment_created_at: "2020-12-30"
            }
        ]
    };

    expect(reformatUserArtworkData(sourceObjArr)).toEqual(targetObj);
});