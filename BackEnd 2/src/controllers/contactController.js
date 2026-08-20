import mongoose from "mongoose";
import Message from "../models/Message.js";
import { sendOwnerNotification, sendVisitorAutoReply } from "../utils/mailer.js";

export async function submitContact(req, res) {
  const { name, email, subject, message } = req.body;
  let saved = false;
  if (mongoose.connection.readyState === 1) {
    try {
      await Message.create({
        name,
        email,
        subject,
        message,
        ip: req.ip,
        userAgent: req.get("user-agent"),
      });
      saved = true;
    } catch (err) {
      console.error("[contact] failed to save to MongoDB:", err.message);
    }
  } else {
    console.warn("[contact] MongoDB not connected — skipping save.");
  }

  try {
    // Notify the site owner — if this fails, the submission failed
    // from the visitor's point of view, even if it was saved above.
    await sendOwnerNotification({ name, email, subject, message });

    // Best-effort auto-reply to the visitor; don't fail the whole
    // request over this one, since the owner already has the message.
    try {
      await sendVisitorAutoReply({ name, email });
    } catch (err) {
      console.error("[contact] auto-reply failed:", err.message);
    }

    return res.status(200).json({
      ok: true,
      saved,
      message: "Message sent — thanks for reaching out!",
    });
  } catch (err) {
    console.error("[contact] failed to send:", err.message);
    return res.status(500).json({
      ok: false,
      saved,
      message: "Something went wrong sending your message. Please try again shortly.",
    });
  }
}
