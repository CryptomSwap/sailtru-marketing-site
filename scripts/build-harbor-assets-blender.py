"""Build the low-poly SailTru harbor set and export web-ready GLBs.

Run with:
  node scripts/run-blender-harbor-assets.mjs
  (or: blender --background --python scripts/build-harbor-assets-blender.py)

Exports to public/models/harbor/:
  sailboat.glb    the business: cobalt hull, cream sails, animatable Pennant, CrateSocket empty
  buoy.glb        an evidence buoy (Band material is recoloured in code for the selected finding)
  lighthouse.glb  lighthouse on its islet, Lantern node for the lamp
  dock.glb        quay, jetty, workshop (WorkshopWindow_* nodes), crane (CraneSlew / CraneTrolley /
                  CraneHook / CraneCrate nodes), Berth and CrateRest empties
  terrain.glb     Headland, TownHill, FarRidge, Reef, Islet_* (trees and houses baked in)
  props.glb       Gull (WingL / WingR), Cloud_*, Rock_*, Barrel, Crate, Bollard

Blender-generated: every mesh in the files above.
Hand-built in code (src/components/harbor/three/): water, sky and sun, foam rings, contact
shadows, route ribbons, crane cable, ping rings, ink outlines and the toon materials.

No textures and no Draco: flat palette materials only (base colours stored linear, as glTF expects).
Coordinates: Blender X = story direction, -Y = toward the camera, Z = up (exported Y-up).
"""

from __future__ import annotations

import math
import random
from pathlib import Path

import bmesh
import bpy
from mathutils import Matrix, Vector


ROOT = Path(__file__).resolve().parents[1]
MODEL_DIR = ROOT / "public" / "models" / "harbor"
PREVIEW_DIR = ROOT / "artifacts" / "renders" / "harbor"
MODEL_DIR.mkdir(parents=True, exist_ok=True)
PREVIEW_DIR.mkdir(parents=True, exist_ok=True)

# The harbor palette (sRGB). Cobalt is reserved for the business and the recommended action.
PALETTE = {
    "ink": "#22252b",
    "cobalt": "#2448e0",
    "cobaltDeep": "#1a35ad",
    "cream": "#f7f2e7",
    "sail": "#fbf7ee",
    "paper": "#efe8da",
    "sand": "#ddd3bf",
    "sandDark": "#cfc4ad",
    "rock": "#c6bba3",
    "rockDark": "#a99e87",
    "sage": "#aab09a",
    "sageDark": "#8f9883",
    "wood": "#b9a486",
    "woodDark": "#8c7a62",
    "roof": "#8e8576",
    "roofAlt": "#9c917f",
    "glass": "#3a3f48",
    "glow": "#ffe2a0",
    "stone": "#d9cfba",
    "stoneDark": "#c9bea6",
    "beak": "#d4a85a",
    "band": "#22252b",
}


def srgb_to_linear(c: float) -> float:
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def hex_linear(hex_color: str):
    h = hex_color.lstrip("#")
    return tuple(srgb_to_linear(int(h[i : i + 2], 16) / 255) for i in (0, 2, 4))


def material(key: str):
    name = f"pal_{key}"
    existing = bpy.data.materials.get(name)
    if existing:
        return existing
    mat = bpy.data.materials.new(name)
    rgb = hex_linear(PALETTE[key])
    mat.diffuse_color = (*rgb, 1.0)
    if mat.node_tree is None:
        mat.use_nodes = True  # Blender < 5 creates materials without a node tree
    bsdf = mat.node_tree.nodes.get("Principled BSDF") if mat.node_tree else None
    if bsdf:
        bsdf.inputs["Base Color"].default_value = (*rgb, 1.0)
        bsdf.inputs["Roughness"].default_value = 0.8
        if key == "glow":
            if "Emission Color" in bsdf.inputs:
                bsdf.inputs["Emission Color"].default_value = (*rgb, 1.0)
                bsdf.inputs["Emission Strength"].default_value = 1.0
    return mat


def reset_scene() -> None:
    for obj in list(bpy.data.objects):
        bpy.data.objects.remove(obj, do_unlink=True)
    for collection in (bpy.data.meshes, bpy.data.materials, bpy.data.metaballs, bpy.data.curves, bpy.data.cameras, bpy.data.lights):
        for block in list(collection):
            collection.remove(block)


# ------------------------------------------------------------------ #
# Mesh helpers (bmesh, so nothing depends on operator context)        #
# ------------------------------------------------------------------ #


def link(obj, parent=None):
    bpy.context.scene.collection.objects.link(obj)
    if parent is not None:
        obj.parent = parent
    return obj


def empty(name, location=(0, 0, 0), parent=None):
    obj = bpy.data.objects.new(name, None)
    obj.empty_display_size = 0.3
    obj.location = location
    return link(obj, parent)


def finish(name, bm, mats, parent=None, smooth=False, location=None):
    """Turn a bmesh into an object. `mats` is a key or a list of keys (face.material_index order)."""
    keys = [mats] if isinstance(mats, str) else list(mats)
    mesh = bpy.data.meshes.new(f"{name}_mesh")
    bm.normal_update()
    bm.to_mesh(mesh)
    bm.free()
    for key in keys:
        mesh.materials.append(material(key))
    for poly in mesh.polygons:
        poly.use_smooth = smooth
    obj = bpy.data.objects.new(name, mesh)
    if location is not None:
        obj.location = location
    return link(obj, parent)


def bm_box(bm, center, size, mat_index=0, bevel=0.0):
    """Add an axis-aligned box to `bm`."""
    geom = bmesh.ops.create_cube(bm, size=1.0)
    verts = geom["verts"]
    bmesh.ops.scale(bm, vec=Vector(size), verts=verts)
    bmesh.ops.translate(bm, vec=Vector(center), verts=verts)
    faces = list({f for v in verts for f in v.link_faces})
    for f in faces:
        f.material_index = mat_index
    if bevel > 0:
        edges = list({e for v in verts for e in v.link_edges})
        try:
            bmesh.ops.bevel(bm, geom=edges + verts, offset=bevel, offset_type="OFFSET", segments=1, profile=0.5, affect="EDGES", clamp_overlap=True)
        except TypeError:
            pass
    return verts


def bm_beam(bm, p0, p1, thickness, mat_index=0):
    """A square beam between two points."""
    a, b = Vector(p0), Vector(p1)
    d = b - a
    length = d.length
    geom = bmesh.ops.create_cube(bm, size=1.0)
    verts = geom["verts"]
    bmesh.ops.scale(bm, vec=Vector((length, thickness, thickness)), verts=verts)
    rot = d.normalized().to_track_quat("X", "Z").to_matrix().to_4x4()
    bmesh.ops.transform(bm, matrix=Matrix.Translation((a + b) / 2) @ rot, verts=verts)
    for v in verts:
        for f in v.link_faces:
            f.material_index = mat_index
    return verts


