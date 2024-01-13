import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //folder where the video will be saved
    cb(null, resolve(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    // add filename
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage: storage });
