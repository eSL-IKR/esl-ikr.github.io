#!/usr/bin/env python3
"""Generate original, approximate demonstration GLBs inspired by product shapes.
No manufacturer meshes, textures or imagery are copied.
Units: 10 scene units ~= 1 metre (same visual scale as existing component models).
Requires trimesh, numpy. Reproducible deterministic meshes, embedded materials.
"""
from pathlib import Path
from itertools import count
import math
import numpy as np
import trimesh
from trimesh.visual.material import PBRMaterial

OUT = Path(__file__).resolve().parents[1] / 'public/pclab/models/brands'
OUT.mkdir(parents=True, exist_ok=True)

DARK='#111826'; EDGE='#263344'; METAL='#768394'; PURPLE='#c337ff'; BLUE='#23cbff'; WHITE='#edf6ff'


def rgba(c):
    if isinstance(c,(tuple,list)):
        return tuple(c) if len(c)==4 else (*c,255)
    c=str(c).lstrip('#')
    return (*[int(c[i:i+2],16) for i in (0,2,4)],255)

class Model:
    def __init__(self, name):
        self.scene=trimesh.Scene();self.name=name;self.i=count()
    def add(self, mesh, name, color=DARK, metallic=.35, roughness=.42, glow=None):
        mesh=mesh.copy()
        cols=rgba(color)
        mat=PBRMaterial(baseColorFactor=[x/255 for x in cols],metallicFactor=metallic,roughnessFactor=roughness, doubleSided=True)
        if glow is not None:
            r=rgba(glow);mat.emissiveFactor=[v/255 for v in r[:3]]
        mesh.visual=trimesh.visual.TextureVisuals(material=mat)
        self.scene.add_geometry(mesh,geom_name=f'{name}-{next(self.i)}')
        return self
    def box(self,name,size,xyz,color=DARK,metallic=.4,roughness=.45,glow=None):
        b=trimesh.creation.box(extents=size)
        b.apply_translation(xyz)
        return self.add(b,name,color,metallic,roughness,glow)
    def cyl(self,name,r,h,xyz,color=DARK,axis='z',sections=32,metallic=.45,roughness=.38,glow=None):
        m=trimesh.creation.cylinder(radius=r,height=h,sections=sections)
        if axis=='x':m.apply_transform(trimesh.transformations.rotation_matrix(math.pi/2,[0,1,0]))
        if axis=='y':m.apply_transform(trimesh.transformations.rotation_matrix(math.pi/2,[1,0,0]))
        m.apply_translation(xyz)
        return self.add(m,name,color,metallic,roughness,glow)
    def ring(self,name,ro,ri,depth,xyz,color=DARK,segments=48,metallic=.4,roughness=.25,glow=None,axis='z'):
        # Parametric solid annulus, oriented along z.
        vs=[];fs=[]
        for radius in (ro,ri):
            for zz in (-depth/2,depth/2):
                for i in range(segments):
                    a=2*math.pi*i/segments
                    vs.append([radius*math.cos(a),radius*math.sin(a),zz])
        for i in range(segments):
            j=(i+1)%segments
            for a,b,c,d in [(i,j,segments+j,segments+i),(2*segments+i,3*segments+i,3*segments+j,2*segments+j),
                            (segments+i,segments+j,3*segments+j,3*segments+i),(i,2*segments+i,2*segments+j,j)]:
                fs.extend([(a,b,c),(a,c,d)])
        mesh=trimesh.Trimesh(vertices=np.array(vs,dtype=float),faces=np.array(fs),process=False)
        if axis=='x':mesh.apply_transform(trimesh.transformations.rotation_matrix(math.pi/2,[0,1,0]))
        if axis=='y':mesh.apply_transform(trimesh.transformations.rotation_matrix(math.pi/2,[1,0,0]))
        mesh.apply_translation(xyz)
        return self.add(mesh,name,color,metallic,roughness,glow)
    def sphere(self,name,r,xyz,color=DARK,sub=2,metallic=.35,roughness=.35):
        m=trimesh.creation.icosphere(subdivisions=sub,radius=r);m.apply_translation(xyz)
        return self.add(m,name,color,metallic,roughness)
    def line(self,name,a,b,r,color=DARK,metallic=.0,roughness=.72):
        a=np.array(a,dtype=float);b=np.array(b,dtype=float);v=b-a;L=np.linalg.norm(v)
        if L < 1e-5:return self
        m=trimesh.creation.cylinder(radius=r,height=L,sections=10)
        m.apply_transform(trimesh.geometry.align_vectors([0,0,1],v/L))
        m.apply_translation((a+b)/2)
        return self.add(m,name,color,metallic,roughness)
    def cable(self,name,pts,r=.037,color='#0b1020'):
        for i in range(len(pts)-1):self.line(f'{name}_{i}',pts[i],pts[i+1],r,color,metallic=.08,roughness=.9)
        return self
    def save(self,filename):
        target=OUT/filename
        self.scene.metadata={'asset':'Procedural demo model; not official manufacturer asset','generator':'tools/build_corsair_elgato.py','product_inspiration':self.name}
        self.scene.export(target,file_type='glb')
        scene2=trimesh.load(target,force='scene')
        assert scene2.bounds is not None and np.all(np.isfinite(scene2.bounds)),filename
        print(filename,round(target.stat().st_size/1024), 'KB',len(scene2.geometry),'meshes','bounds:',np.round(scene2.extents,2))
        return target


