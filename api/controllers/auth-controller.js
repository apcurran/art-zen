import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { db } from "../../db/index.js";
import {
    signupValidation,
    loginValidation,
} from "../validation/auth-validation.js";

// POST controllers
export async function postUserSignup(req, res, next) {
    try {
        const { username, email, password } = await signupValidation(req.body);
        // Data is valid, now reject creating an existing user.
        // run task for re-use of db connection
        await db.task(async (currTask) => {
            const emailExists = await currTask.oneOrNone(
                `
                SELECT app_user.user_id
                FROM app_user
                WHERE app_user.email = $<email>
            `,
                { email },
            );

            if (emailExists) {
                return res.status(409).json({ error: "Email already exists." });
            }

            // Hash pw
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Add new user to db
            await currTask.none(
                `
                INSERT INTO
                    app_user(username, email, password)
                VALUES
                    ($<username>, $<email>, $<hashedPassword>)
            `,
                { username, email, hashedPassword },
            );

            res.status(201).json({ message: "New user created." });
        });
    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({ error: err.message });
        }

        // handle PostgreSQL unique constraint errors
        if (err.code === "23505") {
            if (err.constraint === "uq_app_user_username") {
                return res
                    .status(409)
                    .json({ error: "Username is already taken." });
            }

            // Fallback case for email in case of a race condition
            if (err.constraint === "app_user_email_key") {
                return res.status(409).json({ error: "Email already exists." });
            }
        }

        next(err);
    }
}

export async function postUserLogin(req, res, next) {
    try {
        const { email, password } = await loginValidation(req.body);
        // Data valid, check for an existing email
        const user = await db.oneOrNone(
            `
            SELECT app_user.user_id, app_user.password
            FROM app_user
            WHERE app_user.email = $<email>
        `,
            { email },
        );

        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Validate pw
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Create and send token
        const token = jwt.sign(
            { _id: user.user_id },
            process.env.TOKEN_SECRET,
            { expiresIn: "2h" },
        );

        res.status(200).json({ accessToken: token, userId: user.user_id });
    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({ error: err.message });
        }

        next(err);
    }
}
