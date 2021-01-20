"use strict";

const Joi = require("joi");

function userPatchValidation(data) {
    const schema = Joi.object({
        bioDesc: Joi
                            .string(),
        avatarImg: Joi
                            .string()
    });

    return schema.validateAsync(data);
}

module.exports = {
    userPatchValidation
};