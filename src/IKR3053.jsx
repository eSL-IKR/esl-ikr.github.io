import ModuleMenu, { ModuleActivities } from './ModuleMenu';
import { useMemo, useState } from 'react';
import { ikr3053QuizSets } from './IKR3053QuizData.js';
import {
  Antenna,
  ArrowDown,
  ArrowLeft,
  Award,
  BadgeCheck,
  Cable,
  CheckCircle,
  ChevronRight,
  CircleDot,
  Cloud,
  Fingerprint,
  Gauge,
  Globe,
  Home,
  IdCard,
  Layers,
  ListChecks,
  Lock,
  LockKeyhole,
  Radio,
  RadioTower,
  Repeat,
  RotateCcw,
  Router,
  ShieldAlert,
  Signal,
  Sliders,
  Smartphone,
  Sparkles,
  Users,
  Waves,
  Wifi,
  XCircle,
  Zap,
} from 'lucide-react';

const sections = [
  { id: 'intro', title: 'Pengenalan Wireless Technology', desc: 'Rangkaian tanpa wayar, gelombang elektromagnetik dan peranan AP.', icon: Waves, accent: 'blue' },
  { id: 'roles', title: 'Peranan & Fungsi Wireless AP', desc: 'Access Point, Bridge, Repeater, Mesh, Controller-based, Hotspot, Client Mode.', icon: Router, accent: 'indigo' },
  { id: 'architecture', title: 'Senibina & Komponen AP', desc: 'Standalone, Controller-based, Cloud-based serta komponen dan antara muka AP.', icon: Layers, accent: 'violet' },
  { id: 'frequency', title: '2.4 GHz vs 5 GHz', desc: 'Perbandingan liputan, penembusan, kelajuan dan kesesuaian penggunaan.', icon: Radio, accent: 'teal' },
  { id: 'channel', title: 'Channel Selection & Transmit Power', desc: 'Saluran bebas gangguan, co-channel interference dan kawalan kuasa.', icon: Signal, accent: 'emerald' },
  { id: 'antenna', title: 'Antenna Settings', desc: 'Antena omnidirectional vs directional dan kesan kepada liputan.', icon: Antenna, accent: 'amber' },
  { id: 'bonding', title: 'Channel Bonding, Modulasi & Data Rate', desc: 'Penggabungan saluran, QAM dan kadar data dinamik.', icon: Gauge, accent: 'orange' },
  { id: 'standards', title: 'Band Steering & Piawaian Wi-Fi', desc: '802.11a/b/g/n/ac/ax, RF Profiles serta SSID & keselamatan.', icon: RadioTower, accent: 'rose' },
  { id: 'eap', title: 'Extensible Authentication Protocol (EAP)', desc: 'Fleksibiliti, encapsulation, scalability serta kaedah EAP-TLS/TTLS/PEAP/FAST.', icon: IdCard, accent: 'violet' },
];

const SECTION_COUNT = sections.length;
const EMPTY_READ_STATE = new Array(SECTION_COUNT).fill(false);

const featureCards = [
  { id: 'quiz', target: 'quiz', title: 'Kuiz Penilaian', desc: '150 soalan (5 KP x 30 soalan). Buka setelah menyelesaikan semua 9 Nota.', icon: Award, accent: 'rose' },
];

