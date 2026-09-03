import { getRuntimeConfig } from "../config/runtime.js";
import { bffRequest } from "./bffClient.js";

export async function executeCareAction(action, payload) {
  const config = getRuntimeConfig();
  if (config.api.mode === "mock") return { ok: true, action, payload, source: "mock" };
  return bffRequest(`/actions/${encodeURIComponent(action)}`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

/* The BFF must enforce RBAC/ABAC, validation, audit and idempotency before routing approved calls through APIGEE. */
