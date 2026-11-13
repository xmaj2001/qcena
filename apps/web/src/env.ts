import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  USE_MOCKS: z
    .string()
    .optional()
    .default("true")
    .transform((val) => val === "true" || val === "1"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  DATABASE_URL: z.string().optional(),

  NEXT_PUBLIC_INSTAGRAM_URL: z
    .string()
    .url()
    .default("https://www.instagram.com/qcena.a"),
  NEXT_PUBLIC_FACEBOOK_URL: z
    .string()
    .url()
    .default("https://web.facebook.com/profile.php?id=61591888139870"),
  NEXT_PUBLIC_TIKTOK_URL: z.string().url().optional(),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  USE_MOCKS: process.env.USE_MOCKS,
  NEXT_PUBLIC_APP_URL:
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  DATABASE_URL: process.env.DATABASE_URL,
  NEXT_PUBLIC_INSTAGRAM_URL: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  NEXT_PUBLIC_FACEBOOK_URL: process.env.NEXT_PUBLIC_FACEBOOK_URL,
  NEXT_PUBLIC_TIKTOK_URL: process.env.NEXT_PUBLIC_TIKTOK_URL,
});
