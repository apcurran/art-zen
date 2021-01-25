"use strict";

const streamifier = require("streamifier");

const { cloudinary } = require("../utils/cloudinary");

function streamUploadToCloudinary(req, folderPath) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: folderPath
            },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
}

module.exports = { streamUploadToCloudinary };