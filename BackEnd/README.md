# Portfolio Contact Backend

A small Express API that powers the Contact page's form: validates the
submission, **saves it to MongoDB**, emails you the message, and sends
the visitor an auto-reply.

## What's included

```
src/
  config/env.js            loads and validates .env
  config/database.js       connects to MongoDB (non-blocking, fails gracefully)
  models/Message.js        Mongoose schema for saved submissions
  middleware/validateContact.js   server-side validation + honeypot spam check
  controllers/contactController.js  saves to Mongo, then sends emails
  utils/mailer.js          nodemailer transport + email templates
  routes/contactRoutes.js  POST /api/contact (rate-limited)
  app.js                   express app, CORS, error handling
  server.js                entrypoint
```

Also included: `frontend-changes/Form.jsx` — your portfolio's Form
component, updated to actually call this backend (was previously a
fake `setTimeout`). Drop it in over `src/components/Form.jsx` in your
portfolio project.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env`:
   - `SMTP_USER` / `SMTP_PASS` — an email account to send from.
     Easiest option: Gmail with an **App Password** (not your normal
     password) — generate one at
     https://myaccount.google.com/apppasswords (requires 2-Step
     Verification enabled). Or use any SMTP provider (Resend, Brevo,
     Zoho Mail, Mailgun, etc.) — swap in their host/port instead.
   - `OWNER_EMAIL` — where submissions land (usually the same address).
   - `CLIENT_ORIGIN` — your frontend's URL(s), comma-separated. Include
     both your local dev URL and your deployed domain once you have one.
   - `MONGODB_URI` — your MongoDB Atlas connection string (Database →
     Connect → Drivers in the Atlas dashboard). Include a database name
     at the end of the path, e.g. `.../portfolio`. Make sure your
     current IP is allow-listed under Atlas → Network Access (or allow
     `0.0.0.0/0` for quick testing — tighten it before going to
     production).

3. **Run it**
   ```bash
   npm run dev     # auto-restarts on file changes
   # or
   npm start
   ```
   You should see `Contact backend running on http://localhost:5000`,
   `[db] Connected to MongoDB`, and `[mailer] SMTP connection OK`. If
   either of the last two show an error, double check the matching
   credentials in `.env` before testing the form — the server still
   starts either way (see Notes below), it just won't be able to do
   the thing that failed.

4. **Wire up the frontend**
   - Copy `frontend-changes/Form.jsx` over
     `royal-wedding-mern-portfolio/src/components/Form.jsx` (or
     whatever your project folder is named).
   - In the frontend project, add to its `.env`:
     ```
     VITE_API_URL=http://localhost:5000
     ```
   - Restart the Vite dev server so it picks up the new env var.

5. **Test it** — fill out the Contact form. You should get an email at
   `OWNER_EMAIL`, and the sender should get an auto-reply.

## API

`POST /api/contact`

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Let's work together",
  "message": "Hi! I saw your portfolio and..."
}
```

Success → `200 { "ok": true, "saved": true, "message": "..." }`
Validation error → `400 { "ok": false, "errors": { "email": "..." } }`
Server error → `500 { "ok": false, "saved": false, "message": "..." }`

`saved` tells you whether the message made it into MongoDB — it can be
`false` even on a `200` if the database was temporarily unreachable,
since the email side is what actually blocks success/failure.

Rate-limited to 5 submissions per 15 minutes per IP. Includes a hidden
honeypot field (`website`) — if it's filled in, the request is silently
accepted (`200`) without sending any email or touching the database,
since only bots fill hidden fields.

## Viewing saved messages

Submissions land in a `messages` collection in the database named at
the end of your `MONGODB_URI`. Easiest way to browse them: open
[MongoDB Atlas](https://cloud.mongodb.com) → your cluster → **Browse
Collections** → `portfolio` (or whatever you named it) → `messages`.
Each document has `name`, `email`, `subject`, `message`, `ip`,
`userAgent`, a `read` flag, and `createdAt`/`updatedAt` timestamps.

## Deploying

Any Node host works (Railway, Render, Fly.io, a VPS). Set the same env
vars there, and point your frontend's `VITE_API_URL` at the deployed
backend URL. Make sure `CLIENT_ORIGIN` includes your production
frontend domain or CORS will block requests.

## Notes

- Gmail SMTP caps at ~500 emails/day on a free account — plenty for a
  portfolio contact form, but if you expect higher volume, use a
  dedicated transactional email provider (Resend, Postmark, etc.)
  instead — just change `SMTP_*` in `.env`.
- The server starts and accepts requests immediately — it doesn't wait
  on MongoDB or SMTP to be reachable first. If Mongo is down or
  misconfigured, submissions still get emailed (just not saved); if
  SMTP is down, submissions still get saved (just not emailed) as long
  as the database attempt above it hasn't also failed. Check the
  startup logs (`[db] ...` / `[mailer] ...`) if something's not
  showing up where you expect.
- MongoDB connection attempts time out after 5 seconds rather than
  hanging, so a wrong URI or an IP-allowlist issue in Atlas fails fast
  and logs clearly instead of stalling the server.
