import { bootstrapPlatform } from "./platform/bootstrap.js";

try {
  await bootstrapPlatform();
  await import("./legacy/care-console.js");
} catch (error) {
  console.error("CareIQ bootstrap failed", error);
  const app = document.getElementById("app");
  if (app) app.innerHTML = `<main style="padding:32px;font-family:Arial,sans-serif"><h1>CareIQ could not start</h1><p>${String(error.message || error)}</p></main>`;
}
