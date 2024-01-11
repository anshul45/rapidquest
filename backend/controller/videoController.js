import fs from "fs";
export const uploadVideo = async (req, res) => {
  try {
    const { subtitle } = req.body;
    const videoFile = req.file;

    const videoUrl = `data:video/mp4;base64,${videoFile.buffer.toString(
      "base64"
    )}`;

    res.status(200).json({
      videoUrl,
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
