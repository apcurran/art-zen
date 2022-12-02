"use strict";

require("dotenv").config();

const pgp = require("pg-promise")({ capSQL: true });

const devConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};
const prodConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: true
    }
};
const connection = process.env.NODE_ENV === "development" ? devConfig : prodConfig;
const db = pgp(connection);

module.exports = { db };
