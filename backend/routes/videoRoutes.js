import express from "express";
import multer from "multer";
const upload = multer();

import { uploadVideo, getVideo } from "../controller/videoController.js";

const videoRoutes = express.Router();

videoRoutes.post("/uploadvideo", upload.single("video"), uploadVideo);
videoRoutes.get("/getvideo", getVideo);

export default videoRoutes;
