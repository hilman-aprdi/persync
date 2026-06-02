import {
  deleteBusinessDirectionSessionById,
  findBusinessDirectionSessionById,
  insertBusinessDirectionSession,
  listBusinessDirectionSessions,
} from "../db/business-direction.repository.js";
import { analyzeProductIntelligence } from "./ai/analysis.service.js";
import { generateBusinessGuidance } from "./ai/generation.service.js";

const requiredStringFields = [
  "currentSituation",
  "mainGoal",
  "capitalRange",
  "timeAvailability",
  "preferredWorkStyle",
  "salesConfidence",
  "targetIncome",
  "marketFamiliarity",
];

const badRequest = (message, details) => {
  const error = new Error(message);
  error.statusCode = 400;
  error.expose = true;
  error.details = details;
  return error;
};

export const validateBusinessDirectionInput = (payload) => {
  const data = payload || {};
  const errors = [];

  for (const field of requiredStringFields) {
    if (!data[field] || typeof data[field] !== "string" || data[field].trim().length < 2) {
      errors.push(`${field} is required`);
    }
  }

  if (!Array.isArray(data.skillsInterests) || data.skillsInterests.length === 0) {
    errors.push("skillsInterests must be an array with at least 1 item");
  }

  if (errors.length > 0) {
    throw badRequest("Invalid request body", errors);
  }  

  return {
    currentSituation: data.currentSituation.trim(),
    mainGoal: data.mainGoal.trim(),
    skillsInterests: data.skillsInterests.map((item) => String(item).trim()).filter(Boolean),
    capitalRange: data.capitalRange.trim(),
    timeAvailability: data.timeAvailability.trim(),
    preferredWorkStyle: data.preferredWorkStyle.trim(),
    salesConfidence: data.salesConfidence.trim(),
    targetIncome: data.targetIncome.trim(),
    marketFamiliarity: data.marketFamiliarity.trim(),
    additionalContext: String(data.additionalContext || "").trim(),
  };
};

export const createBusinessDirection = async (payload, actor = {}) => {
  const input = validateBusinessDirectionInput(payload);
  const analysis = await analyzeProductIntelligence(input);
  const result = await generateBusinessGuidance(input, analysis);

  return insertBusinessDirectionSession(input, result, actor);
};

export const getRecentBusinessDirections = async (actor = {}) =>
  listBusinessDirectionSessions({
    userId: actor.userId || null,
    guestId: actor.guestId || null,
  });

export const getBusinessDirectionSessionDetail = async (id, actor = {}) => {
  if (!id) {
    throw badRequest("Session id is required");
  }

  const session = await findBusinessDirectionSessionById({
    id,
    userId: actor.userId || null,
    guestId: actor.guestId || null,
  });

  if (!session) {
    const error = new Error("Session not found");
    error.statusCode = 404;
    error.expose = true;
    return Promise.reject(error);
  }

  return session;
};

export const deleteBusinessDirectionSession = async (id, actor = {}) => {
  if (!id) {
    throw badRequest("Session id is required");
  }

  if (!actor.userId) {
    const error = new Error("Authentication required");
    error.statusCode = 401;
    error.expose = true;
    error.details = {
      code: "AUTH_REQUIRED",
      headline: "Continue with Google.",
      supportingText: "Login diperlukan untuk menghapus riwayat analisis.",
    };
    throw error;
  }

  const deleted = await deleteBusinessDirectionSessionById({
    id,
    userId: actor.userId,
  });

  if (!deleted) {
    const error = new Error("Session not found");
    error.statusCode = 404;
    error.expose = true;
    throw error;
  }

  return deleted;
};
