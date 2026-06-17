import { cloudinary } from "../../utils/cloudinary.js";

export async function postCloudinaryUploadSignature(req, res) {
    const { paramsToSign } = req.body;
    const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        process.env.CLOUDINARY_API_SECRET,
    );

    res.status(200).json({ signature });
}
