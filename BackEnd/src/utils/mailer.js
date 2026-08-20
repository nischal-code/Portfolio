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
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Message Received</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f4f4f5;
  font-family: Arial, Helvetica, sans-serif;
">

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background-color: #f4f4f5; padding: 40px 15px;"
  >
    <tr>
      <td align="center">

        <!-- Main Card -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width: 600px;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          "
        >

          <!-- Header -->
          <tr>
            <td style="
              padding: 35px 35px 25px;
              background: linear-gradient(135deg, #111111, #292929);
              text-align: center;
            ">

              <div style="
                display: inline-block;
                width: 55px;
                height: 55px;
                line-height: 55px;
                border-radius: 50%;
                background-color: #ffffff;
                color: #111111;
                font-size: 24px;
                font-weight: bold;
              ">
                ✓
              </div>

              <h1 style="
                margin: 20px 0 8px;
                color: #ffffff;
                font-size: 25px;
                font-weight: 700;
              ">
                Message Received
              </h1>

              <p style="
                margin: 0;
                color: #cfcfcf;
                font-size: 14px;
              ">
                Thanks for reaching out.
              </p>

            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 35px;">

              <p style="
                margin: 0 0 18px;
                color: #18181b;
                font-size: 17px;
                font-weight: 600;
              ">
                Hi ${escapeHtml(name)},
              </p>

              <p style="
                margin: 0 0 20px;
                color: #52525b;
                font-size: 15px;
                line-height: 1.8;
              ">
                Thanks for getting in touch with me. I've successfully
                received your message and will get back to you as soon
                as possible.
              </p>

              <!-- Status Box -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  margin: 25px 0;
                  background-color: #fafafa;
                  border: 1px solid #e4e4e7;
                  border-radius: 12px;
                "
              >
                <tr>
                  <td style="padding: 18px 20px;">

                    <p style="
                      margin: 0 0 6px;
                      color: #71717a;
                      font-size: 12px;
                      text-transform: uppercase;
                      letter-spacing: 1px;
                    ">
                      Status
                    </p>

                    <p style="
                      margin: 0;
                      color: #18181b;
                      font-size: 15px;
                      font-weight: 600;
                    ">
                      ✓ Successfully Delivered
                    </p>

                  </td>
                </tr>
              </table>

              <p style="
                margin: 0 0 25px;
                color: #52525b;
                font-size: 15px;
                line-height: 1.8;
              ">
                I appreciate you taking the time to contact me.
                I'll review your message and respond shortly.
              </p>

              <!-- Button -->
              <table
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="margin: 10px 0 30px;"
              >
                <tr>
                  <td
                    align="center"
                    style="
                      border-radius: 8px;
                      background-color: #111111;
                    "
                  >
                    <a
                      href="NischalRuchal.com.np"
                      style="
                        display: inline-block;
                        padding: 13px 24px;
                        color: #ffffff;
                        text-decoration: none;
                        font-size: 14px;
                        font-weight: 600;
                      "
                    >
                      Visit My Portfolio →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="
                margin: 0;
                color: #52525b;
                font-size: 14px;
                line-height: 1.7;
              ">
                Best regards,<br />

                <strong style="color: #18181b;">
                  ${escapeHtml(env.siteName)}
                </strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="
              padding: 22px 35px;
              background-color: #fafafa;
              border-top: 1px solid #eeeeee;
              text-align: center;
            ">

              <p style="
                margin: 0;
                color: #a1a1aa;
                font-size: 12px;
                line-height: 1.6;
              ">
                This is an automated confirmation email.<br />
                © ${new Date().getFullYear()}
                ${escapeHtml(env.siteName)}
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`,
  });
}
