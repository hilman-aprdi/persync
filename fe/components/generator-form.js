"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  BriefcaseBusiness,
  Camera,
  ChevronDown,
  ChevronUp,
  Code2,
  GraduationCap,
  Handshake,
  LoaderCircle,
  Megaphone,
  Palette,
  PenTool,
  ShoppingBag,
  Sparkles,
  Video,
} from "lucide-react";
import { usePersync } from "./persync-provider";
import { BusinessThinkingState } from "./business-thinking-state";

const selectOptions = {
  currentSituation: [
    "Mahasiswa",
    "Fresh graduate",
    "Karyawan full-time",
    "Freelance",
    "Sedang cari kerja",
    "Sudah punya bisnis kecil",
    "Ibu rumah tangga",
    "Ingin pindah karier",
    "PHK / kehilangan pekerjaan",
    "Lainnya",
  ],
  mainGoal: [
    "Tambahan penghasilan",
    "Side hustle realistis",
    "Bisnis jangka panjang",
    "Ingin keluar dari kerja kantoran",
    "Bangun personal brand",
    "Bisnis online",
    "Penghasilan fleksibel",
    "Belajar bisnis dulu",
    "Cari peluang digital",
    "Lainnya",
  ],
  capitalRange: [
    "< 500 ribu",
    "500 ribu - 2 juta",
    "2 juta - 10 juta",
    "10 juta+",
    "Belum ada modal",
  ],
  timeAvailability: ["< 1 jam/hari", "1-2 jam/hari", "3-5 jam/hari", "Full-time", "Weekend only"],
  preferredWorkStyle: [
    "Remote / online",
    "Hybrid",
    "Offline lokal",
    "Flexible",
    "Kerja sendiri",
    "Dengan partner/tim",
  ],
  targetIncome: [
    "Tambahan kecil",
    "1-3 juta/bulan",
    "5 juta+/bulan",
    "Ingin scalable business",
    "Long-term wealth",
  ],
  marketFamiliarity: [
    "Belum paham market",
    "Sedikit tahu marketplace",
    "Pernah jualan online",
    "Pernah freelance/jasa",
    "Sudah pernah bisnis",
  ],
};

const skillCards = [
  { label: "Programming", icon: Code2, accent: "from-sky-400/18 to-cyan-400/10", featured: true },
  { label: "UI/UX Design", icon: Palette, accent: "from-violet-400/18 to-blue-400/10", featured: true },
  { label: "Marketing", icon: Megaphone, accent: "from-cyan-400/18 to-sky-400/10", featured: true },
  { label: "Photography", icon: Camera, accent: "from-amber-300/18 to-orange-300/10", featured: true },
  { label: "Copywriting", icon: PenTool, accent: "from-blue-400/18 to-indigo-400/10", featured: true },
  { label: "Sales", icon: Handshake, accent: "from-emerald-400/18 to-cyan-400/10", featured: true },
  { label: "Video Editing", icon: Video, accent: "from-fuchsia-400/16 to-violet-400/10", featured: true },
  { label: "E-commerce", icon: ShoppingBag, accent: "from-cyan-400/18 to-blue-400/10", featured: true },
  { label: "Graphic Design", icon: Palette, accent: "from-violet-400/18 to-cyan-400/10" },
  { label: "Content Creation", icon: Sparkles, accent: "from-sky-400/18 to-blue-400/10" },
  { label: "Social Media", icon: Megaphone, accent: "from-blue-400/18 to-violet-400/10" },
  { label: "Public Speaking", icon: Handshake, accent: "from-cyan-400/18 to-blue-400/10" },
  { label: "Gaming", icon: BrainCircuit, accent: "from-violet-400/16 to-sky-400/10" },
  { label: "Cooking", icon: BriefcaseBusiness, accent: "from-orange-300/18 to-amber-300/10" },
  { label: "Fashion", icon: ShoppingBag, accent: "from-fuchsia-400/16 to-rose-400/10" },
  { label: "Beauty", icon: Sparkles, accent: "from-rose-400/18 to-fuchsia-400/10" },
  { label: "Fitness", icon: BadgeCheck, accent: "from-emerald-400/18 to-cyan-400/10" },
  { label: "Music", icon: Sparkles, accent: "from-indigo-400/18 to-violet-400/10" },
  { label: "Teaching", icon: GraduationCap, accent: "from-sky-400/18 to-blue-400/10" },
  { label: "Admin / Data Entry", icon: BriefcaseBusiness, accent: "from-slate-300/16 to-blue-400/10" },
  { label: "AI Tools", icon: BrainCircuit, accent: "from-cyan-400/18 to-violet-400/10" },
  { label: "Marketplace", icon: ShoppingBag, accent: "from-sky-400/18 to-cyan-400/10" },
  { label: "Finance", icon: BriefcaseBusiness, accent: "from-emerald-400/18 to-blue-400/10" },
  { label: "Writing", icon: PenTool, accent: "from-indigo-400/18 to-sky-400/10" },
  { label: "Networking", icon: Handshake, accent: "from-cyan-400/18 to-emerald-400/10" },
  { label: "Customer Service", icon: Handshake, accent: "from-blue-400/18 to-sky-400/10" },
  { label: "Community Building", icon: Handshake, accent: "from-violet-400/16 to-blue-400/10" },
  { label: "Event Organizing", icon: BriefcaseBusiness, accent: "from-amber-300/18 to-orange-300/10" },
  { label: "Manual Craft / Handmade", icon: Sparkles, accent: "from-rose-400/16 to-orange-300/10" },
  { label: "Tech Enthusiast", icon: BrainCircuit, accent: "from-cyan-400/18 to-blue-400/10" },
  { label: "Automotive", icon: BriefcaseBusiness, accent: "from-slate-300/16 to-cyan-400/10" },
  { label: "Food & Beverage", icon: ShoppingBag, accent: "from-orange-300/18 to-amber-300/10" },
  { label: "Parenting", icon: GraduationCap, accent: "from-rose-400/16 to-fuchsia-400/10" },
  { label: "Travel", icon: BriefcaseBusiness, accent: "from-sky-400/18 to-emerald-400/10" },
  { label: "Lainnya", icon: Sparkles, accent: "from-white/12 to-white/4" },
];

