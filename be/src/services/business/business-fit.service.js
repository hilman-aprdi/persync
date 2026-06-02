const situationMap = {
  Mahasiswa: "lebih cocok jalur fleksibel, belajar sambil jalan, dan modal rendah",
  "Fresh graduate": "cocok jalur yang membangun skill sekaligus penghasilan awal",
  "Karyawan full-time": "cocok side hustle yang tidak mengganggu pekerjaan utama",
  Freelance: "cocok model berbasis skill, retainer, atau produk turunan jasa",
  "Sedang cari kerja": "butuh jalur cepat diuji dengan biaya tetap rendah",
  "Sudah punya bisnis kecil": "cocok menguatkan channel dan margin dari usaha berjalan",
  "Ibu rumah tangga": "cocok model fleksibel, bisa dikerjakan dari rumah, dan ritme mandiri",
  "Ingin pindah karier": "butuh model yang menguji skill baru sebelum transisi penuh",
  "PHK / kehilangan pekerjaan": "prioritaskan arus kas awal tanpa beban modal berat",
};

const goalMap = {
  "Tambahan penghasilan": "prioritaskan cashflow tambahan yang stabil dan tidak rumit",
  "Side hustle realistis": "prioritaskan model yang mudah divalidasi di luar aktivitas utama",
  "Bisnis jangka panjang": "pilih entry point kecil dengan ruang diferensiasi",
  "Ingin keluar dari kerja kantoran": "uji arus kas sebelum menjadikannya penghasilan utama",
  "Bangun personal brand": "pilih topik dan penawaran yang menghasilkan bukti pasar",
  "Bisnis online": "prioritaskan channel digital yang dekat dengan skill user",
  "Penghasilan fleksibel": "hindari model yang menuntut operasional tetap sejak awal",
  "Belajar bisnis dulu": "utamakan eksperimen berbiaya rendah dengan umpan balik cepat",
  "Cari peluang digital": "pilih kebutuhan online yang dapat dilayani secara konkret",
};

const workStyleMap = {
  "Remote / online": "gunakan channel digital dan penyerahan layanan tanpa lokasi fisik",
  Hybrid: "kombinasikan akuisisi lokal dengan operasional digital sederhana",
  "Offline lokal": "utamakan permintaan yang dapat diamati di area sekitar",
  Flexible: "pilih pekerjaan berbasis pesanan tanpa jadwal operasional berat",
  "Kerja sendiri": "gunakan model solo operator dengan proses yang ringkas",
  "Dengan partner/tim": "pilih model dengan pembagian akuisisi dan operasional yang jelas",
};

export const buildBusinessFitContext = (input) => {
  const situationSignal =
    situationMap[input.currentSituation] || "butuh jalur bisnis yang sesuai sumber daya saat ini";
  const goalSignal =
    goalMap[input.mainGoal] || "butuh jalur bisnis yang menjawab tujuan utama user";
  const workStyleSignal =
    workStyleMap[input.preferredWorkStyle] ||
    "butuh model kerja yang operasionalnya dapat dijalankan konsisten";

  return `${situationSignal}; ${goalSignal}; ${workStyleSignal}`;
};
