"""Build SailTru's branded hero sailboat and export a web-ready GLB.

Run with:
  blender --background --python scripts/build-sailtru-boat-blender.py
"""

from __future__ import annotations

import math
from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
MODEL_DIR = ROOT / "public" / "models" / "journey"
ARTIFACT_DIR = ROOT / "artifacts" / "renders"
MODEL_DIR.mkdir(parents=True, exist_ok=True)
ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)


def reset_scene() -> None:
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for datablocks in (bpy.data.meshes, bpy.data.curves, bpy.data.materials, bpy.data.cameras, bpy.data.lights):
        for block in list(datablocks):
            if block.users == 0:
                datablocks.remove(block)


def material(name: str, color, roughness=.45, metallic=0.0, coat=.0, emission=None):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color[:3], color[3] if len(color) > 3 else 1.0)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = mat.diffuse_color
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    if "Coat Weight" in bsdf.inputs:
        bsdf.inputs["Coat Weight"].default_value = coat
        bsdf.inputs["Coat Roughness"].default_value = .16
    if emission:
        if "Emission Color" in bsdf.inputs:
            bsdf.inputs["Emission Color"].default_value = (*emission, 1)
            bsdf.inputs["Emission Strength"].default_value = 3.5
        else:
            bsdf.inputs["Emission"].default_value = (*emission, 1)
    return mat


def set_smooth(obj) -> None:
    if obj.type == "MESH":
        for polygon in obj.data.polygons:
            polygon.use_smooth = True


def bevel(obj, width=.04, segments=3) -> None:
    mod = obj.modifiers.new("Crafted edge softness", "BEVEL")
    mod.width = width
    mod.segments = segments


def add_uv_sphere(name, location, scale, mat, segments=24, rings=12):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segments, ring_count=rings, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    obj.data.materials.append(mat)
    set_smooth(obj)
    return obj


def add_cylinder(name, radius, depth, location, mat, rotation=(math.pi / 2, 0, 0), vertices=20):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=location, rotation=rotation)
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(mat)
    set_smooth(obj)
    bevel(obj, min(radius * .28, .025), 2)
    return obj


def add_box(name, location, scale, mat, radius=.06):
    bpy.ops.mesh.primitive_cube_add(location=location)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(mat)
    bevel(obj, radius, 4)
    return obj


def add_curve(name, points, radius, mat, cyclic=False, resolution=2):
    curve = bpy.data.curves.new(name, "CURVE")
    curve.dimensions = "3D"
    curve.resolution_u = resolution
    curve.bevel_depth = radius
    curve.bevel_resolution = 2
    spline = curve.splines.new("BEZIER")
    spline.bezier_points.add(len(points) - 1)
    for point, coordinate in zip(spline.bezier_points, points):
        point.co = coordinate
        point.handle_left_type = "AUTO"
        point.handle_right_type = "AUTO"
    spline.use_cyclic_u = cyclic
    obj = bpy.data.objects.new(name, curve)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mat)
    return obj


def lofted_hull(name, profile, mat, rings=24):
    vertices = []
    faces = []
    for z, width, top, bottom in profile:
        center = (top + bottom) * .5
        radius_y = (top - bottom) * .5
        for segment in range(rings):
            angle = 2 * math.pi * segment / rings
            side = math.cos(angle)
            vertical = math.sin(angle)
            # A fuller shoulder and narrower keel make the hull read as a yacht,
            # while retaining SailTru's simple logo silhouette.
            x = side * width * (.88 + .12 * abs(vertical))
            y = center + vertical * radius_y
            if vertical < 0:
                x *= .72 + .28 * (vertical + 1)
            vertices.append((x, y, z))
    sections = len(profile)
    for section in range(sections - 1):
        for segment in range(rings):
            nxt = (segment + 1) % rings
            a = section * rings + segment
            b = section * rings + nxt
            c = (section + 1) * rings + segment
            d = (section + 1) * rings + nxt
            faces.append((a, c, d, b))
    faces.append(tuple(reversed(range(rings))))
    last = (sections - 1) * rings
    faces.append(tuple(last + i for i in range(rings)))
    mesh = bpy.data.meshes.new(f"{name}_Mesh")
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mat)
    set_smooth(obj)
    bevel(obj, .028, 3)
    return obj


