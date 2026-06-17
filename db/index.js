import pgPromise from "pg-promise";

const pgp = pgPromise({ capSQL: true });

const devConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
};

const prodConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
};

const connection =
    process.env.NODE_ENV === "development" ? devConfig : prodConfig;

export const db = pgp(connection);
