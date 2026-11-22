#!/usr/bin/env python3
"""Patch v15 PC Lab with optional Corsair/Elgato demo. Idempotent and source-preserving."""
from pathlib import Path
from textwrap import dedent
R=Path(__file__).resolve().parents[1]
viewer=R/'public/pclab/components-3d-viewer.html'
p=viewer.read_text()
if 'corsair-vengeance-rgb-pro-ddr4' not in p:
    p=p.replace('22 model prosedural + ASUS Z170-P & FOIFKIN F600. Klik untuk buka.', '24 model asal + 8 model Corsair / Elgato berinspirasi produk sebenar.')
    p=p.replace('const DATA=[',"const DATA=[\n['corsair-vengeance-rgb-pro-ddr4','Corsair VENGEANCE RGB PRO DDR4','RAM DDR4 RGB model prosedural; sesuai generasi memori ASUS Z170-P. Bukan aset 3D rasmi Corsair.','🧠','Corsair'],\n['corsair-qx120-rgb','Corsair iCUE LINK QX120 RGB','Kipas 120 mm dengan bingkai, bilah 3D, LED dan penyambung. Animasi RGB simulasi sahaja.','🌈','Corsair'],\n['corsair-h100i-elite-capellix-xt','Corsair H100i ELITE CAPELLIX XT','Penyejuk cecair AIO 240 mm dengan radiator, dua kipas dan hos. Keserasian radiator F600 perlu disahkan.','💧','Corsair'],\n['corsair-rm750e-2025','Corsair RM750e (2025)','PSU ATX 750 W model peragaan berinspirasikan casing sebenar.','🔌','Corsair'],\n['elgato-stream-deck-mk2','Elgato Stream Deck MK.2','Panel USB dengan 15 kekunci LCD (5×3); untuk streaming dan makro.','🎛️','Elgato'],\n['elgato-facecam-mk2','Elgato Facecam MK.2','Webcam USB dengan kaca lensa, cincin fokus dan bracket monitor.','📹','Elgato'],\n['elgato-wave3','Elgato Wave:3','Mikrofon USB dengan gril, tombol gain, dudukan dan pemegang.','🎙️','Elgato'],\n['elgato-key-light-air-mk2','Elgato Key Light Air MK.2','Lampu LED studio dengan panel diffuser dan penyangga meja.','💡','Elgato'],")
    p=p.replace("<input id=\"search\" placeholder=\"Cari komponen...\" aria-label=\"Cari model\">",'<div id="filters" style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px"><button type="button" class="on" data-brand="all">Semua (32)</button><button type="button" data-brand="corsair">Corsair (4)</button><button type="button" data-brand="elgato">Elgato (4)</button><button type="button" data-brand="old">Asal (24)</button></div><input id="search" placeholder="Cari komponen..." aria-label="Cari model">')
    p=p.replace('input{width:100%;', '#filters button{border:1px solid #3d5169;border-radius:7px;background:#17253a;padding:6px 8px;color:#d6e3f4;font-size:10px;cursor:pointer}#filters button.on{background:#4f46e5;color:white;border-color:#8b82ff} input{width:100%;')
    p=p.replace("const urls={case:'models/FOIFKIN_F600.glb',asus:'models/asus-z170p.glb'};", "const urls={case:'models/FOIFKIN_F600.glb',asus:'models/asus-z170p.glb'};\nconst BRAND_IDS=new Set(['corsair-vengeance-rgb-pro-ddr4','corsair-qx120-rgb','corsair-h100i-elite-capellix-xt','corsair-rm750e-2025','elgato-stream-deck-mk2','elgato-facecam-mk2','elgato-wave3','elgato-key-light-air-mk2']);\nBRAND_IDS.forEach(id=>{urls[id]='models/brands/'+id+'.glb';});")
    p=p.replace("const path=urls[id]||('models/components/'+id+'.glb');", "const path=urls[id]||('models/components/'+id+'.glb');")
    p=p.replace('function renderList(term=\'\'){', "let brandFilter=new URLSearchParams(location.search).get('group')==='brands'?'brands':'all';\nfunction renderList(term=''){")
    p=p.replace("DATA.filter(v=>v[1].toLowerCase().includes(term.toLowerCase())).forEach(v=>{", "DATA.filter(v=>{let grp=v[4]||'old';return (brandFilter==='all'||brandFilter==='brands'&&grp!=='old'||brandFilter===grp.toLowerCase()) && (v[1]+' '+v[2]+' '+grp).toLowerCase().includes(term.toLowerCase());}).forEach(v=>{")
    p=p.replace('<small>.glb tempatan</small>', '<small></small>')
    p=p.replace("b.querySelector('.n').textContent=v[1];b.addEventListener", "b.querySelector('.n').textContent=v[1];b.querySelector('small').textContent=(v[4]||'Model asal')+' · GLB tempatan';b.addEventListener")
    p=p.replace("document.querySelector('#search').addEventListener('input',e=>renderList(e.target.value));", "document.querySelector('#search').addEventListener('input',e=>renderList(e.target.value));\ndocument.querySelectorAll('[data-brand]').forEach(b=>b.addEventListener('click',()=>{brandFilter=b.dataset.brand;document.querySelectorAll('[data-brand]').forEach(x=>x.classList.toggle('on',x===b));renderList(document.querySelector('#search').value); }));\nif(brandFilter==='brands'){document.querySelector('[data-brand=\"all\"]').classList.remove('on');document.querySelector('[data-brand=\"corsair\"]').classList.add('on');document.querySelector('[data-brand=\"elgato\"]').classList.add('on');}")
    p=p.replace("renderList();if(init())load('gpu');", "renderList();if(init()){const queryModel=new URLSearchParams(location.search).get('model');const first=DATA.find(v=>v[0]===queryModel);load(first?first[0]:(brandFilter==='brands'?'corsair-vengeance-rgb-pro-ddr4':'gpu'));}")
    p=p.replace("<div class=\"license\">3D prosedural hasil binaan eModul-IKR. Rujukan bentuk: BuildCores.com; bukan aset rasmi pengeluar.</div>", "<div class=\"license\">Model baharu Corsair &amp; Elgato dijana secara prosedural berasaskan spesifikasi rasmi. Bukan model/tekstur rasmi, bukan integrasi iCUE/Stream Deck.</div>")
    viewer.write_text(p)

