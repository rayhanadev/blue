import { defineConfig } from "drizzle-kit";

import { env } from "@repo/env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema",
  out: "./migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  schemaFilter: "public",
  tablesFilter: "*",
});
