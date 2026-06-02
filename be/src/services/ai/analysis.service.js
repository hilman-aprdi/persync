import { generateStructuredContent } from "./gemini-client.service.js";
import { buildAnalysisPrompt, normalizeAnalysis } from "./promptBuilder.js";

export const analyzeProductIntelligence = async (input) => {
  const payload = await generateStructuredContent(
    buildAnalysisPrompt(input),
    "Gemini analysis response is not valid JSON",
  );

  return normalizeAnalysis(payload);
};
