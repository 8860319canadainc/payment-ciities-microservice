import "dotenv/config";
import express from "express";
import pinoHttp from "pino-http";

import createIntentRoute from "./routes/createIntent.route";
import stripeWebhookRoute from "./routes/stripeWebhook.route";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(pinoHttp());

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

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Payments service running on port ${PORT}`);
});
