const { combineDataToObj } = require("../combine-data-to-obj");

test("reformats the source params into the target obj structure", () => {
    const artworkAndUserData = {
        artwork_id: 28,
        user_id: 28,
        title: "Ameliorated grid-enabled internet solution",
        description: "Voluptates est vero earum est vero fugit omnis. Voluptatem culpa aut consequatur tempore tempore excepturi ut.",
        img_url: "art-zen-app/high-king-and-dark-lord_ktxbqr",
        artwork_created_at: "2020-12-29T23:11:52.647Z",
        username: "Rosie.Graham1",
        avatar_img_url: "http://placeimg.com/200/200/abstract"
    };

    const commentsData = [
        {
            comment_id: 1,
            artwork_id: 28,
            user_id: 29,
            text: "Hey, nice artwork!",
            created_at: "2020-12-30T01:58:58.660Z"
        },
        {
            comment_id: 2,
            artwork_id: 28,
            user_id: 29,
            text: "Hey, nice artwork!",
            created_at: "2020-12-30T02:14:38.139Z"
        },
        {
            comment_id: 3,
            artwork_id: 28,
            user_id: 29,
            text: "Test comment 2.",
            created_at: "2020-12-30T02:24:11.143Z"
        }
    ];

    const likesData = [
        {
            like_id: 1,
            artwork_id: 28,
            user_id: 29
        },
        {
            like_id: 2,
            artwork_id: 28,
            user_id: 29
        }
    ];

    const favsData = [
        {
            favorite_id: 1,
            artwork_id: 28,
            user_id: 29
        },
        {
            favorite_id: 2,
            artwork_id: 28,
            user_id: 29
        }
    ];

    const countsData ={
        total_comments: "3",
        total_likes: "2",
        total_favorites: "2"
    };

    const targetObj = {
        artwork_id: 28,
        user_id: 28,
        title: "Ameliorated grid-enabled internet solution",
        description: "Voluptates est vero earum est vero fugit omnis. Voluptatem culpa aut consequatur tempore tempore excepturi ut.",
        img_url: "art-zen-app/high-king-and-dark-lord_ktxbqr",
        artwork_created_at: "2020-12-29T23:11:52.647Z",
        username: "Rosie.Graham1",
        avatar_img_url: "http://placeimg.com/200/200/abstract",
        comments: [
            {
                comment_id: 1,
                artwork_id: 28,
                user_id: 29,
                text: "Hey, nice artwork!",
                created_at: "2020-12-30T01:58:58.660Z"
            },
            {
                comment_id: 2,
                artwork_id: 28,
                user_id: 29,
                text: "Hey, nice artwork!",
                created_at: "2020-12-30T02:14:38.139Z"
            },
            {
                comment_id: 3,
                artwork_id: 28,
                user_id: 29,
                text: "Test comment 2.",
                created_at: "2020-12-30T02:24:11.143Z"
            }
        ],
        likes: [
            {
                like_id: 1,
                artwork_id: 28,
                user_id: 29
            },
            {
                like_id: 2,
                artwork_id: 28,
                user_id: 29
            }
        ],
        favorites: [
            {
                favorite_id: 1,
                artwork_id: 28,
                user_id: 29
            },
            {
                favorite_id: 2,
                artwork_id: 28,
                user_id: 29
            }
        ],
        counts: {
            total_comments: "3",
            total_likes: "2",
            total_favorites: "2"
        }
    };

    expect(combineDataToObj(artworkAndUserData, commentsData, likesData, favsData, countsData)).toEqual(targetObj);
});