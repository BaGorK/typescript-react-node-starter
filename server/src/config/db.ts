import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (err) {
    console.error('ERROR WHEN CONNECTING TO DB: 🔥 ', err);
    process.exit(1);
  }
};
