import { checkDatabaseConnection } from "../db/pool.js";

export const getHealth = async (req, res) => {
  try {
    await checkDatabaseConnection();
  } catch {
    return res.status(503).json({
      success: false,
      message: "API is unhealthy",
      database: "down",
      timestamp: new Date().toISOString(),
    });
  }

  return res.json({
    success: true,
    message: "API is healthy",
    database: "up",
    timestamp: new Date().toISOString(),
  });
};
