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

// API routers
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/artworks", artworksRouter);

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