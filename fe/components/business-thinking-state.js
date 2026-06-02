"use client";

import { useEffect, useMemo, useState } from "react";
import { BadgeCheck, BrainCircuit } from "lucide-react";

const thinkingSteps = [
  "Reading current situation",
  "Evaluating available time",
  "Matching realistic business models",
  "Analyzing market opportunities",
  "Checking execution feasibility",
  "Identifying realistic income path",
  "Preparing business direction",
];

export function BusinessThinkingState() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => Math.min(current + 1, thinkingSteps.length - 1));
    }, 1200);

    return () => window.clearInterval(intervalId);
  }, []);

  const completedCount = useMemo(() => activeIndex + 1, [activeIndex]);

  return (
    <section className="reveal relative overflow-hidden rounded-[32px] border border-white/8 bg-white/[0.025] px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      <div className="hero-mesh pointer-events-none absolute inset-0 opacity-80" />

      <div className="relative z-10 mx-auto flex min-h-[68svh] max-w-3xl flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-white/44">
          <BrainCircuit className="h-3.5 w-3.5 text-blue-400/82" strokeWidth={1.7} />
          Analysis in progress
          <span className="thinking-breath inline-flex h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
        </div>

        <h1
          className="mt-6 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.85rem]"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Analyzing your business fit
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/52 sm:text-base sm:leading-8">
          Reading your constraints, opportunities, and realistic business direction.
        </p>

        <div className="mt-8 w-full max-w-xl rounded-[24px] border border-white/8 bg-white/[0.03] p-5 text-left">
          <div className="space-y-3">
            {thinkingSteps.map((step, index) => {
              const isDone = index < completedCount;
              const isActive = index === activeIndex;

              return (
                <div
                  key={step}
                  className={`flex items-center gap-3 rounded-[18px] px-3 py-2.5 transition-all duration-300 ${
                    isActive
                      ? "thinking-line-active thinking-step-active bg-white/[0.05] pl-5 text-white"
                      : "text-white/44"
                  }`}
                >
                  <span
                    className={`inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isDone
                        ? "border-cyan-300/18 bg-cyan-300/10 text-cyan-100"
                        : "border-white/8 bg-white/[0.02] text-transparent"
                    }`}
                  >
                    <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  <p
                    className={`text-sm leading-6 transition-all duration-300 ${
                      isActive ? "translate-y-0 text-white/84" : "translate-y-0.5 text-white/44"
                    }`}
                  >
                    {step}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
          <div className="thinking-shimmer rounded-[22px] border border-white/6 bg-white/[0.02] px-4 py-4 text-left">
            <div className="h-2 w-20 rounded-full bg-white/10" />
            <div className="mt-4 h-2 w-28 rounded-full bg-white/8" />
            <div className="mt-2 h-2 w-24 rounded-full bg-white/6" />
          </div>
          <div className="thinking-shimmer rounded-[22px] border border-white/6 bg-white/[0.02] px-4 py-4 text-left">
            <div className="h-2 w-16 rounded-full bg-white/10" />
            <div className="mt-4 h-2 w-24 rounded-full bg-white/8" />
            <div className="mt-2 h-2 w-20 rounded-full bg-white/6" />
          </div>
          <div className="thinking-shimmer rounded-[22px] border border-white/6 bg-white/[0.02] px-4 py-4 text-left">
            <div className="h-2 w-[4.5rem] rounded-full bg-white/10" />
            <div className="mt-4 h-2 w-[6.5rem] rounded-full bg-white/8" />
            <div className="mt-2 h-2 w-[5.5rem] rounded-full bg-white/6" />
          </div>
        </div>
      </div>
    </section>
  );
}