def bm_cyl(bm, base, r1, r2, height, segments=12, mat_index=0, axis="Z"):
    """Cylinder / cone standing on `base` (axis Z), or lying along X / Y."""
    geom = bmesh.ops.create_cone(bm, cap_ends=True, cap_tris=False, segments=segments, radius1=r1, radius2=r2, depth=height)
    verts = geom["verts"]
    bmesh.ops.translate(bm, vec=Vector((0, 0, height / 2)), verts=verts)
    if axis == "X":
        bmesh.ops.rotate(bm, cent=Vector((0, 0, 0)), matrix=Matrix.Rotation(math.pi / 2, 3, "Y"), verts=verts)
    elif axis == "Y":
        bmesh.ops.rotate(bm, cent=Vector((0, 0, 0)), matrix=Matrix.Rotation(-math.pi / 2, 3, "X"), verts=verts)
    bmesh.ops.translate(bm, vec=Vector(base), verts=verts)
    for v in verts:
        for f in v.link_faces:
            f.material_index = mat_index
    return verts


def bm_ico(bm, center, radius, subdiv=1, scale=(1, 1, 1), jitter=0.0, rng=None, mat_index=0, floor=None):
    geom = bmesh.ops.create_icosphere(bm, subdivisions=subdiv, radius=radius)
    verts = geom["verts"]
    rng = rng or random.Random(1)
    for v in verts:
        if jitter:
            v.co *= 1 + (rng.random() - 0.5) * 2 * jitter
        v.co.x *= scale[0]
        v.co.y *= scale[1]
        v.co.z *= scale[2]
        if floor is not None and v.co.z < floor:
            v.co.z = floor
        v.co += Vector(center)
    for v in verts:
        for f in v.link_faces:
            f.material_index = mat_index
    return verts


def bm_prism(bm, profile_xz, y0, y1, mat_index=0):
    """Extrude a convex XZ polygon from y0 to y1 (used for gable roofs and hull details)."""
    front = [bm.verts.new((x, y0, z)) for x, z in profile_xz]
    back = [bm.verts.new((x, y1, z)) for x, z in profile_xz]
    faces = [bm.faces.new(front[::-1]), bm.faces.new(back)]
    n = len(profile_xz)
    for i in range(n):
        j = (i + 1) % n
        faces.append(bm.faces.new((front[i], front[j], back[j], back[i])))
    for f in faces:
        f.material_index = mat_index
    return front + back


def bm_grid_surface(bm, corner_fn, rows, cols, mat_index=0):
    """A surface patch from a function (u, v) -> point."""
    grid = [[bm.verts.new(corner_fn(c / cols, r / rows)) for c in range(cols + 1)] for r in range(rows + 1)]
    for r in range(rows):
        for c in range(cols):
            f = bm.faces.new((grid[r][c], grid[r][c + 1], grid[r + 1][c + 1], grid[r + 1][c]))
            f.material_index = mat_index
    return grid


def solidify(obj, thickness):
    mod = obj.modifiers.new("solid", "SOLIDIFY")
    mod.thickness = thickness
    mod.offset = 0
    return mod


# ------------------------------------------------------------------ #
# Shared props                                                        #
# ------------------------------------------------------------------ #


def tree(bm, base, height, rng, kind="round", trunk_index=0, leaf_index=1, leaf_dark_index=2):
    x, y, z = base
    bm_cyl(bm, (x, y, z - 0.1), 0.09 * height, 0.06 * height, 0.42 * height, 6, trunk_index)
    if kind == "pine":
        for i, (rr, hh, zz) in enumerate(((0.42, 0.55, 0.3), (0.34, 0.5, 0.58), (0.24, 0.42, 0.82))):
            bm_cyl(bm, (x, y, z + zz * height), rr * height, 0.02, hh * height, 7, leaf_dark_index if i == 0 else leaf_index)
    else:
        bm_ico(bm, (x, y, z + 0.62 * height), 0.36 * height, 1, (1, 1, 1.15), 0.12, rng, leaf_index)
        bm_ico(bm, (x + 0.16 * height, y - 0.08 * height, z + 0.48 * height), 0.24 * height, 1, (1, 1, 1), 0.1, rng, leaf_dark_index)


def house(bm, base, w, d, h, rng, wall=0, roof=1, glass=2, door=3, facing=-1):
    """A gabled cottage, ridge along X, windows on the -Y face."""
    x, y, z = base
    bm_box(bm, (x, y, z + h / 2), (w, d, h), wall, 0.02)
    over = 0.14
    bm_prism(bm, [(x - w / 2 - over, z + h), (x + w / 2 + over, z + h), (x, z + h + w * 0.42)], y - d / 2 - over, y + d / 2 + over, roof)
    fy = y + facing * (d / 2 + 0.02)
    for i in range(2):
        wx = x - w * 0.25 + i * w * 0.5
        bm_box(bm, (wx, fy, z + h * 0.6), (w * 0.18, 0.05, h * 0.24), glass)
    bm_box(bm, (x + rng.choice((-1, 1)) * w * 0.02, fy, z + h * 0.24), (w * 0.14, 0.05, h * 0.46), door)


def heightfield(name, size, res, bumps, rng, base=-0.4, noise=0.12, edge=0.18, colours=("sand", "sage", "rock", "sageDark"), parent=None):
    """A flat-shaded hill. Faces are coloured by height and slope: sand shore, sage grass, rock faces."""
    sx, sy = size
    nx, ny = res
    bm = bmesh.new()

    def height(px, py):
        h = 0.0
        for cx, cy, rx, ry, hh in bumps:
            h += hh * math.exp(-(((px - cx) / rx) ** 2 + ((py - cy) / ry) ** 2))
        ex = min(1.0, (sx / 2 - abs(px)) / (sx * edge))
        ey = min(1.0, (sy / 2 - abs(py)) / (sy * edge))
        fall = max(0.0, min(ex, ey))
        return base + (h * (1 + (rng.random() - 0.5) * noise * 2) - base) * (fall ** 0.7) if h > 0 else base

    grid = []
    for j in range(ny + 1):
        row = []
        for i in range(nx + 1):
            px = -sx / 2 + sx * i / nx + (rng.random() - 0.5) * sx / nx * 0.3
            py = -sy / 2 + sy * j / ny + (rng.random() - 0.5) * sy / ny * 0.3
            row.append(bm.verts.new((px, py, height(px, py))))
        grid.append(row)
    for j in range(ny):
        for i in range(nx):
            quad = (grid[j][i], grid[j][i + 1], grid[j + 1][i + 1], grid[j + 1][i])
            for tri in ((quad[0], quad[1], quad[2]), (quad[0], quad[2], quad[3])):
                f = bm.faces.new(tri)
                f.normal_update()
                zc = sum(v.co.z for v in tri) / 3
                steep = f.normal.z < 0.72
                if zc < 0.35:
                    f.material_index = 0
                elif steep:
                    f.material_index = 2
                else:
                    f.material_index = 1 if (i + j) % 5 else 3
    # Skirt down to the seabed so the hill reads as solid from low angles.
    obj = finish(name, bm, list(colours), parent=parent)
    return obj, height


