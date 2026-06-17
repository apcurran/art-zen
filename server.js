import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import path from "path";
import morgan from "morgan";

// Import routers
import authRouter from "./api/routes/auth-router.js";
import usersRouter from "./api/routes/users-router.js";
import artworksRouter from "./api/routes/artworks-router.js";
import cloudinaryRouter from "./api/routes/cloudinary-router.js";

const PORT = process.env.PORT || 5000;
const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// reduce fingerprinting
app.disable("x-powered-by");

// middleware
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                "default-src": ["'self'"],
                // Allow images from self, data URIs, and Cloudinary
                "img-src": [
                    "'self'",
                    "data:",
                    "https://res.cloudinary.com",
                    "https://api.dicebear.com",
                ],
                // Allow scripts from your own domain (React's build files)
                "script-src": [
                    "'self'",
                    "'unsafe-inline'",
                    "https://upload-widget.cloudinary.com", // Added for the widget script
                    "https://widget.cloudinary.com",
                ],
                // enable Google Fonts to load for React client
                "style-src": [
                    "'self'",
                    "'unsafe-inline'",
                    "https://fonts.googleapis.com",
                ],
                "font-src": ["'self'", "https://fonts.gstatic.com"],
                // Connect-src must allow your API and Cloudinary if using their SDK
                "connect-src": [
                    "'self'",
                    "https://res.cloudinary.com",
                    "https://api.cloudinary.com", // Added to allow the upload request
                ],
                "worker-src": ["'self'", "blob:"], // Added because the widget uses Web Workers
                "upgrade-insecure-requests": [],
            },
        },
        crossOriginResourcePolicy: {
            policy: "cross-origin",
        },
        crossOriginEmbedderPolicy: false,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(import.meta.dirname, "client", "build")));
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
app.use("/api/cloudinary", cloudinaryRouter);

// General server error handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);

    return res.status(500).json({ error: err.message });
});

// Catch-all handler to send back React's index.html file
app.get("/{*splat}", (req, res) => {
    res.sendFile(
        path.join(import.meta.dirname, "client", "build", "index.html"),
    );
});

app.listen(PORT, () =>
    console.log(
        `Server running in ${process.env.NODE_ENV} mode, and listening on PORT ${PORT}.`,
    ),
);
