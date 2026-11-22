const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./GLTFLoader-C8-DK8lt.js","./three.module-CpxfkOpo.js","./DRACOLoader-pE_Wp-_z.js","./RoomEnvironment-DPM9jNYH.js"])))=>i.map(i=>d[i]);
import{i as e,n as t,t as n}from"./jsx-runtime-Dk72oS4N.js";import{t as r}from"./circuit-board-CPMT5fBr.js";import{n as i,t as a}from"./memory-stick-BEfRli6m.js";import{t as o}from"./plug-zap-CM9jDi0H.js";import{E as s,M as c,N as l,P as u,y as d}from"./index-D5aLDnph.js";var f={name:`chevron-down`,size:24,node:[[`path`,{d:`m6 9 6 6 6-6`,key:`qrunsl`}]]};f.node;var p=c(f),m={name:`gpu`,size:24,node:[[`path`,{d:`M2 17h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H2`,key:`hpo31w`}],[`path`,{d:`M2 21V3`,key:`1bzk4w`}],[`path`,{d:`M7 17v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3`,key:`5hbqbf`}],[`circle`,{cx:`16`,cy:`11`,r:`2`,key:`qt15rb`}],[`circle`,{cx:`8`,cy:`11`,r:`2`,key:`ssideg`}]]};m.node;var h=c(m),g={name:`layers-2`,size:24,node:[[`path`,{d:`M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z`,key:`15q6uc`}],[`path`,{d:`m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845`,key:`byia6g`}]]};g.node;var _=c(g),v={name:`pc-case`,size:24,node:[[`rect`,{width:`14`,height:`20`,x:`5`,y:`2`,rx:`2`,key:`1uq1d7`}],[`path`,{d:`M15 14h.01`,key:`1kp3bh`}],[`path`,{d:`M9 6h6`,key:`dgm16u`}],[`path`,{d:`M9 10h6`,key:`9gxzsh`}]]};v.node;var y=c(v),b=e(t(),1),x=n(),S={casing:y,kaca:_,mobo:r,penyejuk:d,ram:a,gpu:h,psu:o,kipas:i};function C({parts:e,selected:t,onSelect:n,exploded:r,onExplode:i,spinning:a,onSpin:o,reduced:s,disabled:c}){let l=e.find(({id:e})=>e===t),u=S[t]??d,f=a&&!s,m=f?`Jeda putaran`:`Sambung putaran`;return(0,x.jsxs)(`div`,{className:`pc-tools`,role:`group`,"aria-label":`Kawalan model PC 3D`,children:[(0,x.jsxs)(`label`,{className:`pc-picker`,children:[(0,x.jsxs)(`select`,{"aria-label":`Pilih komponen`,value:l?.id??``,disabled:c,onChange:e=>n(e.target.value||null),children:[(0,x.jsx)(`option`,{value:``,children:`Semua komponen`}),e.map(({id:e,label:t})=>(0,x.jsx)(`option`,{value:e,children:t},e))]}),(0,x.jsxs)(`span`,{className:`pc-tool-face`,"aria-hidden":`true`,children:[(0,x.jsx)(`span`,{className:`pc-part-icon`,children:(0,x.jsxs)(`svg`,{viewBox:`0 0 24 24`,width:`24`,height:`24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,x.jsx)(`path`,{d:`M7 2.5H2.5V7M17 2.5h4.5V7M21.5 17v4.5H17M7 21.5H2.5V17`}),(0,x.jsx)(u,{x:`4.5`,y:`4.5`,width:`15`,height:`15`,strokeWidth:`2`})]})}),(0,x.jsx)(`span`,{className:`pc-tool-label`,children:l?.label??`Pilih komponen`}),(0,x.jsx)(p,{className:`pc-tool-arrow`,size:16})]})]}),(0,x.jsxs)(`button`,{className:`pc-explode`,type:`button`,disabled:c,onClick:i,"data-exploded":r,children:[(0,x.jsxs)(`svg`,{className:`pc-driver`,viewBox:`0 0 24 24`,width:`24`,height:`24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinejoin:`round`,strokeLinecap:`round`,"aria-hidden":`true`,children:[(0,x.jsx)(`path`,{d:`m10.6 11.1 6.8-7.8a2.5 2.5 0 0 1 3.6-.2 2.5 2.5 0 0 1 .3 3.5l-6.9 7.8zM15 9.8l3.5-3.9`}),(0,x.jsx)(`path`,{d:`m11.5 13.1-6 6.7-2.8 1.7 1.2-3.1 6.1-6.8`})]}),(0,x.jsx)(`span`,{children:r?`Pasang semula`:`Bongkar`})]}),(0,x.jsx)(`button`,{className:`pc-spin`,type:`button`,disabled:c||s,onClick:o,"aria-label":m,title:s?`Putaran dijeda mengikut tetapan pergerakan peranti`:m,children:(0,x.jsxs)(`svg`,{viewBox:`0 0 24 24`,width:`24`,height:`24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.6`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,children:[(0,x.jsx)(`path`,{d:`M20.2 16.5a9 9 0 1 1-.8-10.2M20 2.9v4.5h-4.5`}),f?(0,x.jsx)(`path`,{d:`M10.3 8.9v6.2m3.8-6.2v6.2`,strokeWidth:`2.2`}):(0,x.jsx)(`path`,{d:`m10.7 8.6 5 3.5-5 3.4z`,fill:`currentColor`,strokeWidth:`.6`})]})})]})}var w=[{g:`kaca`,re:/^(tempered_glass|glass_)/,off:[.26,0,0]},{g:`gpu`,re:/^gpu_/,off:[.12,0,0]},{g:`penyejuk`,re:/^top_radiator$/,off:[.02,0,.1]},{g:`kipas`,re:/^top_radiator_/,off:[.02,0,.1]},{g:`penyejuk`,re:/^(cpu_(pump|heatspreader|label)|coolant_tube)/,off:[.14,0,0]},{g:`ram`,re:/^ram_(module|heatspreader|rgb)/,off:[.1,0,0]},{g:`psu`,re:/^psu_/,off:[0,0,-.09]},{g:`kipas`,re:/^rear_fan/,off:[0,.09,0]},{g:`kipas`,re:/^side_fan/,off:[0,-.1,0]},{g:`mobo`,re:/^m2_/,off:[.07,0,0]},{g:`mobo`,re:/^(cpu_socket|vrm_|ram_slot|pcie_|motherboard_(pcb|edge|capacitor)|pcb_trace|inner_rgb)/,off:[.04,0,0]},{g:`casing`,re:/^front_(mesh|panel)/,off:[0,-.1,0]},{g:`casing`,re:/^(case_top|top_vent)/,off:[0,0,.07]},{g:`casing`,re:/^rear_panel/,off:[0,.07,0]},{g:`casing`,re:/./,off:[0,0,0]}],T=[{id:`casing`,label:`Casing`},{id:`kaca`,label:`Kaca`},{id:`mobo`,label:`Motherboard`},{id:`penyejuk`,label:`CPU dan AIO`},{id:`ram`,label:`RAM`},{id:`gpu`,label:`GPU`},{id:`psu`,label:`PSU`},{id:`kipas`,label:`Kipas`}];function E(e){let t=e.replace(/^\d+_/,``);for(let e of w)if(e.re.test(t))return{g:e.g,off:e.off};return{g:`casing`,off:[0,0,0]}}const RACK_PARTS=[{id:`rangka`,label:`Rangka Rack`},{id:`pintu`,label:`Pintu Rack`},{id:`kaca`,label:`Panel kaca`},{id:`pelayan`,label:`Unit pelayan`},{id:`kabel`,label:`Kabel rangkaian`},{id:`indikator`,label:`LED status`}];function classifyRack(e){let t=(e||``).toLowerCase();return t.includes(`glass`)?{g:`kaca`,off:[.13,0,.12]}:t.startsWith(`door`)?{g:`pintu`,off:[.18,0,.12]}:t.includes(`server`)?{g:`pelayan`,off:[0,0,.13]}:t.includes(`cable`)?{g:`kabel`,off:[0,0,.16]}:t.includes(`led`)||t.includes(`indicator`)?{g:`indikator`,off:[0,0,.1]}:{g:`rangka`,off:[0,0,0]}}function LegacyD({src:e,className:t=``}){let n=(0,b.useRef)(null),r=(0,b.useRef)(null),i=(0,b.useRef)({explode:!1,spin:!0,hl:null}),a=u(`(prefers-reduced-motion: reduce)`),[o,c]=(0,b.useState)(`idle`),[d,f]=(0,b.useState)(!1),[p,m]=(0,b.useState)(!0),[h,g]=(0,b.useState)(null),[modelIdx,setModelIdx]=(0,b.useState)(0),isRack=modelIdx===1,activeSrc=isRack?`./models/semester-1.glb`:e,activeParts=isRack?RACK_PARTS:T,activeLabel=isRack?`Rack Server 3D`:`PC 3D`,changeModel=dir=>{setModelIdx(old=>(old+dir+2)%2),g(null),f(!1),c(`loading`)};return(0,b.useEffect)(()=>{i.current.explode=d,i.current.spin=p&&!a,i.current.hl=h,i.current.instant=a},[d,p,h,a]),(0,b.useEffect)(()=>{let t=n.current,a=r.current;if(!t||!a)return;let o=!1,s=!1,u=!1,d=0,f=()=>{},p=null,m=()=>{d=0,p&&u&&!document.hidden&&(p(),d=requestAnimationFrame(m))},h=()=>{!d&&p&&u&&!document.hidden&&(d=requestAnimationFrame(m))},g=async()=>{try{let n=await l(()=>import(`./three.module-CpxfkOpo.js`),[],import.meta.url),{GLTFLoader:r}=await l(async()=>{let{GLTFLoader:e}=await import(`./GLTFLoader-C8-DK8lt.js`);return{GLTFLoader:e}},__vite__mapDeps([0,1]),import.meta.url),{DRACOLoader:s}=await l(async()=>{let{DRACOLoader:e}=await import(`./DRACOLoader-pE_Wp-_z.js`);return{DRACOLoader:e}},__vite__mapDeps([2,1]),import.meta.url),{RoomEnvironment:u}=await l(async()=>{let{RoomEnvironment:e}=await import(`./RoomEnvironment-DPM9jNYH.js`);return{RoomEnvironment:e}},__vite__mapDeps([3,1]),import.meta.url);if(o)return;let d=new n.WebGLRenderer({canvas:a,antialias:!0,alpha:!0,powerPreference:`high-performance`});d.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75)),d.toneMapping=n.ACESFilmicToneMapping,d.toneMappingExposure=1.05,d.outputColorSpace=n.SRGBColorSpace;let m=new n.Scene,g=new n.PMREMGenerator(d),_=g.fromScene(new u,.04).texture;m.environment=_;let v=new n.DirectionalLight(16777215,1.1);v.position.set(2,3,2.5),m.add(v);let y=new n.PerspectiveCamera(30,1,.1,50),b=()=>{let e=t.clientWidth||1,n=t.clientHeight||1;d.setSize(e,n,!1),y.aspect=e/n,y.updateProjectionMatrix()};b();let x=new ResizeObserver(()=>{b(),h()});x.observe(t);let S=new s().setDecoderPath(`./draco/`),C=new r().setDRACOLoader(S),w;try{w=await C.loadAsync(activeSrc)}finally{S.dispose()}if(o){d.dispose();return}let T=w.scene;T.rotation.x=isRack?0:-Math.PI/2,T.scale.setScalar(isRack?.51:2.1),T.updateMatrixWorld(!0);let D=new n.Box3().setFromObject(T);T.position.sub(D.getCenter(new n.Vector3)),m.add(T);let O=[],k=[`cyan`,`pink`,`purple`,`blue`,`green`];T.traverse(e=>{if(!e.isMesh)return;e.material=e.material.clone();let t=e.material;t.name===`glass`?(t.transparent=!0,t.opacity=.12,t.depthWrite=!1,t.roughness=.05,t.metalness=0,e.renderOrder=2):k.includes(t.name)?(t.emissive=t.color.clone(),t.emissiveIntensity=1.4):t.roughness=Math.max(t.roughness??.5,.35);let r=isRack?classifyRack(e.name):E(e.name);O.push({mesh:e,base:e.position.clone(),off:new n.Vector3(...r.off),g:r.g,em:t.emissive?t.emissive.clone():null,emI:t.emissiveIntensity??1})});let A=document.createElement(`canvas`);A.width=A.height=128;let j=A.getContext(`2d`),M=j.createRadialGradient(64,64,4,64,64,64);M.addColorStop(0,`rgba(0,0,0,.55)`),M.addColorStop(1,`rgba(0,0,0,0)`),j.fillStyle=M,j.fillRect(0,0,128,128);let N=new n.CanvasTexture(A),P=new n.Mesh(new n.PlaneGeometry(1.5,1.5),new n.MeshBasicMaterial({map:N,transparent:!0,depthWrite:!1}));P.rotation.x=-Math.PI/2,P.position.y=-D.getSize(new n.Vector3).y/2-.025,m.add(P);let F={az:isRack?.55:Math.PI/4,el:.2,r:isRack?3.25:3,drag:!1,lx:0,ly:0,last:0,e:0,hlApplied:null},I=e=>{F.drag=!0,F.lx=e.clientX,F.ly=e.clientY,a.setPointerCapture?.(e.pointerId)},L=e=>{F.drag&&(F.az-=(e.clientX-F.lx)*.008,F.el=Math.min(.9,Math.max(-.1,F.el+(e.clientY-F.ly)*.005)),F.lx=e.clientX,F.ly=e.clientY,F.last=performance.now(),h())},R=()=>{F.drag=!1};a.addEventListener(`pointerdown`,I),a.addEventListener(`pointermove`,L),a.addEventListener(`pointerup`,R),a.addEventListener(`pointercancel`,R);let z=performance.now();p=()=>{let e=performance.now(),t=Math.min((e-z)/1e3,.05);z=e;let n=i.current;n.spin&&!F.drag&&e-F.last>2200&&(F.az+=t*.28);let r=+!!n.explode;F.e=n.instant?r:F.e+(r-F.e)*Math.min(1,t*4.5);for(let e of O)e.mesh.position.copy(e.base).addScaledVector(e.off,F.e*1);if(F.hlApplied!==n.hl){F.hlApplied=n.hl;for(let e of O){let t=e.mesh.material;t.emissive&&(n.hl&&e.g===n.hl?(t.emissive.set(3587755),t.emissiveIntensity=.9):e.em&&(t.emissive.copy(e.em),t.emissiveIntensity=e.emI))}}y.position.set(Math.sin(F.az)*Math.cos(F.el)*F.r,Math.sin(F.el)*F.r,Math.cos(F.az)*Math.cos(F.el)*F.r),y.lookAt(0,0,0),d.render(m,y)},p(),c(`ready`),h(),f=()=>{x.disconnect(),a.removeEventListener(`pointerdown`,I),a.removeEventListener(`pointermove`,L),a.removeEventListener(`pointerup`,R),a.removeEventListener(`pointercancel`,R),T.traverse(e=>{e.isMesh&&(e.geometry?.dispose(),[].concat(e.material||[]).forEach(e=>{Object.values(e).forEach(e=>e&&e.isTexture&&e.dispose()),e.dispose()}))}),P.geometry.dispose(),P.material.dispose(),N.dispose(),_.dispose(),g.dispose(),d.dispose(),d.forceContextLoss?.()}}catch{o||c(`error`)}},_=new IntersectionObserver(e=>{u=e.some(e=>e.isIntersecting),u&&!s&&(s=!0,c(`loading`),g()),h()},{rootMargin:`160px`});_.observe(t);let v=()=>h();return document.addEventListener(`visibilitychange`,v),()=>{o=!0,_.disconnect(),document.removeEventListener(`visibilitychange`,v),d&&cancelAnimationFrame(d),p=null,f()}},[activeSrc,isRack]),(0,x.jsxs)(`div`,{className:`pp-stage `+t,children:[(0,x.jsxs)(`div`,{ref:n,className:`pp-stage-canvas`,"data-status":o,children:[(0,x.jsx)(`canvas`,{ref:r,className:`pp-canvas`,"aria-label":`${activeLabel}. Seret untuk memutar.`,role:`img`}),(0,x.jsxs)(`nav`,{className:`pp-model-nav`,"aria-label":`Tukar model 3D`,children:[(0,x.jsx)(`button`,{type:`button`,className:`pp-model-arrow pp-model-prev`,"aria-label":`Model sebelumnya`,title:`Model sebelumnya`,onClick:()=>changeModel(-1),children:(0,x.jsx)(`span`,{"aria-hidden":`true`,children:`‹`})}),(0,x.jsx)(`button`,{type:`button`,className:`pp-model-arrow pp-model-next`,"aria-label":`Model seterusnya`,title:`Model seterusnya`,onClick:()=>changeModel(1),children:(0,x.jsx)(`span`,{"aria-hidden":`true`,children:`›`})}),(0,x.jsxs)(`span`,{className:`pp-model-indicator`,"aria-live":`polite`,children:[(0,x.jsx)(`b`,{children:activeLabel}),(0,x.jsx)(`i`,{children:`${modelIdx+1} / 2`})]})]}),o!==`ready`&&(0,x.jsx)(`div`,{className:`pp-stage-fallback`,role:`status`,children:o===`error`?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s,{className:`size-8`,"aria-hidden":`true`}),(0,x.jsx)(`p`,{children:`Model 3D tidak dapat dipaparkan pada peranti ini. Makmal PC 3D masih boleh dibuka.`})]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(`span`,{className:`pp-spinner`,"aria-hidden":`true`}),(0,x.jsx)(`p`,{children:`Memuatkan model 3D...`})]})})]}),(0,x.jsx)(C,{parts:activeParts,selected:h,onSelect:g,exploded:d,onExplode:()=>f(e=>!e),spinning:p&&!a,onSpin:()=>m(e=>!e),reduced:a,disabled:o!==`ready`})]})}export{D as default};
const classify=E;
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

