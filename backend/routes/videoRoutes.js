import express from "express";
import {
  uploadVideo,
  getVideos,
  getSingleVideo,
} from "../controller/videoController.js";
import { upload } from "../utils/multer.js";

const videoRoutes = express.Router();

videoRoutes.post("/uploadvideo", upload.single("video"), uploadVideo);
videoRoutes.get("/getvideos", getVideos);
videoRoutes.get("/getsinglevideo/:videoId", getSingleVideo);

export default videoRoutes;
