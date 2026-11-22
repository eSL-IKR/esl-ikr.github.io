#!/usr/bin/env python3
"""eModul-IKR: offline authored 3D GLB training components.
Reference context: BuildCores product listings (form/shape, not downloaded meshes).
Assets use local PBR surfaces and real 3D geometry, no online runtime requests.
"""
from pathlib import Path
import math
import numpy as np
import trimesh
from trimesh.visual.material import PBRMaterial

DEST=Path(__file__).resolve().parent.parent/'public/pclab/models/components'
DEST.mkdir(parents=True,exist_ok=True)

palette={
  'case':('#151e2b',.64,.43), 'black':('#10151b',.36,.66), 'dark':('#1e293b',.31,.59),
  'matte':('#2d343d',.15,.84),'grey':('#586a7d',.43,.51), 'silver':('#c9d1d9',.83,.21),
  'aluminium':('#8d99a8',.83,.26),'gold':('#d4a84e',.85,.3),'copper':('#bf7241',.92,.28),
  'green':('#135941',.12,.82),'bluepcb':('#153f6b',.13,.8),'red':('#df3d5b',.26,.46),
  'blue':('#2189e6',.2,.44),'violet':('#9755fc',.18,.35),'ice':('#81e6ff',.14,.32),
  'white':('#d4e0e9',.17,.48),'chip':('#080c16',.12,.76), 'plastic':('#222832',.0,.65),
  'yellow':('#ffe267',.18,.46),'lcd':('#0a2849',.12,.37),'light':('#28e4ca',.18,.33),
}

def rgba(hexcode):
    h=hexcode.lstrip('#'); return [int(h[i:i+2],16) for i in (0,2,4)]+[255]
MATS={n:PBRMaterial(name=n,baseColorFactor=rgba(v[0]), metallicFactor=v[1],roughnessFactor=v[2],doubleSided=True) for n,v in palette.items()}
class Model:
    def __init__(self,name):self.name=name;self.scene=trimesh.Scene();self._n=0
    def add(self,geom,material,name,transform=None):
        geom.visual=trimesh.visual.TextureVisuals(material=MATS[material]);self._n+=1
        self.scene.add_geometry(geom,geom_name=f'{self.name}_{name}_{self._n}',node_name=f'{name}_{self._n}',transform=transform)
    def box(self,size,pos,mat='black',name='panel',rot=None):
        geom=trimesh.creation.box(extents=size)
        tf=np.eye(4)
        if rot is not None:
            axis,angle=rot
            tf=trimesh.transformations.rotation_matrix(angle,axis)
        tf[:3,3]=pos
        self.add(geom,mat,name,tf)
    def cyl(self,r,h,pos,mat='black',name='cylinder',axis='z',sections=24):
        geom=trimesh.creation.cylinder(r,h,sections=sections)
        tf=np.eye(4)
        if axis=='x':tf=trimesh.transformations.rotation_matrix(math.pi/2,[0,1,0])
        if axis=='y':tf=trimesh.transformations.rotation_matrix(math.pi/2,[1,0,0])
        tf[:3,3]=pos
        self.add(geom,mat,name,tf)
    def pipe(self,pts,r,mat,name='wire',segments=9):
        for j,(a,b) in enumerate(zip(pts[:-1],pts[1:])):
            a=np.array(a,dtype=float);b=np.array(b,dtype=float);d=b-a
            if np.linalg.norm(d)<.0001:continue
            tf=trimesh.geometry.align_vectors([0,0,1],d)
            tf[:3,3]=(a+b)/2
            self.add(trimesh.creation.cylinder(r,np.linalg.norm(d),sections=segments),mat,name,tf)
    def screws(self,centers,r=.022,axis='z'):
        for p in centers:self.cyl(r,.008,p,'silver','screw',axis=axis,sections=12)
    def save(self):
        path=DEST/(self.name+'.glb'); path.write_bytes(self.scene.export(file_type='glb'))
        return path

def fan(m,d=1.1,th=.16,col='blue',front=0):
    # 4 frame rails + 4 corner caps + circular metal ring + 7 swept rotor blades
    r=d/2; z=front
    for x in [-r+.05,r-.05]:
        m.box([.09,d,th],[x,0,z],'case','fan_rail')
    for y in [-r+.05,r-.05]:
        m.box([d,.09,th],[0,y,z],'case','fan_rail')
    for x in [-r+.10,r-.10]:
      for y in [-r+.1,r-.1]:m.cyl(.045,.045,[x,y,z+th/2],'silver','mount_screw')
    for k in range(32):
        a=2*math.pi*k/32
        m.box([d*.095,.025,th*.16],[math.cos(a)*d*.42,math.sin(a)*d*.42,z+th*.52],col,'argb_ring',rot=([0,0,1],a+math.pi/2))
    for k in range(7):
        a=2*math.pi*k/7
        m.box([d*.31,d*.12,.035],[math.cos(a)*d*.22,math.sin(a)*d*.22,z+th*.6],'aluminium','fan_blade',rot=([0,0,1],a+.5))
    m.cyl(d*.085,th*.23,[0,0,z+th*.58],'grey','rotor_hub')


