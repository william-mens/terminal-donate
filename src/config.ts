import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from the .env file
dotenv.config();

console.log('ennnewww',process.env.NODE_ENV);

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().transform((port: string) => parseInt(port, 10)),
  CHECKOUT_URL: z.string().url(),
  CHECKOUT_API_KEY: z.string(),
  MERCHANT_PRODUCT_ID: z.string(),
  TRANSFLOW_ID: z.string(),
  WEB_SOCKET_URL: z.string().url(),
  FAILURE_REDIRECT_URL: z.string().url(),
  SUCCESS_REDIRECT_URL: z.string().url(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  process.exit(1); 
}

const env = parsedEnv.data;

export const config = {
  nodeEnv: env.NODE_ENV,
  port: env.PORT,
  checkoutUrl: env.CHECKOUT_URL,
  checkoutApikey: env.CHECKOUT_API_KEY,
  merchantProductId: env.MERCHANT_PRODUCT_ID,
  transflowId: env.TRANSFLOW_ID,
  webSocketUrl: env.WEB_SOCKET_URL,
  failureRedirectUrl:env.FAILURE_REDIRECT_URL,
  successRedirectUrl: env.SUCCESS_REDIRECT_URL
};

console.log(`Running in ${config.nodeEnv} mode on`);
