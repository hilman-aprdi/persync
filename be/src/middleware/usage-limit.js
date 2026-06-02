import { getUsageState } from "../services/auth.service.js";

const limitError = (usage) => {
  const error = new Error(
    usage.mode === "guest"
      ? "Continue your business analysis."
      : "You've reached today's free analyses.",
  );

  error.statusCode = 403;
  error.expose = true;
  error.details = {
    code: usage.mode === "guest" ? "AUTH_REQUIRED" : "DAILY_LIMIT_REACHED",
    usage,
    headline:
      usage.mode === "guest"
        ? "Continue your business analysis."
        : "You've reached today's free analyses.",
    supportingText:
      usage.mode === "guest"
        ? "Login dengan Google untuk membuka rekomendasi bisnis berikutnya."
        : "Kembali lagi besok untuk analisis bisnis berikutnya.",
  };

  return error;
};

export const enforceUsageLimit = async (req, res, next) => {
  try {
    const usage = await getUsageState({
      userId: req.authUser?.id,
      guestId: req.guestId,
    });

    req.usageState = usage;

    if (!usage.canGenerate) {
      return next(limitError(usage));
    }

    return next();
  } catch (error) {
    return next(error);
  }
};
