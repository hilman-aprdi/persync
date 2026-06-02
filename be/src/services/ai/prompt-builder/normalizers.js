import { ANALYSIS_FIELDS } from "./analysis-prompt.js";
import {
  GUIDANCE_ARRAY_RULES,
  GUIDANCE_STRING_LIMITS,
  SWOT_FIELDS,
} from "./guidance-prompt.js";
import { countWords, normalizeList, toTrimmedString } from "./shared.js";

export const parseJsonResponse = (text, fallbackMessage) => {
  const cleaned = text.trim().replace(/^```json/i, "").replace(/```$/i, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const error = new Error(fallbackMessage);
    error.statusCode = 502;
    throw error;
  }
};

export const normalizeAnalysis = (payload) => {
  const normalized = Object.fromEntries(
    ANALYSIS_FIELDS.map((field) => [field, toTrimmedString(payload?.[field])]),
  );

  if (ANALYSIS_FIELDS.some((field) => !normalized[field])) {
    const error = new Error("Gemini analysis response format is invalid");
    error.statusCode = 502;
    throw error;
  }

  return normalized;
};

const normalizeRequiredList = (value, rule) => normalizeList(value, rule.maxLength);

export const normalizeGuidance = (payload) => {
  const normalized = Object.fromEntries(
    Object.keys(GUIDANCE_STRING_LIMITS).map((field) => [field, toTrimmedString(payload?.[field])]),
  );

  normalized.whyThisFits = normalizeRequiredList(payload?.whyThisFits, GUIDANCE_ARRAY_RULES.whyThisFits);
  normalized.firstSteps = normalizeRequiredList(payload?.firstSteps, GUIDANCE_ARRAY_RULES.firstSteps);
  normalized.alternativeBusinessIdeas = normalizeRequiredList(
    payload?.alternativeBusinessIdeas,
    GUIDANCE_ARRAY_RULES.alternativeBusinessIdeas,
  );
  normalized.swotAnalysis = Object.fromEntries(
    SWOT_FIELDS.map((field) => [field, toTrimmedString(payload?.swotAnalysis?.[field])]),
  );

  const invalidString = Object.entries(GUIDANCE_STRING_LIMITS).some(
    ([field, limit]) => !normalized[field] || countWords(normalized[field]) > limit,
  );
  const invalidArray = Object.entries(GUIDANCE_ARRAY_RULES).some(([field, rule]) => {
    const list = normalized[field];
    return (
      list.length < rule.minLength ||
      list.length > rule.maxLength ||
      list.some((item) => countWords(item) > rule.itemLimit)
    );
  });
  const invalidSwot = SWOT_FIELDS.some(
    (field) => !normalized.swotAnalysis[field] || countWords(normalized.swotAnalysis[field]) > 25,
  );

  if (invalidString || invalidArray || invalidSwot) {
    const error = new Error("Gemini guidance response format is invalid");
    error.statusCode = 502;
    throw error;
  }

  return normalized;
};
