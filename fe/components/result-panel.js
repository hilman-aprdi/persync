"use client";

import Link from "next/link";
import { ArrowRight, Banknote, CircleAlert, Compass, Target } from "lucide-react";

const detailMetrics = [
  ["Tipe bisnis", "businessType"],
  ["Tingkat kesulitan", "difficultyLevel"],
  ["Level modal", "capitalLevel"],
  ["Estimasi hasil awal", "timeToFirstResult"],
];

const swotItems = [
  ["Strength", "strength"],
  ["Weakness", "weakness"],
  ["Opportunity", "opportunity"],
  ["Threat", "threat"],
];

const displayValue = (value) => value || "Belum tersedia untuk analisis lama.";

export function ResultPanel({ session }) {
  const result = session.result;

  return (
    <div className="space-y-8 lg:space-y-10">
      <section className="hero-panel gradient-border relative overflow-hidden rounded-[32px] border border-white/8 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-11">
        <div className="hero-mesh pointer-events-none absolute inset-0" />
        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.28em] text-white/34">Business direction</p>
          <h1
            className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.8rem]"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            {displayValue(result.mainBusinessDirection)}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/56">
            {displayValue(result.businessSummary)}
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {detailMetrics.map(([label, key]) => (
              <div key={key} className="rounded-[20px] border border-white/8 bg-white/[0.035] px-4 py-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/32">{label}</p>
                <p className="mt-2 text-sm font-medium text-white/76">{displayValue(result[key])}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[32px] px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="space-y-8">
          <div className="grid gap-4 lg:grid-cols-[1fr_1.05fr]">
            <section className="rounded-[26px] border border-white/8 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-white/34">Why this fits</p>
              <div className="mt-5 space-y-3">
                {(result.whyThisFits.length ? result.whyThisFits : ["Belum tersedia untuk analisis lama."]).map(
                  (item, index) => (
                    <div key={`${item}-${index}`} className="flex gap-3 text-sm leading-7 text-white/68">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-300/65" />
                      <p>{item}</p>
                    </div>
                  ),
                )}
              </div>
            </section>

            <section className="rounded-[26px] border border-cyan-400/14 bg-cyan-400/[0.045] p-6">
              <div className="flex items-center gap-2 text-cyan-200/65">
                <Banknote className="h-4 w-4" strokeWidth={1.8} />
                <p className="text-xs uppercase tracking-[0.28em]">First money path</p>
              </div>
              <p className="mt-4 text-lg leading-8 text-white/86">
                {displayValue(result.firstMoneyPath)}
              </p>
              <p className="mt-5 text-xs uppercase tracking-[0.26em] text-white/34">
                Validasi realistis
              </p>
              <p className="mt-2 text-sm leading-7 text-white/64">
                {displayValue(result.realisticValidation)}
              </p>
            </section>
          </div>

          <section>
            <p className="text-xs uppercase tracking-[0.28em] text-white/34">SWOT analysis</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {swotItems.map(([label, key]) => (
                <div key={key} className="rounded-[22px] border border-white/8 bg-white/[0.03] p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/38">
                    {label}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/68">
                    {displayValue(result.swotAnalysis?.[key])}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-[26px] border border-white/8 bg-white/[0.03] p-6">
              <div className="flex items-center gap-2 text-white/46">
                <Target className="h-4 w-4 text-cyan-300/66" strokeWidth={1.8} />
                <p className="text-xs uppercase tracking-[0.28em]">First action steps</p>
              </div>
              <div className="mt-5 space-y-3">
                {(result.firstSteps.length ? result.firstSteps : ["Belum tersedia untuk analisis lama."]).map(
                  (step, index) => (
                    <div
                      key={`${step}-${index}`}
                      className="flex gap-4 rounded-[20px] border border-white/8 bg-white/[0.025] p-4"
                    >
                      <span className="text-xs font-medium text-cyan-200/56">0{index + 1}</span>
                      <p className="text-sm leading-7 text-white/74">{step}</p>
                    </div>
                  ),
                )}
              </div>
            </section>

            <section className="rounded-[26px] border border-white/8 bg-white/[0.03] p-6">
              <div className="flex items-center gap-2 text-white/46">
                <Compass className="h-4 w-4 text-cyan-300/66" strokeWidth={1.8} />
                <p className="text-xs uppercase tracking-[0.28em]">Alternative directions</p>
              </div>
              <div className="mt-5 space-y-3">
                {(result.alternativeBusinessIdeas.length
                  ? result.alternativeBusinessIdeas
                  : ["Belum tersedia untuk analisis lama."]
                ).map((idea, index) => (
                  <p
                    key={`${idea}-${index}`}
                    className="rounded-[20px] border border-white/8 bg-white/[0.025] px-4 py-3 text-sm leading-7 text-white/68"
                  >
                    {idea}
                  </p>
                ))}
              </div>
            </section>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <section className="rounded-[26px] border border-white/8 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-white/34">Market insight</p>
              <p className="mt-4 text-sm leading-7 text-white/68">{displayValue(result.marketInsight)}</p>
              <p className="mt-5 text-xs uppercase tracking-[0.28em] text-white/34">
                Long-term potential
              </p>
              <p className="mt-3 text-sm leading-7 text-white/68">
                {displayValue(result.longTermPotential)}
              </p>
            </section>

            <section className="rounded-[26px] border border-rose-400/12 bg-rose-400/[0.035] p-6">
              <div className="flex items-center gap-2 text-rose-200/72">
                <CircleAlert className="h-4 w-4" strokeWidth={1.8} />
                <p className="text-xs uppercase tracking-[0.28em]">Risks and warning</p>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/68">{displayValue(result.warningRisk)}</p>
              <p className="mt-5 text-xs uppercase tracking-[0.28em] text-white/34">Execution focus</p>
              <p className="mt-3 text-sm leading-7 text-white/72">{displayValue(result.executionFocus)}</p>
            </section>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-7 text-white/44">
              Target: {session.targetIncome || session.mainGoal}. Modal: {session.capitalRange}.
              Waktu: {session.timeAvailability}.
            </p>
            <Link href="/new" className="btn-secondary shrink-0">
              Analisis baru
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
