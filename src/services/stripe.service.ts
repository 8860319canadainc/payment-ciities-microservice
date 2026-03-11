import { stripe } from "../providers/stripe.provider";
import { getPaymentContext } from "./paymentContext.service";
import { CreateIntentResponse } from "../types/payment.types";

export const createIntentService = async (
  paymentSessionToken: string
): Promise<CreateIntentResponse> => {
  const context = await getPaymentContext(paymentSessionToken);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: context.amount_minor,
    currency: context.currency_code,
    application_fee_amount: context.platform_fee_minor,

    automatic_payment_methods: {
      enabled: true,
    },

    transfer_data: {
      destination: context.connected_account_id,
    },

    metadata: {
      business_id: context.business_id,
      checkout_session_id: context.checkout_session_id,
      order_id: context.order_id,
    },
  });

  return {
    provider: "stripe",
    payment_intent_id: paymentIntent.id,
    client_secret: paymentIntent.client_secret,
  };
};