# ------------------------------------------------------------------ #
# Export / preview                                                    #
# ------------------------------------------------------------------ #


def export(root, filename):
    bpy.ops.object.select_all(action="DESELECT")
    root.select_set(True)
    for child in root.children_recursive:
        child.select_set(True)
    bpy.context.view_layer.objects.active = root
    kwargs = dict(
        filepath=str(MODEL_DIR / filename),
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_yup=True,
        export_materials="EXPORT",
        export_cameras=False,
        export_lights=False,
    )
    try:
        bpy.ops.export_scene.gltf(export_texcoords=False, **kwargs)
    except TypeError:
        bpy.ops.export_scene.gltf(**kwargs)
    size = (MODEL_DIR / filename).stat().st_size
    print(f"GLB={MODEL_DIR / filename} ({size / 1024:.1f} KB)")


def preview(filename, target=(0, 0, 1), distance=14, elevation=0.28, azimuth=-0.35, lens=50):
    """Workbench proof render (flat material colours + outlines) into artifacts/renders/harbor."""
    scene = bpy.context.scene
    cam_data = bpy.data.cameras.new("PreviewCam")
    cam_data.lens = lens
    cam = bpy.data.objects.new("PreviewCam", cam_data)
    link(cam)
    t = Vector(target)
    cam.location = t + Vector((math.sin(azimuth) * math.cos(elevation), -math.cos(azimuth) * math.cos(elevation), math.sin(elevation))) * distance
    cam.rotation_euler = (t - cam.location).to_track_quat("-Z", "Y").to_euler()
    scene.camera = cam
    try:
        scene.render.engine = "BLENDER_WORKBENCH"
        shading = scene.display.shading
        shading.light = "STUDIO"
        shading.color_type = "MATERIAL"
        shading.show_object_outline = True
        shading.show_cavity = True
        shading.background_type = "VIEWPORT"
        shading.background_color = hex_linear("#f5f0e6")
    except (AttributeError, TypeError):
        pass
    scene.render.resolution_x = 960
    scene.render.resolution_y = 600
    scene.render.image_settings.file_format = "PNG"
    scene.render.filepath = str(PREVIEW_DIR / filename)
    try:
        bpy.ops.render.render(write_still=True)
        print(f"PREVIEW={PREVIEW_DIR / filename}")
    except RuntimeError as error:
        print(f"preview skipped: {error}")
    bpy.data.objects.remove(cam, do_unlink=True)


# ------------------------------------------------------------------ #
# Sailboat                                                            #
# ------------------------------------------------------------------ #


def build_sailboat():
    reset_scene()
    root = empty("Sailboat")
    # Length along X (bow +X), beam along Y, waterline at z = 0.
    # (x, half beam, sheer height, keel depth)
    profile = [
        (-2.05, 0.62, 0.62, -0.05),
        (-1.7, 0.78, 0.6, -0.26),
        (-0.9, 0.9, 0.6, -0.42),
        (0.1, 0.92, 0.62, -0.46),
        (1.0, 0.8, 0.66, -0.4),
        (1.7, 0.52, 0.74, -0.26),
        (2.2, 0.2, 0.84, -0.06),
        (2.42, 0.02, 0.92, 0.2),
    ]
    ring = 12
    bm = bmesh.new()
    sections = []
    for x, w, top, bottom in profile:
        pts = []
        for k in range(ring + 1):
            a = math.pi * k / ring  # 0 = starboard sheer, pi = port sheer, through the keel
            s = math.cos(a)
            dz = math.sin(a) ** 0.85
            pts.append(bm.verts.new((x, s * w * (1 - 0.18 * dz * dz), top - (top - bottom) * dz)))
        sections.append(pts)
    for i in range(len(sections) - 1):
        a, b = sections[i], sections[i + 1]
        for k in range(ring):
            bm.faces.new((a[k], b[k], b[k + 1], a[k + 1]))
    bm.faces.new(list(reversed(sections[0])))  # transom
    bm.faces.new(sections[-1])
    # Deck lid.
    deck = [sec[0] for sec in sections] + [sec[ring] for sec in reversed(sections)]
    bm.faces.new(deck)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    hull = finish("Hull", bm, "cobalt", root, smooth=True)

    # Sheer stripe (cream) and boot stripe just above the waterline.
    bm = bmesh.new()
    for side in (-1, 1):
        for x0, x1 in zip(profile[:-1], profile[1:]):
            for (xa, wa, ta, _), (xb, wb, tb, _) in ((x0, x1),):
                p = [
                    (xa, side * (wa + 0.012), ta - 0.02),
                    (xb, side * (wb + 0.012), tb - 0.02),
                    (xb, side * (wb + 0.012), tb - 0.13),
                    (xa, side * (wa + 0.012), ta - 0.13),
                ]
                vs = [bm.verts.new(v) for v in p]
                bm.faces.new(vs if side > 0 else vs[::-1])
    finish("SheerStripe", bm, "cream", root)

    # Deck house, cockpit, mast, boom, keel, rudder.
    bm = bmesh.new()
    bm_box(bm, (0.15, 0, 0.78), (1.3, 0.92, 0.36), 0, 0.06)
    bm_box(bm, (0.12, 0, 0.98), (1.42, 1.0, 0.06), 0, 0.02)
    for i in range(3):
        bm_box(bm, (-0.25 + i * 0.4, -0.465, 0.8), (0.22, 0.02, 0.12), 1)
        bm_box(bm, (-0.25 + i * 0.4, 0.465, 0.8), (0.22, 0.02, 0.12), 1)
    bm_box(bm, (-1.3, 0, 0.6), (1.0, 0.95, 0.08), 2)  # cockpit sole (teak)
    finish("Cabin", bm, ["cream", "ink", "wood"], root)

    mast_x = 0.55
    bm = bmesh.new()
    bm_cyl(bm, (mast_x, 0, 0.95), 0.055, 0.04, 5.0, 8, 0)
    bm_beam(bm, (mast_x, 0, 1.45), (mast_x - 2.25, 0, 1.38), 0.08, 1)  # boom
    bm_beam(bm, (mast_x, 0, 5.85), (2.36, 0, 0.92), 0.018, 1)  # forestay
    bm_beam(bm, (mast_x, 0, 5.85), (-2.0, 0, 0.66), 0.016, 1)  # backstay
    for side in (-1, 1):
        bm_beam(bm, (mast_x, 0, 5.2), (mast_x - 0.15, side * 0.84, 0.66), 0.014, 1)
    bm_box(bm, (0.1, 0, -0.75), (0.9, 0.12, 0.7), 1, 0.04)  # keel
    bm_box(bm, (-1.95, 0, -0.2), (0.28, 0.07, 0.6), 1, 0.02)  # rudder
    # Bow pulpit and stanchions
    bm_beam(bm, (2.0, -0.18, 1.18), (2.3, 0, 1.2), 0.03, 0)
    bm_beam(bm, (2.0, 0.18, 1.18), (2.3, 0, 1.2), 0.03, 0)
    for side in (-1, 1):
        for x in (-1.6, -0.6, 0.6, 1.5):
            w = 0.82 if abs(x) < 1.2 else 0.62
            bm_beam(bm, (x, side * w, 0.64), (x, side * w, 0.98), 0.025, 1)
        bm_beam(bm, (-1.6, side * 0.66, 0.98), (1.5, side * 0.66, 1.0), 0.016, 1)
    finish("Rig", bm, ["cream", "ink"], root)

    # Sails: a slightly billowed mainsail and jib, solidified for clean outlines.
    def main(u, v):
        # u along the foot (0 = mast, 1 = clew), v up the luff
        x = mast_x - 0.06 - 2.1 * u * (1 - v) ** 0.95
        z = 1.52 + 4.15 * v
        y = math.sin(math.pi * u) * math.sin(math.pi * min(1, v * 1.1)) * 0.22
        return (x, y, z)

    bm = bmesh.new()
    bm_grid_surface(bm, main, 8, 6)
    sail = finish("Mainsail", bm, "sail", root, smooth=True)
    solidify(sail, 0.04)

    def jib(u, v):
        tack = Vector((2.25, 0, 1.02))
        head = Vector((mast_x + 0.1, 0, 5.55))
        clew = Vector((mast_x + 0.25, 0, 1.12))
        luff = tack.lerp(head, v)
        leech = clew.lerp(head, v)
        p = luff.lerp(leech, u)
        p.y -= math.sin(math.pi * u) * math.sin(math.pi * v) * 0.2
        return tuple(p)

    bm = bmesh.new()
    bm_grid_surface(bm, jib, 8, 5)
    j = finish("Jib", bm, "sail", root, smooth=True)
    solidify(j, 0.04)

    # Sail seams (thin ink battens) on the main.
    bm = bmesh.new()
    for v in (0.25, 0.5, 0.75):
        a = Vector(main(0.0, v))
        b = Vector(main(0.92, v))
        mid = Vector(main(0.5, v))
        bm_beam(bm, a + Vector((0, 0.03, 0)), mid + Vector((0, 0.03, 0)), 0.02, 0)
        bm_beam(bm, mid + Vector((0, 0.03, 0)), b + Vector((0, 0.03, 0)), 0.02, 0)
    finish("Battens", bm, "ink", root)

    # Pennant at the masthead: its own node so code can flutter it.
    pennant_root = empty("Pennant", (mast_x, 0, 5.95), root)
    bm = bmesh.new()
    vs = [bm.verts.new(p) for p in ((0, 0, 0.12), (-0.62, 0, 0.02), (0, 0, -0.12))]
    bm.faces.new(vs)
    pen = finish("PennantFlag", bm, "cobalt", pennant_root)
    solidify(pen, 0.03)

    empty("CrateSocket", (-1.3, 0, 0.64), root)
    empty("BoatTop", (mast_x, 0, 6.1), root)
    export(root, "sailboat.glb")
    preview("sailboat.png", (0, 0, 2.6), 13, 0.2, -0.5)