def power_supply():
    m=Model('psu'); m.box([1.4,.86,1.5],[0,0,0],'case','steel_chassis')
    m.box([1.32,.03,1.4],[0,.436,0],'matte','fan_grille_surface')
    for a in range(28):
        theta=2*math.pi*a/28
        m.box([.045,.018,.13],[math.cos(theta)*.49,.46,math.sin(theta)*.49],'aluminium','fan_grille',rot=([0,1,0],theta))
    m.cyl(.2,.021,[0,.475,0],'black','fan_hub','y')
    for j in range(6):
        theta=math.pi*2*j/6;m.box([.38,.018,.12],[math.cos(theta)*.29,.475,math.sin(theta)*.29],'grey','vent_blade',rot=([0,1,0],theta))
    m.box([.92,.45,.018],[0,-.07,.76],'grey','psu_plate')
    for j in range(5):m.box([.8,.018,.023],[0,-.22+j*.09,.775], 'green' if j==3 else 'black','psu_label')
    for j in range(3):m.box([.2,.12,.03],[-.4+j*.36,-.26,-.764],'black','modular_port')
    for x in [-.56,.56]:
      for y in [-.30,.30]:m.cyl(.026,.01,[x,y,.765],'silver','screw')
    return m.save()

def cpu():
    m=Model('cpu');m.box([.34,.34,.024],[0,0,.014],'green','cpu_pcb')
    m.box([.277,.277,.026],[0,0,.042],'silver','cpu_ihs')
    m.box([.22,.035,.003],[0,.072,.058],'grey','intel_mark')
    for x in np.linspace(-.14,.14,16):
      for y in [-.145,.145]:m.box([.004,.007,.004],[x,y,0],'gold','cpu_contact')
    return m.save()

def ram(name,accent):
    m=Model(name)
    m.box([.052,1.33,.31],[0,0,.15],'green','memory_pcb')
    # gold edge connector and notch
    for j in range(16):
        yy=-.57+j*.075
        if -0.12<yy<-0.03:continue
        m.box([.003,.035,.038],[0,yy,.005],'gold','contact')
    for zz in [.18,.25]:
      for j in range(8):m.box([.064,.093,.038],[0,-.48+j*.135,zz],'chip','dram_ic')
    m.box([.08,1.18,.06],[0,0,.315],accent,'heatspreader')
    m.box([.094,1.12,.024],[0,0,.365],'ice','rgb_diffuser')
    for j in range(6):m.box([.1,.045,.027],[0,-.5+j*.2,.39],accent,'rgb_zone')
    return m.save()

def m2():
    m=Model('m2');m.box([.82,.23,.026],[0,0,.014],'green','nvme_pcb')
    m.box([.68,.15,.02],[.03,0,.04],'chip','controller_strip')
    for j in range(4):m.box([.125,.16,.033],[-.22+j*.16,0,.054],'dark','nand_flash')
    for j in range(5):m.box([.02,.14,.008],[-.38, -.06+j*.025,.035],'gold','gold_finger')
    m.cyl(.02,.01,[.39,0,.03],'silver','m2_screw')
    return m.save()

def graphics():
    m=Model('gpu')
    m.box([2.4,.057,1.0],[.7,.1,.5],'green','graphics_pcb')
    m.box([2.27,.33,1.02],[.7,-.035,.50],'case','gpu_shroud')
    for x in [-.05,.7,1.45]:
        m.cyl(.28,.024,[x,-.213,.5],'grey','gpu_fan_ring','y')
        for j in range(7):
            a=2*math.pi*j/7
            m.box([.22,.016,.075],[x+math.cos(a)*.13,-.236,.5+math.sin(a)*.13],'aluminium','gpu_fan_blade',rot=([0,1,0],a))
        m.cyl(.065,.04,[x,-.255,.5],'black','gpu_fan_hub','y')
    m.box([2.4,.05,.12],[.7,.165,.98],'ice','gpu_rgb_edge')
    m.box([2.28,.02,.95],[.7,.292,.5],'aluminium','gpu_backplate')
    for k in range(25):m.box([.012,.016,.7],[-.4+k*.09,.31,.5],'grey','backplate_heat_vent')
    m.box([.05,.4,1.18],[-.54,-.01,.5],'silver','pcie_bracket')
    for k in range(6):m.box([.014,.035,.07],[-.56,-.16+k*.05,.73],'black','gpu_output_port')
    m.box([.33,.15,.25],[1.55,.22,.62],'black','pcie_8pin_socket')
    for j in range(14):m.box([.055,.008,.09],[-.13+j*.12,.123,-.025],'gold','pcie_contact')
    return m.save()

