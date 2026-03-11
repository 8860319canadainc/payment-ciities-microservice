import Stripe from "stripe";
import { redis } from "../infrastructure/redis.client";
import { logger } from "../infrastructure/logger";

const WEBHOOK_IDEMPOTENCY_TTL = 86400; // 24 hours

export const processStripeEvent = async (event: Stripe.Event): Promise<void> => {
  const key = `webhook:stripe:${event.id}`;
  const exists = await redis.get(key);
  if (exists) {
    logger.info({ eventId: event.id }, "Webhook already processed (idempotent)");
    return;
  }

  await redis.setex(key, WEBHOOK_IDEMPOTENCY_TTL, "1");

  switch (event.type) {
    case "payment_intent.succeeded":
      logger.info({ paymentIntentId: (event.data.object as Stripe.PaymentIntent).id }, "Payment succeeded");
      break;
    case "payment_intent.payment_failed":
      logger.warn({ paymentIntentId: (event.data.object as Stripe.PaymentIntent).id }, "Payment failed");
      break;
    default:
      logger.info({ type: event.type }, "Stripe webhook event");
  }
};