def side_ribbon(name, side, points, height, mat):
    vertices = []
    for x, y, z in points:
        vertices.extend(((side * x, y - height * .5, z), (side * x, y + height * .5, z)))
    faces = []
    for index in range(len(points) - 1):
        start = index * 2
        faces.append((start, start + 2, start + 3, start + 1))
    mesh = bpy.data.meshes.new(f"{name}_Mesh")
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mat)
    return obj


def sail_surface(name, leading, trailing, mat, billow_sign=1, rows=18, columns=12):
    vertices = []
    faces = []
    for row in range(rows + 1):
        v = row / rows
        lead = Vector(leading(v))
        trail = Vector(trailing(v))
        for column in range(columns + 1):
            u = column / columns
            point = lead.lerp(trail, u)
            point.x += billow_sign * math.sin(math.pi * u) * math.sin(math.pi * v) * (.11 + .08 * (1 - v))
            vertices.append(tuple(point))
    for row in range(rows):
        for column in range(columns):
            a = row * (columns + 1) + column
            b = a + 1
            c = a + columns + 1
            d = c + 1
            faces.append((a, c, d, b))
    mesh = bpy.data.meshes.new(f"{name}_Mesh")
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mat)
    set_smooth(obj)
    solidify = obj.modifiers.new("Tailored sailcloth", "SOLIDIFY")
    solidify.thickness = .035
    bevel(obj, .014, 2)
    return obj


def add_text(name, body, location, rotation, size, extrude, mat, align="CENTER"):
    curve = bpy.data.curves.new(name, "FONT")
    curve.body = body
    curve.align_x = align
    curve.align_y = "CENTER"
    curve.size = size
    curve.extrude = extrude
    curve.bevel_depth = .004
    obj = bpy.data.objects.new(name, curve)
    bpy.context.collection.objects.link(obj)
    obj.location = location
    obj.rotation_euler = rotation
    obj.data.materials.append(mat)
    return obj


reset_scene()

# Brand-led material system.
cobalt = material("SailTru_Cobalt_Clearcoat", (0.015, .30, .78, 1), .19, .08, .82)
azure = material("SailTru_Azure_Clearcoat", (.02, .49, .92, 1), .2, .06, .78)
navy = material("SailTru_Navy_Clearcoat", (.006, .025, .075, 1), .2, .12, .72)
black_sail = material("SailTru_Black_Sailcloth", (.004, .006, .011, 1), .7, .0, .04)
sail_seam = material("SailTru_Sail_Seams", (.055, .068, .085, 1), .62)
ivory = material("Warm_Ivory_Gelcoat", (.91, .89, .82, 1), .26, .02, .62)
teak = material("Oiled_Teak", (.38, .16, .055, 1), .48, .0, .18)
teak_light = material("Teak_Inlay", (.70, .42, .17, 1), .5, .0, .12)
metal = material("Brushed_Stainless", (.54, .62, .69, 1), .18, .82, .18)
rope = material("Rigging_Rope", (.72, .7, .63, 1), .72)
glass = material("Smoked_Cabin_Glass", (.012, .07, .12, 1), .13, .24, .7)
white = material("SailTru_Lettering", (.92, .96, 1.0, 1), .32, .02, .18)
red_light = material("Navigation_Red", (.5, .008, .012, 1), .2, .15, .3, (.9, .01, .02))
green_light = material("Navigation_Green", (.005, .35, .11, 1), .2, .15, .3, (.01, .9, .24))

