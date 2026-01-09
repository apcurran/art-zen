"use strict";

const Joi = require("joi");

function userPatchValidation(data) {
    const schema = Joi.object({
        bioDesc: Joi.string(),
        avatarUrl: Joi.string(),
    });

    return schema.validateAsync(data);
}

module.exports = {
    userPatchValidation,
};
