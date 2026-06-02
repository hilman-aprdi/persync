"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function LandingNavbar() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const syncScrollState = () => {
      setIsAtTop(window.scrollY < 20);
    };

    syncScrollState();
    window.addEventListener("scroll", syncScrollState, { passive: true });

    return () => window.removeEventListener("scroll", syncScrollState);
  }, []);

  return (
    <nav className={`nav-glass ${isAtTop ? "nav-glass-top" : ""}`}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full bg-linear-to-br from-cyan-300/80 via-blue-300/50 to-violet-200/40 shadow-[0_0_16px_rgba(96,183,255,0.2)]"
            aria-hidden="true"
          />
          <span
            className="text-lg font-semibold tracking-tight text-white/90"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Persync
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="nav-link">
            Fitur
          </a>
          <a href="#how-it-works" className="nav-link">
            Cara kerja
          </a>
          <a href="#insights" className="nav-link">
            Insight
          </a>
        </div>

        <Link
          href="/new"
          className="btn-primary hidden px-5 py-2.5 text-xs font-semibold sm:inline-flex"
        >
          Mulai analisis bisnis
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>
    </nav>
  );
}
