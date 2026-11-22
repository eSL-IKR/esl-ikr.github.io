import { useEffect, useRef, useState } from 'react';
import PCModelControls from './PCModelControls';
import './pc-model-controls.css';
import { useMedia } from './components/ui/use-media';

// Pemapar model GLB PC gaming. Three.js dimuat secara malas (hanya apabila bahagian ini
// kelihatan) supaya skrin pertama portal kekal ringan pada data mudah alih.

// Setiap bahagian model dimasukkan ke satu kumpulan (untuk sorotan dan bongkar).
// "off" ialah anjakan bongkar dalam koordinat asal model (meter): x = sisi kaca, y = dalam, z = atas.
const RULES = [
  { g: 'kaca', re: /^(tempered_glass|glass_)/, off: [0.26, 0, 0] },
  { g: 'gpu', re: /^gpu_/, off: [0.12, 0, 0] },
  { g: 'penyejuk', re: /^top_radiator$/, off: [0.02, 0, 0.1] },
  { g: 'kipas', re: /^top_radiator_/, off: [0.02, 0, 0.1] },
  { g: 'penyejuk', re: /^(cpu_(pump|heatspreader|label)|coolant_tube)/, off: [0.14, 0, 0] },
  { g: 'ram', re: /^ram_(module|heatspreader|rgb)/, off: [0.1, 0, 0] },
  { g: 'psu', re: /^psu_/, off: [0, 0, -0.09] },
  { g: 'kipas', re: /^rear_fan/, off: [0, 0.09, 0] },
  { g: 'kipas', re: /^side_fan/, off: [0, -0.1, 0] },
  { g: 'mobo', re: /^m2_/, off: [0.07, 0, 0] },
  { g: 'mobo', re: /^(cpu_socket|vrm_|ram_slot|pcie_|motherboard_(pcb|edge|capacitor)|pcb_trace|inner_rgb)/, off: [0.04, 0, 0] },
  { g: 'casing', re: /^front_(mesh|panel)/, off: [0, -0.1, 0] },
  { g: 'casing', re: /^(case_top|top_vent)/, off: [0, 0, 0.07] },
  { g: 'casing', re: /^rear_panel/, off: [0, 0.07, 0] },
  { g: 'casing', re: /./, off: [0, 0, 0] },
];

const HERO_PC_PARTS = [
  { id: 'casing', label: 'Casing' },
  { id: 'kaca', label: 'Kaca' },
  { id: 'mobo', label: 'Motherboard' },
  { id: 'penyejuk', label: 'CPU dan AIO' },
  { id: 'ram', label: 'RAM' },
  { id: 'gpu', label: 'GPU' },
  { id: 'psu', label: 'PSU' },
  { id: 'kipas', label: 'Kipas' },
];

// Rack Server GLB ini sudah wujud dalam projek asal: public/models/semester-1.glb.
// Fail RACK SERVER 3D.zip yang dimuat naik hanya mengandungi dua folder kosong.
const RACK_MODEL_URL = `${import.meta.env.BASE_URL}models/semester-1.glb`;
const RACK_PARTS = [
  { id: 'rangka', label: 'Rangka Rack' },
  { id: 'pintu', label: 'Pintu Rack' },
  { id: 'kaca', label: 'Panel kaca' },
  { id: 'pelayan', label: 'Unit pelayan' },
  { id: 'kabel', label: 'Kabel rangkaian' },
  { id: 'indikator', label: 'LED status' },
];

function classifyRack(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('glass')) return { g: 'kaca', off: [0.13, 0, 0.12] };
  if (n.startsWith('door')) return { g: 'pintu', off: [0.18, 0, 0.12] };
  if (n.includes('server')) return { g: 'pelayan', off: [0, 0, 0.13] };
  if (n.includes('cable')) return { g: 'kabel', off: [0, 0, 0.16] };
  if (n.includes('led') || n.includes('indicator')) return { g: 'indikator', off: [0, 0, 0.1] };
  return { g: 'rangka', off: [0, 0, 0] };
}

function classify(name) {
  const n = name.replace(/^\d+_/, '');
  for (const r of RULES) if (r.re.test(n)) return { g: r.g, off: r.off };
  return { g: 'casing', off: [0, 0, 0] };
}

