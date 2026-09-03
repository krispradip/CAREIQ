import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const required = [
  "index.html", "config/runtime-config.js", "src/main.js", "src/legacy/care-console.js",
  "src/styles/main.css", "src/auth/rbac.js", "src/services/bffClient.js",
  "docs/ARCHITECTURE.md", "docs/SECURITY.md", "docs/OPERATIONS.md"
];
let failed = false;
for (const rel of required) {
  if (!fs.existsSync(path.join(root, rel))) { console.error(`Missing required file: ${rel}`); failed = true; }
}
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const ref of ["./src/styles/main.css", "./config/runtime-config.js", "./src/main.js"]) {
  if (!html.includes(ref)) { console.error(`index.html missing reference: ${ref}`); failed = true; }
}
const runtime = fs.readFileSync(path.join(root, "config/runtime-config.js"), "utf8");
const suspicious = [/clientSecret/i, /api[_-]?key\s*[:=]\s*["'][^"']+/i, /password\s*[:=]\s*["'][^"']+/i];
for (const pattern of suspicious) {
  if (pattern.test(runtime)) { console.error(`Potential secret-like value in public runtime config: ${pattern}`); failed = true; }
}
if (failed) process.exit(1);
console.log("CareIQ static checks passed.");
