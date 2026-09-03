import { getRuntimeConfig } from "../config/runtime.js";
import { bffRequest } from "./bffClient.js";
import { mockInteraction } from "../mocks/serviceData.js";

export async function getInteraction(interactionId) {
  const config = getRuntimeConfig();
  if (config.api.mode === "mock") return structuredClone(mockInteraction);
  return bffRequest(`/interactions/${encodeURIComponent(interactionId)}`);
}

export async function saveWrapUp(interactionId, payload) {
  const config = getRuntimeConfig();
  if (config.api.mode === "mock") return { ok: true, interactionId, ...payload };
  return bffRequest(`/interactions/${encodeURIComponent(interactionId)}/wrap-up`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
