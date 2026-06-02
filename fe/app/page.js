import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Compass,
  MoveRight,
  NotebookPen,
  PlayCircle,
  Quote,
  Route,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { LandingNavbar } from "../components/landing-navbar";

const features = [
  {
    title: "Analisis kondisi bisnis",
    description:
      "Memetakan modal, skill, waktu, target penghasilan, dan peluang pasar.",
    icon: BrainCircuit,
  },
  {
    title: "Ide yang lebih realistis",
    description:
      "Fokus pada bisnis yang paling mungkin dijalankan dari kondisi Anda sekarang.",
    icon: Target,
  },
  {
    title: "Langkah mulai yang jelas",
    description:
      "Dapatkan validasi awal, jalur uang pertama, dan langkah kecil yang bisa dicoba.",
    icon: Route,
  },
];

const steps = [
  {
    title: "Step 1",
    text: "Anda mengisi kondisi, modal, skill, waktu, dan target bisnis.",
    icon: NotebookPen,
  },
  {
    title: "Step 2",
    text: "Persync membaca peluang yang paling realistis untuk dicoba.",
    icon: Compass,
  },
  {
    title: "Step 3",
    text: "Anda mendapat arah bisnis, SWOT, risiko, dan langkah awal.",
    icon: Route,
  },
];

const audience = [
  "mahasiswa",
  "fresh graduate",
  "karyawan full-time",
  "freelancer",
  "pemilik skill digital",
  "ingin side hustle realistis",
  "baru mulai jualan",
  "ingin validasi usaha kecil",
];

const insightCards = [
  "Baru sadar ternyata masalah utama saya bukan modal, tapi bingung mulai.",
  "Saya jadi tahu bisnis mana yang realistis dicoba dulu.",
  "Persync membantu memperkecil pilihan yang terlalu luas.",
];

export const metadata = {
  title: "Persync | AI Business Advisor untuk Ide Bisnis Realistis",
  description:
    "AI business advisor untuk membantu memilih ide bisnis realistis berdasarkan modal, skill, waktu, dan kondisi nyata Anda sekarang.",
};

