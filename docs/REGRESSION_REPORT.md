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


## v0.6.0 - Chat workspace alignment

- Chat view now uses the same customer profile, six KPI strip, signal row and CareIQ Assist structure as the call view.
- Removed duplicate Transfer / End & Wrap controls from the inner chat card; the interaction bar remains authoritative.
- Removed the always-expanded Customer 360 and premature post-chat summary from the active chat page.
- View in 360 opens a non-blocking side drawer so the live interaction and composer remain usable.
- Renamed AI QA assistant presentation to SOP Guidance / Live SOP compliance score.
- Corrected the chat End & Wrap HTML-entity display defect.
- Updated recent purchase signal to Recent transaction: Mall of the Emirates · AED 1,240.
- Existing chat send, quick reply, auto-response, sentiment, call transcript, announcements, wrap-up and sign-out behavior retained.

## v0.6.1 responsive hardening
- Fixed Customer 360 cards shrinking/clipping inside the drawer by making drawer cards non-shrinking flex items.
- Customer 360 now owns vertical scrolling below a fixed header; wide case tables scroll inside their card instead of expanding the page.
- Drawer width adapts across full desktop, half-screen/split-screen, smaller laptop, and narrow viewport layouts.
- Call/chat workspaces now size against viewport height rather than relying only on fixed pixel heights.
- Customer profile facts wrap safely at reduced widths.
- Top navigation, live interaction bar, KPI strips, signals, chat composer, modal and notification surfaces have responsive fallbacks.
- No interaction-state logic was changed; chat send/auto-response, transcript progression, CareIQ Assist, announcements, wrap-up, login and sign-out remain on the existing runtime.


## v0.6.2 adaptive CareIQ Assist overflow
- Normal desktop layouts no longer impose a max-height on CareIQ Assist and therefore do not show a redundant nested scrollbar.
- A short-height desktop fallback enables internal scrolling only when the available viewport height requires it.
- Existing responsive stacking at narrower widths remains unchanged.
- No changes were made to chat send/auto-response, transcript progression, sentiment, Assist content generation, Customer 360, announcements, wrap-up, login or sign-out logic.
