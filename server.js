"use strict";

const express = require("express");
const { rateLimit } = require("express-rate-limit");
const helmet = require("helmet");

const path = require("path");
const PORT = process.env.PORT || 5000;
// Import routers
const authRouter = require("./api/routes/auth-router");
const usersRouter = require("./api/routes/users-router");
const artworksRouter = require("./api/routes/artworks-router");

const app = express();

if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");

  app.use(morgan("dev"));
}

// reduce fingerprinting
app.disable("x-powered-by");

// middleware
// custom helmet config to allow imgs to load
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        // 1. Allow images from self, data URIs, and Cloudinary
        "img-src": ["'self'", "data:", "https://res.cloudinary.com"],
        // 2. Allow scripts from your own domain (React's build files)
        "script-src": ["'self'", "'unsafe-inline'"],
        "style-src": ["'self'", "'unsafe-inline'"],
        // 3. Connect-src must allow your API and Cloudinary if using their SDK
        "connect-src": ["'self'", "https://res.cloudinary.com"],
        "upgrade-insecure-requests": [],
      },
    },
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
    crossOriginEmbedderPolicy: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client", "build")));
app.set("trust proxy", 1);

// Rate-limiting setup
const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: JSON.stringify({
    error: "Too many requests, please try again in a minute.",
  }),
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
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode, and listening on PORT ${PORT}.`
  )
);
