"use strict";

const Joi = require("joi");

function userPatchValidation(data) {
    const schema = Joi.object({
        bio_description: Joi
                            .string(),
        avatar_img_url: Joi
                            .string()
    });

    return schema.validateAsync(data);
}

module.exports = {
    userPatchValidation
};