#!/usr/bin/env python3
from pathlib import Path
import re,subprocess,sys,struct,json,zipfile
root=Path(__file__).resolve().parent.parent
p=root/'public/pclab'
assets=list((p/'models/components').glob('*.glb'))
assert len(assets)==22, f'22 model expected, found {len(assets)}'
assert (p/'models/asus-z170p.glb').is_file()
assert (p/'models/FOIFKIN_F600.glb').is_file()
assert (p/'components-3d-viewer.html').is_file()
html=(p/'index.html').read_text(encoding='utf-8')
assert 'function detailedModel' in html and "else detailedModel(id,root,inner);" in html
assert 'components-3d-viewer.html' in html and 'data-act="allglb"' in html
assert 'function installZ170Model' in html and 'function installF600CaseModel' in html
script=re.findall(r'<script(?![^>]*\btype="application/json")[^>]*>([\s\S]*?)</script>',html)
js_count=0
for i,js in enumerate(script):
  if not js.strip() or js.lstrip().startswith('{'):continue
  r=subprocess.run(['node','--check','-'],input=js,text=True,encoding="utf-8",capture_output=True)
  assert r.returncode==0, f'Error script {i}: {r.stderr}'
  js_count+=1
viewer=(p/'components-3d-viewer.html').read_text(encoding='utf-8')
brands=list((p/'models/brands').glob('*.glb'))
assert len(brands)==8, f'Expected 8 brand models, found {len(brands)}'
ids=re.findall(r"^\['([^']+)'",viewer,re.M)
expected={f.stem for f in assets+brands}|{'asus','case'}
assert len(ids)==len(expected) and set(ids)==expected, 'Viewer and GLB catalogue differ' 
r=subprocess.run(['node','--check','-'],input=viewer.split('<script>')[-1].split('</script>')[0],text=True,encoding="utf-8",capture_output=True)
assert r.returncode==0, r.stderr
for file in assets+brands+[p/'models/asus-z170p.glb',p/'models/FOIFKIN_F600.glb']:
  d=file.read_bytes();magic,version,length=struct.unpack_from('<III',d)
  assert magic==0x46546c67 and version==2 and length==len(d),file
  chunk_len,kind=struct.unpack_from('<II',d,12)
  assert kind==0x4e4f534a,file
  meta=json.loads(d[20:20+chunk_len]);assert meta['asset']['version']=='2.0' and len(meta.get('meshes',[]))>0,file
  for buff in meta.get('buffers',[]): assert 'uri' not in buff, 'External file URI in '+file.name
print('OK:',len(ids),'catalogued GLBs,',js_count,'inline JS scripts + viewer checked')
print('OK: all assets self-contained glTF 2.0; no external buffer references')
