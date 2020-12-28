"use strict";

require("dotenv").config();

const { cloudinary } = require("../utils/cloudinary");
const db = require("../db/index");
const SQL = require("sql-template-strings");
const faker = require("faker");
const bcrypt = require("bcrypt");

async function getCloudinaryPublicIds() {
    const { resources } = await cloudinary
                                    .search
                                    .expression("folder:art-zen-app")
                                    .execute();
    const publicIds = resources.map(file => file.public_id);
    
    return publicIds;
}

function randomGenre(genreArr) {
    return genreArr[Math.floor(Math.random() * genreArr.length)];
}

(async function populateDb() {
    const artworkImgPublicIds = await getCloudinaryPublicIds();

    for (let img of artworkImgPublicIds) {
        // Create app_user account
        const username = faker.internet.userName();
        const email = faker.internet.email();
        const bio_description = faker.lorem.sentences(3);
        const avatar_img_url = "http://placeimg.com/200/200/abstract";
        
        // Hash pw
        const saltRounds = 12;
        const password = process.env.DB_SEEDS_PW;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Save in db
        const savedUser = await db.query(SQL`
        INSERT INTO app_user
            (username, email, password, bio_description, avatar_img_url)
        VALUES
            (${username}, ${email}, ${hashedPassword}, ${bio_description}, ${avatar_img_url})
        RETURNING *
        `);
        
        // Create artwork row entry and link with foreign key from app_user.user_id
        const { user_id } = savedUser.rows[0];
        const title = faker.company.catchPhrase();
        const description = faker.lorem.sentences(2);
        // Generate randomized genre
        const genreArr = ["fantasy", "landscape", "realism", "sci-fi", "anime", "horror", "modern", "portrait"];
        const genre = randomGenre(genreArr);
        const img_url = img;
        
        await db.query(SQL`
            INSERT INTO artwork
                (user_id, title, description, genre, img_url)
            VALUES
                (${user_id}, ${title}, ${description}, ${genre}, ${img_url})
        `);
    }    
})();
