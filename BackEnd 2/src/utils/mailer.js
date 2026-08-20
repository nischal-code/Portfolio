import nodemailer from "nodemailer";
import { env } from "../config/env.js";

export const transporter = nodemailer.createTransport({
  host: env.smtpHost,
  port: env.smtpPort,
  secure: env.smtpSecure, // true for 465, false for other ports (STARTTLS)
  auth: {
    user: env.smtpUser,
    pass: env.smtpPass,
  },
});

// Verify SMTP credentials on boot so misconfiguration fails loudly,
// not silently on the first real submission.
export async function verifyMailer() {
  try {
    await transporter.verify();
    console.log("[mailer] SMTP connection OK");
  } catch (err) {
    console.error("[mailer] SMTP connection failed:", err.message);
  }
}

function escapeHtml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendOwnerNotification({ name, email, subject, message }) {
  const safeSubject = subject?.trim() || "New portfolio contact";

  return transporter.sendMail({
    from: `"Portfolio Contact Form" <${env.smtpUser}>`,
    to: env.ownerEmail,
    replyTo: email,
    subject: `[Portfolio] ${safeSubject}`,
    text:
      `New message from your portfolio contact form\n\n` +
      `Name: ${name}\nEmail: ${email}\nSubject: ${safeSubject}\n\n${message}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2>New portfolio contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(safeSubject)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
    `,
  });
}

export async function sendVisitorAutoReply({ name, email }) {
  return transporter.sendMail({
    from: `"${env.siteName}" <${env.smtpUser}>`,
    to: email,
    subject: `Thanks for reaching out, ${name}!`,
    text:
      `Hi ${name},\n\n` +
      `Thanks for your message — I've received it and will get back to you soon.\n\n` +
      `— ${env.siteName}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <p>Hi ${escapeHtml(name)},</p>
        <p>Thanks for your message — I've received it and will get back to you soon.</p>
        <p>— ${escapeHtml(env.siteName)}</p>
      </div>
    `,
  });
}
