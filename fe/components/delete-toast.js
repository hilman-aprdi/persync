"use client";

import { RotateCcw, X } from "lucide-react";

export function DeleteToast({ toast, onUndo, onClose }) {
  if (!toast) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[120] w-[calc(100vw-2rem)] max-w-sm rounded-[22px] border border-white/10 bg-[#09111f]/88 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-xl">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-white/90">{toast.message}</p>
          {toast.supportingText ? (
            <p className="mt-1 text-xs leading-6 text-white/46">{toast.supportingText}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-white/46 transition hover:text-white/78"
          aria-label="Tutup notifikasi"
        >
          <X className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </div>

      {toast.canUndo ? (
        <button
          type="button"
          onClick={() => onUndo(toast.sessionId)}
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/76 transition hover:bg-white/[0.06] hover:text-white"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={1.8} />
          Undo
        </button>
      ) : null}
    </div>
  );
}
