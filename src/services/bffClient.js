import { getRuntimeConfig } from "../config/runtime.js";

function correlationId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `careiq-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export async function bffRequest(path, options = {}) {
  const config = getRuntimeConfig();
  if (config.api.mode === "mock") {
    throw new Error("BFF request attempted while CAREIQ is in mock API mode.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.api.timeoutMs || 12000);
  try {
    const response = await fetch(`${config.api.baseUrl}${path}`, {
      ...options,
      credentials: "same-origin",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "X-Correlation-Id": correlationId(),
        ...(options.headers || {})
      }
    });
    if (!response.ok) throw new Error(`CareIQ BFF returned HTTP ${response.status}`);
    return response.status === 204 ? null : response.json();
  } finally {
    clearTimeout(timeout);
  }
}

/* Browser -> CareIQ BFF only. Do not call APIGEE or systems of record directly from this client. */
