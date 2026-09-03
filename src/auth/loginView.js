import { DEMO_CREDENTIALS } from "../mocks/mockUsers.js";

const shieldIcon = `
<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 3 19 6v5c0 4.8-2.8 8-7 10-4.2-2-7-5.2-7-10V6l7-3Z"/><path d="m9.4 12 1.7 1.7 3.7-4"/>
</svg>`;

const sparkIcon = `
<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 3l1.4 4.2L18 9l-4.6 1.8L12 15l-1.4-4.2L6 9l4.6-1.8L12 3Z"/><path d="M18.5 15.5 19.3 18l2.2.8-2.2.8-.8 2.4-.8-2.4-2.2-.8 2.2-.8.8-2.5Z"/>
</svg>`;

export function renderLogin() {
  const app = document.getElementById("app");
  if (!app) return;
  document.body.classList.add("is-login");
  app.innerHTML = `
    <main class="login-shell">
      <section class="login-story" aria-label="CareIQ introduction">
        <div class="login-brand"><span class="login-brand__word">CareIQ</span><span class="login-brand__pill">CARE CONSOLE</span></div>
        <div class="login-story__content">
          <span class="login-eyebrow">MAF CONTACT CENTRE</span>
          <h1>Agent intelligence.<br><span>In the moment.</span></h1>
          <p>One workspace for customer context, live interaction support and guided resolution.</p>
          <div class="login-capabilities" aria-label="CareIQ capabilities">
            <span>${sparkIcon}<b>Customer context</b></span>
            <span>${sparkIcon}<b>Live assist</b></span>
            <span>${sparkIcon}<b>Guided actions</b></span>
          </div>
        </div>
        <div class="login-story__foot">CARE Console · Working prototype</div>
      </section>

      <section class="login-auth" aria-label="CareIQ sign in">
        <div class="login-card">
          <div class="login-card__top">
            <span class="login-authmark">${shieldIcon}</span>
            <div><span class="login-kicker">WELCOME BACK</span><h2>Sign in to CareIQ</h2></div>
          </div>
          <p class="login-intro">Use your contact centre account to access your workspace.</p>

          <form id="careiqLoginForm" class="login-form" novalidate>
            <label for="loginUsername">MAF email</label>
            <input id="loginUsername" name="username" type="email" autocomplete="username" placeholder="name@maf.ae" required />

            <label for="loginPassword">Password</label>
            <div class="login-password">
              <input id="loginPassword" name="password" type="password" autocomplete="current-password" placeholder="Enter password" required />
              <button type="button" class="login-show" id="loginShowPassword" aria-label="Show password">Show</button>
            </div>

            <div class="login-error" id="loginError" role="alert" aria-live="polite"></div>
            <button type="submit" class="login-submit" id="loginSubmit">Sign in to CareIQ</button>
          </form>

          <div class="login-demo">
            <div class="login-demo__head"><span>PROTOTYPE ACCESS</span><button type="button" id="fillDemoCredentials">Use demo credentials</button></div>
            <div class="login-demo__row"><span>Email</span><code>${DEMO_CREDENTIALS.username}</code></div>
            <div class="login-demo__row"><span>Password</span><code>${DEMO_CREDENTIALS.password}</code></div>
          </div>

          <div class="login-entra">${shieldIcon}<span><b>Production authentication</b>Microsoft Entra ID SSO · MFA · Conditional Access</span></div>
          <p class="login-restricted">For authorised MAF contact centre resources only.</p>
        </div>
      </section>
    </main>`;
}

export function bindLogin(onSubmit) {
  const form = document.getElementById("careiqLoginForm");
  const username = document.getElementById("loginUsername");
  const password = document.getElementById("loginPassword");
  const error = document.getElementById("loginError");
  const submit = document.getElementById("loginSubmit");
  const fill = document.getElementById("fillDemoCredentials");
  const show = document.getElementById("loginShowPassword");
  if (!form || !username || !password || !error || !submit) return;

  if (fill) fill.addEventListener("click", () => {
    username.value = DEMO_CREDENTIALS.username;
    password.value = DEMO_CREDENTIALS.password;
    error.textContent = "";
    username.focus();
  });

  if (show) show.addEventListener("click", () => {
    const visible = password.type === "text";
    password.type = visible ? "password" : "text";
    show.textContent = visible ? "Show" : "Hide";
    show.setAttribute("aria-label", visible ? "Show password" : "Hide password");
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    error.textContent = "";
    if (!username.value.trim() || !password.value) {
      error.textContent = "Enter your email and password to continue.";
      return;
    }

    submit.disabled = true;
    submit.textContent = "Signing in…";
    try {
      await onSubmit(username.value, password.value);
    } catch (authError) {
      error.textContent = authError && authError.code === "INVALID_CREDENTIALS"
        ? "The email or password is incorrect. Use the prototype credentials below."
        : "CareIQ could not sign you in. Please try again.";
      submit.disabled = false;
      submit.textContent = "Sign in to CareIQ";
    }
  });
}