# The hull uses a dense, clean loft rather than stacked browser primitives.
profile = [
    (-2.72, .54, .30, -.18),
    (-2.38, .84, .42, -.55),
    (-1.45, 1.03, .53, -.82),
    (-.20, 1.10, .57, -.94),
    (1.00, .96, .56, -.77),
    (1.92, .64, .50, -.47),
    (2.62, .08, .34, .12),
]
hull = lofted_hull("SailTru_Sculpted_Hull", profile, cobalt, 32)

# Navy sheer band and the light-blue rising facet reproduce the logo's identity.
stripe_points = [(.62, .34, -2.48), (.96, .43, -1.45), (1.02, .47, -.15), (.86, .46, 1.08), (.50, .39, 2.04), (.09, .30, 2.55)]
facet_points = [(.69, -.03, -2.30), (.97, .08, -1.25), (1.03, .16, -.05), (.87, .20, 1.10), (.48, .22, 2.12), (.10, .25, 2.52)]
for side in (-1, 1):
    side_ribbon(f"Navy_Sheer_Band_{side:+d}", side, stripe_points, .18, navy)
    side_ribbon(f"Azure_Rising_Facet_{side:+d}", side, facet_points, .24, azure)

# Deck and inset teak planking.
deck_profile = [
    (-2.40, .60), (-1.65, .84), (-.35, .91), (.9, .76), (1.82, .48), (2.42, .06)
]
deck_vertices = [(0, .585, deck_profile[0][0])]
for z, width in deck_profile:
    deck_vertices.append((-width, .585, z))
for z, width in reversed(deck_profile):
    deck_vertices.append((width, .585, z))
deck_faces = [tuple(range(len(deck_vertices)))]
deck_mesh = bpy.data.meshes.new("Teak_Deck_Mesh")
deck_mesh.from_pydata(deck_vertices, [], deck_faces)
deck_mesh.update()
deck = bpy.data.objects.new("Teak_Deck", deck_mesh)
bpy.context.collection.objects.link(deck)
deck.data.materials.append(teak)

for x in (-.52, -.26, 0, .26, .52):
    add_curve(f"Deck_Inlay_{x:+.2f}", [(x, .602, -1.95), (x * 1.12, .602, -.2), (x * .65, .602, 1.55)], .009, teak_light)

# Cockpit and cabin architecture.
add_box("Cockpit_Well", (0, .66, -1.05), (.56, .10, .73), navy, .16)
add_box("Cockpit_Seat_Port", (-.67, .73, -1.06), (.16, .095, .78), ivory, .07)
add_box("Cockpit_Seat_Starboard", (.67, .73, -1.06), (.16, .095, .78), ivory, .07)
add_box("Cabin_House", (0, .83, .20), (.47, .22, .68), ivory, .16)
add_box("Cabin_Roof", (0, 1.06, .18), (.55, .07, .75), ivory, .08)
for side in (-1, 1):
    add_box(f"Cabin_Window_{side:+d}", (side * .485, .88, .20), (.017, .105, .47), glass, .035)
    for z in (-1.86, -1.25, -.25, .76, 1.56):
        add_cylinder(f"Stanchion_{side:+d}_{z:+.2f}", .012, .38, (side * (.72 + .08 * (1 - abs(z) / 2.6)), .81, z), metal, vertices=10)
    add_curve(f"Upper_Lifeline_{side:+d}", [(side * .70, 1.0, -1.9), (side * .82, 1.0, -.4), (side * .65, .96, 1.58)], .008, metal)
    add_curve(f"Lower_Lifeline_{side:+d}", [(side * .70, .88, -1.9), (side * .82, .88, -.4), (side * .65, .84, 1.58)], .006, metal)
    add_cylinder(f"Primary_Winch_{side:+d}", .09, .16, (side * .48, .82, -.68), metal, vertices=24)
    add_box(f"Bow_Cleat_{side:+d}", (side * .31, .66, 1.82), (.10, .025, .035), metal, .018)

