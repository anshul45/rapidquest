import Video from "../models/videoSchema.js";

export const uploadVideo = async (req, res) => {
  try {
    const { captions, videoUrl, videoPublicId } = req.body;

    if (!videoUrl) {
      return res.status(400).json({
        message: "No video url provided",
      });
    }

    if (!videoPublicId) {
      return res.status(400).json({
        message: "No video videoPublicId provided",
      });
    }

    if (!captions || !captions.length) {
      return res.status(400).json({
        message: "No subtitle or time stamp provided",
      });
    }

    // Save data in your database
    const uploadVideo = new Video({
      videoUrl,
      videoPublicId,
      captions: captions.map((data) => ({
        subtitle: data.subtitle,
        timeStamp: parseInt(data.timeStamp),
      })),
    });

    await uploadVideo.save();

    res.status(200).json({
      message: "Your video has been uploaded successfully",
      uploadVideo,
    });
  } catch (error) {
    console.error(error);
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
