import { initializeAuth, signIn, signOut } from "../auth/authService.js";
import { can } from "../auth/rbac.js";
import { getRuntimeConfig } from "../config/runtime.js";

export async function bootstrapPlatform() {
  const config = getRuntimeConfig();
  const auth = await initializeAuth();
  const platform = Object.freeze({
    environment: config.environment,
    user: auth.user,
    can: (permission) => auth.user ? can(auth.user.role, permission) : false,
    signIn,
    signOut
  });
  window.CAREIQ_PLATFORM = platform;
  return platform;
}
