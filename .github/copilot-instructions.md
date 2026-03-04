## Purpose

Provide quick, actionable guidance for AI coding agents working on this repository so they can be productive immediately.

## Quickstart (Commands)

- **Install deps:** `npm install` (project uses Angular 12; `postinstall` runs `ngcc`)
- **Run dev server:** `npm run start-dev` (maps to `ng serve --configuration=development`)
- **Build production:** `npm run start-prod` (runs `ng build --prod --aot --output-hashing=all`)
- **Run unit tests:** `npm test` (Karma + Jasmine)

## High-level Architecture

- Frontend Angular app (Angular v12) located under `src/` with the main entry in `src/main.ts`.
- Routing & layout: `src/app/app-routing.module.ts` defines top-level routes and lazy-loaded feature modules.
- App wiring: `src/app/app.module.ts` registers many UI modules and global providers (e.g. `ThemeOptions`, `ConfigActions`, `WINDOW_PROVIDERS`).

## Important Patterns & Conventions

- State management uses `@angular-redux/store` (see `src/app/ThemeOptions/store/*`). Avoid replacing store logic without updating `ConfigActions` and reducers.
- Routing uses `HashLocationStrategy` (configured in `AppModule`) — URLs and route tests should account for `#/` style paths.
- Large feature group: `src/app/clmaster` contains many domain-specific modules and components (this is a high-change area; prefer small, focused edits).
- Lazy-loaded modules: routes use `loadChildren(...)` (see `app-routing.module.ts`) — prefer maintaining lazy-loading when adding new large features.
- Socket usage: some components import `io` from `socket.io-client` directly (e.g. `src/app/clmaster/kasirfarmasijual/*`, `kasirlab`). Search for `io` before centralizing socket code.

## External Integrations to Watch

- `socket.io-client` used in components for real-time features — check server contract before changing message formats.
- `@angular/google-maps`, `ngx-youtube-player`, `ngx-dropzone-wrapper`, `primeng`, many UI libs — upgrading versions may require breaking changes across templates.
- Dropzone default upload is set to `https://httpbin.org/post` in `AppModule`'s `DEFAULT_DROPZONE_CONFIG` — update when integrating real backend.

## Files & Locations to Inspect for Context

- Root scripts / dependencies: `package.json`
- App entry & bootstrapping: `src/app/app.module.ts`, `src/app/app-routing.module.ts`
- Theme / UI state: `src/app/ThemeOptions/` (reducers, actions)
- Major domain area: `src/app/clmaster/` (many components/modules)
- Example small feature: `src/app/satusehat/` group (shows how small feature forms are organized and imported)

## Testing & Debugging Notes

- Tests run with Karma (`karma.conf.js`) and Angular CLI `ng test` — use `--watch=false` for CI runs.
- Some components contain commented or removed WebSocket code; search for `// WebSocket functionality removed` when investigating real-time behavior.

## Guidance For AI Agents (Do This First)

1. Read `package.json` to capture scripts and `postinstall` behavior (`ngcc`).
2. Open `src/app/app-routing.module.ts` and `src/app/app.module.ts` to understand lazy-loading and global providers.
3. Search for `socket.io-client` and `ThemeOptions` before making cross-cutting changes.
4. When refactoring components in `clmaster`, prefer incremental, covered changes and run unit tests.

## Non-goals / What Not To Change Blindly

- Do not change global provider keys (e.g. `WINDOW_PROVIDERS`, `ThemeOptions`) without verifying consumers.
- Do not upgrade major Angular/core packages without running full app and test suite — this project relies on many 3rd-party integrations.

If any of the architecture or workflows are unclear or you want examples added (e.g., a socket abstraction or a small module onboarding example), tell me which area and I'll expand this file.
