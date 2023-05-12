"use strict";

require("dotenv").config({ path: "../.env" });

const { db } = require("../db/index");

async function updateAvatarImages() {
    try {
        const images = await db.manyOrNone(`
            SELECT avatar_img_url
            FROM app_user
        `);

        console.log(images);
        

    } catch (err) {
        console.error(err);
    }
}

updateAvatarImages();
