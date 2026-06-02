import express from "express";
import {
  generateDescription,
  getGenerationHistory,
  getGenerationSession,
} from "../controllers/generate.controller.js";
import { env } from "../config/env.js";
import { optionalAuth } from "../middleware/auth.js";
import { createRateLimiter } from "../middleware/rate-limit.js";
import { enforceUsageLimit } from "../middleware/usage-limit.js";

const router = express.Router();
const generateRateLimiter = createRateLimiter({
  key: "generate.create",
  windowMs: env.generateRateLimitWindowMs,
  maxRequests: env.generateRateLimitMaxRequests,
  message: "Too many generation requests",
  code: "RATE_LIMITED",
  headline: "Too many generation requests.",
  supportingText: "Tunggu sebentar sebelum meminta analisis berikutnya.",
});

router.get("/", optionalAuth, getGenerationHistory);
router.get("/:id", optionalAuth, getGenerationSession);
router.post("/", optionalAuth, generateRateLimiter, enforceUsageLimit, generateDescription);

export default router;
