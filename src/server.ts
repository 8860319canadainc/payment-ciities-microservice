import "./config/env"; // load .env before any other local imports
import express from "express";
import pinoHttp from "pino-http";

import createIntentRoute from "./routes/createIntent.route";
import stripeWebhookRoute from "./routes/stripeWebhook.route";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(pinoHttp());
app.get("/", (req, res) => {
  res.send("Payments service running");
});
/**
 * Stripe webhook MUST use raw body
 */
app.use("/webhooks/stripe", express.raw({ type: "application/json" }));

/**
 * Normal JSON middleware for other routes
 */
app.use(express.json());

app.use("/payments", createIntentRoute);
app.use("/webhooks", stripeWebhookRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Payments service running on port ${PORT}`);
});

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Stop the other process or use a different PORT.`);
  } else {
    console.error("Server error:", err);
  }
  process.exit(1);
});
