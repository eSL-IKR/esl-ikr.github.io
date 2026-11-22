#!/usr/bin/env python3
"""Generate an original, offline, self-contained FOIFKIN F600-inspired chassis.
Reference: FOIFKIN F600 black / seven PWM ARGB fan variant (BuildCores OpenDB).
The model is an educational procedural approximation, not an OEM CAD model.
Geometry units: metres; X=case length, Y=case height, Z=case width.
Requires: trimesh, numpy. Run: python tools/build_foifkin_f600.py
"""
from pathlib import Path
import math
import numpy as np
import trimesh
from trimesh.visual.material import PBRMaterial

OUT = Path(__file__).resolve().parent.parent / 'public/pclab/models/FOIFKIN_F600.glb'
OUT.parent.mkdir(parents=True, exist_ok=True)
scene = trimesh.Scene()
parts_by_material = {}  # merge same-material submeshes into a low-draw-call GLB

# Dimensions according to the project's BuildCores entry, in metres.
L, D, H = .419, .284, .439
X, Z, Y = L/2, D/2, H/2
MAT = {
 'carbon':   ((24, 29, 38, 255), .68, .38),
 'chassis':  ((44, 50, 61, 255), .73, .31),
 'bezel':    ((11, 16, 24, 255), .60, .24),
 'frame':    ((70, 80, 95, 255), .77, .23),
 'metal':    ((106, 117, 132,255), .83, .25),
 'bolts':    ((177,184,195,255), .81, .18),
 'grille':   ((22, 34, 45,255), .58, .58),
 'glass':    ((117, 192, 222,  38), .06, .08),
 'glassedge':((134, 202, 229,110), .18, .16),
 'fanblack': ((18, 26, 38, 255), .30, .46),
 'blade':    ((102, 133, 153,255), .38, .40),
 'cyan':     ((34, 220, 252,255), .15, .47),
 'azure':    ((47, 116, 255,255), .12, .42),
 'purple':   ((154, 83, 255,255), .18, .40),
 'green':    ((66, 245, 204,255), .12, .40),
 'rubber':   ((11, 14, 18,255), .1, .85),
}

def add(name, mesh, material='chassis'):
    parts_by_material.setdefault(material, []).append(mesh)

def emit_merged_material(name, mesh, material):
    rgba, metallic, rough = MAT[material]
    kw = dict(name=material, baseColorFactor=list(rgba), metallicFactor=metallic, roughnessFactor=rough, doubleSided=True)
    if material in {'glass','glassedge'}:
        kw.update(alphaMode='BLEND')
    if material in {'cyan','azure','purple','green'}:
        kw.update(emissiveFactor=[c/255 * .43 for c in rgba[:3]])
    mesh.visual = trimesh.visual.TextureVisuals(material=PBRMaterial(**kw))
    scene.add_geometry(mesh, node_name=name, geom_name=name)

def box(name, size, pos, mat='chassis'):
    m=trimesh.creation.box(extents=size)
    m.apply_translation(pos)
    add(name,m,mat)

def cylinder(name, radius, depth, pos, direction='z', mat='metal', sections=24):
    m=trimesh.creation.cylinder(radius=radius, height=depth, sections=sections)
    if direction=='y':
        m.apply_transform(trimesh.transformations.rotation_matrix(math.pi/2,[1,0,0]))
    if direction=='x':
        m.apply_transform(trimesh.transformations.rotation_matrix(math.pi/2,[0,1,0]))
    m.apply_translation(pos)
    add(name,m,mat)

def ring(name,r_out,r_in,depth,pos,direction='z',mat='frame',sections=36):
    # An annulus with a true hole (not opaque concentric disks).
    angles=np.linspace(0,2*math.pi,sections,endpoint=False)
    verts=[]
    for zoff in (-depth/2,depth/2):
        for r in (r_in,r_out):
            for a in angles:verts.append([math.cos(a)*r,math.sin(a)*r,zoff])
    faces=[]
    for k in range(sections):
        n=(k+1)%sections
        # near, far, inner and outer side walls
        for a,b,c,d in [(k,n,sections+n,sections+k),
                        (2*sections+k,3*sections+k,3*sections+n,2*sections+n),
                        (k,2*sections+k,2*sections+n,n),
                        (sections+k,sections+n,3*sections+n,3*sections+k)]:
            faces.extend([[a,b,c],[a,c,d]])
    mesh=trimesh.Trimesh(vertices=verts,faces=faces,process=False)
    if direction=='y':mesh.apply_transform(trimesh.transformations.rotation_matrix(math.pi/2,[1,0,0]))
    if direction=='x':mesh.apply_transform(trimesh.transformations.rotation_matrix(math.pi/2,[0,1,0]))
    mesh.apply_translation(pos);add(name,mesh,mat)

