# CareIQ availability, backup and operations baseline

## High availability

Production frontend and BFF should be stateless and horizontally scalable behind the approved load-balancing/WAF layer. Deploy multiple application instances across the approved availability-zone/failure-domain pattern. Persistent services must use an HA-capable managed database/service rather than a single node.

## Backup and recovery

- Source and infrastructure configuration: version controlled.
- CareIQ-owned database/state: automated backups plus point-in-time recovery where supported.
- Configuration and secrets: recovery through approved platform/vault mechanisms.
- Audit/interaction data: retention and restoration aligned with legal/privacy requirements.
- Restore testing must be scheduled; a backup that has not been restore-tested is not a complete DR control.

## DR

RTO, RPO, backup retention, DR region, failover/failback method and dependency recovery order are deliberately marked TBD until agreed with the business/platform owners. Do not invent these targets in code.

## Observability

Use end-to-end correlation across Genesys -> CareIQ -> APIGEE -> backend. Monitor availability, latency, errors, authorization failures, downstream failures, queue/action failures, AI response failures, PII/security events, and critical user journeys.

## Environments

Maintain separate DEV, TEST/SIT, UAT and PROD configuration, identities, API endpoints, secrets and access controls. The current GitHub Pages site remains the public prototype/demo environment only.
