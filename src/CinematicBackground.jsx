import { useEffect, useRef } from 'react';
import './cinematic-bg.css';

/* ---------------------------------------------------------------------------
   Latar sinematik seluruh halaman (hiasan sahaja).
   - Dua lapisan tema (gelap di atas, terang di bawah) bertukar secara crossfade.
   - Bintang = satu <canvas> 2D; warna dibaca daripada pembolehubah CSS.
   - Parallax skrol ringan (transform sahaja), jeda bila tab tersembunyi.
   --------------------------------------------------------------------------- */

const HORIZON = 0.54;            /* kedudukan ufuk (pecahan tinggi viewport) */
const FADE_MS = 500;             /* tempoh peralihan tema */
const DPR_CAP = 1.5;
const STARS = { desktop: 260, mobile: 100 };      /* bintang tema gelap */
const DOTS = { desktop: 150, mobile: 70 };        /* "bintang" tema terang */

/* julat: [saiz min, saiz max] dalam px, [opacity min, opacity max] */
const LOOK = {
  dark: { size: [0.5, 1.6], alpha: [0.35, 1] },
  light: { size: [0.8, 2], alpha: [0.25, 0.55] },
};

const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

function parseColor(value, fallback) {
  const v = (value || '').trim();
  let m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(v);
  if (m) {
    let h = m[1]; if (h.length === 3) h = h.split('').map(c => c + c).join('');
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  m = /rgba?\(([^)]+)\)/i.exec(v);
  if (m) { const p = m[1].split(',').map(Number); return [p[0], p[1], p[2]]; }
  return fallback;
}

function Scene({ theme }) {
  return (
    <div className={`cbg-theme cbg-theme--${theme}`} data-cbg-theme={theme}>
      <div className="cbg-sky" />
      <div className="cbg-aurora">
        <i className="cbg-blob cbg-blob--1" />
        <i className="cbg-blob cbg-blob--2" />
        <i className="cbg-blob cbg-blob--3" />
      </div>
      <div className="cbg-glow" data-parallax="0.025" />
      <div className="cbg-ground" data-parallax="0.05">
        <div className="cbg-floor"><div className="cbg-grid" /></div>
        <div className="cbg-horizon-line" />
      </div>
      <div className="cbg-vignette" />
    </div>
  );
}

