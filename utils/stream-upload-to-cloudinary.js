"use strict";

const { Readable } = require("stream");

const { cloudinary } = require("../utils/cloudinary");

function streamUploadToCloudinary(req, folderPath) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: folderPath,
            },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            },
        );

        Readable.from(req.file.buffer).pipe(stream);
    });
}

module.exports = { streamUploadToCloudinary };
