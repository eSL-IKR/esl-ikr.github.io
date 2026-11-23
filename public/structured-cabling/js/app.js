import * as THREE from 'three';
import { createScene, webglOK } from './scene.js';
import { loadItem, clearFailed } from './loader.js';
import { createInteraction } from './interaction.js';
import { createInventory } from './inventory.js';
import { evaluateSelection, mission1Step } from './missions.js';
import { missionScore, MAX, RULES } from './scoring.js';
import { sfx, setSound } from './audio.js';
import * as S from './state.js';

const $ = id => document.getElementById(id);
const show = (el, v = true) => { el.hidden = !v; };
const CRITICAL = ['cat6', 'cat6a', 'cat7', 'cat8', 'rj45', 'panel'];

let comps, missions, sc, inv, interaction;
const objs = {};          // id -> Group dalam adegan
let selectedEntity = null, hoverId = null;

// ---------- Permulaan ----------
async function boot() {
  S.load();
  if (!webglOK()) return fatal('WebGL tidak disokong', 'Pelayar anda tidak menyokong WebGL. Cuba Chrome terkini, dan pastikan pecutan perkakasan dihidupkan.', false);
  try {
    [comps, missions] = await Promise.all([fetch('data/components.json'), fetch('data/missions.json')].map(p => p.then(r => { if (!r.ok) throw new Error(r.url + ' → HTTP ' + r.status); return r.json(); })));
    missions = missions.missions;
  } catch (e) {
    return fatal('Data tidak dapat dibaca', 'Aplikasi mesti dijalankan melalui pelayan HTTP (contoh: python -m http.server 8000), bukan dengan membuka fail terus.\n\n' + e.message, true);
  }
  try { sc = createScene($('c')); } catch (e) { return fatal('Gagal memulakan 3D', e.message, true); }
  sc.scene.userData.onLost = () => fatal('Konteks WebGL hilang', 'Skrin 3D terputus. Tekan Cuba semula untuk memuat semula halaman.', true);

  inv = createInventory({ tabsEl: $('tabs'), cardsEl: $('cards'), dockEl: $('dock'), handleEl: $('dock-handle'), comps, onPick: pickEntity });
  interaction = createInteraction({
    canvas: $('c'), camera: sc.camera, getPickables: () => Object.values(objs),
    onSelect: id => pickEntity(id ? (id === 'rj45' ? 'plug_utp' : id === 'panel' ? 'panel_utp' : id) : null, id),
    onHover: id => { hoverId = id; }
  });
  sc.ticks.add(updateTip);
  sc.ticks.add(update3DGuide);
  bindUI();
  await loadAll();
}

function fatal(title, msg, retry) {
  show($('loading'), false); show($('start'), false);
  $('err-title').textContent = title; $('err-msg').textContent = msg; $('err-msg').style.whiteSpace = 'pre-line';
  show($('err-retry'), retry); show($('error'), true);
}

// ---------- Muat model (kritikal dahulu, selebihnya di latar belakang) ----------
const fracs = {};
let failed = [];
async function loadOne(id) {
  try {
    const g = await loadItem(id, comps.items[id], f => { fracs[id] = f; progress(); });
    fracs[id] = 1; objs[id] = g; sc.scene.add(g);
  } catch (e) { console.error(e); clearFailed(id); failed.push({ id, msg: e.message }); }
  progress();
}
function progress() {
  const ids = Object.keys(comps.items), done = ids.filter(i => objs[i]).length;
  const f = ids.reduce((a, i) => a + (fracs[i] || 0), 0) / ids.length;
  $('load-bar').style.width = Math.round(f * 100) + '%';
  $('load-text').textContent = `Model ${done}/${ids.length} dimuat`;
}
async function loadAll() {
  show($('error'), false); show($('loading'), true); failed = [];
  const todo = Object.keys(comps.items).filter(i => !objs[i]);
  const crit = todo.filter(i => CRITICAL.includes(i)), rest = todo.filter(i => !CRITICAL.includes(i));
  await Promise.all(crit.map(loadOne));
  const critFail = failed.filter(f => CRITICAL.includes(f.id));
  if (critFail.length) return fatal('Model gagal dimuat', critFail.map(f => '• ' + f.id + ': ' + f.msg).join('\n') + '\n\nSemak sambungan dan pastikan folder models/ lengkap, kemudian cuba semula.', true);
  show($('loading'), false);
  enter();
  await Promise.all(rest.map(loadOne));
  const other = failed.filter(f => !CRITICAL.includes(f.id));
  if (other.length) feedback('warn', 'Sebahagian model alat gagal dimuat: ' + other.map(f => f.id).join(', ') + '. Muat semula halaman untuk mencuba lagi.');
}

function enter() {
  const s = S.state();
  if (!s.mode) show($('start'), true); else render();
  S.subscribe(render);
  render();
}

