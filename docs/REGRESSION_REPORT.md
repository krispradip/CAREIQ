# Regression guard report - v0.5.0

This consolidated master intentionally preserves the approved CareIQ interaction runtime while adding the proper application/login lifecycle around it.

## Core conversation engine

The following functions remain in `src/legacy/care-console.js` and are not rewritten by the application-controller/login refactor:

- `transcriptHtml`
- `messagesHtml`
- `paintMessages`
- `sendChat`
- `bindChat`
- `paintAssist`

The approved interaction engine therefore remains the execution path for the call transcript, customer chat, chat composer, quick replies, sentiment updates and CareIQ Assist repainting.

## Lifecycle changes in this master

- `index.html` is the canonical application shell and loads the complete modular entry path.
- `src/main.js` is a thin bootstrap into `src/app.js`.
- `src/app.js` controls authenticated vs unauthenticated startup.
- Prototype login authenticates against `src/mocks/mockUsers.js`.
- Prototype session uses `sessionStorage` only.
- Sign out routes through `App.logout()` and returns to the login lifecycle.

## Automated regression checks

`npm run check` verifies required files, entrypoint references, the `main.js -> app.js` boundary and absence of obvious secret-like values in public runtime configuration.

`npm run smoke` verifies:

- Login screen renders
- Prototype credentials authenticate
- Agent Dashboard renders
- Announcements render
- Customer Call View renders
- CareIQ Assist renders
- End & Wrap modal renders
- Customer Chat View renders
- Chat composer is present
- A quick reply is sent through the existing `sendChat()` emulation path and appears in the chat log
- Sign out clears the prototype session

Expected result: **PASS**.

## v0.5.1 authentication correction

- Prototype session key versioned to prevent stale sessions from older deployments bypassing the login page.
- Sign out now clears current and legacy prototype sessions and renders the login screen immediately.
- Login still reloads after successful authentication so the existing transcript/chat runtime starts cleanly.
- No changes were made to the approved dashboard, call/chat UI, transcript engine, chat emulation, CareIQ Assist, announcements or wrap-up behavior.
