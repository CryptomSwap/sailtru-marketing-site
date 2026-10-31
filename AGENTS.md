# AGENTS.md

## Blender modelling

Blender modelling runs headless via `node scripts/run-blender-model.mjs`. It runs `scripts/build-sailtru-boat-blender.py` and exports a web-ready `.glb` to `public/models/journey/sailtru-logo-boat.glb` (plus an editable `.blend` next to it and a preview render in `artifacts/renders/`). Generated outputs are not committed.

`scripts/blender-locator.mjs` finds Blender: `BLENDER_PATH` first, then the newest Windows install under `C:\Program Files\Blender Foundation`, then the same install seen from WSL at `/mnt/c/Program Files/Blender Foundation/*/blender.exe`, then `blender` on PATH. Under WSL, paths passed to `blender.exe` are translated with `wslpath -w`.
