import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, trim: true, maxlength: 150, default: "" },
    message: { type: String, required: true, trim: true, maxlength: 5000 },

    // Light metadata — useful later for spotting spam patterns or
    // just knowing where a submission came from.
    ip: { type: String },
    userAgent: { type: String },

    // Lets you mark messages as handled once you've replied, if you
    // ever build a small admin view over this collection.
    read: { type: Boolean, default: false },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

// Collection will be named "messages" in MongoDB.
export default mongoose.model("Message", messageSchema);
