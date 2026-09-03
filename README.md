# CareIQ Care Console

Working prototype with production-oriented boundaries. The visual/runtime baseline comes from the approved CareIQ master. Two additive CX changes from the comparison version are merged: the announcements dropdown and the End & Wrap modal. The approved Agent Dashboard and Customer Call layout remain the master.

## Run locally

```bash
npm run check
npm run dev
```

Then open `http://127.0.0.1:8080`.

## Repository shape

```text
index.html
config/runtime-config.js
src/
  main.js
  legacy/care-console.js     # preserved working UI/transcript engine
  styles/main.css
  auth/                      # Entra/RBAC boundary
  services/                  # BFF-facing service contracts
  mocks/                     # prototype service data
docs/                        # architecture/security/ops/API contracts
scripts/                     # zero-dependency local serve/check
```

## Important

The prototype deliberately keeps the current live transcript/chat engine together in `src/legacy/care-console.js` during the first safe refactor. This avoids a functional rewrite while the codebase is separated. It can be modularized further only after regression tests are in place.

Production data path: browser -> CareIQ BFF -> APIGEE -> approved backend services. Production identity: Entra ID with server-side authorization enforcement.
