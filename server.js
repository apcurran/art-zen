"use strict";

const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
// Import routers
const authRouter = require("./api/routes/auth-router");
const usersRouter = require("./api/routes/users-router");
const artworksRouter = require("./api/routes/artworks-router");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const app = express();

if (process.env.NODE_ENV === "development") {
    const morgan = require("morgan");
    
    app.use(morgan("dev"));
}

// reduce fingerprinting
app.disable("x-powered-by");

// middleware
// custom helmet config to allow imgs to load
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client", "build")));

// Rate-limiting setup
const authLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 7,
    message: JSON.stringify({ error: "Too many requests, please try again in a minute." }),
    legacyHeaders: false
});

// API routers
app.use("/api/auth", authLimiter, authRouter);
app.use("/api/users", usersRouter);
app.use("/api/artworks", artworksRouter);

// General server error handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);

    return res.status(500).json({ error: err.message });
});

// Catch-all handler to send back React's index.html file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode, and listening on PORT ${PORT}.`));