"use strict";

const express = require("express");
const router = express.Router();

const cloudinaryController = require("../controllers/cloudinary-controller.js");
const verifyAuth = require("../middleware/verify-auth");

router.post(
    "/sign",
    verifyAuth,
    cloudinaryController.postCloudinaryUploadSignature,
);

module.exports = router;
