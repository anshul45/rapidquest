import express from "express";
import multer from "multer";
const upload = multer();

import { uploadVideo } from "../controller/videoController.js";

const videoRoutes = express.Router();

videoRoutes.post("/upload", upload.single("video"), uploadVideo);

export default videoRoutes;
