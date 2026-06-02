import { buildBusinessFitContext } from "../../business/business-fit.service.js";
import { buildIndonesiaEconomyContext } from "../../economy/indonesia-economy.service.js";
import { buildInputSummary } from "./shared.js";

export const ANALYSIS_FIELDS = [
  "commercialProfile",
  "primaryConstraint",
  "executionCapacity",
  "marketAccess",
  "salesReadiness",
  "strategicBias",
];

export const buildAnalysisPrompt = (input) => `
Peran: analis business-fit realistis untuk pasar Indonesia.
Tugas: nilai model bisnis yang paling mungkin dijalankan user dari kondisi hidup, modal, waktu, skill, model kerja, akses pasar, pengalaman, dan kemampuan menjual.
Aturan:
- gunakan bahasa bisnis langsung, analitis, dan praktis
- jangan memberi motivasi, terapi, atau startup buzzword
- business-model agnostic: jangan bias ke bisnis digital, creator economy, startup, atau jasa online
- bisnis sederhana yang executable lebih baik daripada ide modern yang sulit dijalankan
- prioritaskan peluang dengan friction kecil, validasi cepat, dan operasional yang realistis
- pertimbangkan bisnis offline, lokal, hybrid, reseller, distribusi kecil, jasa skill-based, UMKM, usaha rumahan, B2B sederhana, atau digital bila memang paling cocok
- jangan memaksakan leverage online/global bila kondisi user belum mendukung
- jangan merekomendasikan startup kompleks, agency modern, atau model berlapis jika resource user belum memadai
- utamakan konteks Indonesia: perilaku pembeli, akses pasar lokal, modal kerja, operasional harian, dan jalur uang pertama yang membumi
- simpulkan apa yang paling realistis dijalankan sekarang, paling cepat diuji, dan paling mungkin memberi validasi awal
- tiap field maksimal 24 kata
- output JSON valid saja

JSON:
{
  "commercialProfile": "",
  "primaryConstraint": "",
  "executionCapacity": "",
  "marketAccess": "",
  "salesReadiness": "",
  "strategicBias": ""
}

Konteks ekonomi:
${buildIndonesiaEconomyContext(input)}

Konteks kecocokan:
${buildBusinessFitContext(input)}

Data user:
${buildInputSummary(input)}
`.trim();
