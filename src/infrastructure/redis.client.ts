import Redis from "ioredis";

let client: Redis | null = null;

function getRedis(): Redis | null {
  if (!process.env.REDIS_URL) return null;
  if (client) return client;
  client = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 2,
    retryStrategy: () => null,
    lazyConnect: true,
  });
  client.on("error", (err) => {
    console.warn("[redis] Connection error (webhook idempotency disabled):", err.message);
  });
  return client;
}

/** Redis client; null if REDIS_URL is unset or connection fails. Use for optional idempotency. */
export const redis = getRedis();
