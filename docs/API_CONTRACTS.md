# Initial CareIQ BFF contracts

These are interface placeholders for integration design; the prototype currently returns mock data. Production BFF routes should map to approved APIGEE proxies and backend APIs.

| CareIQ BFF route | Purpose | Production downstream |
| --- | --- | --- |
| `GET /api/v1/me` | Current user/application role | Entra-derived server context |
| `GET /api/v1/interactions/{id}` | Interaction context | Genesys adapter |
| `GET /api/v1/interactions/{id}/genesys-context` | Channel/routing/runtime context | Genesys |
| `GET /api/v1/customers/{id}/summary` | Agent-safe customer summary | APIGEE -> CRM/Customer 360 |
| `GET /api/v1/customers/{id}/loyalty` | Loyalty context | APIGEE -> loyalty service |
| `GET /api/v1/customers/{id}/transactions` | Recent approved transaction view | APIGEE -> transaction/order service |
| `POST /api/v1/actions/{action}` | Controlled agent action | APIGEE -> approved backend |
| `POST /api/v1/interactions/{id}/wrap-up` | Save wrap-up/disposition | APIGEE -> CRM/case service and/or Genesys as approved |

All write routes require server-side authorization, schema validation, audit, correlation IDs and idempotency where duplicate execution would be harmful.
