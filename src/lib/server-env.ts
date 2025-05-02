import { z } from "zod";

export const serverEnvSchema = z.object({
  POSTGRES_URL: z.string().url(),
  CLERK_SECRET_KEY: z.string(),
  STRIPE_SUBSCRIPTION_PRICE_ID: z.string(),
  STRIPE_CLIENT_SECRET: z.string(),
  INSTAGRAM_BASE_URL: z.string(),
  INSTAGRAM_EMBEDDED_OAUTH_URL: z.string(),
  INSTAGRAM_CLIENT_ID: z.string(),
  INSTAGRAM_CLIENT_SECRET: z.string(),
  INSTAGRAM_TOKEN_URL: z.string(),
  OPEN_AI_KEY: z.string(),
});

export const serverEnv = serverEnvSchema.parse(process.env);
