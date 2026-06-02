import { logger } from "../utils/logger.js";

export const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode = error.statusCode || 500;
  const message = error.expose ? error.message : "Internal server error";

  logger.error("request.failed", {
    error,
    requestId: req.requestId || null,
    method: req.method,
    path: req.originalUrl,
    statusCode,
  });

  return res.status(statusCode).json({
    success: false,
    message,
    requestId: req.requestId || null,
    details: error.details || null,
  });
};
