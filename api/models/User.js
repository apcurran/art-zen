"use strict";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, min: 1, max: 100, required: true },
    email: { type: String, min: 1, max: 100, required: true },
    password: { type: String, min: 6, max: 100, required: true },
    bio_description: { type: String, max: 1000 },
    followers: [
        {
            follower_username: { type: String, required: true }
        }
    ],
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);