function D({src:source,className:className=''}) {
 const wrapRef=b.useRef(null), canvasRef=b.useRef(null), engineRef=b.useRef(null), modelRef=b.useRef(0);
 const controls=b.useRef({explode:false,spin:true,hl:null,instant:false});
 const reduced=u('(prefers-reduced-motion: reduce)');
 const [status,setStatus]=b.useState('idle'),[problem,setProblem]=b.useState('');
 const [exploded,setExploded]=b.useState(false),[spin,setSpin]=b.useState(true),[hl,setHl]=b.useState(null),[modelIndex,setModelIndex]=b.useState(0);
 modelRef.current=modelIndex;
 const rack=modelIndex===1,label=rack?'Rack Server 3D':'PC 3D';
 const parts=rack?RACK_PARTS:T;
 const changeModel=direction=>{setModelIndex(i=>(i+direction+2)%2);setHl(null);setExploded(false);setStatus('loading');setProblem('');};
 b.useEffect(()=>{controls.current={explode:exploded,spin:spin&&!reduced,hl,instant:reduced}},[exploded,spin,hl,reduced]);
 b.useEffect(()=>{
  let stopped=false;
  const boot=async()=>{
   try {
    const [THREE,{GLTFLoader}]=await Promise.all([import('./three.module-CpxfkOpo.js'),import('./GLTFLoader-C8-DK8lt.js')]);
    if(stopped)return;
    const eng=createHeroEngine(THREE,GLTFLoader,{
     canvas:canvasRef.current,wrap:wrapRef.current,getControls:()=>controls.current,
     onStatus:t=>{if(!stopped)setStatus(t)},
     onFailure:(message,error)=>{if(!stopped){console.error('[eSL-IKR Hero3D]',error||message);setProblem(message);setStatus('error')}},
     urls:[source,new URL('../models/semester-1.glb',import.meta.url).href],
    });
    engineRef.current=eng;
    await eng.select(modelRef.current);
   } catch(error) {
    if(!stopped){console.error('[eSL-IKR] WebGL init failed',error);setProblem('WebGL gagal dimulakan. Gambar sandaran ditunjukkan.');setStatus('error')}
   }
  };
  boot();
  return ()=>{stopped=true;engineRef.current?.destroy();engineRef.current=null};
 },[source]);
 b.useEffect(()=>{if(engineRef.current){setProblem('');engineRef.current.select(modelIndex)}},[modelIndex]);
 const image=rack?new URL('../models/rack-server-preview.png',import.meta.url).href:new URL('../models/gaming-pc-preview.png',import.meta.url).href;
 const fallback=status!=='ready' ? (0,x.jsx)('div',{className:'pp-stage-fallback',role:'status',children:status==='error'?(0,x.jsxs)(x.Fragment,{children:[
  (0,x.jsx)('img',{className:'pp-model-preview',src:image,alt:`Pratonton ${label} daripada model GLB`}),
  (0,x.jsxs)('p',{className:'pp-model-warning',children:[problem||'Paparan 3D tidak dapat diaktifkan.',(0,x.jsx)('small',{children:'Ini gambar sandaran, bukan paparan interaktif.'})]}),
  (0,x.jsx)('button',{type:'button',className:'pp-model-retry',onClick:()=>engineRef.current?engineRef.current.select(modelIndex):window.location.reload(),children:'Cuba semula'})
 ]}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)('span',{className:'pp-spinner','aria-hidden':'true'}),(0,x.jsx)('p',{children:`Memuatkan ${label}...`})]})}) : null;
 return (0,x.jsxs)('div',{className:'pp-stage '+className,children:[
  (0,x.jsxs)('div',{ref:wrapRef,className:'pp-stage-canvas','data-status':status,children:[
   (0,x.jsx)('canvas',{ref:canvasRef,className:'pp-canvas',role:'img','aria-label':`${label}. Seret untuk memutar.`}),
   (0,x.jsxs)('nav',{className:'pp-model-nav','aria-label':'Tukar model 3D',children:[
    (0,x.jsx)('button',{type:'button',className:'pp-model-arrow pp-model-prev','aria-label':'Model sebelumnya',onClick:()=>changeModel(-1),children:(0,x.jsx)('span',{'aria-hidden':'true',children:'‹'})}),
    (0,x.jsx)('button',{type:'button',className:'pp-model-arrow pp-model-next','aria-label':'Model seterusnya',onClick:()=>changeModel(1),children:(0,x.jsx)('span',{'aria-hidden':'true',children:'›'})}),
    (0,x.jsxs)('span',{className:'pp-model-indicator','aria-live':'polite',children:[(0,x.jsx)('b',{children:label}),(0,x.jsx)('i',{children:`${modelIndex+1} / 2`})]})
   ]}),fallback
  ]}),
  (0,x.jsx)(C,{parts,selected:hl,onSelect:setHl,exploded,onExplode:()=>setExploded(v=>!v),spinning:spin&&!reduced,onSpin:()=>setSpin(v=>!v),reduced,disabled:status!=='ready'})
 ]});
}
