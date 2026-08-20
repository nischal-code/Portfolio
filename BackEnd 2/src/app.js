import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

// Needed to get the real visitor IP (for rate limiting / the ip field
// on saved messages) when deployed behind a proxy (Render, Railway, etc.)
app.set("trust proxy", 1);

app.use(express.json({ limit: "50kb" }));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (curl, server-to-server) with no origin.
      if (!origin || env.clientOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "portfolio-contact-backend" });
});
app.use("/api/contact", contactRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ ok: false, message: "Not found" });
});

// Central error handler (e.g. CORS rejection above)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ ok: false, message: err.message || "Server error" });
});

export default app;
