"use strict";

const cloudinary = require("../../utils/cloudinary");

async function postCloudinaryUploadSignature(req, res) {
    const { paramsToSign } = req.body;
    const signature = cloudinary.cloudinary.utils.api_sign_request(
        paramsToSign,
        process.env.CLOUDINARY_API_SECRET,
    );

    res.status(200).json({ signature });
}

module.exports = { postCloudinaryUploadSignature };
