export const ROLE_PERMISSIONS = Object.freeze({
  agent: ["interaction:read", "customer:read", "assist:use", "wrapup:create"],
  seniorAgent: ["interaction:read", "customer:read", "assist:use", "wrapup:create", "action:service-recovery"],
  teamLeader: ["interaction:read", "customer:read", "assist:use", "wrapup:create", "team:read", "escalation:manage"],
  manager: ["interaction:read", "customer:read", "team:read", "reporting:read", "configuration:read"],
  qa: ["interaction:read", "qa:read", "qa:write", "reporting:read"],
  admin: ["*"]
});

export function can(role, permission) {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes("*") || permissions.includes(permission);
}

/* UI RBAC is a usability control only. The CareIQ BFF must re-authorize every protected API/action. */
