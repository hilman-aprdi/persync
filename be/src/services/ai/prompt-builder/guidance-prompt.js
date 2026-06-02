import { buildInputSummary } from "./shared.js";

export const GUIDANCE_STRING_LIMITS = {
  mainBusinessDirection: 20,
  businessSummary: 38,
  firstMoneyPath: 32,
  realisticValidation: 28,
  difficultyLevel: 8,
  capitalLevel: 10,
  timeToFirstResult: 12,
  businessType: 10,
  longTermPotential: 32,
  marketInsight: 38,
  warningRisk: 30,
  executionFocus: 26,
};

export const GUIDANCE_ARRAY_RULES = {
  whyThisFits: { minLength: 2, maxLength: 3, itemLimit: 22 },
  firstSteps: { minLength: 3, maxLength: 3, itemLimit: 14 },
  alternativeBusinessIdeas: { minLength: 2, maxLength: 3, itemLimit: 18 },
};

export const SWOT_FIELDS = ["strength", "weakness", "opportunity", "threat"];

export const buildGuidancePrompt = (input, analysis) => `
Peran: AI business advisor untuk side hustle dan small business realistis.
Tugas: rekomendasikan satu arah bisnis utama yang dapat diuji, dengan alternatif dan risiko yang jelas.
Prinsip:
- spesifik pada model, target pembeli, atau channel; jangan hanya menyebut kategori besar
- hubungkan rekomendasi dengan modal, waktu, skill, sales confidence, model kerja, pemahaman pasar, dan target penghasilan
- beri insight pasar Indonesia; sebut peluang global hanya jika akses digital mendukung
- fokus validasi, uang pertama, risiko, dan prioritas eksekusi
- jangan menulis motivasi, afirmasi, jargon startup, atau bahasa terapi
- semua field wajib terisi; JSON valid saja

Batas:
- mainBusinessDirection maksimal 20 kata
- businessSummary, marketInsight maksimal 38 kata
- firstMoneyPath, longTermPotential maksimal 32 kata
- realisticValidation maksimal 28 kata
- warningRisk maksimal 30 kata; executionFocus maksimal 26 kata
- whyThisFits 2-3 item, maksimal 22 kata/item
- firstSteps tepat 3 item, maksimal 14 kata/item
- alternativeBusinessIdeas 2-3 item, maksimal 18 kata/item
- setiap field SWOT maksimal 25 kata

JSON:
{
  "mainBusinessDirection": "",
  "businessSummary": "",
  "whyThisFits": ["", ""],
  "swotAnalysis": {
    "strength": "",
    "weakness": "",
    "opportunity": "",
    "threat": ""
  },
  "firstMoneyPath": "",
  "firstSteps": ["", "", ""],
  "realisticValidation": "",
  "difficultyLevel": "",
  "capitalLevel": "",
  "timeToFirstResult": "",
  "businessType": "",
  "longTermPotential": "",
  "alternativeBusinessIdeas": ["", ""],
  "marketInsight": "",
  "warningRisk": "",
  "executionFocus": ""
}

Data user:
${buildInputSummary(input)}

Analisis bisnis:
- profil: ${analysis.commercialProfile}
- constraint: ${analysis.primaryConstraint}
- kapasitas eksekusi: ${analysis.executionCapacity}
- akses pasar: ${analysis.marketAccess}
- kesiapan jualan: ${analysis.salesReadiness}
- bias strategi: ${analysis.strategicBias}
`.trim();
