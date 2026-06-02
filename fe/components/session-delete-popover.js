"use client";

import { Trash2 } from "lucide-react";

export function SessionDeletePopover({ open, title, onCancel, onConfirm, isSubmitting = false }) {
  if (!open) {
    return null;
  }

  return (
    <div className="absolute bottom-8 right-0 z-20 w-[164px] origin-bottom-right rounded-[11px] border border-white/6 bg-[#111827]/97 p-2 shadow-[0_10px_20px_rgba(2,6,23,0.18)] transition-all duration-200 ease-out motion-safe:animate-[popoverIn_180ms_ease-out] lg:bottom-auto lg:right-0 lg:top-8 lg:origin-top-right">
      <p className="text-xs font-medium text-white/88">Delete this session?</p>
      {title ? <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-white/42">{title}</p> : null}
      <div className="mt-2 flex items-center justify-end gap-1">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center rounded-full border border-white/6 bg-white/[0.02] px-2 py-[3px] text-[10px] text-white/68 transition hover:border-white/10 hover:bg-white/[0.04] hover:text-white/88"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-1 rounded-full border border-rose-500/14 bg-[#2a1115] px-2 py-[3px] text-[10px] font-medium uppercase tracking-[0.14em] text-rose-50/90 transition hover:border-rose-500/18 hover:bg-[#341419] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Trash2 className="h-2.5 w-2.5" strokeWidth={1.8} />
          DELETE
        </button>
      </div>
    </div>
  );
}
