import path from "node:path";
import { createEnv } from "@t3-oss/env-core";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({
  path: path.resolve(__dirname, "../../../.env"),
});

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
  },
  clientPrefix: "PUBLIC_",
  client: {
    PUBLIC_API_SERVER_URL: z.string().url(),
    PUBLIC_EVAL_SERVER_URL: z.string().url(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
