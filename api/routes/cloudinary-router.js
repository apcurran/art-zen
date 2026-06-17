import express from "express";

import * as cloudinaryController from "../controllers/cloudinary-controller.js";
import verifyAuth from "../middleware/verify-auth.js";

const router = express.Router();

router.post(
    "/sign",
    verifyAuth,
    cloudinaryController.postCloudinaryUploadSignature,
);

export default router;