# Mast, boom, wheel and underwater appendages.
add_cylinder("Mast", .052, 5.75, (0, 3.69, .24), ivory, vertices=28)
add_cylinder("Mast_Track", .017, 5.79, (.006, 3.69, .19), metal, vertices=12)
boom = add_cylinder("Boom", .042, 2.22, (0, 1.53, -.83), navy, (0, 0, 0), 18)
add_box("Keel", (0, -.92, -.05), (.15, .76, .70), navy, .11)
rudder = add_box("Rudder", (0, -.54, -2.03), (.07, .42, .30), cobalt, .07)
rudder.rotation_euler.x = -.16
bpy.ops.mesh.primitive_torus_add(major_radius=.22, minor_radius=.022, major_segments=28, minor_segments=8, location=(0, 1.13, -1.57), rotation=(math.pi / 2, 0, 0))
wheel = bpy.context.object
wheel.name = "Helm_Wheel"
wheel.data.materials.append(teak_light)
for angle in range(0, 360, 45):
    a = math.radians(angle)
    add_curve(f"Wheel_Spoke_{angle}", [(0, 1.13, -1.57), (.19 * math.cos(a), 1.13 + .19 * math.sin(a), -1.57)], .010, teak_light)

# Tailored, asymmetric sails with visible seam construction.
main_leading = lambda v: (.035, 1.48 + 4.98 * v, .18)
main_trailing = lambda v: (.035, 1.48 + 4.98 * v, -1.98 * (1 - v) ** .82 + .08)
jib_leading = lambda v: (-.035, 1.40 + 4.52 * v, 2.34 * (1 - v) + .23 * v)
jib_trailing = lambda v: (-.035, 1.40 + 4.52 * v, .28)
sail_surface("Black_Main_Sail", main_leading, main_trailing, black_sail, 1)
sail_surface("Black_Jib_Sail", jib_leading, jib_trailing, black_sail, -1)
for index, v in enumerate((.2, .4, .6, .8)):
    ml, mt = Vector(main_leading(v)), Vector(main_trailing(v))
    jl, jt = Vector(jib_leading(v)), Vector(jib_trailing(v))
    add_curve(f"Main_Sail_Seam_{index}", [ml, ml.lerp(mt, .5) + Vector((.10, 0, 0)), mt], .008, sail_seam)
    add_curve(f"Jib_Sail_Seam_{index}", [jl, jl.lerp(jt, .5) + Vector((-.08, 0, 0)), jt], .007, sail_seam)

# Standing and running rigging.
add_curve("Forestay", [(0, 6.55, .24), (0, .69, 2.48)], .009, metal)
add_curve("Backstay", [(0, 6.55, .24), (0, .72, -2.27)], .009, metal)
for side in (-1, 1):
    add_curve(f"Shroud_{side:+d}", [(0, 5.82, .24), (side * .73, .68, -.12)], .008, metal)
add_curve("Main_Sheet", [(0, 1.48, -1.45), (0, .75, -.98)], .012, rope)

# Navigation fittings and unmistakable side branding.
for side, light_mat in ((-1, red_light), (1, green_light)):
    add_uv_sphere(f"Navigation_Light_{side:+d}", (side * .78, .85, 1.13), (.045, .045, .045), light_mat, 16, 8)
    label = add_text(
        f"SailTru_Wordmark_{side:+d}", "SailTru", (side * 1.035, .06, -.38),
        (math.pi / 2, 0, side * math.pi / 2), .20, .006, white
    )
    label.scale = (.82, .82, .82)

# A clean object hierarchy makes later animation and LOD authoring straightforward.
bpy.ops.object.empty_add(type="PLAIN_AXES", location=(0, 0, 0))
root = bpy.context.object
root.name = "SailTru_Hero_Sailboat"
for obj in list(bpy.context.scene.objects):
    if obj != root and obj.type in {"MESH", "CURVE", "FONT"} and obj.parent is None:
        obj.parent = root
root.rotation_euler.x = math.pi / 2

