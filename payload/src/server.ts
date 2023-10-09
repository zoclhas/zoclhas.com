import express from "express";
import payload from "payload";

require("dotenv").config();
const app = express();

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
    email: {
      transportOptions: {
        host: process.env.SMTP_HOST,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        port: 587,
        secure: true,
        tls: {
          rejectUnauthorized: false,
        },
      },
      fromName: process.env.FROM_NAME,
      fromAddress: process.env.FROM_ADDRESS,
    },
  });

  // Add your own express routes here

  app.listen(process.env.PORT || 3010);
};

start();
