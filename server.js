"use strict";

require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 5000;
// TODO: Import routers


const app = express();

if (process.env.NODE_ENV === "development") {
    const morgan = require("morgan");
    
    app.use(morgan("dev"));
}

// Middleware
app.use(express.json());

// TODO: API routes

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