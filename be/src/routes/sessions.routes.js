import express from "express";
import { env } from "../config/env.js";
import { deleteSession } from "../controllers/session.controller.js";
import { createRateLimiter } from "../middleware/rate-limit.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();
const sessionMutationRateLimiter = createRateLimiter({
  key: "sessions.mutation",
  windowMs: env.sessionMutationRateLimitWindowMs,
  maxRequests: env.sessionMutationRateLimitMaxRequests,
  message: "Too many session updates",
  code: "RATE_LIMITED",
  headline: "Too many session updates.",
  supportingText: "Tunggu sebentar sebelum mencoba lagi.",
});

router.delete("/:id", requireAuth, sessionMutationRateLimiter, deleteSession);

export default router;