index=R/'public/pclab/index.html'
s=index.read_text()
if 'BRAND_OVERRIDES' not in s:
    s=s.replace("var glbPartLoader=null,glbPartCache={},glbLoadedCount=0;",dedent('''\
var BRAND_MODE=false, BRAND_EXTRA_GROUP=null;
// Model bersifat demonstrasi. Mod Latihan/Ujian mengekalkan penilaian asal.
var BRAND_OVERRIDES={
  ram1:'corsair-vengeance-rgb-pro-ddr4',ram2:'corsair-vengeance-rgb-pro-ddr4',
  psu:'corsair-rm750e-2025',fanF1:'corsair-qx120-rgb',fanF2:'corsair-qx120-rgb',fanR:'corsair-qx120-rgb',
  coolerL:'corsair-h100i-elite-capellix-xt'
};
var BRAND_DISPLAY=[
  {id:'elgato-stream-deck-mk2',pos:[1.6,DK+.20,-2.3],scale:1.0,rotation:0},
  {id:'elgato-wave3',pos:[3.6,DK+.06,-2.7],scale:.9,rotation:0},
  {id:'elgato-facecam-mk2',pos:[-3.4,DK+4.3,MZ],scale:1.05,rotation:Math.PI/2},
  {id:'elgato-key-light-air-mk2',pos:[5.1,DK+.05,-5.0],scale:.48,rotation:-.4}
];
var brandLoader=null,brandCache={};
function clearBrandDisplay(){
  if(BRAND_EXTRA_GROUP){scene.remove(BRAND_EXTRA_GROUP);BRAND_EXTRA_GROUP=null;}
}
function spawnBrandDisplay(){
  clearBrandDisplay();
  if(!BRAND_MODE||S.mode!=='belajar'||!scene||!THREE.GLTFLoader)return;
  var holder=new THREE.Group();holder.name='Elgato_Demo_Aksesori';scene.add(holder);BRAND_EXTRA_GROUP=holder;
  if(!brandLoader)brandLoader=new THREE.GLTFLoader();
  BRAND_DISPLAY.forEach(function(p){
    if(!brandCache[p.id])brandCache[p.id]=new Promise(function(resolve,reject){
      brandLoader.load('./models/brands/'+p.id+'.glb',resolve,undefined,reject);
    });
    brandCache[p.id].then(function(data){
      if(!BRAND_MODE||S.mode!=='belajar'||BRAND_EXTRA_GROUP!==holder||!holder.parent)return;
      var model=data.scene.clone(true);model.name='ELGATO_'+p.id;
      model.scale.setScalar(p.scale);model.position.set(p.pos[0],p.pos[1],p.pos[2]);model.rotation.y=p.rotation;
      model.traverse(function(o){if(o.isMesh){o.castShadow=true;o.receiveShadow=true;o.userData.demoOnly=true;o.userData.sharedAsset=true;}});
      holder.add(model);
    }).catch(function(err){console.warn('Model demo Elgato tidak dimuatkan:',p.id,err);});
  });
}
function toggleBrandDisplay(){
  if(S.mode!=='belajar')return;
  BRAND_MODE=!BRAND_MODE;
  Object.keys(BRAND_OVERRIDES).forEach(function(id){
    if(!HW.installed[id])return;
    var target=HW.installed[id];removePart(id);installPart(id,target,false);
  });
  spawnBrandDisplay();
  render();
}
var glbPartLoader=null,glbPartCache={},glbLoadedCount=0;
'''))
    s=s.replace("var key=DETAILED_GLB[id];if(!key||!THREE.GLTFLoader)return;", "var brandKey=BRAND_MODE&&S.mode==='belajar'&&BRAND_OVERRIDES[id];\n  var key=brandKey?('brands/'+BRAND_OVERRIDES[id]):('components/'+DETAILED_GLB[id]);\n  if(!key||key==='components/undefined'||!THREE.GLTFLoader)return;")
    s=s.replace("glbPartLoader.load('./models/components/'+key+'.glb',ok,undefined,fail);", "glbPartLoader.load('./models/'+key+'.glb',ok,undefined,fail);")
    # Preserve RGB emissive on selection highlighting and ensure per-instance material independence
    s=s.replace("obj.userData.sharedAsset=true;\n      obj.castShadow=true;obj.receiveShadow=true;", "obj.userData.sharedAsset=true;\n      if(obj.material&&!Array.isArray(obj.material)){obj.material=obj.material.clone();if(obj.material.emissive)obj.material.userData.e0=obj.material.emissive.getHex();}\n      obj.castShadow=true;obj.receiveShadow=true;")
    s=s.replace("function resetHW(){\n  if(scene)clearGroups();", "function resetHW(){\n  if(scene){clearBrandDisplay();clearGroups();}")
    s=s.replace("if(S.mode==='belajar'){PARTS.forEach(function(p){if(p.bad||p.id==='coolerL')return;installPart(p.id,firstTarget(p.id),false);});}\n}", "if(S.mode==='belajar'){PARTS.forEach(function(p){if(p.bad||p.id==='coolerL')return;installPart(p.id,firstTarget(p.id),false);});spawnBrandDisplay();}\n}")
    s=s.replace("function setMode(m){S.mode=m;", "function setMode(m){if(m!=='belajar'){BRAND_MODE=false;clearBrandDisplay();}S.mode=m;")
    s=s.replace('data-act="allglb" title="Model CPU, RAM, GPU, PSU, SSD, kipas, periferal">◈ GALERI 3D SEMUA KOMPONEN</button></div>', 'data-act="allglb" title="Semua model asal dan 8 model baharu">◈ GALERI 3D SEMUA KOMPONEN (32)</button></div>')
    s=s.replace("+'<p class=\"mut\" style=\"font-size:11px;margin:6px 0 0\">Model asli prosedural: kaca panoramik 270°, 7 kipas ARGB, belakang casing dan panel I/O.</p></div>'", "+'<div class=\"row2\"><button class=\"btn sm'+(BRAND_MODE?' on':'')+'\" data-act=\"brandtoggle\">'+(BRAND_MODE?'✓':'✦')+' Pamer set Corsair + Elgato</button><button class=\"btn sm\" data-act=\"brandgallery\">8 model baharu 3D</button></div>'\n   +'<p class=\"mut\" style=\"font-size:11px;margin:6px 0 0\">Pameran opsyenal: RAM DDR4, PSU, kipas dan aksesori meja Elgato. AIO dipilih melalui butang Cecair. Mod Latihan/Ujian tidak berubah. Semua model berjenama ialah 3D prosedural, bukan model rasmi.</p></div>'")
    s=s.replace("case 'allglb':openAllPartsGallery();break;", "case 'allglb':openAllPartsGallery();break;\n    case 'brandgallery':openBrandGallery();break;\n    case 'brandmodel':openBrandGallery(v);break;\n    case 'brandtoggle':toggleBrandDisplay();break;")
    anchor='function openAllPartsGallery(){'
    brand_gallery=dedent('''\
function openBrandGallery(id){
  $('#modal').hidden=false;
  $('#skt').textContent='Galeri 3D Corsair + Elgato — Model Prosedural';
  var query='?group=brands'+(id?'&model='+encodeURIComponent(id):'');
  $('#skhost').innerHTML='<iframe title="8 model baharu Corsair dan Elgato" src="./components-3d-viewer.html'+query+'" loading="eager" style="display:block;width:min(88vw,1120px);height:min(72vh,710px);min-height:350px;border:1px solid var(--line);border-radius:10px;background:#08111b"></iframe>'
    +'<p class="mut">Model berasaskan bentuk produk rasmi sebagai rujukan sahaja, bukan fail 3D daripada GitHub Corsair atau Elgato. Putar 360° dan zum untuk melihat butiran.</p>';
}
''')
    assert anchor in s
    s=s.replace(anchor,brand_gallery+anchor)
    # Register 8 brand product entries under Katalog, isolated from original compatibility/assessment data
    before='function catShell(){'
    ct=dedent('''\
CTABS.push(['brands','Corsair / Elgato 3D']);
CAT.brands={intro:'8 model GLB berjenama di sini ialah reka bentuk 3D prosedural bagi pembelajaran. Model Elgato ialah aksesori luaran (bukan komponen dalaman PC). Tiada harga atau sokongan iCUE/Stream Deck SDK yang didakwa.',groups:[
 {h:'Corsair — Komponen PC',items:[
  {n:'CORSAIR VENGEANCE RGB PRO DDR4',tag:'RAM DDR4',d:'Modul DDR4 RGB untuk paparan ASUS Z170-P. Semak kelajuan dan kapasiti sebenar mengikut konfigurasi.',glb:'corsair-vengeance-rgb-pro-ddr4'},
  {n:'CORSAIR iCUE LINK QX120 RGB',tag:'120 mm RGB',d:'Kipas PC 120 mm. Pencahayaan dalam adegan 3D hanyalah simulasi visual.',glb:'corsair-qx120-rgb'},
  {n:'CORSAIR H100i ELITE CAPELLIX XT',tag:'AIO 240 mm',d:'Penyejuk CPU dengan radiator 240 mm. Casing F600 belum mempunyai pengesahan sokongan radiator.',glb:'corsair-h100i-elite-capellix-xt'},
  {n:'CORSAIR RM750e 2025',tag:'ATX PSU 750 W',d:'Bekalan kuasa ATX 750 W, panjang 140 mm. Contoh integrasi model PSU 3D.',glb:'corsair-rm750e-2025'}]},
 {h:'Elgato — Aksesori Pencipta Kandungan',items:[
  {n:'Elgato Stream Deck MK.2',tag:'15 kekunci',d:'15 kekunci LCD tersuai dalam susunan 5×3. Peranti luaran USB.',glb:'elgato-stream-deck-mk2'},
  {n:'Elgato Facecam MK.2',tag:'Webcam USB',d:'Webcam 1080p yang boleh diletakkan pada monitor.',glb:'elgato-facecam-mk2'},
  {n:'Elgato Wave:3',tag:'Mikrofon USB',d:'Mikrofon USB kondensor, model visual dengan gril dan dial.',glb:'elgato-wave3'},
  {n:'Elgato Key Light Air MK.2',tag:'Lampu LED',d:'Panel pencahayaan LED studio dengan penyangga meja.',glb:'elgato-key-light-air-mk2'}]}
]};
''')
    assert before in s;s=s.replace(before,ct+before)
    original="+'<div class=\"cgrid\">'+items.map(function(it){return '<div class=\"ci\">'+(it.tag?'<span class=\"t\">'+esc(it.tag)+'</span>':'')+'<b>'+esc(it.n)+'</b><p>'+esc(it.d)+'</p></div>';}).join('')+'</div>';"
    modified="+'<div class=\"cgrid\">'+items.map(function(it){return '<div class=\"ci\">'+(it.tag?'<span class=\"t\">'+esc(it.tag)+'</span>':'')+'<b>'+esc(it.n)+'</b><p>'+esc(it.d)+'</p>'+(it.glb?'<button class=\"btn sm\" data-act=\"brandmodel\" data-v=\"'+esc(it.glb)+'\">◈ Lihat Model 3D GLB</button>':'')+'</div>';}).join('')+'</div>';"
    if original not in s:raise RuntimeError('Katalog fillCat anchor changed')
    s=s.replace(original,modified)
    s=s.replace("+'<div class=\"card\"><h4>Galeri model 3D (Sketchfab)</h4>", "+'<div class=\"card\"><h4>Model baharu Corsair / Elgato</h4><p class=\"mut\">Lihat semua 8 GLB prosedural dari katalog di tab Corsair / Elgato 3D.</p><div class=\"row2\"><button class=\"btn sm pri\" data-act=\"brandgallery\">◈ 8 model 3D baharu</button><button class=\"btn sm\" data-act=\"allglb\">32 model keseluruhan</button></div></div>'\n   +'<div class=\"card\"><h4>Galeri model 3D (Sketchfab)</h4>")
    index.write_text(s)

