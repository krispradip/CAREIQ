# CareIQ Care Console - Master v0.6.1

This is the consolidated CareIQ prototype baseline, updated in v0.6.0 with a unified voice/chat interaction workspace and non-blocking Customer 360 drawer. Use this full codebase as the master for all changes from this point onward.

It combines the approved CareIQ dashboard/call/chat design, Pia-aligned CX additions, the prototype login journey, the application controller, service boundaries, mock data and regression checks in one complete repository.

## Current user journey

```text
Open CareIQ
  -> Prototype sign in
  -> Agent Dashboard
  -> Customer Call / Customer Chat
  -> Sign out
  -> Prototype sign in
```

Prototype credentials:

```text
Email:    layla.haddad@maf.ae
Password: welcome123
```

The credentials are deliberately fake and stored in the public prototype source. Never put real MAF credentials, secrets or customer data in this repository.

Production authentication remains Microsoft Entra ID SSO with MFA, Conditional Access and server-side authorization/RBAC.

## Run locally

```bash
npm run check
npm run smoke
npm run dev
```

Then open `http://127.0.0.1:8080`.

## Repository shape

```text
index.html                    # browser entry page / application shell
VERSION
package.json
config/
  runtime-config.js           # public runtime configuration only
src/
  main.js                     # tiny bootstrap only
  app.js                      # application lifecycle/orchestration controller
  legacy/
    care-console.js           # preserved approved UI/transcript/chat runtime
  styles/
    main.css
  auth/
    authService.js            # mock auth now; Entra adapter boundary later
    loginView.js
    rbac.js
  platform/
    bootstrap.js
  services/                   # BFF-facing service contracts
  mocks/                      # prototype service data + fake user master
  config/
docs/                         # architecture/security/ops/API/deployment docs
scripts/                      # local server + static/smoke tests
.github/workflows/            # optional GitHub CI validation
```

## Application lifecycle

`index.html` loads public runtime configuration and `src/main.js`.

`src/main.js` has one responsibility: start `src/app.js`.

`src/app.js` is the application controller for startup, authentication state, login/logout and loading the authenticated CareIQ experience.

```text
index.html
   -> src/main.js
      -> src/app.js
         -> platform/bootstrap.js
         -> auth/loginView.js       when unauthenticated
         -> legacy/care-console.js  when authenticated
```

The sign-out action is routed back through `App.logout()` so the same lifecycle boundary can later invoke the real Entra sign-out flow.

## Why the existing interaction engine is still under `legacy/`

This is deliberate. The live transcript, customer chat emulation, composer, quick replies, sentiment behaviour and CareIQ Assist already work. They are preserved together while the application is modularized incrementally, rather than being rewritten in one high-risk change.

The following paths remain functional in this baseline:

- Agent Dashboard
- Customer Call View
- Customer Chat View
- live transcript simulation
- chat emulation and customer reply simulation
- CareIQ Assist
- announcements
- End & Wrap
- prototype login/logout

## Production direction

```text
Authorised MAF contact-centre user
        |
        v
Microsoft Entra ID SSO / Conditional Access
        |
        v
CareIQ Web
        |
        v
CareIQ BFF / API
   |             |
   v             v
Genesys        APIGEE
                 |
                 v
         Enterprise systems
```

The browser must never hold enterprise service credentials. Production backend access is expected through the CareIQ server/BFF and APIGEE. Genesys remains the interaction/channel platform; CareIQ is the agent intelligence and customer-context layer.

## GitHub Pages prototype deployment

For the current public prototype, upload the **contents of this folder** to the repository root. `index.html` must remain directly at the root.

GitHub Pages is prototype/demo hosting only. The intended production path is a private enterprise repository with controlled CI/CD and approved hosting/security controls.

### v0.5.1 login/sign-out fix
The prototype uses a versioned session key so older GitHub Pages sessions cannot bypass the login screen after deployment. Sign out clears the prototype session and returns immediately to the login screen. Demo credentials remain `layla.haddad@maf.ae` / `welcome123`.

### v0.6.1 adaptive layout QA
The prototype now treats browser resizing and split-screen use as first-class scenarios. Customer 360 scrolls independently without shrinking its cards; the active interaction continues underneath. Call/chat panes, navigation, KPI strips, signals, modals and supporting panels adapt at desktop, half-screen and narrow-window breakpoints rather than assuming a maximized browser.
