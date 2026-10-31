# AGENTS.md

## Blender modelling

Blender modelling runs headless via `node scripts/run-blender-model.mjs`. It runs `scripts/build-sailtru-boat-blender.py` and exports a web-ready `.glb` to `public/models/journey/sailtru-logo-boat.glb` (plus an editable `.blend` next to it and a preview render in `artifacts/renders/`). Generated outputs are not committed.

`scripts/blender-locator.mjs` finds Blender: `BLENDER_PATH` first, then the newest Windows install under `C:\Program Files\Blender Foundation`, then the same install seen from WSL at `/mnt/c/Program Files/Blender Foundation/*/blender.exe`, then `blender` on PATH. Under WSL, paths passed to `blender.exe` are translated with `wslpath -w`.

## Homepage: the 3D harbor is the canonical track

The homepage is built on the React Three Fiber 3D harbor scene (`src/components/harbor/three/harbor-scene.tsx`, loaded lazily by the harbor story). Always build on that scene. Do not restart from the 2D SVG harbor or from older prototypes.

- The 2D SVG harbor (`src/components/harbor/harbor-world.tsx`) is kept only as the fallback for `prefers-reduced-motion`, no WebGL, WebGL context loss, asset-load failure and render errors. It is server-rendered first so there is no layout shift. Do not extend it with new features that the 3D scene does not have.
- Camera: scroll picks camera viewpoints and the pointer adds a smoothed offset on top. Boats bob, the lighthouse lamp rotates, text, reports and controls stay crisp HTML overlays.
- 3D props (boats and hulls, lighthouse, crane, buildings, docks, rocks, palms) are Blender-modelled `.glb` files under `public/models/harbor/`, made through the Blender pipeline above (`node scripts/run-blender-model.mjs` for the SailTru boat, `node scripts/run-blender-harbor-assets.mjs` for the harbor set) and loaded with `useGLTF`. Prefer improving a Blender model over adding box/cylinder primitives in code. Keep GLBs compressed and the total payload small; commit the `.glb` files, not `.blend` files or renders.
- Look: warm ivory paper, charcoal outlines, toon shading, soft fog and a subtle paper grain; cobalt only for active elements (the client's boat, selected finding, route, action). Metaphors stay fixed: boat = the business, chart = the report, route = the recommended next action, working dock = implementation.
- The cobalt identity stays above the fold on `/en` and `/he`, as part of one continuous harbor hero.
