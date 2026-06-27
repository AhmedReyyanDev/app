# Daily Muse

A clean, dark, premium React Native (Expo) app that shows a **quote of the day**.
Open it any day and you get one curated quote — a different one each day — drawn
from a bundled, offline-first collection (no network required).

To build a Google Play `.aab`, see [`BUILD_ANDROID.md`](./BUILD_ANDROID.md).

## Getting started

```bash
npm install
npm run web      # run in the browser (Expo Web)
# or
npm start        # then open in Expo Go on a device, or use:
npm run android
npm run ios
```

## How it works

- Quotes live in `src/quotes.ts` (`{ text, author }[]`).
- `src/getDailyQuote.ts` picks one deterministically per calendar day, so everyone
  sees the same quote on a given day and a new one the next day.
- `App.tsx` renders the single-screen UI using tokens from `src/theme.ts`.