def cooler():
    m=Model('cooler-air'); m.box([.52,.52,.055],[0,0,.1],'copper','heatspreader_base')
    for x in [-.25,-.08,.08,.25]:m.pipe([[x,-.22,.12],[x,-.14,.47],[x,0,.72],[x,.35,.72]],.028,'copper','heatpipe',segments=12)
    for k in range(22):
        z=.22+k*.026
        m.box([.87,.95,.011],[0,0,z],'aluminium','heatsink_fin')
    # Front-facing intake fan mounted on heatsink
    fan(m,.85,.09,'blue',front=.82)
    return m.save()

def cooler_aio():
    m=Model('cooler-aio');m.cyl(.23,.15,[0,0,.12],'case','waterpump')
    m.cyl(.16,.021,[0,0,.205],'ice','rgb_waterpump')
    m.box([1.25,.35,.56],[.3,1.35,.55],'case','radiator_body')
    for j in range(16):m.box([.025,.32,.55],[-.3+j*.08,1.35,.55],'aluminium','radiator_fin')
    for j in [-.15,.24]:m.pipe([[j,.08,.22],[j+.1,.42,.33],[j+.25,.72,.44],[.34+j,1.24,.52]],.037,'black','liquid_tube',segments=12)
    for x in [-.07,.35,.77]:
        m.cyl(.15,.03,[x,1.35,.851],'dark','radiator_fan','z')
        m.cyl(.1,.04,[x,1.35,.872],'ice','radiator_fan_hub')
    return m.save()

def nic():
    m=Model('nic');m.box([.52,.04,.78],[.05,0,.4],'bluepcb','network_card')
    m.box([.18,.07,.17],[.11,.05,.47],'chip','ethernet_controller')
    m.box([.14,.12,.25],[-.19,.065,.64],'silver','rj45_housing')
    m.box([.16,.08,.08],[-.185,.071,.762],'chip','rj45_socket')
    m.box([.03,.26,.93],[-.24,0,.4],'silver','expansion_bracket')
    for j in range(10):m.box([.02,.03,.025],[-.14+j*.033,.0,.015],'gold','pcie_gold_finger')
    return m.save()

def hdd():
    m=Model('hdd');m.box([1.47,.96,.27],[0,0,0],'aluminium','drive_aluminium')
    m.box([1.27,.76,.012],[0,0,.145],'white','hdd_label')
    m.box([1.1,.11,.012],[0,.22,.156],'blue','label_band')
    for yy in [.10,.05,0,-.05,-.1]:m.box([.9,.013,.013],[0,yy,.157],'grey','label_text_line')
    m.cyl(.20,.017,[.42,-.21,.16],'grey','platter_motif')
    m.screws([[-.66,-.41,.142],[.66,-.41,.142],[-.66,.41,.142],[.66,.41,.142]],.03)
    m.box([.35,.09,.022],[-.4,-.49,0],'black','sata_data_socket')
    m.box([.35,.09,.022],[.28,-.49,0],'black','sata_power_socket')
    return m.save()

def ssd():
    m=Model('ssd-sata');m.box([1.02,.70,.075],[0,0,0],'case','sata_ssd_case')
    m.box([.92,.59,.006],[0,0,.042],'matte','label_panel')
    m.box([.79,.085,.008],[0,.18,.048],'ice','brand_band')
    for j in range(4):m.box([.68,.017,.007],[0,.04-j*.075,.049],'grey','label_etch')
    m.box([.22,.07,.018],[-.32,-.355,0],'black','sata_data_port')
    m.box([.28,.07,.018],[.18,-.355,0],'black','sata_power_port')
    return m.save()

def wifi():
    m=Model('wifi-usb');m.box([.34,.085,.14],[-.33,0,.015],'case','usb_body')
    m.box([.10,.065,.11],[-.55,0,.015],'silver','usb_type_a')
    m.box([.045,.05,.015],[-.22,0,.092],'light','wifi_led')
    m.box([.16,.055,.10],[-.12,0,.015],'plastic','usb_cap')
    return m.save()

