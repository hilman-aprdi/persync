"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  clearAuthToken,
  continueWithGoogle,
  createConversation,
  deleteConversation,
  fetchConversation,
  fetchHistory,
  fetchViewer,
  setAuthToken,
} from "../lib/persync-client";

const PersyncContext = createContext(null);
const PENDING_DELETE_MS = 3000;
const sortSessions = (items) =>
  [...items].sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt));

export function PersyncProvider({ children }) {
  const pendingDeletesRef = useRef(new Map());
  const [viewer, setViewer] = useState(null);
  const [history, setHistory] = useState([]);
  const [isBooting, setIsBooting] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [authWall, setAuthWall] = useState({ open: false, details: null });
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [deleteToast, setDeleteToast] = useState(null);

  const refreshViewer = useCallback(async () => {
    const response = await fetchViewer();
    setViewer(response?.data || null);
    return response?.data || null;
  }, []);

  const refreshHistory = useCallback(async () => {
    const response = await fetchHistory();
    setHistory(response?.data || []);
    if (response?.viewer) {
      setViewer(response.viewer);
    }
    return response?.data || [];
  }, []);

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      try {
        const [viewerResponse, historyResponse] = await Promise.allSettled([
          fetchViewer(),
          fetchHistory(),
        ]);

        if (!active) {
          return;
        }

        if (viewerResponse.status === "fulfilled") {
          setViewer(viewerResponse.value?.data || null);
        }

        if (historyResponse.status === "fulfilled") {
          setHistory(historyResponse.value?.data || []);
          if (historyResponse.value?.viewer) {
            setViewer(historyResponse.value.viewer);
          }
        }
      } finally {
        if (active) {
          setIsBooting(false);
        }
      }
    };

    bootstrap();

    return () => {
      active = false;
    };
  }, []);

  useEffect(
    () => () => {
      pendingDeletesRef.current.forEach(({ timeoutId }) => window.clearTimeout(timeoutId));
      pendingDeletesRef.current.clear();
    },
    [],
  );

  const createSession = useCallback(
    async (input) => {
      try {
        const response = await createConversation(input);
        if (response?.session) {
          setHistory((current) => [response.session, ...current.filter((item) => item.id !== response.session.id)]);
        }
        if (response?.viewer) {
          setViewer(response.viewer);
        }
        return response;
      } catch (error) {
        const details = error?.payload?.details;
        if (details?.code === "AUTH_REQUIRED" || details?.code === "DAILY_LIMIT_REACHED") {
          setAuthWall({
            open: true,
            details,
          });
        }
        throw error;
      }
    },
    [],
  );

  const getSession = useCallback(
    async (id) => {
      const cachedSession = history.find((item) => item.id === id);
      if (cachedSession) {
        return cachedSession;
      }

      const response = await fetchConversation(id);
      if (response?.viewer) {
        setViewer(response.viewer);
      }
      return response?.data || null;
    },
    [history],
  );

  const loginWithGoogle = useCallback(
    async (credential) => {
      setIsGoogleSubmitting(true);
      try {
        const response = await continueWithGoogle(credential);
        if (response?.token) {
          setAuthToken(response.token);
        }
        await Promise.all([refreshViewer(), refreshHistory()]);
        setAuthWall({ open: false, details: null });
      } finally {
        setIsGoogleSubmitting(false);
      }
    },
    [refreshHistory, refreshViewer],
  );

  const logout = useCallback(async () => {
    clearAuthToken();
    setAuthWall({ open: false, details: null });
    await Promise.all([refreshViewer(), refreshHistory()]);
  }, [refreshHistory, refreshViewer]);

  const closeDeleteToast = useCallback(() => {
    setDeleteToast(null);
  }, []);

  const undoDeleteSession = useCallback((sessionId) => {
    const pending = pendingDeletesRef.current.get(sessionId);
    if (!pending) {
      setDeleteToast(null);
      return;
    }

    window.clearTimeout(pending.timeoutId);
    pendingDeletesRef.current.delete(sessionId);
    setHistory((current) => sortSessions([...current, pending.session]));
    setDeleteToast(null);
  }, []);

  const finalizeDeleteSession = useCallback(async (sessionId) => {
    const pending = pendingDeletesRef.current.get(sessionId);
    if (!pending) {
      return;
    }

    pendingDeletesRef.current.delete(sessionId);

    try {
      await deleteConversation(sessionId);
      setDeleteToast((current) =>
        current?.sessionId === sessionId
          ? null
          : current,
      );
    } catch (error) {
      setHistory((current) => sortSessions([...current, pending.session]));
      setDeleteToast({
        id: `delete-error-${Date.now()}`,
        sessionId,
        message: "Gagal menghapus session",
        supportingText: error.message,
        canUndo: false,
      });

      window.setTimeout(() => {
        setDeleteToast((current) =>
          current?.id?.startsWith("delete-error-") ? null : current,
        );
      }, PENDING_DELETE_MS);
    }
  }, []);

  const deleteSession = useCallback(
    async (sessionId) => {
      const session = history.find((item) => item.id === sessionId);
      if (!session || pendingDeletesRef.current.has(sessionId)) {
        return;
      }

      setHistory((current) => current.filter((item) => item.id !== sessionId));
      setDeleteToast({
        id: `delete-${sessionId}-${Date.now()}`,
        sessionId,
        message: "Session dihapus",
        supportingText: "Undo tersedia beberapa detik.",
        canUndo: true,
      });

      const timeoutId = window.setTimeout(() => {
        finalizeDeleteSession(sessionId);
      }, PENDING_DELETE_MS);

      pendingDeletesRef.current.set(sessionId, {
        session,
        timeoutId,
      });
    },
    [finalizeDeleteSession, history],
  );

  const value = useMemo(
    () => ({
      viewer,
      history,
      isBooting,
      isSidebarOpen,
      authWall,
      isGoogleSubmitting,
      deleteToast,
      setIsSidebarOpen,
      setAuthWall,
      refreshViewer,
      refreshHistory,
      createSession,
      getSession,
      loginWithGoogle,
      logout,
      deleteSession,
      undoDeleteSession,
      closeDeleteToast,
    }),
    [
      viewer,
      history,
      isBooting,
      isSidebarOpen,
      authWall,
      isGoogleSubmitting,
      deleteToast,
      refreshViewer,
      refreshHistory,
      createSession,
      getSession,
      loginWithGoogle,
      logout,
      deleteSession,
      undoDeleteSession,
      closeDeleteToast,
    ],
  );

  return <PersyncContext.Provider value={value}>{children}</PersyncContext.Provider>;
}

export const usePersync = () => {
  const context = useContext(PersyncContext);
  if (!context) {
    throw new Error("usePersync must be used within PersyncProvider");
  }
  return context;
};