def rgb_fan(m,xyz=(0,0,0),size=1.2,depth=.25,tint=PURPLE,tag='fan'):
    x,y,z=xyz;S=size;h=S/2;w=.13*S
    m.box(tag+'_frameTop',(S,w,depth),(x,y+h-w/2,z),'#171b25')
    m.box(tag+'_frameBottom',(S,w,depth),(x,y-h+w/2,z),'#171b25')
    m.box(tag+'_frameLeft',(w,S,depth),(x-h+w/2,y,z),'#171b25')
    m.box(tag+'_frameRight',(w,S,depth),(x+h-w/2,y,z),'#171b25')
    m.ring(tag+'_reflector',S*.445,S*.390,depth*.70,(x,y,z),'#2b293c',metallic=.73)
    m.ring(tag+'_RGB_outer',S*.415,S*.382,.028,(x,y,z+depth*.53),tint,metallic=.05,glow=tint)
    m.ring(tag+'_RGB_inner',S*.31,S*.29,.018,(x,y,z+depth*.57),BLUE,metallic=.04,glow=BLUE)
    for i in range(7):
        a=i*(2*math.pi/7)+.13
        # sweeping fan blades: small triangle 3D prisms to show curvature from any angle
        v=[]
        for r,off in [(S*.095,-.38),(S*.315,-.08),(S*.39,.19),(S*.15,.39)]:
            theta=a+off;v.append([x+r*math.cos(theta),y+r*math.sin(theta),z+depth*.26])
        v=np.asarray(v)
        mesh=trimesh.convex.convex_hull(np.vstack([v,v+[0,0,.034]]))
        m.add(mesh,tag+'_blade', '#c6d2e2',metallic=.34,roughness=.3)
    m.cyl(tag+'_hub',S*.105,.08,(x,y,z+depth*.35),'#1a1d29')
    m.cyl(tag+'_hubCap',S*.066,.014,(x,y,z+depth*.52),'#b5caec',metallic=.85)
    for a in (-1,1):
        for b in (-1,1):
            m.cyl(tag+'_screw',S*.021,.025,(x+a*S*.42,y+b*S*.42,z+depth*.57),'#8d94a6',metallic=.85)


def ram():
    # Existing DDR4 GLBs are oriented along local Y; vertical profile extends along Z.
    m=Model('Corsair Vengeance RGB PRO DDR4 example')
    m.box('PCB',(.055,1.32,.29),(0,0,.160),'#123b29',roughness=.9)
    m.box('heatsinkFront',(.076,1.20,.30),(.002,0,.25),'#1b2332',metallic=.65,roughness=.29)
    for x in (-.041,.041):
        for y in np.linspace(-.48,.48,9):
            m.box('vent_ridge',(.008,.035,.27),(x,y,.275),'#303b50',metallic=.75)
    for y in np.linspace(-.59,.59,48):
        if abs(y)<.018:continue
        m.box('gold_contact',(.008,.016,.065),(.032,y,-.003),'#dcae59',metallic=.85,roughness=.2)
    # LED light diffuser, soft pearly material with emissive patches
    m.box('RGB_diffuser',(.084,1.24,.076),(0,0,.448),'#e3e7f1',metallic=.0,roughness=.3)
    for i in range(10):
        c=[PURPLE,BLUE,'#5ae3ff','#ea59d7'][i%4]
        m.box('RGB_segment',(.080,.108,.032),(0,-.55+i*.122,.488),c,metallic=.0,roughness=.2,glow=c)
    m.box('raised_logo_backdrop',(.006,.46,.06),(.045,-.03,.26),'#37445a')
    return m.save('corsair-vengeance-rgb-pro-ddr4.glb')


def fan():
    m=Model('Corsair iCUE LINK QX120 RGB 120mm demo')
    rgb_fan(m,tint='#d721fc',tag='QX120')
    m.box('iCUE_LINK_socket',(.16,.20,.12),(.56,0,-.01),'#10141d')
    for i in range(8):
        a=2*math.pi*i/8
        m.cyl('RGB_side_marker',.019,.025,(.61*math.cos(a),.61*math.sin(a),-.13),BLUE)
    return m.save('corsair-qx120-rgb.glb')


