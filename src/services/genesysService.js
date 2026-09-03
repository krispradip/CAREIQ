import { getRuntimeConfig } from "../config/runtime.js";
import { bffRequest } from "./bffClient.js";

export async function getGenesysInteractionContext(interactionId) {
  const config = getRuntimeConfig();
  if (config.api.mode === "mock") {
    return { interactionId, channel: "voice", state: "connected", source: "mock" };
  }
  return bffRequest(`/interactions/${encodeURIComponent(interactionId)}/genesys-context`);
}

/* Production implementation is brokered by the CareIQ BFF. The browser must not hold Genesys service credentials. */