export default function CinematicBackground() {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current, canvas = canvasRef.current;
    if (!root || !canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const html = document.documentElement;
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = reducedQuery.matches;

    /* ---- palet bintang (dibaca daripada pembolehubah CSS setiap tema) ---- */
    const readPalette = name => {
      const el = root.querySelector(`[data-cbg-theme="${name}"]`);
      const cs = getComputedStyle(el);
      const fb = name === 'dark' ? [255, 255, 255] : [59, 91, 219];
      return [1, 2, 3].map(i => parseColor(cs.getPropertyValue('--star-color-' + i), fb));
    };
    let pal = { dark: readPalette('dark'), light: readPalette('light') };

    /* ---- tema semasa + nilai campuran (0 = gelap, 1 = terang) ---- */
    const themeNow = () => (html.getAttribute('data-theme') === 'dark' ? 0 : 1);
    let target = themeNow(), mix = target;

    /* ---- bintang ---- */
    let W = 0, H = 0, dpr = 1, stars = [], lightCount = 0;
    const build = () => {
      const mobile = W < 700;
      const total = mobile ? STARS.mobile : STARS.desktop;
      lightCount = mobile ? DOTS.mobile : DOTS.desktop;
      stars = Array.from({ length: total }, () => {
        const below = Math.random() < 0.04;
        const y = below ? HORIZON + Math.random() * 0.06 : Math.pow(Math.random(), 1.35) * HORIZON;
        return {
          x: Math.random(), y,
          u: Math.random(), v: Math.random(),     /* nisbah saiz & opacity */
          c: Math.floor(Math.random() * 3),        /* indeks warna */
          sp: 0.4 + Math.random() * 1.1,           /* kelajuan kelip */
          ph: Math.random() * Math.PI * 2,
          dx: (Math.random() - .5) * .0005,
          dr: 0.0025 + Math.random() * 0.0045,     /* hanyut ke atas perlahan (pecahan tinggi / saat) */
        };
      });
    };
    const resize = () => {
      const r = root.getBoundingClientRect();
      W = Math.max(1, r.width); H = Math.max(1, r.height);
      dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      const wasMobile = stars.length && stars.length === STARS.mobile;
      if (!stars.length || wasMobile !== (W < 700)) build();
      draw(performance.now());
    };

    function draw(now) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const t = now / 1000;
      const sizeD = LOOK.dark.size, sizeL = LOOK.light.size, aD = LOOK.dark.alpha, aL = LOOK.light.alpha;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        /* bintang tambahan (di luar kiraan tema terang) pudar bila tema terang */
        const vis = lerp(1, i < lightCount ? 1 : 0, mix);
        if (vis < 0.01) continue;
        const size = lerp(lerp(sizeD[0], sizeD[1], s.u), lerp(sizeL[0], sizeL[1], s.u), mix);
        const base = lerp(lerp(aD[0], aD[1], s.v), lerp(aL[0], aL[1], s.v), mix);
        const tw = reduced ? 1 : 0.75 + 0.25 * Math.sin(t * s.sp + s.ph);
        const py = s.y * H;
        /* pudar menghampiri ufuk dan di atas skrin */
        const edge = smooth(HORIZON * H + 6, HORIZON * H - H * 0.08, py);
        const a = base * tw * vis * edge;
        if (a < 0.01) continue;
        const cd = pal.dark[s.c], cl = pal.light[s.c];
        ctx.fillStyle = `rgba(${Math.round(lerp(cd[0], cl[0], mix))},${Math.round(lerp(cd[1], cl[1], mix))},${Math.round(lerp(cd[2], cl[2], mix))},${a.toFixed(3)})`;
        ctx.beginPath(); ctx.arc(s.x * W, py, size / 2 + 0.15, 0, Math.PI * 2); ctx.fill();
      }
    }

    /* ---- gelung animasi ---- */
    let raf = 0, last = 0, running = false;
    const tick = now => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.1);
      if (now - last < 32) return;           /* ~30fps cukup untuk kelip lembut */
      last = now;
      if (mix !== target) { const step = dt / (FADE_MS / 1000); mix = target > mix ? Math.min(target, mix + step) : Math.max(target, mix - step); }
      for (const s of stars) { s.y -= s.dr * dt; s.x = (s.x + s.dx * dt + 1) % 1; if (s.y < -0.01) { s.y = HORIZON - 0.01; s.x = Math.random(); } }
      draw(now);
    };
    const start = () => { if (running || reduced || document.hidden) return; running = true; last = performance.now(); raf = requestAnimationFrame(tick); };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    /* ---- tukar tema ---- */
    const applyTheme = () => {
      pal = { dark: readPalette('dark'), light: readPalette('light') };
      target = themeNow();
      if (reduced) { mix = target; draw(performance.now()); }
      else if (!running) { mix = target; draw(performance.now()); }
    };
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(html, { attributes: true, attributeFilter: ['data-theme'] });

    /* ---- parallax skrol (transform sahaja) ---- */
    const layers = Array.from(root.querySelectorAll('[data-parallax]')).map(el => ({ el, f: parseFloat(el.dataset.parallax) }));
    let pRaf = 0;
    const parallax = () => {
      pRaf = 0;
      if (reduced) return;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      const vh = window.innerHeight;
      for (const l of layers) l.el.style.transform = `translate3d(0,${(-p * l.f * vh).toFixed(1)}px,0)`;
    };
    const onScroll = () => { if (!pRaf && !document.hidden) pRaf = requestAnimationFrame(parallax); };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---- tab tersembunyi: jeda semua ---- */
    const onVisibility = () => {
      root.classList.toggle('is-paused', document.hidden);
      if (document.hidden) stop(); else start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    /* ---- prefers-reduced-motion ---- */
    const onReduced = () => {
      reduced = reducedQuery.matches;
      root.classList.toggle('is-reduced', reduced);
      if (reduced) { stop(); layers.forEach(l => { l.el.style.transform = ''; }); mix = target; draw(performance.now()); }
      else { start(); parallax(); }
    };
    reducedQuery.addEventListener('change', onReduced);
    root.classList.toggle('is-reduced', reduced);

    const ro = new ResizeObserver(resize);
    ro.observe(root);
    resize(); start(); parallax();

    return () => {
      stop(); cancelAnimationFrame(pRaf);
      themeObserver.disconnect(); ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      reducedQuery.removeEventListener('change', onReduced);
      layers.forEach(l => { l.el.style.transform = ''; });
    };
  }, []);

  return (
    <div className="cbg" ref={rootRef} aria-hidden="true">
      <Scene theme="light" />
      <Scene theme="dark" />
      <canvas className="cbg-stars" ref={canvasRef} />
    </div>
  );
}
