import express from "express";
import {
  uploadVideo,
  getVideos,
  getSingleVideo,
} from "../controller/videoController.js";

const videoRoutes = express.Router();

videoRoutes.post("/uploadvideo", uploadVideo);
videoRoutes.post("/upload", (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
});
videoRoutes.get("/getvideos", getVideos);
videoRoutes.get("/getsinglevideo/:videoId", getSingleVideo);

export default videoRoutes;
