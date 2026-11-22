import ModuleMenu, { ModuleActivities } from './ModuleMenu';
import { useMemo, useState } from 'react';
import { ikr3133QuizSets } from './IKR3133QuizData.js';
import HeadingIcon from './headingIcons';
import {
  AlertTriangle, Award, Boxes, Check, CheckCircle, ChevronRight, CircleDot,
  Cloud, Copy, Cpu, Flame, Globe, Home, KeyRound, ListChecks, Lock, Network, RotateCcw,
  ScrollText, Server, Settings, ShieldAlert, Sparkles, Terminal, XCircle, ArrowLeft,
} from 'lucide-react';

const sections = [
  { id: 'fw-intro', title: 'Pengenalan Firewall & Dasar Asas', desc: 'Konsep firewall, 7 elemen dasar asas, dan jenis firewall mengikut fungsi (packet filtering hingga NGFW).', icon: Flame, accent: 'red' },
  { id: 'fw-hw-sw', title: 'Jenis Perkakasan & Perisian Firewall', desc: '5 jenis perkakasan (Dedicated, UTM, NGFW, Router/SOHO, Industrial) dan 5 jenis perisian firewall.', icon: Server, accent: 'orange' },
  { id: 'fw-policy', title: 'Jenis Dasar Firewall (Policies)', desc: '8 jenis dasar: Default Deny/Allow, Stateful, Packet Filtering, ACL, Application Layer, NAT, IDS/IPS.', icon: ScrollText, accent: 'amber' },
  { id: 'fw-rules', title: 'Jenis Peraturan & Kepentingan Firewall', desc: '12 jenis peraturan (Allow hingga VPN Rules), perbezaan dasar vs peraturan, dan kepentingannya.', icon: ListChecks, accent: 'red' },
  { id: 'fw-zones', title: 'Mod Rangkaian, Antara Muka & Zon Keselamatan', desc: 'Lapisan 2 vs 3, Antara Muka Dalaman/Luaran, DMZ, dan tahap keselamatan zon.', icon: Network, accent: 'orange' },
  { id: 'fw-natip', title: 'Pengurusan IP & NAT/PAT', desc: 'DHCP/ARP/ICMP/IPsec, whitelist/blacklist, dan jenis NAT (Static, Dynamic, PAT).', icon: Cpu, accent: 'amber' },
  { id: 'fw-linuxwin', title: 'Firewall Linux & Windows', desc: 'iptables, nftables, firewalld, serta Windows Defender Firewall, profil dan PowerShell.', icon: Terminal, accent: 'red' },
  { id: 'fw-deploy', title: 'Enterprise, Cloud & Open-Source Firewall', desc: 'Perbandingan Enterprise vs Cloud Firewall, dan alat CLI sumber terbuka (iptables, pf, ufw).', icon: Boxes, accent: 'orange' },
];

