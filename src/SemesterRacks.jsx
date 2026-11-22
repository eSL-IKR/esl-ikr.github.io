import { useEffect, useRef, useState } from 'react';
import { useMedia } from './components/ui/use-media';
import './semester-racks.css';

/* Model gabungan 3 rack (letak dalam public/models/). Rack 1 = biru, 2 = hijau, 3 = ungu. */
const MODEL_FILE = 'models/Rack_Server_3_Semester_Pintu.glb';
const ACCENT = [[.16, .40, .78], [.16, .68, .51], [.53, .30, .72]];

// <STAGE>
/* Satu adegan 3D untuk ketiga-tiga rack: lantai berpantulan, cahaya berwarna, berkas cahaya & habuk. */
function createRackStage(T, gltfScene, canvas, opts = {}) {
  const { makeEnv = null, reduced = false } = opts;
  const FOV = 30, CY = -.28, TILT = [.16, 0, -.16], CT = 4.2;
  const ADD = { blending: T.CustomBlending, blendEquation: T.AddEquation, blendSrc: T.OneFactor, blendDst: T.OneFactor, blendSrcAlpha: T.ZeroFactor, blendDstAlpha: T.OneFactor }; /* tambah cahaya tanpa mengubah alpha kanvas */
  const color = a => { const c = new T.Color(a[0], a[1], a[2]); return c; };
  const renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.92;
  renderer.physicallyCorrectLights = true;
  if ('outputColorSpace' in renderer) renderer.outputColorSpace = T.SRGBColorSpace;
  else renderer.outputEncoding = T.sRGBEncoding;
  const scene = new T.Scene();
  let envDispose = null;
  if (makeEnv) { const e = makeEnv(renderer); envDispose = e.dispose; scene.environment = e.texture; if ('environmentIntensity' in scene) scene.environmentIntensity = .35; }

  /* kumpul rack (nod RackGroup_<n>) dan engsel pintu (DoorHinge_<n>) */
  const find = (root, name) => { let f = null; root.traverse(o => { if (o.name === name) f = o; }); return f; };
  const holders = [], mirrors = [], hinges = [], mirrorMats = [];
  [1, 2, 3].forEach((n, i) => {
    const src = find(gltfScene, 'RackGroup_' + n);
    src.parent && src.parent.remove(src); src.position.set(0, 0, 0);
    const mirror = src.clone(true);
    mirror.traverse(o => {
      if (!o.isMesh) return;
      o.material = o.material.clone(); o.material.side = T.DoubleSide; mirrorMats.push(o.material);
      if (o.material.transparent) o.renderOrder = -2;
    });
    const holder = new T.Group(), pivot = new T.Group();           /* model Z-atas -> Y-atas */
    pivot.rotation.x = -Math.PI / 2; pivot.position.z = CY; holder.rotation.y = TILT[i]; holder.add(pivot); pivot.add(src);
    const mh = new T.Group(), mp = new T.Group();
    mp.rotation.x = -Math.PI / 2; mp.position.z = CY; mh.rotation.y = TILT[i]; mh.add(mp); mp.add(mirror);
    const mg = new T.Group(); mg.scale.y = -1; mg.add(mh);
    scene.add(holder); scene.add(mg); holders.push(holder); mirrors.push(mg);
    hinges.push([find(src, 'DoorHinge_' + n), find(mirror, 'DoorHinge_' + n)]);
  });

  /* lampu */
  const accent = ACCENT.map(color);
  scene.add(new T.HemisphereLight(0xdde8ff, 0x243454, 1.15));
  const key = new T.DirectionalLight(0xf0f6ff, 2.0); key.position.set(-3, 5, 5); scene.add(key);
  const lights = [];
  accent.forEach((c, i) => {
    const front = new T.PointLight(c, 8, 0, 2), rim = new T.PointLight(c, 13, 0, 2);
    scene.add(front); scene.add(rim); lights.push({ front, rim, i });
  });

  /* lantai */
  const rc = accent.map(c => new T.Vector3(c.r, c.g, c.b)), rp = [0, 1, 2].map(() => new T.Vector2());
  const uni = { uRC: { value: rc.map(c => c.clone().multiplyScalar(1)) }, uRP: { value: rp }, uBoost: { value: [0, 0, 0] }, uTime: { value: 0 } };
  const floor = new T.Mesh(new T.PlaneGeometry(36, 36).rotateX(-Math.PI / 2), new T.ShaderMaterial({
    transparent: true, depthWrite: false, uniforms: uni,
    vertexShader: 'varying vec3 vW;void main(){vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
    fragmentShader: `varying vec3 vW;uniform vec3 uRC[3];uniform vec2 uRP[3];uniform float uBoost[3];uniform float uTime;
void main(){vec3 P=vW;vec3 V=normalize(cameraPosition-P);float fr=pow(1.-clamp(V.y,0.,1.),2.2);
vec3 c=vec3(.03,.05,.1);vec2 g=abs(fract(P.xz-.5)-.5)/fwidth(P.xz);float ln=1.-min(min(g.x,g.y),1.);
float rr=length(P.xz);c+=vec3(.08,.14,.26)*ln*.4*smoothstep(11.,1.5,rr);
vec3 pool=vec3(0.);float dm=9.;
for(int i=0;i<3;i++){vec2 d=P.xz-uRP[i];float l=length(d*vec2(1.,1.15));dm=min(dm,l);float b=1.+uBoost[i]*.9;
pool+=uRC[i]*(exp(-l*l*.55)*.17+exp(-pow((l-1.02)*9.,2.))*(.42+.10*sin(uTime*.9+float(i)*2.))+exp(-l*.7)*.04)*b;}
c+=pool;float coverage=0.;for(int i=0;i<3;i++){float r=length((P.xz-uRP[i])*vec2(1.,1.15));coverage=max(coverage,1.-smoothstep(1.7,3.5,r));}float a=coverage*(.22+.22*fr);
c=c/(1.+c*.25);gl_FragColor=vec4(c,min(a,1.));}`
  }));
  floor.renderOrder = -1; scene.add(floor);

  /* berkas cahaya */
  const coneGeo = new T.CylinderGeometry(.05, 1.35, CT, 56, 1, true).translate(0, CT / 2, 0);
  const cones = accent.map((c, i) => {
    const m = new T.Mesh(coneGeo, new T.ShaderMaterial({
      transparent: true, depthWrite: false, ...ADD, side: T.DoubleSide,
      uniforms: { uCol: { value: rc[i] }, uBoost: { value: 0 }, uTop: { value: CT } },
      vertexShader: 'varying vec3 vW;varying vec3 vN;void main(){vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;vN=normalize(mat3(modelMatrix)*normal);gl_Position=projectionMatrix*viewMatrix*w;}',
      fragmentShader: `varying vec3 vW;varying vec3 vN;uniform vec3 uCol;uniform float uBoost,uTop;
void main(){vec3 V=normalize(cameraPosition-vW);float h=clamp(vW.y/uTop,0.,1.);float e=pow(abs(dot(normalize(vN),V)),1.7);
float a=pow(1.-h,1.7)*smoothstep(0.,.08,h+.02)*e*(.22+uBoost*.18);gl_FragColor=vec4(uCol*a*.26,0.);}`
    }));
    m.renderOrder = 1; scene.add(m); return m;
  });

  /* habuk */
  const ND = 260, dp = new Float32Array(ND * 3), dph = new Float32Array(ND);
  for (let k = 0; k < ND; k++) { dp[k * 3] = (Math.random() - .5) * 8; dp[k * 3 + 1] = Math.random() * CT; dp[k * 3 + 2] = -2 + Math.random() * 4; dph[k] = Math.random(); }
  const dg = new T.BufferGeometry(); dg.setAttribute('position', new T.BufferAttribute(dp, 3)); dg.setAttribute('aPh', new T.BufferAttribute(dph, 1));
  const dustU = { uTime: uni.uTime, uPx: { value: 400 }, uRC: uni.uRC, uSpan: { value: 2.4 } };
  const dust = new T.Points(dg, new T.ShaderMaterial({
    transparent: true, depthWrite: false, ...ADD, uniforms: dustU,
    vertexShader: `attribute float aPh;uniform float uTime,uPx,uSpan;uniform vec3 uRC[3];varying vec3 vC;varying float vA;
void main(){float s=.5+fract(aPh*3.);vec3 p=position;p.x*=uSpan/2.4;p.x+=sin(uTime*.35*s+aPh*40.)*.35;p.z+=cos(uTime*.3*s+aPh*23.)*.3;p.y=mod(position.y+uTime*.05*s,${CT.toFixed(1)});
int i=p.x<-uSpan*.4?0:(p.x>uSpan*.4?2:1);vC=uRC[i]*1.15+.18;gl_Position=projectionMatrix*viewMatrix*vec4(p,1.);
gl_PointSize=uPx*(.012+.016*fract(aPh*5.))/gl_Position.w;vA=(.35+.65*abs(sin(uTime*.9*s+aPh*30.)))*smoothstep(0.,.5,p.y)*smoothstep(${CT.toFixed(1)},3.4,p.y);}`,
    fragmentShader: 'varying vec3 vC;varying float vA;void main(){float d=length(gl_PointCoord-.5)*2.;float k=smoothstep(1.,0.,d);gl_FragColor=vec4(vC*k*k*vA*.5,0.);}'
  }));
  dust.frustumCulled = false; dust.renderOrder = 2; scene.add(dust);

  /* kamera + susun atur */
  const camera = new T.PerspectiveCamera(FOV, 1, .1, 80);
  const tg = new T.Vector3(0, .95, 0);
  let S = 2.4, D = 5.6, W = 1, H = 1;
  const boxes = [new T.Box3(), new T.Box3(), new T.Box3()];
  function layout() {
    const asp = W / H, th = Math.tan(FOV * Math.PI / 360);
    S = Math.max(1.3, .667 * 5.6 * th * asp); D = Math.max(5.6, (S + .62) / (th * asp));
    camera.aspect = asp; camera.updateProjectionMatrix();
    holders.forEach((h, i) => {
      h.position.x = (i - 1) * S; mirrors[i].position.x = (i - 1) * S; rp[i].set((i - 1) * S, 0);
      lights[i].front.position.set((i - 1) * S, 2.7, 3.3); lights[i].rim.position.set((i - 1) * S * 1.1, 1.8, -2.2);
      cones[i].position.set((i - 1) * S, 0, 0);
      boxes[i].set(new T.Vector3((i - 1) * S - .6, 0, -.85), new T.Vector3((i - 1) * S + .6, 2.1, .85));
    });
    dustU.uSpan.value = S; dustU.uPx.value = H * renderer.getPixelRatio() / (2 * th);
  }
  function setSize(w, h) { W = Math.max(2, w); H = Math.max(2, h); renderer.setSize(W, H, false); layout(); }

  const ray = new T.Raycaster(), hit = new T.Vector3();
  function pick(clientX, clientY) {
    const r = canvas.getBoundingClientRect();
    ray.setFromCamera(new T.Vector2(((clientX - r.left) / r.width) * 2 - 1, 1 - ((clientY - r.top) / r.height) * 2), camera);
    let best = -1, bd = 1e9;
    boxes.forEach((b, i) => { if (ray.ray.intersectBox(b, hit)) { const d = hit.distanceTo(ray.ray.origin); if (d < bd) { bd = d; best = i; } } });
    return best;
  }

  /* gelung lukisan */
  const boost = [0, 0, 0], door = [0, 0, 0], DOOR_OPEN = 1.3; let target = -1, hoverX = 0, running = true, frame = 0, visible = true;
  const t0 = performance.now(); let prev = t0;
  function draw(now) {
    frame = requestAnimationFrame(draw);
    if (!running || !visible) { prev = now; return; }
    const dt = Math.min((now - prev) / 1000, .1); prev = now; const t = (now - t0) / 1000;
    for (let i = 0; i < 3; i++) {
      boost[i] += ((i === target ? 1 : 0) - boost[i]) * (1 - Math.exp(-dt * 6));
      lights[i].front.intensity = 8 * (1 + boost[i] * .32); lights[i].rim.intensity = 13 * (1 + boost[i] * .35);
      uni.uBoost.value[i] = boost[i]; cones[i].material.uniforms.uBoost.value = boost[i];
      /* pintu terbuka bila rack dipilih (tetikus melintas / diketik) */
      const goal = i === target ? 1 : 0;
      door[i] = reduced ? goal : door[i] + (goal - door[i]) * (1 - Math.exp(-dt * 5));
      hinges[i].forEach(h => { if (h) h.rotation.z = -door[i] * DOOR_OPEN; });
    }
    uni.uTime.value = t % 1000;
    /* Pergerakan mikro mencipta ilusi terapung tanpa mengganggu pemilihan rack. */
    holders.forEach((h, i) => { const lift = reduced ? .015 : .028 + .025 * Math.sin(t * .85 + i * 1.8); h.position.y = lift; mirrors[i].position.y = -lift; });
    const sway = reduced ? 0 : Math.sin(t * .22) * .23 + hoverX * .16;
    camera.position.set(sway, tg.y + D * Math.sin(.17), D * Math.cos(.17)); camera.lookAt(tg);
    renderer.render(scene, camera);
  }
  frame = requestAnimationFrame(draw);

  return {
    setSize, pick, setTarget(i) { target = i; }, setPointerX(nx) { hoverX = nx; },
    setVisible(v) { visible = v; },
    dispose() {
      running = false; cancelAnimationFrame(frame);
      scene.traverse(o => { if (o.geometry) o.geometry.dispose(); const m = o.material; if (m) (Array.isArray(m) ? m : [m]).forEach(x => x.dispose()); });
      mirrorMats.forEach(m => m.dispose()); envDispose && envDispose(); renderer.dispose();
    }
  };
}
// </STAGE>

