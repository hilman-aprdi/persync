"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

export function MobileWorkspaceHeader({ onOpenSidebar }) {
  return (
    <header className="nav-blur sticky top-0 z-30 flex items-center justify-between gap-3 rounded-[18px] border border-white/8 bg-[#111827]/78 px-4 py-3 lg:hidden">
      <Link href="/" className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-linear-to-br from-cyan-300/80 via-blue-300/50 to-violet-200/40 shadow-[0_0_16px_rgba(96,183,255,0.2)]" />
        <span
          className="text-sm font-semibold tracking-tight text-white/90"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Persync Advisor
        </span>
      </Link>

      <button
        type="button"
        onClick={onOpenSidebar}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-white/68"
        aria-label="Buka sidebar"
      >
        <Menu className="h-4 w-4" strokeWidth={1.8} />
      </button>
    </header>
  );
}