const featureCards = [
  { id: 'quiz', target: 'quiz', title: 'Kuiz Penilaian', desc: '120 soalan (4 KP x 30 soalan: 10 easy, 10 medium, 10 hard KBAT). Buka setelah menyelesaikan semua 8 Nota.', icon: Award, accent: 'red' },
];
const accentStyles = {
  blue: { icon: 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30', ring: 'hover:border-blue-300 hover:shadow-blue-200/60', badge: 'bg-blue-100 text-blue-700', topBar: 'from-blue-400 to-blue-600', text: 'text-blue-700', soft: 'bg-blue-50' },
  indigo: { icon: 'bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-500/30', ring: 'hover:border-indigo-300 hover:shadow-indigo-200/60', badge: 'bg-indigo-100 text-indigo-700', topBar: 'from-indigo-400 to-indigo-600', text: 'text-indigo-700', soft: 'bg-indigo-50' },
  violet: { icon: 'bg-gradient-to-br from-violet-500 to-violet-700 shadow-lg shadow-violet-500/30', ring: 'hover:border-violet-300 hover:shadow-violet-200/60', badge: 'bg-violet-100 text-violet-700', topBar: 'from-violet-400 to-violet-600', text: 'text-violet-700', soft: 'bg-violet-50' },
  teal: { icon: 'bg-gradient-to-br from-teal-500 to-teal-700 shadow-lg shadow-teal-500/30', ring: 'hover:border-teal-300 hover:shadow-teal-200/60', badge: 'bg-teal-100 text-teal-700', topBar: 'from-teal-400 to-teal-600', text: 'text-teal-700', soft: 'bg-teal-50' },
  emerald: { icon: 'bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/30', ring: 'hover:border-emerald-300 hover:shadow-emerald-200/60', badge: 'bg-emerald-100 text-emerald-700', topBar: 'from-emerald-400 to-emerald-600', text: 'text-emerald-700', soft: 'bg-emerald-50' },
  amber: { icon: 'bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg shadow-amber-500/30', ring: 'hover:border-amber-300 hover:shadow-amber-200/60', badge: 'bg-amber-100 text-amber-700', topBar: 'from-amber-400 to-amber-600', text: 'text-amber-700', soft: 'bg-amber-50' },
  orange: { icon: 'bg-gradient-to-br from-orange-500 to-orange-700 shadow-lg shadow-orange-500/30', ring: 'hover:border-orange-300 hover:shadow-orange-200/60', badge: 'bg-orange-100 text-orange-700', topBar: 'from-orange-400 to-orange-600', text: 'text-orange-700', soft: 'bg-orange-50' },
  red: { icon: 'bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-500/30', ring: 'hover:border-red-300 hover:shadow-red-200/60', badge: 'bg-red-100 text-red-700', topBar: 'from-red-400 to-red-600', text: 'text-red-700', soft: 'bg-red-50' },
};


/* Animasi CSS - KHUSUS modul Network Operating System (LED terminal berkelip) */
function FwAnimStyles() {
  return (
    <style>{`
      @keyframes imsBlink { 0%, 100% { opacity: 1; } 50% { opacity: .25; } }
      @keyframes imsSpin { to { transform: rotate(360deg); } }
      @keyframes imsFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes imsScaleIn { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: scale(1); } }
      @keyframes imsBarPulse { 0%, 100% { opacity: .5; } 50% { opacity: 1; } }
      .fw-blink { animation: imsBlink 1.4s ease-in-out infinite; }
      .fw-blink-delay { animation: imsBlink 1.4s ease-in-out infinite; animation-delay: .5s; }
      .fw-fan { animation: imsSpin 2.5s linear infinite; transform-origin: center; }
      .fw-fan-fast { animation: imsSpin 1s linear infinite; transform-origin: center; }
      .fw-entry-title { animation: imsFadeUp .5s ease-out both; }
      .fw-entry-icon { animation: imsScaleIn .45s ease-out both; }
      .fw-entry-subtitle { animation: imsFadeUp .5s ease-out .1s both; }
      .fw-reveal { animation: imsFadeUp .5s ease-out both; }
      .fw-reveal-1{animation-delay:.05s}.fw-reveal-2{animation-delay:.1s}.fw-reveal-3{animation-delay:.15s}
      .fw-reveal-4{animation-delay:.2s}.fw-reveal-5{animation-delay:.25s}.fw-reveal-6{animation-delay:.3s}
      .fw-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
      .fw-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(225,29,72,.25); border-color: #fda4af; }
      .fw-card:hover .fw-card-icon { animation: imsScaleIn .3s ease-out; }
      .fw-bar-pulse { animation: imsBarPulse 1.6s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce) {
        .fw-blink, .fw-blink-delay, .fw-fan, .fw-fan-fast, .fw-entry-title, .fw-entry-icon,
        .fw-entry-subtitle, .fw-reveal, .fw-card, .fw-bar-pulse { animation: none !important; transition: none !important; }
        .fw-card:hover { transform: none; }
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
          <div className={`p-3 rounded-2xl border border-white/15 ${style.icon} fw-entry-icon`}><Icon size={28} className="text-white" /></div>
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight fw-entry-title">{title}</h1>
            <p className="text-slate-300 mt-2 max-w-3xl text-sm md:text-base fw-entry-subtitle">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, children, icon: Icon = CircleDot }) {
  return (
    <article className="fw-card fw-reveal bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
      <h3 className="font-black text-slate-900 text-lg flex items-center gap-2 mb-3"><Icon size={20} className="fw-card-icon text-red-600" /> {title}</h3>
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
      <ListChecks size={22} className="text-red-300 shrink-0 mt-0.5" />
      <div><p className="text-xs font-black uppercase tracking-wide text-red-300 mb-1">Ringkasan</p><div className="text-sm text-slate-100 leading-relaxed">{children}</div></div>
    </div>
  );
}

function NotesTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm">
        <thead><tr className="bg-red-50 text-red-900">{headers.map((h) => <th key={h} className="text-left font-black p-3 md:p-4">{h}</th>)}</tr></thead>
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
function Code({ title, lines, prompt = true }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      const clean = lines.map((l) => (l.startsWith('~') ? l.slice(1) : l));
      await navigator.clipboard.writeText(prompt ? clean.filter((l) => !l.startsWith('#')).join('\n') : clean.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-sm">
      <div className="flex items-center justify-between gap-3 px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex gap-1.5 shrink-0"><i className="w-2.5 h-2.5 rounded-full bg-red-400/80" /><i className="w-2.5 h-2.5 rounded-full bg-amber-400/80" /><i className="w-2.5 h-2.5 rounded-full bg-green-400/80" /></span>
          <span className="text-[11px] font-bold text-slate-400 truncate">{title}</span>
        </div>
        <button type="button" onClick={copy} aria-label={`Salin ${title}`} className="inline-flex items-center gap-1 text-[11px] font-black text-slate-300 hover:text-white min-h-[28px] px-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400">
          {copied ? <><Check size={13} className="text-red-400" /> Disalin</> : <><Copy size={13} /> Salin</>}
        </button>
      </div>
      <pre className="p-4 text-[12.5px] leading-relaxed overflow-x-auto font-mono text-slate-100">
        {lines.map((l, i) => {
          const noPrompt = l.startsWith('~');
          const text = noPrompt ? l.slice(1) : l;
          return (
            <div key={i} className={text.startsWith('#') ? 'text-slate-500' : ''}>
              {prompt && !noPrompt && !text.startsWith('#') && <span className="text-red-400 select-none">$ </span>}{text || ' '}
            </div>
          );
        })}
      </pre>
    </div>
  );
}

/* Langkah bernombor untuk preddur */

/* Tab kecil di dalam satu nota (Konfigurasi / Pengujian / Penyelenggaraan) */
function SubTabs({ tabs }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2 mb-6">
        {tabs.map((t, i) => (
          <button key={t.label} role="tab" aria-selected={active === i} onClick={() => setActive(i)} className={`min-h-[44px] px-4 rounded-full text-xs md:text-sm font-black border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500 ${active === i ? 'bg-red-600 border-red-600 text-white' : 'bg-white border-slate-300 text-slate-700 hover:border-red-400'}`}>{t.label}</button>
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

/* Ikon hero animasi - api berdenyut untuk "firewall" */
function FlameIcon({ size = 96 }) {
  return (
    <div className="relative flex items-center justify-center rounded-2xl bg-slate-900 border border-white/10" style={{ width: size, height: size }}>
      <Flame size={size * 0.5} className="text-red-300" />
      <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-400 fw-blink" />
      <span className="absolute top-3 right-6 w-2 h-2 rounded-full bg-orange-300 fw-blink-delay" />
    </div>
  );
}

/* Rajah aliran paket melalui firewall - stepper interaktif */
function PacketFlowDiagram() {
  const [step, setStep] = useState(0);
  const steps = [
    { verdict: null, text: 'Paket data tiba di firewall daripada rangkaian luar (internet), membawa maklumat header: alamat IP sumber/destinasi, port dan protokol.' },
    { verdict: null, text: 'Firewall memeriksa paket berdasarkan dasar dan peraturan yang ditetapkan - alamat IP, nombor port, protokol, dan (bagi firewall lanjutan) keadaan sambungan atau kandungan aplikasi.' },
    { verdict: 'allow', text: 'Jika paket memenuhi kriteria yang dibenarkan (Allow Rule), ia diteruskan ke rangkaian dalaman atau pelayan destinasi.' },
    { verdict: 'deny', text: 'Jika paket tidak memenuhi kriteria, ia disekat. Bergantung jenis peraturan: Deny/Reject menghantar maklum balas penolakan, manakala Drop membuang paket tanpa sebarang respons kepada penghantar.' },
  ];
  const cur = steps[step];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h4 className="font-black text-slate-900 flex items-center gap-2"><HeadingIcon text={"Aliran Paket Melalui Firewall (interaktif)"} className="text-red-600 shrink-0" size={18} />Aliran Paket Melalui Firewall (interaktif)</h4>
        <span className="text-xs font-black text-red-700 bg-red-50 rounded-full px-3 py-1">Langkah {step + 1} / {steps.length}</span>
      </div>
      <svg viewBox="0 0 620 180" className="w-full max-w-2xl mx-auto" role="img" aria-label="Rajah aliran paket daripada internet melalui firewall ke rangkaian dalaman">
        <defs><marker id="pfArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill={cur.verdict === 'deny' ? '#dc2626' : '#16a34a'} /></marker></defs>
        <rect x="10" y="60" width="110" height="56" rx="12" fill="#0f172a" /><text x="65" y="92" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="800">Internet</text>
        <rect x="255" y="55" width="110" height="66" rx="12" fill={step >= 1 ? '#dc2626' : '#334155'} /><text x="310" y="83" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="800">Firewall</text><text x="310" y="99" textAnchor="middle" fill="#fecaca" fontSize="10">semak dasar</text>
        <rect x="500" y="60" width="110" height="56" rx="12" fill="#0f172a" /><text x="555" y="92" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="800">Rangkaian Dalaman</text>
        <line x1="120" y1="88" x2="253" y2="88" stroke={step >= 0 ? '#94a3b8' : '#e2e8f0'} strokeWidth="3" markerEnd="url(#pfArrow)" />
        {step >= 2 && cur.verdict === 'allow' && <line x1="365" y1="88" x2="498" y2="88" stroke="#16a34a" strokeWidth="3" markerEnd="url(#pfArrow)" />}
        {step >= 2 && cur.verdict === 'deny' && <text x="430" y="83" textAnchor="middle" fontSize="20" fill="#dc2626">✕</text>}
      </svg>
      <p className="text-sm text-slate-700 bg-slate-50 rounded-xl border border-slate-200 p-3 mt-3 min-h-[64px]" aria-live="polite">{cur.text}</p>
      <div className="flex gap-2 mt-3 flex-wrap">
        <button type="button" disabled={step === 0} onClick={() => setStep(step - 1)} className="min-h-[44px] px-4 rounded-xl border border-slate-300 text-sm font-black text-slate-700 disabled:opacity-40 hover:border-red-400">Sebelum</button>
        <button type="button" disabled={step === steps.length - 1} onClick={() => setStep(step + 1)} className="min-h-[44px] px-4 rounded-xl bg-red-600 text-white text-sm font-black disabled:opacity-40 hover:bg-red-700">Seterusnya</button>
        <button type="button" onClick={() => setStep(0)} className="min-h-[44px] px-4 rounded-xl text-sm font-black text-slate-500 hover:text-slate-800 inline-flex items-center gap-1"><RotateCcw size={14} /> Ulang</button>
      </div>
    </div>
  );
}

/* Rajah topologi DMZ - dua firewall, tiga zon */
function DmzDiagram() {
  const [zone, setZone] = useState('dmz');
  const zones = {
    internal: { label: 'Zon Dalaman', level: 'Tahap Keselamatan: Sangat Tinggi', text: 'Rangkaian dipercayai organisasi (komputer pekerja, pangkalan data). Penapisan ketat, pengesahan berbilang faktor dan penyulitan end-to-end.' },
    dmz: { label: 'Zon DMZ', level: 'Tahap Keselamatan: Sederhana', text: 'Zon penampan antara luar dan dalam. Menempatkan pelayan yang perlu diakses awam - web, e-mel, DNS, FTP - tanpa memberi laluan terus ke rangkaian dalaman.' },
    external: { label: 'Zon Luaran', level: 'Tahap Keselamatan: Rendah', text: 'Internet / rangkaian tidak dipercayai. Semua trafik masuk dipantau dan ditapis; tiada akses langsung ke rangkaian dalaman.' },
  };
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2"><HeadingIcon text={"Topologi DMZ - Firewall Dua Peringkat (interaktif)"} className="text-red-600 shrink-0" size={18} />Topologi DMZ - Firewall Dua Peringkat (interaktif)</h4>
      <svg viewBox="0 0 640 160" className="w-full max-w-2xl mx-auto" role="img" aria-label="Rajah topologi DMZ dengan zon luaran, firewall, DMZ, firewall kedua, dan zon dalaman">
        <rect x="10" y="55" width="90" height="50" rx="10" fill={zone === 'external' ? '#dc2626' : '#0f172a'} className="cursor-pointer" onClick={() => setZone('external')} />
        <text x="55" y="84" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="800" className="cursor-pointer" onClick={() => setZone('external')}>Internet</text>
        <rect x="150" y="50" width="16" height="60" rx="3" fill="#f97316" />
        <rect x="235" y="45" width="150" height="70" rx="10" fill={zone === 'dmz' ? '#dc2626' : '#7c2d12'} className="cursor-pointer" onClick={() => setZone('dmz')} />
        <text x="310" y="76" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="800" className="cursor-pointer" onClick={() => setZone('dmz')}>DMZ</text>
        <text x="310" y="92" textAnchor="middle" fill="#fed7aa" fontSize="9" className="cursor-pointer" onClick={() => setZone('dmz')}>web / mel / DNS</text>
        <rect x="455" y="50" width="16" height="60" rx="3" fill="#f97316" />
        <rect x="530" y="55" width="100" height="50" rx="10" fill={zone === 'internal' ? '#dc2626' : '#0f172a'} className="cursor-pointer" onClick={() => setZone('internal')} />
        <text x="580" y="84" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="800" className="cursor-pointer" onClick={() => setZone('internal')}>Dalaman</text>
        <text x="158" y="35" textAnchor="middle" fontSize="9" fill="#94a3b8">Firewall 1</text>
        <text x="463" y="35" textAnchor="middle" fontSize="9" fill="#94a3b8">Firewall 2</text>
      </svg>
      <p className="text-xs text-center text-slate-400 -mt-2 mb-2">(klik satu zon untuk butiran)</p>
      <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
        <p className="font-black text-slate-900 text-sm">{zones[zone].label} <span className="ml-2 text-[10px] font-bold text-red-700 bg-red-100 rounded-full px-2 py-0.5">{zones[zone].level}</span></p>
        <p className="text-sm text-slate-700 mt-1.5">{zones[zone].text}</p>
      </div>
    </div>
  );
}

/* Rajah perbandingan Lapisan 2 vs Lapisan 3 */
function LayerCompareDiagram() {
  const [layer, setLayer] = useState(2);
  const data = {
    2: { title: 'Mod Lapisan 2 (Data Link Layer)', filter: 'Alamat MAC', scope: 'Dalam satu LAN / rangkaian tempatan sahaja', pro: 'Cepat dan efisien, mudah dilaksana', con: 'Terhad kepada rangkaian tempatan sahaja' },
    3: { title: 'Mod Lapisan 3 (Network Layer)', filter: 'Alamat IP dan protokol (TCP/UDP/ICMP)', scope: 'Antara rangkaian berbeza (internet, dalaman-luaran)', pro: 'Lebih fleksibel, mengawal trafik antara rangkaian berbeza', con: 'Lebih perlahan, konfigurasi lebih kompleks' },
  };
  const d = data[layer];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2"><HeadingIcon text={"Mod Firewall: Lapisan 2 vs Lapisan 3"} className="text-red-600 shrink-0" size={18} />Mod Firewall: Lapisan 2 vs Lapisan 3</h4>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setLayer(2)} className={`min-h-[40px] px-4 rounded-full text-sm font-black border ${layer === 2 ? 'bg-red-600 border-red-600 text-white' : 'bg-white border-slate-300 text-slate-700 hover:border-red-400'}`}>Lapisan 2</button>
        <button onClick={() => setLayer(3)} className={`min-h-[40px] px-4 rounded-full text-sm font-black border ${layer === 3 ? 'bg-red-600 border-red-600 text-white' : 'bg-white border-slate-300 text-slate-700 hover:border-red-400'}`}>Lapisan 3</button>
      </div>
      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
        <p className="font-black text-slate-900 text-sm mb-2">{d.title}</p>
        <dl className="space-y-1.5 text-sm text-slate-700">
          <div><dt className="inline font-bold">Data disaring: </dt><dd className="inline">{d.filter}</dd></div>
          <div><dt className="inline font-bold">Skop: </dt><dd className="inline">{d.scope}</dd></div>
          <div><dt className="inline font-bold text-emerald-700">Kelebihan: </dt><dd className="inline">{d.pro}</dd></div>
          <div><dt className="inline font-bold text-red-700">Kekurangan: </dt><dd className="inline">{d.con}</dd></div>
        </dl>
      </div>
    </div>
  );
}

/* Rajah NAT/PAT - peta alamat dalaman ke awam */
function NatDiagram() {
  const [mode, setMode] = useState('static');
  const rows = {
    static: [['192.168.1.10', '203.0.113.5', '- (tetap)']],
    dynamic: [['192.168.1.10', '203.0.113.5', '-'], ['192.168.1.11', '203.0.113.6', '-'], ['192.168.1.12', '203.0.113.7', '-']],
    pat: [['192.168.1.10', '203.0.113.5', ':40001'], ['192.168.1.11', '203.0.113.5', ':40002'], ['192.168.1.12', '203.0.113.5', ':40003']],
  };
  const desc = {
    static: 'Static NAT: satu IP dalaman dipetakan secara tetap kepada satu IP awam. Sesuai untuk pelayan yang perlu diakses terus dari internet (cth. pelayan web).',
    dynamic: 'Dynamic NAT: IP dalaman dipetakan kepada IP awam daripada satu kumpulan (pool); IP awam yang diberi boleh berubah setiap sambungan.',
    pat: 'PAT (Port Address Translation / NAT Overloading): banyak IP dalaman berkongsi SATU IP awam, dibezakan melalui nombor port yang unik bagi setiap sambungan.',
  };
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2"><HeadingIcon text={"Jenis NAT (interaktif)"} className="text-red-600 shrink-0" size={18} />Jenis NAT (interaktif)</h4>
      <div className="flex gap-2 mb-4 flex-wrap">
        {[['static', 'Static NAT'], ['dynamic', 'Dynamic NAT'], ['pat', 'PAT / NAT Overloading']].map(([k, l]) => (
          <button key={k} onClick={() => setMode(k)} className={`min-h-[40px] px-4 rounded-full text-xs md:text-sm font-black border ${mode === k ? 'bg-red-600 border-red-600 text-white' : 'bg-white border-slate-300 text-slate-700 hover:border-red-400'}`}>{l}</button>
        ))}
      </div>
      <table className="w-full text-sm border-collapse mb-3">
        <thead><tr className="bg-red-50 text-red-800"><th className="text-left p-2 rounded-l-lg">IP Dalaman (Private)</th><th className="text-left p-2">IP Awam (Public)</th><th className="text-left p-2 rounded-r-lg">Port</th></tr></thead>
        <tbody>{rows[mode].map((r, i) => (<tr key={i} className="border-b border-slate-100"><td className="p-2 font-mono">{r[0]}</td><td className="p-2 font-mono">{r[1]}</td><td className="p-2 font-mono text-slate-500">{r[2]}</td></tr>))}</tbody>
      </table>
      <p className="text-sm text-slate-700 bg-slate-50 rounded-xl border border-slate-200 p-3">{desc[mode]}</p>
    </div>
  );
}

/* Rajah iptables chains (INPUT/OUTPUT/FORWARD) */
function IptablesChainsDiagram() {
  const chains = [
    { name: 'INPUT', d: 'Trafik yang masuk DITUJUKAN kepada sistem itu sendiri.', color: 'bg-red-600' },
    { name: 'OUTPUT', d: 'Trafik yang KELUAR daripada sistem itu sendiri.', color: 'bg-orange-600' },
    { name: 'FORWARD', d: 'Trafik yang melalui sistem tetapi tidak ditujukan untuknya - contohnya trafik yang dihalakan semula melalui router.', color: 'bg-amber-600' },
  ];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2"><HeadingIcon text={"Tiga Chain Utama iptables/nftables"} className="text-red-600 shrink-0" size={18} />Tiga Chain Utama iptables/nftables</h4>
      <div className="grid sm:grid-cols-3 gap-3">
        {chains.map((c) => (
          <div key={c.name} className="rounded-xl border border-slate-200 overflow-hidden">
            <div className={`${c.color} text-white font-black text-sm px-3 py-2`}>{c.name}</div>
            <p className="text-xs text-slate-700 p-3">{c.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- NOTA 1: PENGENALAN FIREWALL & DASAR ASAS ---------------- */
function FwIntroNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Apakah Firewall?" icon={Flame}>
        <p>Tembok Api (Firewall) ialah sistem keselamatan yang melindungi rangkaian komputer daripada ancaman luar dengan mengawal trafik data masuk dan keluar berdasarkan peraturan yang ditetapkan. Ia bertindak sebagai penghalang antara rangkaian dalaman yang dipercayai dengan rangkaian luaran yang tidak diketahui, seperti internet - membantu mencegah akses tidak sah, serangan siber dan kecurian data.</p>
        <p className="mt-3">Firewall rangkaian menggunakan peraturan atau polisi untuk menentukan trafik yang dibenarkan atau disekat berdasarkan <b>alamat IP, port</b> dan <b>protokol</b>, serta boleh mengesan dan mencegah pencerobohan, virus dan malware.</p>
      </InfoCard>

      <PacketFlowDiagram />

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"Asas Dasar Firewall (7 Elemen)"} className="text-red-600 shrink-0" size={20} />Asas Dasar Firewall (7 Elemen)</h3>
        <NotesTable headers={['Elemen', 'Fungsi', 'Contoh']} rows={[
          ['Kawalan Akses (Access Control)', 'Menentukan siapa dibenarkan mengakses rangkaian berdasarkan IP, protokol, port', 'Benarkan akses hanya dari IP tertentu ke server'],
          ['Penapisan Trafik (Traffic Filtering)', 'Memantau & menapis supaya hanya data sah dan dibenarkan melintasi firewall', 'Halang trafik daripada IP yang diketahui terlibat serangan siber'],
          ['Pencegahan Pencerobohan (Intrusion Prevention)', 'Guna IPS untuk kenal pasti & cegah serangan serta-merta', 'Sekat percubaan serangan DDoS'],
          ['Pengesanan & Pemantauan (Monitoring and Logging)', 'Rekod semua aktiviti rangkaian untuk audit', 'Rekod setiap sambungan untuk semak anomali'],
          ['Pengesahan & Penyulitan (Authentication and Encryption)', 'Sulitkan data & sahkan identiti pengguna', 'VPN untuk sambungan terenkripsi pengguna luar'],
          ['Dasar Trafik Masuk/Keluar (Inbound/Outbound Rules)', 'Tetapkan peraturan berasingan; trafik masuk lebih berisiko', 'Sekat port 23 (Telnet) yang tidak digunakan'],
          ['Dasar Laporan & Analisis (Reporting and Analysis)', 'Laporkan kejadian keselamatan & analisis trafik mencurigakan', 'Laporan mingguan kejadian yang disekat firewall'],
        ]} />
      </div>

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"Jenis Firewall Mengikut Fungsi"} className="text-red-600 shrink-0" size={20} />Jenis Firewall Mengikut Fungsi</h3>
        <NotesTable headers={['Jenis', 'Cara Berfungsi', 'Kelebihan', 'Kekurangan']} rows={[
          ['Packet Filtering', 'Tapis paket ikut IP, port, protokol tanpa periksa kandungan', 'Cepat & ringan; sesuai rangkaian kecil', 'Keselamatan rendah; mudah kena spoofing'],
          ['Stateful Inspection', 'Periksa header + status/keadaan sesi sambungan', 'Lebih selamat; kurangkan risiko MITM', 'Guna lebih sumber; masih tak semak kandungan'],
          ['Application Layer / Proxy', 'Beroperasi di lapisan aplikasi (HTTP, FTP, SMTP); bertindak sebagai proxy', 'Semak mendalam; sekat SQL injection/XSS', 'Lebih perlahan; tak sokong semua aplikasi'],
          ['Next-Generation Firewall (NGFW)', 'Gabung firewall tradisional + IPS + DPI + antivirus + VPN', 'Keselamatan sangat tinggi; kawalan ikut aplikasi/pengguna', 'Mahal; kompleks dikonfigurasi'],
          ['Cloud Firewall (FWaaS)', 'Beroperasi di awan, dikonfigurasi melalui portal web', 'Skalabiliti tinggi; urus jarak jauh', 'Bergantung sambungan internet; kurang kawalan'],
          ['Hardware Firewall', 'Peranti fizikal di sempadan rangkaian', 'Sesuai trafik tinggi; stabil', 'Kos permulaan tinggi; kurang fleksibel'],
          ['Software Firewall', 'Aplikasi dipasang pada komputer/pelayan individu', 'Kos rendah; mudah dipasang', 'Bebankan sumber sistem; tak sesuai trafik besar'],
        ]} />
      </div>

      <NotaPenting>Packet Filtering dan Stateful Inspection beroperasi pada tahap rangkaian (IP/port/sesi) sahaja. Application Layer/Proxy dan NGFW pula turut memeriksa <b>kandungan</b> data pada lapisan aplikasi - itulah sebabnya keduanya boleh menyekat serangan seperti SQL injection dan XSS yang tidak dapat dikesan oleh packet filtering.</NotaPenting>

      <Latihan items={['Terangkan fungsi utama firewall dalam sistem keselamatan rangkaian komputer.', 'Huraikan bagaimana firewall penapisan paket (packet filtering firewall) berfungsi dalam menapis lalu lintas data.', 'Mengapa penggunaan firewall sahaja tidak mencukupi untuk melindungi keseluruhan sistem rangkaian? Berikan alasan dan contoh.']} />
      <Ringkasan>Firewall mengawal trafik masuk/keluar berdasarkan <b>7 elemen dasar</b> (access control, traffic filtering, IPS, monitoring, authentication, inbound/outbound rules, reporting). Mengikut fungsi, firewall terbahagi kepada <b>7 jenis</b>: packet filtering, stateful inspection, application layer/proxy, NGFW, cloud, hardware dan software - masing-masing dengan tahap keselamatan dan prestasi berbeza.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 2: JENIS PERKAKASAN & PERISIAN FIREWALL ---------------- */
function FwHwSwNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Perkakasan vs Perisian Firewall" icon={Server}>
        <p>Selain diklasifikasikan mengikut fungsi (Nota 1), firewall turut dikategorikan mengikut bentuk pelaksanaannya - sebagai peranti fizikal (perkakasan) atau aplikasi yang dipasang pada sistem (perisian). Pemilihan bergantung kepada saiz organisasi, bajet dan keperluan keselamatan.</p>
      </InfoCard>

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"Jenis Perkakasan Firewall"} className="text-red-600 shrink-0" size={20} />Jenis Perkakasan Firewall</h3>
        <NotesTable headers={['Jenis', 'Ciri', 'Sesuai Untuk']} rows={[
          ['Dedicated Hardware Firewall', 'Peranti khas dengan OS & perkakasan sendiri (CPU, RAM, port); prestasi tinggi, stabil, sokong NAT/VPN/IDS-IPS penuh', 'Syarikat korporat, pusat data, institusi kerajaan'],
          ['UTM (Unified Threat Management) Appliance', 'Gabungan firewall + antivirus + antispam + VPN + IDS/IPS + penapisan web dalam satu kotak', 'Sekolah, kolej, pejabat kerajaan kecil, syarikat sederhana'],
          ['NGFW Appliance', 'Kenal pasti aplikasi walaupun guna port biasa; kaitkan trafik dengan identiti pengguna (AD); threat intelligence masa nyata', 'Bank, syarikat IT, institusi sensitif'],
          ['Router/Firewall Pejabat-Rumah', 'Router/modem dengan basic stateful firewall terbina; murah & plug-and-play', 'Pengguna rumah, SOHO (Small Office Home Office)'],
          ['Industrial/Embedded Firewall', 'Direka tahan haba/getaran/debu; sokong protokol industri (Modbus, DNP3); lindungi PLC/SCADA', 'Loji jana kuasa, kilang automasi, pengangkutan pintar'],
        ]} />
      </div>

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"Jenis Perisian Firewall"} className="text-red-600 shrink-0" size={20} />Jenis Perisian Firewall</h3>
        <NotesTable headers={['Jenis', 'Ciri', 'Tahap Kesukaran']} rows={[
          ['Host-Based Firewall', 'Dipasang terus pada peranti pengguna (PC/laptop); lindungi peranti itu sahaja; GUI mesra pengguna', 'Rendah'],
          ['Server-Based Firewall', 'Dipasang dalam OS pelayan; kawal akses HTTP/SSH/FTP; konfigurasi fleksibel (CLI)', 'Sederhana-Tinggi'],
          ['Cloud-Based Firewall / FWaaS', 'Dihoskan di awan, dikawal melalui portal web; tapis trafik global dengan AI', 'Sederhana'],
          ['Virtual Firewall', 'Berjalan dalam mesin maya (VMware/Hyper-V/KVM); lindungi trafik East-West antara VM', 'Tinggi'],
          ['Open Source Firewall', 'Percuma & boleh diubah suai; sesuai gateway/VPN server/IDS-IPS; perlu skrip/konfigurasi', 'Sederhana-Tinggi'],
        ]} />
      </div>

      <NotaPenting>Software Firewall (Nota 1) merujuk kepada kategori luas "dipasang sebagai aplikasi", manakala jadual perisian di atas memecahkannya lebih terperinci mengikut <b>di mana</b> ia dipasang - peranti pengguna (Host-Based), pelayan (Server-Based), awan (Cloud-Based/FWaaS), mesin maya (Virtual) atau sebagai projek sumber terbuka.</NotaPenting>

      <Latihan items={['Firewall yang berfungsi dengan menapis paket berdasarkan alamat IP, nombor port, dan protokol dikenali sebagai __________.', 'Firewall yang digunakan untuk melindungi seluruh rangkaian organisasi biasanya dikenali sebagai _________ firewall.']} />
      <Ringkasan>Perkakasan firewall merangkumi <b>5 jenis</b>: Dedicated Hardware, UTM, NGFW Appliance, Router/SOHO, dan Industrial/Embedded - dari yang paling asas (rumah) hingga paling khusus (kilang). Perisian firewall pula merangkumi <b>5 jenis</b>: Host-Based, Server-Based, Cloud-Based/FWaaS, Virtual, dan Open Source - dipilih mengikut lokasi pemasangan dan tahap kawalan yang diperlukan.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 3: JENIS DASAR FIREWALL (POLICIES) ---------------- */
function FwPolicyNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Dasar dan Peraturan Firewall" icon={ScrollText}>
        <p>Dasar (policy) dan peraturan (rule) firewall adalah sekumpulan polisi yang mengawal akses dan melindungi rangkaian daripada ancaman luar dan dalam, berdasarkan kriteria seperti alamat IP, protokol, port dan jenis aplikasi. Terdapat 8 jenis dasar (policies) utama firewall.</p>
      </InfoCard>

      <NotesTable headers={['Dasar', 'Cara Berfungsi', 'Kelebihan', 'Kekurangan']} rows={[
        ['Default Deny (Implicit Deny)', 'Tolak semua trafik yang tidak dinyatakan secara eksplisit', 'Sangat ketat; risiko serangan diminimumkan', 'Perlu pengurusan teliti; kesilapan boleh sekat trafik sah'],
        ['Default Allow', 'Benarkan semua trafik kecuali yang dinyatakan ditolak', 'Mudah ditubuhkan', 'Kurang selamat; trafik berbahaya boleh lepas jika tiada peraturan tolak'],
        ['Stateful Inspection', 'Periksa header + status/keadaan sambungan aktif', 'Lebih pintar & efisien; minimumkan risiko serangan', 'Bebankan sumber sistem'],
        ['Packet Filtering', 'Tapis ikut IP sumber/destinasi, protokol, port (paling asas)', 'Mudah dilaksana; cukup untuk persekitaran terkawal', 'Kurang pintar; spoofing/DoS masih boleh lulus'],
        ['Access Control Lists (ACL)', 'Senarai peraturan pada firewall/router ikut IP, protokol, port, jenis sambungan', 'Fleksibel; meluas digunakan dalam rangkaian perniagaan', 'Perlu penyusunan teliti; salah susun boleh halang trafik sah'],
        ['Application Layer Policies', 'Tapis ikut aplikasi tertentu (HTTP, FTP, DNS) pada lapisan OSI aplikasi', 'Kawalan terperinci; cegah SQL injection/XSS', 'Perlu lebih sumber & pemahaman aplikasi'],
        ['NAT Policies', 'Terjemah alamat IP dalam paket masuk/keluar', 'Sembunyikan IP dalaman; urus IP lebih cekap', 'Aplikasi tertentu (VoIP/P2P) mungkin bermasalah'],
        ['IDS/IPS Policies', 'Kesan (IDS) atau halang (IPS) serangan yang dikenali', 'Lapisan perlindungan kuat terhadap ancaman kompleks', 'Boleh hasilkan "false positives"'],
      ]} />

      <NotaPenting>Ramai dasar di sini bertindih dengan "jenis firewall mengikut fungsi" (Nota 1) - contohnya Stateful Inspection dan Packet Filtering muncul di kedua-dua tempat. Perbezaannya: Nota 1 menerangkan jenis <b>firewall</b> (peranti/perisian), manakala di sini ia dilihat sebagai jenis <b>dasar (policy)</b> yang boleh digabungkan dalam satu firewall yang sama.</NotaPenting>

      <InfoCard title="Amalan Terbaik" icon={CheckCircle}>
        <p>Gabungan beberapa jenis dasar digunakan untuk perlindungan menyeluruh - contohnya menggabungkan <b>Default Deny</b> dengan <b>Stateful Inspection, ACL</b> dan <b>IDS/IPS</b> memberi perlindungan yang lebih kuat dan komprehensif berbanding hanya menggunakan satu dasar sahaja.</p>
      </InfoCard>

      <Latihan items={['Terangkan fungsi utama firewall dalam sistem keselamatan rangkaian komputer.', 'Sebutkan dua maklumat yang digunakan oleh firewall untuk menapis trafik.']} />
      <Ringkasan>Terdapat <b>8 jenis dasar firewall</b>: Default Deny, Default Allow, Stateful Inspection, Packet Filtering, ACL, Application Layer, NAT dan IDS/IPS Policies. Dasar yang lebih ketat (Default Deny) memberi keselamatan tertinggi tetapi memerlukan pengurusan paling teliti; gabungan beberapa dasar memberi perlindungan paling menyeluruh.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 4: JENIS PERATURAN & KEPENTINGAN FIREWALL ---------------- */
function FwRulesNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Peraturan (Rules) Firewall" icon={ListChecks}>
        <p>Jika dasar (policy) menetapkan hala tuju umum, peraturan (rule) pula ialah langkah teknikal spesifik yang melaksanakan dasar tersebut - menentukan syarat dan tindakan terhadap trafik yang masuk atau keluar. Terdapat 12 jenis peraturan utama.</p>
      </InfoCard>

      <NotesTable headers={['#', 'Peraturan', 'Fungsi Ringkas']} rows={[
        ['i', 'Allow Rules', 'Benarkan trafik masuk/keluar ikut kriteria (IP, port, protokol) tertentu'],
        ['ii', 'Deny Rules', 'Sekat trafik ikut kriteria; penghantar TIDAK menerima maklum balas'],
        ['iii', 'Drop Rules', 'Buang trafik TANPA sebarang maklum balas - penyerang tak tahu disekat'],
        ['iv', 'Reject Rules', 'Tolak trafik DENGAN maklum balas jelas kepada penghantar (untuk diagnostik)'],
        ['v', 'Stateful Rules', 'Benarkan trafik hanya jika ia sebahagian sambungan sah yang sedang wujud'],
        ['vi', 'Logging Rules', 'Rekod trafik yang memenuhi kriteria untuk analisis/siasatan kemudian'],
        ['vii', 'NAT Rules', 'Terjemah alamat IP dalaman↔awam; sembunyikan IP dalaman'],
        ['viii', 'Port Forwarding Rules', 'Alihkan trafik dari satu port firewall ke port lain dalam rangkaian dalaman'],
        ['ix', 'IDS/IPS Rules', 'Kesan/halang serangan dikenali dalam trafik rangkaian'],
        ['x', 'Time-Based Rules', 'Kawal akses ikut masa/tempoh tertentu sahaja'],
        ['xi', 'QoS Rules', 'Utamakan jenis trafik tertentu (VoIP, video streaming) berbanding yang lain'],
        ['xii', 'VPN Rules', 'Kawal akses melalui sambungan VPN; komunikasi dilindungi enkripsi'],
      ]} />

      <NotaPenting>Beza <b>Drop</b> vs <b>Reject</b> vs <b>Deny</b>: Drop membuang paket secara senyap (penyerang tak tahu port disekat - lebih sukar diimbas); Reject menghantar mesej ralat jelas (berguna untuk diagnostik tetapi boleh bocorkan maklumat kepada penyerang); Deny secara amnya menyekat tanpa membenarkan laluan, konsepnya sama seperti Drop dalam kebanyakan pelaksanaan.</NotaPenting>

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"Dasar (Policy) vs Peraturan (Rule)"} className="text-red-600 shrink-0" size={20} />Dasar (Policy) vs Peraturan (Rule)</h3>
        <NotesTable headers={['Aspek', 'Dasar (Policy)', 'Peraturan (Rule)']} rows={[
          ['Fungsi', 'Tetapkan prinsip keselamatan secara umum', 'Laksanakan dasar dalam bentuk arahan teknikal'],
          ['Tahap', 'Tinggi (strategik & konseptual)', 'Rendah (praktikal & teknikal)'],
          ['Skop', 'Keseluruhan sistem/organisasi', 'Trafik atau situasi tertentu'],
          ['Contoh', 'Hanya pengguna sah boleh akses sistem', 'Allow IP 10.0.0.5 to access port 80 via TCP'],
          ['Penyesuaian', 'Jarang diubah kecuali dasar organisasi berubah', 'Boleh dikemas kini kerap ikut keperluan teknikal'],
        ]} />
      </div>

      <InfoCard title="Kepentingan Dasar & Peraturan Firewall" icon={Award}>
        <div className="grid sm:grid-cols-2 gap-3 mt-2">
          {[
            ['Melindungi rangkaian daripada ancaman', 'Perisai utama terhadap virus, DDoS, malware, akses tanpa kebenaran'],
            ['Kawal trafik masuk & keluar', 'Pastikan hanya trafik sah melintasi firewall'],
            ['Tingkatkan kecekapan & keselamatan sistem', 'Minimumkan kelemahan melalui peraturan jelas & tersusun'],
            ['Sediakan pertahanan berlapis', 'Firewall ialah lapisan pertama bersama antivirus, enkripsi, pengesahan'],
            ['Urutan & keutamaan peraturan', 'Peraturan atas diproses dahulu - urutan salah boleh halang trafik sah'],
            ['Optimumkan sumber rangkaian', 'Halang trafik tak perlu, kurangkan beban sistem'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl bg-red-50 border border-red-200 p-3"><p className="font-black text-red-900 text-xs">{t}</p><p className="text-[11px] text-red-800 mt-1">{d}</p></div>
          ))}
        </div>
      </InfoCard>

      <Latihan items={['Apakah yang dimaksudkan dengan peraturan firewall?', 'Mengapa firewall perlu ada peraturan dan dasar?', 'Apakah yang berlaku jika trafik tidak mematuhi peraturan firewall?']} />
      <Ringkasan>12 jenis peraturan firewall meluas daripada Allow/Deny/Drop/Reject asas hingga NAT, Port Forwarding, IDS/IPS, Time-Based, QoS dan VPN Rules. <b>Dasar</b> memberi hala tuju strategik; <b>peraturan</b> melaksanakannya secara teknikal. Kefahaman urutan peraturan (peraturan atas diutamakan) penting untuk mengelakkan trafik sah tersekat.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 5: MOD RANGKAIAN, ANTARA MUKA & ZON KESELAMATAN ---------------- */
function FwZonesNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Konfigurasi Rangkaian Firewall" icon={Network}>
        <p>Konfigurasi firewall ialah proses menetapkan peraturan untuk mengawal trafik rangkaian masuk dan keluar bagi melindungi sistem daripada penggodam, virus atau akses tanpa kebenaran. Firewall boleh beroperasi pada <b>Lapisan 2 (Data Link)</b> atau <b>Lapisan 3 (Network)</b> dalam model OSI.</p>
      </InfoCard>

      <LayerCompareDiagram />

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Antara Muka Dalaman (Internal Interface)" icon={Home}>
          <p>Bahagian firewall yang berhubung dengan rangkaian dalaman organisasi yang dipercayai. Fungsi: pengurusan trafik dalaman, pemisahan rangkaian, dan penyediaan segmen keselamatan (VLAN).</p>
          <p className="mt-2 text-sm">Konfigurasi: subrangkaian dalaman, VLAN, peraturan akses aplikasi, dan pengesahan berbilang faktor (MFA).</p>
        </InfoCard>
        <InfoCard title="Antara Muka Luaran (External Interface)" icon={Globe}>
          <p>Bahagian firewall yang menghubungkan rangkaian dalaman dengan rangkaian luar (internet). Fungsi: perlindungan daripada ancaman luar (DoS/malware), kawal akses ke perkhidmatan sensitif, dan penyulitan trafik (SSL/TLS, VPN).</p>
          <p className="mt-2 text-sm">Konfigurasi: peraturan akses luar, penapisan ikut protokol, NAT, dan DMZ.</p>
        </InfoCard>
      </div>

      <DmzDiagram />

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"Tahap Keselamatan Zon"} className="text-red-600 shrink-0" size={20} />Tahap Keselamatan Zon</h3>
        <NotesTable headers={['Zon', 'Tahap Keselamatan', 'Ciri Utama']} rows={[
          ['Zon Dalaman (Internal)', 'Sangat Tinggi', 'Penapisan ketat, akses berasaskan pengguna, MFA, penyulitan end-to-end'],
          ['Zon DMZ', 'Sederhana', 'Zon penampan; pelayan awam (web/mel/DNS) diletak di sini; akses ke dalaman sangat terhad'],
          ['Zon Luaran (External)', 'Rendah', 'Rangkaian tidak dipercayai; semua trafik dipantau; akses hanya melalui port dikenali (80/443)'],
        ]} />
      </div>

      <InfoCard title="Mengapa Tahap Keselamatan Zon Penting?" icon={ShieldAlert}>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Mengurus Risiko</b> - trafik berisiko dihadkan ke zon terhad (luaran/DMZ), zon dalaman dapat perlindungan lebih ketat.</li>
          <li><b>Meningkatkan Pengasingan</b> - memisahkan data sensitif daripada yang umum, mengurangkan kesan serangan.</li>
          <li><b>Kawalan Akses Lebih Baik</b> - setiap zon dikawal mengikut keperluan (prinsip <i>least privilege</i>).</li>
        </ul>
      </InfoCard>

      <Latihan items={['Firewall yang berfungsi dengan menapis paket berdasarkan alamat IP, nombor port dan protokol dikenali sebagai __________ (rujuk mod lapisan).', '__________ ialah firewall yang memeriksa keadaan sambungan (connection state) dan hanya membenarkan trafik yang sah berdasarkan sambungan yang wujud.']} />
      <Ringkasan>Firewall boleh beroperasi pada <b>Lapisan 2</b> (MAC, LAN sahaja) atau <b>Lapisan 3</b> (IP, antara rangkaian). <b>Antara Muka Dalaman</b> dan <b>Luaran</b> menguruskan trafik pada dua sisi firewall. <b>DMZ</b> menjadi zon penampan bagi pelayan awam, dengan tiga <b>tahap keselamatan zon</b>: Dalaman (tinggi), DMZ (sederhana), Luaran (rendah).</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 6: PENGURUSAN IP & NAT/PAT ---------------- */
function FwNatIpNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Protokol Internet Pengurusan (IP Management)" icon={Cpu}>
        <p>Merujuk kepada protokol/sistem yang menguruskan pemberian, pengagihan dan pengurusan alamat IP bagi peranti dalam rangkaian. Penting dalam konteks firewall kerana berkait rapat dengan kawalan trafik yang dibenarkan masuk/keluar melalui alamat IP yang sah.</p>
      </InfoCard>

      <NotesTable headers={['Protokol', 'Peranan dalam Firewall']} rows={[
        ['DHCP', 'Beri alamat IP automatik kepada peranti; firewall boleh hadkan akses ikut IP yang diberi DHCP'],
        ['ARP', 'Petakan alamat IP kepada alamat MAC dalam LAN; firewall guna maklumat ini untuk saring trafik'],
        ['ICMP', 'Hantar mesej kawalan/ralat (contoh: ping); sering disekat firewall untuk elak serangan DoS'],
        ['NAT', 'Tukar alamat IP sumber/destinasi antara rangkaian dalaman (private) dan luaran (public)'],
        ['IPsec', 'Sediakan penyulitan & pengesahan; lindungi penghantaran data dari penyadapan/manipulasi'],
      ]} />

      <InfoCard title="Whitelist vs Blacklist" icon={ListChecks}>
        <div className="grid sm:grid-cols-2 gap-3 mt-2">
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3"><p className="font-black text-emerald-900 text-sm">Whitelist (Senarai Putih)</p><p className="text-xs text-emerald-800 mt-1">Hanya alamat IP yang disenaraikan dibenarkan mengakses rangkaian.</p></div>
          <div className="rounded-xl bg-red-50 border border-red-200 p-3"><p className="font-black text-red-900 text-sm">Blacklist (Senarai Hitam)</p><p className="text-xs text-red-800 mt-1">Alamat IP yang diketahui terlibat ancaman akan disekat.</p></div>
        </div>
      </InfoCard>

      <NatDiagram />

      <InfoCard title="Terjemahan Alamat Pelabuhan (PAT)" icon={KeyRound}>
        <p>PAT (Port Address Translation), juga dikenali sebagai <b>NAT Overloading</b>, membenarkan banyak peranti dalaman berkongsi SATU alamat IP awam dengan menukar nombor port setiap sambungan. Ini amat penting apabila bilangan alamat IP awam terhad.</p>
      </InfoCard>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Kelebihan NAT/PAT" icon={CheckCircle}>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><b>Penjimatan alamat IP</b> - satu IP awam untuk banyak peranti dalaman.</li>
            <li><b>Keselamatan</b> - sembunyikan IP dalaman daripada rangkaian luar.</li>
            <li><b>Fleksibiliti</b> - peranti dalaman capai internet tanpa IP awam sendiri.</li>
          </ul>
        </InfoCard>
        <InfoCard title="Kelemahan NAT/PAT" icon={AlertTriangle}>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Aplikasi tertentu (VoIP, permainan P2P) mungkin bermasalah - perlukan sambungan terus.</li>
            <li>Prestasi terjejas jika banyak sambungan diproses serentak.</li>
            <li>Pengurusan port dalam PAT boleh menjadi rumit bila banyak peranti guna port sama.</li>
          </ul>
        </InfoCard>
      </div>

      <Latihan items={['Firewall menggunakan parameter __________ untuk menentukan jenis trafik yang dibenarkan atau disekat berdasarkan alamat IP sumber dan destinasi.', 'Akronim NAT digunakan untuk menukar alamat IP dalaman kepada alamat IP awam. Apakah maksud penuh NAT?']} />
      <Ringkasan>Pengurusan IP dalam firewall melibatkan protokol <b>DHCP, ARP, ICMP, NAT</b> dan <b>IPsec</b>. Firewall menapis trafik ikut IP melalui <b>whitelist/blacklist</b>. <b>NAT</b> terbahagi kepada <b>Static</b> (petaan tetap 1:1), <b>Dynamic</b> (dari kumpulan IP awam) dan <b>PAT/NAT Overloading</b> (banyak IP dalaman kongsi 1 IP awam, dibezakan port).</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 7: FIREWALL LINUX & WINDOWS ---------------- */
function FwLinuxWinNotes() {
  const linux = (
    <>
      <p className="text-sm text-slate-600">Linux-based firewalls memberi kawalan penuh kepada pentadbir untuk menetapkan dasar keselamatan, tanpa kos lesen dan dengan penyesuaian tinggi.</p>
      <IptablesChainsDiagram />
      <NotesTable headers={['Alat', 'Ciri Utama']} rows={[
        ['iptables', 'Alat klasik Linux; kawal trafik melalui filtering rules dan chains (INPUT/OUTPUT/FORWARD)'],
        ['nftables', 'Pengganti moden iptables (kernel 3.13+); sintaks lebih ringkas dan fleksibel'],
        ['firewalld', 'Alat mesra pengguna; guna konsep "zones" untuk kumpul peraturan; boleh ubah dinamik tanpa restart'],
      ]} />
      <Code title="Contoh arahan iptables & firewalld" prompt lines={[
        'sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT',
        '# benarkan SSH masuk',
        'sudo iptables -A INPUT -s 192.168.1.100 -j DROP',
        '# sekat IP tertentu',
        'sudo nft add rule ip filter input tcp dport 80 accept',
        '# benarkan HTTP (nftables)',
        'sudo firewall-cmd --zone=public --add-port=80/tcp --permanent',
        'sudo firewall-cmd --reload',
      ]} />
      <NotaPenting>Tiga <b>chains</b> utama: <b>INPUT</b> (trafik masuk ke sistem), <b>OUTPUT</b> (trafik keluar dari sistem), <b>FORWARD</b> (trafik melalui sistem tetapi bukan untuknya, cth. melalui router). Polisi lalai lazimnya <b>Default Deny</b> - semua trafik ditolak kecuali dibenarkan secara eksplisit.</NotaPenting>
    </>
  );
  const windows = (
    <>
      <p className="text-sm text-slate-600">Windows Firewall ialah sistem penapisan paket bawaan Microsoft yang bertindak sebagai "gatekeeper" - memeriksa setiap paket data yang cuba masuk/keluar sistem.</p>
      <NotesTable headers={['Profil', 'Digunakan Apabila...']} rows={[
        ['Domain', 'Komputer disambung ke domain organisasi (rangkaian pejabat)'],
        ['Private', 'Sambungan ke rangkaian peribadi dipercayai (Wi-Fi rumah)'],
        ['Public', 'Sambungan ke rangkaian awam tidak dipercayai (Wi-Fi kafe)'],
      ]} />
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Inbound & Outbound Rules" icon={ListChecks}>
          <p><b>Inbound Rule</b>: kawal trafik masuk ke sistem (cth. benarkan port 3389 Remote Desktop).</p>
          <p className="mt-2"><b>Outbound Rule</b>: kawal trafik keluar dari sistem (cth. sekat aplikasi daripada akses internet).</p>
        </InfoCard>
        <InfoCard title="Alat Pengurusan" icon={Settings}>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li><b>Windows Defender Firewall</b> - GUI mesra pengguna.</li>
            <li><b>WFAS (Advanced Security)</b> - konfigurasi kompleks ikut port/aplikasi/IP/waktu.</li>
            <li><b>PowerShell/CMD</b> - automasi & konfigurasi skala besar.</li>
          </ul>
        </InfoCard>
      </div>
      <Code title="Contoh arahan PowerShell" prompt lines={[
        'Get-NetFirewallProfile',
        '# semak status firewall',
        'Set-NetFirewallProfile -All -Enabled True',
        '# aktifkan firewall semua profil',
        'New-NetFirewallRule -DisplayName "Allow HTTP" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow',
      ]} />
      <InfoCard title="Cabaran Windows Firewall" icon={AlertTriangle}>
        <p>Agak terhad berbanding firewall enterprise (tiada IPS lanjutan); kesilapan konfigurasi boleh sebabkan aplikasi gagal berfungsi; bukan "next-gen firewall" - lebih sesuai untuk individu atau persekitaran ringan berbanding kawalan trafik kompleks.</p>
      </InfoCard>
    </>
  );
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <SubTabs tabs={[{ label: '1. Linux-Based Firewalls', content: linux }, { label: '2. Windows-Based Firewalls', content: windows }]} />
      <Latihan items={['Apakah maksud Command Line Interface (CLI)?', 'Berikan satu kelebihan menggunakan CLI dalam sistem pengoperasian.', 'Terangkan perbezaan antara CLI dan antara muka grafik (GUI).']} />
      <Ringkasan>Linux menawarkan 3 alat utama: <b>iptables</b> (klasik), <b>nftables</b> (moden), <b>firewalld</b> (berasaskan zon, mesra pengguna) - semua guna chains INPUT/OUTPUT/FORWARD. Windows Firewall guna 3 <b>profil</b> (Domain/Private/Public) dengan Inbound/Outbound Rules, diurus melalui GUI, WFAS atau PowerShell.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 8: ENTERPRISE, CLOUD & OPEN-SOURCE FIREWALL ---------------- */
function FwDeployNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Firewall Moden: Enterprise & Cloud" icon={Boxes}>
        <p>Organisasi kini beroperasi dalam persekitaran hybrid/multi-cloud, menjadikan firewall generasi lama tidak lagi mencukupi. <b>Enterprise Firewall</b> dan <b>Cloud Firewall</b> muncul sebagai penyelesaian berskala besar, fleksibel dan pintar.</p>
      </InfoCard>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Enterprise Firewall" icon={Server}>
          <p className="mb-2">Sistem keselamatan berasaskan perkakasan/perisian di perimeter rangkaian organisasi.</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Stateful Packet Inspection (SPI) & Deep Packet Inspection (DPI)</li>
            <li>VLAN & Segmentation</li>
            <li>Intrusion Prevention System (IPS)</li>
            <li>Traffic Shaping & QoS</li>
            <li>High Availability (HA)</li>
          </ul>
        </InfoCard>
        <InfoCard title="Cloud Firewall" icon={Cloud}>
          <p className="mb-2">Dihoskan sepenuhnya di infrastruktur awan; dikawal melalui portal web/API.</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Cloud-native (AWS Security Groups, Azure Firewall)</li>
            <li>FWaaS (Zscaler, Cloudflare, Prisma Access)</li>
            <li>Global Policy Management & Zero Trust Access</li>
            <li>Identity-Based Filtering</li>
            <li>Elastic Scalability</li>
          </ul>
        </InfoCard>
      </div>

      <NotesTable headers={['Aspek', 'Enterprise Firewall', 'Cloud Firewall']} rows={[
        ['Lokasi', 'Di tapak organisasi (on-premise)', 'Dihoskan di cloud'],
        ['Pengurusan', 'Tempatan atau melalui konsol', 'Portal web global, API'],
        ['Kos Permulaan', 'Tinggi (perkakasan + penyelenggaraan)', 'Lebih fleksibel (ikut penggunaan)'],
        ['Masa Pelaksanaan', 'Perlahan (perlu pemasangan fizikal)', 'Sangat pantas (provisioning dalam minit)'],
        ['Contoh Senario', 'Pejabat besar, pusat data', 'Pengguna global, SaaS, hybrid cloud'],
      ]} />

      <NotaPenting>Cabaran Enterprise: memerlukan penyelenggaraan fizikal, tidak mudah diskalakan. Cabaran Cloud: bergantung pada vendor (risiko <i>lock-in</i>), risiko downtime cloud, perlu jaminan pematuhan (compliance). Ramai organisasi kini guna <b>gabungan kedua-dua (hybrid approach)</b> untuk perlindungan menyeluruh.</NotaPenting>

      <InfoCard title="Open-Source Firewall Management (CLI-Based)" icon={Terminal}>
        <p>Firewall CLI sumber terbuka memberi kawalan mendalam tanpa bergantung vendor atau GUI - digunakan meluas pada pelayan Linux, rangkaian kritikal, peranti terhad sumber, dan pengurusan keselamatan automatik.</p>
      </InfoCard>
      <NotesTable headers={['Perisian CLI', 'Penerangan']} rows={[
        ['iptables', 'Firewall klasik Linux menggunakan struktur jadual/rantai'],
        ['nftables', 'Gantian moden iptables, lebih modular dan ringkas'],
        ['pf (Packet Filter)', 'CLI firewall BSD (OpenBSD, FreeBSD, macOS)'],
        ['ufw (Uncomplicated Firewall)', 'CLI mudah untuk Ubuntu, guna iptables di belakang tabir'],
        ['firewalld (CLI Mode)', 'Sokong peraturan dinamik melalui firewall-cmd'],
      ]} />
      <Code title="Automasi firewall CLI" prompt lines={[
        'iptables -P INPUT DROP',
        '# tetapkan polisi lalai: sekat semua trafik masuk',
        'iptables -A INPUT -p tcp --dport 22 -j ACCEPT',
        '# benarkan SSH sahaja',
        'iptables-save > /etc/iptables/rules.v4',
        '# simpan konfigurasi',
        'bash firewall_rules.sh',
        '# jalankan skrip automasi',
      ]} />
      <InfoCard title="Kelebihan Open-Source CLI Firewall" icon={CheckCircle}>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Telus & bebas vendor</b> - kod sumber boleh diaudit dan diubah suai.</li>
          <li><b>Ringan & efisien</b> - tidak memerlukan banyak sumber sistem.</li>
          <li><b>Automasi & integrasi CI/CD</b> - sesuai untuk DevOps, kontena (Docker, Kubernetes).</li>
          <li><b>Boleh disesuaikan 100%</b> - kawalan granular untuk pentadbir pakar.</li>
          <li><b>Disokong komuniti aktif</b> - kemas kini & patch terbuka.</li>
        </ul>
      </InfoCard>

      <Latihan items={['Apakah itu Perisian Pengurus Peranti?', 'Mengapakah CLI dianggap lebih sesuai untuk pentadbir sistem?']} />
      <Ringkasan><b>Enterprise Firewall</b> sesuai untuk infrastruktur tetap dan data sensitif; <b>Cloud Firewall</b> beri fleksibiliti dan skalabiliti global - ramai organisasi guna kombinasi <b>hybrid</b>. <b>Open-Source CLI</b> (iptables, nftables, pf, ufw, firewalld) memberi kawalan telus dan automasi tinggi, sesuai untuk pentadbir Linux berpengalaman.</Ringkasan>
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
  const [activeQuestions, setActiveQuestions] = useState(() => shuffleQuestions(ikr3133QuizSets[0].questions));

  const currentSet = ikr3133QuizSets[kpIndex];
  const passScore = 18;

  const score = useMemo(() => activeQuestions.reduce((total, question, index) => total + (answers[index] === question.options.indexOf(question.correct) ? 1 : 0), 0), [answers, activeQuestions]);

  const retryLevel = () => {
    setAnswers({});
    setSubmitted(false);
    setActiveQuestions(shuffleQuestions(ikr3133QuizSets[kpIndex].questions));
  };

  const nextKp = () => {
    if (score >= passScore && kpIndex < ikr3133QuizSets.length - 1) {
      const nextIndex = kpIndex + 1;
      setHighestKp(previous => Math.max(previous, nextIndex));
      setKpIndex(nextIndex);
      setAnswers({});
      setSubmitted(false);
      setActiveQuestions(shuffleQuestions(ikr3133QuizSets[nextIndex].questions));
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
            <div className="text-xs font-black uppercase tracking-[.2em] text-red-700">Tahap Kuiz</div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{currentSet.code} - {currentSet.title}</h2>
            <p className="text-sm text-slate-600 mt-2">Setiap KP mengandungi 30 soalan (10 easy, 10 medium, 10 hard KBAT). Lulus minimum ialah 18/30.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ikr3133QuizSets.map((item, index) => (
              <button key={item.id} disabled={index > highestKp || (index === kpIndex && submitted && score < passScore)} onClick={() => {
                if (index <= highestKp) {
                  setKpIndex(index);
                  setAnswers({});
                  setSubmitted(false);
                  setActiveQuestions(shuffleQuestions(ikr3133QuizSets[index].questions));
                }
              }} className={`rounded-full px-4 py-2 text-xs font-black border ${index === kpIndex ? 'bg-red-600 border-red-600 text-white' : 'bg-white border-slate-300 text-slate-700'} ${index > highestKp ? 'opacity-50 cursor-not-allowed' : ''}`}>{item.code}</button>
            ))}
          </div>
        </div>
      </div>

      {submitted && (
        <div className={`rounded-2xl p-6 mb-6 text-white ${score >= passScore ? 'bg-emerald-600' : 'bg-red-600'}`}>
          <div className="flex items-center gap-3"><Award size={34} /><div><p className="text-sm font-bold opacity-90">Keputusan {currentSet.code}</p><h2 className="text-3xl font-black">{score} / {activeQuestions.length}</h2></div></div>
          <p className="mt-3 font-medium">
            {score >= passScore
              ? `Lulus ${currentSet.code}. Anda layak ${kpIndex < ikr3133QuizSets.length - 1 ? 'naik ke ' + ikr3133QuizSets[kpIndex + 1].code : 'menamatkan semua KP'}.`
              : `Belum lulus. Markah minimum ialah 18/30 - sila ulang ${currentSet.code} sebelum naik ke tahap seterusnya.`}
          </p>
        </div>
      )}

      <div className="space-y-5">
        {activeQuestions.map((question, index) => (
          <article key={`${currentSet.id}-${index}-${question.question}`} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2"><span className={`text-[10px] font-black uppercase tracking-wide rounded-full px-2.5 py-1 ${question.difficulty === 'hard' ? 'bg-red-100 text-red-700' : question.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{question.difficulty === 'hard' ? 'Hard KBAT' : question.difficulty === 'medium' ? 'Medium' : 'Easy'}</span></div>
            <h3 className="font-black text-slate-900"><span className="text-red-600 mr-2">{index + 1}.</span>{question.question}</h3>
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
                    className={`text-left p-3 rounded-xl border text-sm font-medium transition-all ${correct ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : wrong ? 'border-red-500 bg-red-50 text-red-800' : selected ? 'border-red-500 bg-red-50 text-red-800' : 'border-slate-200 hover:border-red-300'}`}
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
          <button disabled={Object.keys(answers).length !== activeQuestions.length} onClick={handleSubmit} className="flex-1 bg-red-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-black hover:bg-red-700 transition-colors">Hantar Jawapan {currentSet.code}</button>
        ) : (
          <>
            {score >= passScore && kpIndex < ikr3133QuizSets.length - 1 && (
              <button onClick={nextKp} className="flex-1 bg-emerald-600 text-white px-6 py-4 rounded-xl font-black hover:bg-emerald-700">Naik ke {ikr3133QuizSets[kpIndex + 1].code}</button>
            )}
            <button onClick={retryLevel} className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-xl font-black hover:bg-slate-800"><RotateCcw size={19} /> Cuba Semula {currentSet.code}</button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- KOMPONEN UTAMA ---------------- */
export default function IKR3133({ onBackToPortal }) {
  const [view, setView] = useState('menu');
  const [readState, setReadState] = useState(() => {
    const fallback = [false, false, false, false, false, false, false, false];
    try {
      const saved = JSON.parse(localStorage.getItem('ikr3133-read-state'));
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
    try { localStorage.setItem('ikr3133-read-state', JSON.stringify(fallback)); } catch { /* storan tidak tersedia */ }
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
    try { localStorage.setItem('ikr3133-read-state', JSON.stringify(nextReadState)); } catch { /* storan tidak tersedia */ }
    const nextInLine = sections[requested + 1];
    if (nextInLine) setView(nextInLine.id);
  };

  if (view !== 'menu') {
    const content = {
      'fw-intro': <FwIntroNotes />,
      'fw-hw-sw': <FwHwSwNotes />,
      'fw-policy': <FwPolicyNotes />,
      'fw-rules': <FwRulesNotes />,
      'fw-zones': <FwZonesNotes />,
      'fw-natip': <FwNatIpNotes />,
      'fw-linuxwin': <FwLinuxWinNotes />,
      'fw-deploy': <FwDeployNotes />,
      quiz: <Quiz />,
    }[view];

    const showCompleteButton = sections.some((section) => section.id === view);
    const headerMeta = sections.find((section) => section.id === view) || featureCards.find((f) => f.id === view) || sections[0];

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <FwAnimStyles />
        <div className="bg-slate-950 text-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Terminal size={30} className="text-red-300" />
                <div>
                  <div className="text-[10px] uppercase tracking-[.2em] text-red-300 font-black">Network Security Essentials</div>
                  <div className="text-sm font-black">{completedCount}/{sections.length} bahagian</div>
                </div>
              </div>
              <div className="flex-1 max-w-md">
                <div className="flex items-center justify-between text-[10px] font-black tracking-[.18em] text-red-200 uppercase"><span>Progress</span><span>{progressPercent}%</span></div>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-red-300 to-orange-300 transition-all" style={{ width: `${progressPercent}%` }} /></div>
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
        <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">IKR3133 Network Security Essentials - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>
      </div>
    );
  }

  return (
    <div className="course-menu-page min-h-screen bg-slate-50 text-slate-900">
      <FwAnimStyles />
      <ModuleMenu title="Modul IKR3133: Network Security Essentials" icon={sections[0].icon} secondaryIcon={sections[1].icon}
        onBack={onBackToPortal} topics={sections} read={readState} onTopic={section => openSection(section.id)} onReset={resetProgress}
        description={<>Konsep, dasar, peraturan dan konfigurasi firewall rangkaian - dipecahkan kepada 8 bahagian, lengkap dengan kuiz 120 soalan.</>}>
        <ModuleActivities activities={featureCards} quizLocked={!readState[sections.length - 1]} onOpen={openSection} />
      </ModuleMenu>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">IKR3133 Network Security Essentials - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>
    </div>
  );
}