# Apply modifiers and convert procedural curve/font details before export.
for obj in list(bpy.context.scene.objects):
    if obj.type in {"CURVE", "FONT"}:
        bpy.context.view_layer.objects.active = obj
        obj.select_set(True)
        bpy.ops.object.convert(target="MESH")
        obj.select_set(False)
for obj in list(bpy.context.scene.objects):
    if obj.type == "MESH":
        bpy.context.view_layer.objects.active = obj
        obj.select_set(True)
        for modifier in list(obj.modifiers):
            try:
                bpy.ops.object.modifier_apply(modifier=modifier.name)
            except RuntimeError:
                pass
        obj.select_set(False)

# Keep a fully editable source file and export only the model hierarchy.
bpy.ops.wm.save_as_mainfile(filepath=str(MODEL_DIR / "sailtru-hero-boat.blend"))
bpy.ops.object.select_all(action="DESELECT")
root.select_set(True)
for child in root.children_recursive:
    child.select_set(True)
bpy.context.view_layer.objects.active = root
bpy.ops.export_scene.gltf(
    filepath=str(MODEL_DIR / "sailtru-logo-boat.glb"),
    export_format="GLB",
    use_selection=True,
    export_apply=True,
    export_yup=True,
    export_materials="EXPORT",
    export_cameras=False,
    export_lights=False,
)

# Studio proof: Cycles-quality composition is unnecessary here; Eevee gives a
# faithful material and silhouette check in seconds.
bpy.ops.object.select_all(action="DESELECT")
bpy.ops.mesh.primitive_plane_add(size=40, location=(0, 0, -.98))
floor = bpy.context.object
floor.name = "Preview_Floor"
floor.data.materials.append(material("Preview_Floor_Material", (.018, .032, .05, 1), .28, .12, .36))

bpy.ops.object.camera_add(location=(15.0, -19.0, 9.2))
camera = bpy.context.object
camera.name = "Preview_Camera"
bpy.context.scene.camera = camera

def track_to(obj, target):
    direction = Vector(target) - obj.location
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()

track_to(camera, (0, 0, 2.65))
camera.data.lens = 58

bpy.ops.object.light_add(type="AREA", location=(-4.5, -5.5, 10.5))
key = bpy.context.object
key.name = "Warm_Key"
key.data.energy = 1250
key.data.shape = "DISK"
key.data.size = 5.5
key.data.color = (1.0, .72, .47)
track_to(key, (0, 0, 2.2))

bpy.ops.object.light_add(type="AREA", location=(6.5, -2.5, 5.5))
fill = bpy.context.object
fill.name = "Cool_Fill"
fill.data.energy = 900
fill.data.size = 4.0
fill.data.color = (.27, .58, 1.0)
track_to(fill, (0, 0, 2.3))

bpy.ops.object.light_add(type="AREA", location=(0, 6.2, 8.0))
rim = bpy.context.object
rim.name = "Sail_Rim"
rim.data.energy = 1100
rim.data.size = 3.0
rim.data.color = (.42, .63, 1.0)
track_to(rim, (0, 0, 3.2))

world = bpy.context.scene.world or bpy.data.worlds.new("World")
bpy.context.scene.world = world
world.use_nodes = True
world.node_tree.nodes["Background"].inputs["Color"].default_value = (.006, .014, .03, 1)
world.node_tree.nodes["Background"].inputs["Strength"].default_value = .22

scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE"
scene.render.resolution_x = 1400
scene.render.resolution_y = 900
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.filepath = str(ARTIFACT_DIR / "sailtru-blender-hero-boat.png")
scene.render.film_transparent = False
scene.view_settings.look = "AgX - Medium High Contrast"
bpy.ops.render.render(write_still=True)

print(f"BLEND={MODEL_DIR / 'sailtru-hero-boat.blend'}")
print(f"GLB={MODEL_DIR / 'sailtru-logo-boat.glb'}")
print(f"PREVIEW={ARTIFACT_DIR / 'sailtru-blender-hero-boat.png'}")
