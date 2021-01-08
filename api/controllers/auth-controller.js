"use strict";

const db = require("../../db/index");
const SQL = require("sql-template-strings");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { signupValidation, loginValidation } = require("../validation/auth-validation");

// POST controllers
async function postUserSignup(req, res, next) {
    try {
        await signupValidation(req.body);

    } catch (err) {
        return res.status(400).json({ error: err.details[0].message });
    }

    try {
        // Data is valid, now reject creating an existing user.
        const { username, email, password } = req.body;
        const emailExists = await db.query(SQL`
            SELECT app_user.user_id
            FROM app_user
            WHERE app_user.email = ${email}
        `);

        if (emailExists.rows.length > 0) {
            return res.status(400).json({ error: "Email already exists." });
        }

        // Hash pw
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Add new user to db
        await db.query(SQL`
            INSERT INTO app_user(username, email, password)
            VALUES (${username}, ${email}, ${hashedPassword})
        `);

        res.status(201).json({ message: "New user created." });

    } catch (err) {
        next(err);
    }
}

async function postUserLogin(req, res, next) {
    try {
        await loginValidation(req.body);

    } catch (err) {
        return res.status(400).json({ error: err.details[0].message });
    }

    try {
        // Data valid, check for an existing email
        const { email, password } = req.body;
        const { rows } = await db.query(SQL`
            SELECT app_user.user_id, app_user.password
            FROM app_user
            WHERE app_user.email = ${email}
        `);
        const user = rows[0];

        if (!user) {
            return res.status(400).json({ error: "Email is not found." });
        }

        // Validate pw
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ error: "Invalid password." });
        }

        // Create and send token
        const token = jwt.sign({ _id: user.user_id }, process.env.TOKEN_SECRET, { expiresIn: "2h" });

        res.status(200).json({ accessToken: token, userId: user.user_id });

    } catch (err) {
        next(err);
    }
}

module.exports = {
    postUserSignup,
    postUserLogin
};