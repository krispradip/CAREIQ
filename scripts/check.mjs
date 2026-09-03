import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const required = [
  "index.html", "config/runtime-config.js", "src/main.js", "src/app.js", "src/legacy/care-console.js",
  "src/styles/main.css", "src/auth/rbac.js", "src/auth/authService.js", "src/auth/loginView.js", "src/mocks/mockUsers.js", "src/services/bffClient.js",
  "docs/ARCHITECTURE.md", "docs/SECURITY.md", "docs/OPERATIONS.md"
];
let failed = false;
for (const rel of required) {
  if (!fs.existsSync(path.join(root, rel))) { console.error(`Missing required file: ${rel}`); failed = true; }
}
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const ref of ["./src/styles/main.css?v=0.6.1", "./config/runtime-config.js", "./src/main.js?v=0.6.1", 'name="careiq-version" content="0.6.1"']) {
  if (!html.includes(ref)) { console.error(`index.html missing reference: ${ref}`); failed = true; }
}

const main = fs.readFileSync(path.join(root, "src/main.js"), "utf8");
if (!main.includes('import { App } from "./app.js"') || !main.includes("App.start()")) {
  console.error("src/main.js must remain a thin bootstrap into src/app.js");
  failed = true;
}

const appController = fs.readFileSync(path.join(root, "src/app.js"), "utf8");
for (const responsibility of ["bootstrapPlatform", "renderLogin", "App.login", "legacy/care-console.js"]) {
  if (!appController.includes(responsibility)) {
    console.error(`src/app.js missing application-controller responsibility: ${responsibility}`);
    failed = true;
  }
}

const runtime = fs.readFileSync(path.join(root, "config/runtime-config.js"), "utf8");
const suspicious = [/clientSecret/i, /api[_-]?key\s*[:=]\s*["'][^"']+/i, /password\s*[:=]\s*["'][^"']+/i];
for (const pattern of suspicious) {
  if (pattern.test(runtime)) { console.error(`Potential secret-like value in public runtime config: ${pattern}`); failed = true; }
}
const legacy = fs.readFileSync(path.join(root, "src/legacy/care-console.js"), "utf8");
for (const requiredUx of ["customer360Html", "data-360=\"open\"", "SOP Guidance", "Recent transaction", "chatpane--interaction"]) {
  if (!legacy.includes(requiredUx)) { console.error(`v0.6 interaction UX missing: ${requiredUx}`); failed = true; }
}
if (legacy.includes("End &amp; wrap")) { console.error("Escaped End & Wrap typo remains in runtime"); failed = true; }
const css = fs.readFileSync(path.join(root, "src/styles/main.css"), "utf8");
for (const responsiveGuard of [
  ".customer360-drawer__body>.card{flex:0 0 auto",
  "width:clamp(560px,42vw,680px)",
  "height:clamp(480px,62dvh,640px)",
  "@media (max-width:980px)",
  "@media (max-width:640px)"
]) {
  if (!css.includes(responsiveGuard)) { console.error(`Responsive layout guard missing: ${responsiveGuard}`); failed = true; }
}
if (failed) process.exit(1);
console.log("CareIQ static checks passed.");
