# Regression guard report

The application-controller refactor is intentionally isolated from the approved CareIQ interaction runtime.

## Core conversation engine

The following functions remain in `src/legacy/care-console.js` and were not modified by the `app.js` refactor:

- `transcriptHtml`
- `messagesHtml`
- `paintMessages`
- `sendChat`
- `bindChat`
- `paintAssist`

The approved interaction engine therefore remains the execution path for the call transcript, customer chat, chat composer, quick replies, sentiment updates and CareIQ Assist repainting.

## Automated regression checks

`npm run check` verifies that `src/main.js` stays a thin bootstrap and that `src/app.js` owns the application lifecycle boundary.

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

Current result: **PASS**.
