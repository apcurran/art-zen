"use strict";

require("dotenv").config({ path: "../.env" });

const { db } = require("../db/index");

async function updateAvatarImages() {
    try {
        console.log("Creating a new db connection");
        const dbConnection = await db.connect();
        const images = await dbConnection.manyOrNone(`
            SELECT avatar_img_url
            FROM app_user
        `);

        // iterate list
        for (let i = 0; i < images.length; i++) {
            // generate avatar img

            // update avatar img with new one
        }
        console.log("Disconnecting temp db connection");
        await dbConnection.done();

    } catch (err) {
        console.error(err);
    }
}

updateAvatarImages();
