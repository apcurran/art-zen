"use strict";

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const { db } = require("../db/index");
const { cloudinary } = require("../utils/cloudinary");

async function clearDb() {
    await db.none("TRUNCATE app_user RESTART IDENTITY CASCADE");

    console.log("DB cleared");
}

async function getCloudinaryImgsArr() {
    const { resources } = await cloudinary.search
        .expression("folder:art-zen-app")
        .max_results(100)
        .execute();

    return resources.map((file) => {
        return {
            public_id: file.public_id,
            width: file.width,
            height: file.height,
        };
    });
}

function randomArtworkTitle() {
    const styles = [
        () => faker.word.adjective(),
        () => faker.word.noun(),
        () => `${faker.word.adjective()} ${faker.word.noun()}`,
        () => `${faker.word.noun()} of ${faker.word.noun()}`,
        () => `the ${faker.word.adjective()} ${faker.word.noun()}`,
        () => `${faker.word.adjective()}, ${faker.word.adjective()}`,
        () => faker.lorem.words({ min: 2, max: 4 }),
    ];

    return faker.helpers.arrayElement(styles)();
}

function randomGenre(genreArr) {
    return genreArr[Math.floor(Math.random() * genreArr.length)];
}

(async function populateDb() {
    try {
        await clearDb();

        const artworkImgs = await getCloudinaryImgsArr();

        await db.tx(async (t) => {
            for (let img of artworkImgs) {
                if (
                    !Number.isInteger(img.width) ||
                    !Number.isInteger(img.height)
                ) {
                    throw new Error("Invalid Cloudinary width or height data");
                }

                // Create app_user account
                const username = faker.internet.username();
                const email = faker.internet.email();
                const bio_description = faker.person.bio();

                const avatarSeed = faker.string.alphanumeric(12);
                const avatar_img_url = `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${avatarSeed}`;

                // Hash pw
                const saltRounds = 12;
                const password = process.env.DB_SEEDS_PW;
                const hashedPassword = await bcrypt.hash(password, saltRounds);

                // Save in db
                const { user_id } = await t.one(
                    `
                INSERT INTO app_user
                    (username, email, password, bio_description, avatar_img_url)
                VALUES
                    ($1, $2, $3, $4, $5)
                RETURNING user_id
            `,
                    [
                        username,
                        email,
                        hashedPassword,
                        bio_description,
                        avatar_img_url,
                    ],
                );

                // Create artwork row entry and link with foreign key from app_user.user_id
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
                const imgUrl = img.public_id;
                const imgWidth = img.width;
                const imgHeight = img.height;
                const imgAltTxt = "User artwork";

                await t.none(
                    `
                INSERT INTO artwork
                    (user_id, title, description, genre, img_url, img_width, img_height, img_alt_txt)
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8)
            `,
                    [
                        user_id,
                        randomArtworkTitle(),
                        description,
                        genre,
                        imgUrl,
                        imgWidth,
                        imgHeight,
                        imgAltTxt,
                    ],
                );
            }
        });

        console.log("Database seeded: success");
    } catch (err) {
        console.error(`Seed failure: ${err}`);
    }
})();
