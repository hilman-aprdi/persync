import { GoogleGenAI } from "@google/genai";
import { env } from "../../config/env.js";
import { logger } from "../../utils/logger.js";
import { parseJsonResponse } from "./promptBuilder.js";

const ai = new GoogleGenAI({
  apiKey: env.geminiApiKey,
});

const RETRYABLE_HTTP_CODES = new Set([429, 500, 503]);
const RETRYABLE_STATUS_CODES = new Set(["RESOURCE_EXHAUSTED", "UNAVAILABLE", "INTERNAL"]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const extractGeminiErrorMeta = (error) => {
  const directCode = Number(error?.statusCode || error?.code || 0) || null;
  const directStatus = typeof error?.status === "string" ? error.status : null;
  const directMessage = typeof error?.message === "string" ? error.message : "";

  let parsed = null;

  if (directMessage.startsWith("{")) {
    try {
      parsed = JSON.parse(directMessage);
    } catch {
      parsed = null;
    }
  }

  const payloadError = parsed?.error || null;

  return {
    httpCode: directCode || payloadError?.code || null,
    status: directStatus || payloadError?.status || null,
    message: payloadError?.message || directMessage || "Gemini request failed",
  };
};

const isRetryableGeminiError = (error) => {
  const meta = extractGeminiErrorMeta(error);

  return (
    RETRYABLE_HTTP_CODES.has(meta.httpCode) ||
    RETRYABLE_STATUS_CODES.has(meta.status)
  );
};

const createAiUnavailableError = (error) => {
  const meta = extractGeminiErrorMeta(error);
  const unavailableError = new Error(
    "Layanan analisis sedang sibuk. Coba lagi beberapa saat lagi.",
  );

  unavailableError.statusCode = 503;
  unavailableError.expose = true;
  unavailableError.details = {
    code: "AI_TEMPORARILY_UNAVAILABLE",
    headline: "Analysis is temporarily busy.",
    supportingText:
      "Permintaan sedang tinggi di model AI. Coba ulang beberapa saat lagi.",
    providerStatus: meta.status || null,
  };
  unavailableError.cause = error;

  return unavailableError;
};

export const generateStructuredContent = async (prompt, parseErrorMessage) => {
  let lastError = null;
  const maxAttempts = Math.max(env.geminiRetryAttempts + 1, 1);

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await ai.models.generateContent({
        model: env.geminiModel,
        contents: prompt,
      });

      return parseJsonResponse(response.text || "", parseErrorMessage);
    } catch (error) {
      lastError = error;
      const shouldRetry = attempt < maxAttempts && isRetryableGeminiError(error);

      logger.warn("gemini.request_failed", {
        attempt,
        maxAttempts,
        retrying: shouldRetry,
        model: env.geminiModel,
        error: {
          ...extractGeminiErrorMeta(error),
          name: error?.name || "UnknownError",
        },
      });

      if (!shouldRetry) {
        break;
      }

      const delayMs = env.geminiRetryBaseDelayMs * attempt;
      await sleep(delayMs);
    }
  }

  if (isRetryableGeminiError(lastError)) {
    throw createAiUnavailableError(lastError);
  }

  throw lastError;
};
