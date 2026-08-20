import app from "./app.js";
import { env } from "./config/env.js";
import { verifyMailer } from "./utils/mailer.js";
import connectDB from "./config/database.js";

// Start listening immediately — don't make visitors wait on Mongo/SMTP
// checks. Both connect in the background and log their own status;
// the contact route itself degrades gracefully if either isn't ready yet.
app.listen(env.port, () => {
  console.log(`Contact backend running on http://localhost:${env.port}`);
});

connectDB();
verifyMailer();
