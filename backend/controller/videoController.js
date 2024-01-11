import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadVideo = async (req, res) => {
  try {
    const { subtitle } = req.body;
    const videoFile = req.file;

    const uploadResult = await cloudinary.uploader.upload(videoFile.path, {
      folder: "rapidquest",
      resource_type: "video",
    });

    res.status(200).json({ result: uploadResult });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
