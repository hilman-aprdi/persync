"use client";

import { useEffect, useState } from "react";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { usePersync } from "./persync-provider";
import { ResultPanel } from "./result-panel";

export function ChatSessionPage({ id }) {
  const { getSession, history, isBooting } = usePersync();
  const cachedSession = history.find((item) => item.id === id) || null;
  const [state, setState] = useState({
    loading: !cachedSession,
    session: cachedSession,
    error: "",
  });

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const session = await getSession(id);
        if (!active) {
          return;
        }

        setState({
          loading: false,
          session,
          error: "",
        });
      } catch (error) {
        if (!active) {
          return;
        }

        setState({
          loading: false,
          session: null,
          error: error.message,
        });
      }
    };

    if (!cachedSession) {
      load();
      return () => {
        active = false;
      };
    }

    setState({
      loading: false,
      session: cachedSession,
      error: "",
    });

    return () => {
      active = false;
    };
  }, [cachedSession, getSession, id]);

  if (state.loading || isBooting) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/8 bg-white/[0.03] px-5 py-3 text-sm text-white/58">
          <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={2} />
          Membuka analisis bisnis
        </div>
      </div>
    );
  }

  if (!state.session) {
    return (
      <div className="glass-panel rounded-[30px] px-6 py-8 sm:px-8">
        <div className="inline-flex items-center gap-2 text-sm text-rose-100/82">
          <AlertCircle className="h-4 w-4" strokeWidth={1.8} />
          {state.error || "Sesi tidak ditemukan."}
        </div>
      </div>
    );
  }

  return (
    <div className="reveal">
      <ResultPanel session={state.session} />
    </div>
  );
}
