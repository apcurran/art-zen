function checkUserIdInArr(userId, arr) {
    return arr.some((obj) => obj.user_id === userId);
}

export default checkUserIdInArr;