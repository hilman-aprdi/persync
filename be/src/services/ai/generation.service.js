import { generateStructuredContent } from "./gemini-client.service.js";
import {
  buildGuidancePrompt,
  normalizeGuidance,
} from "./promptBuilder.js";

export const generateBusinessGuidance = async (input, analysis) => {
  const guidancePayload = await generateStructuredContent(
    buildGuidancePrompt(input, analysis),
    "Gemini guidance response is not valid JSON",
  );

  return normalizeGuidance(guidancePayload);
};
