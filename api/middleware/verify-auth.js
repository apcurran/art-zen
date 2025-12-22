"use strict";

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Access denied." });
    }

    jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        { algorithms: ["HS256"] },
        (err, user) => {
            if (err && err.name === "TokenExpiredError") {
                return res.status(403).json({ error: "Expired token" });
            }

            if (err) {
                console.error(`JWT Error: ${err.message}`);

                return res.status(403).json({ error: "Invalid token" });
            }

            // Validation passed
            req.user = user;
            next();
        },
    );
};
