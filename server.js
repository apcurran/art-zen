"use strict";

require("dotenv").config();

const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
// Import routers
const authRouter = require("./api/routes/auth-router");
const usersRouter = require("./api/routes/users-router");
const artworksRouter = require("./api/routes/artworks-router");

const shrinkRay = require("shrink-ray-current");
const rateLimit = require("express-rate-limit");

const app = express();

if (process.env.NODE_ENV === "development") {
    const morgan = require("morgan");
    
    app.use(morgan("dev"));
}

// Middleware
app.use(shrinkRay());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client", "build")));

// Rate-limiting for routers
const authLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 2,
    message: JSON.stringify({ error: "Too many requests, please try again later." }),
    legacyHeaders: false
});
const usersLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 7,
    message: JSON.stringify({ error: "Too many requests, please try again later." }),
    legacyHeaders: false
});
const artworksLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 3,
    message: JSON.stringify({ error: "Too many requests, please try again later." }),
    legacyHeaders: false
});

// API routers
app.use("/api/auth", authLimiter, authRouter);
app.use("/api/users", usersLimiter, usersRouter);
app.use("/api/artworks", artworksLimiter, artworksRouter);

// General server error handling
app.use((err, req, res, next) => {
    console.error(err);

    return res.status(500).json({ error: err.message });
});

// Catch-all handler to send back React's index.html file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode, and listening on PORT ${PORT}.`));