import ModuleMenu, { ModuleActivities } from './ModuleMenu';
import { useMemo, useState } from 'react';
import { ikr3122QuizSets } from './IKR3122QuizData.js';
import HeadingIcon from './headingIcons';
import {
  Award, Bug, CalendarClock, CheckCircle, ChevronRight, CircleDot, ClipboardList,
  Compass, Crosshair, Gauge, GitBranch, Home, KeyRound, Laptop, Layers, Lock, ListChecks,
  Map, MapPin, Network, PenTool, Radio, Router, RotateCcw, Ruler, Search, Server, Shapes,
  ShieldAlert, ShieldCheck, SignalLow, Sparkles, Terminal, Truck, Wifi, Wrench, XCircle, ArrowLeft,
} from 'lucide-react';

const sections = [
  { id: 'pm-survey', title: 'Tinjauan Tapak & Senarai Semak', desc: 'Keperluan tinjauan tapak, penilaian fizikal, pengurusan kabel, kuasa, keselamatan dan dokumentasi.', icon: MapPin, accent: 'violet' },
  { id: 'pm-tools', title: 'Peralatan Tinjauan & Borang Laporan', desc: 'Pengukur jarak, laptop, penguji kabel/OTDR, Wi-Fi analyzer, ujian prestasi dan borang laporan tapak.', icon: Wrench, accent: 'fuchsia' },
  { id: 'pm-wlan', title: 'WLAN & Titik Capaian Tanpa Wayar', desc: 'Asas WLAN, piawaian IEEE 802.11, ancaman & keselamatan, komponen dan jenis WAP.', icon: Wifi, accent: 'indigo' },
  { id: 'pm-signal', title: 'Liputan Isyarat Tanpa Wayar', desc: 'Penyebaran gelombang radio, jalur 2.4/5 GHz, ciri antena, multipath dan reka bentuk liputan.', icon: Radio, accent: 'violet' },
  { id: 'pm-floor', title: 'Pelan Lantai & Pemasangan WAP', desc: 'Penyediaan pelan lantai berskala, peralatan tinjauan tanpa wayar (Ekahau/NetSpot), heatmap dan kaedah pemasangan WAP.', icon: Map, accent: 'fuchsia' },
  { id: 'pm-scope', title: 'Skop Kerja & Pertimbangan Pemasangan', desc: '6 elemen skop kerja pemasangan dan pertimbangan sebelum pemasangan (tapak, piawaian, kapasiti, risiko).', icon: ClipboardList, accent: 'indigo' },
  { id: 'pm-install', title: 'Proses Pemasangan, Ujian & Keselamatan', desc: 'Peralatan rangkaian, aliran kerja pemasangan, pengujian, troubleshooting, keselamatan dan logistik tapak.', icon: Network, accent: 'violet' },
  { id: 'pm-draw', title: 'Lukisan Rangkaian Komputer', desc: 'Lukisan fizikal (plan layout, rack drawing) vs logikal, komponen, membaca rajah dan perisian lukisan.', icon: PenTool, accent: 'fuchsia' },
];

const featureCards = [
  { id: 'quiz', target: 'quiz', title: 'Kuiz Penilaian', desc: '180 soalan (6 KP x 30 soalan: 10 easy, 10 medium, 10 hard KBAT). Buka setelah menyelesaikan semua 8 Nota.', icon: Award, accent: 'violet' },
];
const accentStyles = {
  blue: { icon: 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30', ring: 'hover:border-blue-300 hover:shadow-blue-200/60', badge: 'bg-blue-100 text-blue-700', topBar: 'from-blue-400 to-blue-600', text: 'text-blue-700', soft: 'bg-blue-50' },
  indigo: { icon: 'bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-500/30', ring: 'hover:border-indigo-300 hover:shadow-indigo-200/60', badge: 'bg-indigo-100 text-indigo-700', topBar: 'from-indigo-400 to-indigo-600', text: 'text-indigo-700', soft: 'bg-indigo-50' },
  violet: { icon: 'bg-gradient-to-br from-violet-500 to-violet-700 shadow-lg shadow-violet-500/30', ring: 'hover:border-violet-300 hover:shadow-violet-200/60', badge: 'bg-violet-100 text-violet-700', topBar: 'from-violet-400 to-violet-600', text: 'text-violet-700', soft: 'bg-violet-50' },
  teal: { icon: 'bg-gradient-to-br from-teal-500 to-teal-700 shadow-lg shadow-teal-500/30', ring: 'hover:border-teal-300 hover:shadow-teal-200/60', badge: 'bg-teal-100 text-teal-700', topBar: 'from-teal-400 to-teal-600', text: 'text-teal-700', soft: 'bg-teal-50' },
  emerald: { icon: 'bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/30', ring: 'hover:border-emerald-300 hover:shadow-emerald-200/60', badge: 'bg-emerald-100 text-emerald-700', topBar: 'from-emerald-400 to-emerald-600', text: 'text-emerald-700', soft: 'bg-emerald-50' },
  amber: { icon: 'bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg shadow-amber-500/30', ring: 'hover:border-amber-300 hover:shadow-amber-200/60', badge: 'bg-amber-100 text-amber-700', topBar: 'from-amber-400 to-amber-600', text: 'text-amber-700', soft: 'bg-amber-50' },
  fuchsia: { icon: 'bg-gradient-to-br from-fuchsia-500 to-fuchsia-700 shadow-lg shadow-fuchsia-500/30', ring: 'hover:border-fuchsia-300 hover:shadow-fuchsia-200/60', badge: 'bg-fuchsia-100 text-fuchsia-700', topBar: 'from-fuchsia-400 to-fuchsia-600', text: 'text-fuchsia-700', soft: 'bg-fuchsia-50' },
  rose: { icon: 'bg-gradient-to-br from-rose-500 to-rose-700 shadow-lg shadow-rose-500/30', ring: 'hover:border-rose-300 hover:shadow-rose-200/60', badge: 'bg-rose-100 text-rose-700', topBar: 'from-rose-400 to-rose-600', text: 'text-rose-700', soft: 'bg-rose-50' },
  sky: { icon: 'bg-gradient-to-br from-sky-500 to-sky-700 shadow-lg shadow-sky-500/30', ring: 'hover:border-sky-300 hover:shadow-sky-200/60', badge: 'bg-sky-100 text-sky-700', topBar: 'from-sky-400 to-sky-600', text: 'text-sky-700', soft: 'bg-sky-50' },
};


/* Animasi CSS - KHUSUS modul Project Management (LED kompas berkelip) */
function PmAnimStyles() {
  return (
    <style>{`
      @keyframes imsBlink { 0%, 100% { opacity: 1; } 50% { opacity: .25; } }
      @keyframes imsSpin { to { transform: rotate(360deg); } }
      @keyframes imsFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes imsScaleIn { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: scale(1); } }
      @keyframes imsBarPulse { 0%, 100% { opacity: .5; } 50% { opacity: 1; } }
      .pm-blink { animation: imsBlink 1.4s ease-in-out infinite; }
      .pm-blink-delay { animation: imsBlink 1.4s ease-in-out infinite; animation-delay: .5s; }
      .pm-fan { animation: imsSpin 2.5s linear infinite; transform-origin: center; }
      .pm-fan-fast { animation: imsSpin 1s linear infinite; transform-origin: center; }
      .pm-entry-title { animation: imsFadeUp .5s ease-out both; }
      .pm-entry-icon { animation: imsScaleIn .45s ease-out both; }
      .pm-entry-subtitle { animation: imsFadeUp .5s ease-out .1s both; }
      .pm-reveal { animation: imsFadeUp .5s ease-out both; }
      .pm-reveal-1{animation-delay:.05s}.pm-reveal-2{animation-delay:.1s}.pm-reveal-3{animation-delay:.15s}
      .pm-reveal-4{animation-delay:.2s}.pm-reveal-5{animation-delay:.25s}.pm-reveal-6{animation-delay:.3s}
      .pm-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
      .pm-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(225,29,72,.25); border-color: #fda4af; }
      .pm-card:hover .pm-card-icon { animation: imsScaleIn .3s ease-out; }
      .pm-bar-pulse { animation: imsBarPulse 1.6s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce) {
        .pm-blink, .pm-blink-delay, .pm-fan, .pm-fan-fast, .pm-entry-title, .pm-entry-icon,
        .pm-entry-subtitle, .pm-reveal, .pm-card, .pm-bar-pulse { animation: none !important; transition: none !important; }
        .pm-card:hover { transform: none; }
      }
    `}</style>
  );
}

function PageHeader({ title, subtitle, icon: Icon, onBack, accent = 'blue' }) {
  const style = accentStyles[accent] || accentStyles.blue;
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${style.topBar}`} />
      <div className={`pointer-events-none absolute -right-20 -top-24 w-72 h-72 rounded-full blur-3xl opacity-40 ${style.icon}`} />
      <div className="max-w-6xl mx-auto px-4 py-5 md:py-7 relative z-10">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white mb-5">
          <ArrowLeft size={18} /> Kembali ke Menu Modul
        </button>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-2xl border border-white/15 ${style.icon} pm-entry-icon`}><Icon size={28} className="text-white" /></div>
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight pm-entry-title">{title}</h1>
            <p className="text-slate-300 mt-2 max-w-3xl text-sm md:text-base pm-entry-subtitle">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, children, icon: Icon = CircleDot }) {
  return (
    <article className="pm-card pm-reveal bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
      <h3 className="font-black text-slate-900 text-lg flex items-center gap-2 mb-3"><Icon size={20} className="pm-card-icon text-violet-600" /> {title}</h3>
      <div className="text-sm md:text-base text-slate-600 leading-relaxed">{children}</div>
    </article>
  );
}

function NotaPenting({ children }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 flex gap-3">
      <Sparkles size={22} className="text-amber-600 shrink-0 mt-0.5" />
      <div><p className="text-xs font-black uppercase tracking-wide text-amber-700 mb-1">Nota Penting</p><div className="text-sm text-amber-900 leading-relaxed">{children}</div></div>
    </div>
  );
}

function Ringkasan({ children }) {
  return (
    <div className="rounded-2xl bg-slate-950 text-white p-5 md:p-6 flex gap-3">
      <ListChecks size={22} className="text-violet-300 shrink-0 mt-0.5" />
      <div><p className="text-xs font-black uppercase tracking-wide text-violet-300 mb-1">Ringkasan</p><div className="text-sm text-slate-100 leading-relaxed">{children}</div></div>
    </div>
  );
}

function NotesTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm">
        <thead><tr className="bg-violet-50 text-violet-900">{headers.map((h) => <th key={h} className="text-left font-black p-3 md:p-4">{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              {row.map((cell, j) => <td key={j} className="p-3 md:p-4 align-top border-t border-slate-200 text-slate-700">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




/* ---------------- KOMPONEN TAMBAHAN KHAS MODUL NOS ---------------- */

/* Blok terminal / fail konfigurasi. prompt=true => baris arahan berawalan $; baris berawalan # ialah komen. */

/* Langkah bernombor untuk prosedur */

/* Tab kecil di dalam satu nota (Konfigurasi / Pengujian / Penyelenggaraan) */
function SubTabs({ tabs }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2 mb-6">
        {tabs.map((t, i) => (
          <button key={t.label} role="tab" aria-selected={active === i} onClick={() => setActive(i)} className={`min-h-[44px] px-4 rounded-full text-xs md:text-sm font-black border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-500 ${active === i ? 'bg-violet-600 border-violet-600 text-white' : 'bg-white border-slate-300 text-slate-700 hover:border-violet-400'}`}>{t.label}</button>
        ))}
      </div>
      <div role="tabpanel" className="space-y-6" key={active}>{tabs[active].content}</div>
    </div>
  );
}

function Latihan({ items }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">Soalan Kertas Penerangan (jawab sendiri sebelum ke kuiz)</p>
      <ol className="list-decimal pl-5 space-y-1.5 text-sm text-slate-700">{items.map((t) => <li key={t}>{t}</li>)}</ol>
    </div>
  );
}

/* Rajah DNS Lookup - stepper interaktif. Setiap langkah menyerlahkan satu anak panah. */

/* Rajah kitaran amaran NMS (Manager <-> Agent, TRAP) - stepper interaktif */

/* Ikon hero - kompas berdenyut (tinjauan tapak) */
function CompassIcon({ size = 96 }) {
  return (
    <div className="relative flex items-center justify-center rounded-2xl bg-slate-900 border border-white/10" style={{ width: size, height: size }}>
      <Compass size={size * 0.5} className="text-violet-300" />
      <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-violet-400 pm-blink" />
      <span className="absolute top-3 right-6 w-2 h-2 rounded-full bg-fuchsia-300 pm-blink-delay" />
    </div>
  );
}

/* Stepper generik untuk aliran kerja */
function FlowStepper({ title, steps }) {
  const [i, setI] = useState(0);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h4 className="font-black text-slate-900">{title}</h4>
        <span className="text-xs font-black text-violet-700 bg-violet-50 rounded-full px-3 py-1">Langkah {i + 1} / {steps.length}</span>
      </div>
      <div className="flex gap-1.5 mb-4" role="tablist" aria-label={title}>
        {steps.map((s, k) => (
          <button key={s.t} type="button" onClick={() => setI(k)} aria-label={`Langkah ${k + 1}: ${s.t}`} aria-selected={i === k} className={`flex-1 h-2.5 rounded-full transition-colors ${k <= i ? 'bg-violet-500' : 'bg-slate-200'}`} />
        ))}
      </div>
      <div className="rounded-xl bg-violet-50 border border-violet-200 p-4 min-h-[110px]" aria-live="polite">
        <p className="font-black text-violet-900">{i + 1}. {steps[i].t}</p>
        <p className="text-sm text-violet-900/80 mt-1.5 leading-relaxed">{steps[i].d}</p>
      </div>
      <div className="flex gap-2 mt-3">
        <button type="button" disabled={i === 0} onClick={() => setI(i - 1)} className="min-h-[44px] px-4 rounded-xl border border-slate-300 text-sm font-black text-slate-700 disabled:opacity-40 hover:border-violet-400">Sebelum</button>
        <button type="button" disabled={i === steps.length - 1} onClick={() => setI(i + 1)} className="min-h-[44px] px-4 rounded-xl bg-violet-600 text-white text-sm font-black disabled:opacity-40 hover:bg-violet-700">Seterusnya</button>
        <button type="button" onClick={() => setI(0)} className="min-h-[44px] px-4 rounded-xl text-sm font-black text-slate-500 hover:text-slate-800 inline-flex items-center gap-1"><RotateCcw size={14} /> Ulang</button>
      </div>
    </div>
  );
}

/* Perbandingan 2.4 GHz vs 5 GHz */
function BandCompare() {
  const [band, setBand] = useState('2.4');
  const d = {
    '2.4': { t: '2.4 GHz', pros: 'Liputan lebih luas; menembusi dinding dengan lebih baik', cons: 'Lebih terdedah kepada gangguan (microwave, telefon tanpa wayar, rangkaian jiran); kelajuan lebih rendah', note: 'Hanya 3 saluran tidak bertindih: 1, 6 dan 11.', reach: 92 },
    '5': { t: '5 GHz', pros: 'Kelajuan lebih tinggi; kurang gangguan', cons: 'Liputan lebih terhad; kurang menembusi halangan fizikal', note: 'Lebih sesuai untuk aplikasi yang memerlukan bandwidth tinggi.', reach: 55 },
  };
  const c = d[band];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2"><HeadingIcon text={"Jalur Frekuensi Wi-Fi (interaktif)"} className="text-violet-600 shrink-0" size={18} />Jalur Frekuensi Wi-Fi (interaktif)</h4>
      <div className="flex gap-2 mb-4">
        {['2.4', '5'].map((b) => (
          <button key={b} onClick={() => setBand(b)} className={`min-h-[40px] px-4 rounded-full text-sm font-black border ${band === b ? 'bg-violet-600 border-violet-600 text-white' : 'bg-white border-slate-300 text-slate-700 hover:border-violet-400'}`}>{b} GHz</button>
        ))}
      </div>
      <div className="mb-3">
        <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1"><span>Jangkauan relatif</span><span>{c.reach}%</span></div>
        <div className="h-3 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400 transition-all duration-500" style={{ width: `${c.reach}%` }} /></div>
      </div>
      <dl className="space-y-1.5 text-sm text-slate-700 rounded-xl bg-slate-50 border border-slate-200 p-3">
        <div><dt className="inline font-bold text-emerald-700">Kelebihan: </dt><dd className="inline">{c.pros}</dd></div>
        <div><dt className="inline font-bold text-rose-700">Kekurangan: </dt><dd className="inline">{c.cons}</dd></div>
        <div><dt className="inline font-bold">Nota: </dt><dd className="inline">{c.note}</dd></div>
      </dl>
    </div>
  );
}

/* Rajah saluran 2.4 GHz: 1, 6, 11 tidak bertindih */
function ChannelDiagram() {
  const ch = [];
  for (let n = 1; n <= 11; n++) ch.push(n);
  const clear = [1, 6, 11];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <h4 className="font-black text-slate-900 mb-1 flex items-center gap-2"><HeadingIcon text={"Saluran 2.4 GHz: Hanya 1, 6 dan 11 Tidak Bertindih"} className="text-violet-600 shrink-0" size={18} />Saluran 2.4 GHz: Hanya 1, 6 dan 11 Tidak Bertindih</h4>
      <p className="text-xs text-slate-500 mb-3">Setiap saluran menduduki kira-kira 22 MHz, jadi saluran bersebelahan saling bertindih.</p>
      <svg viewBox="0 0 660 130" className="w-full" role="img" aria-label="Rajah saluran 2.4 GHz menunjukkan saluran 1, 6 dan 11 tidak bertindih">
        {ch.map((n) => {
          const x = 30 + (n - 1) * 46;
          const on = clear.includes(n);
          return (
            <g key={n}>
              <ellipse cx={x + 55} cy={85} rx={55} ry={on ? 45 : 32} fill={on ? '#8b5cf6' : '#cbd5e1'} fillOpacity={on ? 0.35 : 0.3} stroke={on ? '#7c3aed' : '#94a3b8'} strokeWidth={on ? 2 : 1} />
              <text x={x + 55} y={122} textAnchor="middle" fontSize="11" fontWeight={on ? 800 : 500} fill={on ? '#6d28d9' : '#64748b'}>{n}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* Lima jenis penyebaran gelombang radio */
function PropagationCards() {
  const items = [
    { n: 'Penyebaran Terus (Line of Sight)', d: 'Gelombang bergerak lurus tanpa halangan; isyarat terbaik kerana tiada pantulan atau gangguan.' },
    { n: 'Pantulan (Reflection)', d: 'Isyarat memantul pada permukaan rata seperti dinding logam atau kaca; boleh membantu capai kawasan tersembunyi tetapi juga menyebabkan gangguan.' },
    { n: 'Pembiasan (Refraction)', d: 'Gelombang membengkok apabila melalui bahan berketumpatan berbeza (tingkap atau lapisan udara panas); arah isyarat berubah.' },
    { n: 'Pembelauan (Diffraction)', d: 'Isyarat membelok apabila melepasi tepi objek seperti sudut bangunan atau tiang; membolehkan liputan ke kawasan bayang-bayang.' },
    { n: 'Penyerakan (Scattering)', d: 'Isyarat terkena permukaan kasar atau kecil (pokok, perabot kecil) lalu tersebar ke pelbagai arah.' },
  ];
  const [k, setK] = useState(0);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2"><HeadingIcon text={"5 Jenis Penyebaran Gelombang Radio (interaktif)"} className="text-violet-600 shrink-0" size={18} />5 Jenis Penyebaran Gelombang Radio (interaktif)</h4>
      <div className="flex flex-wrap gap-2 mb-3">
        {items.map((it, i) => (
          <button key={it.n} onClick={() => setK(i)} className={`min-h-[40px] px-3 rounded-full text-xs font-black border ${k === i ? 'bg-violet-600 border-violet-600 text-white' : 'bg-white border-slate-300 text-slate-700 hover:border-violet-400'}`}>{it.n.split(' (')[0]}</button>
        ))}
      </div>
      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
        <p className="font-black text-slate-900 text-sm">{items[k].n}</p>
        <p className="text-sm text-slate-700 mt-1.5">{items[k].d}</p>
      </div>
    </div>
  );
}

/* Warna peta haba (heatmap) */
function HeatmapLegend() {
  const rows = [
    ['bg-red-500', 'Merah', 'Isyarat sangat kuat (optimum & stabil)'],
    ['bg-orange-500', 'Oren', 'Isyarat baik (sedikit rendah dari optimum)'],
    ['bg-yellow-400', 'Kuning', 'Isyarat sederhana; masih boleh digunakan'],
    ['bg-green-500', 'Hijau', 'Isyarat lemah; sambungan mungkin perlahan'],
    ['bg-blue-600', 'Biru', 'Isyarat sangat lemah; sambungan tidak stabil'],
    ['bg-purple-500', 'Ungu / Kelabu', 'Tiada isyarat; zon mati (dead zone)'],
  ];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2"><HeadingIcon text={"Warna dalam Peta Haba (Heatmap)"} className="text-violet-600 shrink-0" size={18} />Warna dalam Peta Haba (Heatmap)</h4>
      <ul className="space-y-2">
        {rows.map(([c, n, d]) => (
          <li key={n} className="flex items-center gap-3 text-sm"><span className={`w-5 h-5 rounded-full shrink-0 ${c}`} /><span className="font-black text-slate-900 w-28 shrink-0">{n}</span><span className="text-slate-600">{d}</span></li>
        ))}
      </ul>
    </div>
  );
}

/* Lukisan rak interaktif - peralatan dalam unit U */
function RackDiagram() {
  const slots = [
    { u: '1-2U', n: 'Patch Panel', note: 'Bahagian atas/tengah supaya mudah sambung kabel', c: 'bg-sky-500' },
    { u: '3-4U', n: 'Switch', note: 'Peralatan ringan diletak di atas', c: 'bg-emerald-500' },
    { u: '5U', n: 'Router / Firewall', note: 'Dikumpulkan ikut kategori fungsi', c: 'bg-amber-500' },
    { u: '6-9U', n: 'Server', note: 'Peralatan berat di bawah untuk kestabilan rak', c: 'bg-rose-500' },
    { u: '10-12U', n: 'UPS', note: 'Sistem kuasa paling berat, di bahagian paling bawah', c: 'bg-slate-700' },
  ];
  const [s, setS] = useState(0);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2"><HeadingIcon text={"Penempatan Peralatan dalam Rak (klik satu peralatan)"} className="text-violet-600 shrink-0" size={18} />Penempatan Peralatan dalam Rak (klik satu peralatan)</h4>
      <div className="grid sm:grid-cols-2 gap-4 items-start">
        <div className="rounded-xl bg-slate-900 p-3 space-y-1.5 max-w-[260px] mx-auto w-full">
          {slots.map((x, i) => (
            <button key={x.n} onClick={() => setS(i)} className={`w-full flex items-center justify-between rounded-md px-3 text-white text-xs font-black ${x.c} ${s === i ? 'ring-2 ring-white' : 'opacity-80'}`} style={{ height: 30 + (x.n === 'Server' ? 30 : x.n === 'UPS' ? 20 : 0) }}><span>{x.n}</span><span className="text-white/80 font-mono">{x.u}</span></button>
          ))}
        </div>
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
          <p className="font-black text-slate-900">{slots[s].n} <span className="text-xs font-mono text-slate-500">{slots[s].u}</span></p>
          <p className="text-sm text-slate-700 mt-1.5">{slots[s].note}</p>
          <p className="text-xs text-slate-500 mt-3">Setiap peralatan mengambil 1U hingga beberapa U. Pastikan aliran udara lancar (depan ke belakang atau bawah ke atas) dan tidak menyekat kipas.</p>
        </div>
      </div>
    </div>
  );
}

/* Fizikal vs logikal */
function DrawingCompare() {
  const [m, setM] = useState('fizikal');
  const d = {
    fizikal: { t: 'Lukisan Fizikal (Physical Drawing)', f: 'Susun atur sebenar peranti dan kabel di tapak', s: 'Pelan susun atur (plan layout) dan lukisan rak (rack drawing)', u: 'Panduan pemasangan, pengurusan infrastruktur dan penyelenggaraan', x: 'Lokasi rak, kabinet, soket Ethernet, patch panel, punca kuasa, laluan kabel' },
    logikal: { t: 'Lukisan Logikal (Logical Drawing)', f: 'Hubungan dan struktur rangkaian dari segi logik, tanpa mengambil kira lokasi sebenar', s: 'Topologi (star, mesh, hybrid), subnet, VLAN dan protokol', u: 'Troubleshooting konfigurasi, audit keselamatan dan pelan pengembangan', x: 'IP address, VLAN ID, sambungan antara router, switch, server dan client' },
  };
  const c = d[m];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2"><HeadingIcon text={"Lukisan Fizikal vs Logikal"} className="text-violet-600 shrink-0" size={18} />Lukisan Fizikal vs Logikal</h4>
      <div className="flex gap-2 mb-4">
        {['fizikal', 'logikal'].map((k) => (
          <button key={k} onClick={() => setM(k)} className={`min-h-[40px] px-4 rounded-full text-sm font-black border capitalize ${m === k ? 'bg-violet-600 border-violet-600 text-white' : 'bg-white border-slate-300 text-slate-700 hover:border-violet-400'}`}>{k}</button>
        ))}
      </div>
      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
        <p className="font-black text-slate-900 text-sm mb-2">{c.t}</p>
        <dl className="space-y-1.5 text-sm text-slate-700">
          <div><dt className="inline font-bold">Fokus: </dt><dd className="inline">{c.f}</dd></div>
          <div><dt className="inline font-bold">Komponen: </dt><dd className="inline">{c.s}</dd></div>
          <div><dt className="inline font-bold">Kegunaan: </dt><dd className="inline">{c.u}</dd></div>
          <div><dt className="inline font-bold">Maklumat: </dt><dd className="inline">{c.x}</dd></div>
        </dl>
      </div>
    </div>
  );
}

/* ---------------- NOTA 1: TINJAUAN TAPAK & SENARAI SEMAK ---------------- */
function PmSurveyNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Apakah Tinjauan Tapak (Site Survey)?" icon={MapPin}>
        <p>Tinjauan tapak ialah langkah awal terancang dalam projek pemasangan rangkaian untuk menilai lokasi dan keadaan yang boleh mempengaruhi pemasangan. Ia bukan sekadar pemerhatian biasa; ia memastikan pemasangan dapat dilakukan secara <b>efisien, selamat</b> dan menepati keperluan sistem, serta menghasilkan dokumentasi untuk tindakan lanjut.</p>
        <p className="mt-3">Faktor yang dinilai: struktur bangunan, ketebalan dinding, laluan kabel, lokasi sumber kuasa, gangguan elektromagnetik, suhu, kelembapan dan risiko gangguan fizikal. Maklumat direkodkan dalam laporan rasmi. Pemegang taruh (stakeholder) seperti pengurus projek, juruteknik, penyedia perkhidmatan dan pengguna akhir perlu berkomunikasi dan diselaraskan.</p>
      </InfoCard>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Tinjauan Rangkaian Tanpa Wayar" icon={Wifi}>
          <p>Memerlukan perhatian khusus kerana jarak, halangan fizikal dan gangguan isyarat. Perkara yang diteliti: kekuatan isyarat setiap kawasan, lokasi terbaik access point, dan saluran frekuensi sesuai. Menggunakan pengimbas Wi-Fi dan perisian peta haba (heatmap) untuk mengelakkan <b>dead zone</b>, serta mengambil kira kapasiti pengguna dan jenis peranti.</p>
        </InfoCard>
        <InfoCard title="Penempatan Peralatan" icon={Server}>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Peralatan berwayar (switch, router, patch panel) dipasang dalam <b>rak</b> dengan pengurusan kabel.</li>
            <li>Access point lazimnya dipasang pada ketinggian <b>2.5 hingga 3.0 meter</b> dari aras lantai.</li>
            <li>Pertimbangkan pengudaraan, akses penyelenggaraan dan perlindungan daripada kelembapan.</li>
          </ul>
        </InfoCard>
      </div>

      <InfoCard title="Keselamatan dan Pematuhan" icon={ShieldCheck}>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Keselamatan fizikal:</b> kabinet berkunci, sangkar keselamatan untuk access point, kabel teratur supaya tidak tersandung atau putus.</li>
          <li><b>Piawaian:</b> TIA/EIA-568 (pemasangan kabel) dan MS IEC 60364 (keselamatan elektrik).</li>
          <li><b>Polisi tapak:</b> peraturan dan prosedur keselamatan, akses dan kerja semasa pemasangan.</li>
          <li><b>Di Malaysia:</b> garis panduan MCMC wajib dipatuhi sebelum pemasangan.</li>
        </ul>
      </InfoCard>

      <InfoCard title="Dokumentasi dan Pelaporan" icon={ClipboardList}>
        <p>Rekod setiap langkah kerja, konfigurasi, pelan susun atur dan keputusan ujian. Dokumen penting: <b>pelan tapak, rajah rangkaian (network diagram), senarai inventori peralatan, senarai konfigurasi</b> dan <b>laporan hasil ujian</b>, dalam bentuk bercetak dan digital.</p>
        <NotesTable headers={['Dokumen', 'Fungsi']} rows={[
          ['Senarai semak (checklist)', 'Memastikan semua keperluan penting diperiksa sebelum pemasangan: lokasi, kuasa, akses fizikal, isu persekitaran'],
          ['Borang ringkasan laporan', 'Mengumpul keputusan, cabaran semasa tinjauan dan cadangan untuk pemasangan seterusnya'],
          ['Pelan susun atur', 'Menunjukkan lokasi pemasangan, susun atur peralatan dan laluan kabel'],
        ]} />
      </InfoCard>

      <FlowStepper title="Carta Alir Senarai Semak Tinjauan Tapak (interaktif)" steps={[
        { t: 'Mula', d: 'Tinjauan bermula dengan senarai semak lawatan tapak yang lengkap.' },
        { t: 'Penilaian Tapak dan Pemeriksaan Fizikal', d: 'Kebersihan dan kekemasan, ruang dan akses, kekuatan struktur, pengudaraan dan suhu bilik (ideal 21°C hingga 24°C), serta pematuhan standard dan undang-undang tempatan.' },
        { t: 'Pengurusan Kabel', d: 'Ketersediaan infrastruktur kabel (Ethernet, fibre optic, kabel kuasa, conduit), pengurusan dan susun atur kabel, kualiti dan pengujian serta pelabelan setiap kabel.' },
        { t: 'Sumber Bekalan Kuasa dan Sistem Sokongan', d: 'Ketersediaan, kestabilan, kapasiti bekalan, redundansi (UPS, bateri sokongan, generator) dan kualiti kabel kuasa.' },
        { t: 'Selesai', d: 'Semua keputusan direkodkan dalam borang laporan untuk perancangan pemasangan.' },
      ]} />

      <NotesTable headers={['Kawasan Semakan', 'Perkara yang Diperiksa']} rows={[
        ['Penilaian tapak', 'Kebersihan, akses dan ruang, struktur mampu menyokong berat peralatan, pengudaraan (penghawa dingin, cooling fan, exhaust fan), pematuhan undang-undang'],
        ['Pengurusan kabel', 'Semua jenis kabel tersedia, panjang mencukupi, disusun kemas, diuji dan dilabel'],
        ['Perancangan kuasa', 'Jenis dan bilangan soket, voltan, kestabilan (perlindungan), kapasiti beban, UPS/generator, kualiti sambungan'],
      ]} />

      <Latihan items={['Nyatakan tiga (3) perkara yang dinilai semasa melakukan tinjauan tapak bagi pemasangan rangkaian berwayar dan tanpa wayar.', 'Jelaskan maksud tinjauan tapak serta kepentingannya dalam proses pemasangan rangkaian.', 'Huraikan perbezaan utama antara tinjauan tapak bagi rangkaian berwayar dengan rangkaian tanpa wayar.', 'Terangkan dua (2) aspek keselamatan yang perlu dipertimbangkan semasa penempatan dan pemasangan peralatan rangkaian.']} />
      <Ringkasan>Tinjauan tapak ialah <b>langkah awal terancang</b> yang menilai keadaan fizikal, teknikal dan persekitaran. Ia diurus melalui <b>senarai semak</b> tiga blok (tapak, kabel, kuasa), dipatuhi piawaian (TIA/EIA-568, MS IEC 60364, MCMC) dan direkodkan dalam laporan serta pelan susun atur.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 2: PERALATAN TINJAUAN & BORANG LAPORAN ---------------- */
function PmToolsNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Kategori Peralatan Tinjauan" icon={Wrench}>
        <p>Peralatan yang betul memberi data sahih dan mempercepat pemeriksaan. Ia dibahagikan kepada empat kategori: <b>pemeriksaan fizikal, ujian rangkaian berwayar, tinjauan rangkaian tanpa wayar</b> dan <b>ujian prestasi rangkaian</b>.</p>
      </InfoCard>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Pita Ukur" icon={Ruler}>
          <p className="text-sm">Alat manual, pita fleksibel untuk jarak pendek.</p>
          <p className="text-sm mt-2"><b className="text-emerald-700">Kelebihan:</b> mudah, tiada bateri. <b className="text-rose-700">Kekurangan:</b> tidak sesuai untuk jarak sangat panjang.</p>
        </InfoCard>
        <InfoCard title="Pengukur Jarak Meter Laser" icon={Crosshair}>
          <p className="text-sm">Alat elektronik berteknologi laser; hasil pada skrin digital. Model contoh: Leica DISTO D2 dan Makita LD050P; boleh mengukur luas dan volum.</p>
          <p className="text-sm mt-2"><b className="text-emerald-700">Kelebihan:</b> sangat tepat dan cepat, sesuai jarak jauh. <b className="text-rose-700">Kekurangan:</b> perlu bateri dan lebih mahal.</p>
        </InfoCard>
      </div>
      <InfoCard title="Laptop" icon={Laptop}>
        <p>Alat sokongan untuk menjalankan perisian analisis (kekuatan isyarat, analisis rangkaian, kualiti kabel), menyimpan data, menyusun laporan ringkas, membuat grafik dan carta serta merancang susun atur.</p>
      </InfoCard>

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"Peralatan Ujian Rangkaian Berwayar"} className="text-violet-600 shrink-0" size={20} />Peralatan Ujian Rangkaian Berwayar</h3>
        <NotesTable headers={['Alat', 'Fungsi']} rows={[
          ['Penguji kabel (Cable Tester)', 'Menguji penyambungan kabel Ethernet dari hujung ke hujung'],
          ['Penguji rangkaian lanjutan (Advanced Network Tester)', 'Menguji kelajuan transmisi, crosstalk, insertion loss dan parameter lain mengikut piawaian TIA/EIA'],
          ['OTDR (Optical Time Domain Reflectometer)', 'Mengukur kehilangan isyarat, sambungan rosak atau bengkokan gentian optik dengan ketepatan jarak kerosakan'],
        ]} />
      </div>

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"Peralatan Tinjauan Tanpa Wayar"} className="text-violet-600 shrink-0" size={20} />Peralatan Tinjauan Tanpa Wayar</h3>
        <NotesTable headers={['Alat', 'Fungsi']} rows={[
          ['Wi-Fi Analyzer', 'Mengukur kekuatan isyarat, mengenal pasti SSID, saluran dan tahap gangguan; membantu memilih saluran paling sesuai'],
          ['Site Survey Tools (Ekahau, NetSpot)', 'Menghasilkan peta haba (heatmap) liputan isyarat untuk merancang lokasi access point'],
          ['Spectrum Analyzer', 'Menganalisis spektrum frekuensi radio untuk mengesan sumber gangguan yang tidak kelihatan pada Wi-Fi analyzer biasa, contohnya microwave atau Bluetooth'],
        ]} />
      </div>

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"Peralatan Ujian Prestasi Rangkaian"} className="text-violet-600 shrink-0" size={20} />Peralatan Ujian Prestasi Rangkaian</h3>
        <NotesTable headers={['Alat', 'Mengukur']} rows={[
          ['Throughput Tester', 'Kelajuan pemindahan data berbanding spesifikasi'],
          ['Packet Loss Tester', 'Kehilangan paket data yang menyebabkan kelewatan atau gangguan komunikasi'],
          ['Latency Tester', 'Masa tindak balas (response time) antara dua titik'],
          ['Jitter Tester', 'Kestabilan isyarat, terutama untuk VoIP dan panggilan video'],
        ]} />
      </div>

      <InfoCard title="Borang Laporan Tinjauan Tapak Rangkaian" icon={ClipboardList}>
        <NotesTable headers={['Bahagian', 'Kandungan']} rows={[
          ['Maklumat Projek', 'Nama projek, lokasi tapak, tarikh tinjauan, nama juruteknik'],
          ['Maklumat Tapak', 'Keterangan tapak (saiz bilik, lokasi, penggunaan), ketersediaan kuasa (voltan, kestabilan), pengudaraan dan penyejukan, akses dan ruang'],
          ['Keperluan Infrastruktur', 'Cabling readiness (jenis, panjang, pengurusan kabel), sumber kuasa dan kapasiti, pelan susun atur'],
          ['Masalah dan Cabaran', 'Isu dikenal pasti (kekurangan ruang, masalah kuasa) dan cadangan penyelesaian'],
          ['Keputusan dan Cadangan', 'Ringkasan kesediaan tapak dan cadangan langkah pemasangan'],
          ['Lampiran', 'Gambar lokasi, peta pelan lantai, rajah sambungan, carta isyarat dan nota teknikal sebagai bukti sokongan'],
        ]} />
      </InfoCard>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          ['Penilaian Fizikal', 'Susun atur ruang, kedudukan soket, laluan kabel, pencahayaan, pengudaraan; halangan seperti dinding tebal, tiang konkrit atau perabot besar.'],
          ['Penilaian Tanpa Wayar', 'Dead zone, gangguan (interference), kapasiti pengguna; data RSSI, throughput, latency dan pemilihan saluran.'],
          ['Penilaian Berwayar', 'Kualiti kabel, sambungan patch panel, keadaan switch, konfigurasi port; kabel rosak, sambungan longgar dan keperluan tambahan.'],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="font-black text-slate-900 text-sm">{t}</p><p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{d}</p></div>
        ))}
      </div>

      <Latihan items={['Terangkan perbezaan antara penggunaan pita ukur dengan pengukur jarak meter laser semasa tinjauan tapak.', 'Huraikan peranan laptop dalam tinjauan tapak rangkaian.', 'Senaraikan tiga (3) peralatan utama untuk ujian prestasi rangkaian beserta fungsinya.', 'Apakah tujuan lampiran laporan tinjauan?']} />
      <Ringkasan>Empat kategori alat: <b>pemeriksaan fizikal</b> (pita ukur, laser, laptop), <b>ujian berwayar</b> (cable tester, advanced tester, OTDR), <b>tanpa wayar</b> (Wi-Fi analyzer, Ekahau/NetSpot, spectrum analyzer) dan <b>prestasi</b> (throughput, packet loss, latency, jitter). Hasilnya dicatat dalam <b>borang laporan</b> lima bahagian berserta lampiran.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 3: WLAN & TITIK CAPAIAN TANPA WAYAR ---------------- */
function PmWlanNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Asas WLAN" icon={Wifi}>
        <p>WLAN (Wireless Local Area Network) membolehkan peranti berkomunikasi tanpa kabel fizikal melalui gelombang radio dalam kawasan terhad, dengan mobiliti tinggi. Dengan gateway, WLAN boleh menyambung ke internet. Ia diperkenalkan pada akhir 1990-an dan kini termasuk Wi-Fi 6 dan Wi-Fi 6E.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {[
            ['Access Point (AP)', 'Pemancar isyarat yang menghubungkan peranti tanpa wayar ke rangkaian.'],
            ['NIC', 'Kad rangkaian pada komputer atau telefon pintar untuk menyambung ke rangkaian.'],
            ['Alamat MAC', 'Alamat unik untuk memastikan paket sampai ke destinasi betul.'],
            ['SSID', 'Service Set Identifier: identiti rangkaian yang dikenal pasti peranti pengguna.'],
            ['BSS dan ESS', 'Basic Service Set dan Extended Service Set: topologi yang menentukan struktur rangkaian.'],
            ['OFDM', 'Teknologi penghantaran paket melalui gelombang radio secara stabil dan pantas.'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl bg-slate-50 border border-slate-200 p-3"><p className="font-black text-slate-900 text-sm">{t}</p><p className="text-xs text-slate-600 mt-1">{d}</p></div>
          ))}
        </div>
      </InfoCard>

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"Piawaian IEEE 802.11"} className="text-violet-600 shrink-0" size={20} />Piawaian IEEE 802.11</h3>
        <NotesTable headers={['Piawaian', 'Tahun', 'Frekuensi', 'Kelajuan Maks.', 'Ciri-ciri']} rows={[
          ['802.11b (Wi-Fi 1)', '1999', '2.4 GHz', '11 Mbps', 'Kos rendah, liputan luas, tetapi mudah terganggu peranti lain'],
          ['802.11a (Wi-Fi 2)', '1999', '5 GHz', '54 Mbps', 'Liputan lebih pendek, mudah terhalang; sesuai aplikasi bandwidth tinggi'],
          ['802.11g (Wi-Fi 3)', '2003', '2.4 GHz', '54 Mbps', 'Kelajuan tinggi dan liputan luas; serasi dengan 802.11b'],
          ['802.11n (Wi-Fi 4)', '2009', '2.4 & 5 GHz', '600 Mbps', 'Menggunakan MIMO'],
          ['802.11ac (Wi-Fi 5)', '2013', '5 GHz', '1.3 Gbps', 'MU-MIMO untuk ramai pengguna serentak; saluran lebar 40 MHz'],
          ['802.11ax (Wi-Fi 6)', '2019', '2.4 & 5 GHz', '9.6 Gbps', 'OFDMA; saluran 80 MHz atau 160 MHz; sesuai persekitaran padat'],
        ]} />
        <NotaPenting>Standard asal 802.11 (1997) mempunyai julat dalaman 66 kaki dan luar 330 kaki, dengan lebar jalur hampir 2 Mbps, dan produknya tidak lagi dibuat. Kertas Penerangan menulis OFDMA sebagai "Orthogonal Frequency Division Multiplexing"; dalam istilah piawai, OFDMA ialah <b>Orthogonal Frequency Division Multiple Access</b>, iaitu kaedah membahagikan saluran kepada ramai pengguna.</NotaPenting>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Ancaman WLAN" icon={ShieldAlert}>
          <p className="text-sm mb-2">Keselamatan WLAN lebih kritikal kerana isyarat radio tersebar di udara dan boleh dipintas.</p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li><b>War Driving:</b> mengimbas dan mencuri akses Wi-Fi tidak selamat menggunakan kenderaan.</li>
            <li><b>Rogue Access Point:</b> AP palsu untuk mencuri data pengguna.</li>
            <li><b>Spoofing:</b> menyamar sebagai peranti sah.</li>
            <li><b>Eavesdropping:</b> memintas dan membaca komunikasi tanpa disedari.</li>
          </ul>
        </InfoCard>
        <InfoCard title="Langkah Keselamatan" icon={Lock}>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li>Enkripsi kuat: <b>WPA2</b> atau <b>WPA3</b>.</li>
            <li><b>MAC filtering</b> untuk menyaring peranti dibenarkan.</li>
            <li>Menyembunyikan SSID.</li>
            <li><b>VPN</b> untuk sambungan jauh.</li>
          </ul>
        </InfoCard>
      </div>
      <NotaPenting>Menyembunyikan SSID dan MAC filtering hanya menambah halangan kecil kerana kedua-duanya boleh dikesan atau dipalsukan. Perlindungan sebenar datang daripada enkripsi WPA2/WPA3; jadikan ia sebagai lapisan tambahan, bukan pengganti.</NotaPenting>

      <InfoCard title="Wireless Access Point (WAP)" icon={Router}>
        <p>WAP menghubungkan rangkaian berwayar (LAN) dengan peranti tanpa wayar: ia menerima isyarat daripada kabel dan memancarkannya sebagai isyarat radio. Menambah WAP memperluas liputan. WAP juga menguruskan trafik dan QoS, serta menyokong WPA2, penapisan MAC dan pengesahan pengguna.</p>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
            <p className="font-black text-slate-900 text-sm mb-1">Komponen utama</p>
            <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1"><li><b>Antena</b> (omni-directional atau directional)</li><li><b>Port Ethernet</b> ke switch atau router</li><li><b>Pemproses dan memori</b> (autentikasi, enkripsi, trafik)</li><li><b>LED indikator</b> (kuasa, sambungan, data)</li><li><b>Bekalan kuasa</b>: Power over Ethernet (PoE) atau adaptor</li></ul>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
            <p className="font-black text-slate-900 text-sm mb-1">Operasi asas</p>
            <ol className="list-decimal pl-5 text-xs text-slate-700 space-y-1"><li>Peranti memilih SSID dan menghantar permintaan sambungan.</li><li>WAP mengesahkan identiti pengguna (jika ditetapkan).</li><li>Selepas disahkan, akses diberi ke rangkaian berwayar dan internet.</li><li>Semua trafik melalui sambungan Ethernet ke switch atau router.</li></ol>
          </div>
        </div>
      </InfoCard>

      <NotesTable headers={['Jenis WAP', 'Ciri', 'Kelebihan', 'Kekurangan']} rows={[
        ['Lightweight (Controller-Based)', 'Diurus berpusat oleh satu controller', 'Sesuai rangkaian besar (kampus, hospital); pengoptimuman saluran dan kuasa automatik; fast roaming dalam ESS; kemas kini keselamatan berpusat', 'Kos tinggi (beli controller); jika controller gagal rangkaian terjejas kecuali AP ada failover'],
        ['Autonomi (Autonomous)', 'Setiap AP dikonfigurasi dan diurus secara individu', 'Kos rendah; ideal pejabat kecil, kedai atau rumah', 'Pengurusan sukar apabila AP bertambah; kurang efisien untuk skala besar'],
        ['Cloud-Managed', 'Dikonfigurasi dan dipantau melalui platform cloud (Cisco Meraki, Aruba Central)', 'Kawalan dari satu tempat untuk banyak cawangan; auto-provisioning; update dan patch automatik', 'Bergantung pada cloud; yuran langganan'],
      ]} />

      <Latihan items={['Apakah yang dimaksudkan dengan teknologi Wireless LAN (WLAN)?', 'Apakah kelebihan menggunakan WAP berasaskan pengawal (controller-based)?', 'Apakah kepentingan SSID dalam operasi WLAN?', 'Apakah piawaian IEEE 802.11 yang paling banyak digunakan hari ini dan kenapa?', 'Bagaimanakah konsep BSS dan ESS berfungsi dalam WLAN?']} />
      <Ringkasan>WLAN berasaskan <b>AP, NIC, SSID dan gelombang radio</b> mengikut piawaian <b>IEEE 802.11</b> (b hingga ax). Ancaman utama: war driving, rogue AP, spoofing dan eavesdropping; ditangani dengan <b>WPA2/WPA3</b>, MAC filtering dan VPN. Tiga jenis WAP: <b>lightweight, autonomi</b> dan <b>cloud-managed</b>.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 4: LIPUTAN ISYARAT TANPA WAYAR ---------------- */
function PmSignalNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Liputan Radio Tanpa Wayar" icon={Radio}>
        <p>Liputan ialah kawasan di mana isyarat radio daripada WAP atau router boleh diterima dengan baik oleh peranti lain, biasanya pada spektrum 2.4 GHz atau 5 GHz. Ia berubah mengikut halangan fizikal, jarak dan gangguan. Gelombang radio ialah sinaran elektromagnet berpanjang gelombang lebih panjang daripada cahaya inframerah.</p>
      </InfoCard>

      <PropagationCards />

      <InfoCard title="Kelemahan Isyarat dan Gangguan" icon={SignalLow}>
        <p>Kelemahan isyarat ialah penurunan kekuatan akibat jarak, halangan atau multipath. Gangguan berlaku apabila isyarat lain mengganggu Wi-Fi sehingga kelajuan menurun atau sambungan terputus.</p>
      </InfoCard>

      <NotesTable headers={['Faktor', 'Kesan']} rows={[
        ['Frekuensi 2.4 GHz', 'Liputan lebih luas dan menembusi dinding lebih baik, tetapi terdedah kepada gangguan'],
        ['Frekuensi 5 GHz', 'Lebih laju dan kurang gangguan, tetapi liputan terhad'],
        ['Halangan fizikal', 'Konkrit, logam dan kayu menyerap atau memantulkan isyarat; perabot besar turut menyerap'],
        ['Jarak', 'Semakin jauh daripada WAP, semakin lemah isyarat'],
        ['Gangguan', 'Telefon tanpa wayar, microwave dan rangkaian berdekatan pada saluran sama'],
        ['Kuasa isyarat', 'Kuasa tinggi beri liputan luas tetapi menambah penggunaan tenaga dan gangguan'],
      ]} />

      <BandCompare />
      <ChannelDiagram />

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"Ciri-ciri Antena"} className="text-violet-600 shrink-0" size={20} />Ciri-ciri Antena</h3>
        <NotesTable headers={['Ciri / Jenis', 'Penerangan']} rows={[
          ['Gain (dB)', 'Keupayaan memfokuskan isyarat ke arah tertentu; gain tinggi memberi isyarat lebih jauh'],
          ['Polarization', 'Orientasi medan elektrik berbanding ufuk: menegak (vertical) atau mendatar (horizontal)'],
          ['Omnidirectional', 'Memancar 360° pada bidang mendatar; sesuai kawasan terbuka seperti pejabat dan dewan'],
          ['Directional', 'Memfokuskan isyarat ke satu arah; sesuai sambungan jarak jauh, contohnya antara dua bangunan'],
          ['Sector', 'Menyebarkan isyarat dalam sudut tertentu (contoh 120°); sesuai luar bangunan'],
        ]} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Penyebaran Pelbagai Laluan (Multipath)" icon={GitBranch}>
          <p className="text-sm">Isyarat tiba melalui banyak laluan akibat pantulan, pembelauan atau pembiasan, sehingga ada yang tiba lambat atau berbeza fasa.</p>
          <ul className="list-disc pl-5 text-sm mt-2 space-y-1"><li><b>ISI (Inter-Symbol Interference):</b> isyarat pantulan bercampur dengan isyarat utama.</li><li><b>Delay Spread:</b> perbezaan masa ketibaan isyarat utama dan pantulan.</li></ul>
          <p className="text-sm mt-2"><b>Kaedah mengatasi:</b> teknologi MIMO dan teknik equalization pada penerima.</p>
        </InfoCard>
        <InfoCard title="Pertimbangan Reka Bentuk Liputan Wi-Fi" icon={Layers}>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li><b>Bilangan dan lokasi AP</b> - elak pertindihan berlebihan dan dead zone.</li>
            <li><b>Pemilihan frekuensi</b> - 2.4 GHz (luas) atau 5 GHz (pantas).</li>
            <li><b>Pemilihan saluran</b> tidak bertindih.</li>
            <li><b>Halangan fizikal</b> - konkrit, logam, kaca tebal.</li>
            <li><b>Kapasiti pengguna</b> - bukan liputan sahaja, tetapi jumlah pengguna aktif serentak.</li>
          </ul>
        </InfoCard>
      </div>

      <Latihan items={['Nyatakan tiga (3) jenis penyebaran gelombang radio yang boleh mempengaruhi liputan WLAN.', 'Apakah faktor utama yang mempengaruhi kekuatan isyarat Wi-Fi?']} />
      <Ringkasan>Gelombang radio bergerak melalui <b>penyebaran terus, pantulan, pembiasan, pembelauan</b> dan <b>penyerakan</b>. Kekuatan isyarat dipengaruhi frekuensi, halangan, jarak, gangguan dan kuasa. Antena dipilih ikut <b>gain, polarisasi</b> dan jenis (omni, directional, sector), manakala multipath diatasi dengan <b>MIMO</b> dan equalization.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 5: PELAN LANTAI, PERALATAN & PEMASANGAN WAP ---------------- */
