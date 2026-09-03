export function getRuntimeConfig() {
  const config = window.CAREIQ_CONFIG;
  if (!config) throw new Error("CAREIQ runtime configuration was not loaded.");
  return config;
}
