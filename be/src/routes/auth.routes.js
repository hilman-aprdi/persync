import express from "express";
import { continueWithGoogle, getCurrentSession } from "../controllers/auth.controller.js";
import { optionalAuth } from "../middleware/auth.js";
import { createRateLimiter } from "../middleware/rate-limit.js";
import { env } from "../config/env.js";

const router = express.Router();
const authRateLimiter = createRateLimiter({
  key: "auth.google",
  windowMs: env.authRateLimitWindowMs,
  maxRequests: env.authRateLimitMaxRequests,
  message: "Too many login attempts",
  code: "RATE_LIMITED",
  headline: "Too many login attempts.",
  supportingText: "Tunggu sebentar sebelum mencoba login kembali.",
});

router.get("/me", optionalAuth, getCurrentSession);
router.post("/google", optionalAuth, authRateLimiter, continueWithGoogle);

export default router;