# ------------------------------------------------------------------ #
# Buoy                                                                #
# ------------------------------------------------------------------ #


def build_buoy():
    reset_scene()
    root = empty("Buoy")
    bm = bmesh.new()
    # float: a squat drum with a rounded shoulder
    bm_cyl(bm, (0, 0, -0.35), 0.62, 0.66, 0.38, 14, 0)
    bm_cyl(bm, (0, 0, 0.03), 0.66, 0.44, 0.16, 14, 0)
    # tower: tapered cream body
    bm_cyl(bm, (0, 0, 0.18), 0.34, 0.22, 1.05, 10, 0)
    # cap and lamp
    bm_cyl(bm, (0, 0, 1.23), 0.26, 0.26, 0.06, 10, 1)
    bm_cyl(bm, (0, 0, 1.29), 0.04, 0.04, 0.5, 6, 1)
    finish("BuoyBody", bm, ["cream", "ink"], root, smooth=False)
    # The band and flag carry the "band" material: ink for sources, cobalt for the selected finding.
    bm = bmesh.new()
    bm_cyl(bm, (0, 0, 0.55), 0.31, 0.27, 0.32, 10, 0)
    vs = [bm.verts.new(p) for p in ((0, 0, 1.78), (0.5, 0, 1.68), (0, 0, 1.55))]
    bm.faces.new(vs)
    band = finish("BuoyBand", bm, "band", root)
    solidify(band, 0.03)
    empty("BuoyTop", (0, 0, 1.85), root)
    export(root, "buoy.glb")
    preview("buoy.png", (0, 0, 0.7), 5, 0.2)


# ------------------------------------------------------------------ #
# Lighthouse                                                          #
# ------------------------------------------------------------------ #


def build_lighthouse():
    reset_scene()
    rng = random.Random(4)
    root = empty("Lighthouse")
    heightfield(
        "LighthouseIslet",
        (11, 8),
        (14, 10),
        [(0, 0.4, 3.2, 2.4, 1.4), (2.6, -0.8, 2.0, 1.4, 0.7), (-2.4, 0.2, 1.8, 1.6, 0.6)],
        rng,
        colours=("sand", "sage", "rock", "sageDark"),
        parent=root,
    )
    base_z = 1.25
    bm = bmesh.new()
    bm_cyl(bm, (0, 0.3, base_z - 0.4), 0.98, 0.62, 6.0, 16, 0)
    # ink bands
    bm_cyl(bm, (0, 0.3, base_z + 1.2), 0.9, 0.86, 0.75, 16, 1)
    bm_cyl(bm, (0, 0.3, base_z + 3.4), 0.77, 0.73, 0.75, 16, 1)
    # gallery
    bm_cyl(bm, (0, 0.3, base_z + 5.6), 0.95, 0.95, 0.12, 16, 1)
    for k in range(12):
        a = 2 * math.pi * k / 12
        bm_beam(bm, (math.cos(a) * 0.9, 0.3 + math.sin(a) * 0.9, base_z + 5.7), (math.cos(a) * 0.9, 0.3 + math.sin(a) * 0.9, base_z + 6.05), 0.035, 1)
    for k in range(12):
        a0 = 2 * math.pi * k / 12
        a1 = 2 * math.pi * (k + 1) / 12
        bm_beam(bm, (math.cos(a0) * 0.9, 0.3 + math.sin(a0) * 0.9, base_z + 6.05), (math.cos(a1) * 0.9, 0.3 + math.sin(a1) * 0.9, base_z + 6.05), 0.035, 1)
    # roof
    bm_cyl(bm, (0, 0.3, base_z + 6.62), 0.66, 0.06, 0.62, 12, 1)
    bm_cyl(bm, (0, 0.3, base_z + 7.2), 0.06, 0.02, 0.4, 6, 1)
    # door and windows
    bm_box(bm, (0, 0.3 - 0.94, base_z + 0.05), (0.34, 0.1, 0.62), 1)
    bm_box(bm, (0, 0.3 - 0.8, base_z + 2.45), (0.18, 0.1, 0.32), 1)
    bm_box(bm, (0, 0.3 - 0.7, base_z + 4.45), (0.16, 0.1, 0.3), 1)
    finish("Tower", bm, ["white" if "white" in PALETTE else "cream", "ink"], root, smooth=True)
    bm = bmesh.new()
    bm_cyl(bm, (0, 0.3, base_z + 5.72), 0.5, 0.5, 0.9, 12, 0)
    finish("Lantern", bm, "glow", root, smooth=True)
    # keeper's cottage
    bm = bmesh.new()
    house(bm, (2.5, 0.2, 0.75), 1.9, 1.3, 1.0, rng)
    tree(bm, (-2.6, 0.6, 0.7), 1.6, rng, "pine", 4, 5, 6)
    tree(bm, (-3.3, 1.2, 0.5), 1.2, rng, "round", 4, 5, 6)
    finish("Cottage", bm, ["paper", "roof", "glass", "woodDark", "woodDark", "sage", "sageDark"], root)
    empty("LighthouseLamp", (0, 0.3, base_z + 6.2), root)
    export(root, "lighthouse.glb")
    preview("lighthouse.png", (0, 0, 3.4), 20, 0.18)


