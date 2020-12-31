function reformatUserArtworkData(sourceObjArr) {
    const { artwork_id, user_id, title, description, img_url, artwork_created_at, username, avatar_img_url } = sourceObjArr[0];

    const comments = sourceObjArr.map(obj => {
        return {
            comment_id: obj.comment_id,
            commenter_user_id: obj.commenter_user_id,
            text: obj.text,
            artwork_comment_created_at: obj.artwork_comment_created_at
        };
    });

    return {
        artwork_id,
        user_id,
        title,
        description,
        img_url,
        artwork_created_at,
        username,
        avatar_img_url,
        comments
    };
}

module.exports = reformatUserArtworkData;