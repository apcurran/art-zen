"use strict";

const Joi = require("joi");

function signupValidation(data) {
    const schema = Joi.object({
        username: Joi
                .string()
                .trim()
                .max(100)
                .required(),
        email: Joi
                .string()
                .trim()
                .email()
                .min(4)
                .max(100)
                .required(),
        password: Joi
                .string()
                .trim()
                .min(6)
                .required(),
        bio_description: Joi
                .string(),
        avatar_img_url: Joi
                .string()
    });

    return schema.validateAsync(data);
}

function loginValidation(data) {
    const schema = Joi.object({
        email: Joi
                .string()
                .trim()
                .email()
                .min(4)
                .max(100)
                .required(),
        password: Joi
                .string()
                .trim()
                .min(6)
                .required()
    });

    return schema.validateAsync(data);
}

module.exports = {
    signupValidation,
    loginValidation
};