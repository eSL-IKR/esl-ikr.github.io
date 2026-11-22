import ModuleMenu, { ModuleActivities } from './ModuleMenu';
import { useMemo, useState } from 'react';
import { kpQuizSets } from './IKR3033QuizData.js';
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowLeftRight,
  Award,
  BarChart3,
  BookOpen,
  Box,
  Cable,
  Calculator,
  Check,
  CheckCircle,
  ChevronRight,
  CircleDot,
  ClipboardCheck,
  ClipboardList,
  Crosshair,
  Download,
  Droplet,
  ExternalLink,
  Eye,
  FileText,
  Flashlight,
  Gauge,
  Glasses,
  Globe,
  Home,
  Layers,
  Lightbulb,
  ListChecks,
  Lock,
  Network,
  PlayCircle,
  Plug,
  Radio,
  Repeat,
  RotateCcw,
  Ruler,
  Scissors,
  Search,
  Shield,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Split,
  TestTube,
  TrendingDown,
  WandSparkles,
  Waves,
  Wrench,
  XCircle,
  Zap,
} from 'lucide-react';

const sections = [
  {
    id: 'intro',
    title: 'Pengenalan kepada Fiber Optik',
    desc: 'Penerangan asas gentian optik, fungsi dan prinsip penghantaran cahaya.',
    icon: BookOpen,
    accent: 'blue',
  },
  {
    id: 'structure',
    title: 'Struktur & Komposisi Kabel',
    desc: 'Core, cladding, coating, buffer, strengthening layer, jacket dan lapisan tambahan.',
    icon: Cable,
    accent: 'emerald',
  },
  {
    id: 'transmission',
    title: 'Jenis & Penghantaran Cahaya',
    desc: 'Single-mode, multi-mode, saiz core, sumber cahaya, jarak dan prinsip pantulan dalaman.',
    icon: Radio,
    accent: 'teal',
  },
  {
    id: 'connection',
    title: 'Teknik Penyambungan',
    desc: 'Mechanical splice, stripping, cleaning, cleaving, dan penyambung SC, LC, ST, FC.',
    icon: Wrench,
    accent: 'orange',
  },
  {
    id: 'fusion',
    title: 'Fusion Splicing',
    desc: 'Proses kimpalan gentian dengan electric arc, penjajaran automatik dan splicer.',
    icon: Zap,
    accent: 'amber',
  },
  {
    id: 'testing',
    title: 'Pengujian & Loss',
    desc: 'Visual tracing, VFL, power meter, light source dan pengiraan attenuation.',
    icon: TestTube,
    accent: 'violet',
  },
  {
    id: 'otdr',
    title: 'OTDR & Analisis Trace',
    desc: 'Fungsi OTDR, parameter ujian, trace, splice loss dan lokasi anomali.',
    icon: Activity,
    accent: 'indigo',
  },
  {
    id: 'docs',
    title: 'Dokumentasi & Troubleshooting',
    desc: 'Rekod pemasangan, baik pulih, ujian semula dan penyelesaian masalah fiber.',
    icon: ShieldCheck,
    accent: 'rose',
  },
];

const featureCards = [
  {
    id: 'selection',
    target: 'selection',
    title: 'Panduan Pemilihan',
    desc: 'Tips memilih kabel dan connector yang sesuai.',
    icon: Search,
    accent: 'violet',
  },
  {
    id: 'inspection',
    target: 'inspection',
    title: 'Prosedur Pemeriksaan',
    desc: 'Keselamatan, pembersihan, dan pengujian kuasa.',
    icon: ShieldCheck,
    accent: 'amber',
    ribbon: 'PENTING',
  },
  {
    id: 'quiz',
    target: 'quiz',
    title: 'Kuiz Penilaian',
    desc: 'Uji kefahaman dengan 30 soalan. Buka setelah menyelesaikan semua 8 Nota Pembelajaran.',
    icon: Award,
    accent: 'rose',
  },
  {
    id: 'model3d',
    target: 'model3d',
    title: 'Model AR 3D',
    desc: 'Lihat model fiber optic secara interaktif.',
    icon: Box,
    accent: 'teal',
  },
  {
    id: 'calculator',
    target: 'calculator',
    title: 'Kalkulator Fiber Cabling',
    desc: 'Fungsi pengiraan loss, jarak, dan bajet kuasa.',
    icon: Calculator,
    accent: 'blue',
  },
  {
    id: 'consultant',
    target: 'consultant',
    title: 'Perunding AI Fiber Pintar',
    desc: 'Pilih jenis fiber, penyambung dan ujian mengikut keperluan projek.',
    icon: WandSparkles,
    accent: 'indigo',
  },
];

const sketchfabModels = [
  {
    id: 'ca86909d601a4dfbb1bca2efe6e1e4ae',
    title: 'Fiber optic cable',
    author: 'Digital Studio Limited',
    page: 'https://sketchfab.com/3d-models/fiber-optic-cable-ca86909d601a4dfbb1bca2efe6e1e4ae',
    embed: 'https://sketchfab.com/models/ca86909d601a4dfbb1bca2efe6e1e4ae/embed?autostart=0&ui_ar=1&ui_help=1&ui_settings=1',
  },
  {
    id: '8124ef30509545808b69bbb96c9674a9',
    title: 'SC connector',
    author: 'Digital Studio Limited',
    page: 'https://sketchfab.com/3d-models/sc-connector-8124ef30509545808b69bbb96c9674a9',
    embed: 'https://sketchfab.com/models/8124ef30509545808b69bbb96c9674a9/embed?autostart=0&ui_ar=1&ui_help=1&ui_settings=1',
  },
  {
    id: 'f4f4007fd0b94619a125481d2c9142cb',
    title: 'Fibre optic cable 2',
    author: 'Digital Studio Limited',
    page: 'https://sketchfab.com/3d-models/fibre-optic-cable-2-f4f4007fd0b94619a125481d2c9142cb',
    embed: 'https://sketchfab.com/models/f4f4007fd0b94619a125481d2c9142cb/embed?autostart=0&ui_ar=1&ui_help=1&ui_settings=1',
  },
  {
    id: 'bf5465eb135b4ed0b3b369f9f4b05e88',
    title: 'FC connector',
    author: 'Digital Studio Limited',
    page: 'https://sketchfab.com/3d-models/fc-connector-bf5465eb135b4ed0b3b369f9f4b05e88',
    embed: 'https://sketchfab.com/models/bf5465eb135b4ed0b3b369f9f4b05e88/embed?autostart=0&ui_ar=1&ui_help=1&ui_settings=1',
  },
  {
    id: 'f319e0d2ce2245e9a619a47321c4edcd',
    title: 'LM200-Series OSP MicroCore® Cable',
    author: 'AFLglobal',
    page: 'https://sketchfab.com/3d-models/lm200-series-osp-microcore-cable-f319e0d2ce2245e9a619a47321c4edcd',
    embed: 'https://sketchfab.com/models/f319e0d2ce2245e9a619a47321c4edcd/embed?autostart=0&ui_ar=1&ui_help=1&ui_settings=1',
  },
  {
    id: '8124ef30509545808b69bbb96c9674a9',
    title: 'SC connector (duplicate)',
    author: 'Digital Studio Limited',
    page: 'https://sketchfab.com/3d-models/sc-connector-8124ef30509545808b69bbb96c9674a9',
    embed: 'https://sketchfab.com/models/8124ef30509545808b69bbb96c9674a9/embed?autostart=0&ui_ar=1&ui_help=1&ui_settings=1',
  },
];

const uniqueSketchfabModels = Array.from(
  new Map(sketchfabModels.map((model) => [model.id, model])).values()
);

const latestTech = [
  {
    title: 'XGS-PON',
    badge: '10 Gbit/s simetri',
    text: 'Rangkaian akses optik pasif yang menyokong kadar nominal 10 Gbit/s bagi arah muat turun dan muat naik. Sesuai untuk FTTH, perniagaan dan mobile backhaul.',
  },
  {
    title: '50G-PON',
    badge: 'Generasi akses baharu',
    text: 'Standard ITU-T bagi PON berkelajuan 50 Gbit/s pada arah downstream, dengan pilihan kadar upstream 12.5, 25 atau 50 Gbit/s mengikut kelas sistem.',
  },
  {
    title: 'Fiber G.657',
    badge: 'Tahan lenturan',
    text: 'Gentian single-mode dengan prestasi kehilangan akibat lenturan yang lebih baik. Sangat berguna untuk laluan sempit, bangunan dan pemasangan akses pelanggan.',
  },
  {
    title: 'MPO/MTP & kabel beribbon',
    badge: 'Ketumpatan tinggi',
    text: 'Penyambung berbilang gentian membantu mempercepat pemasangan backbone dan pusat data yang memerlukan banyak sambungan dalam ruang terhad.',
  },
  {
    title: 'Pemantauan OTDR pintar',
    badge: 'Analisis jejak',
    text: 'OTDR moden membantu mengenal pasti event, connector, splice, pantulan dan lokasi putus dengan analisis jejak yang lebih mudah difahami oleh juruteknik.',
  },
  {
    title: 'Ethernet optik 400G/800G',
    badge: 'Pusat data',
    text: 'Sambungan optik berkelajuan sangat tinggi digunakan pada pusat data dan rangkaian teras. Pemilihan modul, jenis fiber dan jarak mesti dibuat sebagai satu sistem.',
  },
];

const accentStyles = {
  blue: {
    icon: 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30',
    ring: 'hover:border-blue-300 hover:shadow-blue-200/60',
    badge: 'bg-blue-100 text-blue-700',
    topBar: 'from-blue-400 to-blue-600',
    text: 'text-blue-700',
    soft: 'bg-blue-50',
  },
  emerald: {
    icon: 'bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/30',
    ring: 'hover:border-emerald-300 hover:shadow-emerald-200/60',
    badge: 'bg-emerald-100 text-emerald-700',
    topBar: 'from-emerald-400 to-emerald-600',
    text: 'text-emerald-700',
    soft: 'bg-emerald-50',
  },
  teal: {
    icon: 'bg-gradient-to-br from-teal-500 to-teal-700 shadow-lg shadow-teal-500/30',
    ring: 'hover:border-teal-300 hover:shadow-teal-200/60',
    badge: 'bg-teal-100 text-teal-700',
    topBar: 'from-teal-400 to-teal-600',
    text: 'text-teal-700',
    soft: 'bg-teal-50',
  },
  orange: {
    icon: 'bg-gradient-to-br from-orange-500 to-orange-700 shadow-lg shadow-orange-500/30',
    ring: 'hover:border-orange-300 hover:shadow-orange-200/60',
    badge: 'bg-orange-100 text-orange-700',
    topBar: 'from-orange-400 to-orange-600',
    text: 'text-orange-700',
    soft: 'bg-orange-50',
  },
  amber: {
    icon: 'bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg shadow-amber-500/30',
    ring: 'hover:border-amber-300 hover:shadow-amber-200/60',
    badge: 'bg-amber-100 text-amber-700',
    topBar: 'from-amber-400 to-amber-600',
    text: 'text-amber-700',
    soft: 'bg-amber-50',
  },
  violet: {
    icon: 'bg-gradient-to-br from-violet-500 to-violet-700 shadow-lg shadow-violet-500/30',
    ring: 'hover:border-violet-300 hover:shadow-violet-200/60',
    badge: 'bg-violet-100 text-violet-700',
    topBar: 'from-violet-400 to-violet-600',
    text: 'text-violet-700',
    soft: 'bg-violet-50',
  },
  indigo: {
    icon: 'bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-500/30',
    ring: 'hover:border-indigo-300 hover:shadow-indigo-200/60',
    badge: 'bg-indigo-100 text-indigo-700',
    topBar: 'from-indigo-400 to-indigo-600',
    text: 'text-indigo-700',
    soft: 'bg-indigo-50',
  },
  rose: {
    icon: 'bg-gradient-to-br from-rose-500 to-rose-700 shadow-lg shadow-rose-500/30',
    ring: 'hover:border-rose-300 hover:shadow-rose-200/60',
    badge: 'bg-rose-100 text-rose-700',
    topBar: 'from-rose-400 to-rose-600',
    text: 'text-rose-700',
    soft: 'bg-rose-50',
  },
  cyan: {
    icon: 'bg-gradient-to-br from-cyan-500 to-cyan-700 shadow-lg shadow-cyan-500/30',
    ring: 'hover:border-cyan-300 hover:shadow-cyan-200/60',
    badge: 'bg-cyan-100 text-cyan-700',
    topBar: 'from-cyan-400 to-cyan-600',
    text: 'text-cyan-700',
    soft: 'bg-cyan-50',
  },
};

function PageHeader({ title, subtitle, icon: Icon, onBack, accent = 'blue' }) {
  const style = accentStyles[accent] || accentStyles.blue;
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${style.topBar}`} />
      <div className={`pointer-events-none absolute -right-20 -top-24 w-72 h-72 rounded-full blur-3xl opacity-40 ${style.icon} fiber-anim-glow`} />
      <div className="max-w-6xl mx-auto px-4 py-5 md:py-7 relative z-10">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white mb-5">
          <ArrowLeft size={18} /> Kembali ke Menu Modul
        </button>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-2xl border border-white/15 ${style.icon} fiber-entry-icon`}><Icon size={28} className="text-white" /></div>
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight fiber-entry-title">{title}</h1>
            <p className="text-slate-300 mt-2 max-w-3xl text-sm md:text-base fiber-entry-subtitle">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, children, icon: Icon = CircleDot }) {
  return (
    <article className="fiber-card fiber-reveal bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
      <h3 className="font-black text-slate-900 text-lg flex items-center gap-2 mb-3"><Icon size={20} className="fiber-card-icon text-cyan-600" /> {title}</h3>
      <div className="text-sm md:text-base text-slate-600 leading-relaxed">{children}</div>
    </article>
  );
}

/* Animasi CSS - KHUSUS untuk modul Fiber Cabling sahaja (sistem animasi global) */
function FiberAnimStyles() {
  return (
    <style>{`
      @keyframes fiberPulseGlow { 0%, 100% { opacity: .45; transform: scale(1); } 50% { opacity: 1; transform: scale(1.12); } }
      @keyframes fiberFlowRight { 0% { transform: translateX(-6px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateX(14px); opacity: 0; } }
      @keyframes fiberFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fiberScaleIn { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: scale(1); } }
      @keyframes fiberSpark { 0%, 100% { opacity: .3; transform: scale(.9) rotate(0deg); } 50% { opacity: 1; transform: scale(1.3) rotate(8deg); } }
      @keyframes fiberBarGrow { from { width: 0; } }
      @keyframes fiberDash { to { stroke-dashoffset: 0; } }

      .fiber-anim-glow { animation: fiberPulseGlow 1.8s ease-in-out infinite; }
      .fiber-anim-flow { animation: fiberFlowRight 1.4s linear infinite; }
      .fiber-anim-flow-delay { animation: fiberFlowRight 1.4s linear infinite; animation-delay: .45s; }
      .fiber-anim-flow-delay2 { animation: fiberFlowRight 1.4s linear infinite; animation-delay: .9s; }
      .fiber-anim-spark { animation: fiberSpark 0.9s ease-in-out infinite; }

      /* Kemasukan halaman: tajuk & kandungan fade-up berperingkat */
      .fiber-entry-title { animation: fiberFadeUp .5s ease-out both; }
      .fiber-entry-icon { animation: fiberScaleIn .45s ease-out both; }
      .fiber-entry-subtitle { animation: fiberFadeUp .5s ease-out .1s both; }
      .fiber-reveal { animation: fiberFadeUp .5s ease-out both; }
      .fiber-reveal-1 { animation-delay: .05s; } .fiber-reveal-2 { animation-delay: .1s; }
      .fiber-reveal-3 { animation-delay: .15s; } .fiber-reveal-4 { animation-delay: .2s; }
      .fiber-reveal-5 { animation-delay: .25s; } .fiber-reveal-6 { animation-delay: .3s; }

      /* Kad topik: hover lift + ikon pulse + border */
      .fiber-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
      .fiber-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(8,145,178,.25); border-color: #67e8f9; }
      .fiber-card:hover .fiber-card-icon { animation: fiberPulseGlow 1s ease-in-out infinite; }

      .fiber-progress-bar { animation: fiberBarGrow 1s ease-out both; }
      .fiber-dash { stroke-dasharray: 420; stroke-dashoffset: 420; animation: fiberDash 1.6s ease-out forwards; }

      @media (prefers-reduced-motion: reduce) {
        .fiber-anim-glow, .fiber-anim-flow, .fiber-anim-flow-delay, .fiber-anim-flow-delay2, .fiber-anim-spark,
        .fiber-entry-title, .fiber-entry-icon, .fiber-entry-subtitle, .fiber-reveal, .fiber-card, .fiber-dash {
          animation: none !important; transition: none !important;
        }
        .fiber-card:hover { transform: none; }
      }
    `}</style>
  );
}