const initialForm = {
  currentSituation: "",
  mainGoal: "",
  skillsInterests: [],
  capitalRange: "",
  timeAvailability: "",
  preferredWorkStyle: "",
  salesConfidence: "",
  targetIncome: "",
  marketFamiliarity: "",
};

const requiredFields = [
  "currentSituation",
  "mainGoal",
  "capitalRange",
  "timeAvailability",
  "preferredWorkStyle",
  "salesConfidence",
  "targetIncome",
  "marketFamiliarity",
];

const salesExperienceOptions = [
  "Belum pernah mulai",
  "Masih belajar",
  "Sudah pernah mencoba",
  "Sudah cukup nyaman",
];
const MIN_THINKING_MS = 2800;

const inputClassName =
  "w-full rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/24 focus:border-cyan-400/35 focus:bg-white/[0.05]";

const featuredSkillCards = skillCards.filter((skill) => skill.featured);
const extendedSkillCards = skillCards.filter((skill) => !skill.featured);

function SelectField({ label, helper, value, options, onChange, otherValue, onOtherChange }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.28em] text-white/34">{label}</span>
      <span className="mt-2 block text-sm leading-7 text-white/44">{helper}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClassName} mt-4 appearance-none`}
      >
        <option value="" className="bg-[#081225]">
          Pilih satu
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-[#081225]">
            {option}
          </option>
        ))}
      </select>
      {value === "Lainnya" ? (
        <input
          value={otherValue}
          onChange={(event) => onOtherChange(event.target.value)}
          className={`${inputClassName} mt-3`}
          placeholder="Tuliskan pilihan Anda"
        />
      ) : null}
    </label>
  );
}

export function GeneratorForm() {
  const router = useRouter();
  const { createSession } = usePersync();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThinkingState, setShowThinkingState] = useState(false);
  const [error, setError] = useState("");
  const [errorDetails, setErrorDetails] = useState(null);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [otherValues, setOtherValues] = useState({
    currentSituation: "",
    mainGoal: "",
    customSkill: "",
  });
  const [form, setForm] = useState(initialForm);

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const setOtherValue = (field, value) => {
    setOtherValues((current) => ({ ...current, [field]: value }));
  };

  const toggleSkill = (skill) => {
    setForm((current) => ({
      ...current,
      skillsInterests: current.skillsInterests.includes(skill)
        ? current.skillsInterests.filter((item) => item !== skill)
        : [...current.skillsInterests, skill],
    }));
  };

  const selectedSkillCount = form.skillsInterests.length;
  const visibleSkillCards = showAllSkills ? skillCards : featuredSkillCards;

  const submit = (event) => {
    event.preventDefault();
    setError("");
    setErrorDetails(null);

    if (requiredFields.some((field) => !form[field]) || form.skillsInterests.length === 0) {
      setError("Pilih minimal 1 skill atau minat agar analisis lebih relevan.");
      return;
    }

    if (
      (form.currentSituation === "Lainnya" && !otherValues.currentSituation.trim()) ||
      (form.mainGoal === "Lainnya" && !otherValues.mainGoal.trim()) ||
      (form.skillsInterests.includes("Lainnya") && !otherValues.customSkill.trim())
    ) {
      setError("Isi keterangan untuk pilihan Lainnya.");
      return;
    }

    const resolvedSkills = form.skillsInterests.filter((skill) => skill !== "Lainnya");
    if (form.skillsInterests.includes("Lainnya")) {
      resolvedSkills.push(otherValues.customSkill.trim());
    }

    const payload = {
      ...form,
      currentSituation:
        form.currentSituation === "Lainnya" ? otherValues.currentSituation.trim() : form.currentSituation,
      mainGoal: form.mainGoal === "Lainnya" ? otherValues.mainGoal.trim() : form.mainGoal,
      skillsInterests: resolvedSkills,
      additionalContext: "",
    };

    setIsSubmitting(true);

    window.setTimeout(() => {
      setShowThinkingState(true);
    }, 160);

    (async () => {
      try {
        const startedAt = Date.now();
        const response = await createSession(payload);
        const elapsed = Date.now() - startedAt;
        const remaining = Math.max(MIN_THINKING_MS - elapsed, 0);

        if (remaining > 0) {
          await new Promise((resolve) => window.setTimeout(resolve, remaining));
        }

        router.push(`/chat/${response.session.id}`);
      } catch (submitError) {
        setShowThinkingState(false);
        const code = submitError?.payload?.details?.code;

        if (code === "AI_TEMPORARILY_UNAVAILABLE") {
          setErrorDetails({
            title:
              submitError?.payload?.details?.headline || "Analysis is temporarily busy.",
            supportingText:
              submitError?.payload?.details?.supportingText ||
              "Permintaan sedang tinggi. Coba lagi beberapa saat lagi.",
          });
          return;
        }

        if (code !== "AUTH_REQUIRED" && code !== "DAILY_LIMIT_REACHED") {
          setError(submitError.message);
        }
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  if (showThinkingState) {
    return <BusinessThinkingState />;
  }

  return (
    <form onSubmit={submit} className="space-y-8 lg:space-y-10">
      <section className="hero-panel gradient-border relative overflow-hidden rounded-[32px] border border-white/8 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-11">
        <div className="hero-mesh pointer-events-none absolute inset-0" />
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-white/42">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300/72" strokeWidth={1.6} />
              Business profile
            </p>
            <h1
              className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.8rem]"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Temukan arah bisnis yang sesuai dengan sumber daya Anda.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/56">
              Persync menganalisis skill, modal, waktu, target pendapatan, dan akses pasar
              untuk menyusun rekomendasi yang dapat diuji.
            </p>
          </div>

          <div className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-white/48 lg:max-w-xs">
            <p>Fokus: model yang realistis.</p>
            <p>Ukuran awal: uang pertama.</p>
            <p>Dasar keputusan: validasi pasar.</p>
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[32px] px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="space-y-9">
          <div className="grid gap-8 lg:grid-cols-2">
            <SelectField
              label="Situasi kerja saat ini"
              helper="Kondisi yang menentukan ruang eksekusi bisnis."
              value={form.currentSituation}
              options={selectOptions.currentSituation}
              onChange={(value) => setField("currentSituation", value)}
              otherValue={otherValues.currentSituation}
              onOtherChange={(value) => setOtherValue("currentSituation", value)}
            />
            <SelectField
              label="Tujuan utama"
              helper="Target yang paling relevan untuk rekomendasi."
              value={form.mainGoal}
              options={selectOptions.mainGoal}
              onChange={(value) => setField("mainGoal", value)}
              otherValue={otherValues.mainGoal}
              onOtherChange={(value) => setOtherValue("mainGoal", value)}
            />
          </div>

          <div className="rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-4 sm:p-5">
            <div className="flex flex-col gap-3 border-b border-white/6 pb-4">
              <div className="flex items-start justify-between gap-3">
                <div className="max-w-xl">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/26">Skill fit</p>
                  <h2
                    className="mt-1.5 text-lg font-semibold text-white sm:text-[1.2rem]"
                    style={{ fontFamily: "var(--font-plus-jakarta)" }}
                  >
                    Apa skill utama kamu?
                  </h2>
                  <p className="mt-1.5 text-sm text-white/46">
                    Pilih beberapa bidang yang paling sesuai.
                  </p>
                </div>

                {selectedSkillCount > 0 ? (
                  <div className="inline-flex min-h-8 items-center rounded-full border border-white/8 bg-white/[0.03] px-2.5 text-[11px] text-white/60">
                    {selectedSkillCount} dipilih
                  </div>
                ) : null}
              </div>

              <p className="text-[11px] text-white/38">Pilih minimal 1 bidang yang paling sesuai.</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {visibleSkillCards.map((skill) => {
                const Icon = skill.icon;
                const active = form.skillsInterests.includes(skill.label);

                return (
                  <button
                    key={skill.label}
                    type="button"
                    onClick={() => toggleSkill(skill.label)}
                    className={`group relative overflow-hidden rounded-[20px] border p-3.5 text-left transition-all duration-200 ${
                      active
                        ? "border-cyan-400/22 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),rgba(96,165,250,0.08),rgba(255,255,255,0.02))] text-white shadow-[0_10px_24px_rgba(18,116,164,0.14)]"
                        : "border-white/7 bg-white/[0.02] text-white/72 hover:border-white/12 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${skill.accent} transition-opacity duration-200 ${
                        active ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <div className="relative z-10 flex min-h-[48px] items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span
                          className={`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-2xl border transition ${
                            active
                              ? "border-cyan-300/20 bg-white/[0.08] text-cyan-100"
                              : "border-white/8 bg-white/[0.03] text-white/56"
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" strokeWidth={1.9} />
                        </span>
                        <p
                          className={`line-clamp-2 text-sm font-medium leading-5 ${
                            active ? "text-white" : "text-white/76"
                          }`}
                        >
                          {skill.label}
                        </p>
                      </div>
                      <span
                        className={`inline-flex h-4.5 w-4.5 flex-shrink-0 items-center justify-center rounded-full border transition ${
                          active
                            ? "border-cyan-300/24 bg-cyan-300/14 text-cyan-100"
                            : "border-white/8 bg-white/[0.02] text-transparent"
                        }`}
                      >
                        <BadgeCheck className="h-3 w-3" strokeWidth={2.2} />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-3">
              <button
                type="button"
                onClick={() => setShowAllSkills((current) => !current)}
                className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-xs text-white/64 transition hover:border-white/14 hover:bg-white/[0.05] hover:text-white/84"
              >
                {showAllSkills ? (
                  <>
                    <ChevronUp className="h-4 w-4" strokeWidth={1.8} />
                    Sembunyikan kategori
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" strokeWidth={1.8} />
                    + Lihat kategori lainnya
                  </>
                )}
              </button>
            </div>

            {form.skillsInterests.includes("Lainnya") ? (
              <input
                value={otherValues.customSkill}
                onChange={(event) => setOtherValue("customSkill", event.target.value)}
                className={`${inputClassName} mt-4`}
                placeholder="Tambahkan skill atau minat lain"
              />
            ) : null}
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <SelectField
              label="Rentang modal"
              helper="Modal yang siap digunakan untuk validasi awal."
              value={form.capitalRange}
              options={selectOptions.capitalRange}
              onChange={(value) => setField("capitalRange", value)}
            />
            <SelectField
              label="Waktu yang dapat dialokasikan"
              helper="Waktu operasional yang tersedia secara rutin."
              value={form.timeAvailability}
              options={selectOptions.timeAvailability}
              onChange={(value) => setField("timeAvailability", value)}
            />
            <SelectField
              label="Gaya kerja pilihan"
              helper="Cara kerja yang paling mungkin dijalankan."
              value={form.preferredWorkStyle}
              options={selectOptions.preferredWorkStyle}
              onChange={(value) => setField("preferredWorkStyle", value)}
            />
            <SelectField
              label="Pengalaman jualan saat ini"
              helper="Pilih yang paling dekat dengan kondisi sekarang."
              value={form.salesConfidence}
              options={salesExperienceOptions}
              onChange={(value) => setField("salesConfidence", value)}
            />
            <SelectField
              label="Target penghasilan"
              helper="Ukuran hasil yang ingin dikejar dari model ini."
              value={form.targetIncome}
              options={selectOptions.targetIncome}
              onChange={(value) => setField("targetIncome", value)}
            />
            <SelectField
              label="Pemahaman pasar"
              helper="Pengalaman Anda melihat atau melayani pembeli."
              value={form.marketFamiliarity}
              options={selectOptions.marketFamiliarity}
              onChange={(value) => setField("marketFamiliarity", value)}
            />
          </div>

          {errorDetails ? (
            <div className="rounded-[20px] border border-blue-400/16 bg-blue-400/[0.08] px-4 py-3.5 text-sm text-blue-50/90">
              <p className="font-medium text-white/90">{errorDetails.title}</p>
              <p className="mt-1.5 leading-7 text-white/62">{errorDetails.supportingText}</p>
            </div>
          ) : null}

          {error ? (
            <div className="rounded-[20px] border border-rose-500/18 bg-rose-500/[0.08] px-4 py-3 text-sm text-rose-100/90">
              {error}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-7 text-white/42">
              Hasil mencakup rekomendasi utama, SWOT, jalur pendapatan, validasi, dan risiko.
            </p>
            <button
              type="submit"
              className="btn-primary min-w-[224px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={2} />
                  Analyzing...
                </>
              ) : (
                <>
                  Analisis bisnis saya
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </form>
  );
}
