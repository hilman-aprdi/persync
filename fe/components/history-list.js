"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SessionActionMenu } from "./session-action-menu";
import { SessionDeletePopover } from "./session-delete-popover";

const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const getGroupLabel = (date) => {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const weekAgo = new Date(now);
  weekAgo.setDate(now.getDate() - 7);

  if (isSameDay(date, now)) {
    return "Hari Ini";
  }

  if (isSameDay(date, yesterday)) {
    return "Kemarin";
  }

  if (date >= weekAgo) {
    return "Minggu Ini";
  }

  return "Sebelumnya";
};

const formatTime = (value) => {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return "";
  }
};

export function HistoryList({ items = [], canDelete = false, onDeleteSession, onNavigate }) {
  const pathname = usePathname();
  const router = useRouter();
  const [popoverState, setPopoverState] = useState({ id: null, mode: null });
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef(null);

  const groups = useMemo(() => {
    const mapped = new Map();

    items.forEach((item) => {
      const groupLabel = getGroupLabel(new Date(item.createdAt));
      const group = mapped.get(groupLabel) || [];
      group.push(item);
      mapped.set(groupLabel, group);
    });

    return Array.from(mapped.entries());
  }, [items]);

  const openSession = (id) => {
    onNavigate?.();
    router.push(`/chat/${id}`);
  };

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setPopoverState({ id: null, mode: null });
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  if (items.length === 0) {
    return (
      <div className="rounded-[20px] border border-dashed border-white/10 bg-white/[0.02] px-4 py-5 text-sm leading-7 text-white/42">
        Riwayat analisis bisnis akan muncul setelah rekomendasi pertama dibuat.
      </div>
    );
  }

  const confirmDelete = async () => {
    if (!popoverState.id || popoverState.mode !== "confirm" || !onDeleteSession) {
      return;
    }

    setIsDeleting(true);
    try {
      const active = pathname === `/chat/${popoverState.id}`;
      await onDeleteSession(popoverState.id);
      if (active) {
        router.replace("/new");
      }
      setPopoverState({ id: null, mode: null });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div ref={containerRef} className="space-y-5">
        {groups.map(([label, group]) => (
          <div key={label}>
            <p className="px-1 text-[11px] uppercase tracking-[0.24em] text-white/28">{label}</p>
            <div className="mt-2 space-y-1.5">
              {group.map((item) => {
                const active = pathname === `/chat/${item.id}`;
                const isMenuOpen = popoverState.id === item.id && popoverState.mode === "menu";
                const isConfirmOpen = popoverState.id === item.id && popoverState.mode === "confirm";

                return (
                  <div
                    key={item.id}
                    className={`group relative overflow-visible rounded-[20px] border transition ${
                      active
                        ? "border-cyan-400/20 bg-cyan-400/[0.07] shadow-[0_0_0_1px_rgba(34,211,238,0.08)]"
                        : "border-transparent bg-white/[0.025] hover:border-white/8 hover:bg-white/[0.04]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => openSession(item.id)}
                      className="relative w-full overflow-hidden rounded-[20px] border border-transparent bg-transparent px-3 py-3 text-left transition"
                    >
                      {active ? (
                        <span className="absolute inset-y-3 left-0 w-[3px] rounded-full bg-cyan-300/70" />
                      ) : null}
                      <div className="pr-11 lg:pr-10">
                        <p className="line-clamp-1 text-sm font-medium text-white/82">
                          {item.result?.mainBusinessDirection || "Analisis bisnis"}
                        </p>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/38">
                          {item.result?.executionFocus ||
                            item.mainGoal ||
                            "Buka kembali analisis strategi yang tersimpan."}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[11px] text-white/28">{formatTime(item.createdAt)}</span>
                        </div>
                      </div>
                    </button>

                    {canDelete ? (
                      <div className="absolute bottom-2.5 right-2.5 lg:bottom-auto lg:right-3 lg:top-3">
                        <SessionActionMenu
                          open={isMenuOpen}
                          onToggle={() =>
                            setPopoverState((current) =>
                              current.id === item.id && current.mode === "menu"
                                ? { id: null, mode: null }
                                : { id: item.id, mode: "menu" },
                            )
                          }
                          onDelete={() => {
                            setPopoverState({ id: item.id, mode: "confirm" });
                          }}
                        />
                        <SessionDeletePopover
                          open={isConfirmOpen}
                          title={item.result?.mainBusinessDirection || "Analisis bisnis"}
                          onCancel={() => {
                            if (isDeleting) {
                              return;
                            }
                            setPopoverState({ id: null, mode: null });
                          }}
                          onConfirm={confirmDelete}
                          isSubmitting={isDeleting}
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </>
  );
}
