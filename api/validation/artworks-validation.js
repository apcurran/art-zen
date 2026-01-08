"use strict";

const Joi = require("joi");

function userArtworkValidation(data) {
    const schema = Joi.object({
        title: Joi.string().trim().max(100).required(),
        description: Joi.string().trim().max(500).required(),
        genre: Joi.string().trim().max(20).required(),
        altTxt: Joi.string().trim().required(),
        public_id: Joi.string().trim().required(),
        width: Joi.number().required(),
        height: Joi.number().required(),
    });

    return schema.validateAsync(data);
}

function userArtworkCommentValidation(data) {
    const schema = Joi.object({
        text: Joi.string().max(500),
    });

    return schema.validateAsync(data);
}

module.exports = {
    userArtworkValidation,
    userArtworkCommentValidation,
};