def aio():
    m=Model('Corsair iCUE H100i ELITE CAPELLIX XT 240mm example')
    # radiator and 2 QX-like fans as visual approximation
    m.box('radiator',(1.2,2.77,.25),(0,.58,-.08),'#111826',metallic=.75,roughness=.44)
    for x in np.linspace(-.52,.52,22):
        m.box('radiator_fin',(.024,2.53,.014),(x,.58,.065),'#637080',metallic=.77,roughness=.6)
    for y in (-.03,1.18):rgb_fan(m,(0,y,.19),size=1.17,depth=.22,tag='AIO_fan')
    m.cyl('pump_block',.32,.23,(1.28,-.35,.32),'#242c38',sections=40)
    m.ring('pump_RGB',.283,.247,.035,(1.28,-.35,.45),PURPLE,glow=PURPLE)
    m.cyl('pump_glass',.225,.027,(1.28,-.35,.47),'#74839e',metallic=.6)
    # braided hoses remain spatial tubes, no fake 2d decal
    for i,off in enumerate((-.13,.13)):
        pts=[(1.26+off,-.36,.31),(1.17+off,-.12,.40),(1.32+off,.24,.56),(1.28+off,.75,.58),(.61+off,1.82,.24)]
        m.cable('braided_hose_'+str(i),pts,r=.055,color='#111620')
        for j in range(2):m.cyl('hose_fitting',.066,.09,pts[j],'#7b8396')
    return m.save('corsair-h100i-elite-capellix-xt.glb')


