export const stringifyList = (items) => items.filter(Boolean).join(", ");
export const countWords = (text) => String(text || "").trim().split(/\s+/).filter(Boolean).length;
export const toTrimmedString = (value) => String(value || "").trim();
export const normalizeList = (items, limit) =>
  Array.isArray(items) ? items.map((item) => String(item).trim()).filter(Boolean).slice(0, limit) : [];

export const buildInputSummary = (input) => [
  `situasi:${input.currentSituation}`,
  `tujuan:${input.mainGoal}`,
  `skill_minat:${stringifyList(input.skillsInterests) || "-"}`,
  `modal:${input.capitalRange}`,
  `waktu:${input.timeAvailability}`,
  `model_kerja:${input.preferredWorkStyle}`,
  `kepercayaan_jualan:${input.salesConfidence}`,
  `target_penghasilan:${input.targetIncome}`,
  `pemahaman_pasar:${input.marketFamiliarity}`,
  `catatan:${input.additionalContext || "-"}`,
].join("\n");
