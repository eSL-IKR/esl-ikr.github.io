// Bunyi dijana dengan Web Audio (tiada fail audio). Pilihan, dimatikan secara lalai.
let ctx = null, on = false;
export function setSound(v) {
  on = v;
  if (v && !ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { on = false; } }
  if (ctx && ctx.state === 'suspended') ctx.resume();
  return on;
}
export const isOn = () => on;
function tone(f, d = 0.08, type = 'sine', vol = 0.06, delay = 0) {
  if (!on || !ctx) return;
  const t = ctx.currentTime + delay, o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.value = f;
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + d + 0.02);
}
export const sfx = {
  select: () => tone(660, 0.06, 'triangle'),
  ok: () => { tone(523, 0.09, 'sine', 0.07); tone(784, 0.14, 'sine', 0.07, 0.09); },
  error: () => { tone(180, 0.2, 'sawtooth', 0.05); }
};
