const EMAIL_RE = /^\S+@\S+\.\S+$/;

// Matches the same rules as the frontend Form.jsx validate() function,
// enforced again here since client-side validation can always be bypassed.
export function validateContact(req, res, next) {
  const { name, email, subject, message, website } = req.body || {};
  const errors = {};

  // Honeypot field: real users never fill this in (it's hidden via CSS).
  // If it has a value, silently pretend success — don't tip off the bot.
  if (website) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !name.trim()) errors.name = "Please enter your name.";
  if (!email || !email.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "That email doesn't look right.";
  if (!message || !message.trim())
    errors.message = "Say a little about what you have in mind.";

  if (name && name.length > 100) errors.name = "Name is too long.";
  if (subject && subject.length > 150) errors.subject = "Subject is too long.";
  if (message && message.length > 5000) errors.message = "Message is too long.";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  req.body.name = name.trim();
  req.body.email = email.trim();
  req.body.subject = (subject || "").trim();
  req.body.message = message.trim();

  next();
}