def keyboard():
    m=Model('keyboard')
    m.box([3.9,.14,1.43],[0,0,0],'case','keyboard_body')
    m.box([3.75,.022,1.27],[0,.083,0],'matte','keybed')
    for i in range(6):
      for j in range(15):
        x=-1.76+i*.24  # columns? swap below
    for row in range(5):
      for col in range(16):
        if row==4 and 4<=col<=9:continue
        x=-1.72+col*.22;z=-.52+row*.25
        m.box([.19,.04,.19],[x,.115,z], 'grey' if (row+col)%9==0 else 'black','keycap')
    m.box([1.35,.04,.19],[0,.12,.47],'grey','spacebar')
    m.box([3.78,.021,.024],[0,.115,-.69],'ice','rgb_keyboard_strip')
    return m.save()

def mouse():
    m=Model('mouse')
    # Rounded-ish geometry using capsule + upper silver panel, oriented X long (view from above y)
    m.add(trimesh.creation.icosphere(subdivisions=2,radius=1),'case','mouse_shell',np.array([[.31,0,0,0],[0,.14,0,0],[0,0,.52,0],[0,0,0,1]]))
    m.box([.02,.02,.22],[0,.15,-.19],'silver','mouse_split')
    m.cyl(.045,.10,[0,.21,-.11],'grey','scroll_wheel','x')
    m.box([.3,.015,.02],[0,.155,.30],'ice','mouse_rgb')
    return m.save()

def monitor():
    m=Model('monitor')
    m.box([5.4,3.2,.15],[0,0,0],'case','monitor_bezel')
    m.box([5.17,2.94,.015],[0,0,.086],'lcd','monitor_lcd')
    m.box([4.96,.045,.016],[0,1.29,.1],'ice','monitor_statusbar')
    m.box([1.8,.20,.018],[-1.17,.62,.105],'blue','wallpaper_gradient')
    m.box([2,.03,.019],[-1.06,.40,.105],'ice','desktop_status')
    for k in range(4):m.box([.46,.44,.018],[1.08+(k%2)*.62,-.36+(k//2)*.58,.105], 'blue' if k%2 else 'grey','desktop_icon')
    m.box([.45,1.1,.2],[0,-2.04,-.13],'grey','monitor_arm')
    m.box([2.1,.13,1.28],[0,-2.6,-.02],'black','monitor_base')
    m.cyl(.05,.015,[2.43,-1.46,.088],'green','monitor_power_led')
    return m.save()

def speaker():
    m=Model('speaker')
    m.box([1.08,1.75,1.0],[0,0,0],'case','speaker_cabinet')
    m.box([.98,1.59,.021],[0,0,.514],'matte','grille')
    m.cyl(.35,.04,[0,-.32,.545],'black','woofer')
    m.cyl(.18,.046,[0,-.32,.575],'grey','woofer_center')
    m.cyl(.14,.04,[0,.45,.545],'black','tweeter')
    m.cyl(.06,.045,[0,.45,.57],'silver','tweeter_center')
    m.cyl(.025,.015,[.37,.68,.54],'green','power_indicator')
    return m.save()

def rj45():
    m=Model('rj45');m.box([.29,.13,.19],[-.32,0,0],'blue','rj45_plug')
    m.box([.19,.06,.06],[-.48,.02,.09],'black','latch')
    for i in range(8):m.box([.025,.015,.02],[-.44+i*.019,0,.096],'gold','rj45_contact')
    return m.save()

def acplug():
    m=Model('ac-plug');m.box([.30,.21,.18],[-.2,0,0],'black','iec_plug')
    for z in [-.04,.04]:m.box([.07,.04,.03],[-.38,0,z],'silver','iec_contact')
    return m.save()

def wallplug():
    m=Model('wall-plug');m.box([.46,.5,.48],[0,.3,0],'white','uk_plug_body')
    for x,y in [[-.11,.04],[.11,.04],[0,-.08]]:m.box([.045,.18,.045],[x,y,0],'silver','type_g_pin')
    return m.save()

def paste():
    m=Model('thermal-paste');geom=trimesh.creation.icosphere(subdivisions=3,radius=.10)
    tf=np.diag([1,1,.23,1]);tf[:3,3]=[0,0,.076];m.add(geom,'silver','thermal_paste_drop',tf)
    return m.save()

def build():
    jobs=[power_supply,cpu,lambda:ram('ram-blue','blue'),lambda:ram('ram-purple','violet'),m2,graphics,cooler,cooler_aio,nic,hdd,ssd,wifi,keyboard,mouse,monitor,speaker,rj45,acplug,wallplug,paste]
    for j in jobs:
        p=j(); print(f'{p.name:26s} {p.stat().st_size/1024:8.1f} KiB')
    for name,d,th,col in [('fan-front',1.2,.25,'blue'),('fan-rear',.8,.22,'violet')]:
        m=Model(name);fan(m,d,th,col);p=m.save();print(f'{p.name:26s} {p.stat().st_size/1024:8.1f} KiB')
if __name__=='__main__':build()
