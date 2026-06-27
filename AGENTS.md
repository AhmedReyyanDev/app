# app

A React Native (Expo) "Daily Quote" app. It shows a single deterministic
"quote of the day" that changes each calendar day, drawn from a bundled,
offline-first list of quotes in `src/quotes.ts`.

## Project structure

- `App.tsx` — the single-screen UI (dark, premium theme).
- `src/quotes.ts` — the bundled quote dataset (`{ text, author }[]`).
- `src/getDailyQuote.ts` — deterministic daily selection (stable per calendar day).
- `src/theme.ts` — design tokens (colors / spacing / radii).

## Common commands

- Typecheck: `npm run typecheck`
- Run on web: `npm run web` (Metro + react-native-web; good for quick local/visual checks)
- Run on device/simulator: `npm run android` / `npm run ios`, or `npm start` then scan the QR with Expo Go.

## Cursor Cloud specific instructions

- Stack: Expo SDK 56, React Native 0.85, React 19, TypeScript. Dependencies install via the update script (`npm install`).
- Demo/verify in this VM with **Expo Web**: run `npx expo start --web --port 8081` (it serves on `http://localhost:8081`). The first request triggers Metro bundling and can take 30–60s; the page is briefly blank/white until the bundle finishes. There is no Android/iOS emulator available here, so web is the practical way to view the UI.
- The "quote of the day" is chosen deterministically from `dayIndex(date) % quotes.length` (local calendar day), so it is stable within a day and differs day-to-day. To see a different quote you must change the day, not reload — reloading the same day shows the same quote by design.
- There is no test runner or ESLint configured by default; `npm run typecheck` (`tsc --noEmit`) is the available static check.
