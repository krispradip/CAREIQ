import { getRuntimeConfig } from "../config/runtime.js";
import { bffRequest } from "./bffClient.js";
import { mockCustomerSummary } from "../mocks/serviceData.js";

export async function getCustomerSummary(customerId) {
  const config = getRuntimeConfig();
  if (config.api.mode === "mock") return structuredClone(mockCustomerSummary);
  return bffRequest(`/customers/${encodeURIComponent(customerId)}/summary`);
}