function PmFloorNotes() {
  const plan = (
    <>
      <InfoCard title="Pelan Lantai Kemudahan (Berskala)" icon={Map}>
        <p>Gambar rajah yang menggambarkan susun atur fizikal ruang dalam bangunan dengan ukuran tepat. Dalam rangkaian, ia turut memaparkan lokasi AP, switch dan router.</p>
      </InfoCard>
      <NotesTable headers={['Kepentingan Pelan Lantai', 'Penerangan']} rows={[
        ['Perancangan penempatan AP', 'Menentukan lokasi strategik untuk liputan optimum'],
        ['Pengurusan jangkauan isyarat', 'Menilai kesan dinding, pintu dan struktur lain terhadap isyarat'],
        ['Penyelarasan infrastruktur', 'Panduan keperluan elektrik dan pemasangan lain untuk WAP'],
        ['Pengukuran dan pengiraan', 'Skala membolehkan jarak sebenar diukur untuk menilai kawasan liputan'],
      ]} />
      <FlowStepper title="Penyediaan Pelan Lantai Rangkaian (interaktif)" steps={[
        { t: 'Pengumpulan maklumat', d: 'Dapatkan pelan asal terkini yang berskala daripada sumber dipercayai (pelukis bangunan, arkitek, pengurus infrastruktur). Kenal pasti skala, contohnya 1:100 iaitu 1 cm mewakili 100 cm.' },
        { t: 'Analisa struktur bangunan', d: 'Kenal pasti dinding, pintu, tingkap dan struktur yang menjejaskan isyarat, dan tentukan kawasan yang perlukan liputan baik seperti bilik mesyuarat, pejabat atau ruang awam.' },
        { t: 'Tentukan lokasi penempatan AP', d: 'Pilih lokasi strategik dengan halangan minimum; pertimbangkan akses penyelenggaraan tetapi selamat daripada kerosakan dan gangguan.' },
        { t: 'Pengiraan jangkauan dan kuantiti', d: 'Gunakan skala untuk mengira jarak dan liputan, kemudian tentukan bilangan WAP untuk memenuhi keperluan liputan dan kapasiti.' },
        { t: 'Simulasi dan ujian', d: 'Guna perisian reka bentuk untuk mensimulasikan penempatan WAP; selepas pemasangan, lakukan ujian lapangan dan buat penyesuaian jika perlu.' },
      ]} />
      <NotesTable headers={['Ciri Pelan Lantai', 'Penerangan']} rows={[
        ['Skala yang jelas', 'Menunjukkan nisbah ukuran sebenar, contohnya 1:50 atau 1:100'],
        ['Anotasi lengkap', 'Bilik, arah utara, lokasi AP, titik kuasa dan saluran kabel ditanda jelas dan konsisten'],
        ['Penanda halangan', 'Dinding konkrit, tingkap kaca, perabot besar atau tangki air divisualkan'],
        ['Peta liputan (heatmap)', 'Peta kekuatan isyarat disatukan ke atas pelan: kawasan kuat, sederhana dan lemah'],
        ['Fleksibiliti simulasi', 'Membolehkan menilai impak apabila AP ditambah atau dialihkan'],
      ]} />
    </>
  );
  const tools = (
    <>
      <NotesTable headers={['Tujuan Penggunaan Peralatan', 'Penerangan']} rows={[
        ['Pemantauan isyarat dan kualiti', 'Kekuatan isyarat di pelbagai lokasi dan kualiti berdasarkan SNR (Signal-to-Noise Ratio) serta interferensi'],
        ['Pemetaan liputan', 'Peta visual kawasan kuat, lemah dan tiada isyarat; peta interaktif untuk laras kedudukan AP'],
        ['Pengesanan interferensi', 'Mengesan sumber gangguan seperti rangkaian lain atau peranti elektronik dan panduan penyelesaian'],
        ['Analisa rangkaian', 'Analisis saluran untuk elak kesesakan; ukur kapasiti dan beban'],
        ['Pelaporan dan cadangan', 'Laporan terperinci, dokumentasi dan cadangan penambahbaikan penempatan AP dan saluran'],
        ['Mobiliti dan persekitaran', 'Aplikasi mudah alih, pengumpulan data bergerak; sesuai dalam dan luar bangunan'],
      ]} />
      <NotesTable headers={['Perisian', 'Ciri Utama', 'Sesuai Untuk']} rows={[
        ['SolarWinds (NPM, Wi-Fi Heatmap)', 'Memantau prestasi rangkaian secara menyeluruh; heatmap boleh dikemas kini secara live; integrasi enterprise', 'Organisasi besar'],
        ['Ekahau (Site Survey, Analyzer, Pro)', 'Popular dan canggih; ketepatan tinggi; Pro menyokong pemodelan 3D, Wi-Fi 6E, auto-optimasi dan laporan', 'Kajian profesional'],
        ['NetSpot (Windows/Mac, Pro)', 'Pemetaan isyarat dan heatmap; kos efektif dan mudah digunakan', 'SOHO dan latihan asas'],
      ]} />
      <HeatmapLegend />
    </>
  );
  const install = (
    <>
      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"Tiga Kaedah Pemasangan WAP"} className="text-violet-600 shrink-0" size={20} />Tiga Kaedah Pemasangan WAP</h3>
        <NotesTable headers={['Kaedah', 'Kelebihan', 'Kekurangan', 'Contoh']} rows={[
          ['Terdedah (Exposed)', 'Mudah diakses; pemasangan cepat dan kos rendah', 'Estetika kurang menarik; lebih terdedah kepada kerosakan', 'Ruang tamu dan pejabat terbuka'],
          ['Tersembunyi (Hidden)', 'Kemas dan profesional; dilindungi daripada gangguan fizikal', 'Akses penyelenggaraan sukar; risiko halangan isyarat jika terlalu tersembunyi', 'Dalam panel dinding atau belakang perabot'],
          ['Terbenam (Recessed)', 'Bersih dan premium; perlindungan fizikal tambahan', 'Kos dan masa lebih tinggi; isyarat sedikit lemah jika antena tidak tepat', 'Siling grid atau kotak khas di pejabat dan ruang awam'],
        ]} />
      </div>
      <InfoCard title="Pengoptimuman Liputan" icon={Gauge}>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Letakkan WAP di lokasi strategik dan orientasikan antena (vertikal atau horizontal) ikut jenis antena.</li>
          <li>Elak <b>saluran bertindih</b>. Pada 2.4 GHz hanya saluran <b>1, 6 dan 11</b> benar-benar bebas bertindih.</li>
          <li>Optimumkan kuasa transmisi: terlalu tinggi menyebabkan liputan bertindih berlebihan, terlalu rendah menyebabkan liputan tidak mencukupi.</li>
        </ul>
      </InfoCard>
      <NotesTable headers={['Kaedah Pengujian', 'Penerangan']} rows={[
        ['Throughput', 'Kelajuan data merentasi rangkaian; guna iPerf atau Speedtest di pelbagai lokasi'],
        ['Ping latency', 'Masa data pergi dan balik; penting untuk permainan dalam talian dan panggilan video; guna arahan ping atau PingPlotter'],
        ['Packet loss', 'Data tidak sampai ke destinasi; guna Wireshark atau PingTest; melebihi 2% menunjukkan masalah perlu diatasi segera'],
        ['Heatmap Wi-Fi', 'Gambaran visual kekuatan isyarat dengan Ekahau atau NetSpot'],
        ['Ujian pelbagai peranti', 'Prestasi apabila banyak peranti bersambung serentak; uji MU-MIMO dan band steering'],
      ]} />
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Keselamatan Fizikal Peranti" icon={KeyRound}>
          <ul className="list-disc pl-5 space-y-1.5 text-sm"><li>Gunakan sangkar keselamatan untuk menghalang vandalisme atau kecurian.</li><li>Pastikan kabel tidak terdedah kepada kerosakan.</li><li>Letakkan AP jauh daripada jangkauan umum kecuali perlu.</li></ul>
        </InfoCard>
        <InfoCard title="Keselamatan Akibat Lokasi" icon={ShieldAlert}>
          <ul className="list-disc pl-5 space-y-1.5 text-sm"><li>Elak AP berhampiran tingkap atau luar bangunan kerana isyarat terpancar keluar dan membuka ruang kepada war driving.</li><li>Sembunyikan SSID untuk lokasi kritikal.</li><li>Gunakan MAC filtering, VPN dan enkripsi WPA3 pada semua AP.</li></ul>
        </InfoCard>
      </div>
    </>
  );
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <SubTabs tabs={[{ label: '1. Pelan Lantai', content: plan }, { label: '2. Peralatan & Peta Haba', content: tools }, { label: '3. Pemasangan & Pengoptimuman WAP', content: install }]} />
      <Latihan items={['Apakah yang dimaksudkan dengan tinjauan tapak (site survey) rangkaian tanpa wayar?', 'Bagaimanakah peta haba membantu dalam proses tinjauan tapak?', 'Mengapa pelan lantai berskala penting dalam perancangan pemasangan AP?']} />
      <Ringkasan>Pelan lantai berskala (contoh 1:100) menentukan lokasi dan bilangan AP, dilengkapi anotasi, penanda halangan dan heatmap. Alat seperti <b>SolarWinds, Ekahau</b> dan <b>NetSpot</b> memetakan isyarat. WAP dipasang secara <b>terdedah, tersembunyi</b> atau <b>terbenam</b>, dioptimumkan (saluran 1/6/11) dan diuji (throughput, latency, packet loss lebih 2%).</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 6: SKOP KERJA & PERTIMBANGAN SEBELUM PEMASANGAN ---------------- */
function PmScopeNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Skop Kerja Pemasangan Peralatan Rangkaian" icon={ClipboardList}>
        <p>Skop kerja merujuk kepada semua aktiviti untuk memasang, mengkonfigurasi dan memastikan operasi rangkaian berjalan lancar. Tanpa skop yang jelas, risiko kesilapan teknikal, kelewatan dan isu keselamatan meningkat. Ia bukan sekadar pemasangan fizikal, tetapi merangkumi penilaian awal hingga penyelenggaraan berkala.</p>
      </InfoCard>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          ['1. Penilaian dan Perancangan', 'Analisa keperluan teknikal dan fizikal; rancangan pemasangan (pelan, jadual, lokasi dan jenis peranti).'],
          ['2. Penyediaan Infrastruktur', 'Rak atau kabinet, tenaga elektrik dan suhu sesuai; kabel dan saluran untuk sambungan peranti.'],
          ['3. Pemasangan Fizikal', 'Penempatan peralatan mengikut reka bentuk; sambungan kabel data dan kuasa.'],
          ['4. Konfigurasi Peralatan', 'Pengaturan awal (IP dan tetapan rangkaian); konfigurasi VLAN, routing dan keselamatan.'],
          ['5. Pengujian dan Verifikasi', 'Ujian sambungan dan ujian prestasi untuk memastikan keperluan dipenuhi.'],
          ['6. Dokumentasi dan Penyelenggaraan', 'Catat semua langkah dan konfigurasi; pelan penyelenggaraan dan sokongan pasca pemasangan.'],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-violet-200 bg-violet-50 p-4"><p className="font-black text-violet-900 text-sm">{t}</p><p className="text-xs text-violet-900/80 mt-1.5 leading-relaxed">{d}</p></div>
        ))}
      </div>

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"Pertimbangan Sebelum Pemasangan"} className="text-violet-600 shrink-0" size={20} />Pertimbangan Sebelum Pemasangan</h3>
        <NotesTable headers={['Aspek', 'Perkara yang Dipertimbangkan']} rows={[
          ['Penilaian tapak', 'Analisa persekitaran (saiz ruang, rak, suhu, kelembapan; suhu tinggi perlukan penyejukan tambahan); bekalan kuasa stabil dan mencukupi (UPS disarankan); infrastruktur sokongan seperti grounding system dan cable management tray'],
          ['Piawaian dan peraturan', 'TIA/EIA-568 untuk pengkabelan dan ISO/IEC 11801 untuk struktur rangkaian; Keselamatan dan Kesihatan Pekerjaan (OSH) termasuk PPE; peraturan tempatan seperti garis panduan MCMC'],
          ['Spesifikasi peralatan', 'Kesesuaian (contoh: jumlah port dan kelajuan Gigabit atau 10-Gigabit Ethernet) dan kompatibiliti dengan peralatan sedia ada dari segi firmware dan protokol'],
          ['Kapasiti dan skalabiliti', 'Analisis beban semasa dan ramalan pertumbuhan; redundansi seperti dual power supply dan link aggregation'],
          ['Risiko dan kontingensi', 'Kenal pasti risiko (kegagalan kuasa, keselamatan fizikal, serangan siber); sediakan backup configuration dan spare parts'],
        ]} />
      </div>

      <NotaPenting>Dalam Kertas Penerangan, satu nombor bahagian digunakan dua kali (3.2.1 dan 3.2.2 muncul untuk topik berbeza). Nota ini mengikut <b>isi kandungan</b> dan bukan nombor bahagian, jadi rujuk tajuk apabila mencari topik dalam dokumen asal.</NotaPenting>

      <Latihan items={['Apakah maksud skop kerja pemasangan peralatan rangkaian dan mengapa ia penting dalam projek rangkaian?', 'Nyatakan enam (6) elemen utama dalam skop kerja pemasangan peralatan rangkaian.', 'Senaraikan tiga (3) pertimbangan penting sebelum memulakan pemasangan rangkaian.', 'Mengapakah pematuhan piawaian seperti TIA/EIA-568 dan ISO/IEC 11801 penting dalam pemasangan rangkaian?']} />
      <Ringkasan>Skop kerja mempunyai <b>enam elemen</b>: penilaian dan perancangan, penyediaan infrastruktur, pemasangan fizikal, konfigurasi, pengujian serta dokumentasi dan penyelenggaraan. Sebelum memasang, nilai <b>tapak, piawaian, spesifikasi, kapasiti</b> dan <b>risiko</b>.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 7: PROSES PEMASANGAN, UJIAN, KESELAMATAN & LOGISTIK ---------------- */
