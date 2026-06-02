import { verifyAppToken } from "../utils/jwt.js";
import { getUserFromTokenPayload } from "../services/auth.service.js";

const getBearerToken = (headerValue) => {
  if (!headerValue || typeof headerValue !== "string") {
    return null;
  }

  const [scheme, token] = headerValue.split(" ");
  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
};

export const optionalAuth = async (req, res, next) => {
  try {
    const token = getBearerToken(req.headers.authorization);
    const payload = token ? verifyAppToken(token) : null;
    const user = payload ? await getUserFromTokenPayload(payload) : null;

    req.authUser = user;
    req.guestId = String(req.headers["x-guest-id"] || "").trim() || null;

    return next();
  } catch (error) {
    return next(error);
  }
};

export const requireAuth = async (req, res, next) => {
  try {
    const token = getBearerToken(req.headers.authorization);
    const payload = token ? verifyAppToken(token) : null;
    const user = payload ? await getUserFromTokenPayload(payload) : null;

    if (!user) {
      const error = new Error("Authentication required");
      error.statusCode = 401;
      error.expose = true;
      error.details = {
        code: "AUTH_REQUIRED",
        headline: "Continue with Google.",
        supportingText: "Login diperlukan untuk mengelola riwayat analisis Anda.",
      };
      return next(error);
    }

    req.authUser = user;
    req.guestId = null;
    return next();
  } catch (error) {
    return next(error);
  }
};