export default function SemesterRacks({ semesters, onSelect }) {
  const [open, setOpen] = useState(null);
  const [status, setStatus] = useState('loading');
  const wrap = useRef(null), canvas = useRef(null), stage = useRef(null), openRef = useRef(null);
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  openRef.current = open;

  useEffect(() => { stage.current?.setTarget(open ? open - 1 : -1); }, [open]);

  useEffect(() => {
    let cancelled = false, resizer = null, visObserver = null, built = null;
    const url = import.meta.env.BASE_URL + MODEL_FILE;
    const bytes = fetch(url).then(res => { if (!res.ok) throw new Error('GLB'); return res.arrayBuffer(); }); /* mula muat turun GLB serta-merta */
    bytes.catch(() => {});
    (async () => {
      try {
        const [T, loaderModule, envModule, buffer] = await Promise.all([
          import('three'),
          import('three/examples/jsm/loaders/GLTFLoader.js'),
          import('three/examples/jsm/environments/RoomEnvironment.js'),
          bytes
        ]);
        const gltf = await new Promise((resolve, reject) => new loaderModule.GLTFLoader().parse(buffer, '', resolve, reject));
        if (cancelled) return;
        built = createRackStage(T, gltf.scene, canvas.current, { reduced, makeEnv: renderer => {
          const pmrem = new T.PMREMGenerator(renderer), room = new envModule.RoomEnvironment(), texture = pmrem.fromScene(room, .04).texture;
          room.dispose(); return { texture, dispose: () => { texture.dispose(); pmrem.dispose(); } };
        } });
        stage.current = built; built.setTarget(openRef.current ? openRef.current - 1 : -1);
        const fit = () => { const { width, height } = wrap.current.getBoundingClientRect(); built.setSize(width, height); };
        resizer = new ResizeObserver(fit); resizer.observe(wrap.current); fit();
        visObserver = new IntersectionObserver(es => built.setVisible(es.some(e => e.isIntersecting))); visObserver.observe(wrap.current);
        requestAnimationFrame(() => requestAnimationFrame(() => { if (!cancelled) setStatus('ready'); })); /* biar 1-2 bingkai dilukis dahulu, baru fade-in */
      } catch { if (!cancelled) setStatus('error'); }
    })();
    return () => {
      cancelled = true; resizer?.disconnect(); visObserver?.disconnect();
      built?.dispose(); stage.current = null;
    };
  }, [reduced]);

  const onMove = event => {
    if (!stage.current) return;
    const r = canvas.current.getBoundingClientRect();
    stage.current.setPointerX(((event.clientX - r.left) / r.width) * 2 - 1);
    if (event.pointerType !== 'mouse') return;
    const i = stage.current.pick(event.clientX, event.clientY);
    canvas.current.style.cursor = i >= 0 ? 'pointer' : '';
    setOpen(i >= 0 ? i + 1 : null);
  };
  const onClick = event => {
    if (!stage.current) return;
    const i = stage.current.pick(event.clientX, event.clientY);
    if (i < 0) return;
    const n = i + 1, mouse = event.detail && event.nativeEvent.pointerType === 'mouse';
    if (mouse) onSelect(n); else setOpen(open === n ? null : n);
  };

  return <section id="pilih-semester" className="semester-racks" aria-label="Pilih semester">
    <div className="rack-stage" ref={wrap}>
      <canvas ref={canvas} aria-hidden="true" data-status={status}
        onPointerMove={onMove} onPointerLeave={event => { if (event.pointerType === 'mouse') setOpen(null); }} onClick={onClick} />
      {status !== 'ready' && <span className="rack-loading" role="status">{status === 'error' ? 'Model 3D tidak dapat dimuatkan' : 'Memuatkan rak…'}</span>}
    </div>
    <div className="rack-labels">
      {semesters.map(semester => <article key={semester.n} className="semester-rack" data-open={open === semester.n}
        onPointerEnter={event => { if (event.pointerType === 'mouse') setOpen(semester.n); }}
        onPointerLeave={event => { if (event.pointerType === 'mouse') setOpen(null); }}
        onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(null); }}>
        <h3>Semester {semester.n}</h3>
        <p>Rack Server {semester.n} · {semester.count} modul</p>
        <button className="rack-enter" onClick={() => onSelect(semester.n)}>Masuk Semester {semester.n} <span aria-hidden="true">→</span></button>
      </article>)}
    </div>
  </section>;
}
