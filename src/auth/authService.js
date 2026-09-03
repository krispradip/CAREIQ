import { getRuntimeConfig } from "../config/runtime.js";
import { MOCK_USERS } from "../mocks/mockUsers.js";

const SESSION_KEY = "careiq.prototype.session";

function safeSessionStorage() {
  try { return window.sessionStorage || globalThis.sessionStorage || null; }
  catch (_) { return null; }
}

function toSessionUser(user) {
  return Object.freeze({
    id: user.id,
    displayName: user.displayName,
    initials: user.initials,
    jobTitle: user.jobTitle,
    role: user.role,
    team: user.team,
    shift: user.shift,
    entraObjectId: null,
    authenticated: true
  });
}

function readMockSession() {
  const store = safeSessionStorage();
  if (!store) return null;
  try {
    const raw = store.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const match = MOCK_USERS.find((user) => user.id === parsed.id && user.username === parsed.username);
    return match ? toSessionUser(match) : null;
  } catch (_) {
    store.removeItem(SESSION_KEY);
    return null;
  }
}

export async function initializeAuth() {
  const config = getRuntimeConfig();
  if (config.auth.mode === "mock") {
    return { user: readMockSession(), accessToken: null, provider: "mock" };
  }

  throw new Error(
    "Entra authentication is not enabled in this public prototype. Configure the approved Entra/MSAL adapter in the production deployment."
  );
}

export async function signIn(username, password) {
  const config = getRuntimeConfig();
  if (config.auth.mode !== "mock") {
    throw new Error("Production Entra sign-in adapter is not configured.");
  }

  const normalized = String(username || "").trim().toLowerCase();
  const match = MOCK_USERS.find((user) => user.username.toLowerCase() === normalized && user.password === String(password || ""));
  if (!match) {
    const error = new Error("The email or password is incorrect.");
    error.code = "INVALID_CREDENTIALS";
    throw error;
  }

  const store = safeSessionStorage();
  if (store) store.setItem(SESSION_KEY, JSON.stringify({ id: match.id, username: match.username }));
  return { user: toSessionUser(match), accessToken: null, provider: "mock" };
}

export async function signOut() {
  const config = getRuntimeConfig();
  if (config.auth.mode === "mock") {
    const store = safeSessionStorage();
    if (store) store.removeItem(SESSION_KEY);
    if (window.location && typeof window.location.reload === "function") window.location.reload();
    return;
  }
  throw new Error("Production Entra sign-out adapter is not configured.");
}
