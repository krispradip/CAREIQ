# CareIQ Care Console

Working prototype with production-oriented boundaries. The visual/runtime baseline comes from the approved CareIQ master. Two additive CX changes from the comparison version are merged: the announcements dropdown and the End & Wrap modal. The approved Agent Dashboard and Customer Call layout remain the master.

## Run locally

```bash
npm run check
npm run smoke
npm run dev
```

Then open `http://127.0.0.1:8080`.

## Repository shape

```text
index.html
config/runtime-config.js
src/
  main.js                    # intentionally tiny bootstrap
  app.js                     # application lifecycle/orchestration controller
  legacy/care-console.js     # preserved working UI/transcript engine
  styles/main.css
  auth/                      # prototype login + Entra/RBAC boundary
  services/                  # BFF-facing service contracts
  mocks/                     # prototype service data + fake user master
docs/                        # architecture/security/ops/API contracts
scripts/                     # zero-dependency local serve/check/smoke tests
```

## Application lifecycle

`src/main.js` has one responsibility: start `src/app.js`.

`src/app.js` is the stable application controller for startup, authentication state, login/logout and loading the authenticated CareIQ experience. Future Dashboard, Call, Chat and component modules should be extracted behind this controller rather than adding more orchestration into `main.js` or the legacy runtime.

Current flow:

```text
index.html
   -> src/main.js
      -> src/app.js
         -> platform/bootstrap.js
         -> auth/loginView.js when unauthenticated
         -> legacy/care-console.js when authenticated
```

## Important

The prototype deliberately keeps the current live transcript/chat engine together in `src/legacy/care-console.js` during the safe refactor. This avoids a functional rewrite while the codebase is separated. It can be modularized incrementally behind `app.js` after regression coverage is in place.

Prototype journey: sign in -> Agent Dashboard -> Customer Call/Chat views. Prototype credentials are validated against `src/mocks/mockUsers.js` and stored only as a session marker in `sessionStorage`. This is an emulation, not security.

Production data path: browser -> CareIQ BFF -> APIGEE -> approved backend services. Production identity: Entra ID with server-side authorization enforcement.
