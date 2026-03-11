import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || "8080",
  NODE_ENV: process.env.NODE_ENV || "development",

  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET!,

  ECOMMERCE_API_URL: process.env.ECOMMERCE_API_URL!,
  INTERNAL_SERVICE_TOKEN: process.env.INTERNAL_SERVICE_TOKEN!,

  REDIS_URL: process.env.REDIS_URL!,
} as const;
