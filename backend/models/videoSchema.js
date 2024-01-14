import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: true,
  },
  videoPublicId: {
    type: String,
    required: true,
  },
  captions: [
    {
      subtitle: {
        type: String,
        required: true,
      },
      timeStamp: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model("Video", videoSchema);
