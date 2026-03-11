export interface PaymentContext {
  amount_minor: number;
  currency_code: string;
  platform_fee_minor: number;
  connected_account_id: string;
  business_id: string;
  checkout_session_id: string;
  order_id: string;
}

export interface CreateIntentResponse {
  provider: string;
  payment_intent_id: string;
  client_secret: string | null;
}
