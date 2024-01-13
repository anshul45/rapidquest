import express from "express";
import { uploadVideo, getVideo } from "../controller/videoController.js";
import { upload } from "../utils/multer.js";

const videoRoutes = express.Router();

videoRoutes.post("/uploadvideo", upload.single("video"), uploadVideo);
videoRoutes.get("/getvideo", getVideo);

export default videoRoutes;
