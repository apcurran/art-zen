const Joi = require("joi");

export function userPatchValidation(data) {
    const schema = Joi.object({
        bioDesc: Joi.string(),
        avatarUrl: Joi.string(),
    });

    return schema.validateAsync(data);
}
