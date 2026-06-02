"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const TOKEN_KEY = "persync_auth_token";
const GUEST_KEY = "persync_guest_id";

const safeJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const getGuestId = () => {
  if (typeof window === "undefined") {
    return "";
  }

  const existing = window.localStorage.getItem(GUEST_KEY);
  if (existing) {
    return existing;
  }

  const guestId = window.crypto?.randomUUID?.() || `guest-${Date.now()}`;
  window.localStorage.setItem(GUEST_KEY, guestId);
  return guestId;
};

export const getAuthToken = () =>
  typeof window === "undefined" ? "" : window.localStorage.getItem(TOKEN_KEY) || "";

export const setAuthToken = (token) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(TOKEN_KEY, token);
  }
};

export const clearAuthToken = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(TOKEN_KEY);
  }
};

const buildHeaders = (includeJson = false) => {
  const headers = {};
  const token = getAuthToken();
  const guestId = getGuestId();

  if (includeJson) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (guestId) {
    headers["x-guest-id"] = guestId;
  }

  return headers;
};

const parseError = async (response) => {
  const payload = await safeJson(response);
  const message =
    payload?.details?.supportingText ||
    payload?.details?.headline ||
    payload?.message ||
    "Terjadi kendala saat memproses permintaan.";

  const error = new Error(message);
  error.status = response.status;
  error.payload = payload;
  return error;
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...buildHeaders(Boolean(options.body)),
      ...(options.headers || {}),
    },
    cache: options.cache || "no-store",
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  return safeJson(response);
};

export const fetchViewer = async () => request("/auth/me");
export const fetchHistory = async () => request("/generate");
export const fetchConversation = async (id) => request(`/generate/${id}`);
export const deleteConversation = async (id) =>
  request(`/api/sessions/${id}`, {
    method: "DELETE",
  });

export const createConversation = async (input) =>
  request("/generate", {
    method: "POST",
    body: JSON.stringify(input),
  });

export const continueWithGoogle = async (credential) =>
  request("/auth/google", {
    method: "POST",
    body: JSON.stringify({ credential }),
  });
