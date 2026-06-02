import dotenv from "dotenv";

dotenv.config();

const requiredKeys = ["PORT", "GEMINI_API_KEY", "DATABASE_URL", "GOOGLE_CLIENT_ID", "JWT_SECRET"];

for (const key of requiredKeys) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const appEnv = process.env.NODE_ENV || "development";
const isProduction = appEnv === "production";

if (isProduction) {
  if (process.env.JWT_SECRET.length < 32 || process.env.JWT_SECRET === "tes123") {
    throw new Error("JWT_SECRET must be a strong secret in production");
  }

  if ((process.env.CORS_ORIGIN || "").includes("localhost")) {
    throw new Error("CORS_ORIGIN must not use localhost in production");
  }

  if ((process.env.APP_URL || "").includes("localhost")) {
    throw new Error("APP_URL must not use localhost in production");
  }
}

export const env = {
  appEnv,
  appUrl: process.env.APP_URL || "http://localhost:3000",
  port: Number(process.env.PORT) || 5000,
  geminiApiKey: process.env.GEMINI_API_KEY,
  databaseUrl: process.env.DATABASE_URL,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
  geminiModel: process.env.GEMINI_MODEL || "gemini-2.5-flash",
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresInDays: Number(process.env.JWT_EXPIRES_IN_DAYS) || 7,
  trustProxy: process.env.TRUST_PROXY || "0",
  jsonBodyLimit: process.env.JSON_BODY_LIMIT || "1mb",
  authRateLimitWindowMs: Number(process.env.AUTH_RATE_LIMIT_WINDOW_MS) || 60_000,
  authRateLimitMaxRequests: Number(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS) || 10,
  generateRateLimitWindowMs: Number(process.env.GENERATE_RATE_LIMIT_WINDOW_MS) || 60_000,
  generateRateLimitMaxRequests: Number(process.env.GENERATE_RATE_LIMIT_MAX_REQUESTS) || 6,
  geminiRetryAttempts: Number(process.env.GEMINI_RETRY_ATTEMPTS) || 2,
  geminiRetryBaseDelayMs: Number(process.env.GEMINI_RETRY_BASE_DELAY_MS) || 1200,
  sessionMutationRateLimitWindowMs:
    Number(process.env.SESSION_MUTATION_RATE_LIMIT_WINDOW_MS) || 60_000,
  sessionMutationRateLimitMaxRequests:
    Number(process.env.SESSION_MUTATION_RATE_LIMIT_MAX_REQUESTS) || 10,
  autoRunDbInit:
    process.env.AUTO_RUN_DB_INIT === undefined
      ? appEnv !== "production"
      : process.env.AUTO_RUN_DB_INIT === "true",
};
