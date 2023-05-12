"use strict";

require("dotenv").config({ path: "../.env" });

const { db } = require("../db/index");

async function updateAvatarImages() {
    try {
        console.log("Creating a new db connection");
        const dbConnection = await db.connect();
        const userData = await dbConnection.manyOrNone(`
            SELECT
                user_id,
                avatar_img_url
            FROM app_user
        `);

        for (let i = 0; i < userData.length; i++) {
            const userId = userData[i].user_id;
            // generate avatar img
            const avatarImgURL = `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${i}`;
            // update avatar img with new one
            await dbConnection.none(`
                UPDATE app_user
                SET avatar_img_url = $<avatarImgURL>
                WHERE user_id = $<userId>
            `, { avatarImgURL, userId });
        }
        console.log("Update complete");
        console.log("Disconnecting temp db connection");
        await dbConnection.done();

    } catch (err) {
        console.error(err);
    }
}

updateAvatarImages();
