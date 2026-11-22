import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// 1 unit = 1 cm. Bangku kerja ialah geometri prosedur (bukan model GLB).
export function webglOK() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; }
}

function woodTexture() {
  const c = document.createElement('canvas'); c.width = 512; c.height = 256;
  const g = c.getContext('2d'); g.fillStyle = '#6a5440'; g.fillRect(0, 0, 512, 256);
  for (let i = 0; i < 90; i++) {
    g.strokeStyle = `rgba(${40 + Math.random() * 30},${28 + Math.random() * 20},18,${0.06 + Math.random() * 0.12})`;
    g.lineWidth = 1 + Math.random() * 2; g.beginPath();
    const y = Math.random() * 256; g.moveTo(0, y); g.bezierCurveTo(150, y + Math.random() * 8 - 4, 350, y + Math.random() * 8 - 4, 512, y); g.stroke();
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(2, 1);
  return t;
}

export function createScene(canvas) {
  const mobile = matchMedia('(pointer:coarse)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b1220); scene.fog = new THREE.Fog(0x0b1220, 220, 420);
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.55;

  scene.add(new THREE.HemisphereLight(0xbfd4ff, 0x2a2118, 0.45));
  const key = new THREE.DirectionalLight(0xfff2e0, 2.2); key.position.set(-50, 110, 70); key.castShadow = true;
  const sm = mobile ? 1024 : 2048; key.shadow.mapSize.set(sm, sm);
  Object.assign(key.shadow.camera, { left: -90, right: 90, top: 60, bottom: -60, near: 20, far: 300 });
  key.shadow.bias = -0.0004; key.shadow.normalBias = 0.3; scene.add(key);
  const rim = new THREE.DirectionalLight(0x6fb8ff, 0.6); rim.position.set(80, 50, -60); scene.add(rim);

  // Bangku kerja
  const bench = new THREE.Group();
  const top = new THREE.Mesh(new THREE.BoxGeometry(160, 4, 76), new THREE.MeshStandardMaterial({ map: woodTexture(), roughness: 0.65, metalness: 0 }));
  top.position.y = -2; top.receiveShadow = true; bench.add(top);
  const mat = new THREE.Mesh(new THREE.BoxGeometry(150, 0.3, 66), new THREE.MeshStandardMaterial({ color: 0x1a2029, roughness: 0.95 }));
  mat.position.y = 0.15; mat.receiveShadow = true; bench.add(mat);
  const steel = new THREE.MeshStandardMaterial({ color: 0x8a949f, roughness: 0.35, metalness: 0.9 });
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(5, 75, 5), steel); leg.position.set(sx * 74, -41.5, sz * 33); leg.castShadow = true; bench.add(leg);
  }
  const floor = new THREE.Mesh(new THREE.CircleGeometry(260, 48), new THREE.MeshStandardMaterial({ color: 0x141b25, roughness: 1 }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -79; floor.receiveShadow = true;
  scene.add(bench, floor);
  const surfaceY = 0.3;

  const camera = new THREE.PerspectiveCamera(42, 1, 1, 800);
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.minDistance = 15; controls.maxDistance = 190; controls.maxPolarAngle = Math.PI * 0.48; controls.screenSpacePanning = true;
  controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };

  const home = { pos: new THREE.Vector3(0, 80, 95), target: new THREE.Vector3(0, 0, -2) };
  let fly = null;
  function flyTo(pos, target, ms = 600) {
    fly = { p0: camera.position.clone(), t0: controls.target.clone(), p1: pos, t1: target, s: performance.now(), ms };
  }
  const reset = () => flyTo(home.pos.clone(), home.target.clone());
  camera.position.copy(home.pos); controls.target.copy(home.target);

  function focusOn(obj) {
    const b = new THREE.Box3().setFromObject(obj), c = b.getCenter(new THREE.Vector3()), r = b.getSize(new THREE.Vector3()).length();
    const dir = camera.position.clone().sub(controls.target).normalize();
    flyTo(c.clone().add(dir.multiplyScalar(Math.max(35, r * 1.8))), c);
  }

  // Cincin pilihan (cyan)
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.9, 1, 64), new THREE.MeshBasicMaterial({ color: 0x35d0e6, transparent: true, opacity: 0.85, side: THREE.DoubleSide, depthWrite: false }));
  ring.rotation.x = -Math.PI / 2; ring.visible = false; ring.renderOrder = 2; scene.add(ring);
  function setSelected(obj) {
    if (!obj) { ring.visible = false; return; }
    const b = new THREE.Box3().setFromObject(obj), c = b.getCenter(new THREE.Vector3()), s = b.getSize(new THREE.Vector3());
    const r = Math.max(s.x, s.z) * 0.62 + 1.5; ring.scale.set(r, r, 1); ring.position.set(c.x, surfaceY + 0.12, c.z); ring.visible = true;
  }

  function resize() {
    const p = canvas.parentElement, w = p.clientWidth, h = p.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h;
    // Skrin potret: jauhkan kamera supaya seluruh bangku muat
    const k = camera.aspect < 1 ? 1.5 : camera.aspect < 1.4 ? 1.2 : 1;
    home.pos.set(0, 80 * k, 95 * k);
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(canvas.parentElement); resize();

  const ticks = new Set();
  const clock = new THREE.Clock();
  let running = true;
  document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) clock.getDelta(); });
  renderer.setAnimationLoop(() => {
    if (!running) return;
    const dt = clock.getDelta(), now = performance.now();
    if (fly) {
      const k = Math.min(1, (now - fly.s) / fly.ms), e = k * k * (3 - 2 * k);
      camera.position.lerpVectors(fly.p0, fly.p1, e); controls.target.lerpVectors(fly.t0, fly.t1, e);
      if (k >= 1) fly = null;
    }
    ring.material.opacity = 0.65 + Math.sin(now / 350) * 0.2;
    controls.update(); ticks.forEach(f => f(dt, now));
    renderer.render(scene, camera);
  });
  renderer.domElement.addEventListener('webglcontextlost', e => { e.preventDefault(); scene.userData.onLost && scene.userData.onLost(); });

  return { renderer, scene, camera, controls, reset, focusOn, setSelected, ticks, ring, surfaceY };
}
