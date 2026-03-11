import axios from "axios";
import { PaymentContext } from "../types/payment.types";

export const getPaymentContext = async (token: string): Promise<PaymentContext> => {
  const response = await axios.get(
    `${process.env.ECOMMERCE_API_URL}/internal/payment-context/${token}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.INTERNAL_SERVICE_TOKEN}`,
      },
    }
  );

  return response.data;
};