# Add a compact JSON catalogue for standalone reuse; no prices invented
import json
products=[
 {'id':'corsair-vengeance-rgb-pro-ddr4','brand':'Corsair','name':'VENGEANCE RGB PRO DDR4','category':'ram','compatibility':'DDR4, visual sample compatible with Z170-P DDR4 family','demoOnly':True},
 {'id':'corsair-qx120-rgb','brand':'Corsair','name':'iCUE LINK QX120 RGB','category':'fan','compatibility':'120mm; verify case mount & LINK hub','demoOnly':True},
 {'id':'corsair-h100i-elite-capellix-xt','brand':'Corsair','name':'iCUE H100i ELITE CAPELLIX XT','category':'cooler','compatibility':'Intel LGA115x compatible; radiator clearance F600 unverified','demoOnly':True},
 {'id':'corsair-rm750e-2025','brand':'Corsair','name':'RM750e 2025 ATX','category':'psu','compatibility':'ATX 750 W 140mm length','demoOnly':True},
 {'id':'elgato-stream-deck-mk2','brand':'Elgato','name':'Stream Deck MK.2','category':'peripheral','compatibility':'External USB device','demoOnly':True},
 {'id':'elgato-facecam-mk2','brand':'Elgato','name':'Facecam MK.2','category':'peripheral','compatibility':'External USB webcam','demoOnly':True},
 {'id':'elgato-wave3','brand':'Elgato','name':'Wave:3','category':'peripheral','compatibility':'External USB microphone','demoOnly':True},
 {'id':'elgato-key-light-air-mk2','brand':'Elgato','name':'Key Light Air MK.2','category':'peripheral','compatibility':'External desktop light','demoOnly':True},
]
(R/'public/pclab/brands-3d-catalog.json').write_text(json.dumps({'version':'1.0','source':'original procedural models based on published reference specifications; not manufacturer-owned 3D assets','products':[{**x,'glb':'models/brands/'+x['id']+'.glb'} for x in products]},indent=2,ensure_ascii=False))
print('Patched gallery, simulator, catalogue.')