function PmInstallNotes() {
  const proc = (
    <>
      <NotesTable headers={['Peralatan', 'Fungsi']} rows={[
        ['Router', 'Menghala trafik antara rangkaian berbeza dan menentukan laluan terbaik'],
        ['Switch', 'Menghubungkan peranti dalam LAN dan menguruskan penghantaran data'],
        ['Access Point (AP)', 'Titik akses tanpa wayar ke rangkaian berwayar'],
        ['Firewall', 'Mengawal dan menapis trafik berdasarkan polisi keselamatan'],
        ['Patch Panel', 'Pusat pengurusan kabel rangkaian'],
        ['Server dan Storage', 'Menyimpan data dan menjalankan aplikasi'],
        ['Network Interface (NIC)', 'Menghantar dan menerima data untuk komputer atau perkakasan'],
      ]} />
      <FlowStepper title="Aliran Kerja Pemasangan Peralatan Rangkaian (interaktif)" steps={[
        { t: 'Perancangan pemasangan', d: 'Kumpul maklumat (jenis peralatan, bilangan pengguna, kapasiti) dan reka bentuk rangkaian (topologi, susun atur) mengikut TIA/EIA-568.' },
        { t: 'Penyediaan tapak', d: 'Sediakan lokasi, ruang fizikal dan infrastruktur; pasang kabel dan saluran awal sebelum peralatan dipasang. Semak peralatan terhadap Purchase Order, network design diagram, installation checklist dan SOP.' },
        { t: 'Pemasangan peranti', d: 'Pasang rak (contoh 42U), tempatkan peranti mengikut rack layout plan, label peranti dan port (heat-shrink label atau engraved tag), sambung kabel data dan kuasa dengan kemas.' },
        { t: 'Konfigurasi peranti', d: 'Asas: sambung laptop ke console port (RJ-45 ke DB-9 atau USB), guna terminal emulator (PuTTY, Tera Term), tetapkan hostname, IP, subnet mask, gateway, akaun pentadbir kukuh dan tutup port tidak digunakan. Lanjutan: VLAN, routing (OSPF, EIGRP, BGP), STP, Port Security, ACL dan SNMPv3.' },
        { t: 'Pengujian dan verifikasi', d: 'Uji sambungan (fizikal, logik, cross-VLAN), prestasi dan keselamatan.' },
        { t: 'Dokumentasi', d: 'Rekod semua konfigurasi dan pengujian; sediakan laporan pemasangan, keputusan ujian, pelan rangkaian dikemas kini dan cadangan penyelenggaraan.' },
      ]} />
      <NotesTable headers={['Sambungan Kabel', 'Amalan']} rows={[
        ['Jenis kabel', 'Cat6/Cat6A untuk Ethernet atau OM3/OM4 untuk fiber optic; gunakan skema pendawaian TIA/EIA-568-B'],
        ['Pengurusan kabel', 'Cable manager, Velcro straps (elak cable tie plastik untuk fiber) dan cable tray untuk mengelakkan crosstalk atau EMI'],
        ['Ujian kabel', 'Kesinambungan dan insertion loss dengan network cable tester atau OTDR bagi fiber'],
      ]} />
    </>
  );
  const test = (
    <>
      <NotesTable headers={['Jenis Ujian', 'Kaedah']} rows={[
        ['Ujian fizikal', 'Network tester dan continuity test pada setiap kabel'],
        ['Ujian logik', 'Ping test antara peranti merentasi VLAN atau rangkaian'],
        ['Ujian cross-VLAN', 'Memeriksa inter-VLAN routing berfungsi'],
        ['Throughput dan latency', 'iPerf3'],
        ['Packet loss dan jitter', 'Wireshark atau SolarWinds, terutama untuk VoIP'],
        ['Load test', 'Simulasi beban trafik untuk melihat prestasi maksimum'],
        ['Port scanning', 'Nmap untuk memastikan tiada port terbuka secara tidak sengaja'],
        ['Vulnerability scan', 'Penilaian asas kelemahan dengan alat seperti OpenVAS'],
      ]} />
      <InfoCard title="Penyelesaian Masalah (Troubleshooting)" icon={Bug}>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Isolasi isu</b> dengan pendekatan divide and conquer: periksa satu lapisan OSI pada satu masa.</li>
          <li><b>Alat diagnostik:</b> ping/traceroute, arahan show (contoh <code>show ip interface brief</code>, <code>show vlan brief</code>) dan analisis fail log.</li>
          <li>Selepas isu diselesaikan, <b>uji semula</b> untuk memastikan rangkaian stabil.</li>
          <li>Rekod hasil dalam installation report berserta screenshot, rajah rangkaian dan test logs.</li>
        </ul>
      </InfoCard>
      <NotesTable headers={['Aktiviti Selepas Pemasangan', 'Perkara']} rows={[
        ['Pengujian dan pengesahan', 'Sambungan (network tester, continuity tester, loopback plug), prestasi (iPerf, Wireshark, SolarWinds) dan keselamatan (Nmap)'],
        ['Pemantauan awal', 'SNMP monitoring atau PRTG Network Monitor; pantau CPU, memori dan trafik untuk lonjakan tidak normal'],
        ['Dokumentasi', 'Simpan konfigurasi (IP, VLAN, routing, keselamatan) secara digital dan fizikal; kemas kini network diagram termasuk nombor port'],
        ['Latihan dan penyerahan', 'Latihan ringkas pengguna atau pentadbir; penyerahan rasmi dengan laporan penuh, dokumen sokongan dan manual'],
        ['Pelan penyenggaraan', 'Jadual berkala (pemeriksaan kabel, firmware update, ujian keselamatan tahunan) dan sokongan teknikal (hotline, emel, warranty)'],
      ]} />
    </>
  );
  const sec = (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Keselamatan Fizikal" icon={Lock}>
          <ul className="list-disc pl-5 space-y-1.5 text-sm"><li>Kawalan akses tapak: kunci digital atau biometric access control untuk bilik rangkaian atau server room.</li><li>Perlindungan kebakaran: pemadam CO2 atau FM200 fire suppression system, pengesan asap dan suhu tinggi.</li><li>Pengurusan kabel: cable tray, cable ties dan cable label.</li></ul>
        </InfoCard>
        <InfoCard title="Keselamatan Logik" icon={ShieldCheck}>
          <ul className="list-disc pl-5 space-y-1.5 text-sm"><li>Kata laluan admin kukuh, Port Security, firewall dan IPS.</li><li>Enkripsi SSL/TLS dan pengesahan 802.1X.</li><li>Kemas kini firmware dan perisian keselamatan secara berkala.</li></ul>
        </InfoCard>
      </div>
      <NotesTable headers={['Pematuhan dan Risiko', 'Penerangan']} rows={[
        ['Piawaian industri', 'TIA/EIA-568 (pengkabelan struktur), ISO/IEC 27001 (pengurusan keselamatan maklumat), IEEE 802.3 (Ethernet)'],
        ['Undang-undang dan polisi', 'Akta Komunikasi dan Multimedia Malaysia 1998 dan polisi keselamatan organisasi'],
        ['Audit', 'Audit berkala secara dalaman atau pihak ketiga bertauliah'],
        ['Pengurusan risiko', 'Kenal pasti risiko fizikal, logik dan persekitaran; pelan mitigasi seperti redundant systems, DRP (disaster recovery plan) dan BCP (business continuity plan)'],
      ]} />
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Logistik dan Pentadbiran Tapak" icon={Truck}>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li><b>Persediaan tapak:</b> penilaian lokasi, infrastruktur (rak, kabinet, cable tray, penyejukan) dan keselamatan tapak (kawalan akses, PPE, tanda amaran).</li>
            <li><b>Logistik:</b> penghantaran ikut jadual fasa, penyimpanan sementara selamat, pengurusan inventori (inventory checklist) dan pengurusan sisa.</li>
            <li><b>Pentadbiran:</b> permit (akses tapak, kerja panas), dokumentasi (pelan rangkaian, checklist, laporan kemajuan harian, rekod ujian) dan koordinasi pasukan (mesyuarat penyelarasan dan toolbox talk).</li>
          </ul>
        </InfoCard>
        <InfoCard title="Garis Masa dan Pengurusan Projek" icon={CalendarClock}>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li><b>Jadual kerja:</b> Gantt chart atau carta aliran kerja mengikut fasa (penyediaan tapak, pemasangan fizikal, konfigurasi, ujian akhir).</li>
            <li><b>Pemantauan kemajuan:</b> pemeriksaan tapak dan laporan kemajuan; rekod dan analisis kelewatan.</li>
            <li><b>Pengurusan risiko:</b> pelan mitigasi dan strategi <i>buffer time</i>.</li>
            <li><b>Penyelarasan pelanggan:</b> komunikasi berkala tentang status dan perubahan jadual.</li>
          </ul>
        </InfoCard>
      </div>
    </>
  );
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <SubTabs tabs={[{ label: '1. Peralatan & Proses', content: proc }, { label: '2. Ujian & Pasca-Pemasangan', content: test }, { label: '3. Keselamatan, Logistik & Jadual', content: sec }]} />
      <Latihan items={['Nyatakan dua (2) ujian keselamatan asas yang dilakukan selepas pemasangan rangkaian.']} />
      <Ringkasan>Pemasangan mengikut aliran <b>rancang, sedia tapak, pasang, konfigurasi, uji, dokumentasi</b>. Selepas itu: ujian sambungan/prestasi/keselamatan, pemantauan awal, penyerahan rasmi dan penyenggaraan. Kejayaan projek juga bergantung pada <b>keselamatan, pematuhan, logistik</b> dan jadual (Gantt, buffer time).</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 8: LUKISAN RANGKAIAN KOMPUTER ---------------- */
function PmDrawNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Lukisan Rangkaian Komputer" icon={PenTool}>
        <p>Lukisan rangkaian (network diagram) ialah representasi grafik struktur, sambungan dan aliran data dalam rangkaian. Ia membantu juruteknik memahami konfigurasi, mengenal pasti titik sambungan serta memudahkan pemasangan, penyelenggaraan, troubleshooting, pengembangan dan audit keselamatan. Terdapat dua kategori utama: <b>fizikal</b> dan <b>logikal</b>.</p>
      </InfoCard>
      <DrawingCompare />

      <InfoCard title="Lukisan Fizikal: Pelan Susun Atur (Plan Layout)" icon={Map}>
        <NotesTable headers={['Ciri', 'Penerangan']} rows={[
          ['Pelan lantai', 'Penempatan peralatan (bilik server, workstation, kabinet, access point Wi-Fi, periferal)'],
          ['Laluan kabel', 'Kabel Ethernet atau fibre optic melalui dinding, bawah lantai atau siling'],
          ['Titik penyambungan', 'Soket Ethernet di dinding, patch panel dan titik akses'],
          ['Sumber kuasa', 'Lokasi outlet elektrik atau UPS'],
          ['Peralatan utama', 'Router, switch dan server serta hubungan fizikalnya'],
        ]} />
        <p className="text-sm text-slate-600 mt-3">Kepentingan: panduan pemasangan, pengurusan infrastruktur dan kemudahan penyelenggaraan.</p>
      </InfoCard>

      <InfoCard title="Lukisan Logikal" icon={Network}>
        <p>Menggambarkan hubungan dan struktur rangkaian dari segi logik pada peringkat protokol dan konfigurasi. Ciri utama: <b>topologi</b> (star, mesh, hybrid), <b>struktur IP dan VLAN</b> (subnet, VLAN, protokol) dan <b>hubungan antara peranti</b> (router, switch, server, client). Kepentingan: memudahkan troubleshooting, rujukan audit dan pelan pengembangan, serta memahami polisi (access control, firewall rules).</p>
      </InfoCard>

      <RackDiagram />
      <NotesTable headers={['Lukisan Rak (Rack Drawing)', 'Penerangan']} rows={[
        ['Unit rak (U)', 'Ukuran rak dalam Unit; satu peralatan mengambil 1U hingga beberapa U'],
        ['Lokasi peralatan', 'Ruang tepat setiap peranti dalam unit U'],
        ['Pengurusan kabel', 'Laluan kabel kuasa dan rangkaian dalam dan sekitar rak'],
        ['Kuasa dan penyejukan', 'Lokasi UPS, kipas dan komponen penyejukan'],
      ]} />
      <NotesTable headers={['Prinsip Rack Positioning', 'Amalan']} rows={[
        ['Berat dan kestabilan', 'Server atau storan berat di bahagian bawah; switch dan patch panel yang ringan di atas'],
        ['Aliran udara', 'Udara lancar dari depan ke belakang atau bawah ke atas; tiada peralatan menyekat kipas'],
        ['Pengurusan kabel', 'Kabel kemas dan berpenanda; patch panel di atas atau tengah rak'],
        ['Akses', 'Peralatan yang kerap diselenggara pada paras mudah capai'],
        ['Kategori peralatan', 'Kumpulkan ikut fungsi (semua server bersama, semua switch bersama)'],
      ]} />
      <p className="text-sm text-slate-600">Sumber rujukan lukisan rak: manual pengeluar (Cisco, Dell), piawaian TIA-942 dan ISO/IEC 11801, perisian reka bentuk (Visio, Autodesk) dan dokumentasi pengeluar rak (APC, Rittal).</p>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Komponen Lukisan" icon={Shapes}>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li><b>Simbol peranti:</b> router, switch, firewall, access point, server, client/PC.</li>
            <li><b>Jenis sambungan:</b> garisan penuh = fizikal (fiber, Ethernet); garisan putus-putus = logikal atau wireless.</li>
            <li><b>Label:</b> IP address, VLAN ID, port ID (contoh Gig0/1), nama peranti dan lokasi.</li>
            <li><b>Unit rak (U)</b> dan <b>skala</b> (contoh 1:50) untuk lukisan fizikal.</li>
          </ul>
        </InfoCard>
        <InfoCard title="Membaca dan Mentafsir Rajah" icon={Search}>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm">
            <li>Kenal pasti jenis lukisan (fizikal atau logikal).</li>
            <li>Analisa simbol dan label.</li>
            <li>Periksa sambungan dan jenisnya.</li>
            <li>Tafsir aliran trafik (anak panah), penting untuk latency dan packet loss.</li>
            <li>Semak piawaian (TIA/EIA-568, ISO/IEC 11801).</li>
            <li>Cross-reference dengan lokasi sebenar di tapak.</li>
          </ol>
        </InfoCard>
      </div>

      <NotesTable headers={['Perisian Lukisan', 'Ciri', 'Kelebihan']} rows={[
        ['SolarWinds Network Topology Mapper (NTM)', 'Auto-discovery melalui SNMP, ICMP, WMI; pemetaan topologi layer 2 dan 3; dokumentasi automatik; eksport ke Visio, PDF, PNG', 'Sesuai organisasi besar; memenuhi keperluan audit seperti PCI dan HIPAA'],
        ['Microsoft Visio', 'Template dan simbol standard; digabung dengan data Excel; integrasi Teams dan SharePoint', 'Mudah digunakan juruteknik baru; sesuai dokumentasi formal dan tender ICT'],
        ['Intermapper', 'Auto-discovery; peta logikal interaktif berwarna mengikut status; notifikasi e-mel/SMS; statistik bandwidth dan latency', 'Sesuai pemantauan berterusan; memudahkan troubleshooting'],
        ['Alternatif', 'Lucidchart (awan, kolaborasi masa nyata), Draw.io (percuma, web), GNS3 (simulasi), Dia (sumber terbuka)', 'Bergantung keperluan dan bajet'],
      ]} />

      <Latihan items={['Apakah maksud lukisan rangkaian komputer dan apakah kepentingannya dalam proses pemasangan rangkaian?', 'Nyatakan dua (2) perbezaan utama antara lukisan fizikal dan lukisan logikal rangkaian.', 'Nyatakan tiga (3) kepentingan pelan susun atur dalam pengurusan rangkaian.', 'Apakah jenis simbol dan label yang biasa digunakan dalam lukisan rangkaian?', 'Namakan dua (2) perisian lukisan rangkaian selain SolarWinds dan nyatakan satu kelebihan bagi setiap satu.']} />
      <Ringkasan>Lukisan <b>fizikal</b> (pelan susun atur dan lukisan rak) menunjukkan lokasi sebenar, manakala lukisan <b>logikal</b> menunjukkan topologi, IP dan VLAN. Komponen standard: simbol, jenis garisan, label, unit rak dan skala. Perisian: <b>SolarWinds NTM, Visio, Intermapper</b>, Lucidchart, Draw.io, GNS3 dan Dia.</Ringkasan>
    </div>
  );
}
function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shuffleQuestions(items) {
  return shuffleArray(items).map((question) => ({ ...question, options: shuffleArray(question.options) }));
}

