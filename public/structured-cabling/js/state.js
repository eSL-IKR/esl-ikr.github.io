// Satu sumber kebenaran untuk keadaan simulasi. Disimpan ke localStorage (kemajuan sahaja).
const KEY = 'ikr3023.sim.v1';
const defaults = () => ({
  mode: null,                // 'guided' | 'exam'
  mission: 0,                // indeks misi aktif (0-based)
  done: [],                  // indeks misi yang selesai
  cable: { id: null, confirmed: false },
  plug: null, panel: null,   // id dalam components.json
  mistakes: [],              // {mission, code, text, marks}
  hintsUsed: 0
});
let s = defaults();
const subs = new Set();

export const state = () => s;
export function load() {
  try { const r = JSON.parse(localStorage.getItem(KEY)); if (r && r.v === 1) s = { ...defaults(), ...r.s }; } catch (e) { /* storan tidak tersedia */ }
}
export function save() { try { localStorage.setItem(KEY, JSON.stringify({ v: 1, s })); } catch (e) {} }
export function update(fn) { fn(s); save(); subs.forEach(f => f(s)); }
export function subscribe(f) { subs.add(f); return () => subs.delete(f); }
export function reset() { s = defaults(); save(); subs.forEach(f => f(s)); }
