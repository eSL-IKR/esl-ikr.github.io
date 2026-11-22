import * as THREE from 'three';

// Ketik / klik untuk pilih; hover untuk tooltip. Seret kekal untuk kamera (OrbitControls).
export function createInteraction({ canvas, camera, getPickables, onSelect, onHover }) {
  const ray = new THREE.Raycaster(), p = new THREE.Vector2();
  let down = null, hoverQueued = false, lastHover = null;

  function pick(ev) {
    const r = canvas.getBoundingClientRect();
    p.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(p, camera);
    const hit = ray.intersectObjects(getPickables(), true)[0];
    if (!hit) return null;
    let o = hit.object;
    while (o && !o.userData.itemId) o = o.parent;
    return o ? o.userData.itemId : null;
  }
  canvas.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId }; });
  canvas.addEventListener('pointerup', e => {
    if (!down) return;
    const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y), dt = performance.now() - down.t;
    down = null;
    if (moved < 8 && dt < 600) onSelect(pick(e));      // ketik pada ruang kosong = nyahpilih
  });
  canvas.addEventListener('pointercancel', () => { down = null; });
  canvas.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || e.buttons || hoverQueued) return;
    hoverQueued = true;
    requestAnimationFrame(() => {
      hoverQueued = false;
      const id = pick(e);
      if (id !== lastHover) { lastHover = id; canvas.style.cursor = id ? 'pointer' : 'default'; onHover(id); }
    });
  });
  canvas.addEventListener('pointerleave', () => { if (lastHover) { lastHover = null; onHover(null); } });
}
