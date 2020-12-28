"use strict";

const Joi = require("joi");

function userArtworkValidation(data) {
    const schema = Joi.object({
        title: Joi
                .string()
                .max(100)
                .required(),
        description: Joi
                .string()
                .max(500)
                .required(),
        genre: Joi
                .string()
                .max(20)
                .required(),
        img_url: Joi
                .string()
                .required()
    });

    return schema.validateAsync(data);
}

module.exports = {
    userArtworkValidation,
};