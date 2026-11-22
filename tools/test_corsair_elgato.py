#!/usr/bin/env python3
"""Offline model, asset path, JS syntax, and source-preservation checks."""
from pathlib import Path
from html.parser import HTMLParser
import json,hashlib,struct,subprocess,zipfile,re,sys
R=Path(__file__).resolve().parents[1]
orig=Path('/mnt/data/eModul-IKR-v15-SEMUA-KOMPONEN-3D-GLB.zip')
models=R/'public/pclab/models'
class Scripts(HTMLParser):
 def __init__(self):super().__init__();self.scripts=[];self.in_script=False;self.buffer='';self.at={}
 def handle_starttag(self,tag,attrs):
  if tag=='script':self.in_script=True;self.buffer='';self.at=dict(attrs)
 def handle_data(self,data):
  if self.in_script:self.buffer+=data
 def handle_endtag(self,tag):
  if tag=='script' and self.in_script:
   if self.at.get('type') not in ('application/ld+json','application/json'):self.scripts.append(self.buffer)
   self.in_script=False
# preserved 22 component models + ASUS + FOIFKIN, byte-for-byte
with zipfile.ZipFile(orig) as z:
 original=[name for name in z.namelist() if name.startswith('public/pclab/models/') and name.endswith('.glb')]
 assert len(original)==24, len(original)
 for name in original:assert z.read(name)==(R/name).read_bytes(),f'Changed original model: {name}'
print('PASS 24 GLB asal kekal byte-for-byte')
cat=json.loads((R/'public/pclab/brands-3d-catalog.json').read_text())
assert len(cat['products'])==8
newfiles=[]
for product in cat['products']:
 p=(R/'public/pclab'/product['glb'])
 assert p.is_file(),p
 data=p.read_bytes();magic,ver,ln=struct.unpack_from('<III',data)
 assert magic==0x46546c67 and ver==2 and ln==len(data),(p,'invalid glb')
 jln,jkind=struct.unpack_from('<I4s',data,12)
 root=json.loads(data[20:20+jln]);assert root['asset']['version']=='2.0'
 assert len(root['meshes'])>=8
 assert all('uri' not in buf for buf in root.get('buffers',[])),'external asset dependency'
 newfiles.append(p)
print('PASS 8 GLB baharu sah dan tanpa fail tekstur luar')
viewer=(R/'public/pclab/components-3d-viewer.html').read_text()
page=(R/'public/pclab/index.html').read_text()
for product in cat['products']:
 assert product['id'] in viewer and product['id'] in page
assert len(re.findall(r"^\['",viewer,re.M))==32,'Viewer must contain exactly 32 entries'
for mark in ['brandgallery','brandmodel','brandtoggle','BRAND_OVERRIDES','BRAND_DISPLAY',"CTABS.push(['brands'",'openBrandGallery','toggleBrandDisplay','spawnBrandDisplay','components-3d-viewer.html']:
 assert mark in page,mark
for p in ['public/pclab/index.html','public/pclab/components-3d-viewer.html']:
 scripts=Scripts();scripts.feed((R/p).read_text())
 for i,js in enumerate(scripts.scripts):
  if not js.strip():continue
  proc=subprocess.run(['node','--check','-'],input=js,text=True,capture_output=True,timeout=10)
  assert proc.returncode==0, (p,i,proc.stderr[:800])
print('PASS syntax JavaScript di kedua-dua fail HTML; 32 entri galeri dan Katalog')
print('ALL PASS')
