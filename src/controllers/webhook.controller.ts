import { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "../providers/stripe.provider";
import { processStripeEvent } from "../services/webhook.service";

export const stripeWebhookHandler = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature failed");
    return res.status(400).send("Invalid signature");
  }

  await processStripeEvent(event);

  res.json({ received: true });
};
