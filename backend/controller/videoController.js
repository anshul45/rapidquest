import fs from "fs";
import cloudinary from "../utils/cloudinary.js";

export const uploadVideo = async (req, res) => {
  try {
    const { subtitle } = req.body;
    const videoFile = req.file;

    if (!videoFile) {
      return res.status(400).json({
        success: false,
        message: "No video file provided",
      });
    }

    cloudinary.uploader
      .upload(videoFile.path, {
        resource_type: "video",
        public_id: subtitle,
      })
      .then((result) => {
        //use to delete file
        fs.unlinkSync(videoFile.path);

        return res.status(200).json({
          messge: "Your Video has been uploded successfully to cloudinary",
          data: {
            url: result.url,
          },
        });
      })
      .catch((err) => {
        //use to delete file
        fs.unlinkSync(videoFile.path);
        res.status(400).json({
          messge: "someting went wrong while processing your request",
          data: {
            err,
          },
        });
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error", error: error.message });
  }
};

export const getVideo = (req, res) => {
  // Your code for getting video
};
