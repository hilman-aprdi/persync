"use client";

import { useEffect, useRef, useState } from "react";
import { Chrome, LoaderCircle } from "lucide-react";

export function GoogleLoginButton({ onCredential, disabled = false }) {
  const callbackRef = useRef(onCredential);
  const timeoutRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    callbackRef.current = onCredential;
  }, [onCredential]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const initialize = () => {
      if (!window.google?.accounts?.id) {
        return false;
      }

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: (response) => {
          if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }

          if (response?.credential) {
            Promise.resolve(callbackRef.current(response.credential)).finally(() => {
              setIsOpening(false);
            });
            return;
          }

          setIsOpening(false);
        },
      });

      setReady(true);
      return true;
    };

    if (initialize()) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (initialize()) {
        window.clearInterval(intervalId);
      }
    }, 250);

    return () => window.clearInterval(intervalId);
  }, []);

  const stopOpeningState = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setIsOpening(false);
  };

  const openPrompt = () => {
    if (!window.google?.accounts?.id || disabled) {
      return;
    }

    setIsOpening(true);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setIsOpening(false);
      timeoutRef.current = null;
    }, 12000);

    window.google.accounts.id.prompt((notification) => {
      if (
        notification.isNotDisplayed?.() ||
        notification.isSkippedMoment?.() ||
        notification.isDismissedMoment?.()
      ) {
        stopOpeningState();
      }
    });
  };

  return (
    <button
      type="button"
      onClick={openPrompt}
      disabled={!ready || disabled}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.045] px-4 py-2.5 text-sm text-white/82 transition hover:border-white/18 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isOpening ? (
        <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={2} />
      ) : (
        <Chrome className="h-4 w-4" strokeWidth={1.8} />
      )}
      Continue with Google
    </button>
  );
}