def psu():
    m=Model('Corsair RM750e 2025 ATX PSU demo')
    m.box('powdercoated_chassis',(1.42,.86,1.52),(0,0,0),'#19202b',metallic=.72,roughness=.34)
    m.box('rear_plate',(1.43,.87,.025),(0,0,-.772),'#3c4551',metallic=.8)
    # top cover for 120mm fan (visible along Y)
    m.ring('fan_guard_outer',.57,.52,.025,(0,.449,0),'#5c6677',axis='y',metallic=.78)
    for i in range(5):
        a=i*2*math.pi/5
        m.box('fan_blade',( .12,.028,.38),(.20*math.cos(a),.457,.20*math.sin(a)),'#a1adbb',metallic=.7)
    m.cyl('fan_hub',.1,.045,(0,.475,0),'#718398',axis='y')
    for rr in (.18,.3,.43):m.ring('fan_guard_ring',rr+.009,rr-.009,.025,(0,.483,0),'#7d889a',axis='y')
    for i in range(12):
        y=(-.28+(i%4)*.18);x=-.58+(i//4)*.55
        m.box('modular_socket',(.18,.1,.05),(x,y,.80),'#0b101a',metallic=.25)
        for k in range(4):m.box('socket_pin',(.023,.017,.005),(x-.06+k*.04,y,.84),'#b3bfd0',metallic=.75)
    m.box('label_panel',(.02,.64,.98),(.723,0,0),'#242c39')
    m.box('gold_efficiency_plate',(.025,.13,.65),(.74,.21,0),'#c09850',metallic=.7)
    for a in (-1,1):
      for b in (-1,1):m.cyl('case_screw',.026,.03,(a*.65,b*.36,.78),'#b4c2d3')
    return m.save('corsair-rm750e-2025.glb')


def streamdeck():
    m=Model('Elgato Stream Deck MK.2 15 LCD keys demo')
    m.box('housing',(1.18,.20,.84),(0,.12,0),'#10151d',metallic=.43)
    m.box('face_plate',(1.11,.035,.79),(0,.235,0),'#293445',metallic=.35,roughness=.28)
    # Five columns, three rows of individual LCDs, recessed bezel around each key
    for row in range(3):
        for col in range(5):
            x=(col-2)*.205;z=(row-1)*.235
            m.box('key_recess',(.165,.045,.178),(x,.264,z),'#070a0f')
            c=['#2aafff','#ac50ff','#45d4bb','#ef6aa8','#ffa54d'][(col+row*2)%5]
            m.box('LCD_key_'+str(row*5+col+1),(.144,.009,.157),(x,.294,z),c,metallic=.12,roughness=.32,glow=c)
            # icon as physical glyphs on surface (not texture)
            m.box('LCD_symbol',(.053,.003,.018),(x,.300,z),'#eaf8ff',metallic=.03)
            if (col+row)%2==0:m.box('LCD_symbol2',(.014,.003,.052),(x,.301,z),'#eaf8ff',metallic=.03)
    # desktop stand with angled support and non-slip foot
    m.box('stand_foot',(.75,.035,.66),(0,-.055,-.055),'#252f3a')
    m.line('stand_brace',(-.28,-.04,-.22),(-.25,.11,.25),.025,'#687587')
    m.line('stand_brace',(.28,-.04,-.22),(.25,.11,.25),.025,'#687587')
    return m.save('elgato-stream-deck-mk2.glb')


def facecam():
    m=Model('Elgato Facecam MK.2 1080p webcam demo')
    m.box('camera_body',(.84,.38,.54),(0,.28,0),'#171e2a',metallic=.45)
    m.box('front_bezel',(.77,.30,.035),(0,.28,.286),'#29384a',metallic=.62)
    m.ring('lens_outer',.175,.126,.07,(-.15,.28,.326),'#8e9cae',metallic=.9)
    m.ring('lens_trim',.130,.094,.075,(-.15,.28,.365),'#303e55',metallic=.65)
    m.cyl('lens_glass',.086,.02,(-.15,.28,.405),'#173957',metallic=.72,roughness=.10)
    m.cyl('lens_inner',.042,.023,(-.15,.28,.418),'#0c1625',metallic=.3)
    m.cyl('status_light',.021,.018,(.28,.27,.32),BLUE,metallic=.08,glow=BLUE)
    m.box('privacy_shutter',(.075,.30,.03),(-.36,.28,.33),'#10151d')
    m.box('mount_hinge',(.26,.10,.23),(0,-.01,-.07),'#333a48')
    m.box('monitor_grip',(.55,.063,.38),(0,-.12,-.2),'#212b39')
    return m.save('elgato-facecam-mk2.glb')


def wave3():
    m=Model('Elgato Wave:3 USB condenser microphone demo')
    m.cyl('mic_core',.32,1.38,(0,1.1,0),'#111722',axis='y',sections=32)
    m.box('front_grille',(.55,1.05,.055),(0,1.22,.283),'#4a5867',metallic=.74,roughness=.54)
    # mic screen perforations geometric black recess: ~100 shallow holes
    for y in np.linspace(.74,1.70,12):
        for x in np.linspace(-.23,.23,8):
            if (abs(x)<.23):m.cyl('grille_port',.014,.014,(x,y,.315),'#0e1621',sections=8)
    m.cyl('front_gain_knob',.115,.060,(0,.76,.37),'#8996a9',metallic=.84)
    m.cyl('gain_dial_center',.075,.065,(0,.76,.408),'#27364a')
    m.box('mute_button',(.14,.025,.12),(0,1.79,0),'#7bb2ff',glow='#336aff')
    m.cyl('side_hinge_L',.084,.12,(-.34,1.15,0),'#424f64',axis='x')
    m.cyl('side_hinge_R',.084,.12,(.34,1.15,0),'#424f64',axis='x')
    for x in (-.42,.42):m.line('yoke', (x,.28,0),(x,1.15,0),.034,'#667184')
    m.cyl('stand_pole',.064,.46,(0,.3,0),'#657184',axis='y')
    m.cyl('desk_base',.57,.07,(0,.04,0),'#273445',axis='y',sections=48)
    m.cyl('desk_base_top',.41,.016,(0,.08,0),'#697487',axis='y',sections=48)
    return m.save('elgato-wave3.glb')


def keylight():
    m=Model('Elgato Key Light Air MK.2 example LED panel and desk mount')
    # desktop free-standing demonstration mount, panel ~319x207 mm scaled to metre->scene units
    m.box('desk_clamp',(1.15,.13,.58),(0,.05,0),'#151d28')
    m.box('mount_pole',(.098,5.9,.098),(0,2.94,0),'#5c6878',metallic=.83)
    m.cyl('elbow_joint',.17,.16,(0,5.75,0),'#2b3745',axis='x')
    m.box('panel_shell',(3.19,2.07,.33),(0,6.65,.08),'#1b2431',metallic=.50)
    m.box('panel_border',(3.07,1.94,.08),(0,6.65,.295),'#d7e7f6',metallic=.3)
    m.box('frosted_diffuser',(2.90,1.78,.023),(0,6.65,.355),'#fff4dd',metallic=.03,roughness=.82,glow='#c2b9a4')
    for x in (-1.4,1.4):
        for y in (5.79,7.51):m.cyl('screw',.018,.025,(x,y,.37),'#a7b7c8')
    m.cable('power_usb',[(1.50,6.49,.02),(1.70,5.5,.03),(1.45,4.5,.03),(.22,3.5,.03)],.022,'#171d25')
    return m.save('elgato-key-light-air-mk2.glb')

if __name__=='__main__':
    for fn in (ram,fan,aio,psu,streamdeck,facecam,wave3,keylight):fn()
