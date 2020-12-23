"use strict";

const Joi = require("joi");

function signupValidation(data) {
    const schema = Joi.object({
        username: Joi
                .string()
                .max(100)
                .required(),
        email: Joi
                .string()
                .email()
                .min(4)
                .max(100)
                .required(),
        password: Joi
                .string()
                .min(6)
                .required(),
        repeat_password: Joi
                .ref("password"),
        bio_description: Joi
                .string(),
        avatar_img_url: Joi
                .string()
    })
        .with("password", "repeat_password");

    return schema.validateAsync(data);
}

function loginValidation(data) {
    const schema = Joi.object({
        email: Joi
                .string()
                .email()
                .min(4)
                .max(100)
                .required(),
        password: Joi
                .string()
                .min(6)
                .required()
    });

    return schema.validateAsync(data);
}

module.exports = {
    signupValidation,
    loginValidation
};