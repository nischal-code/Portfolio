import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();
app.set("trust proxy", 1);

app.use(express.json({ limit: "50kb" }));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || env.mongoUri) {
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

app.use((req, res) => {
  res.status(404).json({ ok: false, message: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ ok: false, message: err.message || "Server error" });
});

export default app;