# ------------------------------------------------------------------ #
# Dock, workshop and crane                                            #
# ------------------------------------------------------------------ #


def build_dock():
    reset_scene()
    rng = random.Random(9)
    root = empty("Dock")
    quay_top = 1.0
    # Quay: paved top, masonry front in two courses.
    bm = bmesh.new()
    bm_box(bm, (9, 7.5, quay_top / 2 - 0.5), (18, 11, quay_top + 1.0), 0)
    finish("QuayBlock", bm, "stone", root)
    bm = bmesh.new()
    x = 0.0
    row = 0
    for zc in (0.72, 0.2):
        x = -0.02 if row == 0 else 0.55
        first = True
        while x < 18:
            w = rng.uniform(0.9, 1.5)
            if first and row == 1:
                w = 0.55
            w = min(w, 18.02 - x)
            bm_box(bm, (x + w / 2, 1.97, zc), (w - 0.06, 0.08, 0.48), 0 if rng.random() > 0.35 else 1, 0.03)
            x += w
            first = False
        row += 1
    finish("QuayStones", bm, ["stone", "stoneDark"], root)

    # Wooden jetty on pilings, reaching out to the left.
    bm = bmesh.new()
    deck_z = 0.86
    x = -8.0
    i = 0
    while x < 0.05:
        bm_box(bm, (x + 0.13, 1.15, deck_z), (0.24, 1.7, 0.08), 0 if i % 3 else 1)
        x += 0.28
        i += 1
    for px in (-7.8, -6.2, -4.6, -3.0, -1.4):
        for py in (0.4, 1.9):
            bm_cyl(bm, (px, py, -1.2), 0.13, 0.13, 2.25, 8, 2)
    bm_beam(bm, (-8.0, 0.32, deck_z - 0.12), (0.0, 0.32, deck_z - 0.12), 0.14, 2)
    bm_beam(bm, (-8.0, 1.98, deck_z - 0.12), (0.0, 1.98, deck_z - 0.12), 0.14, 2)
    # bollards and fenders on the jetty edge
    for bx in (-6.9, -2.2):
        bm_cyl(bm, (bx, 0.48, deck_z + 0.04), 0.1, 0.1, 0.26, 8, 3)
        bm_cyl(bm, (bx, 0.48, deck_z + 0.3), 0.14, 0.14, 0.06, 8, 3)
    for fx in (-5.4, -3.8, -2.6):
        bm_box(bm, (fx, 0.24, deck_z - 0.35), (0.22, 0.12, 0.62), 3, 0.04)
    finish("Jetty", bm, ["wood", "woodDark", "woodDark", "ink"], root)

    # Workshop: walls, gable roof, big front windows (separate so code can light them), door.
    wx0, wx1, wy0, wy1 = 4.2, 10.6, 3.4, 8.0
    wh = 3.1
    bm = bmesh.new()
    bm_box(bm, ((wx0 + wx1) / 2, (wy0 + wy1) / 2, quay_top + wh / 2), (wx1 - wx0, wy1 - wy0, wh), 0, 0.03)
    # timber framing on the front
    for fx in (wx0 + 0.08, wx0 + 2.18, wx0 + 4.42, wx1 - 0.08):
        bm_box(bm, (fx, wy0 - 0.03, quay_top + wh / 2), (0.14, 0.08, wh), 2)
    bm_box(bm, ((wx0 + wx1) / 2, wy0 - 0.03, quay_top + wh - 0.07), (wx1 - wx0, 0.08, 0.14), 2)
    # door
    bm_box(bm, (wx1 - 0.95, wy0 - 0.05, quay_top + 1.05), (1.3, 0.08, 2.1), 3)
    bm_box(bm, (wx1 - 0.95, wy0 - 0.07, quay_top + 1.05), (0.06, 0.06, 2.1), 2)
    # chimney
    bm_box(bm, (wx0 + 1.2, (wy0 + wy1) / 2 + 0.6, quay_top + wh + 2.2), (0.45, 0.45, 1.6), 4)
    finish("Workshop", bm, ["paper", "roof", "woodDark", "glass", "stoneDark"], root)
    # Gable roof, ridge along X so the long front wall and its windows face the water.
    over = 0.3
    ridge = quay_top + wh + 1.9
    bm = bmesh.new()
    xa, xb = wx0 - over, wx1 + over
    ya, yb = wy0 - over * 1.6, wy1 + over
    ym = (wy0 + wy1) / 2
    zl = quay_top + wh - 0.25
    pts = [(ya, zl), (ym, ridge), (yb, zl)]
    left = [bm.verts.new((xa, y, z)) for y, z in pts]
    right = [bm.verts.new((xb, y, z)) for y, z in pts]
    bm.faces.new((left[0], right[0], right[1], left[1]))
    bm.faces.new((left[1], right[1], right[2], left[2]))
    bm.faces.new((left[2], right[2], right[0], left[0]))
    bm.faces.new((left[0], left[1], left[2]))
    bm.faces.new((right[0], right[2], right[1]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    finish("WorkshopRoof", bm, "roof", root)
    # Gable-end walls under the roof.
    bm = bmesh.new()
    for gx in (wx0, wx1):
        tri = [bm.verts.new((gx, y, z)) for y, z in ((wy0, quay_top + wh - 0.01), (wy1, quay_top + wh - 0.01), (ym, ridge - 0.14))]
        bm.faces.new(tri)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    for f in bm.faces:
        if (f.normal.x > 0) != (f.calc_center_median().x > (wx0 + wx1) / 2):
            f.normal_flip()
    finish("WorkshopGables", bm, "paper", root)
    for i in range(2):
        bm = bmesh.new()
        cx = wx0 + 1.1 + i * 2.2
        bm_box(bm, (0, 0, 0), (1.5, 0.08, 1.35), 0)
        bm_box(bm, (0, -0.03, 0), (0.06, 0.06, 1.35), 1)
        bm_box(bm, (0, -0.03, 0), (1.5, 0.06, 0.06), 1)
        finish(f"WorkshopWindow_{i}", bm, ["glass", "woodDark"], root, location=(cx, wy0 - 0.04, quay_top + 1.75))
    empty("WorkshopFocus", ((wx0 + wx1) / 2 - 1.0, wy0 - 0.1, quay_top + 1.9), root)

    # A second, smaller boat shed and the harbour master's hut.
    bm = bmesh.new()
    house(bm, (13.6, 5.2, quay_top), 3.2, 2.6, 2.2, rng, 0, 1, 2, 3)
    house(bm, (16.4, 4.4, quay_top), 1.8, 1.6, 1.5, rng, 0, 4, 2, 3)
    finish("Sheds", bm, ["paper", "roofAlt", "glass", "woodDark", "sandDark"], root)

    # Quay clutter: crates, barrels, bollards, a lamp post, coiled rope.
    bm = bmesh.new()
    for cx, cy, cz, s in ((2.9, 5.9, 0, 0.8), (3.6, 6.1, 0, 0.7), (3.2, 6.0, 0.8, 0.62), (12.0, 2.9, 0, 0.7)):
        bm_box(bm, (cx, cy, quay_top + cz + s / 2), (s, s, s), 0, 0.04)
    for bx, by in ((11.2, 3.0), (11.7, 2.7), (11.45, 3.4)):
        bm_cyl(bm, (bx, by, quay_top), 0.3, 0.3, 0.75, 10, 1)
        bm_cyl(bm, (bx, by, quay_top + 0.22), 0.315, 0.315, 0.06, 10, 2)
        bm_cyl(bm, (bx, by, quay_top + 0.5), 0.315, 0.315, 0.06, 10, 2)
    for bx in (6.0, 9.5, 14.8, 17.2):
        bm_cyl(bm, (bx, 2.35, quay_top), 0.13, 0.11, 0.38, 8, 2)
        bm_cyl(bm, (bx, 2.35, quay_top + 0.36), 0.17, 0.17, 0.07, 8, 2)
    bm_cyl(bm, (3.2, 2.6, quay_top), 0.07, 0.05, 3.0, 6, 2)
    bm_box(bm, (3.2, 2.6, quay_top + 3.05), (0.3, 0.3, 0.14), 2)
    finish("QuayProps", bm, ["wood", "woodDark", "ink"], root)
    bm = bmesh.new()
    bm_ico(bm, (3.2, 2.6, quay_top + 2.86), 0.15, 1, mat_index=0)
    finish("QuayLamp", bm, "glow", root, smooth=True)

    # Crane: lattice tower on the quay corner, a slewing jib, trolley, hook and the built change.
    cx, cy = 1.3, 3.3
    tower_h = 7.4
    s = 0.42
    bm = bmesh.new()
    legs = [(cx - s, cy - s), (cx + s, cy - s), (cx + s, cy + s), (cx - s, cy + s)]
    bm_box(bm, (cx, cy, quay_top + 0.15), (1.4, 1.4, 0.3), 1, 0.03)
    for lx, ly in legs:
        bm_beam(bm, (lx, ly, quay_top + 0.3), (lx, ly, quay_top + tower_h), 0.09, 0)
    seg = 7
    for k in range(seg):
        z0 = quay_top + 0.3 + (tower_h - 0.3) * k / seg
        z1 = quay_top + 0.3 + (tower_h - 0.3) * (k + 1) / seg
        for i in range(4):
            a = legs[i]
            b = legs[(i + 1) % 4]
            if k % 2:
                bm_beam(bm, (a[0], a[1], z0), (b[0], b[1], z1), 0.04, 1)
            else:
                bm_beam(bm, (b[0], b[1], z0), (a[0], a[1], z1), 0.04, 1)
            bm_beam(bm, (a[0], a[1], z1), (b[0], b[1], z1), 0.04, 1)
    finish("CraneTower", bm, ["paper", "ink"], root)

    slew = empty("CraneSlew", (cx, cy, quay_top + tower_h), root)
    bm = bmesh.new()
    # turntable + cab
    bm_cyl(bm, (0, 0, 0), 0.6, 0.6, 0.18, 12, 1)
    bm_box(bm, (0.15, -0.55, 0.55), (0.9, 0.7, 0.75), 0, 0.04)
    bm_box(bm, (0.32, -0.91, 0.62), (0.5, 0.04, 0.36), 3)
    # jib lattice along +X, counter-jib along -X
    L = 6.2
    top = 0.95
    bm_beam(bm, (-0.3, -0.25, 0.22), (L, -0.25, 0.22), 0.08, 0)
    bm_beam(bm, (-0.3, 0.25, 0.22), (L, 0.25, 0.22), 0.08, 0)
    bm_beam(bm, (-0.3, 0, top), (L - 0.3, 0, 0.5), 0.07, 0)
    n = 10
    for k in range(n):
        xa = -0.3 + (L + 0.3) * k / n
        xb = -0.3 + (L + 0.3) * (k + 1) / n
        za = top + (0.5 - top) * (xa + 0.3) / L
        for side in (-0.25, 0.25):
            bm_beam(bm, (xa, side, 0.22), (xb, 0, za + (0.5 - top) * (xb - xa) / L), 0.035, 1)
        bm_beam(bm, (xb, -0.25, 0.22), (xb, 0.25, 0.22), 0.035, 1)
    bm_beam(bm, (-0.3, 0, 0.22), (-2.6, 0, 0.22), 0.16, 0)
    bm_box(bm, (-2.3, 0, -0.1), (0.8, 0.7, 0.7), 2, 0.04)  # counterweight
    # apex and ties
    bm_beam(bm, (0, 0, 0.2), (0, 0, 1.75), 0.1, 1)
    bm_beam(bm, (0, 0, 1.75), (L - 0.2, 0, 0.5), 0.025, 1)
    bm_beam(bm, (0, 0, 1.75), (-2.5, 0, 0.3), 0.025, 1)
    finish("CraneJib", bm, ["paper", "ink", "stoneDark", "glass"], slew)
    trolley = empty("CraneTrolley", (4.0, 0, 0.1), slew)
    bm = bmesh.new()
    bm_box(bm, (0, 0, 0), (0.42, 0.56, 0.16), 0)
    bm_cyl(bm, (0, 0, -0.12), 0.07, 0.07, 0.06, 8, 0)
    finish("CraneTrolleyBody", bm, "ink", trolley)

    hook = empty("CraneHook", (5.0, 0, quay_top + 3.0), root)
    bm = bmesh.new()
    bm_box(bm, (0, 0, 0.15), (0.24, 0.14, 0.3), 0, 0.03)
    bm_beam(bm, (0, 0, 0), (0, 0, -0.18), 0.04, 1)
    bm_beam(bm, (0, 0, -0.18), (0.1, 0, -0.26), 0.04, 1)
    for corner in ((-0.4, -0.4), (0.4, -0.4), (0.4, 0.4), (-0.4, 0.4)):
        bm_beam(bm, (0, 0, -0.2), (corner[0], corner[1], -0.62), 0.015, 0)
    finish("CraneHookBlock", bm, ["ink", "beak"], hook)
    crate = empty("CraneCrate", (2.6, 3.0, quay_top), root)
    bm = bmesh.new()
    bm_box(bm, (0, 0, 0.32), (0.86, 0.86, 0.64), 0, 0.03)
    # the built change: a cobalt panel on every visible face
    bm_box(bm, (0, -0.44, 0.38), (0.6, 0.03, 0.26), 1)
    bm_box(bm, (0.44, 0, 0.38), (0.03, 0.6, 0.26), 1)
    bm_box(bm, (0, 0, 0.655), (0.6, 0.6, 0.02), 1)
    for k in (-0.31, 0.31):
        bm_box(bm, (k, 0, 0.32), (0.06, 0.9, 0.66), 2)
    finish("CraneCrateBody", bm, ["cream", "cobalt", "woodDark"], crate)

    empty("Berth", (-3.6, -0.75, 0), root)
    empty("CrateRest", (2.6, 3.0, quay_top), root)
    export(root, "dock.glb")
    preview("dock.png", (4, 2, 2.6), 30, 0.3, -0.25)


# ------------------------------------------------------------------ #
# Terrain: headland, town hill, far ridge, reef, islets               #
# ------------------------------------------------------------------ #


def build_terrain():
    reset_scene()
    rng = random.Random(21)
    root = empty("Terrain")

    head = empty("Headland", (0, 0, 0), root)
    _, h_fn = heightfield(
        "HeadlandGround",
        (26, 14),
        (26, 14),
        [(-3, 1.5, 7, 4.5, 4.2), (4, 0.5, 5, 3.2, 2.4), (-9, -1, 4, 3, 1.6), (9, -2, 3, 2.2, 0.7)],
        rng,
        parent=head,
    )
    bm = bmesh.new()
    for tx, ty, s, k in ((-6, 1.2, 2.0, "pine"), (-4.4, 2.4, 2.4, "pine"), (-2.6, 0.8, 1.8, "round"), (-1, 2.6, 2.2, "pine"), (1.6, 1.4, 1.7, "round"), (3.4, 2.4, 1.9, "pine"), (-8.5, 0.2, 1.5, "round")):
        tree(bm, (tx, ty, h_fn(tx, ty) - 0.05), s, rng, k, 0, 1, 2)
    house(bm, (5.4, -0.6, h_fn(5.4, -0.6) - 0.05), 1.8, 1.4, 1.1, rng, 3, 4, 5, 0)
    finish("HeadlandTrees", bm, ["woodDark", "sage", "sageDark", "paper", "roof", "glass"], head)

    town = empty("TownHill", (0, 0, 0), root)
    _, t_fn = heightfield(
        "TownGround",
        (34, 14),
        (30, 12),
        [(0, 3, 12, 6, 3.6), (-9, 2, 6, 4, 2.4), (10, 4, 7, 5, 4.6)],
        rng,
        edge=0.12,
        parent=town,
    )
    bm = bmesh.new()
    spots = [(-11, -1.5, 1.9, 1.5, 1.3), (-8.4, -0.6, 2.4, 1.8, 1.6), (-5.6, 0.4, 1.7, 1.4, 1.2), (-2.6, 1.2, 2.2, 1.6, 1.5), (0.8, 1.6, 1.8, 1.4, 1.2), (3.6, 2.0, 2.4, 1.7, 1.6), (6.8, 2.4, 2.0, 1.5, 1.3), (-4, -1.0, 1.6, 1.2, 1.0)]
    for hx, hy, w, d, hh in spots:
        house(bm, (hx, hy, t_fn(hx, hy) - 0.1), w, d, hh, rng, 0, 1 if rng.random() > 0.5 else 2, 3, 4)
    for tx, ty, s, k in ((-12.5, 1.5, 2.0, "pine"), (-7, 2.4, 2.3, "pine"), (-1, 3.2, 2.0, "round"), (2.4, 3.8, 2.6, "pine"), (5.4, 4.2, 2.1, "round"), (9, 4.0, 2.8, "pine"), (11.5, 3.0, 2.2, "pine"), (13, 4.8, 2.0, "round")):
        tree(bm, (tx, ty, t_fn(tx, ty) - 0.05), s, rng, k, 5, 6, 7)
    finish("TownHouses", bm, ["paper", "roof", "roofAlt", "glass", "woodDark", "woodDark", "sage", "sageDark"], town)

    heightfield(
        "FarRidge",
        (120, 16),
        (48, 6),
        [(-40, 2, 18, 6, 6.5), (-12, 3, 14, 6, 4.0), (14, 2, 16, 6, 7.5), (42, 2, 18, 6, 5.0)],
        rng,
        noise=0.08,
        edge=0.08,
        colours=("sand", "sandDark", "rockDark", "sandDark"),
        parent=root,
    )

    reef = empty("Reef", (0, 0, 0), root)
    bm = bmesh.new()
    for rx, ry, rs in ((0, 0, 1.0), (1.3, 0.4, 0.7), (-1.1, 0.3, 0.6), (0.6, -0.6, 0.45), (2.3, -0.2, 0.4)):
        bm_ico(bm, (rx, ry, -0.15), rs, 1, (1.3, 1.0, 0.75), 0.22, rng, 0, floor=-0.3)
    finish("ReefRocks", bm, "rock", reef)

    for name, size, hh, seed in (("Islet_A", (6, 4), 1.1, 3), ("Islet_B", (4, 3), 0.7, 5)):
        local = random.Random(seed)
        isl = empty(name, (0, 0, 0), root)
        _, i_fn = heightfield(f"{name}_Ground", size, (8, 6), [(0, 0, size[0] / 3, size[1] / 3, hh)], local, parent=isl)
        bm = bmesh.new()
        tree(bm, (0.3, 0.2, i_fn(0.3, 0.2) - 0.05), 1.4, local, "pine", 0, 1, 2)
        if name == "Islet_A":
            tree(bm, (-0.9, 0.4, i_fn(-0.9, 0.4) - 0.05), 1.1, local, "round", 0, 1, 2)
        finish(f"{name}_Trees", bm, ["woodDark", "sage", "sageDark"], isl)

    # Lay the pieces out in a row for the proof render only; code places them by name.
    head.location = (-30, 0, 0)
    town.location = (0, 0, 0)
    bpy.data.objects["FarRidge"].location = (0, 30, 0)
    reef.location = (22, -6, 0)
    bpy.data.objects["Islet_A"].location = (28, -2, 0)
    bpy.data.objects["Islet_B"].location = (34, -2, 0)
    preview("terrain.png", (2, 0, 2), 80, 0.25, -0.1, 45)
    for obj in (head, town, bpy.data.objects["FarRidge"], reef, bpy.data.objects["Islet_A"], bpy.data.objects["Islet_B"]):
        obj.location = (0, 0, 0)
    export(root, "terrain.glb")


# ------------------------------------------------------------------ #
# Props: gull, clouds, rocks, barrel, crate, bollard                 #
# ------------------------------------------------------------------ #


def metaball_cloud(name, blobs, parent, resolution=0.55):
    mb = bpy.data.metaballs.new(f"{name}_mb")
    mb.resolution = resolution
    mb.render_resolution = resolution
    for (x, y, z, r) in blobs:
        el = mb.elements.new()
        el.co = (x, y, z)
        el.radius = r
    obj = bpy.data.objects.new(f"{name}_src", mb)
    link(obj)
    bpy.context.view_layer.update()
    deps = bpy.context.evaluated_depsgraph_get()
    mesh = bpy.data.meshes.new_from_object(obj.evaluated_get(deps))
    bpy.data.objects.remove(obj, do_unlink=True)
    mesh.name = f"{name}_mesh"
    # Flatten the underside: painted clouds sit on a level base.
    for v in mesh.vertices:
        if v.co.z < 0:
            v.co.z *= 0.35
    mesh.materials.append(material("cream"))
    for poly in mesh.polygons:
        poly.use_smooth = True
    cloud = bpy.data.objects.new(name, mesh)
    link(cloud, parent)
    dec = cloud.modifiers.new("decimate", "DECIMATE")
    dec.ratio = 0.45
    return cloud


def build_props():
    reset_scene()
    rng = random.Random(33)
    root = empty("Props")

    gull = empty("Gull", (0, 0, 0), root)
    bm = bmesh.new()
    bm_ico(bm, (0, 0, 0), 0.22, 1, (1.9, 0.75, 0.7), 0.0, rng, 0)
    bm_ico(bm, (0.38, 0, 0.08), 0.12, 1, (1.1, 0.9, 0.95), 0.0, rng, 0)
    bm_cyl(bm, (0.48, 0, 0.07), 0.04, 0.0, 0.16, 5, 1, "X")
    bm_prism(bm, [(-0.38, 0.02), (-0.62, 0.08), (-0.62, -0.06)], -0.08, 0.08, 2)
    finish("GullBody", bm, ["cream", "beak", "ink"], gull, smooth=True)
    for side, wing_name in ((-1, "WingR"), (1, "WingL")):
        pivot = empty(wing_name, (0.02, side * 0.12, 0.05), gull)
        bm = bmesh.new()
        pts = [(0.14, 0), (0.1, 0.38), (0.02, 0.78), (-0.18, 0.95), (-0.12, 0.6), (-0.16, 0.0)]
        vs = [bm.verts.new((x, side * y, 0.06 * (y ** 1.5))) for x, y in pts]
        bm.faces.new(vs if side > 0 else vs[::-1])
        tip = [bm.verts.new((x, side * y, 0.06 * (y ** 1.5) + 0.005)) for x, y in ((0.02, 0.78), (-0.18, 0.95), (-0.12, 0.6), (-0.04, 0.66))]
        f = bm.faces.new(tip if side > 0 else tip[::-1])
        f.material_index = 1
        wing = finish(f"{wing_name}Mesh", bm, ["cream", "ink"], pivot)
        solidify(wing, 0.03)

    for i, blobs in enumerate(
        (
            [(0, 0, 0, 1.6), (1.4, 0.1, 0.25, 1.3), (-1.4, 0, 0.1, 1.2), (0.6, 0.2, 0.9, 1.1), (-0.6, -0.1, 0.7, 1.0), (2.5, 0, -0.1, 0.9)],
            [(0, 0, 0, 1.3), (1.1, 0, 0.3, 1.0), (-1.0, 0.1, 0.0, 0.9), (0.3, 0, 0.8, 0.85)],
            [(0, 0, 0, 1.1), (1.2, 0, 0.1, 0.9), (2.2, 0.1, -0.05, 0.7), (-1.0, 0, -0.05, 0.8), (0.5, 0, 0.6, 0.75)],
        )
    ):
        metaball_cloud(f"Cloud_{'ABC'[i]}", blobs, root)

    for name, scale, seed in (("Rock_A", (1.5, 1.1, 0.9), 2), ("Rock_B", (1.1, 0.9, 1.25), 6), ("Rock_C", (2.2, 1.4, 0.7), 8)):
        local = random.Random(seed)
        bm = bmesh.new()
        bm_ico(bm, (0, 0, 0), 1.0, 1, scale, 0.24, local, 0, floor=-0.25)
        bm_ico(bm, (scale[0] * 0.6, 0.2, -0.2), 0.55, 1, (1.2, 1, 0.8), 0.25, local, 0, floor=-0.25)
        bm.normal_update()
        for f in bm.faces:
            if f.normal.z > 0.82:
                f.material_index = 1
        finish(name, bm, ["rock", "sageDark"], root)

    bm = bmesh.new()
    bm_cyl(bm, (0, 0, 0), 0.32, 0.32, 0.8, 10, 0)
    bm_cyl(bm, (0, 0, 0.22), 0.335, 0.335, 0.06, 10, 1)
    bm_cyl(bm, (0, 0, 0.54), 0.335, 0.335, 0.06, 10, 1)
    finish("Barrel", bm, ["wood", "ink"], root)
    bm = bmesh.new()
    bm_box(bm, (0, 0, 0.35), (0.7, 0.7, 0.7), 0, 0.04)
    bm_box(bm, (0, -0.355, 0.35), (0.08, 0.02, 0.7), 1)
    finish("Crate", bm, ["wood", "woodDark"], root)
    bm = bmesh.new()
    bm_cyl(bm, (0, 0, 0), 0.16, 0.13, 0.5, 8, 0)
    bm_cyl(bm, (0, 0, 0.48), 0.22, 0.22, 0.08, 8, 0)
    finish("Bollard", bm, "ink", root)

    # Proof layout
    xs = {"Gull": 0, "Cloud_A": 4, "Cloud_B": 10, "Cloud_C": 15, "Rock_A": -5, "Rock_B": -8, "Rock_C": -12, "Barrel": -15, "Crate": -16.5, "Bollard": -18}
    for k, x in xs.items():
        bpy.data.objects[k].location = (x, 0, 0)
    bpy.data.objects["Gull"].scale = (4, 4, 4)
    preview("props.png", (-2, 0, 0.5), 44, 0.2, 0, 50)
    for k in xs:
        bpy.data.objects[k].location = (0, 0, 0)
    bpy.data.objects["Gull"].scale = (1, 1, 1)
    export(root, "props.glb")


PALETTE["white"] = "#fbf8f1"

build_sailboat()
build_buoy()
build_lighthouse()
build_dock()
build_terrain()
build_props()
print("HARBOR_ASSETS_DONE")
