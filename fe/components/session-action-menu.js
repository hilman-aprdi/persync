"use client";

import { MoreHorizontal, Trash2 } from "lucide-react";

export function SessionActionMenu({ open, onToggle, onDelete }) {
  return (
    <div className="relative z-10 flex items-center">
      <button
        type="button"
        aria-label="Aksi session"
        onClick={onToggle}
        className={`inline-flex h-7 w-7 items-center justify-center text-white/24 transition-all duration-200 hover:text-white/62 lg:h-8 lg:w-8 lg:rounded-full lg:border lg:border-white/6 lg:bg-white/[0.02] lg:text-white/38 lg:hover:border-white/10 lg:hover:bg-white/[0.04] lg:hover:text-white/72 ${
          open
            ? "translate-y-0 opacity-100"
            : "opacity-100 lg:translate-y-1 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
        }`}
      >
        <MoreHorizontal className="h-4 w-4" strokeWidth={1.8} />
      </button>

      {open ? (
        <div className="absolute bottom-8 right-0 w-[112px] origin-bottom-right rounded-[11px] border border-white/6 bg-[#111827]/96 p-0.5 shadow-[0_10px_20px_rgba(2,6,23,0.18)] transition-all duration-200 ease-out motion-safe:animate-[popoverIn_180ms_ease-out] lg:bottom-auto lg:right-0 lg:top-8 lg:origin-top-right">
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex w-full items-center justify-center gap-1 rounded-[8px] border border-rose-500/12 bg-[#2a1115] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-rose-100/82 transition hover:border-rose-500/18 hover:bg-[#341419]"
          >
            <Trash2 className="h-2.5 w-2.5" strokeWidth={1.8} />
            DELETE
          </button>
        </div>
      ) : null}
    </div>
  );
}