export default function HomePage() {
  return (
    <main className="site-shell">
      <div className="site-background" aria-hidden="true" />
      <div className="site-grid-overlay" aria-hidden="true" />
      <div className="site-noise-overlay" aria-hidden="true" />

      <LandingNavbar />

      <section
        aria-labelledby="hero-heading"
        className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pb-12 pt-24 sm:min-h-[82vh] sm:px-8 sm:pb-14 lg:px-10 lg:pt-28"
      >
        <div className="hero-radial-bg" />
        <div className="relative z-10 mx-auto flex w-full max-w-[1160px] flex-col items-center gap-6 text-center">
          <span className="badge-pill">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" strokeWidth={1.5} aria-hidden="true" />
            AI business advisor
          </span>

          <div className="w-56 sm:w-64 md:w-72 lg:w-80">
            <img
              src="/assets/persync-logo.png"
              alt="Persync logo"
              className="h-auto w-full object-contain"
            />
          </div>

          <header className="space-y-4">
            <h1
              id="hero-heading"
              className="mx-auto max-w-5xl text-[2.9rem] font-semibold leading-[0.96] tracking-[-0.05em] text-white sm:text-[3.8rem] lg:text-[5rem] xl:text-[5.5rem]"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Realistic business.
              <br />
              <span
                className="font-serif text-transparent italic font-normal"
                style={{
                  fontFamily: "'Playfair Display', 'Georgia', serif",
                  background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Better direction.
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-[15px] leading-7 text-white/56 sm:text-base sm:leading-8">
              Persync menyusun arah bisnis dari kondisi nyata Anda: modal, skill, waktu,
              akses pasar, dan target pendapatan.
            </p>
          </header>

          <div className="flex w-full max-w-xl flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-center">
            <Link href="/new" className="btn-primary w-full sm:w-auto">
              <span>Analyze my business fit</span>
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </Link>
            <a href="#how-it-works" className="btn-secondary w-full sm:w-auto">
              <PlayCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              <span>See how it works</span>
            </a>
          </div>

        </div>
      </section>

      <section
        id="features"
        aria-labelledby="features-heading"
        className="relative px-6 py-16 sm:px-8 sm:py-[4.5rem] lg:px-10 lg:py-20"
      >
        <div className="mx-auto max-w-[1360px]">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.32em] text-white/38">Fitur utama</p>
            <h2
              id="features-heading"
              className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Analisis bisnis AI yang lebih grounded dan bisa dieksekusi.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="glass-card rounded-[26px] p-6 lg:p-7">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-cyan-300/78 ring-1 ring-white/8">
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-white/90">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/50">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        aria-labelledby="timeline-heading"
        className="relative px-6 py-16 sm:px-8 sm:py-[4.5rem] lg:px-10 lg:py-20"
      >
        <div className="mx-auto max-w-[1360px]">
          <div className="grid items-start gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.32em] text-white/38">Cara kerja</p>
              <h2
                id="timeline-heading"
                className="max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-4xl"
                style={{ fontFamily: "var(--font-plus-jakarta)" }}
              >
                Dari kondisi nyata ke arah bisnis yang lebih masuk akal.
              </h2>

              <div className="relative mt-8 pl-10">
                <div className="absolute bottom-4 left-4 top-4 w-px bg-gradient-to-b from-blue-500/28 via-cyan-500/16 to-transparent" />
                <div className="space-y-6">
                  {steps.map((step, index) => {
                    const StepIcon = step.icon;
                    return (
                      <article key={step.text} className="relative flex gap-4">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-[11px] font-semibold text-white/72 backdrop-blur-sm">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="space-y-1 pt-0.5">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/34">
                            <StepIcon
                              className="h-3.5 w-3.5 text-cyan-300/58"
                              strokeWidth={1.6}
                              aria-hidden="true"
                            />
                            <span>{step.title}</span>
                          </div>
                          <p className="max-w-xl text-[15px] leading-7 text-white/58">
                            {step.text}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>

            <aside className="glass-card-static rounded-[26px] p-6 text-sm leading-7 text-white/50 lg:p-7">
              <p className="font-medium text-white/82">Output yang Anda dapat</p>
              <p className="mt-3">
                Persync tidak berhenti di ide. Hasilnya mencakup arah bisnis utama, SWOT,
                jalur uang pertama, validasi awal, dan risiko yang perlu diuji.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="audience-heading"
        className="relative px-6 py-16 sm:px-8 sm:py-[4.5rem] lg:px-10 lg:py-20"
      >
        <div className="mx-auto max-w-[1360px]">
          <div className="glass-card-static rounded-[26px] p-7 lg:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <Users className="h-4 w-4 text-cyan-300/60" strokeWidth={1.5} aria-hidden="true" />
              <p id="audience-heading" className="text-xs uppercase tracking-[0.32em] text-white/38">
                Cocok untuk yang ingin mulai dengan realistis
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {audience.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/8 bg-white/[0.035] px-4 py-2 text-sm text-white/50 backdrop-blur-sm transition-colors duration-300 hover:border-blue-500/18 hover:bg-white/[0.05] hover:text-white/72"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="insights"
        aria-labelledby="insight-heading"
        className="relative px-6 py-16 sm:px-8 sm:py-[4.5rem] lg:px-10 lg:py-20"
      >
        <div className="mx-auto max-w-[1360px]">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <p className="text-xs uppercase tracking-[0.32em] text-white/38">Insight pengguna</p>
            <h2
              id="insight-heading"
              className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              Feedback yang lebih jujur dan membumi
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {insightCards.map((text, index) => (
              <article
                key={index}
                className="glass-card rounded-[26px] p-6 text-sm leading-7 text-white/54"
              >
                <Quote className="mb-4 h-5 w-5 text-white/14" strokeWidth={1.5} aria-hidden="true" />
                <p className="text-white/82">&ldquo;{text}&rdquo;</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="final-heading"
        className="relative px-6 py-16 sm:px-8 sm:py-[4.5rem] lg:px-10 lg:py-20"
      >
        <div className="mx-auto max-w-[1360px]">
          <div className="glass-card-static rounded-[26px] p-8 lg:p-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2
                  id="final-heading"
                  className="text-3xl font-semibold leading-tight text-white sm:text-4xl"
                  style={{ fontFamily: "var(--font-plus-jakarta)" }}
                >
                  Mulai dari arah bisnis yang paling realistis dulu.
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-white/50 sm:text-base">
                  Validasi kecil lebih berguna daripada ide besar yang tidak dijalankan.
                </p>
              </div>
              <Link href="/new" className="btn-primary flex-shrink-0">
                <span>Mulai analisis</span>
                <MoveRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative px-6 pb-8 pt-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1360px]">
          <div className="divider-line mb-8" />
          <div className="flex flex-col gap-4 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <span className="inline-flex items-center gap-2 text-white/60">
              <span
                className="h-2.5 w-2.5 rounded-full bg-linear-to-br from-cyan-300/70 via-blue-300/40 to-violet-200/40 shadow-[0_0_12px_rgba(96,183,255,0.16)]"
                aria-hidden="true"
              />
              Persync - AI Business Advisor
            </span>
            <span>Copyright &copy; 2026 ALTAIR</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