// ---------- UI ----------
function bindUI() {
  $('err-retry').onclick = () => { if ($('err-title').textContent.startsWith('Model')) loadAll(); else location.reload(); };
  document.querySelectorAll('.mode').forEach(b => b.onclick = () => { S.update(s => { s.mode = b.dataset.mode; }); show($('start'), false); });
  $('btn-reset').onclick = () => { if (confirm('Padam semua kemajuan tersimpan?')) { S.reset(); selectedEntity = null; sc.setSelected(null); show($('start'), true); } };
  $('btn-fit').onclick = () => sc.reset();
  $('btn-focus').onclick = () => { const g = objs[selectedEntity && itemOf(selectedEntity)]; if (g) sc.focusOn(g); };
  $('btn-help').onclick = () => show($('help'), true);
  $('help-close').onclick = () => show($('help'), false);
  $('btn-sound').onclick = e => { const on = setSound(e.currentTarget.getAttribute('aria-pressed') !== 'true'); e.currentTarget.setAttribute('aria-pressed', on); e.currentTarget.textContent = on ? '🔊' : '🔇'; if (on) sfx.ok(); };
  $('mission-toggle').onclick = () => { if (matchMedia('(max-width:820px),(max-aspect-ratio:1/1)').matches) { const c = $('mission').classList.toggle('collapsed'); $('mission-toggle').setAttribute('aria-expanded', !c); } };
  $('btn-hint').onclick = () => { const m = missions[S.state().mission]; if (!m.hint) return; S.update(s => { s.hintsUsed++; }); feedback('warn', '💡 ' + m.hint); };
  $('btn-confirm').onclick = onConfirm;
  $('btn-next').onclick = () => S.update(s => { if (s.done.includes(s.mission) && s.mission < missions.length - 1) { s.mission++; } });
}

function feedback(kind, text) {
  const f = $('m-feedback'); f.hidden = !text; f.className = 'feedback ' + (kind || ''); f.textContent = text || '';
}

const itemOf = id => comps.items[id] ? id : (comps.plugs[id] || comps.panels[id] || {}).item;

function pickEntity(entity, rawItem) {
  const s = S.state();
  if (!entity) { selectedEntity = null; sc.setSelected(null); inv.setSelected([s.cable.id, s.plug, s.panel]); showInfo(null); $('btn-focus').disabled = true; return; }
  sfx.select();
  selectedEntity = entity;
  const item = itemOf(entity) || rawItem;
  sc.setSelected(item && objs[item] ? objs[item] : null);
  $('btn-focus').disabled = !(item && objs[item]);
  if (item) inv.showTabFor(item);
  showInfo(entity);

  if (s.mission !== 0) return;                       // pemilihan hanya sah dalam Misi 1
  S.update(st => {
    if (comps.items[entity] && comps.items[entity].type === 'cable') { if (st.cable.id !== entity) st.cable = { id: entity, confirmed: false }; }
    else if (comps.plugs[entity]) { if (st.plug !== entity) { st.plug = entity; st.cable.confirmed = false; } }
    else if (comps.panels[entity]) { if (st.panel !== entity) { st.panel = entity; st.cable.confirmed = false; } }
    if (!st.cable.confirmed) st.done = st.done.filter(m => m !== 0);
  });
  if (comps.items[entity] && ['tool', 'part'].includes(comps.items[entity].type) && !['rj45', 'panel'].includes(entity)) feedback('', 'Ini hanya untuk rujukan. Alat ini digunakan dalam misi seterusnya.');
}

function showInfo(entity) {
  const box = $('info');
  if (!entity) return show(box, false);
  const exam = S.state().mode === 'exam';
  const c = comps.items[entity] || comps.plugs[entity] || comps.panels[entity];
  $('info-name').textContent = c.name;
  $('info-text').textContent = (exam && c.type === 'cable') ? '' : (c.info || c.note || '');
  const dl = $('info-spec'); dl.innerHTML = '';
  for (const [k, v] of Object.entries(c.spec || (c.shielded !== undefined ? { Perisai: c.shielded ? 'Berperisai' : 'Tiada (UTP)' } : {}))) {
    if (exam && k === 'Plug/panel') continue;   // mod peperiksaan: jangan dedahkan jawapan keserasian
    const dt = document.createElement('dt'), dd = document.createElement('dd'); dt.textContent = k; dd.textContent = v; dl.append(dt, dd);
  }
  show(box, true);
}

function onConfirm() {
  const s = S.state(), m = s.mission;
  if (m !== 0) { S.update(st => { st.mission = 0; }); return; }
  const r = evaluateSelection(s.cable.id, s.plug, s.panel, comps);
  if (r.ok) {
    sfx.ok();
    S.update(st => { st.cable.confirmed = true; if (!st.done.includes(0)) st.done.push(0); });
    const sc10 = missionScore(S.state().mistakes, 0);
    feedback('ok', 'Pilihan betul. Kabel, plug dan patch panel serasi.' + (s.mode === 'exam' ? '' : '\nIngat: jenis perisai plug dan panel mesti sepadan dengan kabel.') + (s.mode === 'exam' ? `\nMarkah pemilihan: ${sc10}/${MAX.select}` : ''));
  } else {
    sfx.error();
    S.update(st => { st.mistakes.push({ mission: 0, code: r.code, text: r.problems.join(' '), marks: RULES.wrongSelection }); });
    feedback('bad', 'Pilihan tidak serasi:\n• ' + r.problems.join('\n• ') + (s.mode === 'exam' ? `\n(−${RULES.wrongSelection} markah)` : '\nUbah pilihan dan sahkan semula. Tiada had percubaan.'));
  }
}

