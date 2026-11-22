import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const gltf = new GLTFLoader();
const cache = new Map();
const TIMEOUT = 45000;

function fetchGLB(url, onFrac) {
  return new Promise((res, rej) => {
    const t = setTimeout(() => rej(new Error('Masa tamat semasa memuat ' + url)), TIMEOUT);
    gltf.load(url, g => { clearTimeout(t); res(g); },
      e => e.total && onFrac && onFrac(e.loaded / e.total),
      e => { clearTimeout(t); rej(new Error('Gagal memuat ' + url + (e && e.message ? ' (' + e.message + ')' : ''))); });
  });
}

// Gabung mesh mengikut bahan untuk kurangkan draw call (model statik sahaja).
function mergeByMaterial(root) {
  root.updateMatrixWorld(true);
  const byMat = new Map();
  root.traverse(o => {
    if (!o.isMesh || !o.geometry || o.isSkinnedMesh || Array.isArray(o.material)) return;
    const g = o.geometry.clone(); g.applyMatrix4(o.matrixWorld);
    for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k);
    g.morphAttributes = {};
    if (!g.attributes.normal) g.computeVertexNormals();
    if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    if (!byMat.has(o.material)) byMat.set(o.material, []);
    byMat.get(o.material).push(g);
  });
  const out = new THREE.Group(); out.name = 'merged';
  for (const [mat, list] of byMat) {
    let L = list;
    if (L.some(g => g.index) && !L.every(g => g.index)) L = L.map(g => g.index ? g.toNonIndexed() : g);
    const merged = L.length === 1 ? L[0] : mergeGeometries(L, false);
    if (!merged) throw new Error('mergeGeometries gagal');
    out.add(new THREE.Mesh(merged, mat));
  }
  return out;
}

function normalize(root, spec) {
  const holder = new THREE.Group();
  holder.add(root);
  const box = new THREE.Box3(), sz = new THREE.Vector3();
  box.setFromObject(root).getSize(sz);
  if (spec.layFlat) {                       // paksi paling nipis menjadi "atas"
    const m = Math.min(sz.x, sz.y, sz.z);
    if (m === sz.z) root.rotation.x = -Math.PI / 2; else if (m === sz.x) root.rotation.z = Math.PI / 2;
  }
  root.updateMatrixWorld(true);
  box.setFromObject(root).getSize(sz);
  root.scale.setScalar(spec.size / Math.max(sz.x, sz.y, sz.z));
  root.updateMatrixWorld(true);
  box.setFromObject(root);
  const c = box.getCenter(new THREE.Vector3());
  root.position.set(-c.x, -box.min.y, -c.z);
  holder.position.set(...spec.pos);
  return holder;
}

export async function loadItem(id, spec, onFrac) {
  if (cache.has(id)) return cache.get(id);
  const g = await fetchGLB(spec.model, onFrac);
  let root = g.scene;
  if (spec.merge) { try { root = mergeByMaterial(root); } catch (e) { console.warn('Gabung mesh dilangkau:', id, e); } }
  root.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  const holder = normalize(root, spec);
  holder.name = id; holder.userData.itemId = id;
  cache.set(id, holder);
  return holder;
}
export const clearFailed = id => cache.delete(id);
