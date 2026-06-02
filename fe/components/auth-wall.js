"use client";

import { X } from "lucide-react";
import { GoogleLoginButton } from "./google-login-button";

export function AuthWall({ open, details, onClose, onContinueWithGoogle, isSubmitting }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#040814]/74 px-4 backdrop-blur-md">
      <button
        type="button"
        aria-label="Tutup"
        className="absolute inset-0"
        onClick={onClose}
      />
      <div className="relative z-[91] w-full max-w-md rounded-[30px] border border-white/10 bg-[#09111f]/92 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-7">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-white/55 transition hover:text-white/85"
          aria-label="Tutup"
        >
          <X className="h-4 w-4" strokeWidth={1.8} />
        </button>

        <p className="text-xs uppercase tracking-[0.28em] text-white/35">Continue</p>
        <h2
          className="mt-3 text-2xl font-semibold text-white"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          {details?.headline || "Continue your business analysis."}
        </h2>
        <p className="mt-4 text-sm leading-7 text-white/55">
          {details?.supportingText || "Login untuk membuka rekomendasi bisnis berikutnya."}
        </p>

        <div className="mt-6 rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
          <div className="space-y-2 text-sm text-white/60">
            <p>Buka rekomendasi bisnis berikutnya dengan akun Google.</p>
            <p>Akses riwayat analisis yang dibuat saat sudah login.</p>
            <p>Lanjutkan kapan pun dengan akun Google.</p>
          </div>
        </div>

        <div className="mt-6">
          <GoogleLoginButton onCredential={onContinueWithGoogle} disabled={isSubmitting} />
        </div>
      </div>
    </div>
  );
}
