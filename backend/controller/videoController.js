import fs from "fs";
import cloudinary from "../utils/cloudinary.js";
import Video from "../models/videoSchema.js";

export const uploadVideo = async (req, res) => {
  try {
    const { captions } = req.body;
    const videoFile = req.file;
    const data = JSON.parse(captions);
    if (!videoFile) {
      return res.status(400).json({
        message: "No video file provided",
      });
    }
    if (!captions || !captions.length) {
      return res.status(400).json({
        message: "No subtitle or time stamp provided",
      });
    }

    // Upload video to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(videoFile.path, {
      resource_type: "video",
    });

    // Delete file after uploading to Cloudinary
    fs.unlinkSync(videoFile.path);

    //Save data in database
    const uploadVideo = new Video({
      videoUrl: cloudinaryResult.secure_url,
      videoPublicId: cloudinaryResult.public_id,
      captions: data.map((data) => ({
        subtitle: data.subtitle,
        timeStamp: parseInt(data.timeStamp),
      })),
    });

    await uploadVideo.save();

    res.status(200).json({
      message: "Your video has been uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const getVideos = async (req, res) => {
  try {
    const video = await Video.find();

    if (!video) {
      return res.status(404).json({
        message: "Sorry not Video in database",
      });
    }

    res.status(200).json({
      video,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};

export const getSingleVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!videoId) {
      return res.status(400).json({
        message: "Video ID is missing",
      });
    }

    // Fetch the video from the database using the Video model
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.status(200).json({
      video,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};
