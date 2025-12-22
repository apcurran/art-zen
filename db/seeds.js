"use strict";

const faker = require("faker");
const bcrypt = require("bcrypt");

// TODO: re-write to use pg-promise syntax
const { db } = require("../db/index");
const { cloudinary } = require("../utils/cloudinary");

async function getCloudinaryImgsArr() {
    const { resources } = await cloudinary.search
        .expression("folder:art-zen-app")
        .execute();

    return resources.map((fileObj) => {
        return {
            public_id: fileObj.public_id,
            width: fileObj.width,
            height: fileObj.height,
        };
    });
}

function randomGenre(genreArr) {
    return genreArr[Math.floor(Math.random() * genreArr.length)];
}

getCloudinaryImgsArr()
    .then((results) => console.log(results))
    .catch((err) => console.error(err));

(async function populateDb() {
    try {
        const artworkImgs = await getCloudinaryImgsArr();

        for (let imgObj of artworkImgs) {
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
            const savedUser = await db.one(`
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
            const genreArr = [
                "fantasy",
                "landscape",
                "realism",
                "sci-fi",
                "anime",
                "horror",
                "modern",
                "portrait",
            ];
            const genre = randomGenre(genreArr);
            const imgUrl = imgObj.public_id;
            const imgWidth = imgObj.width;
            const imgHeight = imgObj.height;
            const imgAltTxt = "User artwork";

            await db.none(`
                INSERT INTO artwork
                    (user_id, title, description, genre, img_url, img_width, img_height, img_alt_txt)
                VALUES
                    (${user_id}, ${title}, ${description}, ${genre}, ${imgUrl}, ${imgWidth}, ${imgHeight}, ${imgAltTxt})
            `);
        }
    } catch (err) {
        console.error(err);
    }
})();
