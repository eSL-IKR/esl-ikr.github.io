"""Check F600 GLB structure and local paths without a GPU or npm install."""
from pathlib import Path
from html.parser import HTMLParser
import json, struct, subprocess, tempfile
ROOT=Path(__file__).resolve().parent.parent
GLB=ROOT/'public/pclab/models/FOIFKIN_F600.glb'
VIEW=ROOT/'public/pclab/foifkin-f600-viewer.html'
INDEX=ROOT/'public/pclab/index.html'
for p in (GLB,VIEW,INDEX,ROOT/'public/libs/three/three.min.js',ROOT/'public/libs/three/GLTFLoader.js',ROOT/'public/libs/three/OrbitControls.js'):
    assert p.is_file(),p
b=GLB.read_bytes()
magic,v,length=struct.unpack_from('<4sII',b,0)
assert (magic,v,length)==(b'glTF',2,len(b))
json_length,t=struct.unpack_from('<I4s',b,12)
assert t==b'JSON'
j=json.loads(b[20:20+json_length]);assert len(j['meshes'])>=12
assert all('uri' not in image for image in j.get('images',[]))
assert all('uri' not in buff for buff in j.get('buffers',[]))
class Scripts(HTMLParser):
    def __init__(self):super().__init__();self.scripts=[];self.collect=False;self.text=''
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if tag=='script' and 'src' not in attrs and attrs.get('type','') not in ('application/json','text/plain'):
            self.collect=True;self.text=''
    def handle_data(self,data):
        if self.collect:self.text+=data
    def handle_endtag(self,tag):
        if tag=='script' and self.collect:self.scripts.append(self.text);self.collect=False
for p in (INDEX,VIEW):
    content=p.read_text();assert './models/FOIFKIN_F600.glb' in content
    par=Scripts();par.feed(content)
    for s in par.scripts:
        if not s.strip():continue
        with tempfile.NamedTemporaryFile(suffix='.js',mode='w',encoding='utf-8') as f:
            f.write(s);f.flush()
            subprocess.run(['node','--check',f.name],check=True,capture_output=True)
print('PASS — GLB 2.0 self-contained, local paths present, inline JS syntax valid')