function render() {
  const s = S.state(), m = missions[s.mission];
  $('m-tag').textContent = `MISI ${s.mission + 1}/${missions.length}` + (s.mode ? ' · ' + (s.mode === 'exam' ? 'PEPERIKSAAN' : 'BERPANDU') : '');
  $('m-title').textContent = m.title; $('m-goal').textContent = m.goal;
  const steps = $('m-steps'); steps.innerHTML = '';
  if (m.built) {
    const cur = mission1Step(s);
    m.steps.forEach((t, i) => { const li = document.createElement('li'); li.textContent = t; if (i < cur) li.className = 'done'; else if (i === cur) li.className = 'cur'; steps.appendChild(li); });
  } else {
    const li = document.createElement('li'); li.textContent = `Misi ini belum dibina. Dijadualkan dalam Fasa ${m.phase}.`; li.className = 'cur'; steps.appendChild(li);
  }
  const exam = s.mode === 'exam';
  show($('btn-hint'), !!m.built && !exam);
  const cb = $('btn-confirm');
  if (m.built) { cb.textContent = 'Sahkan Pilihan'; cb.disabled = !(s.cable.id && s.plug && s.panel) || s.cable.confirmed; }
  else { cb.textContent = '← Kembali ke Misi 1'; cb.disabled = false; }
  $('btn-next').disabled = !s.done.includes(s.mission) || s.mission >= missions.length - 1;
  const pr = $('progress'); pr.innerHTML = '';
  missions.forEach((_, i) => { const e = document.createElement('i'); e.className = s.done.includes(i) ? 'done' : i === s.mission ? 'cur' : ''; pr.appendChild(e); });
  inv && inv.setSelected([s.cable.id, s.plug, s.panel]);
  if (!m.built && !$('m-feedback').hidden) feedback('', '');
  if (selectedEntity) showInfo(selectedEntity);
}

// ---------- Tooltip 3D ----------
const v = new THREE.Vector3();
function updateTip() {
  const id = hoverId || (selectedEntity && itemOf(selectedEntity));
  const g = id && objs[id], tip = $('tip');
  if (!g) { if (!tip.hidden) tip.hidden = true; return; }
  if (!g.userData.top) { const b = new THREE.Box3().setFromObject(g); g.userData.top = new THREE.Vector3((b.min.x + b.max.x) / 2, b.max.y + 1.5, (b.min.z + b.max.z) / 2); }
  v.copy(g.userData.top).project(sc.camera);
  if (v.z > 1) { tip.hidden = true; return; }
  const r = $('c').getBoundingClientRect();
  tip.textContent = comps.items[id].name;
  tip.style.left = ((v.x + 1) / 2 * r.width) + 'px'; tip.style.top = ((1 - v.y) / 2 * r.height) + 'px'; tip.hidden = false;
}

// Petunjuk 3D merah mengikut kedudukan objek. Dipaparkan dalam latihan berpandu sahaja.
const eslGuidePos=new THREE.Vector3();
function update3DGuide(){
 const el=$('esl3dNextArrow');if(!el||!sc||!comps)return;
 const s=S.state(),step=mission1Step(s),cable=s.cable.id&&comps.items[s.cable.id];
 const item=(step===0?'cat6':step===1&&!cable?.shielded?'rj45':step===2&&!cable?.shielded?'panel':null);
 const g=item&&objs[item];
 if(s.mode!=='guided'||s.mission!==0||!g||step>=3){el.hidden=true;return;}
 if(!g.userData.eslGuideCenter){const bounds=new THREE.Box3().setFromObject(g);if(bounds.isEmpty()){el.hidden=true;return;}bounds.getCenter(eslGuidePos);eslGuidePos.y=bounds.max.y+1.5;g.userData.eslGuideCenter=eslGuidePos.clone();}
 eslGuidePos.copy(g.userData.eslGuideCenter).project(sc.camera);
 if(!Number.isFinite(eslGuidePos.x)||!Number.isFinite(eslGuidePos.y)||eslGuidePos.z<-1||eslGuidePos.z>1||Math.abs(eslGuidePos.x)>1){el.hidden=true;return;}
 const canvas=$('c'),w=canvas.clientWidth,h=canvas.clientHeight;
 el.style.left=((eslGuidePos.x+1)/2*w)+'px';el.style.top=((1-eslGuidePos.y)/2*h)+'px';
 el.querySelector('span').textContent=step===0?'Pilih kabel':step===1?'Pilih plug RJ45':'Pilih patch panel';
 el.hidden=false;
}

boot();
