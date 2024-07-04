import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().min(1000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
});
const env = envSchema.parse(process.env);

export default env;