/* Kotak "Nota Penting" */
function NotaPenting({ children }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 flex gap-3">
      <AlertTriangle size={22} className="text-amber-600 shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-black uppercase tracking-wide text-amber-700 mb-1">Nota Penting</p>
        <div className="text-sm text-amber-900 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

/* Kotak "Tahukah Anda?" */
function TahukahAnda({ children }) {
  return (
    <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5 flex gap-3">
      <Sparkles size={22} className="text-cyan-600 shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-black uppercase tracking-wide text-cyan-700 mb-1">Tahukah Anda?</p>
        <div className="text-sm text-cyan-900 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

/* Kotak "Ringkasan" */
function Ringkasan({ children }) {
  return (
    <div className="rounded-2xl bg-slate-950 text-white p-5 md:p-6 flex gap-3">
      <ListChecks size={22} className="text-emerald-300 shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-black uppercase tracking-wide text-emerald-300 mb-1">Ringkasan</p>
        <div className="text-sm text-slate-100 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

/* Jadual generik: header[] + rows[][] */
function NotesTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-cyan-50 text-cyan-900">
            {headers.map((h) => <th key={h} className="text-left font-black p-3 md:p-4">{h}</th>)}
          </tr>
        </thead>
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

/* Checklist ☐ */
function Checklist({ title, items }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      {title && <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2"><ClipboardCheck size={19} className="text-emerald-600" /> {title}</h4>}
      <div className="space-y-2">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-3 text-sm text-slate-700 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
            <input type="checkbox" className="w-4 h-4 accent-cyan-600" />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}

/* Rajah aliran menegak: langkah[] dengan anak panah */
function FlowVertical({ steps }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <div className="flex flex-col items-stretch">
        {steps.map((step, i) => (
          <div key={step} className="flex flex-col items-center">
            <div className="w-full rounded-xl bg-slate-900 text-white text-sm font-bold text-center py-3 px-4">{step}</div>
            {i < steps.length - 1 && <ArrowDown size={18} className="text-cyan-600 my-1.5" />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Rajah aliran mendatar ringkas: langkah[] dengan anak panah kanan */
function FlowHorizontal({ steps }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <span className="rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs md:text-sm font-black px-3 py-2">{step}</span>
          {i < steps.length - 1 && <ChevronRight size={16} className="text-slate-400 shrink-0" />}
        </div>
      ))}
    </div>
  );
}

/* Kad perbandingan 2 lajur */
function CompareCards({ left, right }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {[left, right].map((side) => (
        <div key={side.title} className={`rounded-2xl border p-5 md:p-6 ${side.tone === 'amber' ? 'border-amber-200 bg-amber-50' : 'border-cyan-200 bg-cyan-50'}`}>
          <h4 className={`font-black text-lg mb-3 flex items-center gap-2 ${side.tone === 'amber' ? 'text-amber-800' : 'text-cyan-800'}`}>
            <Zap size={18} /> {side.title}
          </h4>
          <ul className="space-y-2">
            {side.points.map((point) => (
              <li key={point} className={`text-sm flex items-start gap-2 ${side.tone === 'amber' ? 'text-amber-900' : 'text-cyan-900'}`}>
                <Check size={15} className="mt-0.5 shrink-0" /> {point}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function BasicNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* 1-3: Maksud, medium cahaya, bahan halus */}
      <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-6">
        <InfoCard title="Apakah itu Fiber Optik / Gentian Optik?" icon={Lightbulb}>
          <p>Fiber optik (atau <b>gentian optik</b>) merupakan sejenis teknologi penghantaran data yang menggunakan <b>cahaya</b> sebagai medium untuk menghantar isyarat, melalui gentian <b>kaca atau plastik yang sangat halus</b>. Ia berfungsi sebagai saluran penghantaran data berkelajuan tinggi dan sering digunakan dalam sistem komunikasi moden seperti internet, telefon, dan televisyen kabel.</p>
          <p className="mt-3">Gentian optik boleh digambarkan sebagai satu jalur yang nipis serta halus di mana ia membenarkan cahaya melaluinya - ia juga sering dirujuk sebagai <b>&ldquo;circular light pipe&rdquo;</b> (paip cahaya berbentuk bulat). Seperti mana batang paip berfungsi membawa air dari satu tempat ke tempat lain, begitu jugalah talian atau kabel fiber optik membawa cahaya yang mengandungi maklumat.</p>
          <p className="mt-3">Dengan kabel fiber optik, seluruh dunia kini dapat dihubungkan sama ada untuk komunikasi suara (panggilan telefon), penggunaan internet, atau pertukaran emel dalam masa beberapa saat sahaja.</p>
        </InfoCard>

        <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-lg overflow-hidden relative">
          <div className="absolute -right-14 -top-14 w-40 h-40 bg-cyan-500/20 rounded-full blur-2xl fiber-anim-glow" />
          <p className="text-xs uppercase tracking-[.2em] text-cyan-300 font-black">Anatomi kabel</p>
          <h3 className="text-xl font-black mt-2">Lapisan Gentian Optik</h3>
          <div className="mt-6 flex justify-center">
            <div className="w-52 h-52 rounded-full bg-slate-700 flex items-center justify-center shadow-2xl">
              <div className="w-40 h-40 rounded-full bg-amber-400 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-cyan-200 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-blue-800 text-xs font-black">CORE</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-6 text-xs">
            <span className="bg-white/10 p-2 rounded-lg">Core - laluan cahaya</span>
            <span className="bg-white/10 p-2 rounded-lg">Cladding - pantulan dalaman</span>
            <span className="bg-white/10 p-2 rounded-lg">Coating/buffer - perlindungan</span>
            <span className="bg-white/10 p-2 rounded-lg">Jacket - lapisan luar</span>
          </div>
          <p className="mt-4 text-[11px] text-cyan-100/80">Gentian optik <b>tidak</b> membawa isyarat elektrik - ia membawa isyarat cahaya yang mewakili maklumat yang sama.</p>
        </div>
      </div>

      {/* 4: Proses asas penghantaran isyarat */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h3 className="font-black text-slate-900 text-lg flex items-center gap-2 mb-1"><Repeat size={20} className="text-cyan-600" /> Proses Asas Penghantaran Isyarat</h3>
        <p className="text-sm text-slate-600 mb-5">Pada punca penghantar, isyarat elektrik ditukar kepada isyarat cahaya untuk dibawa melalui gentian optik. Pada punca penerima pula, isyarat cahaya ditukar semula kepada isyarat elektrik untuk proses selanjutnya.</p>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-4 w-32">
            <Plug size={26} className="text-slate-700" />
            <span className="text-[11px] font-black text-center text-slate-700">Isyarat Elektrik</span>
          </div>
          <ChevronRight size={18} className="text-cyan-500 fiber-anim-flow" />
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-4 w-32">
            <Flashlight size={26} className="text-amber-600" />
            <span className="text-[11px] font-black text-center text-amber-800">Isyarat Cahaya</span>
          </div>
          <ChevronRight size={18} className="text-cyan-500 fiber-anim-flow-delay" />
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-cyan-50 border border-cyan-200 px-4 py-4 w-32">
            <Cable size={26} className="text-cyan-700" />
            <span className="text-[11px] font-black text-center text-cyan-800">Gentian Optik</span>
          </div>
          <ChevronRight size={18} className="text-cyan-500 fiber-anim-flow-delay2" />
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-4 w-32">
            <Eye size={26} className="text-emerald-700" />
            <span className="text-[11px] font-black text-center text-emerald-800">Penerima</span>
          </div>
          <ChevronRight size={18} className="text-cyan-500" />
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-4 w-32">
            <Plug size={26} className="text-slate-700" />
            <span className="text-[11px] font-black text-center text-slate-700">Isyarat Elektrik</span>
          </div>
        </div>
      </div>

      <TahukahAnda>
        Gentian optik boleh digambarkan seperti <b>&ldquo;paip cahaya&rdquo;</b> - sama seperti paip air yang membawa air dari satu tempat ke tempat lain, kabel fiber optik membawa cahaya yang mengandungi maklumat dari penghantar ke penerima!
      </TahukahAnda>

      {/* 5-6: Kepentingan & kelebihan */}
      <InfoCard title="Kepentingan Fiber Optik dalam Sistem Komunikasi" icon={Globe}>
        <p>Kelebihan sistem gentian optik pada masa kini banyak mempertingkatkan sistem telekomunikasi dunia. Kemunculan teknologi ini telah menunjukkan perkembangan industri telekomunikasi sesebuah negara dan akan terus berkembang maju disebabkan terdapat banyak kelebihan penggunaannya berbanding penggunaan kabel tembaga.</p>
      </InfoCard>

      <div>
        <h3 className="font-black text-slate-900 text-lg flex items-center gap-2 mb-4"><BarChart3 size={20} className="text-cyan-600" /> Infografik: Mengapa Fiber Optik Digunakan?</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: Waves, title: 'Lebar Jalur Besar', text: 'Lebih banyak kapasiti maklumat boleh dibawa, membenarkan bit rate tinggi.' },
            { icon: TrendingDown, title: 'Kadar Kehilangan Rendah', text: 'Kadar loss dan penyerakan rendah - menjimatkan kos stesen pengulang.' },
            { icon: Box, title: 'Saiz Kecil & Ringan', text: 'Mudah diselenggara dan kelihatan kemas semasa proses pengkabelan.' },
            { icon: Shield, title: 'Tiada Kesan EMI', text: 'Tiada pengaliran arus elektrik - tiada pancaran elektromagnet, boleh melalui kawasan bervoltan tinggi.' },
            { icon: Lock, title: 'Lebih Selamat', text: 'Kabel tidak boleh di-\u2018tap\u2019 oleh individu yang tidak bertanggungjawab.' },
            { icon: Repeat, title: 'Fleksibel', text: 'Boleh dilaksanakan secara berperingkat-peringkat jika ada penambahbaikan.' },
            { icon: ShieldCheck, title: 'Kekebalan dari Hingar', text: 'Dibina daripada bahan dielektrik - kebal dari gangguan hingar / crosstalk, EMI dan gangguan elektrostatik, malah panahan kilat.' },
            { icon: Award, title: 'Kebolehpercayaan Tinggi', text: 'Jangka hayat lebih lama berbanding kabel tembaga - lebih tahan hakisan cuaca, suhu dan gas.' },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-700 mb-3"><item.icon size={19} /></div>
              <p className="font-black text-slate-900 text-sm">{item.title}</p>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <NotesTable
        headers={['Ciri', 'Kabel Gentian Optik', 'Kabel Tembaga (cth: Ethernet)']}
        rows={[
          ['Medium Penghantaran', 'Cahaya (isyarat optik)', 'Isyarat elektrik'],
          ['Kelajuan', 'Sangat tinggi (hingga Tbps)', 'Lebih rendah (hingga 10 Gbps untuk Cat6/7)'],
          ['Jalur Lebar', 'Sangat tinggi', 'Sederhana'],
          ['Jarak Penghantaran', 'Jarak jauh (hingga 100 km atau lebih)', 'Jarak pendek (hingga 100 m untuk Ethernet)'],
          ['Gangguan', 'Tidak terjejas oleh gangguan elektrik', 'Mudah terganggu oleh gangguan elektromagnet'],
          ['Kos', 'Kos awal lebih tinggi', 'Kos awal lebih rendah'],
          ['Ketahanan', 'Rapuh (perlu pengendalian berhati-hati)', 'Lebih tahan lasak dan fleksibel'],
        ]}
      />
      <p className="text-xs text-slate-500 -mt-3">Jadual 1: Perbezaan Antara Kabel Gentian Optik dan Kabel Lain (Sumber: Kertas Penerangan IKR3033/KP1)</p>

      {/* 7: Situasi penggunaan */}
      <InfoCard title="Kegunaan Kabel Gentian Optik Pada Masa Kini" icon={Network}>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            'Tulang belakang internet - asas infrastruktur internet global dan ISP berkelajuan tinggi',
            'Telekomunikasi - panggilan jarak jauh dan rangkaian telefon mudah alih',
            'Pengimejan perubatan - digunakan dalam alat seperti endoskop',
            'Pusat data - penghantaran data berkelajuan tinggi antara pelayan',
            'Ketenteraan & aeroangkasa - komunikasi yang selamat dan berprestasi tinggi',
            'Penyiaran - menghantar video HD dan 4K tanpa kehilangan kualiti',
            'Industri & penderiaan - digunakan dalam penderia suhu, tekanan dan getaran',
            'Televisyen kabel dan internet rumah - seperti dinyatakan dalam tujuan modul ini',
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 rounded-xl bg-slate-50 border border-slate-200 p-3 text-sm">
              <CheckCircle size={16} className="text-cyan-600 shrink-0 mt-0.5" /> {item}
            </div>
          ))}
        </div>
      </InfoCard>

      {/* Single-mode / Multimode (kekal) */}
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Single-mode (SMF)" icon={Radio}>
          <p>Teras lazim sekitar 8-10 µm. Menghantar satu mod cahaya menggunakan sumber laser dan sesuai untuk jarak jauh, backbone, MAN/WAN serta FTTH.</p>
          <div className="mt-4 bg-blue-50 text-blue-800 rounded-xl p-3 text-sm font-bold">Contoh kategori: OS1 dan OS2</div>
        </InfoCard>
        <InfoCard title="Multimode (MMF)" icon={Activity}>
          <p>Teras lebih besar, lazimnya 50 µm atau 62.5 µm. Membawa beberapa laluan cahaya dan sesuai untuk jarak lebih pendek seperti rangkaian dalam bangunan dan pusat data.</p>
          <div className="mt-4 bg-orange-50 text-orange-800 rounded-xl p-3 text-sm font-bold">Contoh kategori: OM1, OM2, OM3, OM4 dan OM5</div>
        </InfoCard>
      </div>

      <InfoCard title="Komponen dan peralatan kerja" icon={Wrench}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {['Fiber stripper - menanggalkan coating', 'Cleaver - menghasilkan potongan rata', 'Fusion splicer - menyambung dua gentian', 'Splice sleeve - melindungi sambungan', 'VFL - semakan kesinambungan visual', 'Optical power meter - mengukur kuasa', 'Light source - sumber cahaya ujian', 'OTDR - mengesan event dan jarak'].map((item) => (
            <div key={item} className="bg-slate-50 border border-slate-200 rounded-xl p-3 font-medium">{item}</div>
          ))}
        </div>
      </InfoCard>

      <NotaPenting>
        Gentian optik <b>tidak membawa isyarat elektrik</b>. Ia membawa isyarat cahaya yang mewakili maklumat yang sama seperti isyarat elektrik. Ini adalah sebab utama mengapa fiber optik kebal terhadap gangguan elektromagnet (EMI).
      </NotaPenting>

      <Ringkasan>
        <ul className="space-y-1.5 list-disc pl-5">
          <li>Fiber optik menghantar data menggunakan <b>cahaya</b> melalui gentian kaca/plastik yang sangat halus.</li>
          <li>Proses asas: <b>Isyarat Elektrik &rarr; Isyarat Cahaya &rarr; Gentian Optik &rarr; Penerima &rarr; Isyarat Elektrik</b>.</li>
          <li>Kelebihan utama: jalur lebar besar, loss rendah, kebal EMI/crosstalk, selamat dan kebolehpercayaan tinggi.</li>
          <li>Digunakan secara meluas dalam internet, telefon, TV kabel, perubatan, pusat data dan ketenteraan.</li>
        </ul>
      </Ringkasan>
    </div>
  );
}

function StructureNotes() {
  const layers = [
    { key: 'core', label: 'Core (Teras)', color: 'bg-cyan-200', text: 'text-cyan-900', size: 'w-14 h-14' },
    { key: 'cladding', label: 'Cladding (Salutan)', color: 'bg-blue-300', text: 'text-blue-900', size: 'w-24 h-24' },
    { key: 'coating', label: 'Primary Coating', color: 'bg-amber-300', text: 'text-amber-900', size: 'w-32 h-32' },
    { key: 'buffer', label: 'Buffer / Penebat', color: 'bg-orange-300', text: 'text-orange-900', size: 'w-40 h-40' },
    { key: 'jacket', label: 'Outer Jacket', color: 'bg-slate-400', text: 'text-slate-900', size: 'w-48 h-48' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Struktur Asas Gentian Optik" icon={Layers}>
        <p>Gentian optik terdiri daripada satu teras <b>&lsquo;Core&rsquo;</b> dengan satu indeks biasan cahaya yang lebih tinggi, dikelilingi lapisan <b>&lsquo;Cladding&rsquo;</b> dengan satu indeks biasan cahaya yang lebih rendah. Gentian kaca ini sangat kuat - sekiranya terdapat rekahan paling kecil di permukaan gentian, ia akan menjejaskan kualiti gentian optik, maka ia mesti dilindungi oleh lapisan utama <b>&lsquo;Primary Coating&rsquo;</b>, seperti plastik.</p>
        <p className="mt-3">Kabel gentian optik terdiri daripada beberapa lapisan yang direka untuk memastikan penghantaran cahaya yang efisien, perlindungan fizikal, dan ketahanan terhadap persekitaran.</p>
      </InfoCard>

      {/* Rajah potongan rentas */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-8 shadow-sm">
        <h3 className="font-black text-slate-900 text-lg mb-1 flex items-center gap-2"><Crosshair size={20} className="text-cyan-600" /> Rajah Potongan Rentas Kabel Fiber Optik</h3>
        <p className="text-sm text-slate-500 mb-6">Infografik: Struktur Fiber dari Dalam ke Luar 🟢</p>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="relative w-56 h-56 shrink-0 flex items-center justify-center">
            {[...layers].reverse().map((layer) => (
              <div key={layer.key} className={`absolute rounded-full ${layer.color} ${layer.size} flex items-center justify-center`} />
            ))}
            <span className="relative z-10 text-[10px] font-black text-cyan-900 bg-white/70 rounded-full px-2 py-1">💡 CORE</span>
          </div>
          <div className="flex-1 w-full space-y-2">
            {layers.map((layer, i) => (
              <div key={layer.key} className="flex items-center gap-3">
                <span className={`w-4 h-4 rounded-full ${layer.color} shrink-0`} />
                <ArrowLeftRight size={14} className="text-slate-300 shrink-0" />
                <span className="text-sm font-bold text-slate-800">{i + 1}. {layer.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* a. Core */}
      <InfoCard title="a. Teras (Core)" icon={Sparkles}>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl bg-cyan-50 border border-cyan-200 p-3"><b className="text-cyan-800">Fungsi</b><p className="mt-1">Laluan utama untuk penghantaran cahaya 💡.</p></div>
          <div className="rounded-xl bg-cyan-50 border border-cyan-200 p-3"><b className="text-cyan-800">Bahan</b><p className="mt-1">Kaca (silika tulen) atau plastik khas berindeks biasan tinggi.</p></div>
          <div className="rounded-xl bg-cyan-50 border border-cyan-200 p-3"><b className="text-cyan-800">Saiz diameter</b><p className="mt-1">8-10 µm (single-mode); 50 atau 62.5 µm (multi-mode).</p></div>
        </div>
      </InfoCard>

      {/* b. Cladding */}
      <InfoCard title="b. Salutan (Cladding)" icon={Layers}>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-3"><b className="text-blue-800">Fungsi</b><p className="mt-1">Mengelilingi teras dan memantulkan cahaya kembali ke dalam teras melalui prinsip <b>pantulan dalaman menyeluruh</b> (total internal reflection).</p></div>
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-3"><b className="text-blue-800">Bahan</b><p className="mt-1">Kaca atau bahan berindeks biasan lebih rendah berbanding teras.</p></div>
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-3"><b className="text-blue-800">Saiz diameter</b><p className="mt-1">Biasanya 125 µm.</p></div>
        </div>
      </InfoCard>

      {/* c & d Coating/Buffer */}
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="c. Primary Coating / Buffer Coating" icon={Shield}>
          <p><b>Fungsi:</b> 🛡️ Melindungi gentian daripada kelembapan, tekanan mekanikal, dan mikro-lenturan (micro-bending).</p>
          <p className="mt-2"><b>Bahan:</b> Polimer lembut seperti acrylate atau silikon.</p>
          <p className="mt-2"><b>Saiz:</b> Sekitar 250 µm keseluruhan.</p>
        </InfoCard>
        <InfoCard title="d. Penebat Kedua / Lapisan Penyangga" icon={Layers}>
          <p><b>Fungsi:</b> Memberikan perlindungan tambahan dan memudahkan pengendalian semasa pemasangan.</p>
          <div className="mt-3 grid grid-cols-1 gap-2 text-sm">
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-2.5"><b>Loose buffer</b> - gentian boleh bergerak bebas, sesuai untuk penggunaan luaran.</div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-2.5"><b>Tight buffer</b> - gentian terikat rapat, sesuai untuk penggunaan dalaman.</div>
          </div>
        </InfoCard>
      </div>

      {/* e & f */}
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="e. Lapisan Penguat (Strengthening Layer)" icon={ShieldCheck}>
          <p><b>Fungsi:</b> Memberi kekuatan mekanikal untuk menahan tarikan semasa pemasangan atau mengelakkan gentian patah.</p>
          <p className="mt-2"><b>Bahan:</b> Kevlar (aramid yarn), gelas gentian, atau wayar logam.</p>
        </InfoCard>
        <InfoCard title="f. Salutan Luar (Outer Jacket / Sheath)" icon={Box}>
          <p><b>Bahan:</b> PVC, polietilena, atau plastik tahan lama.</p>
          <p className="mt-2"><b>Fungsi:</b> Perlindungan terhadap kerosakan persekitaran seperti haba, air, dan geseran.</p>
          <p className="mt-2"><b>Warna:</b> Biasanya dikodkan untuk tujuan pengenalan.</p>
        </InfoCard>
      </div>

      <InfoCard title="g. Tambahan (bergantung kepada aplikasi)" icon={Droplet}>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Gel kalis air</b> - mengelakkan kelembapan masuk ke dalam kabel.</li>
          <li><b>Lapisan pelindung logam</b> - untuk perlindungan tambahan dalam persekitaran kasar (contoh: kabel bawah tanah atau bawah laut).</li>
        </ul>
      </InfoCard>

      <NotesTable
        headers={['Komponen', 'Fungsi', 'Bahan / Ciri', 'Kepentingan']}
        rows={[
          ['Core (Teras)', 'Laluan utama penghantaran cahaya', 'Kaca (silika tulen) / plastik, indeks biasan tinggi', 'Menentukan kualiti dan jarak penghantaran'],
          ['Cladding (Salutan)', 'Pantulan dalaman menyeluruh (TIR)', 'Kaca/bahan indeks biasan lebih rendah, ~125 µm', 'Mengekalkan cahaya di dalam core'],
          ['Primary Coating', 'Lindungi dari kelembapan, tekanan, micro-bending', 'Polimer lembut (acrylate/silikon), ~250 µm', 'Elak rekahan permukaan gentian'],
          ['Buffer (Loose/Tight)', 'Perlindungan tambahan + kemudahan pengendalian', 'Loose (luaran) atau Tight (dalaman)', 'Memudahkan pemasangan ikut lokasi'],
          ['Lapisan Penguat', 'Kekuatan mekanikal, tahan tarikan', 'Kevlar, gelas gentian, wayar logam', 'Elak gentian patah semasa tarikan'],
          ['Outer Jacket', 'Perlindungan haba, air, geseran', 'PVC, polietilena, plastik tahan lama', 'Ketahanan luaran & pengenalan warna'],
        ]}
      />

      <TahukahAnda>
        Sekiranya terdapat rekahan sekecil mana pun pada permukaan gentian kaca, ia boleh menjejaskan keseluruhan kualiti penghantaran cahaya! Itulah sebabnya lapisan <b>Primary Coating</b> amat penting sebagai lapisan pertahanan pertama.
      </TahukahAnda>

      {/* Kesilapan Lazim */}
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 md:p-6">
        <h4 className="font-black text-rose-800 flex items-center gap-2 mb-3"><AlertTriangle size={19} /> Kesilapan Lazim Pelajar</h4>
        <ul className="space-y-2 text-sm text-rose-900">
          <li className="flex items-start gap-2"><XCircle size={15} className="mt-0.5 shrink-0" /> <span><b>Mengelirukan Core dengan Cladding</b> - Core adalah laluan cahaya utama (indeks biasan lebih tinggi), manakala Cladding hanya berfungsi memantulkan cahaya kembali ke dalam Core (indeks biasan lebih rendah). Core bukan lapisan pelindung.</span></li>
          <li className="flex items-start gap-2"><XCircle size={15} className="mt-0.5 shrink-0" /> <span><b>Menyangka Coating sama fungsi dengan Cladding</b> - Cladding berperanan optik (pantulan cahaya), manakala Primary Coating pula berperanan fizikal (melindungi daripada kelembapan dan kerosakan mekanikal). Kedua-duanya berbeza fungsi walaupun sama-sama &ldquo;mengelilingi&rdquo; core.</span></li>
        </ul>
      </div>

      <Ringkasan>
        <ul className="space-y-1.5 list-disc pl-5">
          <li>Susunan lapisan dari dalam ke luar: <b>Core &rarr; Cladding &rarr; Primary Coating &rarr; Buffer &rarr; Lapisan Penguat &rarr; Outer Jacket</b>.</li>
          <li>Core membawa cahaya; Cladding memantulkannya kembali melalui pantulan dalaman menyeluruh.</li>
          <li>Setiap lapisan luar memberi perlindungan tambahan - kelembapan, tarikan mekanikal, dan persekitaran.</li>
        </ul>
      </Ringkasan>
    </div>
  );
}

function TransmissionNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="A. Jenis Penghantaran Cahaya" icon={Split}>
        <p>Penghantaran cahaya (<i>light transmission</i>) dalam konteks kabel gentian optik merujuk kepada cara cahaya dihantar melalui teras gentian untuk membawa maklumat dari satu titik ke titik lain. Terdapat dua jenis utama penghantaran cahaya: <b>Mod Tunggal (Single-mode)</b> dan <b>Pelbagai Mod (Multi-mode)</b>, dibezakan oleh saiz teras (core) dan sumber cahaya yang digunakan.</p>
      </InfoCard>

      {/* Rajah Singlemode */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 md:p-6">
        <h4 className="font-black text-blue-900 flex items-center gap-2 mb-1"><Radio size={19} /> Rajah: Gentian Mod Tunggal (Single-Mode)</h4>
        <p className="text-xs text-blue-700 mb-4">💡 Sumber cahaya: Laser &nbsp;•&nbsp; Teras sempit (~9 µm)</p>
        <div className="bg-white rounded-xl border border-blue-200 p-6 flex items-center gap-3 overflow-x-auto">
          <Flashlight size={22} className="text-blue-600 shrink-0" />
          <div className="relative flex-1 h-8 bg-blue-100 rounded-full min-w-[220px]">
            <div className="absolute inset-y-0 left-0 w-full flex items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600 fiber-anim-flow" style={{ marginLeft: '4%' }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-blue-500">satu laluan cahaya lurus</div>
          </div>
          <ArrowLeftRight size={18} className="text-blue-400 shrink-0" />
          <Eye size={22} className="text-blue-600 shrink-0" />
        </div>
        <p className="text-xs text-blue-800 mt-3">Cahaya bergerak dalam <b>satu laluan lurus</b> - tiada pantulan berulang &rarr; kelajuan tinggi, jarak jauh (hingga &gt;100 km), jalur lebar sangat tinggi, kurang penyebaran isyarat (dispersion), namun kos peralatan lebih tinggi.</p>
      </div>

      {/* Rajah Multimode */}
      <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5 md:p-6">
        <h4 className="font-black text-orange-900 flex items-center gap-2 mb-1"><Activity size={19} /> Rajah: Gentian Pelbagai Mod (Multi-Mode)</h4>
        <p className="text-xs text-orange-700 mb-4">💡 Sumber cahaya: LED / VCSEL &nbsp;•&nbsp; Teras lebih lebar (50 µm / 62.5 µm)</p>
        <div className="bg-white rounded-xl border border-orange-200 p-6 flex items-center gap-3 overflow-x-auto">
          <Flashlight size={22} className="text-orange-600 shrink-0" />
          <div className="relative flex-1 h-14 bg-orange-100 rounded-full min-w-[220px] overflow-hidden">
            <div className="absolute top-1.5 left-0 w-2.5 h-2.5 rounded-full bg-orange-600 fiber-anim-flow" />
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2.5 h-2.5 rounded-full bg-orange-600 fiber-anim-flow-delay" />
            <div className="absolute bottom-1.5 left-0 w-2.5 h-2.5 rounded-full bg-orange-600 fiber-anim-flow-delay2" />
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-orange-500">pelbagai laluan pantulan</div>
          </div>
          <ArrowLeftRight size={18} className="text-orange-400 shrink-0" />
          <Eye size={22} className="text-orange-600 shrink-0" />
        </div>
        <p className="text-xs text-orange-800 mt-3">Cahaya bergerak dalam <b>pelbagai laluan pantulan</b> dalam teras &rarr; mudah terjejas oleh penyebaran isyarat, sesuai untuk jarak pendek (biasanya &lt;2 km / &lt;550 m), tetapi kos kabel &amp; peralatan lebih rendah dan lebih mudah untuk penjajaran.</p>
      </div>

      {/* Total Internal Reflection */}
      <InfoCard title="B. Bagaimana Cahaya Bergerak Dalam Fiber - Total Internal Reflection" icon={Lightbulb}>
        <ol className="space-y-3 list-decimal pl-5">
          <li><b>Cahaya masuk ke dalam Core</b> - menggunakan sumber laser (mod tunggal) atau LED (pelbagai mod), cahaya dihantar masuk ke dalam teras kabel gentian optik.</li>
          <li><b>Hubungan Core dan Cladding</b> - Cladding mempunyai indeks biasan yang lebih rendah berbanding teras, menyebabkan ia memantulkan cahaya kembali ke dalam teras.</li>
          <li><b>Pantulan Dalaman Menyeluruh (Total Internal Reflection)</b> - Cahaya kekal dalam teras gentian kerana pemantulan sepenuhnya pada sempadan antara teras dan cladding.</li>
          <li><b>Isyarat Cahaya Membawa Data</b> - Cahaya berkelip dalam corak (pulses) untuk mewakili bit data (1 dan 0). Sistem penghantaran menukar data digital menjadi denyutan cahaya.</li>
          <li><b>Penerima Cahaya</b> - Di hujung lain kabel, detektor optik seperti <i>photodiode</i> akan menangkap cahaya dan menukarkannya semula menjadi isyarat elektrik.</li>
        </ol>
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-4">Bagaimana Cahaya Dihantar? ↔️</h4>
        <FlowHorizontal steps={['💡 Sumber Cahaya', 'Core', 'Total Internal Reflection', 'Penerima (Photodiode)']} />
      </div>

      <TahukahAnda>
        Kabel gentian optik kadangkala digelar &ldquo;paip cahaya&rdquo; kerana prinsip Total Internal Reflection menyebabkan cahaya sentiasa terperangkap dan &ldquo;memantul&rdquo; di dalam Core sepanjang perjalanannya - sama seperti cahaya terperangkap di dalam cermin berbentuk tiub!
      </TahukahAnda>

      {/* Perbandingan */}
      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4">C. Kad Perbandingan: Singlemode ⚡ vs Multimode ⚡</h3>
        <CompareCards
          left={{
            title: 'Single-Mode Fiber ⚡',
            tone: 'cyan',
            points: ['Teras: Sempit (~9 µm)', 'Sumber cahaya: Laser', 'Penghantaran: Lurus, satu laluan', 'Jarak jauh (hingga >100 km)', 'Jalur lebar sangat tinggi', 'Kurang penyebaran isyarat (dispersion)', 'Kos peralatan lebih tinggi'],
          }}
          right={{
            title: 'Multi-Mode Fiber ⚡',
            tone: 'amber',
            points: ['Teras: Lebih lebar (50 µm / 62.5 µm)', 'Sumber cahaya: LED / VCSEL', 'Penghantaran: Banyak laluan pantulan', 'Jarak pendek (biasanya <2 km)', 'Prestasi lebih rendah pada jarak jauh', 'Kos lebih rendah untuk peralatan', 'Lebih mudah untuk penjajaran'],
          }}
        />
      </div>

      <NotesTable
        headers={['Ciri', 'Gentian Mod Tunggal', 'Gentian Pelbagai Mod']}
        rows={[
          ['Saiz Teras', '8 - 10 µm', '50 µm atau 62.5 µm'],
          ['Sumber Cahaya', 'Laser', 'LED atau VCSEL'],
          ['Jalur Lebar', 'Lebih tinggi', 'Lebih rendah'],
          ['Jarak Penghantaran', 'Sehingga 100+ km', 'Sehingga 2 km (biasanya <550 m)'],
          ['Kos Kabel', 'Lebih rendah', 'Lebih tinggi'],
          ['Kos Peralatan', 'Lebih tinggi (komponen laser, transceiver)', 'Lebih rendah (optik lebih murah)'],
          ['Aplikasi', 'Rangkaian jarak jauh (WAN, telekomunikasi)', 'Rangkaian jarak dekat (LAN, pusat data)'],
        ]}
      />
      <p className="text-xs text-slate-500 -mt-3">Jadual 2: Perbandingan antara Mod Tunggal (Single-mode) vs. Pelbagai Mod (Multi-mode)</p>

      <NotaPenting>
        <b>Kesan Saiz Teras terhadap Prestasi:</b> Teras kecil (mod tunggal) = kurang penyebaran mod &rarr; jalur lebar lebih tinggi &amp; sesuai jarak jauh, tetapi memerlukan penjajaran tepat (peralatan lebih mahal). Teras besar (pelbagai mod) = lebih banyak penyebaran mod &rarr; prestasi lebih rendah pada jarak jauh, tetapi lebih mudah disambungkan.
      </NotaPenting>

      <Ringkasan>
        Kesimpulannya, gentian <b>mod tunggal (Single-mode)</b> sesuai untuk pemasangan telekomunikasi, rangkaian metro, dan sambungan internet jarak jauh. Manakala gentian <b>pelbagai mod (Multi-mode)</b> sesuai untuk pemasangan rangkaian kampus, sambungan pusat data jarak dekat, dan industri.
      </Ringkasan>
    </div>
  );
}

function ConnectionNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Dua Pendekatan Penyambungan Fiber Optik" icon={Cable}>
        <p>Bagi memastikan penghantaran data berjalan lancar tanpa gangguan, penyambungan gentian optik perlu dilakukan dengan tepat dan berkualiti tinggi. Terdapat dua pendekatan utama:</p>
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          <div className="rounded-xl bg-cyan-50 border border-cyan-200 p-4"><b className="text-cyan-800">1. Penyambung (Connector) / Mechanical Connection</b><p className="mt-1 text-sm text-cyan-900">Menyambung dua hujung fiber secara mekanikal tanpa mencairkannya - fokus bahagian ini.</p></div>
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4"><b className="text-amber-800">2. Fusion Splicing</b><p className="mt-1 text-sm text-amber-900">Melebur/mencairkan hujung fiber bersama - diterangkan lanjut dalam bahagian seterusnya.</p></div>
        </div>
      </InfoCard>

      <InfoCard title="Penggunaan Connector untuk Menyambung Fiber Tanpa Fusion" icon={Wrench}>
        <p>Penyambung fiber optik ialah peranti kecil yang membolehkan dua hujung fiber disambungkan secara mekanikal tanpa mencairkannya. Ia membolehkan sambungan boleh dibuka dan dipasang semula (<i>reusable</i>).</p>
      </InfoCard>

      {/* Workflow */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-4">Proses Penyambungan Menggunakan Penyambung</h4>
        <div className="grid sm:grid-cols-5 gap-3">
          {[
            { icon: Scissors, step: 'a. Stripping', text: 'Tanggalkan lapisan pelindung dari fiber untuk mendedahkan bahagian kaca.' },
            { icon: Droplet, step: 'b. Membersihkan', text: 'Bersihkan hujung fiber dengan alkohol isopropil dan kain bebas serabut 🧽.' },
            { icon: Scissors, step: 'c. Cleave', text: 'Potong hujung fiber secara rata menggunakan alat cleaver ✂️.' },
            { icon: Plug, step: 'd. Masukkan', text: 'Masukkan kedua-dua hujung fiber ke dalam penyambung khas sehingga bertemu di tengah 🔗.' },
            { icon: TestTube, step: 'e. Kunci & Uji', text: 'Kunci penyambung dan uji sambungan menggunakan meter kuasa atau sumber cahaya 🧪.' },
          ].map((item, i, arr) => (
            <div key={item.step} className="flex flex-col items-center text-center gap-2">
              <div className="w-11 h-11 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-700"><item.icon size={20} /></div>
              <p className="text-xs font-black text-slate-900">{item.step}</p>
              <p className="text-[11px] text-slate-600 leading-relaxed">{item.text}</p>
              {i < arr.length - 1 && <ChevronRight size={16} className="text-cyan-400 hidden sm:block" />}
            </div>
          ))}
        </div>
      </div>

      <CompareCards
        left={{
          title: 'Kelebihan Mekanikal Splice',
          tone: 'cyan',
          points: ['Tidak memerlukan mesin fusion splicer', 'Cepat dan mudah dipasang', 'Boleh digunakan semula', 'Sesuai untuk sambungan sementara atau ujian'],
        }}
        right={{
          title: 'Kekurangan Mekanikal Splice',
          tone: 'amber',
          points: ['Insertion loss lebih tinggi berbanding fusion splicing (sekitar 0.2 - 0.5 dB)', 'Kurang sesuai untuk sambungan kekal atau jarak jauh'],
        }}
      />

      {/* Connector types */}
      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><Plug size={20} className="text-cyan-600" /> Jenis-Jenis Penyambung Fiber Optik</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { code: 'SC', name: 'Subscriber Connector / Square Connector', shape: 'Petak (square), sistem push-pull', points: ['Sangat popular dalam rangkaian data dan telekomunikasi', 'Mudah dipasang dan ditanggalkan', 'Kelebihan: stabil, kos rendah, sesuai pemasangan berbilang port', 'Jenis sambungan: Singlemode dan Multimode'] },
            { code: 'LC', name: 'Lucent Connector / Little Connector', shape: 'Lebih kecil daripada SC (mini)', points: ['Digunakan meluas dalam aplikasi rangkaian berkelajuan tinggi dan padat', 'Mekanisme push-pull dengan penguncian seperti RJ45', 'Kelebihan: penjimatan ruang, sesuai peralatan rangkaian moden', 'Jenis sambungan: Singlemode dan Multimode'] },
            { code: 'ST', name: 'Straight Tip', shape: 'Bulat, mekanisme twist-and-lock', points: ['Dahulu sangat popular dalam sistem rangkaian LAN dan CCTV', 'Direka untuk penyambungan cepat', 'Kelebihan: mudah digunakan, kukuh', 'Jenis sambungan: terutamanya Multimode'] },
            { code: 'FC', name: 'Ferrule Connector', shape: 'Bulat dengan skru pengunci logam', points: ['Sangat stabil, digunakan dalam persekitaran bergetar tinggi (industri, makmal)', 'Kelebihan: prestasi tinggi untuk Singlemode, sangat kukuh', 'Jenis sambungan: biasanya Singlemode'] },
          ].map((c) => (
            <div key={c.code} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm">{c.code}</div>
                <div>
                  <p className="font-black text-slate-900 text-sm">{c.name}</p>
                  <p className="text-[11px] text-slate-500">{c.shape}</p>
                </div>
              </div>
              <ul className="mt-2 space-y-1.5">
                {c.points.map((p) => (
                  <li key={p} className="text-xs text-slate-600 flex items-start gap-1.5"><Check size={13} className="text-cyan-600 mt-0.5 shrink-0" /> {p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <NotesTable
        headers={['Jenis Penyambung', 'Mekanisme', 'Saiz', 'Aplikasi']}
        rows={[
          ['SC', 'Push-pull', 'Besar', 'Telekom & data'],
          ['LC', 'Push-pull mini', 'Kecil', 'Data berkapasiti tinggi'],
          ['ST', 'Twist-lock', 'Sederhana', 'Rangkaian lama, CCTV'],
          ['FC', 'Skru logam', 'Sederhana', 'Industri, makmal'],
        ]}
      />
      <p className="text-xs text-slate-500 -mt-3">Jadual 1: Perbandingan antara SC, LC, ST dan FC Connectors</p>

      <Checklist
        title="Checklist Sebelum Penyambungan"
        items={['Fiber dibersihkan', 'Hujung fiber dipotong dengan betul (cleave)', 'Connector dipasang', 'Sambungan dikunci', 'Sambungan diuji']}
      />

      <TahukahAnda>
        LC connector direka lebih kecil daripada SC supaya lebih banyak port boleh dimuatkan dalam ruang yang sama pada peralatan rangkaian moden - itulah sebabnya ia digelar &ldquo;Little Connector&rdquo;!
      </TahukahAnda>

      <Ringkasan>
        Penyambungan menggunakan connector sesuai untuk sambungan yang perlu dibuka semula atau bersifat sementara, dengan proses: <b>Stripping &rarr; Membersihkan &rarr; Cleave &rarr; Masukkan ke Connector &rarr; Kunci &amp; Uji</b>. Pilihan connector (SC/LC/ST/FC) bergantung kepada aplikasi dan jenis fiber yang digunakan.
      </Ringkasan>
    </div>
  );
}

function FusionNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Apakah Fusion Splicing?" icon={Zap}>
        <p>Mencairkan (atau meleburkan) hujung kabel gentian optik merupakan satu proses yang tepat yang dikenali sebagai <b>Fusion Splicing</b>. Fusion Splicing adalah proses menggabungkan atau mengimpal dua kabel fiber optik bersama-sama, biasanya dilakukan oleh <b>arka elektrik (electric arc)</b> ⚡.</p>
        <p className="mt-3">Kaedah ini digunakan untuk menghasilkan sambungan yang <b>lancar</b> dengan <b>kehilangan isyarat yang sangat rendah</b> antara dua kabel gentian optik. Fusion splicing adalah kaedah yang paling meluas digunakan kerana ia menghasilkan kehilangan isyarat rendah dan pantulan balikan yang rendah. Hasil cantuman menggunakan fusion splicer sangat kuat dan paling boleh dipercayai.</p>
      </InfoCard>

      <NotaPenting>
        Kabel fiber optik <b>multimode</b> lebih sukar dicantum menggunakan mesin fusion splice kerana mempunyai teras yang lebih besar serta sukar dipadankan dengan pengeluar kabel yang berbeza.
      </NotaPenting>

      {/* Process flow */}
      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4">Rajah Proses Fusion Splicing</h3>
        <FlowVertical steps={['Stripping', 'Cleaning', 'Cleaving', 'Fiber Alignment 🎯', 'Prefuse Cycle', 'Electric Arc ⚡', 'Fusion Splice', 'Loss Estimation', 'Splice Protection 🛡️']} />
      </div>

      {/* Before / During / After */}
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">Before Splicing</p>
          <div className="flex items-center justify-center gap-1 mb-2">
            <div className="w-10 h-1.5 bg-cyan-500 rounded-full" />
            <div className="w-1 h-1.5" />
            <div className="w-10 h-1.5 bg-orange-500 rounded-full" />
          </div>
          <p className="text-[11px] text-slate-600">Dua hujung gentian terpisah, belum disejajarkan.</p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-wide text-amber-600 mb-2">During Splicing ⚡</p>
          <div className="flex items-center justify-center gap-0.5 mb-2">
            <div className="w-9 h-1.5 bg-cyan-500 rounded-full" />
            <Zap size={18} className="text-amber-500 fiber-anim-spark" />
            <div className="w-9 h-1.5 bg-orange-500 rounded-full" />
          </div>
          <p className="text-[11px] text-amber-800">Gentian diselaraskan &amp; dicantum menggunakan arka elektrik.</p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center">
          <p className="text-xs font-black uppercase tracking-wide text-emerald-600 mb-2">After Splicing 🛡️</p>
          <div className="flex items-center justify-center mb-2">
            <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-500 to-orange-500 rounded-full" />
          </div>
          <p className="text-[11px] text-emerald-800">Sambungan lancar, dilindungi splice protector.</p>
        </div>
      </div>

      {/* Detailed steps */}
      <InfoCard title="Persediaan Gentian untuk Disambung" icon={Wrench}>
        <p>Prosesnya adalah sama untuk semua jenis sambatan: <b>jalur, bersih &amp; belah</b>. Setiap gentian mesti dibersihkan dengan teliti sebelum dilucutkan untuk penyambungan. Apabila bersedia untuk menyambung gentian, tanggalkan salutan penimbal untuk mendedahkan panjang gentian kosong yang betul.</p>
        <ol className="mt-4 space-y-2 list-decimal pl-5">
          <li>Bersihkan gentian dengan kain lap yang sesuai.</li>
          <li>Belah (cleave) gentian menggunakan proses yang bersesuaian dengan pisau yang digunakan.</li>
          <li>Letakkan gentian ke dalam panduan dalam mesin penyambung gabungan dan pasangkannya di tempatnya.</li>
          <li>Ulang untuk gentian lain yang akan disambung.</li>
          <li>Jalankan program penyambung yang sesuai untuk jenis gentian yang disambungkan.</li>
        </ol>
      </InfoCard>

      <InfoCard title="Penyambungan Automatik (Automated Splicing)" icon={Sparkles}>
        <ul className="space-y-2.5">
          {[
            'Gentian akan dialihkan ke dalam kedudukan.',
            'Kitaran prefuse akan mengeluarkan sebarang kotoran pada hujung gentian dan memanaskan gentian untuk penyambungan.',
            'Gentian akan diselaraskan menggunakan kaedah penjajaran teras (core alignment) untuk splicer itu.',
            'Gentian akan dicantum oleh kitaran arka automatik yang memanaskannya dalam arka elektrik dan menyuap gentian bersama-sama pada kadar penyambungan yang terkawal (controlled feeding).',
            'Apabila proses fusion splicing selesai, mesin splicing akan memeriksa splice dan menganggarkan kehilangan optik splice. Ia akan memberitahu operator jika sambungan perlu dibuat semula.',
            'Operator akan mengeluarkan gentian daripada panduan dan memasang pelindung sambatan kekal dengan mengecut haba (heat-shrink) atau mengepit clam shell protector.',
          ].map((item, i) => (
            <li key={item} className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-cyan-100 text-cyan-700 text-xs font-black flex items-center justify-center">{i + 1}</span>
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </InfoCard>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Menilai Splice - Splice Baik" icon={CheckCircle}>
          <p>Periksa splice secara visual selepas program dijalankan, menggunakan kedua-dua paparan X dan Y. Sesetengah kecacatan yang tidak menjejaskan penghantaran optik boleh diterima - contohnya sesetengah gentian (didop fluorin atau bersalut titanium) boleh menyebabkan garis putih atau hitam di kawasan sambatan yang <b>bukan</b> kerosakan.</p>
        </InfoCard>
        <InfoCard title="Menilai Splice - Sambungan Buruk" icon={XCircle}>
          <p>Sesetengah kecacatan tidak boleh diterima dan memerlukan proses penyambungan dimulakan semula. Bintik hitam atau garisan boleh diperbaiki dengan mengulangi langkah ARC (tidak lebih daripada dua kali). Untuk teras besar, buih atau sambatan membonjol - sentiasa buat semula.</p>
        </InfoCard>
      </div>

      {/* Faktor kualiti rendah */}
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 md:p-6">
        <h4 className="font-black text-rose-800 flex items-center gap-2 mb-3"><AlertTriangle size={19} /> Faktor yang Boleh Menyebabkan Splice Kurang Berkualiti</h4>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { title: 'Tidak Bercantum Melalui', cause: 'Arus peleburan terlalu rendah; masa prefusi terlalu pendek.' },
            { title: 'Kepala Mancis (Matchheads) Tercemar', cause: 'Elektrod tercemar, arus peleburan/prefusi terlalu tinggi atau lama, suapan automatik terlalu kecil, jurang terlalu besar.' },
            { title: 'Penyempitan (Constriction)', cause: 'Arus terlalu tinggi, kadar suapan terlalu perlahan, masa/arus prefusi tidak sesuai, jurang terlalu lebar, elektrod tercemar.' },
            { title: 'Pembesaran (Enlargement)', cause: 'Autofeed terlalu cepat, muka gentian tercemar, arus atau masa kemasukan tidak betul.' },
            { title: 'Buih atau Inklusi', cause: 'Permukaan hujung fiber kotor, potongan fiber tidak cantik, arus fusion terlalu tinggi, arus/masa pre-fusion terlalu rendah.' },
          ].map((f) => (
            <div key={f.title} className="rounded-xl bg-white border border-rose-200 p-3">
              <p className="text-sm font-black text-rose-800">{f.title}</p>
              <p className="text-xs text-rose-700 mt-1">{f.cause}</p>
            </div>
          ))}
        </div>
      </div>

      <TahukahAnda>
        Mesin fusion splicing moden kebanyakannya adalah alat automatik yang memerlukan pratetapan (preset) parameter splicing atau memilih tetapan yang disyorkan oleh pengilang - proses splicing akan dibuat kawalan secara automatik!
      </TahukahAnda>

      <Ringkasan>
        Fusion Splicing menghasilkan sambungan gentian dengan <b>kehilangan isyarat paling rendah</b> berbanding kaedah connector, menjadikannya pilihan utama untuk sambungan kekal dan jarak jauh. Proses utamanya: <b>penyediaan gentian &rarr; penjajaran teras &rarr; pencantuman arka elektrik &rarr; anggaran kehilangan optik &rarr; pemasangan splice protector</b>.
      </Ringkasan>
    </div>
  );
}

function TestingNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Mengapa Sambungan Fiber Perlu Diuji?" icon={Ruler}>
        <p>Setelah kabel dipasang dan ditamatkan, sudah tiba masanya untuk membuat pengujian. Setiap kabel fiber optik yang ditanam dan sambungan kabel tersebut perlu diuji bagi menentukan jumlah <b>kehilangan isyarat</b> pada kedua-dua hujung kabel. Jika kabel mengalami jumlah kehilangan isyarat yang banyak, sambungan tersebut perlu dibaiki.</p>
        <p className="mt-3">Jika kabel yang ditanam mempunyai sambungan <i>splices</i>, sambungan tersebut perlu diuji dengan <b>OTDR</b> - inilah satu-satunya cara untuk memastikan bahawa setiap keadaan splice dalam keadaan baik.</p>
      </InfoCard>

      {/* Konsep visual */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-4">Konsep Pengujian Kehilangan Isyarat</h4>
        <FlowHorizontal steps={['🔦 Input Light', 'Fiber', 'Connection / Splice', 'Output Light 📊']} />
        <div className="grid sm:grid-cols-2 gap-3 mt-5">
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-sm font-bold text-emerald-800 flex items-center gap-2"><CheckCircle size={16} /> Loss Rendah ✅ - sambungan berkualiti tinggi</div>
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-sm font-bold text-rose-800 flex items-center gap-2"><AlertTriangle size={16} /> Loss Tinggi ⚠️ - perlu dibaiki / disambung semula</div>
        </div>
      </div>

      <InfoCard title="Kepentingan Sambungan Berkualiti Tinggi (High-Quality) dan Low-Loss" icon={Award}>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { t: 'Kelajuan & Kestabilan', d: 'Sambungan yang baik memastikan isyarat cahaya bergerak tanpa gangguan, membolehkan penghantaran data yang cepat dan stabil.' },
            { t: 'Mengurangkan Signal Loss', d: 'Kehilangan isyarat rendah bermakna lebih banyak maklumat dapat dihantar dengan tepat walaupun jarak jauh, tanpa perlu penguat isyarat tambahan.' },
            { t: 'Kualiti Perkhidmatan Tinggi', d: 'Dalam aplikasi seperti internet, TV kabel, atau komunikasi suara, sambungan berkualiti tinggi membantu mengekalkan kualiti perkhidmatan.' },
            { t: 'Mengurangkan Kos Penyelenggaraan', d: 'Sambungan yang kukuh dan tepat mengurangkan risiko kerosakan, menjimatkan masa dan kos penyelenggaraan.' },
            { t: 'Meningkatkan Hayat Sistem', d: 'Sistem dengan sambungan berkualiti tinggi lebih tahan lama dan kurang terdedah kepada masalah teknikal.' },
            { t: 'Penting untuk Aplikasi Kritikal', d: 'Dalam bidang perubatan, pertahanan atau pusat data, sambungan yang stabil dan rendah kehilangan amat penting untuk keselamatan dan ketepatan maklumat.' },
          ].map((item) => (
            <div key={item.t} className="rounded-xl bg-slate-50 border border-slate-200 p-3">
              <p className="text-sm font-black text-slate-900">{item.t}</p>
              <p className="text-xs text-slate-600 mt-1">{item.d}</p>
            </div>
          ))}
        </div>
      </InfoCard>

      {/* Kaedah pengujian */}
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="A. Visual Tracing" icon={Flashlight}>
          <p>Menggunakan Fiber optik tracer atau Pocket Visual Fault Locator - kelihatan seperti lampu picit dengan sumber LED yang disambung ke fiber optik.</p>
          <ul className="mt-3 space-y-1.5 list-disc pl-5">
            <li>Pasang kabel yang hendak diuji pada visual tracer.</li>
            <li>Lihat pada hujung sebelah lagi untuk melihat cahaya dihantar melalui teras fiber.</li>
            <li>Jika tiada cahaya, semak bahagian tengah - mungkin ada bahagian bermasalah.</li>
          </ul>
        </InfoCard>
        <InfoCard title="B. Visual Fault Locator (VFL)" icon={Eye}>
          <p>Versi berkuasa lebih tinggi dari tracer yang menggunakan laser, boleh turut mengukur kesusutan.</p>
          <ul className="mt-3 space-y-1.5 list-disc pl-5">
            <li>Sinar laser merah cukup kuat menunjukkan kerosakan dalam fiber atau kesusutan kualiti penyambung.</li>
            <li>Boleh dilihat melalui kabel jaket kuning/oren, kecuali jaket hitam/kelabu.</li>
          </ul>
          <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-3 text-xs font-bold text-red-900">
            ⚠️ Sumber fiber optik biasanya rendah kekuatan untuk merosakkan mata, tetapi sentiasa semak kekuatannya dengan meter sebelum melihat ke dalamnya. Peralatan telco DWDM dan CATV mempunyai kekuatan isyarat sangat tinggi dan berbahaya - jangan sesekali melihat secara terus.
          </div>
        </InfoCard>
      </div>

      <InfoCard title="Peralatan Pengujian" icon={Gauge}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { icon: Flashlight, name: 'Power Source', d: 'LED atau laser diode sebagai isyarat rujukan untuk menguji susutan optikal.' },
            { icon: Gauge, name: 'Power Meter', d: 'Alat uji kuasa optikal untuk menguji susutan pada hujung kabel fiber.' },
            { icon: Cable, name: 'Kabel Rujukan / Pemula', d: 'Dikenali sebagai kabel \u2018jumper\u2019, digunakan untuk menguji kabel lain.' },
            { icon: Plug, name: 'Mating Adaptors', d: 'Dikenali sebagai couplers/splice bushings - membenarkan 2 sambungan dipasang dengan loss rendah.' },
            { icon: Droplet, name: 'Pencuci', d: 'Lint free cleaning wipes (seperti pad alkohol) untuk membersihkan sebelum menguji.' },
            { icon: Search, name: 'Fiber Tracer / VFL', d: 'Mengesan kesinambungan dan lokasi kerosakan kabel secara visual.' },
          ].map((item) => (
            <div key={item.name} className="rounded-xl bg-slate-50 border border-slate-200 p-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-700 mb-2"><item.icon size={17} /></div>
              <p className="text-sm font-black text-slate-900">{item.name}</p>
              <p className="text-xs text-slate-600 mt-1">{item.d}</p>
            </div>
          ))}
        </div>
      </InfoCard>

      {/* Prosedur */}
      <InfoCard title="Prosedur Menetapkan Bacaan Rujukan &amp; Menguji" icon={ClipboardList}>
        <ol className="space-y-2 list-decimal pl-5">
          <li>Buka penutup habuk dari meter dan pasangkan kabel rujukan pada punca keluaran - pastikan kemas dan selamat.</li>
          <li>Hidupkan bekalan kuasa dan biarkan seketika.</li>
          <li>Bersihkan bahagian hujung sambungan kepala penyambung dengan lint-free cleaning wipes.</li>
          <li>Sambungkan kabel rujukan kepada meter kuasa, pastikan semua tersambung dengan baik.</li>
          <li>Dapatkan ukuran kuasa pada paparan - ini menjadi rujukan pada 0 dB.</li>
          <li>Putuskan sambungan kabel rujukan dari meter.</li>
          <li>Dengan menggunakan adapter, pasangkan kabel yang hendak diuji ke hujung kabel <i>launch</i>, dan hujung satu lagi ke meter penguji.</li>
          <li>Baca nilai pada paparan, kemudian terbalikkan kabel dan uji sambungan pada hujung kabel lain.</li>
        </ol>
      </InfoCard>

      <div className="rounded-2xl bg-slate-950 text-white p-5 md:p-6">
        <h4 className="font-black flex items-center gap-2 mb-3"><Calculator size={19} className="text-cyan-300" /> Pengiraan Susutan dB (Contoh Sebenar)</h4>
        <p className="text-sm text-slate-300 mb-3">Formula: <b className="text-white">Kuasa yang diukur &minus; Kuasa rujukan = Susutan dB</b></p>
        <div className="bg-white/10 rounded-xl p-4 font-mono text-sm">
          -20.3 dBm (measured) &minus; -20.0 dBm (reference) = <span className="text-emerald-300 font-black">-0.3 dB loss</span>
        </div>
      </div>

      <NotesTable
        headers={['Perkara', 'Maksud', 'Kesan', 'Tindakan']}
        rows={[
          ['Insertion Loss (connector)', 'Susutan pada setiap penyambung, panduan 0.5 dB (0.7 dB maksimum)', 'Isyarat lemah jika melebihi had', 'Bersihkan / pasang semula connector'],
          ['Splice Loss', 'Susutan pada setiap splice, panduan 0.2 dB', 'Kualiti sambungan terjejas', 'Ulang proses splicing jika perlu'],
          ['Attenuation Kabel (Multimode)', '~3 dB/km @850nm, 1 dB/km @1300nm', 'Had jarak penghantaran', 'Rujuk jadual EIA/TIA loss estimation'],
          ['Attenuation Kabel (Singlemode)', '~0.5 dB/km @1300nm, 0.4 dB/km @1550nm', 'Had jarak penghantaran', 'Rujuk jadual EIA/TIA loss estimation'],
        ]}
      />
      <p className="text-xs text-slate-500 -mt-3">Nilai berpandukan panduan dalam Kertas Penerangan IKR3033/KP3 (bukan anggaran).</p>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-3">Bagaimana Mengenal Pasti Sambungan yang Bermasalah?</h4>
        <ol className="space-y-2 list-decimal pl-5 text-sm text-slate-700">
          <li>Bandingkan bacaan susutan (dB) dengan panduan maksimum (0.5 dB connector / 0.2 dB splice).</li>
          <li>Jika susutan melebihi panduan &rarr; tandakan sebagai <b>Loss Tinggi ⚠️</b>.</li>
          <li>Gunakan visual tracer / VFL untuk kenal pasti lokasi fizikal masalah.</li>
          <li>Bersihkan connector dan uji semula sebelum membuat keputusan untuk sambung semula.</li>
        </ol>
      </div>

      <Ringkasan>
        Pengujian fiber optik memastikan setiap sambungan mencapai <b>low-loss</b> dan <b>berkualiti tinggi</b> sebelum rangkaian beroperasi. Peralatan utama: Power Source, Power Meter, kabel rujukan, dan pencuci. Susutan dikira sebagai <b>Kuasa Diukur &minus; Kuasa Rujukan</b>, dan dibandingkan dengan panduan maksimum untuk keputusan Pass ✅ / Fail ❌.
      </Ringkasan>
    </div>
  );
}

function OtdrNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Apakah Tujuan OTDR?" icon={Activity}>
        <p><b>OTDR (Optical Time Domain Reflectometer)</b> digunakan untuk mendapatkan gambaran visual tentang ciri-ciri pengecilan isyarat fiber optik di sepanjang laluan kabel. Ujian OTDR adalah <b>satu-satunya kaedah</b> yang boleh menentukan lokasi fiber optik yang putus, dan menyediakan kaedah terbaik untuk menentukan loss pada penyambung, splices dan anomali pada sistem yang dipasang.</p>
        <p className="mt-3">Ia membolehkan juruteknik menentukan sama ada splice yang dibuat memenuhi spesifikasi.</p>
        <NotaPenting>
          OTDR <b>tidak boleh</b> menentukan ciri-ciri jalur lebar optik seperti serakan kromatik dan PMD. Ia hanya digunakan untuk mengukur dan memaparkan ciri-ciri <b>pengecilan isyarat optik</b> sahaja.
        </NotaPenting>
      </InfoCard>

      <InfoCard title="Bagaimana OTDR Berfungsi" icon={Repeat}>
        <p>OTDR menghantar denyut cahaya ke hujung kabel optik dan mengukur masa yang diperlukan untuk denyut cahaya tersebut kembali kepada OTDR. OTDR juga mengukur kuasa pantulan sepanjang laluan kabel optik.</p>
        <p className="mt-3">Refleksi cahaya sepanjang kabel optik disebabkan oleh <b>serakan Rayleigh</b>, penyambung, splices, bengkokan, peranti dan anomali pada kabel tersebut. Dengan mengetahui indeks biasan fiber optik (n) dan masa yang diperlukan oleh pantulan cahaya untuk kembali ke OTDR, OTDR dapat mengira jarak sesuatu keadaan.</p>
        <p className="mt-3">Paparan yang dihasilkan dipanggil <b>fiber trace</b> - graf yang memberi gambaran terbaik mengenai ciri-ciri pengecilan isyarat sepanjang laluan kabel.</p>
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-4">Rajah Proses OTDR</h4>
        <FlowHorizontal steps={['📈 OTDR', 'Fiber Link', 'Events', 'Trace', '🔍 Analysis', 'Troubleshooting']} />
      </div>

      <InfoCard title="Peralatan Ujian OTDR" icon={Wrench}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
          {['OTDR', 'Connector cleaning solution, swabs, compressed air', 'Bare fiber adapter', 'Index-matching gel (untuk bare fiber adapter)', 'Cleaver', 'Cable and fiber strippers', 'Dead-zone fiber (jika diperlukan OTDR)'].map((item) => (
            <div key={item} className="rounded-lg bg-slate-50 border border-slate-200 p-2.5">{item}</div>
          ))}
        </div>
      </InfoCard>

      {/* Kaedah ujian OTDR */}
      <InfoCard title="Kaedah Ujian OTDR (Langkah demi Langkah)" icon={ClipboardList}>
        <ol className="space-y-2.5 list-decimal pl-5 text-sm">
          <li>Jika kabel belum bersambung, tanggalkan jaket kabel sebanyak 2 m (6 kaki). Bersih dan pisahkan kabel yang akan diuji.</li>
          <li>Sambungkan OTDR kepada kabel yang hendak diuji melalui patch cord fiber atau pigtail. Tambah kabel zon mati jika diperlukan.</li>
          <li>Pastikan sumber cahaya tidak disambung pada hujung sambungan akhir fiber optik yang diuji.</li>
          <li>Hidupkan OTDR dan biarkan ia panas sehingga suhu operasi yang stabil.</li>
          <li>Masukkan parameter OTDR yang betul: panjang gelombang, indeks pembiasan fiber, dan panjang nadi.</li>
          <li>Mula ujian OTDR dan biarkan ia mencatat bacaan purata secukupnya.</li>
          <li>Laraskan resolusi bagi memaparkan ujian kabel yang lengkap - pastikan lebar denyut sependek mungkin untuk keputusan terbaik.</li>
          <li>Ukur kehilangan isyarat untuk semua anomali, splices, penyambung, dan keseluruhan kabel.</li>
          <li>Ukur jumlah kehilangan dan pengecilan isyarat kabel hujung-ke-hujung dalam unit dB/km.</li>
          <li>Simpan keputusan dan jejak fiber optik, kemudian cetak output.</li>
        </ol>
        <TahukahAnda>
          Ujian OTDR digalakkan dilakukan dari <b>kedua-dua hujung kabel</b> dan bacaan purata diambil. Ini memberi pengukuran lebih tepat bagi event loss dan mendedahkan anomali yang tersembunyi oleh zon mati (dead zone) OTDR pada satu hujung.
        </TahukahAnda>
      </InfoCard>

      <div className="rounded-2xl bg-slate-950 text-white p-5 md:p-6">
        <h4 className="font-black flex items-center gap-2 mb-3"><Calculator size={19} className="text-cyan-300" /> Contoh Pengiraan Julat OTDR (daripada sumber)</h4>
        <ul className="text-sm text-slate-300 space-y-1.5">
          <li>1. Julat dinamik OTDR: <b className="text-white">25 dB</b> untuk panjang gelombang 1550 nm.</li>
          <li>2. Kabel fiber optik yang diuji mempunyai pengecilan isyarat sebanyak <b className="text-white">0.25 dB/km</b> pada 1550 nm, termasuk semua splices.</li>
        </ul>
      </div>

      {/* Trace visual */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-8 shadow-sm">
        <h4 className="font-black text-slate-900 mb-1">Contoh Ilustrasi Trace OTDR</h4>
        <p className="text-xs text-slate-500 mb-5">Paksi-Y: kehilangan isyarat (dB) &nbsp;•&nbsp; Paksi-X: jarak (km)</p>
        <div className="relative h-40 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden">
          <svg viewBox="0 0 400 120" className="w-full h-full" preserveAspectRatio="none">
            <polyline points="0,20 60,24 60,20 140,32 140,26 220,40 220,60 260,66 400,100" fill="none" stroke="#0891b2" strokeWidth="2.5" className="fiber-dash" pathLength="420" />
          </svg>
          <span className="absolute left-1 top-2 text-[9px] font-black text-slate-500">Start</span>
          <span className="absolute left-[14%] top-2 text-[9px] font-black text-cyan-700">Connector</span>
          <span className="absolute left-[34%] top-6 text-[9px] font-black text-cyan-700">Splice</span>
          <span className="absolute left-[54%] top-12 text-[9px] font-black text-amber-600">⚠️ Loss Event</span>
          <span className="absolute right-1 bottom-2 text-[9px] font-black text-slate-500">End of Fiber</span>
        </div>
      </div>

      <InfoCard title="Cara Membaca Trace" icon={Search}>
        <ol className="space-y-2.5 list-decimal pl-5 text-sm">
          <li>Garis cerun (sloped line) pada OTDR mewakili kabel fiber optik - kecerunan garis menunjukkan pengecilan serat.</li>
          <li>Pada permulaan bacaan, garisan mempunyai benjolan melengkung - ini adalah <b>zon mati (dead zone)</b> OTDR permulaan. Semua anomali di zon ini tidak dapat dilihat.</li>
          <li>Kawasan sambungan (splice) dipaparkan sebagai <b>penurunan kecil tetapi tajam</b> pada graf - jumlah kejatuhan (dB) sebelum dan selepas adalah splice loss.</li>
          <li>Sambungan kabel yang <b>putus</b> dilihat sebagai penurunan isyarat mendadak pada akhir surihan graf, <b>tanpa</b> pantulan Fresnel.</li>
        </ol>
      </InfoCard>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Splice Gainer (Kekeliruan Biasa)" icon={AlertTriangle}>
          <p>Kadang kala, kawasan fiber yang disambung (splice) boleh dilihat sebagai <b>kenaikan</b> pada graf, bukannya kejatuhan. Ini dipanggil <b>splice gainer</b> dan boleh disalah tafsir sebagai amplifikasi cahaya.</p>
          <p className="mt-2">Ia berlaku apabila dua kabel fiber optik dari stok/pengeluar berbeza (dengan tahap pembalikan Rayleigh berbeza) disambung. Ujian dari hujung kabel yang lain akan menunjukkan kawasan splice sebagai kehilangan isyarat yang ditokok tambah.</p>
        </InfoCard>
        <InfoCard title="Penyambung (Connector) pada Trace" icon={Plug}>
          <p>Paparan graf pada connector adalah sama seperti splice loss, kecuali terdapat <b>kenaikan mendadak</b> pada isyarat disebabkan oleh <b>pantulan Fresnel</b> pada sempadan jurang udara penyambung.</p>
        </InfoCard>
      </div>

      {/* Glossary */}
      <InfoCard title="Istilah Penting dalam Trace OTDR" icon={BookOpen}>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b className="text-slate-900">SCATTER</b><p className="mt-1 text-slate-600">Serakan yang terjadi pada atom photon.</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b className="text-slate-900">BACKSCATTER</b><p className="mt-1 text-slate-600">Cahaya yang berpatah balik ke penerima OTDR selepas menerima denyut yang tinggi.</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b className="text-slate-900">SATURATED PEAK</b><p className="mt-1 text-slate-600">Puncak yang terlalu tinggi disebabkan oleh event dan menjadi tepu (overloaded) dilihat pada penerima OTDR.</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b className="text-slate-900">EVENT</b><p className="mt-1 text-slate-600">&lsquo;Loss&rsquo; yang ditunjukkan melalui penerima OTDR seperti connector, splice dan penamat.</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 sm:col-span-2"><b className="text-slate-900">GHOST</b><p className="mt-1 text-slate-600">Terjadi bila menguji kabel pendek dengan pantulan yang kuat dari connector.</p></div>
        </div>
      </InfoCard>

      <Ringkasan>
        OTDR ialah satu-satunya kaedah untuk mengesan lokasi kabel putus dan menilai kualiti splice/connector sepanjang laluan kabel, dengan membaca <b>trace</b> berdasarkan jarak (X) dan kehilangan isyarat (Y). Ujian dari kedua-dua hujung kabel disyorkan untuk mengelakkan anomali tersembunyi oleh zon mati.
      </Ringkasan>
    </div>
  );
}

function DocumentationNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Kepentingan Dokumentasi Pemasangan" icon={FileText}>
        <p>Dokumentasi pemasangan kabel fiber optik merupakan sebahagian daripada proses reka bentuk, pemasangan dan penyenggaraan bagi rangkaian gentian optik. Dokumentasi pemasangan yang betul akan:</p>
        <ul className="mt-3 space-y-1.5 list-disc pl-5">
          <li>Memudahkan kerja-kerja pemasangan.</li>
          <li>Membolehkan kerja-kerja perancangan menaik taraf yang lebih baik.</li>
          <li>Memudahkan ujian dilakukan.</li>
          <li>Memudahkan penambahan dan perubahan dibuat.</li>
        </ul>
        <NotaPenting>
          Dokumentasi tapak pemasangan kabel fiber optik harus mengikuti piawaian yang ditetapkan oleh <b>ANSI/TIA/EIA-606</b>, iaitu Piawaian Pentadbiran Infrastruktur Telekomunikasi Bangunan Perdagangan.
        </NotaPenting>
      </InfoCard>

      <InfoCard title="Apa yang Perlu Didokumenkan?" icon={ClipboardList}>
        <p>Kabel fiber optik digunakan untuk kabel backbone, mungkin mengandungi banyak kabel fiber optik yang menghubungkan beberapa sambungan berbeza ke beberapa lokasi berbeza dengan penyambungan pada <b>patch panel</b> atau <b>kotak splice</b>. Tapak pemasangan perlu didokumenkan dengan tepat merangkumi:</p>
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-sm flex items-start gap-2"><Cable size={16} className="text-cyan-600 shrink-0 mt-0.5" /> Sambungan pertengahan sepanjang laluan kabel</div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-sm flex items-start gap-2"><Plug size={16} className="text-cyan-600 shrink-0 mt-0.5" /> Setiap jenis penyambung yang digunakan (SC/LC/ST/FC)</div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-sm flex items-start gap-2"><Gauge size={16} className="text-cyan-600 shrink-0 mt-0.5" /> Data jumlah insertion loss</div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-sm flex items-start gap-2"><Activity size={16} className="text-cyan-600 shrink-0 mt-0.5" /> Data daripada mesin OTDR (trace &amp; keputusan)</div>
        </div>
      </InfoCard>

      {/* Troubleshooting flow */}
      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4">Proses Troubleshooting Sistematik</h3>
        <FlowVertical steps={['Kenal pasti masalah 🔍', 'Pemeriksaan fizikal', 'Semak connector / sambungan 🔗', 'Bersihkan & periksa fiber 🧹', 'Uji sambungan 📏', 'Analisis keputusan 📊', 'Baiki / buat semula sambungan 🛠️', 'Uji semula', 'Rekod keputusan 📝']} />
      </div>

      <InfoCard title="Asas Baikpulih Kabel Fiber Optik" icon={ShieldCheck}>
        <p>Jika anda mempunyai internet menerusi kabel fiber optik atau sambungan televisyen dan terdapat masalah sambungan putus, setelah menguji semua konfigurasi peralatan (modem, router, televisyen, PC) berada dalam keadaan baik, masalah yang mungkin wujud ialah masalah pada kabel fiber optik itu sendiri. Berikut adalah penyelesaian masalah asas:</p>
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          <div className="rounded-xl bg-cyan-50 border border-cyan-200 p-3 text-sm"><b className="text-cyan-800">Periksa kabel yang masuk</b><p className="mt-1 text-cyan-900">Periksa talian luar dan pusat akses di mana kabel fiber optik masuk. Lihat jika ada yang menghalang wayar atau menekankan kabel.</p></div>
          <div className="rounded-xl bg-cyan-50 border border-cyan-200 p-3 text-sm"><b className="text-cyan-800">Periksa sambungan dalam</b><p className="mt-1 text-cyan-900">Periksa sambungan kabel ke router atau modem. Pastikan ia terpasang dengan betul pada peralatan.</p></div>
          <div className="rounded-xl bg-cyan-50 border border-cyan-200 p-3 text-sm"><b className="text-cyan-800">Periksa kabel</b><p className="mt-1 text-cyan-900">Periksa kabel fiber optik dan pastikan tiada bengkokan pada kabel. Periksa juga kerosakan kepada luar kabel.</p></div>
          <div className="rounded-xl bg-cyan-50 border border-cyan-200 p-3 text-sm"><b className="text-cyan-800">Posisi kabel</b><p className="mt-1 text-cyan-900">Pastikan kabel gentian optik ditempatkan di kawasan yang tidak merosakkannya. Pastikan tiada ketegangan dan tekanan pada wayar.</p></div>
        </div>
      </InfoCard>

      <NotesTable
        headers={['Simptom', 'Kemungkinan Punca', 'Pemeriksaan', 'Tindakan']}
        rows={[
          ['Tiada isyarat / sambungan terputus', 'Kabel luar terhalang atau tertekan pada talian/pusat akses', 'Periksa kabel yang masuk', 'Alihkan penghalang, pastikan kabel tidak tertekan'],
          ['Peranti tidak mengesan sambungan', 'Sambungan kabel ke router/modem tidak terpasang betul', 'Periksa sambungan dalam', 'Pasang semula sambungan pada peralatan'],
          ['Isyarat lemah / loss tinggi', 'Kabel bengkok atau rosak di bahagian luar', 'Periksa kabel (visual/power meter)', 'Uji dengan VFL/power meter, baiki atau ganti bahagian rosak'],
          ['Kerosakan berulang di lokasi sama', 'Kabel diletakkan di kawasan bertekanan / tegang', 'Semak posisi kabel', 'Tempatkan semula kabel di kawasan selamat, elak ketegangan'],
        ]}
      />

      <Checklist
        title="Checklist Dokumentasi & Troubleshooting"
        items={['Pemeriksaan fizikal', 'Connector diperiksa', 'Fiber dibersihkan', 'Sambungan diuji', 'Loss direkodkan', 'Keputusan disahkan', 'Dokumentasi dikemaskini']}
      />

      <TahukahAnda>
        Dokumentasi yang lengkap - termasuk data OTDR dan insertion loss - bukan sahaja membantu troubleshooting hari ini, malah menjadi rujukan penting untuk kerja penyelenggaraan dan menaik taraf rangkaian pada masa hadapan!
      </TahukahAnda>

      <Ringkasan>
        Dokumentasi pemasangan (mengikut piawaian ANSI/TIA/EIA-606) dan proses troubleshooting yang sistematik - daripada pemeriksaan fizikal hinggalah rekod keputusan - memastikan rangkaian fiber optik kekal boleh dipercayai, mudah diselenggara, dan sedia untuk sebarang penambahan atau naik taraf pada masa hadapan.
      </Ringkasan>
    </div>
  );
}

function Fiber3DAR() {
  const model = uniqueSketchfabModels[0];
  const additionalModels = uniqueSketchfabModels.slice(1);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 md:p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-black text-cyan-700">
              <Box size={15} /> MODEL INTERAKTIF 360°
            </div>
            <h2 className="mt-3 text-2xl font-black text-slate-900">Fiber Optic Cable</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
              Seret model untuk memutarkannya, cubit atau gunakan roda tetikus untuk zum, dan pilih paparan skrin penuh bagi pemerhatian yang lebih jelas.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={model.page}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-black text-white hover:bg-slate-800"
            >
              <ExternalLink size={18} /> Buka Paparan Penuh
            </a>
            <a
              href="https://youtu.be/eh8E66Aque8?si=xNMYsFeHt5x6H8Yx"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-cyan-200 bg-cyan-50 px-5 py-3 text-sm font-black text-cyan-700 hover:bg-cyan-100"
            >
              <PlayCircle size={18} /> Tutorial YouTube
            </a>
          </div>
        </div>

        <div className="relative aspect-video min-h-[380px] bg-slate-950">
          <iframe
            title="Model 3D dan AR kabel fiber optik"
            className="absolute inset-0 h-full w-full"
            src={model.embed}
            frameBorder="0"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            xr-spatial-tracking="true"
            execution-while-out-of-viewport="true"
            execution-while-not-rendered="true"
            web-share="true"
          />
        </div>

        <div className="p-4 text-xs leading-relaxed text-slate-500">
          Model <a href={model.page} target="_blank" rel="noreferrer" className="font-bold text-cyan-700 hover:underline">{model.title}</a> oleh{' '}
          <a href={`https://sketchfab.com/${model.author.toLowerCase().replace(/\s+/g, '')}`} target="_blank" rel="noreferrer" className="font-bold text-cyan-700 hover:underline">{model.author}</a> melalui Sketchfab.
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="p-5 md:p-6 border-b border-slate-200">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-black text-rose-700">
            <PlayCircle size={15} /> YouTube Terkini
          </div>
          <h2 className="mt-3 text-2xl font-black text-slate-900">Video Pengenalan Fiber Cabling</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Tonton video ringkas di dalam laman supaya pelajar tidak perlu membuka tab baru untuk melihat konteks visual ringkas standard fiber optik.
          </p>
        </div>
        <div className="aspect-video bg-slate-950">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/eh8E66Aque8?si=xNMYsFeHt5x6H8Yx"
            title="Fiber Optic Cabling Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        <InfoCard title="Cara menggunakan model 3D" icon={Box}>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Tunggu model selesai dimuatkan, kemudian tekan ikon mula.</li>
            <li>Seret model ke kiri atau kanan untuk melihatnya dari semua sudut.</li>
            <li>Zum masuk untuk memerhatikan bahagian luar dan susunan dalaman kabel.</li>
            <li>Gunakan ikon skrin penuh bagi paparan yang lebih besar.</li>
          </ol>
        </InfoCard>

        <InfoCard title="Cara melihat dalam AR" icon={Smartphone}>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Buka bahagian ini menggunakan telefon atau tablet yang menyokong AR.</li>
            <li>Tekan ikon <strong>View in AR</strong> pada paparan Sketchfab.</li>
            <li>Benarkan akses kamera apabila diminta.</li>
            <li>Halakan kamera ke permukaan rata, kemudian gerakkan dan laraskan saiz model.</li>
          </ol>
        </InfoCard>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
        <strong>Nota keserasian:</strong> Fungsi AR bergantung pada sokongan peranti, pelayar dan ketersediaan AR bagi model Sketchfab. Jika ikon AR tidak dipaparkan, model masih boleh diteroka dalam mod 3D interaktif.
      </div>
    </div>
  );
}

function LatestTechnology() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {latestTech.map((item) => (
          <article key={item.title} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all">
            <div className="inline-flex px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-black mb-4">{item.badge}</div>
            <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mt-3">{item.text}</p>
          </article>
        ))}
      </div>
      <div className="mt-6 bg-violet-50 border border-violet-200 rounded-2xl p-5 text-sm text-violet-900">
        <strong>Nota:</strong> Teknologi baharu tidak menggantikan pemeriksaan asas. Kebersihan connector, radius lenturan, polariti, link budget dan dokumentasi masih menentukan kualiti sebenar pemasangan.
      </div>
    </div>
  );
}

function SelectionGuide() {
  const rows = [
    ['Backbone kampus / jarak jauh', 'Single-mode OS2', 'LC atau SC', 'Pilih transceiver SM dan jarak melebihi laluan sebenar'],
    ['LAN bangunan / pusat data jarak dekat', 'Multimode OM3/OM4/OM5', 'LC atau MPO/MTP', 'Padankan kategori fiber dengan kelajuan dan reach transceiver'],
    ['FTTH / laluan sempit', 'Single-mode G.657', 'SC/APC lazim pada rangkaian akses', 'Kurangkan pantulan; patuhi radius lenturan pengeluar'],
    ['Luaran / bawah tanah', 'Outdoor armored atau loose-tube', 'Ikut enclosure/ODF', 'Nilai air, UV, tarikan, rodent dan kaedah penanaman'],
  ];
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-emerald-700 text-white text-sm">
            <tr><th className="p-4">Situasi</th><th className="p-4">Jenis kabel</th><th className="p-4">Connector</th><th className="p-4">Semakan penting</th></tr>
          </thead>
          <tbody className="text-sm text-slate-700">
            {rows.map((row, index) => (
              <tr key={row[0]} className={index % 2 ? 'bg-slate-50' : 'bg-white'}>{row.map((cell) => <td key={cell} className="p-4 align-top border-t border-slate-100">{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <InfoCard title="1. Tentukan keperluan" icon={Network}>
          Catat kelajuan, jarak, lokasi, bilangan core, laluan, risiko persekitaran dan ruang untuk pertumbuhan masa hadapan.
        </InfoCard>
        <InfoCard title="2. Padankan sebagai sistem" icon={Cable}>
          Kabel, pigtail, adapter, patch cord dan transceiver mesti serasi dari segi mode, connector, polish, panjang gelombang dan polariti.
        </InfoCard>
        <InfoCard title="3. Kira link budget" icon={Gauge}>
          Jumlahkan anggaran kehilangan kabel, connector, splice dan margin keselamatan. Pastikan nilai ini berada dalam kuasa optik transceiver.
        </InfoCard>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
        <AlertTriangle className="text-amber-600 shrink-0" />
        <p className="text-sm text-amber-900"><strong>Elakkan padanan salah:</strong> Jangan campurkan single-mode dengan multimode, UPC dengan APC, atau connector yang kotor. Padanan fizikal sahaja tidak menjamin prestasi optik.</p>
      </div>
    </div>
  );
}

function InspectionProcedure() {
  const steps = [
    ['1', 'Keselamatan awal', 'Matikan atau sahkan sumber optik. Jangan melihat terus ke hujung fiber. Pakai cermin mata keselamatan dan sediakan bekas serpihan fiber.'],
    ['2', 'Pemeriksaan laluan', 'Semak jacket, label, radius lenturan, tekanan, ikatan kabel, enclosure, splice tray dan tanda kerosakan fizikal.'],
    ['3', 'Inspect - Clean - Inspect', 'Periksa ferrule dengan fiber microscope yang sesuai, bersihkan menggunakan bahan bebas habuk, kemudian periksa semula.'],
    ['4', 'Ujian kesinambungan', 'Gunakan VFL bagi semakan asas kesinambungan, susunan core dan kebocoran cahaya pada laluan pendek.'],
    ['5', 'Ujian insertion loss', 'Gunakan optical light source dan power meter untuk mengukur jumlah kehilangan hujung ke hujung pada panjang gelombang yang ditetapkan.'],
    ['6', 'Ujian OTDR', 'Tetapkan panjang gelombang, indeks biasan, range dan pulse width. Gunakan launch cable dan, jika perlu, receive cable untuk melihat connector hujung.'],
    ['7', 'Analisis dan dokumentasi', 'Kenal pasti connector, splice, bending, reflection, end event atau putus. Simpan trace, bacaan, lokasi, tarikh dan keputusan lulus/gagal.'],
  ];
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6 flex gap-3">
        <Glasses className="text-red-600 shrink-0" />
        <div className="text-sm text-red-900"><strong>Amaran laser:</strong> Cahaya pada fiber boleh tidak kelihatan tetapi masih berbahaya. Anggap setiap fiber aktif sehingga disahkan selamat menggunakan alat yang sesuai.</div>
      </div>
      <div className="space-y-4">
        {steps.map(([number, title, text]) => (
          <div key={number} className="bg-white rounded-2xl border border-slate-200 p-5 flex gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-black flex items-center justify-center shrink-0">{number}</div>
            <div><h3 className="font-black text-slate-900">{title}</h3><p className="text-sm text-slate-600 leading-relaxed mt-1">{text}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function shuffleQuestions(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function Quiz() {
  const [kpIndex, setKpIndex] = useState(0);
  const [highestKp, setHighestKp] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState(() => shuffleQuestions(kpQuizSets[0].questions));

  const currentKp = kpQuizSets[kpIndex];
  const kpQuestions = activeQuestions;

  const score = useMemo(() => {
    return kpQuestions.reduce((total, question, index) => total + (answers[index] === question.options.indexOf(question.correct) ? 1 : 0), 0);
  }, [answers, kpQuestions]);

  const passScore = 18;
  const availableNext = submitted && score >= passScore && kpIndex < kpQuizSets.length - 1;

  const resetCurrentKp = () => {
    setAnswers({});
    setSubmitted(false);
    setActiveQuestions(shuffleQuestions(kpQuizSets[kpIndex].questions));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const retryLevel = () => {
    setAnswers({});
    setSubmitted(false);
    setActiveQuestions(shuffleQuestions(kpQuizSets[kpIndex].questions));
  };

  const nextKp = () => {
    if (score >= passScore && kpIndex < kpQuizSets.length - 1) {
      const nextIndex = kpIndex + 1;
      setHighestKp(previous => Math.max(previous, nextIndex));
      setKpIndex(nextIndex);
      setAnswers({});
      setSubmitted(false);
      setActiveQuestions(shuffleQuestions(kpQuizSets[nextIndex].questions));
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== kpQuestions.length) {
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-black uppercase tracking-[.2em] text-cyan-700">Tahap Kuiz</div>
            <h2 className="text-3xl font-black text-slate-900 mt-2">{currentKp.code} - {currentKp.title}</h2>
            <p className="text-sm text-slate-600 mt-2">Setiap KP mengandungi 30 soalan. Lulus minimum ialah 18/30.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {kpQuizSets.map((item, index) => (
              <button key={item.id} disabled={index > highestKp || (index === kpIndex && submitted && score < passScore)} onClick={() => {
                if (index <= highestKp) {
                  setKpIndex(index);
                  setAnswers({});
                  setSubmitted(false);
                  setActiveQuestions(shuffleQuestions(kpQuizSets[index].questions));
                }
              }} className={`rounded-full px-4 py-2 text-xs font-black border ${index === kpIndex ? 'bg-rose-600 border-rose-600 text-white' : 'bg-white border-slate-300 text-slate-700'} ${index > highestKp ? 'opacity-50 cursor-not-allowed' : ''}`}>{item.code}</button>
            ))}
          </div>
        </div>
      </div>

      {submitted && (
        <div className={`rounded-2xl p-6 mb-6 text-white ${score >= passScore ? 'bg-emerald-600' : 'bg-rose-600'}`}> 
          <div className="flex items-center gap-3"><Award size={34} /><div><p className="text-sm font-bold opacity-90">Keputusan {currentKp.code}</p><h2 className="text-3xl font-black">{score} / {kpQuestions.length}</h2></div></div>
          <p className="mt-3 font-medium">
            {score >= passScore
              ? `Lulus ${currentKp.code}. Anda layak ${kpIndex < kpQuizSets.length - 1 ? 'naik ke ' + kpQuizSets[kpIndex + 1].code : 'menamatkan semua KP'}.`
              : `Tandas belum lulus. Markah minimum ialah 18/30. Sila ulang ${currentKp.code} sebelum naik ke tahap seterusnya.`}
          </p>
        </div>
      )}

      <div className="space-y-5">
        {kpQuestions.map((question, index) => (
          <article key={`${currentKp.id}-${index}-${question.question}`} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-black text-slate-900"><span className="text-rose-600 mr-2">{index + 1}.</span>{question.question}</h3>
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
                    className={`text-left p-3 rounded-xl border text-sm font-medium transition-all ${correct ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : wrong ? 'border-rose-500 bg-rose-50 text-rose-800' : selected ? 'border-blue-500 bg-blue-50 text-blue-800' : 'border-slate-200 hover:border-blue-300'}`}
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
          <button disabled={Object.keys(answers).length !== kpQuestions.length} onClick={handleSubmit} className="flex-1 bg-rose-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-black hover:bg-rose-700 transition-colors">Hantar Jawapan {currentKp.code}</button>
        ) : (
          <>
            {score >= passScore && kpIndex < kpQuizSets.length - 1 && (
              <button onClick={nextKp} className="flex-1 bg-emerald-600 text-white px-6 py-4 rounded-xl font-black hover:bg-emerald-700">Naik ke {kpQuizSets[kpIndex + 1].code}</button>
            )}
            <button onClick={retryLevel} className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-xl font-black hover:bg-slate-800"><RotateCcw size={19} /> Cuba Semula {currentKp.code}</button>
          </>
        )}
      </div>
    </div>
  );
}

function Consultant() {
  const [form, setForm] = useState({ distance: 'short', environment: 'indoor', capacity: '10g', topology: 'lan' });
  const [result, setResult] = useState(null);

  const analyse = () => {
    const longDistance = form.distance === 'long' || form.topology === 'ftth';
    const veryHigh = form.capacity === '50g';
    const recommendation = {
      fiber: longDistance ? 'Single-mode OS2' : veryHigh ? 'Single-mode OS2 atau Multimode OM4 mengikut reach transceiver' : 'Multimode OM3/OM4 untuk laluan pendek',
      cable: form.environment === 'outdoor' ? 'Loose-tube outdoor, water-blocking dan armored jika laluan berisiko' : 'Tight-buffer indoor dengan rating jacket yang mematuhi lokasi pemasangan',
      connector: form.topology === 'ftth' ? 'SC/APC pada rangkaian akses; pastikan semua adapter dan patch cord menggunakan APC' : 'LC duplex untuk sambungan peralatan; MPO/MTP hanya jika reka bentuk berketumpatan tinggi memerlukannya',
      test: longDistance ? 'Ujian insertion loss dua arah dan OTDR dengan launch/receive cable' : 'Inspect-Clean-Inspect, VFL, kemudian light source + power meter; OTDR jika perlu mencari lokasi event',
      note: 'Sahkan datasheet transceiver, link budget, wavelength, polariti, radius lenturan dan piawaian organisasi sebelum pembelian atau pemasangan sebenar.',
    };
    setResult(recommendation);
  };

  const fields = [
    ['distance', 'Jarak laluan', [['short', 'Bawah 300 m'], ['medium', '300 m - 2 km'], ['long', 'Lebih 2 km']]],
    ['environment', 'Persekitaran', [['indoor', 'Dalam bangunan'], ['outdoor', 'Luaran / bawah tanah']]],
    ['capacity', 'Kapasiti sasaran', [['1g', '1 Gbit/s'], ['10g', '10 Gbit/s'], ['50g', '25/50 Gbit/s ke atas']]],
    ['topology', 'Jenis projek', [['lan', 'LAN / pusat data'], ['backbone', 'Backbone kampus'], ['ftth', 'FTTH / akses PON']]],
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-[.9fr_1.1fr] gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="inline-flex gap-2 items-center text-xs font-black text-cyan-700 bg-cyan-50 px-3 py-1.5 rounded-full"><WandSparkles size={15} /> ANALISIS PINTAR</div>
          <h2 className="text-2xl font-black text-slate-900 mt-4">Terangkan keperluan projek</h2>
          <p className="text-sm text-slate-500 mt-2">Pilih jawapan paling hampir. Sistem akan menyediakan cadangan awal untuk perbincangan bersama pengajar atau juruteknik bertauliah.</p>
          <div className="space-y-5 mt-6">
            {fields.map(([id, label, options]) => (
              <label key={id} className="block">
                <span className="text-sm font-black text-slate-700">{label}</span>
                <select value={form[id]} onChange={(event) => setForm((current) => ({ ...current, [id]: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                  {options.map(([value, text]) => <option value={value} key={value}>{text}</option>)}
                </select>
              </label>
            ))}
          </div>
          <button onClick={analyse} className="w-full mt-6 bg-gradient-to-r from-cyan-600 to-blue-700 text-white px-6 py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:brightness-110"><Sparkles size={19} /> Jana Cadangan</button>
        </div>

        <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden min-h-[520px]">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
          {!result ? (
            <div className="h-full flex flex-col items-center justify-center text-center relative z-10 py-16">
              <div className="w-20 h-20 rounded-3xl bg-white/10 border border-white/10 flex items-center justify-center"><Sparkles size={38} className="text-cyan-300" /></div>
              <h3 className="text-2xl font-black mt-6">FiberPintar AI</h3>
              <p className="text-slate-300 mt-3 max-w-sm">Lengkapkan pilihan di sebelah untuk melihat jenis fiber, kabel, connector dan ujian yang dicadangkan.</p>
            </div>
          ) : (
            <div className="relative z-10">
              <p className="text-xs font-black tracking-[.2em] text-cyan-300">HASIL ANALISIS</p>
              <h3 className="text-2xl font-black mt-2 mb-5">Cadangan awal sistem fiber</h3>
              <div className="space-y-3">
                {[['Jenis fiber', result.fiber], ['Reka bentuk kabel', result.cable], ['Connector', result.connector], ['Kaedah pengujian', result.test]].map(([label, value]) => (
                  <div key={label} className="bg-white/10 border border-white/10 rounded-xl p-4"><p className="text-xs text-cyan-300 font-black uppercase">{label}</p><p className="text-sm text-slate-100 mt-1 leading-relaxed">{value}</p></div>
                ))}
              </div>
              <div className="mt-4 bg-amber-400/15 border border-amber-300/30 rounded-xl p-4 text-sm text-amber-100"><strong>Peringatan:</strong> {result.note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function IKR3033({ onBackToPortal }) {
  const [view, setView] = useState('menu');
  const [readState, setReadState] = useState(() => {
    const fallback = [false, false, false, false, false, false, false, false];
    try {
      const saved = JSON.parse(localStorage.getItem('ikr3033-read-state'));
      if (Array.isArray(saved) && saved.length === sections.length) {
        return saved;
      }
    } catch (error) {
      return fallback;
    }
    return fallback;
  });

  const completedCount = readState.filter(Boolean).length;
  const progressPercent = Math.round((completedCount / sections.length) * 100);

  const resetProgress = () => {
    const fallback = [false, false, false, false, false, false, false, false];
    setReadState(fallback);
    try { localStorage.setItem('ikr3033-read-state', JSON.stringify(fallback)); } catch { /* storan tidak tersedia */ }
  };

  const sectionMeta = {
    intro: { title: 'Pengenalan kepada Fiber Optik', subtitle: 'Penerangan asas gentian optik, fungsi dan prinsip penghantaran cahaya.', icon: BookOpen },
    structure: { title: 'Struktur & Komposisi Kabel', subtitle: 'Core, cladding, coating, buffer, strengthening layer, jacket dan lapisan tambahan.', icon: Cable },
    transmission: { title: 'Jenis & Penghantaran Cahaya', subtitle: 'Single-mode, multi-mode, saiz core, sumber cahaya, jarak dan prinsip pantulan dalaman.', icon: Radio },
    connection: { title: 'Teknik Penyambungan', subtitle: 'Mechanical splice, stripping, cleaning, cleaving, dan penyambung SC, LC, ST, FC.', icon: Wrench },
    fusion: { title: 'Fusion Splicing', subtitle: 'Proses kimpalan gentian dengan electric arc, penjajaran automatik dan splicer.', icon: Zap },
    testing: { title: 'Pengujian & Loss', subtitle: 'Visual tracing, VFL, power meter, light source dan pengiraan attenuation.', icon: TestTube },
    otdr: { title: 'OTDR & Analisis Trace', subtitle: 'Fungsi OTDR, parameter ujian, trace, splice loss dan lokasi anomali.', icon: Activity },
    docs: { title: 'Dokumentasi & Troubleshooting', subtitle: 'Rekod pemasangan, baik pulih, ujian semula dan penyelesaian masalah fiber.', icon: ShieldCheck },
  };

  const featureMeta = {
    selection: { title: 'Panduan Pemilihan', subtitle: 'Panduan pemilihan kabel, connector dan konfigurasi fiber.', icon: Search, accent: 'violet' },
    inspection: { title: 'Prosedur Pemeriksaan', subtitle: 'Prosedur sendi pemeriksaan, safety, inspection-clean-inspection dan ujian fiber.', icon: ShieldCheck, accent: 'amber' },
    quiz: { title: 'Kuiz Penilaian', subtitle: 'Penilaian berasaskan 30 soalan dan mekanisme naik level / lulus', icon: Award, accent: 'rose' },
    model3d: { title: 'Model AR 3D', subtitle: 'Model fiber optik 3D dan visual AR interaktif.', icon: Box, accent: 'teal' },
    calculator: { title: 'Kalkulator Fiber Cabling', subtitle: 'Kalkulator attanuation, link budget dan dispersion fiber.', icon: Calculator, accent: 'blue' },
    consultant: { title: 'AI Fiber Pintar', subtitle: 'Analisis awal projek fiber berdasarkan input pengguna.', icon: WandSparkles, accent: 'indigo' },
  };

  const current = sections.find((section) => section.id === view) || featureMeta[view] || sections[0];

  const backToMenu = () => { setView('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const openSection = (id) => {
    const requested = sections.findIndex((section) => section.id === id);
    if (requested > 0 && !readState[requested - 1]) {
      return;
    }

    // Quiz hanya bisa dibuka jika semua 8 nota telah diselesaikan (readState[7] === true)
    if (id === 'quiz') {
      if (!readState[7]) {
        // Kuiz terkunci - pelajar belum selesai semua nota
        return;
      }
      setView(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'selection' || id === 'inspection' || id === 'model3d' || id === 'calculator' || id === 'consultant') {
      setView(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (requested >= 0) {
      setView(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const markReadingComplete = (id) => {
    const requested = sections.findIndex((section) => section.id === id);
    if (requested < 0) {
      return;
    }

    const nextReadState = [...readState];
    nextReadState[requested] = true;
    setReadState(nextReadState);
    try { localStorage.setItem('ikr3033-read-state', JSON.stringify(nextReadState)); } catch { /* storan tidak tersedia */ }

    const nextInLine = sections[requested + 1];
    if (nextInLine) {
      setView(nextInLine.id);
    }
  };

  if (view !== 'menu') {
    const content = {
      intro: <BasicNotes />,
      structure: <StructureNotes />,
      transmission: <TransmissionNotes />,
      connection: <ConnectionNotes />,
      fusion: <FusionNotes />,
      testing: <TestingNotes />,
      otdr: <OtdrNotes />,
      docs: <DocumentationNotes />,
      selection: <SelectionGuide />,
      inspection: <InspectionProcedure />,
      quiz: <Quiz />,
      model3d: <Fiber3DAR />,
      calculator: <FiberCalculator />,
      consultant: <Consultant />,
    }[view];

    const showCompleteButton = sections.some((section) => section.id === view);
    const headerMeta = sections.find((section) => section.id === view) || featureMeta[view] || sections[0];

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <FiberAnimStyles />
        <div className="bg-slate-950 text-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Cable size={30} className="text-cyan-300" />
                <div>
                  <div className="text-[10px] uppercase tracking-[.2em] text-cyan-300 font-black">Fiber Cabling Learning Flow</div>
                  <div className="text-sm font-black">{completedCount}/{sections.length} bahagian</div>
                </div>
              </div>
              <div className="flex-1 max-w-md">
                <div className="flex items-center justify-between text-[10px] font-black tracking-[.18em] text-cyan-200 uppercase">
                  <span>Progress</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300 transition-all" style={{ width: `${progressPercent}%` }} />
                </div>
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
        <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">IKR3033 Fiber Cabling - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>
      </div>
    );
  }

function FiberCalculator() {
  const fiberOptions = [
    { label: 'MM 62.5/125 @ 850 nm', loss: 3.5 },
    { label: 'MM 62.5/125 @ 1300 nm', loss: 1.5 },
    { label: 'MM 50/125 @ 850 nm', loss: 3.5 },
    { label: 'MM 50/125 @ 1300 nm', loss: 1.5 },
    { label: 'SM 9/125 @ 1310 nm', loss: 0.4 },
    { label: 'SM 9/125 @ 1550 nm', loss: 0.3 },
  ];

  const [fiberType, setFiberType] = useState(fiberOptions[0].label);
  const [distanceKm, setDistanceKm] = useState(10);
  const [spliceCount, setSpliceCount] = useState(2);
  const [connectorCount, setConnectorCount] = useState(2);
  const [spliceLoss, setSpliceLoss] = useState(0.1);
  const [connectorLoss, setConnectorLoss] = useState(0.5);
  const [txPower, setTxPower] = useState(-3);
  const [rxSensitivity, setRxSensitivity] = useState(-10);
  const [dispersionCoeff, setDispersionCoeff] = useState(17);
  const [spectralWidth, setSpectralWidth] = useState(0.1);

  const selectedFiber = fiberOptions.find((item) => item.label === fiberType) || fiberOptions[0];

  const totalLoss = useMemo(() => {
    return Number((selectedFiber.loss * distanceKm + spliceLoss * spliceCount + connectorLoss * connectorCount).toFixed(2));
  }, [selectedFiber.loss, distanceKm, spliceCount, spliceLoss, connectorLoss, connectorCount]);

  const rxPower = useMemo(() => Number((txPower - totalLoss).toFixed(2)), [txPower, totalLoss]);
  const dispersion = useMemo(() => Number((dispersionCoeff * spectralWidth * distanceKm).toFixed(2)), [dispersionCoeff, spectralWidth, distanceKm]);
  const linkStatus = rxPower >= rxSensitivity ? 'Lulus' : 'Gagal';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[.25em] text-cyan-700 font-black">Kalkulator Fiber Cabling</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900">Attenuation, Link Budget & Dispersion</h2>
            <p className="mt-3 text-slate-600 max-w-2xl">Masukkan nilai fiber, jarak, sambungan dan sensitiviti untuk melihat sama ada pautan optik memenuhi bajet kuasa dan kadar penyebaran isyarat.</p>
          </div>
          <div className="rounded-3xl bg-cyan-50 border border-cyan-100 p-5 text-slate-900 shadow-sm">
            <p className="text-sm font-black uppercase text-cyan-700">Formula utama</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Total Loss = Loss per km × Jarak + Splice Loss + Connector Loss</li>
              <li>Rx Power = Tx Power − Total Loss</li>
              <li>Total Dispersion = Dispersion Coefficient × Spectral Width × Jarak</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-5">Parameter Fiber</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                Jenis Fiber
                <select value={fiberType} onChange={(event) => setFiberType(event.target.value)} className="w-full rounded-2xl border border-slate-300 px-4 py-3 bg-white text-slate-900">
                  {fiberOptions.map((item) => <option value={item.label} key={item.label}>{item.label} ({item.loss} dB/km)</option>)}
                </select>
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                Jarak (km)
                <input type="number" min="0" step="0.1" value={distanceKm} onChange={(event) => setDistanceKm(Number(event.target.value))} className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                Bilangan splice
                <input type="number" min="0" step="1" value={spliceCount} onChange={(event) => setSpliceCount(Number(event.target.value))} className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                Bilangan connector
                <input type="number" min="0" step="1" value={connectorCount} onChange={(event) => setConnectorCount(Number(event.target.value))} className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                Splice Loss setiap satu (dB)
                <input type="number" min="0" step="0.01" value={spliceLoss} onChange={(event) => setSpliceLoss(Number(event.target.value))} className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                Connector Loss setiap satu (dB)
                <input type="number" min="0" step="0.01" value={connectorLoss} onChange={(event) => setConnectorLoss(Number(event.target.value))} className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
              </label>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-5">Link Budget</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                Tx Power (dBm)
                <input type="number" value={txPower} onChange={(event) => setTxPower(Number(event.target.value))} className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                Sensitiviti Rx (dBm)
                <input type="number" value={rxSensitivity} onChange={(event) => setRxSensitivity(Number(event.target.value))} className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
              </label>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-5">Dispersion</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                Dispersion Coefficient (ps/nm·km)
                <input type="number" min="0" step="0.1" value={dispersionCoeff} onChange={(event) => setDispersionCoeff(Number(event.target.value))} className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
              </label>
              <label className="space-y-2 text-sm text-slate-700">
                Spectral Width (nm)
                <input type="number" min="0" step="0.01" value={spectralWidth} onChange={(event) => setSpectralWidth(Number(event.target.value))} className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="rounded-3xl bg-slate-100 p-5">
                <h3 className="text-lg font-black text-slate-900">Keputusan</h3>
                <p className="mt-3 text-sm text-slate-600">Gunakan nilai yang disediakan untuk menilai sama ada pautan fiber berada dalam bajet dan berapa banyak penyebaran isyarat berlaku.</p>
              </div>
              <div className="grid gap-4">
                <div className="rounded-3xl border border-slate-200 bg-cyan-50 p-5">
                  <p className="text-xs uppercase tracking-[.2em] text-cyan-700 font-black">Total Attenuation</p>
                  <p className="mt-3 text-3xl font-black text-slate-900">{totalLoss} dB</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-emerald-50 p-5">
                  <p className="text-xs uppercase tracking-[.2em] text-emerald-700 font-black">Rx Power</p>
                  <p className="mt-3 text-3xl font-black text-slate-900">{rxPower} dBm</p>
                  <p className="mt-2 text-sm text-slate-700">{linkStatus} ({rxPower >= rxSensitivity ? 'Rx lebih kuat daripada sensitiviti' : 'Rx lemah daripada sensitiviti'})</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-amber-50 p-5">
                  <p className="text-xs uppercase tracking-[.2em] text-amber-700 font-black">Total Dispersion</p>
                  <p className="mt-3 text-3xl font-black text-slate-900">{dispersion} ps</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-4">Carta Rujukan Fiber</h3>
            <div className="grid gap-3">
              {fiberOptions.map((item) => (
                <div key={item.label} className="rounded-3xl border border-slate-200 p-4 hover:border-cyan-300 transition">
                  <p className="font-black text-slate-900">{item.label}</p>
                  <p className="text-sm text-slate-600">Loss per km: {item.loss} dB/km</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="course-menu-page min-h-screen bg-slate-50 text-slate-900">
      <FiberAnimStyles />
      <ModuleMenu title="Modul IKR3033: Fiber Cabling" icon={sections[0].icon} secondaryIcon={sections[1].icon}
        onBack={onBackToPortal} topics={sections} read={readState} onTopic={section => openSection(section.id)} onReset={resetProgress}
        download={{ href: `${import.meta.env.BASE_URL}IKR3033_Fiber_Cabling.pdf`, label: 'Muat Turun Nota PDF', local: true }}
        description={<>Nota penerangan IKR3033 dipecahkan kepada bahagian pembelajaran yang lebih jelas: pengenalan, struktur kabel, jenis fiber, teknik penyambungan, fusion splicing, pengujian, OTDR serta dokumentasi dan troubleshooting.</>}>
        <ModuleActivities activities={featureCards} quizLocked={!readState[sections.length - 1]} onOpen={openSection} />
      </ModuleMenu>
      <div className="course-extras">
        <section className="mt-8 bg-white rounded-2xl border border-slate-200 p-5 md:p-6">
          <h3 className="font-black text-slate-900 flex items-center gap-2"><TestTube className="text-cyan-600" /> Hasil pembelajaran modul</h3>
          <div className="grid md:grid-cols-2 gap-3 mt-4 text-sm text-slate-600">
            {['Mengenal pasti binaan dan jenis gentian optik.', 'Memilih kabel dan connector berdasarkan aplikasi.', 'Menerangkan fusion splicing dan perlindungan splice.', 'Melaksanakan pemeriksaan, pengujian kuasa dan analisis OTDR.'].map((item) => <div key={item} className="flex items-start gap-2 bg-slate-50 rounded-xl p-3"><Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />{item}</div>)}
          </div>
        </section>

        <section className="mt-6 text-xs text-slate-500 leading-relaxed">
          <strong>Rujukan utama:</strong> Kertas Penerangan IKR3033 Fiber Cabling (Jabatan Tenaga Manusia); ITU-T G.9807.1 (XGS-PON), ITU-T G.9804.3 (50G-PON) dan ITU-T G.657 (bend-insensitive single-mode fiber).
        </section>
      </div>
      <footer className="border-t border-slate-200 py-7 text-center text-xs text-slate-500 font-bold">Copyright © TKR ADTEC Sandakan 2026</footer>
    </div>
  );
}
