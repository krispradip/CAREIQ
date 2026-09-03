# CareIQ target architecture

This repository is a working front-end prototype shaped around the intended production boundaries. The current prototype runs with mock identity and mock backend services.

```text
Agent browser
    |
    | Entra ID SSO (OIDC / OAuth 2.0 Authorization Code + PKCE)
    v
CareIQ web application
    |
    | authenticated same-origin API
    v
CareIQ BFF / application API
    |-- validates identity and token
    |-- enforces RBAC / policy
    |-- validates requests and idempotency
    |-- writes security and business audit events
    |-- creates correlation IDs / distributed tracing
    |
    +---- Genesys integration / interaction context
    |
    +---- APIGEE -----------------------------------------------+
    |                                                          |
    |             CRM / Customer 360 / Loyalty / Orders / Cases / other approved services
    |
    +---- CareIQ AI context service -> approved model/provider
```

## Boundaries

- Genesys remains the interaction/orchestration context for contact-centre activity.
- CareIQ is the agent experience and intelligence layer.
- The CareIQ BFF is the server-side security and orchestration boundary.
- APIGEE is the controlled middleware/API path from CareIQ server components to production backend services.
- The browser must not hold enterprise service credentials or call systems of record directly.
- AI receives only approved, minimized context; model recommendations never bypass authorization rules.

## Prototype mode

`config/runtime-config.js` currently uses `auth.mode = mock` and `api.mode = mock`. This is intentional for GitHub Pages. Production Entra and API adapters are not simulated as real security.
