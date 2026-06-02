import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import { checkDatabaseConnection, ensureDatabase, pool } from "./db/pool.js";
import generateRouter from "./routes/generate.routes.js";
import healthRouter from "./routes/health.routes.js";
import authRouter from "./routes/auth.routes.js";
import sessionsRouter from "./routes/sessions.routes.js";
import { attachRequestContext } from "./middleware/request-context.js";
import { applySecurityHeaders } from "./middleware/security.js";
import { notFoundHandler } from "./middleware/not-found.js";
import { errorHandler } from "./middleware/error-handler.js";
import { logger } from "./utils/logger.js";

const app = express();
let server = null;

app.set("trust proxy", env.trustProxy);

app.use(
  cors({
    origin: env.corsOrigin,
  }),
);
app.use(attachRequestContext);
app.use(applySecurityHeaders);
app.use(express.json({ limit: env.jsonBodyLimit }));

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Persync backend is running",
  });
});

app.use("/health", healthRouter);
app.use("/auth", authRouter);
app.use("/generate", generateRouter);
app.use("/api/sessions", sessionsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  if (env.autoRunDbInit) {
    await ensureDatabase();
  } else {
    await checkDatabaseConnection();
  }

  server = app.listen(env.port, () => {
    logger.info("server.started", {
      port: env.port,
      env: env.appEnv,
      autoRunDbInit: env.autoRunDbInit,
    });
  });
};

const shutdown = async (signal) => {
  logger.info("server.shutdown.requested", { signal });

  try {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });
      });
    }

    await pool.end();
    logger.info("server.shutdown.completed", { signal });
    process.exit(0);
  } catch (error) {
    logger.error("server.shutdown.failed", { signal, error });
    process.exit(1);
  }
};

startServer().catch((error) => {
  logger.error("server.start.failed", { error });
  process.exit(1);
});

process.on("SIGINT", () => {
  shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  shutdown("SIGTERM");
});
