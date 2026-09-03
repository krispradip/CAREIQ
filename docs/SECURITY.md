# CareIQ security baseline

## Identity and access

- Microsoft Entra ID SSO for production.
- OIDC/OAuth 2.0 Authorization Code + PKCE for browser authentication.
- Conditional Access, MFA, device compliance, location/risk policies and session controls remain owned by Entra policy.
- Map Entra groups/app roles to CareIQ application roles.
- Client-side RBAC only controls UX. Every protected server operation must re-authorize in the CareIQ BFF.
- Apply least privilege and separate administrative roles from agent roles.

## API and integration security

- Browser -> CareIQ BFF only.
- BFF -> APIGEE -> approved backend services.
- No production API keys, secrets, certificates or service credentials in GitHub or browser JavaScript.
- Prefer managed/workload identity where supported; otherwise use the approved enterprise secrets vault with rotation.
- Validate schemas, authorize actions, rate-limit, apply idempotency for write operations, and log correlation IDs.
- CORS, CSP, TLS/HSTS, secure cookies/session handling and anti-CSRF controls must be finalized for the selected production hosting model.

## Data and AI

- Data minimization: do not duplicate systems-of-record data unless CareIQ owns a defined persistence requirement.
- Define retention and deletion rules for transcripts, summaries, audit events and derived AI context.
- Mask/redact sensitive fields before model context where required.
- Treat model output as advisory unless an explicitly approved action workflow exists.
- Consequential/write actions require deterministic authorization and human/system confirmation.
- Maintain prompt/model/knowledge configuration versioning and change governance.

## Audit and monitoring

For material actions record timestamp, Entra object/user identifier, effective role, interaction ID, customer reference, action, requested parameters, downstream system, result and correlation ID. Forward application/security telemetry to the approved enterprise observability/SIEM tooling.

## Prototype warning

The GitHub Pages build is public and uses mock security. The prototype login validates only against the fake user master in `src/mocks/mockUsers.js`; because the site is static, those sample credentials are visible in the public source and provide no real access control. The mock session uses browser `sessionStorage` only.

It is suitable for demonstration only and must not be given production customer data, real MAF passwords, tokens or credentials. Production replaces this entire mock-auth path with Microsoft Entra ID SSO and server-side authorization.
