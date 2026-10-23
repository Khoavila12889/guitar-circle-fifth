---
name: guitar-feature-preservation
description: Maintain this Guitar Circle of Fifths repository while preserving its deployed practice player, metronome, TAP, guitar diagrams, and music-learning features. Use for changes or deployment in this repository.
---

Read the [root README](../../../README.md) feature inventory before modifying the app. Work in `chord-progression-webapp/`.

For a CSS-only request, limit behavior changes to those explicitly requested. Preserve the URL input/Enter/Phát/clear flow, supported music providers, independent music and click volumes, BPM presets/range, TAP/reset, all eight meters and accent patterns, beat display, guitar fingering selection, key/mode/custom-key flow, variations and practice guide.

Historical trap: `0c27318` on `gh-pages` has features that source commit `50fb4ea` and subsequent `762d752` lack. Deploying main at `892516d` exposed that mismatch. Compare the old deployed bundle as well as source history before replacing or reverting UI. Recovered source is now in `PracticePlayer.tsx`, `hooks/useMetronome.ts`, `utils/practiceMedia.ts`, `utils/youtubePlayer.ts`, `GuitarChordPanel.tsx`, and `data/guitarChords.ts`. Do not replace these with an older App that omits them.

Keep the old rhythmic convention unless a change is requested: quarter-note pulse is 60000/BPM ms; eighth-note pulse is half that; retain meter accents. Tempo/meter changes while running must not create parallel timers. Stop/clear/unmount must release the appropriate audio/player resources.

Validate behavior with `npm test` and production with `npm run build`. For UI/player changes, exercise the production page: key and mode selection, custom key, all/individual guitar diagrams, URL playback/clear, both volumes, start/stop, meter switch, tempo change, TAP/reset, variations and guide. Embedded media requires network access and provider permission; distinguish a provider restriction from a missing UI feature. Do not claim audio playback was verified from HTTP checks or a mocked API test.

Publish through `.github/workflows/deploy-pages.yml` from main, with Vite base `/guitar-circle-fifth/` and artifact `chord-progression-webapp/dist`. Follow the user's authorization for commit/push/deploy. Check the workflow result and the live behavior after deployment. Update the README inventory and regression checks when intentionally adding/removing a feature.
