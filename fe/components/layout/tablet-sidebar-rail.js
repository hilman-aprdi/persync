"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Clock3, PenSquare } from "lucide-react";

export function TabletSidebarRail({ history, onOpenSidebar }) {
  const pathname = usePathname();
  const router = useRouter();
  const recent = history.slice(0, 4);

  return (
    <aside className="sticky top-0 hidden h-screen w-[92px] shrink-0 border-r border-white/8 bg-[#070b14]/72 px-3 py-5 backdrop-blur-2xl md:flex lg:hidden">
      <div className="flex w-full flex-col items-center gap-3">
        <Link href="/" className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03]">
          <span className="h-2.5 w-2.5 rounded-full bg-linear-to-br from-cyan-300/80 via-blue-300/50 to-violet-200/40 shadow-[0_0_16px_rgba(96,183,255,0.2)]" />
        </Link>

        <button
          type="button"
          onClick={() => router.push("/new")}
          className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition ${
            pathname === "/new"
              ? "border-cyan-400/22 bg-cyan-400/[0.08] text-white"
              : "border-white/8 bg-white/[0.03] text-white/65"
          }`}
          aria-label="New generate"
        >
          <PenSquare className="h-4 w-4" strokeWidth={1.8} />
        </button>

        <button
          type="button"
          onClick={onOpenSidebar}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03] text-white/65"
          aria-label="Lihat riwayat"
        >
          <Clock3 className="h-4 w-4" strokeWidth={1.8} />
        </button>

        <div className="mt-2 flex w-full flex-col items-center gap-2">
          {recent.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => router.push(`/chat/${item.id}`)}
              className="h-11 w-11 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] px-2 text-[10px] leading-4 text-white/55"
              title={item.result?.mainBusinessDirection || "Analisis bisnis"}
            >
              {(item.result?.mainBusinessDirection || "B")
                .split(" ")
                .slice(0, 2)
                .map((part) => part[0] || "")
                .join("")
                .toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
