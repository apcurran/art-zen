"use strict";

require("dotenv").config();

const { cloudinary } = require("../utils/cloudinary");
const db = require("../db/index");
const SQL = require("sql-template-strings");
const faker = require("faker");

async function getCloudinaryPublicIds() {
    const { resources } = await cloudinary
                                    .search
                                    .expression("folder:art-zen-app")
                                    .execute();
    const publicIds = resources.map(file => file.public_id);
    
    return publicIds;
}

(async function populateDb() {
    const artworkImgPublicIds = await getCloudinaryPublicIds();

    for (let img of artworkImgPublicIds) {
        // Create app_user account
        const username = faker.internet.userName();
        const email = faker.internet.email();
        const password = process.env.DB_SEEDS_PW;
        const bio_description = faker.lorem.sentences(3);
        const avatar_img_url = faker.image.abstract();

        console.log({ username, email, password, bio_description, avatar_img_url });

        // Save in db
        // const savedUser = await db.query(SQL`
        //     INSERT INTO app_user()
        // `);

        // Create artwork row entry and link with foreign key from app_user.user_id
        const { user_id } = savedUser.rows[0];
    }    
})();
