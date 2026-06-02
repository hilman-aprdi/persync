"use client";

import { X } from "lucide-react";
import { SidebarContent } from "./sidebar-content";

export function MobileSidebarDrawer(props) {
  const { open, onClose } = props;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-[#020617]/72 backdrop-blur-[2px] transition ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 h-screen w-[85vw] max-w-[320px] border-r border-white/6 bg-[#07111f]/98 shadow-[0_16px_36px_rgba(2,6,23,0.24)] transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-hidden rounded-none">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full text-white/34 transition hover:text-white/72"
            aria-label="Tutup sidebar"
          >
            <X className="h-3.5 w-3.5" strokeWidth={1.8} />
          </button>
          <SidebarContent {...props} />
        </div>
      </aside>
    </>
  );
}
