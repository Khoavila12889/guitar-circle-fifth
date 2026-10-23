# Working on Guitar Circle of Fifths

Before editing this app, read the feature inventory in [README.md](README.md) and the repository skill [.agents/skills/guitar-feature-preservation/SKILL.md](.agents/skills/guitar-feature-preservation/SKILL.md).

For CSS/layout requests, preserve existing interactions and musical behavior. In particular, keep the practice URL player, metronome, TAP tempo, all eight time signatures, separate volume controls, guitar diagrams, custom keys, variations, and practice guide. A UI refresh must not silently remove them.

The app root is `chord-progression-webapp/`. GitHub Actions deploys its `dist` from `main`; `gh-pages` is a historical reference, not the current publishing source. Historical deployed bundles contain features missing from historical main source; read the recovery note in README before restoring old code.
