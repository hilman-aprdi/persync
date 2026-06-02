import crypto from "crypto";
import { logger } from "../utils/logger.js";

export const attachRequestContext = (req, res, next) => {
  const requestId = req.headers["x-request-id"] || crypto.randomUUID();
  const startedAt = Date.now();

  req.requestId = String(requestId);
  res.setHeader("x-request-id", req.requestId);

  res.on("finish", () => {
    logger.info("request.completed", {
      requestId: req.requestId,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Date.now() - startedAt,
      ip: req.ip,
    });
  });

  next();
};