function Quiz() {
  const [kpIndex, setKpIndex] = useState(0);
  const [highestKp, setHighestKp] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState(() => shuffleQuestions(ikr3122QuizSets[0].questions));

  const currentSet = ikr3122QuizSets[kpIndex];
  const passScore = 18;

  const score = useMemo(() => activeQuestions.reduce((total, question, index) => total + (answers[index] === question.options.indexOf(question.correct) ? 1 : 0), 0), [answers, activeQuestions]);

  const retryLevel = () => {
    setAnswers({});
    setSubmitted(false);
    setActiveQuestions(shuffleQuestions(ikr3122QuizSets[kpIndex].questions));
  };

  const nextKp = () => {
    if (score >= passScore && kpIndex < ikr3122QuizSets.length - 1) {
      const nextIndex = kpIndex + 1;
      setHighestKp(previous => Math.max(previous, nextIndex));
      setKpIndex(nextIndex);
      setAnswers({});
      setSubmitted(false);
      setActiveQuestions(shuffleQuestions(ikr3122QuizSets[nextIndex].questions));
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== activeQuestions.length) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-black uppercase tracking-[.2em] text-violet-700">Tahap Kuiz</div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{currentSet.code} - {currentSet.title}</h2>
            <p className="text-sm text-slate-600 mt-2">Setiap KP mengandungi 30 soalan (10 easy, 10 medium, 10 hard KBAT). Lulus minimum ialah 18/30.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ikr3122QuizSets.map((item, index) => (
              <button key={item.id} disabled={index > highestKp || (index === kpIndex && submitted && score < passScore)} onClick={() => {
                if (index <= highestKp) {
                  setKpIndex(index);
                  setAnswers({});
                  setSubmitted(false);
                  setActiveQuestions(shuffleQuestions(ikr3122QuizSets[index].questions));
                }
              }} className={`rounded-full px-4 py-2 text-xs font-black border ${index === kpIndex ? 'bg-violet-600 border-violet-600 text-white' : 'bg-white border-slate-300 text-slate-700'} ${index > highestKp ? 'opacity-50 cursor-not-allowed' : ''}`}>{item.code}</button>
            ))}
          </div>
        </div>
      </div>

      {submitted && (
        <div className={`rounded-2xl p-6 mb-6 text-white ${score >= passScore ? 'bg-emerald-600' : 'bg-rose-600'}`}>
          <div className="flex items-center gap-3"><Award size={34} /><div><p className="text-sm font-bold opacity-90">Keputusan {currentSet.code}</p><h2 className="text-3xl font-black">{score} / {activeQuestions.length}</h2></div></div>
          <p className="mt-3 font-medium">
            {score >= passScore
              ? `Lulus ${currentSet.code}. Anda layak ${kpIndex < ikr3122QuizSets.length - 1 ? 'naik ke ' + ikr3122QuizSets[kpIndex + 1].code : 'menamatkan semua KP'}.`
              : `Belum lulus. Markah minimum ialah 18/30 - sila ulang ${currentSet.code} sebelum naik ke tahap seterusnya.`}
          </p>
        </div>
      )}

      <div className="space-y-5">
        {activeQuestions.map((question, index) => (
          <article key={`${currentSet.id}-${index}-${question.question}`} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2"><span className={`text-[10px] font-black uppercase tracking-wide rounded-full px-2.5 py-1 ${question.difficulty === 'hard' ? 'bg-rose-100 text-rose-700' : question.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{question.difficulty === 'hard' ? 'Hard KBAT' : question.difficulty === 'medium' ? 'Medium' : 'Easy'}</span></div>
            <h3 className="font-black text-slate-900"><span className="text-violet-600 mr-2">{index + 1}.</span>{question.question}</h3>
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {question.options.map((option, optionIndex) => {
                const selected = answers[index] === optionIndex;
                const correctAnswer = question.options.indexOf(question.correct);
                const correct = submitted && optionIndex === correctAnswer;
                const wrong = submitted && selected && optionIndex !== correctAnswer;
                return (
                  <button
                    key={`${question.question}-${option}`}
                    disabled={submitted}
                    onClick={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))}
                    className={`text-left p-3 rounded-xl border text-sm font-medium transition-all ${correct ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : wrong ? 'border-rose-500 bg-rose-50 text-rose-800' : selected ? 'border-violet-500 bg-violet-50 text-violet-800' : 'border-slate-200 hover:border-violet-300'}`}
                  >
                    <span className="flex items-center gap-2">{correct ? <CheckCircle size={17} /> : wrong ? <XCircle size={17} /> : <span className="w-4 h-4 rounded-full border border-current" />}{option}</span>
                  </button>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-7 flex flex-col sm:flex-row gap-3">
        {!submitted ? (
          <button disabled={Object.keys(answers).length !== activeQuestions.length} onClick={handleSubmit} className="flex-1 bg-violet-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-black hover:bg-violet-700 transition-colors">Hantar Jawapan {currentSet.code}</button>
        ) : (
          <>
            {score >= passScore && kpIndex < ikr3122QuizSets.length - 1 && (
              <button onClick={nextKp} className="flex-1 bg-emerald-600 text-white px-6 py-4 rounded-xl font-black hover:bg-emerald-700">Naik ke {ikr3122QuizSets[kpIndex + 1].code}</button>
            )}
            <button onClick={retryLevel} className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-xl font-black hover:bg-slate-800"><RotateCcw size={19} /> Cuba Semula {currentSet.code}</button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- KOMPONEN UTAMA ---------------- */
export default function IKR3122({ onBackToPortal }) {
  const [view, setView] = useState('menu');
  const [readState, setReadState] = useState(() => {
    const fallback = [false, false, false, false, false, false, false, false];
    try {
      const saved = JSON.parse(localStorage.getItem('ikr3122-read-state'));
      if (Array.isArray(saved) && saved.length === sections.length) return saved;
    } catch {
      return fallback;
    }
    return fallback;
  });

  const completedCount = readState.filter(Boolean).length;
  const progressPercent = Math.round((completedCount / sections.length) * 100);

  const resetProgress = () => {
    const fallback = [false, false, false, false, false, false, false, false];
    setReadState(fallback);
    try { localStorage.setItem('ikr3122-read-state', JSON.stringify(fallback)); } catch { /* storan tidak tersedia */ }
  };

  const backToMenu = () => { setView('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const openSection = (id) => {
    const requested = sections.findIndex((section) => section.id === id);
    if (id === 'quiz') {
      if (!readState[7]) return;
      setView(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (requested > 0 && !readState[requested - 1]) return;
    if (requested >= 0) {
      setView(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const markReadingComplete = (id) => {
    const requested = sections.findIndex((section) => section.id === id);
    if (requested < 0) return;
    const nextReadState = [...readState];
    nextReadState[requested] = true;
    setReadState(nextReadState);
    try { localStorage.setItem('ikr3122-read-state', JSON.stringify(nextReadState)); } catch { /* storan tidak tersedia */ }
    const nextInLine = sections[requested + 1];
    if (nextInLine) setView(nextInLine.id);
  };

  if (view !== 'menu') {
    const content = {
      'pm-survey': <PmSurveyNotes />,
      'pm-tools': <PmToolsNotes />,
      'pm-wlan': <PmWlanNotes />,
      'pm-signal': <PmSignalNotes />,
      'pm-floor': <PmFloorNotes />,
      'pm-scope': <PmScopeNotes />,
      'pm-install': <PmInstallNotes />,
      'pm-draw': <PmDrawNotes />,
      quiz: <Quiz />,
    }[view];

    const showCompleteButton = sections.some((section) => section.id === view);
    const headerMeta = sections.find((section) => section.id === view) || featureCards.find((f) => f.id === view) || sections[0];

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <PmAnimStyles />
        <div className="bg-slate-950 text-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Terminal size={30} className="text-violet-300" />
                <div>
                  <div className="text-[10px] uppercase tracking-[.2em] text-violet-300 font-black">Project Management</div>
                  <div className="text-sm font-black">{completedCount}/{sections.length} bahagian</div>
                </div>
              </div>
              <div className="flex-1 max-w-md">
                <div className="flex items-center justify-between text-[10px] font-black tracking-[.18em] text-violet-200 uppercase"><span>Progress</span><span>{progressPercent}%</span></div>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-violet-300 to-fuchsia-300 transition-all" style={{ width: `${progressPercent}%` }} /></div>
              </div>
            </div>
          </div>
        </div>
        <PageHeader title={headerMeta.title} subtitle={headerMeta.subtitle || headerMeta.desc} icon={headerMeta.icon} onBack={backToMenu} accent={headerMeta.accent || 'blue'} />
        {content}
        {showCompleteButton && (
          <div className="max-w-6xl mx-auto px-4 py-6">
            <button onClick={() => markReadingComplete(view)} className="w-full md:w-auto bg-emerald-600 text-white px-6 py-3 rounded-xl font-black hover:bg-emerald-700 transition-colors">
              <span className="inline-flex items-center gap-2"><CheckCircle size={17} /> Selesai Baca</span>
            </button>
          </div>
        )}
        <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">IKR3122 Project Management - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>
      </div>
    );
  }

  return (
    <div className="course-menu-page min-h-screen bg-slate-50 text-slate-900">
      <PmAnimStyles />
      <ModuleMenu title="Modul IKR3122: Project Management" icon={sections[0].icon} secondaryIcon={sections[1].icon}
        onBack={onBackToPortal} topics={sections} read={readState} onTopic={section => openSection(section.id)} onReset={resetProgress}
        description={<>Tinjauan tapak, WLAN dan liputan isyarat, skop kerja pemasangan serta lukisan rangkaian - dipecahkan kepada 8 bahagian, lengkap dengan kuiz 180 soalan.</>}>
        <ModuleActivities activities={featureCards} quizLocked={!readState[sections.length - 1]} onOpen={openSection} />
      </ModuleMenu>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">IKR3122 Project Management - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>
    </div>
  );
}