const accentStyles = {
  blue: { icon: 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30', ring: 'hover:border-blue-300 hover:shadow-blue-200/60', badge: 'bg-blue-100 text-blue-700', topBar: 'from-blue-400 to-blue-600', text: 'text-blue-700', soft: 'bg-blue-50' },
  indigo: { icon: 'bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-500/30', ring: 'hover:border-indigo-300 hover:shadow-indigo-200/60', badge: 'bg-indigo-100 text-indigo-700', topBar: 'from-indigo-400 to-indigo-600', text: 'text-indigo-700', soft: 'bg-indigo-50' },
  violet: { icon: 'bg-gradient-to-br from-violet-500 to-violet-700 shadow-lg shadow-violet-500/30', ring: 'hover:border-violet-300 hover:shadow-violet-200/60', badge: 'bg-violet-100 text-violet-700', topBar: 'from-violet-400 to-violet-600', text: 'text-violet-700', soft: 'bg-violet-50' },
  teal: { icon: 'bg-gradient-to-br from-teal-500 to-teal-700 shadow-lg shadow-teal-500/30', ring: 'hover:border-teal-300 hover:shadow-teal-200/60', badge: 'bg-teal-100 text-teal-700', topBar: 'from-teal-400 to-teal-600', text: 'text-teal-700', soft: 'bg-teal-50' },
  emerald: { icon: 'bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/30', ring: 'hover:border-emerald-300 hover:shadow-emerald-200/60', badge: 'bg-emerald-100 text-emerald-700', topBar: 'from-emerald-400 to-emerald-600', text: 'text-emerald-700', soft: 'bg-emerald-50' },
  amber: { icon: 'bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg shadow-amber-500/30', ring: 'hover:border-amber-300 hover:shadow-amber-200/60', badge: 'bg-amber-100 text-amber-700', topBar: 'from-amber-400 to-amber-600', text: 'text-amber-700', soft: 'bg-amber-50' },
  orange: { icon: 'bg-gradient-to-br from-orange-500 to-orange-700 shadow-lg shadow-orange-500/30', ring: 'hover:border-orange-300 hover:shadow-orange-200/60', badge: 'bg-orange-100 text-orange-700', topBar: 'from-orange-400 to-orange-600', text: 'text-orange-700', soft: 'bg-orange-50' },
  rose: { icon: 'bg-gradient-to-br from-rose-500 to-rose-700 shadow-lg shadow-rose-500/30', ring: 'hover:border-rose-300 hover:shadow-rose-200/60', badge: 'bg-rose-100 text-rose-700', topBar: 'from-rose-400 to-rose-600', text: 'text-rose-700', soft: 'bg-rose-50' },
};

/* Animasi CSS - KHUSUS modul Wireless (gelombang RF, isyarat) */
function WirelessAnimStyles() {
  return (
    <style>{`
      @keyframes wlRipple { 0% { transform: scale(.6); opacity: .8; } 100% { transform: scale(2.2); opacity: 0; } }
      @keyframes wlBarBounce { 0%, 100% { transform: scaleY(.4); } 50% { transform: scaleY(1); } }
      @keyframes wlFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes wlScaleIn { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: scale(1); } }
      @keyframes wlSpin { to { transform: rotate(360deg); } }
      .wl-ripple { animation: wlRipple 2s ease-out infinite; }
      .wl-ripple-delay { animation: wlRipple 2s ease-out infinite; animation-delay: .6s; }
      .wl-ripple-delay2 { animation: wlRipple 2s ease-out infinite; animation-delay: 1.2s; }
      .wl-bar { animation: wlBarBounce 1s ease-in-out infinite; transform-origin: bottom; }
      .wl-entry-title { animation: wlFadeUp .5s ease-out both; }
      .wl-entry-icon { animation: wlScaleIn .45s ease-out both; }
      .wl-entry-subtitle { animation: wlFadeUp .5s ease-out .1s both; }
      .wl-reveal { animation: wlFadeUp .5s ease-out both; }
      .wl-reveal-1{animation-delay:.05s}.wl-reveal-2{animation-delay:.1s}.wl-reveal-3{animation-delay:.15s}
      .wl-reveal-4{animation-delay:.2s}.wl-reveal-5{animation-delay:.25s}.wl-reveal-6{animation-delay:.3s}
      .wl-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
      .wl-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(79,70,229,.25); border-color: #a5b4fc; }
      .wl-card:hover .wl-card-icon { animation: wlScaleIn .3s ease-out; }
      .wl-spin-slow { animation: wlSpin 6s linear infinite; }
      @media (prefers-reduced-motion: reduce) {
        .wl-ripple, .wl-ripple-delay, .wl-ripple-delay2, .wl-bar, .wl-entry-title, .wl-entry-icon,
        .wl-entry-subtitle, .wl-reveal, .wl-card, .wl-spin-slow { animation: none !important; transition: none !important; }
        .wl-card:hover { transform: none; }
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
          <div className={`p-3 rounded-2xl border border-white/15 ${style.icon} wl-entry-icon`}><Icon size={28} className="text-white" /></div>
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight wl-entry-title">{title}</h1>
            <p className="text-slate-300 mt-2 max-w-3xl text-sm md:text-base wl-entry-subtitle">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, children, icon: Icon = CircleDot }) {
  return (
    <article className="wl-card wl-reveal bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
      <h3 className="font-black text-slate-900 text-lg flex items-center gap-2 mb-3"><Icon size={20} className="wl-card-icon text-indigo-600" /> {title}</h3>
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
      <ListChecks size={22} className="text-emerald-300 shrink-0 mt-0.5" />
      <div><p className="text-xs font-black uppercase tracking-wide text-emerald-300 mb-1">Ringkasan</p><div className="text-sm text-slate-100 leading-relaxed">{children}</div></div>
    </div>
  );
}

function NotesTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm">
        <thead><tr className="bg-indigo-50 text-indigo-900">{headers.map((h) => <th key={h} className="text-left font-black p-3 md:p-4">{h}</th>)}</tr></thead>
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


/* Simbol AP dengan gelombang RF beriak - elemen visual signature modul ini */
function APRippleIcon({ size = 96 }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full border-2 border-indigo-300 wl-ripple" />
      <div className="absolute inset-0 rounded-full border-2 border-indigo-300 wl-ripple-delay" />
      <div className="absolute inset-0 rounded-full border-2 border-indigo-300 wl-ripple-delay2" />
      <div className="relative z-10 w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg">
        <Router size={22} className="text-white" />
      </div>
    </div>
  );
}

/* ---------------- NOTA 1: PENGENALAN ---------------- */
function IntroNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-6 items-center">
        <InfoCard title="Apakah Wireless Technology?" icon={Waves}>
          <p>Rangkaian tanpa wayar (wireless network) membolehkan peranti seperti komputer riba, telefon pintar dan tablet berhubung ke rangkaian tanpa memerlukan sambungan kabel fizikal. Penghantaran data dilakukan melalui <b>gelombang elektromagnetik (radio frequency / RF)</b> yang bergerak di udara antara peranti dan Wireless Access Point (AP).</p>
          <p className="mt-3">Wireless Access Point (AP) ialah peranti rangkaian yang membolehkan peranti tanpa wayar menyambung ke rangkaian berwayar. AP berfungsi sebagai &ldquo;pintu masuk&rdquo; untuk peranti tanpa wayar mengakses rangkaian tempatan (LAN) dan internet - ia disambungkan ke suis atau penghala melalui kabel dan memancarkan isyarat Wi-Fi untuk peranti dalam kawasan liputannya.</p>
        </InfoCard>
        <div className="flex flex-col items-center gap-4 bg-slate-950 rounded-2xl p-6">
          <APRippleIcon size={120} />
          <div className="flex items-center gap-3 text-white">
            <RadioTower size={18} className="text-indigo-300" />
            <span className="text-xs font-bold text-slate-300">AP memancarkan isyarat RF ke semua client dalam liputan</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-4">Hubungan AP dengan Peranti Client</h4>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {[{ icon: Router, label: 'Wireless AP' }].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg"><item.icon size={28} className="text-white" /></div>
              <span className="text-xs font-black text-slate-700">{item.label}</span>
            </div>
          ))}
          <div className="flex flex-col gap-3">
            {[{ icon: 'laptop', label: 'Komputer Riba' }, { icon: 'phone', label: 'Telefon Pintar' }, { icon: 'tablet', label: 'Tablet' }].map((c, i) => (
              <div key={c.label} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span className={`w-6 h-0.5 bg-indigo-300 wl-bar`} style={{ animationDelay: `${i * 0.15}s` }} />
                <span className="text-xs font-bold text-slate-600">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <InfoCard title="Kepentingan Radio Frequency (RF)" icon={Signal}>
        <p>AP menyokong pelbagai piawaian Wi-Fi seperti <b>802.11a/b/g/n/ac/ax</b>, dengan kelajuan dan jarak liputan yang berbeza. Pemilihan AP bergantung pada keperluan pengguna, jumlah peranti, dan saiz kawasan.</p>
        <p className="mt-3">Dalam sistem yang lebih besar, lebih daripada satu AP dipasang untuk memperluas liputan - penting untuk memastikan sambungan Wi-Fi yang stabil dan meluas, terutamanya di pejabat, institusi pendidikan atau rumah.</p>
      </InfoCard>

      <Ringkasan>
        Wireless Technology membolehkan sambungan rangkaian tanpa kabel melalui gelombang RF. <b>Wireless Access Point (AP)</b> adalah komponen teras yang menjadi &ldquo;pintu masuk&rdquo; antara peranti tanpa wayar dan rangkaian berwayar, menyokong pelbagai piawaian 802.11 mengikut keperluan liputan dan kelajuan.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 2: PERANAN & FUNGSI AP ---------------- */
function RolesNotes() {
  const roles = [
    { icon: Router, title: 'Access Point (Basic Role)', text: 'Fungsi asas AP - disambung secara berwayar ke rangkaian (router/switch), memancarkan isyarat Wi-Fi kepada peranti sekeliling. Sesuai untuk pejabat, sekolah atau rumah.' },
    { icon: Cable, title: 'Wireless Bridge', text: 'Menghubungkan dua rangkaian berwayar yang terpisah secara tanpa wayar - contohnya dua bangunan yang tidak boleh disambung guna kabel. Sering digunakan dalam kampus atau kawasan industri luas.' },
    { icon: Repeat, title: 'Repeater (Range Extender)', text: 'Menguatkan dan memanjangkan isyarat Wi-Fi dari AP utama tanpa memerlukan sambungan kabel. Berguna mengatasi "zon mati" (dead zone) di rumah besar atau bangunan bertingkat.' },
    { icon: Globe, title: 'Mesh Network Node', text: 'Beberapa AP/node digunakan bersama membentuk rangkaian lebih luas dan stabil - setiap node berkomunikasi automatik tanpa bergantung satu AP pusat. Sesuai untuk hotel, pusat beli-belah.' },
    { icon: Sliders, title: 'Controller-Based AP', text: 'Dikawal oleh centralized controller - semua AP dipantau dan dikonfigurasi dari satu lokasi pusat. Memudahkan penyelenggaraan, kemas kini firmware dan tetapan keselamatan sekali gus.' },
    { icon: Users, title: 'Hotspot', text: 'Titik akses Wi-Fi awam membolehkan pengguna menyambung ke internet secara terbuka atau selepas log masuk. Sering digunakan di kafe, lapangan terbang, perpustakaan.' },
    { icon: Wifi, title: 'Client Mode', text: 'AP tidak memancarkan isyarat, sebaliknya menerima isyarat Wi-Fi daripada AP lain dan menghantar sambungan kepada peranti berwayar (komputer, printer, kamera CCTV) yang tiada Wi-Fi.' },
  ];
  const functions = [
    'Wireless connectivity - sambungan tanpa wayar kepada rangkaian berwayar',
    'Network Bridging - menghubungkan dua/lebih rangkaian berbeza',
    'Signal Distribution - mengedarkan isyarat radio dalam liputan tertentu',
    'Security - menyokong WPA2/WPA3 untuk lindungi trafik rangkaian',
    'Traffic Management - urus aliran trafik & lebar jalur',
    'Roaming Support - peranti beralih antara AP tanpa putus sambungan',
    'Quality of Service (QoS) - utamakan trafik video/suara',
    'Network Extension - memanjangkan liputan rangkaian',
    'Client Access Control - kawal akses melalui penapisan MAC/WPA2 Enterprise',
    'Broadcasting SSID - siarkan nama rangkaian untuk client kenal pasti',
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Wireless AP Roles" icon={Sliders}>
        <p>Wireless AP Roles merujuk kepada pelbagai fungsi/peranan yang dimainkan oleh Wireless Access Point dalam rangkaian tanpa wayar, bergantung kepada konfigurasi dan keperluan rangkaian.</p>
      </InfoCard>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role) => (
          <div key={role.title} className="wl-card rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-700 mb-3 wl-card-icon"><role.icon size={19} /></div>
            <p className="font-black text-slate-900 text-sm">{role.title}</p>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{role.text}</p>
          </div>
        ))}
      </div>

      <InfoCard title="Wireless AP Functions" icon={ListChecks}>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {functions.map((f) => (
            <div key={f} className="flex items-start gap-2 rounded-xl bg-slate-50 border border-slate-200 p-3 text-sm">
              <CheckCircle size={16} className="text-indigo-600 shrink-0 mt-0.5" /> {f}
            </div>
          ))}
        </div>
      </InfoCard>

      <NotaPenting>
        Dalam mod <b>Client Mode</b>, AP tidak memancarkan isyarat Wi-Fi seperti biasa - sebaliknya ia <b>menerima</b> isyarat daripada AP lain dan menyambungkan peranti berwayar (tanpa keupayaan Wi-Fi) ke rangkaian. Ini membantu menyambungkan peranti lama tanpa perlu menarik kabel panjang.
      </NotaPenting>

      <Ringkasan>
        AP boleh berperanan sebagai <b>Access Point, Bridge, Repeater, Mesh Node, Controller-based, Hotspot,</b> atau <b>Client Mode</b> bergantung konfigurasi. Fungsi terasnya merangkumi sambungan tanpa wayar, bridging, pengedaran isyarat, keselamatan, pengurusan trafik, roaming, QoS, perluasan rangkaian, kawalan akses client, dan penyiaran SSID.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 3: SENIBINA & KOMPONEN AP ---------------- */
function ArchitectureNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Wireless AP Architecture" icon={Layers}>
        <p>Pemilihan model seni bina AP yang sesuai bergantung pada saiz rangkaian, keperluan pengurusan, dan sumber yang tersedia.</p>
      </InfoCard>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 mb-3"><Router size={20} /></div>
          <p className="font-black text-slate-900">Standalone AP</p>
          <p className="text-xs text-slate-500 mb-2">(Autonomous AP)</p>
          <p className="text-sm text-slate-600">Beroperasi bebas tanpa pengawal pusat. Setiap AP dikonfigurasi &amp; diurus secara individu. Sesuai rangkaian kecil / liputan terhad.</p>
        </div>
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center text-white mb-3"><Sliders size={20} /></div>
          <p className="font-black text-indigo-900">Controller-based AP</p>
          <p className="text-xs text-indigo-600 mb-2">Diurus oleh WLC</p>
          <p className="text-sm text-indigo-900">AP bergantung sepenuhnya kepada <b>Wireless LAN Controller (WLC)</b> untuk konfigurasi &amp; arahan operasi. Sesuai rangkaian besar (kampus, pejabat korporat).</p>
        </div>
        <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-violet-600 flex items-center justify-center text-white mb-3"><Cloud size={20} /></div>
          <p className="font-black text-violet-900">Cloud-based AP</p>
          <p className="text-xs text-violet-600 mb-2">cth. Cisco Meraki</p>
          <p className="text-sm text-violet-900">Disambung ke platform awan untuk pengurusan &amp; pemantauan dari mana-mana lokasi. Fleksibel &amp; berskala tanpa infrastruktur pengawal fizikal.</p>
        </div>
      </div>

      {/* WLC diagram */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-8 shadow-sm">
        <h4 className="font-black text-slate-900 mb-1">Rajah: Controller-Based Model</h4>
        <p className="text-xs text-slate-500 mb-6">WLC mengawal semua AP secara berpusat - SSID, keselamatan &amp; pemetaan VLAN dihantar dari satu titik.</p>
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-2xl bg-indigo-600 text-white px-6 py-3 font-black flex items-center gap-2"><Sliders size={18} /> Wireless LAN Controller (WLC)</div>
          <ArrowDown size={18} className="text-indigo-400" />
          <div className="flex flex-wrap justify-center gap-4">
            {['AP 1', 'AP 2', 'AP 3'].map((ap) => (
              <div key={ap} className="flex flex-col items-center gap-1.5">
                <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs">{ap}</div>
                <ArrowDown size={14} className="text-slate-300" />
                <div className="flex gap-1"><Smartphone size={14} className="text-slate-400" /><Smartphone size={14} className="text-slate-400" /></div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-6 text-center">Kegagalan WLC boleh menyebabkan gangguan besar (single point of failure) - walaupun sesetengah AP moden ada Fallback Mode.</p>
      </div>

      <InfoCard title="Komponen Utama Wireless AP (WAP)" icon={Router}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: 'Antena', d: 'Menghantar & menerima isyarat radio; dalaman atau luaran.' },
            { name: 'Radio Transceiver', d: 'Tukar isyarat digital ↔ isyarat radio; beroperasi 2.4GHz/5GHz.' },
            { name: 'Port Ethernet', d: 'Sambungan ke rangkaian berwayar (router/switch).' },
            { name: 'Pemproses & Memori', d: 'Kendali operasi sistem & simpan konfigurasi.' },
            { name: 'Perisian Pengurusan', d: 'Kawal & pantau status sambungan, konfigurasi, keselamatan.' },
            { name: 'Catu Kuasa (PoE)', d: 'Bekalan elektrik - boleh guna Power over Ethernet.' },
          ].map((c) => (
            <div key={c.name} className="rounded-xl bg-slate-50 border border-slate-200 p-3">
              <p className="text-sm font-black text-slate-900">{c.name}</p>
              <p className="text-xs text-slate-600 mt-1">{c.d}</p>
            </div>
          ))}
        </div>
      </InfoCard>

      <InfoCard title="Antara Muka (Interfaces) AP" icon={Cable}>
        <ul className="space-y-2 list-disc pl-5">
          <li><b>Port LAN (Ethernet)</b> - sambungan fizikal ke switch/router (IEEE 802.3), menyokong VLAN (802.1Q) dan PoE (802.3af/at).</li>
          <li><b>Wireless (Radio) Interface</b> - guna gelombang radio 2.4GHz/5GHz ikut piawaian IEEE 802.11.</li>
          <li><b>Management Interface</b> - akses konfigurasi tempatan (CLI) atau jauh (web/cloud).</li>
          <li><b>Console Port</b> - sambungan fizikal terus (RJ-45/DB-9, piawaian EIA/TIA-232) untuk konfigurasi awal tanpa IP.</li>
          <li><b>Antenna Interface</b> - port antena luar untuk tingkatkan liputan &amp; kekuatan isyarat.</li>
          <li><b>USB Port (Optional)</b> - untuk modem 4G/5G failover, storan atau pencetak kongsi.</li>
        </ul>
      </InfoCard>

      <Ringkasan>
        3 senibina utama: <b>Standalone</b> (bebas), <b>Controller-based</b> (diurus WLC pusat), dan <b>Cloud-based</b> (diurus platform awan). Setiap AP dibina daripada komponen (antena, radio transceiver, port Ethernet, pemproses, perisian pengurusan, catu kuasa) yang bekerja secara sinergi.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 4: 2.4GHz VS 5GHz ---------------- */
function FrequencyNotes() {
  const [band, setBand] = useState('2.4');
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Pemilihan Jalur Frekuensi Wi-Fi" icon={Radio}>
        <p>Wi-Fi beroperasi dalam dua jalur frekuensi utama: <b>2.4 GHz</b> dan <b>5 GHz</b>. Kedua-dua jalur mempunyai kelebihan dan kekurangan tersendiri, dan pemilihannya perlu dibuat berdasarkan keperluan pengguna serta persekitaran fizikal kawasan.</p>
      </InfoCard>

      {/* Interactive switch */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-8 shadow-sm">
        <div className="flex justify-center gap-2 mb-6">
          <button onClick={() => setBand('2.4')} className={`px-5 py-2.5 rounded-xl font-black text-sm transition-all ${band === '2.4' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600'}`}>2.4 GHz</button>
          <button onClick={() => setBand('5')} className={`px-5 py-2.5 rounded-xl font-black text-sm transition-all ${band === '5' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600'}`}>5 GHz</button>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shrink-0"><Router size={24} className="text-white" /></div>
          <div className="relative flex-1 max-w-md h-16 flex items-center">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`absolute rounded-full border-2 border-indigo-400 wl-ripple`} style={{ left: 0, width: 56, height: 56, animationDelay: `${i * 0.5}s` }} />
            ))}
          </div>
          <div className={`flex flex-col items-center gap-1 transition-all ${band === '2.4' ? 'ml-16' : 'ml-4'}`}>
            <Smartphone size={26} className="text-slate-700" />
            <span className="text-[10px] font-black text-slate-500">{band === '2.4' ? 'Jarak jauh' : 'Jarak dekat'}</span>
          </div>
        </div>

        <p className="text-center text-sm text-slate-600 mt-6 max-w-lg mx-auto">
          {band === '2.4'
            ? '2.4 GHz: liputan lebih luas, menembusi dinding/lantai dengan lebih baik - sesuai bangunan bertingkat, tetapi lebih sesak (dikongsi telefon tanpa wayar, ketuhar gelombang mikro) & channel terhad.'
            : '5 GHz: kelajuan lebih tinggi, lebih banyak channel bebas gangguan - sesuai penstriman video/permainan dalam talian, tetapi liputan lebih pendek & kurang menembusi halangan konkrit.'}
        </p>
      </div>

      <NotesTable
        headers={['Ciri', '2.4 GHz', '5 GHz']}
        rows={[
          ['Liputan (Coverage)', 'Lebih luas', 'Lebih terhad'],
          ['Penembusan Halangan', 'Lebih baik (dinding, lantai)', 'Mudah merosot pada konkrit'],
          ['Gangguan (Interference)', 'Lebih tinggi (peranti isi rumah)', 'Lebih rendah'],
          ['Kelajuan', 'Lebih rendah', 'Lebih tinggi'],
          ['Bilangan Channel', 'Terhad (3 bebas gangguan: 1,6,11)', 'Lebih banyak, kebanyakan tidak bertindih'],
          ['Kesesuaian', 'Bangunan bertingkat, kawasan luas', 'Streaming HD, gaming, pemindahan fail besar'],
        ]}
      />

      <NotaPenting>
        Kebanyakan penghala/peranti moden menyokong <b>dual-band</b>, membolehkan peranti memilih jalur paling sesuai secara automatik atau ikut tetapan pengguna - meningkatkan prestasi dan mengurangkan risiko gangguan.
      </NotaPenting>

      <Ringkasan>
        Pilih <b>2.4 GHz</b> untuk liputan luas &amp; menembusi halangan; pilih <b>5 GHz</b> untuk kelajuan tinggi &amp; kurang gangguan pada jarak dekat. Pemilihan bergantung saiz kawasan, halangan fizikal, jenis aktiviti dan bilangan peranti.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 5: CHANNEL & TRANSMIT POWER ---------------- */
function ChannelNotes() {
  const [interference, setInterference] = useState(true);
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Channel Selection" icon={Signal}>
        <p>Setiap jalur frekuensi terdiri daripada beberapa saluran (channel) yang digunakan untuk komunikasi antara peranti dan AP. Sekiranya saluran tidak dipilih dengan betul, ia boleh menyebabkan gangguan antara satu sama lain (co-channel interference), menjejaskan kelajuan dan kestabilan rangkaian.</p>
        <p className="mt-3">Dalam jalur 2.4 GHz, walaupun terdapat sehingga 14 saluran (ikut negara), hanya <b>channel 1, 6, dan 11</b> boleh digunakan serentak tanpa bertindih (non-overlapping channels).</p>
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-black text-slate-900">Simulasi: Overlap Channel</h4>
          <div className="flex gap-2">
            <button onClick={() => setInterference(true)} className={`px-3 py-1.5 rounded-lg text-xs font-black ${interference ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'}`}>Add Interference</button>
            <button onClick={() => setInterference(false)} className={`px-3 py-1.5 rounded-lg text-xs font-black ${!interference ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>Optimize RF</button>
          </div>
        </div>
        <div className="flex items-end justify-center gap-1 h-24">
          {Array.from({ length: 14 }, (_, i) => i + 1).map((ch) => {
            const active = interference ? [1, 2, 3].includes(ch) : [1, 6, 11].includes(ch);
            return (
              <div key={ch} className="flex flex-col items-center gap-1">
                <div className={`w-5 rounded-t-md transition-all ${active ? (interference ? 'bg-rose-400 h-16' : 'bg-emerald-400 h-16') : 'bg-slate-200 h-6'}`} />
                <span className="text-[9px] font-bold text-slate-400">{ch}</span>
              </div>
            );
          })}
        </div>
        <p className="text-center text-xs text-slate-500 mt-4">
          {interference ? '⚠️ AP A, B, C guna channel 1, 2, 3 - bertindih & saling mengganggu (co-channel interference).' : '✅ AP A, B, C guna channel 1, 6, 11 - tiada pertindihan, gangguan minimum.'}
        </p>
      </div>

      <InfoCard title="Transmit Power (Kuasa Penghantaran)" icon={Zap}>
        <p>Kuasa penghantaran merujuk kepada tahap kekuatan isyarat radio yang dipancarkan oleh AP. Kawalan yang tidak tepat boleh memberi kesan negatif:</p>
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-sm"><b className="text-rose-800">Terlalu Tinggi</b><p className="mt-1 text-rose-900">Isyarat menjangkau kawasan lebih luas dari perlu &rarr; interference dengan AP berdekatan, client tertarik ke AP jauh (lebih kuat isyarat) walaupun ada AP lebih hampir.</p></div>
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-sm"><b className="text-amber-800">Terlalu Rendah</b><p className="mt-1 text-amber-900">Liputan tidak mencukupi &rarr; wujud &ldquo;dead zone&rdquo; (kawasan tiada/lemah isyarat), contohnya di penjuru dewan kuliah besar.</p></div>
        </div>
        <p className="mt-3">Sistem seperti <b>Transmit Power Control (TPC)</b> membantu AP menyesuaikan kuasa secara dinamik mengikut bilangan peranti dan gangguan sekeliling.</p>
      </InfoCard>

      <Ringkasan>
        Guna channel <b>1, 6, 11</b> sahaja (bebas gangguan) dalam 2.4 GHz untuk elak co-channel interference. Kuasa penghantaran perlu seimbang - tidak terlalu tinggi (elak interference AP lain) mahupun terlalu rendah (elak dead zone).
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 6: ANTENNA SETTINGS ---------------- */
function AntennaNotes() {
  const [antennaOn, setAntennaOn] = useState(true);
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Kepentingan Tetapan Antena" icon={Antenna}>
        <p>Antena Wi-Fi boleh dikategorikan kepada dua jenis utama: <b>omnidirectional</b> dan <b>directional</b>. Jenis antena serta kedudukan/orientasinya mempengaruhi corak penyebaran isyarat, justeru menjejaskan kecekapan rangkaian secara keseluruhan.</p>
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-8 shadow-sm">
        <div className="flex justify-center mb-4">
          <button onClick={() => setAntennaOn((v) => !v)} className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black ${antennaOn ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
            <Antenna size={16} /> Antenna {antennaOn ? 'ON' : 'OFF'}
          </button>
        </div>
        <div className="relative h-48 flex items-center justify-center">
          {antennaOn && (
            <>
              <div className="absolute w-40 h-40 rounded-full border-2 border-indigo-200 wl-ripple" />
              <div className="absolute w-40 h-40 rounded-full border-2 border-indigo-200 wl-ripple-delay" />
              <div className="absolute w-40 h-40 rounded-full border-2 border-indigo-200 wl-ripple-delay2" />
            </>
          )}
          <div className="relative z-10 w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg"><Antenna size={24} className="text-white" /></div>
        </div>
        <p className="text-center text-xs text-slate-500">{antennaOn ? 'Isyarat dipancarkan secara aktif ke kawasan liputan.' : 'Tiada isyarat dipancarkan - liputan terputus.'}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Antena Omnidirectional" icon={Globe}>
          <p>Memancarkan isyarat dalam <b>semua arah</b> secara mendatar (horizontal). Sesuai untuk ruang pejabat terbuka atau bilik darjah luas yang memerlukan liputan sekata ke semua arah.</p>
        </InfoCard>
        <InfoCard title="Antena Directional" icon={Antenna}>
          <p>Menumpukan pancaran isyarat ke <b>arah tertentu</b> (mendatar/menegak), contohnya antena Yagi atau parabolik. Sesuai untuk sambungan jarak jauh atau point-to-point antara dua bangunan/lokasi.</p>
        </InfoCard>
      </div>

      <NotesTable
        headers={['Aspek', 'Coverage Sebelum (Antena Dalaman)', 'Coverage Selepas (Antena Luar Gandaan Tinggi)']}
        rows={[
          ['Jarak liputan', 'Terhad kepada bilik/ruang berdekatan', 'Diperluas ke kawasan sebelum ini isyarat lemah'],
          ['Kestabilan isyarat', 'Menurun pada jarak jauh', 'Lebih kuat & stabil'],
          ['Kesesuaian', 'Ruang dalaman kecil', 'Kawasan luar bangunan, kampus, halangan fizikal'],
        ]}
      />

      <Ringkasan>
        Pilih antena <b>omnidirectional</b> untuk liputan sekata ke semua arah, atau <b>directional</b> untuk fokus isyarat jarak jauh/point-to-point. Antena luar bergandaan tinggi membantu memperluas liputan ke kawasan yang sebelum ini isyarat lemah.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 7: BONDING, MODULATION, DATA RATE ---------------- */
function BondingNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Channel Bonding" icon={Layers}>
        <p>Channel Bonding merujuk kepada proses <b>penggabungan dua saluran 20 MHz</b> menjadi satu saluran lebih lebar seperti 40 MHz, 80 MHz, atau 160 MHz (standard Wi-Fi terkini). Tujuannya menambah lebar jalur komunikasi untuk penghantaran data lebih laju.</p>
        <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
          <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-black text-slate-700">20 MHz</span>
          <ChevronRight size={16} className="text-indigo-400" />
          <span className="rounded-lg bg-indigo-100 px-3 py-2 text-xs font-black text-indigo-700">40 MHz</span>
          <ChevronRight size={16} className="text-indigo-400" />
          <span className="rounded-lg bg-indigo-200 px-4 py-2 text-xs font-black text-indigo-800">80 / 160 MHz</span>
        </div>
        <NotaPenting>
          Dalam jalur 2.4 GHz yang hanya ada 3 channel bebas gangguan (1, 6, 11), channel bonding boleh menyebabkan pertindihan dengan channel lain &rarr; interference. Ia lebih sesuai digunakan dalam jalur 5 GHz/6 GHz dengan bantuan <b>Dynamic Frequency Selection (DFS)</b>.
        </NotaPenting>
      </InfoCard>

      <InfoCard title="Modulation (Modulasi)" icon={Sliders}>
        <p>Modulasi merujuk kepada kaedah bagaimana data digital dihantar melalui gelombang radio. Teknik utama: <b>QAM (Quadrature Amplitude Modulation)</b> - menggabungkan amplitud &amp; fasa untuk hantar lebih banyak bit data setiap simbol.</p>
        <div className="grid sm:grid-cols-4 gap-2 mt-4">
          {[{ m: '16-QAM', bit: '4 bit/simbol' }, { m: '64-QAM', bit: '6 bit/simbol' }, { m: '256-QAM', bit: '~8 bit/simbol' }, { m: '1024-QAM', bit: '10 bit/simbol (Wi-Fi 6)' }].map((item) => (
            <div key={item.m} className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-center">
              <p className="font-black text-slate-900 text-sm">{item.m}</p>
              <p className="text-[11px] text-slate-500 mt-1">{item.bit}</p>
            </div>
          ))}
        </div>
        <p className="mt-3">Semakin tinggi tahap modulasi, semakin sensitif isyarat terhadap gangguan. AP dekat = modulasi tinggi (1024-QAM); AP jauh/berhalangan = modulasi diturunkan ke <b>BPSK</b> atau <b>QPSK</b> yang lebih tahan gangguan (kelajuan lebih rendah, tapi stabil).</p>
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-4">Data Rate mengikut Jarak dari AP</h4>
        <div className="flex items-center justify-between gap-2">
          {[{ label: 'Dekat AP', level: 'HIGH', pct: 100 }, { label: 'Sederhana', level: 'MEDIUM', pct: 60 }, { label: 'Jauh / Berhalangan', level: 'LOW', pct: 25 }].map((item) => (
            <div key={item.label} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full h-24 bg-slate-100 rounded-lg flex items-end overflow-hidden">
                <div className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 wl-bar" style={{ height: `${item.pct}%`, animationDuration: '2s' }} />
              </div>
              <span className="text-[10px] font-black text-slate-500">{item.level}</span>
              <span className="text-[10px] text-slate-400 text-center">{item.label}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-4 text-center">Visual pembelajaran sahaja - nilai sebenar bergantung peranti, halangan &amp; persekitaran sebenar (bukan nilai throughput rasmi).</p>
      </div>

      <Ringkasan>
        <b>Channel Bonding</b> gabungkan saluran untuk lebar jalur lebih besar (sesuai 5GHz). <b>Modulasi (QAM)</b> tentukan berapa bit dihantar setiap simbol - lebih tinggi = lebih laju tapi lebih sensitif gangguan. Sistem Wi-Fi moden secara dinamik menyesuaikan modulasi &amp; data rate mengikut kekuatan isyarat sebenar.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 8: BAND STEERING, STANDARDS, RF PROFILES ---------------- */
function StandardsNotes() {
  const standards = [
    { code: '802.11a', year: '1999', band: '5 GHz', speed: '54 Mbps' },
    { code: '802.11b', year: '1999', band: '2.4 GHz', speed: '11 Mbps' },
    { code: '802.11g', year: '2003', band: '2.4 GHz', speed: '54 Mbps' },
    { code: '802.11n', year: '2009', band: '2.4/5 GHz', speed: '600 Mbps (MIMO)' },
    { code: '802.11ac', year: '2013', band: '5 GHz', speed: '1 Gbps' },
    { code: '802.11ax', year: '2019', band: '2.4/5/6 GHz', speed: 'Wi-Fi 6, OFDMA' },
  ];
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Band Steering" icon={Repeat}>
        <p>Ciri pintar yang menguruskan penggunaan jalur frekuensi dengan lebih efisien. Band Steering menolak peranti berkeupayaan 5GHz untuk beroperasi di jalur tersebut, manakala peranti yang hanya menyokong 2.4GHz kekal di jalur 2.4GHz.</p>
        <div className="mt-4 rounded-xl bg-indigo-50 border border-indigo-200 p-4">
          <FlowRow steps={['Client', 'AP', 'Band Selection (2.4 / 5 GHz)']} />
        </div>
        <p className="mt-3">Ini mengurangkan kesesakan jalur 2.4GHz (yang sering digunakan banyak peranti), sambil membiarkan peranti berkeupayaan tinggi memanfaatkan jalur 5GHz yang lebih laju.</p>
      </InfoCard>

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4">Timeline Piawaian Wi-Fi (802.11)</h3>
        <div className="flex flex-wrap gap-3">
          {standards.map((s, i) => (
            <div key={s.code} className="wl-card wl-reveal rounded-2xl border border-slate-200 bg-white p-4 flex-1 min-w-[140px]" style={{ animationDelay: `${i * 0.08}s` }}>
              <p className="font-black text-indigo-700">{s.code}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{s.year}</p>
              <p className="text-xs text-slate-600 mt-2">{s.band}</p>
              <p className="text-xs font-bold text-slate-900 mt-1">{s.speed}</p>
            </div>
          ))}
        </div>
      </div>

      <NotesTable
        headers={['Piawaian', 'Tahun', 'Jalur', 'Kelajuan Maksimum', 'Ciri Utama']}
        rows={[
          ['802.11a', '1999', '5 GHz', '54 Mbps', 'Liputan lebih kecil'],
          ['802.11b', '1999', '2.4 GHz', '11 Mbps', 'Liputan luas, kelajuan rendah'],
          ['802.11g', '2003', '2.4 GHz', '54 Mbps', 'Serasi dengan 802.11b'],
          ['802.11n', '2009', '2.4/5 GHz', '600 Mbps', 'Teknologi MIMO'],
          ['802.11ac', '2013', '5 GHz', '1 Gbps', 'Pemadatan data efisien'],
          ['802.11ax (Wi-Fi 6)', '2019', '2.4/5/6 GHz', 'Tertinggi', 'OFDMA - sokong lebih ramai peranti serentak'],
        ]}
      />

      <InfoCard title="RF Profiles" icon={Sliders}>
        <p>RF Profiles membolehkan pentadbir rangkaian menetapkan konfigurasi RF secara tersuai (kekuatan isyarat, saluran frekuensi, pengurusan gangguan) mengikut keperluan kawasan tertentu.</p>
        <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-4">
          <FlowRow steps={['Profile', 'AP Group', 'RF Configuration']} />
        </div>
        <p className="mt-3">Contoh: kawasan pejabat terbuka perlukan liputan luas + gangguan minimum; bilik mesyuarat video conferencing perlukan kelajuan tinggi jarak dekat - setiap kawasan boleh ada profil RF berlainan.</p>
      </InfoCard>

      {/* ======= 📚 NOTA TAMBAHAN ======= */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-4 text-center font-black text-sm tracking-wide">
        📚 NOTA TAMBAHAN - SSID, Encryption, Authentication &amp; EAP
      </div>

      <InfoCard title="SSID (Service Set Identifier)" icon={BadgeCheck}>
        <p><b>SSID</b> ialah nama yang digunakan untuk mengenal pasti rangkaian Wi-Fi. AP boleh menyiarkan satu atau beberapa SSID bergantung kepada keperluan rangkaian (contohnya SSID berasingan untuk pekerja dan tetamu). SSID boleh disembunyikan untuk keselamatan tambahan, walaupun ini bukan penyelesaian keselamatan yang sempurna dengan sendirinya.</p>
      </InfoCard>

      <InfoCard title="Encryption (Penyulitan)" icon={LockKeyhole}>
        <p>Penyulitan melindungi data yang dihantar melalui rangkaian tanpa wayar daripada dibaca oleh pihak yang tidak dibenarkan. Dua piawaian utama yang dibincangkan sumber ialah <b>WPA2</b> dan <b>WPA3</b>.</p>
        <div className="grid sm:grid-cols-3 gap-3 mt-4 text-sm">
          <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-3"><b className="text-indigo-800">WPA2 Enterprise</b><p className="mt-1 text-indigo-900">Menggunakan pengesahan berpusat seperti RADIUS dan EAP.</p></div>
          <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-3"><b className="text-indigo-800">WPA3 Personal</b><p className="mt-1 text-indigo-900">Menggunakan SAE (Simultaneous Authentication of Equals) untuk meningkatkan perlindungan pengesahan.</p></div>
          <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-3"><b className="text-indigo-800">WPA3 Enterprise</b><p className="mt-1 text-indigo-900">Menggunakan RADIUS/EAP dengan ciri keselamatan yang lebih tinggi berbanding WPA2 Enterprise.</p></div>
        </div>
      </InfoCard>

      <InfoCard title="Authentication (Pengesahan)" icon={Fingerprint}>
        <p>Authentication ialah proses mengesahkan identiti pengguna atau peranti sebelum akses rangkaian diberikan. Dalam persekitaran enterprise, <b>RADIUS</b> dan <b>EAP</b> digunakan untuk pengesahan berpusat - membolehkan satu pelayan mengesahkan ramai pengguna merentasi banyak AP.</p>
      </InfoCard>

      <Ringkasan>
        <b>Band Steering</b> arah peranti ke jalur paling sesuai automatik. Piawaian Wi-Fi (802.11a&rarr;ax) berkembang dari 54 Mbps hingga Wi-Fi 6 dengan OFDMA. <b>RF Profiles</b> benarkan tetapan tersuai ikut kawasan. <b>SSID</b> mengenal pasti rangkaian, <b>Encryption (WPA2/WPA3)</b> melindungi data, dan <b>Authentication (RADIUS/EAP)</b> mengesahkan identiti sebelum akses diberi.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA TAMBAHAN: EXTENSIBLE AUTHENTICATION PROTOCOL (EAP) ---------------- */
function EapNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Apakah EAP?" icon={IdCard}>
        <p><b>Extensible Authentication Protocol (EAP)</b> ialah rangka kerja pengesahan (authentication framework) yang menyokong pelbagai kaedah pengesahan dalam rangkaian - digunakan secara meluas bersama WPA2/WPA3 Enterprise dan RADIUS untuk mengesahkan identiti pengguna/peranti sebelum akses rangkaian diberikan.</p>
      </InfoCard>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-700 mb-3"><Repeat size={19} /></div>
          <p className="font-black text-slate-900 text-sm">Fleksibiliti</p>
          <p className="text-xs text-slate-600 mt-1.5">EAP boleh menyokong pelbagai kaedah pengesahan - sijil digital, kata laluan, atau kata laluan sekali guna - bergantung kepada kaedah EAP yang digunakan.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-700 mb-3"><LockKeyhole size={19} /></div>
          <p className="font-black text-slate-900 text-sm">Encapsulation</p>
          <p className="text-xs text-slate-600 mt-1.5">EAP membolehkan maklumat pengesahan dibawa dengan selamat melalui proses enkapsulasi (dibungkus dalam mekanisme pengangkutan yang dilindungi).</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-700 mb-3"><Users size={19} /></div>
          <p className="font-black text-slate-900 text-sm">Scalability</p>
          <p className="text-xs text-slate-600 mt-1.5">Penggunaan RADIUS bersama EAP membolehkan pengesahan diurus secara berpusat - sesuai untuk rangkaian kecil hingga rangkaian besar berjumlah ramai pengguna.</p>
        </div>
      </div>

      <InfoCard title="Contoh Kaedah EAP" icon={ShieldAlert}>
        <NotesTable
          headers={['Kaedah', 'Fungsi Ringkas']}
          rows={[
            ['EAP-TLS', 'Menggunakan sijil digital untuk pengesahan - dianggap salah satu kaedah paling selamat.'],
            ['EAP-TTLS', 'Menggunakan terowong (tunnel) TLS bagi melindungi proses pengesahan.'],
            ['PEAP', 'Menggunakan terowong TLS dan boleh digunakan bersama nama pengguna serta kata laluan.'],
            ['EAP-FAST', 'Menggunakan Protected Access Credential (PAC) bagi membentuk terowong pengesahan.'],
          ]}
        />
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-4">Bagaimana EAP Berfungsi (Ringkas)</h4>
        <FlowRow steps={['Client mula sambungan', 'AP minta pengesahan', 'EAP (cth. EAP-TLS/PEAP)', 'RADIUS Server sahkan', 'Akses diberi/ditolak']} />
      </div>

      <NotaPenting>
        Kaedah EAP dipilih bergantung kepada keperluan keselamatan &amp; infrastruktur organisasi - <b>EAP-TLS</b> memerlukan sijil digital pada setiap peranti (paling selamat tetapi lebih kompleks diurus), manakala <b>PEAP</b> lebih mudah disediakan kerana boleh guna nama pengguna &amp; kata laluan sedia ada di sebalik perlindungan terowong TLS.
      </NotaPenting>

      <Ringkasan>
        EAP ialah rangka kerja pengesahan yang <b>fleksibel</b> (sokong pelbagai kaedah), menggunakan <b>enkapsulasi</b> untuk melindungi maklumat pengesahan, dan <b>boleh diskalakan</b> melalui RADIUS untuk rangkaian bersaiz kecil hingga besar. Kaedah utama: <b>EAP-TLS, EAP-TTLS, PEAP,</b> dan <b>EAP-FAST</b>.
      </Ringkasan>
    </div>
  );
}

function FlowRow({ steps }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <span className="rounded-xl bg-white border border-indigo-200 text-indigo-900 text-xs md:text-sm font-black px-3 py-2">{step}</span>
          {i < steps.length - 1 && <ChevronRight size={16} className="text-indigo-400 shrink-0" />}
        </div>
      ))}
    </div>
  );
}

/* ---------------- KUIZ ---------------- */
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
  const [activeQuestions, setActiveQuestions] = useState(() => shuffleQuestions(ikr3053QuizSets[0].questions));

  const currentSet = ikr3053QuizSets[kpIndex];
  const passScore = 18;

  const score = useMemo(() => activeQuestions.reduce((total, question, index) => total + (answers[index] === question.options.indexOf(question.correct) ? 1 : 0), 0), [answers, activeQuestions]);

  const retryLevel = () => {
    setAnswers({});
    setSubmitted(false);
    setActiveQuestions(shuffleQuestions(ikr3053QuizSets[kpIndex].questions));
  };

  const nextKp = () => {
    if (score >= passScore && kpIndex < ikr3053QuizSets.length - 1) {
      const nextIndex = kpIndex + 1;
      setHighestKp(previous => Math.max(previous, nextIndex));
      setKpIndex(nextIndex);
      setAnswers({});
      setSubmitted(false);
      setActiveQuestions(shuffleQuestions(ikr3053QuizSets[nextIndex].questions));
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
            <div className="text-xs font-black uppercase tracking-[.2em] text-indigo-700">Tahap Kuiz</div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{currentSet.code} - {currentSet.title}</h2>
            <p className="text-sm text-slate-600 mt-2">Setiap KP mengandungi 30 soalan. Lulus minimum ialah 18/30.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ikr3053QuizSets.map((item, index) => (
              <button key={item.id} disabled={index > highestKp || (index === kpIndex && submitted && score < passScore)} onClick={() => {
                if (index <= highestKp) {
                  setKpIndex(index);
                  setAnswers({});
                  setSubmitted(false);
                  setActiveQuestions(shuffleQuestions(ikr3053QuizSets[index].questions));
                }
              }} className={`rounded-full px-4 py-2 text-xs font-black border ${index === kpIndex ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300 text-slate-700'} ${index > highestKp ? 'opacity-50 cursor-not-allowed' : ''}`}>{item.code}</button>
            ))}
          </div>
        </div>
      </div>

      {submitted && (
        <div className={`rounded-2xl p-6 mb-6 text-white ${score >= passScore ? 'bg-emerald-600' : 'bg-rose-600'}`}>
          <div className="flex items-center gap-3"><Award size={34} /><div><p className="text-sm font-bold opacity-90">Keputusan {currentSet.code}</p><h2 className="text-3xl font-black">{score} / {activeQuestions.length}</h2></div></div>
          <p className="mt-3 font-medium">
            {score >= passScore
              ? `Lulus ${currentSet.code}. Anda layak ${kpIndex < ikr3053QuizSets.length - 1 ? 'naik ke ' + ikr3053QuizSets[kpIndex + 1].code : 'menamatkan semua KP'}.`
              : `Belum lulus. Markah minimum ialah 18/30 - sila ulang ${currentSet.code} sebelum naik ke tahap seterusnya.`}
          </p>
        </div>
      )}

      <div className="space-y-5">
        {activeQuestions.map((question, index) => (
          <article key={`${currentSet.id}-${index}-${question.question}`} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-black text-slate-900"><span className="text-indigo-600 mr-2">{index + 1}.</span>{question.question}</h3>
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
                    className={`text-left p-3 rounded-xl border text-sm font-medium transition-all ${correct ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : wrong ? 'border-rose-500 bg-rose-50 text-rose-800' : selected ? 'border-indigo-500 bg-indigo-50 text-indigo-800' : 'border-slate-200 hover:border-indigo-300'}`}
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
          <button disabled={Object.keys(answers).length !== activeQuestions.length} onClick={handleSubmit} className="flex-1 bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-black hover:bg-indigo-700 transition-colors">Hantar Jawapan {currentSet.code}</button>
        ) : (
          <>
            {score >= passScore && kpIndex < ikr3053QuizSets.length - 1 && (
              <button onClick={nextKp} className="flex-1 bg-emerald-600 text-white px-6 py-4 rounded-xl font-black hover:bg-emerald-700">Naik ke {ikr3053QuizSets[kpIndex + 1].code}</button>
            )}
            <button onClick={retryLevel} className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-xl font-black hover:bg-slate-800"><RotateCcw size={19} /> Cuba Semula {currentSet.code}</button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- KOMPONEN UTAMA ---------------- */
export default function IKR3053({ onBackToPortal }) {
  const [view, setView] = useState('menu');
  const [readState, setReadState] = useState(() => {
    const fallback = EMPTY_READ_STATE;
    try {
      const saved = JSON.parse(localStorage.getItem('ikr3053-read-state'));
      if (Array.isArray(saved) && saved.length === sections.length) return saved;
    } catch {
      return fallback;
    }
    return fallback;
  });

  const completedCount = readState.filter(Boolean).length;
  const progressPercent = Math.round((completedCount / sections.length) * 100);

  const resetProgress = () => {
    const fallback = EMPTY_READ_STATE;
    setReadState(fallback);
    try { localStorage.setItem('ikr3053-read-state', JSON.stringify(fallback)); } catch { /* storan tidak tersedia */ }
  };

  const backToMenu = () => { setView('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const openSection = (id) => {
    const requested = sections.findIndex((section) => section.id === id);
    if (id === 'quiz') {
      if (!readState[SECTION_COUNT - 1]) return;
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
    try { localStorage.setItem('ikr3053-read-state', JSON.stringify(nextReadState)); } catch { /* storan tidak tersedia */ }
    const nextInLine = sections[requested + 1];
    if (nextInLine) setView(nextInLine.id);
  };

  if (view !== 'menu') {
    const content = {
      intro: <IntroNotes />,
      roles: <RolesNotes />,
      architecture: <ArchitectureNotes />,
      frequency: <FrequencyNotes />,
      channel: <ChannelNotes />,
      antenna: <AntennaNotes />,
      bonding: <BondingNotes />,
      standards: <StandardsNotes />,
      eap: <EapNotes />,
      quiz: <Quiz />,
    }[view];

    const showCompleteButton = sections.some((section) => section.id === view);
    const headerMeta = sections.find((section) => section.id === view) || featureCards.find((f) => f.id === view) || sections[0];

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <WirelessAnimStyles />
        <div className="bg-slate-950 text-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Waves size={30} className="text-indigo-300" />
                <div>
                  <div className="text-[10px] uppercase tracking-[.2em] text-indigo-300 font-black">Wireless Technology</div>
                  <div className="text-sm font-black">{completedCount}/{sections.length} bahagian</div>
                </div>
              </div>
              <div className="flex-1 max-w-md">
                <div className="flex items-center justify-between text-[10px] font-black tracking-[.18em] text-indigo-200 uppercase"><span>Progress</span><span>{progressPercent}%</span></div>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-indigo-300 to-violet-300 transition-all" style={{ width: `${progressPercent}%` }} /></div>
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
        <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">IKR3053 Wireless Technology - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>
      </div>
    );
  }

  return (
    <div className="course-menu-page min-h-screen bg-slate-50 text-slate-900">
      <WirelessAnimStyles />
      <ModuleMenu title="Modul IKR3053: Wireless Technology" icon={sections[0].icon} secondaryIcon={sections[1].icon}
        onBack={onBackToPortal} topics={sections} read={readState} onTopic={section => openSection(section.id)} onReset={resetProgress}
        description={<>Wireless Access Point, senibina AP, konfigurasi RF (2.4GHz/5GHz, channel, antenna, bonding, modulasi), band steering, piawaian Wi-Fi 802.11, RF profiles, SSID/keselamatan dan EAP - dipecahkan kepada 9 bahagian, lengkap dengan kuiz 150 soalan.</>}>
        <ModuleActivities activities={featureCards} quizLocked={!readState[sections.length - 1]} onOpen={openSection} />
      </ModuleMenu>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">IKR3053 Wireless Technology - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>
    </div>
  );
}
