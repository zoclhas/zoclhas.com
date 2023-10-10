import express from "express";
import payload from "payload";

require("dotenv").config();
const app = express();

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

// console.log(process.env.STMP_HOST);

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
      fromName: process.env.FROM_NAME,
      fromAddress: process.env.FROM_ADDRESS,
      transportOptions: {
        host: process.env.STMP_HOST,
        auth: {
          user: process.env.STMP_USER,
          pass: process.env.STMP_PASS,
        },
        port: 465,
        secure: true,
        tls: {
          rejectUnauthorized: false,
        },
      },
    },
  });

  // Add your own express routes here

  app.listen(process.env.PORT || 3010);
};

start();
