import { bootstrapPlatform } from "./platform/bootstrap.js";
import { renderLogin, bindLogin } from "./auth/loginView.js";

let platform = null;
let state = "idle";

function setState(nextState) {
  state = nextState;
  document.documentElement?.setAttribute?.("data-careiq-state", nextState);
}

function renderFatalError(error) {
  console.error("CareIQ application failed", error);
  setState("error");
  const root = document.getElementById("app");
  if (!root) return;
  const message = String(error?.message || error || "Unknown application error");
  root.innerHTML = `
    <main style="padding:32px;font-family:Arial,sans-serif">
      <h1>CareIQ could not start</h1>
      <p>${message}</p>
    </main>`;
}

function showLogin() {
  setState("login");
  renderLogin();
  bindLogin((username, password) => App.login(username, password));
}

async function showAuthenticatedExperience() {
  setState("authenticated");
  document.body.classList.remove("is-login");

  // Preserve the approved working CareIQ runtime as a single legacy module for
  // now. Views/components will be extracted incrementally behind App without
  // rewriting the live transcript/chat engine in one high-risk change.
  await import("./legacy/care-console.js");
}

export const App = Object.freeze({
  async start() {
    try {
      setState("starting");
      platform = await bootstrapPlatform();
      window.CAREIQ_APP = App;

      if (!platform.user) {
        showLogin();
        return;
      }

      await showAuthenticatedExperience();
    } catch (error) {
      renderFatalError(error);
    }
  },

  async login(username, password) {
    if (!platform) throw new Error("CareIQ platform is not initialized.");
    setState("authenticating");
    await platform.signIn(username, password);

    // Reload after successful prototype authentication so the legacy runtime
    // starts from a clean module/document state. The versioned session survives
    // this reload and is then consumed by App.start().
    window.location.reload();
  },

  async logout() {
    if (!platform) return;
    try {
      setState("signing-out");
      await platform.signOut();

      // Do not depend on a browser reload for prototype sign-out. Re-bootstrap
      // auth and render Login immediately so the button gives visible feedback
      // and stale GitHub Pages sessions cannot leave the dashboard on screen.
      platform = await bootstrapPlatform();
      window.CAREIQ_PLATFORM = platform;
      showLogin();
    } catch (error) {
      renderFatalError(error);
    }
  },

  get platform() {
    return platform;
  },

  get state() {
    return state;
  }
});
