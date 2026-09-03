import { getRuntimeConfig } from "../config/runtime.js";

const MOCK_USER = Object.freeze({
  id: "prototype-user",
  displayName: "Layla Haddad",
  role: "seniorAgent",
  entraObjectId: null,
  authenticated: true
});

export async function initializeAuth() {
  const config = getRuntimeConfig();
  if (config.auth.mode === "mock") {
    return { user: MOCK_USER, accessToken: null, provider: "mock" };
  }

  throw new Error(
    "Entra authentication is not enabled in this public prototype. Configure the approved Entra/MSAL adapter in the production deployment."
  );
}

export async function signOut() {
  const config = getRuntimeConfig();
  if (config.auth.mode === "mock") return;
  throw new Error("Production Entra sign-out adapter is not configured.");
}