// One persistent renderer for both carousel models. Swapping GLB never destroys WebGL.
function createHeroEngine(THREE, GLTFLoader, options) {
  const { canvas, wrap, getControls, onStatus, onFailure, urls } = options;
  const small = window.matchMedia?.('(max-width: 600px)').matches ?? false;
  const renderer = new THREE.WebGLRenderer({
    canvas, alpha: true, antialias: !small,
    powerPreference: 'default', preserveDrawingBuffer: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.25 : 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0xe3f0ff, 0x304456, 2));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(3.2, 4.3, 6.5); scene.add(key);
  const fill = new THREE.DirectionalLight(0xb0d7ff, 1.1);
  fill.position.set(-3, 2, -2); scene.add(fill);
  const camera = new THREE.PerspectiveCamera(30, 1, 0.05, 60);
  let destroyed = false, lost = false, active = null, requestId = 0, raf = 0, visible = true;
  let framePrev = performance.now();
  const loaded = new Map();
  const loader = new GLTFLoader(); // Both bundled GLB files use ordinary glTF, without Draco.
  const orbit = { az: Math.PI/4, el: 0.2, r: 3.1, dragging: false, px: 0, py: 0, last: 0, explode: 0, applied: undefined };

  // One subtle contact shadow under whichever model is selected.
  const shadowCanvas = document.createElement('canvas'); shadowCanvas.width = shadowCanvas.height = 128;
  const g = shadowCanvas.getContext('2d');
  const gradient = g.createRadialGradient(64,64,2,64,64,64);
  gradient.addColorStop(0,'rgba(0,0,0,.48)'); gradient.addColorStop(1,'rgba(0,0,0,0)');
  g.fillStyle = gradient; g.fillRect(0,0,128,128);
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1.6,1.6), new THREE.MeshBasicMaterial({map:shadowTexture,transparent:true,depthWrite:false}));
  shadow.rotation.x = -Math.PI/2; scene.add(shadow);

  const resize = () => {
    if (destroyed) return;
    const w = Math.max(1,wrap.clientWidth), h = Math.max(1,wrap.clientHeight);
    renderer.setSize(w,h,false); camera.aspect = w/h; camera.updateProjectionMatrix();
    draw();
  };
  const draw = () => {
    if (destroyed || lost || !active) return;
    try { renderer.render(scene,camera); }
    catch (error) { lost = true; onFailure('WebGL gagal melukis model. Cuba segarkan halaman.',error); }
  };
  const step = time => {
    raf = 0;
    if (destroyed || lost || !visible || !active || document.hidden) return;
    const dt = Math.min((time-framePrev)/1000,0.05); framePrev=time;
    const c = getControls();
    if (c.spin && !orbit.dragging && time-orbit.last > 2200) orbit.az += dt*0.28;
    const target = c.explode ? 1 : 0;
    orbit.explode = c.instant ? target : orbit.explode+(target-orbit.explode)*Math.min(1,dt*4.5);
    for (const part of active.parts) part.mesh.position.copy(part.base).addScaledVector(part.off,orbit.explode);
    if (orbit.applied !== c.hl) {
      orbit.applied = c.hl;
      for (const part of active.parts) {
        const m = part.mesh.material;
        if (!m.emissive) continue;
        if (c.hl && part.g === c.hl) { m.emissive.set(0x36beab); m.emissiveIntensity = .9; }
        else if (part.em) { m.emissive.copy(part.em); m.emissiveIntensity=part.emI; }
      }
    }
    camera.position.set(Math.sin(orbit.az)*Math.cos(orbit.el)*orbit.r, Math.sin(orbit.el)*orbit.r,Math.cos(orbit.az)*Math.cos(orbit.el)*orbit.r);
    camera.lookAt(0,0,0); draw();
    raf = requestAnimationFrame(step);
  };
  const resume = () => { if (!raf && !destroyed && !lost && visible && active && !document.hidden) { framePrev=performance.now();raf=requestAnimationFrame(step); }};
  const down = e => { orbit.dragging=true;orbit.px=e.clientX;orbit.py=e.clientY;try{canvas.setPointerCapture(e.pointerId)}catch{} };
  const move = e => { if(!orbit.dragging)return;orbit.az -= (e.clientX-orbit.px)*.008;orbit.el=Math.min(.9,Math.max(-.1,orbit.el+(e.clientY-orbit.py)*.005));orbit.px=e.clientX;orbit.py=e.clientY;orbit.last=performance.now();resume(); };
  const up = () => { orbit.dragging=false; };
  const contextLost = e => { e.preventDefault();lost=true;cancelAnimationFrame(raf);raf=0;onFailure('Konteks WebGL terhenti. Segarkan halaman untuk memulihkannya.'); };
  canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);
  canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
  canvas.addEventListener('webglcontextlost',contextLost);
  const observer = typeof IntersectionObserver==='function' ? new IntersectionObserver(entries=>{ visible=entries.some(x=>x.isIntersecting);if(visible)resume();else{cancelAnimationFrame(raf);raf=0;}},{rootMargin:'160px'}) : null;
  observer?.observe(wrap);
  const onVis = () => resume(); document.addEventListener('visibilitychange',onVis);
  const ro = typeof ResizeObserver==='function' ? new ResizeObserver(resize) : null;
  ro?.observe(wrap);window.addEventListener('resize',resize);resize();

  async function getModel(index) {
    if (loaded.has(index)) return loaded.get(index);
    const url = urls[index];
    const gltf = await loader.loadAsync(url);
    if (destroyed) return null;
    const root = gltf.scene;
    root.rotation.x = index === 1 ? 0 : -Math.PI/2;
    root.scale.setScalar(index === 1 ? .51 : 2.1);
    root.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(root);
    const height = bounds.getSize(new THREE.Vector3()).y;
    root.position.sub(bounds.getCenter(new THREE.Vector3()));
    root.updateMatrixWorld(true);
    const parts = [];
    const rgbNames = ['cyan','pink','purple','blue','green'];
    root.traverse(object => {
      if (!object.isMesh) return;
      if (Array.isArray(object.material)) {
        object.material = object.material.map(m => m.clone());
      } else if (object.material) object.material = object.material.clone();
      const material = Array.isArray(object.material) ? object.material[0] : object.material;
      if (!material) return;
      if (material.name === 'glass') {
        material.transparent=true;material.opacity=.12;material.depthWrite=false;
        material.roughness=.05;material.metalness=0;object.renderOrder=2;
      } else if(rgbNames.includes(material.name)) {
        material.emissive=material.color.clone();material.emissiveIntensity=1.4;
      } else material.roughness=Math.max(material.roughness ?? .5,.35);
      const cl=index===1?classifyRack(object.name):classify(object.name);
      parts.push({mesh:object,base:object.position.clone(),off:new THREE.Vector3(...cl.off),g:cl.g,em:material.emissive?.clone()??null,emI:material.emissiveIntensity??1});
    });
    const item = { root, parts, height };
    loaded.set(index,item); return item;
  }
  async function select(index){
    if(destroyed)return;
    const id=++requestId;
    onStatus('loading');
    try {
      const model=await getModel(index);
      if(destroyed || id!==requestId || !model)return;
      if(active)scene.remove(active.root);
      active=model;scene.add(model.root);
      shadow.position.y=-model.height/2-.025;
      orbit.az=index===1?.55:Math.PI/4;orbit.el=.2;orbit.r=index===1?3.35:3;
      orbit.explode=0;orbit.applied=undefined;orbit.dragging=false;orbit.last=performance.now();
      camera.position.set(Math.sin(orbit.az)*Math.cos(orbit.el)*orbit.r,Math.sin(orbit.el)*orbit.r,Math.cos(orbit.az)*Math.cos(orbit.el)*orbit.r);
      camera.lookAt(0,0,0);
      draw();onStatus('ready');resume();
    }catch(error){
      if(destroyed || id!==requestId)return;
      console.error('[eSL-IKR] Gagal memuatkan GLB',urls[index],error);
      let reason = error?.message || String(error);
      if(/404|not found|fetch|network/i.test(reason))reason='Fail GLB tidak ditemui. Semak folder models/ dalam projek.';
      else if(/webgl|context/i.test(reason))reason='WebGL tidak dapat dimulakan pada pelayar ini.';
      else reason='Model tidak berjaya dimuatkan. Cuba semula atau periksa Console.';
      onFailure(reason,error);
    }
  }
  function destroy(){
    destroyed=true;requestId++;cancelAnimationFrame(raf);
    observer?.disconnect();ro?.disconnect();window.removeEventListener('resize',resize);
    document.removeEventListener('visibilitychange',onVis);
    canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);
    canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',up);
    canvas.removeEventListener('webglcontextlost',contextLost);
    for(const {root} of loaded.values())root.traverse(o=>{if(o.isMesh){o.geometry?.dispose();for(const m of [].concat(o.material??[])){if(m){for(const v of Object.values(m))if(v?.isTexture)v.dispose();m.dispose?.()}}}});
    shadow.geometry.dispose();shadow.material.dispose();shadowTexture.dispose();renderer.dispose();
    // Do not call renderer.forceContextLoss(): switching models now never creates a new context.
  }
  return {select,destroy};
}
export default function HeroModel3D({src,className = ''}) {
 const wrapRef=useRef(null), canvasRef=useRef(null), engineRef=useRef(null), modelIndexRef=useRef(0);
 const ctl=useRef({explode:false,spin:true,hl:null,instant:false});
 const reduced=useMedia('(prefers-reduced-motion: reduce)');
 const [status,setStatus]=useState('idle'), [problem,setProblem]=useState('');
 const [exploded,setExploded]=useState(false),[spin,setSpin]=useState(true),[hl,setHl]=useState(null),[modelIndex,setModelIndex]=useState(0);
 modelIndexRef.current=modelIndex;
 const isRack=modelIndex===1, modelParts=isRack?RACK_PARTS:HERO_PC_PARTS, modelLabel=isRack?'Rack Server 3D':'PC 3D';
 const onFailure=(message,error)=>{if(error)console.error('[eSL-IKR Hero3D]',error);setProblem(message);setStatus('error');};
 const changeModel=direction=>{setModelIndex(old=>(old+direction+2)%2);setHl(null);setExploded(false);setStatus('loading');setProblem('');};
 useEffect(()=>{ctl.current={explode:exploded,spin:spin&&!reduced,hl,instant:reduced};},[exploded,spin,hl,reduced]);
 useEffect(()=>{
   let stopped=false;
   const boot=async()=>{
     try{
       const [THREE,{GLTFLoader}]=await Promise.all([import('three'),import('three/examples/jsm/loaders/GLTFLoader.js')]);
       if(stopped)return;
       const engine=createHeroEngine(THREE,GLTFLoader,{
          canvas:canvasRef.current,wrap:wrapRef.current,getControls:()=>ctl.current,
          onStatus:next=>{if(!stopped)setStatus(next)},
          onFailure:(text,err)=>{if(!stopped){console.error('[eSL-IKR Hero3D]',err||text);setProblem(text);setStatus('error')}},
          urls:[src,RACK_MODEL_URL],
       });
       engineRef.current=engine;
       await engine.select(modelIndexRef.current);
     }catch(error){if(!stopped)onFailure('WebGL gagal dimulakan. Gambar pratonton ditunjukkan.',error)}
   };
   boot();
   return ()=>{stopped=true;engineRef.current?.destroy();engineRef.current=null;};
 },[src]);
 useEffect(()=>{if(engineRef.current){setProblem('');engineRef.current.select(modelIndex);}},[modelIndex]);
 const preview=isRack?`${import.meta.env.BASE_URL}models/rack-server-preview.png`:`${import.meta.env.BASE_URL}models/gaming-pc-preview.png`;
 return <div className={'pp-stage '+className}>
   <div ref={wrapRef} className="pp-stage-canvas" data-status={status}>
     <canvas ref={canvasRef} className="pp-canvas" role="img" aria-label={`${modelLabel}. Seret untuk memutar.`}/>
     <nav className="pp-model-nav" aria-label="Tukar model 3D">
       <button type="button" className="pp-model-arrow pp-model-prev" aria-label="Model sebelumnya" onClick={()=>changeModel(-1)}><span aria-hidden="true">‹</span></button>
       <button type="button" className="pp-model-arrow pp-model-next" aria-label="Model seterusnya" onClick={()=>changeModel(1)}><span aria-hidden="true">›</span></button>
       <span className="pp-model-indicator" aria-live="polite"><b>{modelLabel}</b><i>{modelIndex+1} / 2</i></span>
     </nav>
     {status!=='ready' && <div className="pp-stage-fallback" role="status">
       {status==='error'?<><img className="pp-model-preview" src={preview} alt={`Pratonton ${modelLabel} daripada model GLB`} />
         <p className="pp-model-warning">{problem||'Paparan 3D tidak dapat diaktifkan.'} <small>Ini gambar sandaran, bukan paparan interaktif.</small></p>
         <button className="pp-model-retry" type="button" onClick={()=>engineRef.current?engineRef.current.select(modelIndex):window.location.reload()}>Cuba semula</button>
       </>:<><span className="pp-spinner" aria-hidden="true"/><p>Memuatkan {modelLabel}...</p></>}
     </div>}
   </div>
   <PCModelControls parts={modelParts} selected={hl} onSelect={setHl} exploded={exploded} onExplode={()=>setExploded(v=>!v)} spinning={spin&&!reduced} onSpin={()=>setSpin(v=>!v)} reduced={reduced} disabled={status!=='ready'}/>
 </div>;
}