def glass_panel(name,points, material='glass'):
    # Double-sided polygon / quads assembled into triangle strip, 0.5 mm approx.
    pts=np.array(points,float)
    faces=[]
    for i in range(len(pts)//2-1):
        j=i*2;faces.extend([[j,j+1,j+2],[j+1,j+3,j+2]])
    add(name,trimesh.Trimesh(vertices=pts,faces=faces,process=False),material)

def bolt(name,pos,direction='z'):
    cylinder(name,.0022,.0018,pos,direction,'bolts',12)
    # tiny black central indented screw
    off={'z':(0,0,.0015),'x':(.0015,0,0),'y':(0,.0015,0)}[direction]
    cylinder(name+'_centre',.0008,.001,pos if direction=='y' else tuple(pos[i]+off[i] for i in range(3)),direction,'bezel',10)

# Load-bearing metal skeleton: thin precise rails on all four sides.
for side_y,flag in [(Y-.009,'TOP'),(-Y+.009,'BASE')]:
    box(f'FRAME_{flag}_BACK_RAIL',(L-.009,.018,.013),(0,side_y,-Z+.006),'frame')
    box(f'FRAME_{flag}_GLASS_RAIL',(L-.012,.019,.013),(0,side_y,Z-.010),'frame')
    box(f'FRAME_{flag}_REAR_BRACE',(.015,.020,D-.018),(-X+.009,side_y,0),'chassis')
    box(f'FRAME_{flag}_FRONT_BRACE',(.014,.020,D-.018),(X-.012,side_y,0),'chassis')
for xx,zz,label in [(-X+.008,-Z+.008,'BACK_LEFT'),(-X+.008,Z-.008,'BACK_GLASS'),
                    (X-.008,-Z+.008,'FRONT_BACK')]:
    box(f'UPRIGHT_{label}',(.016,H-.025,.017),(xx,0,zz),'frame')

# Full service panel at the back of the secondary chamber, and offset ATX tray.
box('SERVICE_PANEL_BACK',(L-.025,H-.036,.003),(0,0,-Z+.002),'carbon')
box('MOTHERBOARD_TRAY',(L*.71,H*.76,.003),(-.042,.005,-Z+.012),'chassis')
# Stand-offs on motherboard tray; genuine screw positions, visible when opened.
for x in (-.163,-.041,.078):
    for y in (-.144,-.030,.124):
        cylinder('TRAY_STANDOFF',.0033,.004,(x,y,-Z+.017),'z','bolts',12)
# Cable slots along right edge of tray (marked with contrasting channel borders)
for y in (-.14,-.03,.105):
    box('CABLE_ACCESS_SLOT',(.019,.029,.001),(.104,y,-Z+.016),'rubber')
    box('CABLE_ACCESS_LIP',(.001,.029,.002),(.116,y,-Z+.016),'metal')
# PSU shroud is behind tray in dual chamber, slight visible edge
box('PSU_REAR_BAY',(.115,.070,.045),(.122,-.155,-Z+.04),'bezel')

# Rear support panel and seven PCIe horizontal slots, and motherboard I/O slot.
box('REAR_TOP_PANEL',(.004,.070,D-.022),(-X+.005,Y-.058,0),'chassis')
box('REAR_BOTTOM_PANEL',(.004,.050,D-.022),(-X+.005,-Y+.045,0),'chassis')
box('REAR_IO_RAIL',(.004,.128,.022),(-X+.005,.054,-.100),'metal')
for n in range(7):
    yy=-.06-n*.016
    box(f'PCIE_SLOT_{n+1}',(.003,.010,.058),(-X+.006,yy,.013),'metal')
    box(f'PCIE_SLOT_SLIT_{n+1}',(.0031,.0018,.045),(-X+.0038,yy,.015),'bezel')
    bolt(f'PCIE_SCREW_{n+1}',(-X+.006,yy,.047),'x')

# Top removable vent / mesh frame (has dark channel but slat openings remain).
box('TOP_PERFORATED_LEFT_RAIL',(.009,.003,D-.04),(-X+.028,Y-.007,0),'metal')
box('TOP_PERFORATED_RIGHT_RAIL',(.009,.003,D-.04),(X-.075,Y-.007,0),'metal')
for n in range(31):
    xx=-X+.038+n*.0103
    box(f'TOP_GRILLE_SLAT_{n+1}',(.0034,.002,D*.72),(xx,Y-.005,-.006),'grille')
for n in range(12):
    zz=-Z+.04+n*.016
    box(f'TOP_MESH_LINTEL_{n}',(.32,.0015,.0019),(-.017,Y-.004,zz),'metal')
# Upper I/O: Power, reset, Type C, USB ports, Audio jack.
box('TOP_IO_BLOCK',(.073,.004,.036),(.140,Y-.004,-.087),'bezel')
cylinder('POWER_BUTTON_RING',.009,.0017,(.119,Y+.0005,-.086),'y','cyan',22)
cylinder('POWER_BUTTON',.006,.002,(.119,Y+.0015,-.086),'y','metal',22)
cylinder('RESET_BUTTON',.004,.002,(.140,Y+.0015,-.086),'y','bolts',16)
for idx,(xx,ww) in enumerate([(.156,.011),(.178,.014)]):
    box(f'USB_PORT_{idx+1}',(ww,.001,.007),(xx,Y+.0008,-.086),'rubber')
    box(f'USB_CONNECTOR_{idx+1}',(ww*.7,.001,.003),(xx,Y+.0014,-.086),'azure')

# The F600's panoramic display: side panel + front panel + continuous rounded glass corner.
# The user-requested curved corner is approximated with 8 transparent angled facets.
side_start_x=-X+.020; side_end_x=X-.030; glass_front_z=Z-.008
sidemesh=[(side_start_x,-Y+.020,glass_front_z),(side_start_x,Y-.021,glass_front_z),
          (side_end_x,-Y+.020,glass_front_z),(side_end_x,Y-.021,glass_front_z)]
glass_panel('PANORAMIC_GLASS_SIDE',sidemesh)
front_x=X-.008
zstart=-Z+.022;zend=Z-.031
glass_panel('PANORAMIC_GLASS_FRONT',[(front_x,-Y+.020,zstart),(front_x,Y-.021,zstart),
                                       (front_x,-Y+.020,zend),(front_x,Y-.021,zend)])
# Rounded transition, center of corner radius r at (X-r-8mm, Z-r-8mm).
r=.023; cx=front_x-r; cz=glass_front_z-r
bend=[]
for i in range(10):
    theta=(i/9)*math.pi/2
    px=cx+r*math.cos(theta)
    pz=cz+r*math.sin(theta)
    bend.extend([(px,-Y+.020,pz),(px,Y-.021,pz)])
glass_panel('PANORAMIC_GLASS_CURVED_CORNER',bend)
# Highlight edge of tempered glass with small chrome line and hinge tabs.
for edge_y in (-Y+.020,Y-.021):
    box('GLASS_EDGE_SIDE',(L-.06,.0015,.0028),(-.019,edge_y,glass_front_z),'glassedge')
    box('GLASS_EDGE_FRONT',(.0028,.0015,D-.06),(front_x,edge_y,-.011),'glassedge')
for y in (-.13,.12):
    box('HINGED_GLASS_RELEASE',(.009,.026,.009),(-X+.011,y,glass_front_z-.005),'frame')
    bolt('HINGE_PIN',(-X+.011,y,glass_front_z+.001),'z')
for x in (-X+.013, X-.011):
    for y in (-Y+.017,Y-.018):
        bolt('CASE_FRAME_SCREW',(x,y,Z-.010),'z')
# visible side rim surface has no heavy metal pillar at transparent bend

# F600-style feet raise chassis off desk.
for xx in (-X+.045,X-.045):
    for zz in (-Z+.043,Z-.048):
        box('ANGLED_CASE_FOOT',(.055,.016,.050),(xx,-Y-.009,zz),'frame')
        box('ANTI_SLIP_RUBBER',(.046,.003,.043),(xx,-Y-.017,zz),'rubber')

# Seven PWM ARGB case fans (three lower, three side and one exhaust rear).
def fan(idx,center,axis='z',rgb='cyan'):
    x,y,z=center
    # all fan mechanical parts are named individually, and model remains single GLB.
    # axis z = fan faces tempered side; axis y = fan faces top.
    def at(local):
        if axis=='z':return (x+local[0],y+local[1],z+local[2])
        if axis=='y':return (x+local[0],y+local[2],z+local[1])
        if axis=='x':return (x+local[2],y+local[1],z+local[0])
    direction=axis
    rad=.054
    # strong square fan frame built from 4 rails; transparent centre.
    for s in (-1,1):
        box(f'FAN_{idx:02}_FRAME_VERTICAL',(.007,.106,.013) if axis=='z' else (.007,.013,.106),
            at((s*.050,0,0)),'fanblack')
        box(f'FAN_{idx:02}_FRAME_HORIZONTAL',(.106,.007,.013) if axis=='z' else (.106,.013,.007),
            at((0,s*.050,0)),'fanblack')
    ring(f'FAN_{idx:02}_ARGB_OUTER',.050,.045,.0025,at((0,0,.006)),direction,rgb,36)
    ring(f'FAN_{idx:02}_ARGB_INNER',.039,.035,.0022,at((0,0,.008)),direction,'purple' if idx%2 else 'azure',36)
    ring(f'FAN_{idx:02}_ROTOR_RIM',.044,.040,.0013,at((0,0,.003)),direction,'metal',30)
    for k in range(7):
        a=2*math.pi*k/7
        # Four surface points yield swept asymmetric blade, with extra triangle thickness.
        rot=[]
        for rr,ang,dep in [(.010,a-.20,.002),(.044,a+.12,.0015),(.044,a+.62,.0015),(.020,a+.92,.002)]:
            rot.append((rr*math.cos(ang),rr*math.sin(ang),dep))
        # Slight twist across the fan rotor.
        vertices=np.array([at(p) for p in rot]);faces=[[0,1,2],[0,2,3],[2,1,0],[3,2,0]]
        add(f'FAN_{idx:02}_BLADE_{k+1}',trimesh.Trimesh(vertices=vertices,faces=faces,process=False),'blade')
    cylinder(f'FAN_{idx:02}_MOTOR_HUB',.012,.007,at((0,0,.009)),direction,'bezel',28)
    cylinder(f'FAN_{idx:02}_MOTOR_CAP',.008,.008,at((0,0,.012)),direction,rgb,24)
    for dx in (-.046,.046):
        for dy in (-.046,.046):
            bolt(f'FAN_{idx:02}_MOUNT',at((dx,dy,.008)),direction)

# Three 120mm ARGB fans mounted on side interior in vertical column, two-room layout.
for no,yy in enumerate((-.120,0,.120),1):
    fan(no,(.128,yy,-.028),'z',['cyan','azure','green'][no-1])
# Three intake fans in bottom
for no,xx in enumerate((-.120,0,.120),4):
    fan(no,(xx,-.166,-.021),'y',['purple','cyan','azure'][no-4])
# One rear exhaust fan, see through the glass at left
fan(7,(-.151,.114,-.040),'z','cyan')
# Toolless dust filter lips and lower airflow supports
for zz in (-.110,.099):
    box('BOTTOM_FAN_MOUNT_RAIL',(L-.041,.003,.007),(-.002,-.209,zz),'metal')
for x in (-.164,-.057,.05,.158):
    box('BOTTOM_AIRFLOW_SUPPORT',(.005,.003,D-.055),(x,-.207,0),'grille')

# A tiny fixed identification plate, not a downloaded manufacturer model.
box('FOIFKIN_F600_BADGE',(.053,.019,.002),(X-.078,-Y+.037,Z-.006),'bezel')
for i in range(4):
    box(f'F600_BADGE_EMBOSS_{i}',(.002+i*.0001,.010,.001),(X-.099+i*.008,-Y+.037,Z-.004),'metal')

scene.metadata['title']='FOIFKIN F600 — educational procedural 3D GLB'
scene.metadata['source']='Original mesh, based on public F600 design references (not OEM CAD).'
scene.metadata['dimensions_mm']='419 x 284 x 439'
scene.metadata['glass']='270-degree panoramic, faceted curved corner'
scene.metadata['fans']='7 PWM ARGB approximations'
for material, parts in parts_by_material.items():
    joined = trimesh.util.concatenate(parts)
    emit_merged_material('F600_MATERIAL_'+material.upper(), joined, material)
blob=scene.export(file_type='glb')
OUT.write_bytes(blob)
reloaded=trimesh.load(OUT,force='scene',process=False)
print('GLB:',OUT)
print('Size:',len(blob),'bytes')
print('Scene meshes:',len(reloaded.geometry),'bounds:',reloaded.bounds)
assert 8 < len(reloaded.geometry) < 30 and len(blob)>20000
assert reloaded.bounds[1][1] - reloaded.bounds[0][1] < .6
