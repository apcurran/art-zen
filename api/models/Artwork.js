"use strict";

const mongoose = require("mongoose");

const ArtworkSchema = mongoose.Schema({
    artist_user_id: { type: String, required: true },
    artist_username: { type: String, min: 1, max: 100, required: true },
    title: { type: String, min: 1, max: 100, required: true },
    likes: [
        {
            user_id: { type: String, required: true }
        }
    ],
    favorites: [
        {
            user_id: { type: String, required: true }
        }
    ],
    comments: [
        {
            user_id: { type: String, required: true },
            text: { type: String, required: true } 
        }
    ],
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Artwork", ArtworkSchema);