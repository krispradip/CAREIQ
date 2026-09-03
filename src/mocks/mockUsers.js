/*
 * Prototype-only user master.
 * This file is intentionally fake and public because GitHub Pages is a static site.
 * Never place real MAF credentials, password hashes, tokens or customer data here.
 * Production authentication is Microsoft Entra ID SSO.
 */
export const MOCK_USERS = Object.freeze([
  Object.freeze({
    username: "layla.haddad@maf.ae",
    password: "welcome123",
    id: "AG-4821",
    displayName: "Layla Haddad",
    initials: "LH",
    jobTitle: "Senior Care Advisor",
    role: "seniorAgent",
    team: "Tier 2 · Shopping Companion",
    shift: "09:00 – 18:00 GST"
  })
]);

export const DEMO_CREDENTIALS = Object.freeze({
  username: MOCK_USERS[0].username,
  password: MOCK_USERS[0].password
});
