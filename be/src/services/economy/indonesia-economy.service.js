const capitalMap = {
  "< 500 ribu": "prioritaskan jasa ringan atau validasi tanpa stok besar",
  "500 ribu - 2 juta": "bisa menguji jasa, digital product, atau micro commerce terukur",
  "2 juta - 10 juta": "punya ruang untuk alat kerja dan tes permintaan sederhana",
  "10 juta+": "punya ruang lebih besar, tetapi demand tetap harus diuji dahulu",
  "Belum ada modal": "prioritaskan jasa berbasis skill dan channel gratis",
};

const timeMap = {
  "< 1 jam/hari": "butuh model sangat sederhana dengan tugas penjualan terbatas",
  "1-2 jam/hari": "cocok untuk model bisnis ringan, terfokus, dan mudah dijalankan konsisten",
  "3-5 jam/hari": "cukup untuk validasi, pengantaran layanan, dan perbaikan penawaran",
  "Full-time": "punya ruang membangun sistem, akuisisi, dan eksperimen lebih serius",
  "Weekend only": "cocok untuk layanan atau penjualan yang dapat dibatch tiap akhir pekan",
};

export const buildIndonesiaEconomyContext = (input) => {
  const capitalSignal =
    capitalMap[input.capitalRange] || "modal perlu dipakai hati-hati dan diuji bertahap";
  const timeSignal =
    timeMap[input.timeAvailability] || "waktu harus dipakai pada jalur bisnis yang fokus";

  return `${capitalSignal}; ${timeSignal}; pasar Indonesia sensitif harga, suka solusi praktis, dan ramai peluang jasa digital serta micro business`;
};
