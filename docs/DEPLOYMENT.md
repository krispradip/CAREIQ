# Deployment

## Current working prototype - GitHub Pages

The repository is intentionally able to run directly as static files. Keep `index.html` at the repository root and retain the `src/` and `config/` folders. GitHub Pages can continue to deploy from `main` / root.

Local test:

```bash
npm run check
npm run dev
```

Open `http://127.0.0.1:8080`.

## Production

Do not use the public GitHub Pages deployment for real customer data. Production hosting must support the approved Entra authentication pattern, secure headers/WAF, private server-side BFF connectivity, enterprise secret management, logging/SIEM, HA/DR and environment separation.
