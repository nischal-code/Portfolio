import "dotenv/config";

function required(name) {
  const value = process.env[name];
  if (!value) {
    console.warn(`[config] Warning: ${name} is not set in .env`);
  }
  return value;
}

export const env = {
  port: process.env.PORT || 5000,
  clientOrigins: (process.env.CLIENT_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),

  smtpHost: required("SMTP_HOST"),
  smtpPort: Number(process.env.SMTP_PORT || 465),
  smtpSecure: (process.env.SMTP_SECURE || "true") === "true",
  smtpUser: required("SMTP_USER"),
  smtpPass: required("SMTP_PASS"),

  mongoUri: process.env.MONGODB_URI, // optional — checked at connect time

  ownerEmail: required("OWNER_EMAIL"),
  siteName: process.env.SITE_NAME || "Portfolio",
};
