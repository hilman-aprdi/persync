"use client";

import { LogOut, X } from "lucide-react";

export function MobileAccountMenu({ open, user, onClose, onLogout }) {
  if (!open || !user) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        aria-label="Tutup menu akun"
        className="fixed inset-0 z-[95] bg-[#020617]/40"
        onClick={onClose}
      />
      <div className="fixed inset-x-3 bottom-3 z-[96] rounded-[20px] border border-white/6 bg-[#111827]/96 p-4 shadow-[0_16px_30px_rgba(2,6,23,0.2)] lg:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.fullName}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.06] text-sm font-semibold text-white/85">
                {user.firstName?.slice(0, 1) || "P"}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white/84">{user.fullName}</p>
              <p className="truncate text-xs text-white/40">{user.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/34 transition hover:text-white/74"
            aria-label="Tutup menu akun"
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>

        <div className="mt-4 border-t border-white/6 pt-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="flex w-full items-center gap-2 rounded-[14px] px-3 py-2.5 text-left text-sm text-white/74 transition hover:bg-white/[0.04] hover:text-white"
          >
            <LogOut className="h-4 w-4" strokeWidth={1.8} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
