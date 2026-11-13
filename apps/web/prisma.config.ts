import { defineConfig } from "prisma/config";
import { config } from "dotenv";

// Prisma CLI does not load .env.local automatically — we do it here.
config({ path: ".env.local" });
config({ path: ".env" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Use DIRECT_URL for migrations/db push (session-mode pooler, no pgBouncer)
    // Fall back to DATABASE_URL if DIRECT_URL is not set
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  },
});
