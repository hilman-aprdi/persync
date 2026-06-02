"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronUp, LogOut, PenSquare, Sparkles } from "lucide-react";
import { HistoryList } from "../history-list";
import { GoogleLoginButton } from "../google-login-button";
import { MobileAccountMenu } from "./mobile-account-menu";

export function SidebarContent({
  history,
  viewer,
  onClose,
  onDeleteSession,
  onLogout,
  onContinueWithGoogle,
  isGoogleSubmitting,
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const user = viewer?.user;
  const usage = viewer?.usage;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="border-b border-white/8 px-4 pb-4 pt-6 pr-12 lg:pt-5 lg:pr-4">
        <Link href="/" onClick={onClose} className="mx-auto block w-full max-w-[168px]">
          <div className="relative aspect-[3.6/1] w-full">
            <Image
              src="/assets/persync-logo.png"
              alt="Persync"
              fill
              priority
              sizes="(max-width: 1024px) 140px, 168px"
              className="object-contain object-center"
            />
          </div>
        </Link>

        <button
          type="button"
          onClick={() => {
            onClose?.();
            router.push("/new");
          }}
          className={`mt-4 flex w-full items-center justify-between rounded-[20px] border px-4 py-3 text-left transition ${
            pathname === "/new"
              ? "border-cyan-400/18 bg-cyan-400/[0.07] text-white"
              : "border-white/8 bg-white/[0.03] text-white/78 hover:bg-white/[0.05]"
          }`}
        >
          <div>
            <p className="text-sm font-medium">New Analysis</p>
            <p className="mt-1 text-xs text-white/36">Susun arah bisnis baru.</p>
          </div>
          <PenSquare className="h-4 w-4 flex-shrink-0" strokeWidth={1.8} />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 app-sidebar-scroll">
        <HistoryList
          items={history}
          canDelete={Boolean(viewer?.isAuthenticated)}
          onDeleteSession={onDeleteSession}
          onNavigate={onClose}
        />
      </div>

      <div className="border-t border-white/8 p-4">
        <div className="rounded-[20px] border border-white/8 bg-white/[0.025] px-3.5 py-3.5 sm:px-4 sm:py-4">
          {user ? (
            <>
              <button
                type="button"
                onClick={() => setIsAccountMenuOpen(true)}
                className="flex w-full items-center gap-3 text-left lg:hidden"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-sm font-semibold text-white/85">
                    {user.firstName?.slice(0, 1) || "P"}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white/82">{user.fullName}</p>
                  <p className="mt-1 text-xs text-white/42">
                    {usage ? `${usage.remaining} token tersisa` : "Mengecek limit sesi..."}
                  </p>
                </div>
                    <ChevronUp className="h-4 w-4 flex-shrink-0 text-white/24" strokeWidth={1.8} />
              </button>

              <div className="hidden lg:block">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/24">Token</p>
                    <p className="mt-1 text-xs text-white/62">
                      {usage ? `${usage.remaining} tersisa dari ${usage.limit}` : "Mengecek limit sesi..."}
                    </p>
                  </div>
                  <Sparkles className="h-3.5 w-3.5 flex-shrink-0 text-cyan-300/55" strokeWidth={1.6} />
                </div>

                <div className="mt-3 flex items-center gap-3">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName}
                      className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-sm font-semibold text-white/85">
                      {user.firstName?.slice(0, 1) || "P"}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white/82">{user.fullName}</p>
                    <p className="truncate text-xs text-white/36">{user.email}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <p className="text-xs text-white/42">
                    {usage ? `${usage.remaining} token tersisa` : "Token belum tersedia"}
                  </p>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="inline-flex items-center gap-1.5 rounded-full px-1 py-1 text-xs text-white/46 transition hover:text-white/74"
                  >
                    <LogOut className="h-3.5 w-3.5" strokeWidth={1.8} />
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-3">
              <p className="mb-3 text-sm leading-6 text-white/44">
                Login dengan Google untuk membuka rekomendasi bisnis berikutnya.
              </p>
              <GoogleLoginButton
                onCredential={onContinueWithGoogle}
                disabled={isGoogleSubmitting}
              />
            </div>
          )}
        </div>
      </div>

      <MobileAccountMenu
        open={isAccountMenuOpen}
        user={user}
        onClose={() => setIsAccountMenuOpen(false)}
        onLogout={onLogout}
      />
    </div>
  );
}
