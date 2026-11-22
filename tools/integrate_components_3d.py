#!/usr/bin/env python3
"""Patch the real Makmal PC scene (not only an external popup) to load detailed GLBs."""
from pathlib import Path
p=Path(__file__).resolve().parent.parent/'public/pclab/index.html'
s=p.read_text(encoding='utf-8')
needle='function installPart(id,tid,animate){'
assert s.count(needle)==1
patch='''/* =============================================
 * MODE KOMPONEN 3D SEBENAR — eModul-IKR
 * BuildCores dijadikan rujukan visual, bukan sumber model berlesen.
 * Geometri prosedural PBR di GLB tempatan, loading cache + fallback.
 * Semua komponen asal terus berfungsi jika WebGL/file GLB gagal.
 * ============================================= */
var DETAILED_GLB={
 psu:'psu',cpu:'cpu',paste:'thermal-paste',cooler:'cooler-air',coolerL:'cooler-aio',
 ram1:'ram-blue',ram2:'ram-purple',m2:'m2',gpu:'gpu',nic:'nic',hdd:'hdd',ssd:'ssd-sata',
 fanF1:'fan-front',fanF2:'fan-front',fanR:'fan-rear',wifi:'wifi-usb',
 kb:'keyboard',mouse:'mouse',monitor:'monitor',spk:'speaker',lan:'rj45',
 pwr:'ac-plug',wall:'wall-plug'
};
var glbPartLoader=null,glbPartCache={},glbLoadedCount=0;
function detailedModel(id,root,inner){
  var key=DETAILED_GLB[id];if(!key||!THREE.GLTFLoader)return;
  if(!glbPartLoader)glbPartLoader=new THREE.GLTFLoader();
  if(!glbPartCache[key]){
    glbPartCache[key]=new Promise(function(ok,fail){
      glbPartLoader.load('./models/components/'+key+'.glb',ok,undefined,fail);
    });
  }
  glbPartCache[key].then(function(data){
    // Race-condition protection: the user could have reset / removed this component.
    if(!scene||HW.groups[id]!==root||!root.parent)return;
    var model=data.scene.clone(true),t=HW.installed[id],T=TG[t];
    if(!T)return;
    model.name='3D_GLTF_'+id;
    model.traverse(function(obj){if(!obj.isMesh)return;
      obj.userData.partId=id;
      obj.userData.sharedAsset=true;
      obj.castShadow=true;obj.receiveShadow=true;
    });
    var scenePeripheral=(id==='kb'||id==='mouse'||id==='monitor'||id==='spk');
    if(scenePeripheral){
      // Preserve the cable TubeGeometry, replace all former primitive devices.
      root.children.slice().forEach(function(obj){
        if(obj===inner)return;
        if(obj.geometry&&obj.geometry.type==='TubeGeometry')return;
        obj.visible=false;
      });
      if(id==='kb')model.position.set(.8,DK+.12,MZ);
      if(id==='mouse')model.position.set(1.05,DK+.18,-.9);
      if(id==='monitor'){
        model.position.set(-3.4,DK+2.75,MZ);
        model.rotation.y=Math.PI/2;
      }
      if(id==='spk'){
        [-3.7,3.7].forEach(function(off){
          var clone=model.clone(true);
          clone.position.set(-3.4,DK+.90,MZ+off);clone.rotation.y=Math.PI/2;
          root.add(clone);
        });
        model=null;
      }
      if(model)root.add(model);
    }else{
      // The original boxes serve only as fallback until real GLB is ready.
      inner.children.slice().forEach(function(o){o.visible=false;});
      if(id==='fanF1'||id==='fanF2'||id==='fanR')model.rotation.y=Math.PI/2;
      inner.add(model);
    }
    root.userData.detailedGLB=true;
    glbLoadedCount++;
  }).catch(function(err){console.warn('Model GLB komponen '+id+' gagal; model 3D asas kekal.',err);});
}
'''
s=s.replace(needle,patch+needle)
needle="  if(id==='mobo')installZ170Model(root,inner);"
assert s.count(needle)==1
s=s.replace(needle,needle+"\n  else detailedModel(id,root,inner);")
# Avoid disposing shared GLB geometry on reset (multiple fan/ram instances share same materials)
needle='function disposeG(o){o.traverse(function(x){if(x.geometry)x.geometry.dispose();if(x.material&&x.material.dispose)x.material.dispose();});}'
assert s.count(needle)==1
s=s.replace(needle,'function disposeG(o){o.traverse(function(x){if(x.userData&&x.userData.sharedAsset)return;if(x.geometry)x.geometry.dispose();if(x.material&&x.material.dispose)x.material.dispose();});}')
# Add gallery button in the existing component UI
needle="'<div class=\"row2\"><button class=\"btn sm pri\" data-act=\"f600\" title=\"Buka FOIFKIN F600 3D GLB tempatan\">◈ Casing FOIFKIN F600 — 3D GLB</button></div>'"
assert s.count(needle)==1
s=s.replace(needle,needle+"+'<div class=\"row2\"><button class=\"btn sm pri\" data-act=\"allglb\" title=\"Model CPU, RAM, GPU, PSU, SSD, kipas, periferal\">◈ GALERI 3D SEMUA KOMPONEN</button></div>'")
needle="    case 'f600':openF600Viewer();break;"
assert s.count(needle)==1
s=s.replace(needle,needle+"\n    case 'allglb':openAllPartsGallery();break;")
needle='function openF600Viewer(){'
assert s.count(needle)==1
s=s.replace(needle,'''/* Semua model 3D boleh dipilih dan diputar dalam galeri khusus. */
function openAllPartsGallery(){
  $('#modal').hidden=false;
  $('#skt').textContent='Galeri 3D — Semua Komponen Perkakasan';
  $('#skhost').innerHTML='<iframe title="Galeri komponen 3D interaktif" src="./components-3d-viewer.html" loading="eager" style="display:block;width:min(88vw,1120px);height:min(72vh,710px);min-height:350px;border:1px solid var(--line);border-radius:10px;background:#08111b"></iframe><p class="mut" style="margin:7px 0">Pilih komponen di sebelah kiri; seret untuk putar 360° dan skrol untuk zum. Geometri 3D dijana sendiri dan BuildCores dijadikan rujukan visual.</p>';
}
'''+needle)
p.write_text(s,encoding='utf-8')
print('Patched',p, 'size',p.stat().st_size)
