import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDB() {
  if (!env.mongoUri) {
    console.warn(
      "[db] MONGODB_URI is not set — skipping database connection. " +
        "Submissions will still be emailed, but won't be saved."
    );
    return;
  }
  try {
    await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log("[db] Connected to MongoDB");
  } catch (err) {
    console.error("[db] MongoDB connection failed:", err.message);
  }
}

export default connectDB;
