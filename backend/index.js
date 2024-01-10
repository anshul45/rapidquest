import express from "express";
import { connectDb } from "./connect.js/db.js";
import dotenv from "dotenv";
import videoRoutes from "./routes/videoRoutes.js";

dotenv.config();

const app = express();

app.use("api/video", videoRoutes);

const port = 3001;

app.listen(port, () => {
  console.log("listening on port " + port);
  connectDb();
});
