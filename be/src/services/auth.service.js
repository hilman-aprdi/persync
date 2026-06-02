import { OAuth2Client } from "google-auth-library";
import { env } from "../config/env.js";
import {
  countGuestSessions,
  countUserSessionsToday,
  findOrCreateGoogleUser,
  findUserById,
} from "../db/auth.repository.js";
import { createAppToken } from "../utils/jwt.js";

const googleClient = new OAuth2Client(env.googleClientId);

const authError = (message, details = null, statusCode = 401) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.expose = true;
  error.details = details;
  return error;
};

export const verifyGoogleCredential = async (credential) => {
  if (!credential || typeof credential !== "string") {
    throw authError("Google credential is required", ["credential is required"], 400);
  }

  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: env.googleClientId,
  });

  const payload = ticket.getPayload();
  if (!payload?.sub || !payload?.email || !payload?.name) {
    throw authError("Google account data is incomplete");
  }

  const user = await findOrCreateGoogleUser({
    googleId: payload.sub,
    email: payload.email,
    fullName: payload.name,
    avatar: payload.picture || "",
  });

  const token = createAppToken({
    sub: user.id,
    email: user.email,
    fullName: user.fullName,
  });

  return { user, token };
};

export const getUserFromTokenPayload = async (tokenPayload) => {
  if (!tokenPayload?.sub) {
    return null;
  }

  return findUserById(tokenPayload.sub);
};

export const getUsageState = async ({ userId, guestId }) => {
  if (userId) {
    const usedToday = await countUserSessionsToday(userId);
    return {
      mode: "user",
      limit: 3,
      used: usedToday,
      remaining: Math.max(0, 3 - usedToday),
      canGenerate: usedToday < 3,
      headline:
        usedToday >= 3 ? "You've reached today's free analyses." : "",
      supportingText:
        usedToday >= 3
          ? "Kembali lagi besok untuk analisis bisnis berikutnya."
          : "",
    };
  }

  if (!guestId) {
    return {
      mode: "guest",
      limit: 1,
      used: 0,
      remaining: 1,
      canGenerate: true,
      headline: "",
      supportingText: "",
    };
  }

  const used = await countGuestSessions(guestId);
  return {
    mode: "guest",
    limit: 1,
    used,
    remaining: Math.max(0, 1 - used),
    canGenerate: used < 1,
    headline: used >= 1 ? "Continue your business analysis." : "",
    supportingText:
      used >= 1
        ? "Login dengan Google untuk membuka rekomendasi bisnis berikutnya."
        : "",
  };
};

export const buildViewerPayload = async ({ user, guestId }) => {
  const usage = await getUsageState({ userId: user?.id, guestId });

  return {
    isAuthenticated: Boolean(user),
    user: user
      ? {
          id: user.id,
          fullName: user.fullName,
          firstName: user.fullName.split(" ")[0],
          email: user.email,
          avatar: user.avatar,
          avatarUrl: user.avatarUrl,
        }
      : null,
    usage,
  };
};
