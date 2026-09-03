/* Public runtime configuration only. Never place secrets, client secrets, API keys or service credentials here. */
window.CAREIQ_CONFIG = Object.freeze({
  environment: "prototype",
  auth: Object.freeze({
    mode: "mock",
    provider: "entra",
    tenantId: "",
    clientId: "",
    redirectUri: window.location.origin + window.location.pathname
  }),
  api: Object.freeze({
    mode: "mock",
    baseUrl: "/api/v1",
    timeoutMs: 12000
  }),
  features: Object.freeze({
    announcements: true,
    interactionWrapUp: true,
    escalateAction: false,
    embeddedCustomer360: false
  })
});
