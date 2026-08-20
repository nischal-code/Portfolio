import { Router } from "express";
import rateLimit from "express-rate-limit";
import { validateContact } from "../middleware/validateContact.js";
import { submitContact } from "../controllers/contactController.js";

const router = Router();

// Limit each IP to 5 submissions per 15 minutes to deter spam/abuse.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: "Too many messages sent. Please try again later." },
});

router.post("/", contactLimiter, validateContact, submitContact);

export default router;
