import { Request, Response } from "express";
import { createIntentService } from "../services/stripe.service";

export const createPaymentIntent = async (req: Request, res: Response) => {
  const { payment_session_token } = req.body;

  const result = await createIntentService(payment_session_token);

  res.json(result);
};
