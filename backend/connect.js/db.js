import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db connection established");
  } catch (error) {
    console.log(error);
  }
};
