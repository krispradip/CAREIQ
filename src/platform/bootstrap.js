import { initializeAuth } from "../auth/authService.js";
import { can } from "../auth/rbac.js";
import { getRuntimeConfig } from "../config/runtime.js";

export async function bootstrapPlatform() {
  const config = getRuntimeConfig();
  const auth = await initializeAuth();
  window.CAREIQ_PLATFORM = Object.freeze({
    environment: config.environment,
    user: auth.user,
    can: (permission) => can(auth.user.role, permission)
  });
  return window.CAREIQ_PLATFORM;
}
