import ModuleMenu, { ModuleActivities } from './ModuleMenu';
import { useMemo, useState } from 'react';
import { ikr3113QuizSets } from './IKR3113QuizData.js';
import HeadingIcon from './headingIcons';
import {
  Activity, AlertTriangle, Award, Bell, Boxes, Check, CheckCircle, ChevronRight, CircleDot,
  Cloud, Copy, Cpu, Database, DownloadCloud, FileWarning, Gauge, GitBranch, HardDrive, KeyRound, Layers,
  ListChecks, Lock, MonitorCog, Network, Radar, RefreshCw, RotateCcw, ScrollText, Settings, ShieldAlert,
  Sparkles, Terminal, UserCog, Users, Wrench, XCircle, ArrowLeft, Home,
} from 'lucide-react';

const sections = [
  { id: 'nms-intro', title: 'Pengenalan & Fungsi NMS', desc: 'Konsep NMS, peranan, dan 5 jenis pemantauan: kesalahan, konfigurasi, perakaunan, prestasi, keselamatan.', icon: Radar, accent: 'rose' },
  { id: 'nms-install', title: 'Pemasangan Perisian NMS & Amaran Masa Nyata', desc: 'Prosedur pemasangan, kaedah amaran, kepentingan, cabaran dan kemas kini perisian NMS.', icon: DownloadCloud, accent: 'orange' },
  { id: 'snmp', title: 'SNMP dalam NMS', desc: 'Manager, Agent, MIB, operasi GET/SET/TRAP/INFORM dan perbandingan SNMPv1/v2/v3.', icon: Network, accent: 'amber' },
  { id: 'nas-intro', title: 'Pengenalan & Jenis NAS', desc: 'Peranan, fungsi NAS, dan 3 peringkat: Enterprise, Midmarket, Consumer.', icon: HardDrive, accent: 'teal' },
  { id: 'nas-install', title: 'Tatacara Pemasangan NAS', desc: 'Keperluan perkakasan/perisian, folder kongsi, protokol capaian jauh dan kemas kini.', icon: Boxes, accent: 'emerald' },
  { id: 'raid', title: 'Sistem Storan RAID', desc: 'RAID 0, 1, 5, 6, 10 - ciri, redundansi, prestasi dan pengiraan kapasiti storan.', icon: Layers, accent: 'indigo' },
  { id: 'nas-access', title: 'Pengurusan Capaian Pengguna NAS', desc: 'Akaun & kumpulan, permissions, 2FA, audit log, dan tahap kebenaran Read/Write/Admin.', icon: UserCog, accent: 'violet' },
  { id: 'nas-security', title: 'Akses Jauh & Keselamatan NAS', desc: 'VPN, FTP/SFTP, perkhidmatan awan, penyulitan, pengesahan dan log audit.', icon: Lock, accent: 'rose' },
];

const featureCards = [
  { id: 'quiz', target: 'quiz', title: 'Kuiz Penilaian', desc: '180 soalan (6 KP x 30 soalan: 10 easy, 10 medium, 10 hard KBAT). Buka setelah menyelesaikan semua 8 Nota.', icon: Award, accent: 'rose' },
];

const simCards = [
  { file: 'monitoring-vmware-truenas.html', title: 'Simulasi VMware Workstation & TrueNAS SCALE', desc: 'Pasang dan konfigur TrueNAS SCALE dalam VMware Workstation.', icon: HardDrive, accent: 'rose' },
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


/* Animasi CSS - KHUSUS modul Network Operating System (LED terminal berkelip) */
function ImsAnimStyles() {
  return (
    <style>{`
      @keyframes imsBlink { 0%, 100% { opacity: 1; } 50% { opacity: .25; } }
      @keyframes imsSpin { to { transform: rotate(360deg); } }
      @keyframes imsFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes imsScaleIn { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: scale(1); } }
      @keyframes imsBarPulse { 0%, 100% { opacity: .5; } 50% { opacity: 1; } }
      .ims-blink { animation: imsBlink 1.4s ease-in-out infinite; }
      .ims-blink-delay { animation: imsBlink 1.4s ease-in-out infinite; animation-delay: .5s; }
      .ims-fan { animation: imsSpin 2.5s linear infinite; transform-origin: center; }
      .ims-fan-fast { animation: imsSpin 1s linear infinite; transform-origin: center; }
      .ims-entry-title { animation: imsFadeUp .5s ease-out both; }
      .ims-entry-icon { animation: imsScaleIn .45s ease-out both; }
      .ims-entry-subtitle { animation: imsFadeUp .5s ease-out .1s both; }
      .ims-reveal { animation: imsFadeUp .5s ease-out both; }
      .ims-reveal-1{animation-delay:.05s}.ims-reveal-2{animation-delay:.1s}.ims-reveal-3{animation-delay:.15s}
      .ims-reveal-4{animation-delay:.2s}.ims-reveal-5{animation-delay:.25s}.ims-reveal-6{animation-delay:.3s}
      .ims-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
      .ims-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(225,29,72,.25); border-color: #fda4af; }
      .ims-card:hover .ims-card-icon { animation: imsScaleIn .3s ease-out; }
      .ims-bar-pulse { animation: imsBarPulse 1.6s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce) {
        .ims-blink, .ims-blink-delay, .ims-fan, .ims-fan-fast, .ims-entry-title, .ims-entry-icon,
        .ims-entry-subtitle, .ims-reveal, .ims-card, .ims-bar-pulse { animation: none !important; transition: none !important; }
        .ims-card:hover { transform: none; }
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
          <div className={`p-3 rounded-2xl border border-white/15 ${style.icon} ims-entry-icon`}><Icon size={28} className="text-white" /></div>
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight ims-entry-title">{title}</h1>
            <p className="text-slate-300 mt-2 max-w-3xl text-sm md:text-base ims-entry-subtitle">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, children, icon: Icon = CircleDot }) {
  return (
    <article className="ims-card ims-reveal bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
      <h3 className="font-black text-slate-900 text-lg flex items-center gap-2 mb-3"><Icon size={20} className="ims-card-icon text-rose-600" /> {title}</h3>
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
      <ListChecks size={22} className="text-rose-300 shrink-0 mt-0.5" />
      <div><p className="text-xs font-black uppercase tracking-wide text-rose-300 mb-1">Ringkasan</p><div className="text-sm text-slate-100 leading-relaxed">{children}</div></div>
    </div>
  );
}

function NotesTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm">
        <thead><tr className="bg-rose-50 text-rose-900">{headers.map((h) => <th key={h} className="text-left font-black p-3 md:p-4">{h}</th>)}</tr></thead>
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

function FlowRow({ steps }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <span className="rounded-xl bg-white border border-rose-200 text-rose-900 text-xs md:text-sm font-black px-3 py-2">{step}</span>
          {i < steps.length - 1 && <ChevronRight size={16} className="text-rose-400 shrink-0" />}
        </div>
      ))}
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
          <span className="flex gap-1.5 shrink-0"><i className="w-2.5 h-2.5 rounded-full bg-rose-400/80" /><i className="w-2.5 h-2.5 rounded-full bg-amber-400/80" /><i className="w-2.5 h-2.5 rounded-full bg-green-400/80" /></span>
          <span className="text-[11px] font-bold text-slate-400 truncate">{title}</span>
        </div>
        <button type="button" onClick={copy} aria-label={`Salin ${title}`} className="inline-flex items-center gap-1 text-[11px] font-black text-slate-300 hover:text-white min-h-[28px] px-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400">
          {copied ? <><Check size={13} className="text-rose-400" /> Disalin</> : <><Copy size={13} /> Salin</>}
        </button>
      </div>
      <pre className="p-4 text-[12.5px] leading-relaxed overflow-x-auto font-mono text-slate-100">
        {lines.map((l, i) => {
          const noPrompt = l.startsWith('~');
          const text = noPrompt ? l.slice(1) : l;
          return (
            <div key={i} className={text.startsWith('#') ? 'text-slate-500' : ''}>
              {prompt && !noPrompt && !text.startsWith('#') && <span className="text-rose-400 select-none">$ </span>}{text || ' '}
            </div>
          );
        })}
      </pre>
    </div>
  );
}

/* Langkah bernombor untuk prosedur */
function StepList({ steps }) {
  return (
    <ol className="space-y-4">
      {steps.map((s, i) => (
        <li key={s.title} className="flex gap-4">
          <span className="shrink-0 w-9 h-9 rounded-xl bg-rose-600 text-white font-black flex items-center justify-center shadow-md shadow-rose-600/25">{i + 1}</span>
          <div className="flex-1 min-w-0 space-y-3">
            <div>
              <p className="font-black text-slate-900">{s.title}</p>
              {s.desc && <p className="text-sm text-slate-600 mt-1 leading-relaxed">{s.desc}</p>}
            </div>
            {s.code && <Code title={s.codeTitle || 'Terminal'} lines={s.code} prompt={s.prompt !== false} />}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* Tab kecil di dalam satu nota (Konfigurasi / Pengujian / Penyelenggaraan) */
function SubTabs({ tabs }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2 mb-6">
        {tabs.map((t, i) => (
          <button key={t.label} role="tab" aria-selected={active === i} onClick={() => setActive(i)} className={`min-h-[44px] px-4 rounded-full text-xs md:text-sm font-black border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-500 ${active === i ? 'bg-rose-600 border-rose-600 text-white' : 'bg-white border-slate-300 text-slate-700 hover:border-rose-400'}`}>{t.label}</button>
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
function SnmpDiagram() {
  const [step, setStep] = useState(0);
  const steps = [
    { op: 'GET Request', dir: 'right', text: 'Pengurus (SNMP Manager dalam NMS) menghantar GET Request kepada agen untuk mendapatkan satu nilai daripada MIB, contohnya kadar penggunaan CPU.' },
    { op: 'GET Response', dir: 'left', text: 'Agen membalas dengan GET Response yang mengandungi nilai diminta, atau kod ralat jika permintaan gagal.' },
    { op: 'SET Request', dir: 'right', text: 'Pengurus menghantar SET Request untuk mengubah konfigurasi atau menetapkan nilai parameter pada peranti melalui agen.' },
    { op: 'GETBULK Request', dir: 'right', text: 'Untuk SNMPv2 ke atas, GETBULK Request mendapatkan sejumlah besar maklumat MIB dalam satu masa, lebih cekap daripada GETNEXT berulang.' },
    { op: 'TRAP', dir: 'left', text: 'Agen menghantar TRAP secara automatik kepada pengurus apabila berlaku kegagalan atau perubahan luar biasa - tanpa menunggu permintaan (unsolicited).' },
    { op: 'INFORM', dir: 'left', text: 'Seperti TRAP, tetapi (SNMPv2 ke atas) memerlukan pengesahan penerimaan daripada pengurus, menjadikannya lebih dipercayai.' },
  ];
  const cur = steps[step];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h4 className="font-black text-slate-900 flex items-center gap-2"><HeadingIcon text={"Operasi SNMP (interaktif)"} className="text-rose-600 shrink-0" size={18} />Operasi SNMP (interaktif)</h4>
        <span className="text-xs font-black text-rose-700 bg-rose-50 rounded-full px-3 py-1">Operasi {step + 1} / {steps.length}</span>
      </div>
      <svg viewBox="0 0 520 200" className="w-full max-w-xl mx-auto" role="img" aria-label="Rajah operasi SNMP antara pengurus dan agen">
        <defs><marker id="snmpArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#e11d48" /></marker></defs>
        <rect x="15" y="15" width="140" height="56" rx="12" fill="#0f172a" /><text x="85" y="40" textAnchor="middle" fill="#fff" fontSize="12.5" fontWeight="800">SNMP Manager</text><text x="85" y="57" textAnchor="middle" fill="#fda4af" fontSize="10.5">(dalam NMS)</text>
        <rect x="365" y="15" width="140" height="56" rx="12" fill="#0f172a" /><text x="435" y="40" textAnchor="middle" fill="#fff" fontSize="12.5" fontWeight="800">SNMP Agent</text><text x="435" y="57" textAnchor="middle" fill="#fda4af" fontSize="10.5">(peranti + MIB)</text>
        <line x1="85" y1="71" x2="85" y2="180" stroke="#cbd5e1" strokeDasharray="5 5" /><line x1="435" y1="71" x2="435" y2="180" stroke="#cbd5e1" strokeDasharray="5 5" />
        {(() => {
          const x1 = cur.dir === 'right' ? 90 : 430; const x2 = cur.dir === 'right' ? 430 : 90; const y = 125;
          return (<g><line x1={x1} y1={y} x2={x2} y2={y} stroke="#e11d48" strokeWidth="3" markerEnd="url(#snmpArrow)" /><text x="260" y={y - 10} textAnchor="middle" fontSize="13" fontWeight="800" fill="#be123c">{cur.op}</text></g>);
        })()}
      </svg>
      <p className="text-sm text-slate-700 bg-slate-50 rounded-xl border border-slate-200 p-3 mt-3 min-h-[64px]" aria-live="polite">{cur.text}</p>
      <div className="flex gap-2 mt-3">
        <button type="button" disabled={step === 0} onClick={() => setStep(step - 1)} className="min-h-[44px] px-4 rounded-xl border border-slate-300 text-sm font-black text-slate-700 disabled:opacity-40 hover:border-rose-400">Sebelum</button>
        <button type="button" disabled={step === steps.length - 1} onClick={() => setStep(step + 1)} className="min-h-[44px] px-4 rounded-xl bg-rose-600 text-white text-sm font-black disabled:opacity-40 hover:bg-rose-700">Seterusnya</button>
        <button type="button" onClick={() => setStep(0)} className="min-h-[44px] px-4 rounded-xl text-sm font-black text-slate-500 hover:text-slate-800 inline-flex items-center gap-1"><RotateCcw size={14} /> Ulang</button>
      </div>
      <p className="text-xs text-slate-500 mt-3">Komponen SNMP: <b>Manager</b> (perisian NMS), <b>Agent</b> (perisian pada peranti) dan <b>MIB</b> (Management Information Base - pangkalan data maklumat peranti). Semua operasi berjalan atas UDP port 161 (TRAP di port 162).</p>
    </div>
  );
}

/* Perbandingan versi SNMP - kad ringkas */
function SnmpVersionCards() {
  const rows = [
    { v: 'SNMPv1', sec: 'Lemah', eff: 'Asas', trap: 'Terhad', use: 'Rangkaian kecil', accent: 'slate' },
    { v: 'SNMPv2c', sec: 'Lemah', eff: 'Lebih cekap (GetBulk)', trap: 'Lebih banyak', use: 'Rangkaian sederhana', accent: 'amber' },
    { v: 'SNMPv3', sec: 'Kuat (pengesahan & penyulitan)', eff: 'Sangat cekap & selamat', trap: 'Lengkap', use: 'Rangkaian besar/kritikal', accent: 'rose' },
  ];
  const tone = { slate: 'border-slate-300 bg-slate-50', amber: 'border-amber-300 bg-amber-50', rose: 'border-rose-300 bg-rose-50' };
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {rows.map((r) => (
        <div key={r.v} className={`rounded-2xl border-2 p-4 ${tone[r.accent]}`}>
          <p className="font-black text-slate-900">{r.v}</p>
          <dl className="mt-2 space-y-1.5 text-xs text-slate-700">
            <div><dt className="inline font-bold">Keselamatan: </dt><dd className="inline">{r.sec}</dd></div>
            <div><dt className="inline font-bold">Kecekapan: </dt><dd className="inline">{r.eff}</dd></div>
            <div><dt className="inline font-bold">Sokongan Trap: </dt><dd className="inline">{r.trap}</dd></div>
            <div><dt className="inline font-bold">Sesuai untuk: </dt><dd className="inline">{r.use}</dd></div>
          </dl>
        </div>
      ))}
    </div>
  );
}

/* Rajah kitaran kesalahan rangkaian (Identify -> Diagnose -> Respond) */
function FaultCycleDiagram() {
  const steps = [
    { t: 'Kenal Pasti (Identify)', d: 'Mengesan masalah sedang berlaku - melalui sistem automatik, laporan pengguna atau pemerhatian pentadbir.' },
    { t: 'Diagnosis (Diagnose)', d: 'Analisis punca sebenar: kabel rosak, peranti gagal, atau gangguan luar.' },
    { t: 'Tindak Balas (Respond)', d: 'Tindakan segera: ganti peranti rosak, baiki sambungan, atau pulihkan sistem.' },
  ];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2"><HeadingIcon text={"Kitaran Tindak Balas Kesalahan Rangkaian"} className="text-rose-600 shrink-0" size={18} />Kitaran Tindak Balas Kesalahan Rangkaian</h4>
      <div className="grid sm:grid-cols-3 gap-3">
        {steps.map((s, i) => (
          <div key={s.t} className="relative rounded-xl border border-rose-200 bg-rose-50 p-4">
            <span className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-rose-600 text-white text-xs font-black flex items-center justify-center shadow">{i + 1}</span>
            <p className="font-black text-rose-900 text-sm">{s.t}</p>
            <p className="text-xs text-rose-800 mt-1.5 leading-relaxed">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Visual RAID: susunan cakera bagi setiap tahap */
function RaidDiskRow({ n, pattern, colors }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className={`flex-1 h-14 rounded-md border-2 flex items-center justify-center text-[10px] font-black text-white ${colors[pattern[i % pattern.length]]}`}>
          {pattern[i % pattern.length]}
        </div>
      ))}
    </div>
  );
}

function RaidVisualizer() {
  const colors = { D: 'bg-sky-500 border-sky-600', M: 'bg-emerald-500 border-emerald-600', P: 'bg-amber-500 border-amber-600' };
  const levels = [
    { id: 'RAID 0', min: 2, pattern: ['D', 'D'], note: 'Data dipecah (striping) merentas semua cakera. Tiada redundansi - 100% kapasiti, tapi satu cakera gagal = semua data hilang.' },
    { id: 'RAID 1', min: 2, pattern: ['M', 'M'], note: 'Data diduakan (mirroring) sepenuhnya pada setiap cakera. 50% kapasiti digunakan, tapi sangat selamat.' },
    { id: 'RAID 5', min: 3, pattern: ['D', 'D', 'P'], note: 'Striping + satu pariti diagihkan bergilir. Tahan 1 cakera gagal. (N-1) cakera untuk data.' },
    { id: 'RAID 6', min: 4, pattern: ['D', 'D', 'P', 'P'], note: 'Seperti RAID 5 tapi dua lapisan pariti. Tahan 2 cakera gagal serentak. (N-2) cakera untuk data.' },
    { id: 'RAID 10', min: 4, pattern: ['M', 'M', 'D', 'D'], note: 'Gabungan mirror (RAID 1) + stripe (RAID 0). Prestasi dan keselamatan tinggi, tapi hanya 50% kapasiti.' },
  ];
  const [sel, setSel] = useState(0);
  const cur = levels[sel];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2"><HeadingIcon text={"Susunan Cakera RAID (interaktif)"} className="text-rose-600 shrink-0" size={18} />Susunan Cakera RAID (interaktif)</h4>
      <div className="flex flex-wrap gap-2 mb-4">
        {levels.map((l, i) => (
          <button key={l.id} onClick={() => setSel(i)} className={`min-h-[40px] px-4 rounded-full text-xs md:text-sm font-black border ${sel === i ? 'bg-rose-600 border-rose-600 text-white' : 'bg-white border-slate-300 text-slate-700 hover:border-rose-400'}`}>{l.id}</button>
        ))}
      </div>
      <RaidDiskRow n={cur.min} pattern={cur.pattern} colors={colors} />
      <div className="flex gap-4 mt-3 text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1.5"><i className="w-3 h-3 rounded-sm bg-sky-500 inline-block" /> Data (stripe)</span>
        <span className="inline-flex items-center gap-1.5"><i className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> Salinan (mirror)</span>
        <span className="inline-flex items-center gap-1.5"><i className="w-3 h-3 rounded-sm bg-amber-500 inline-block" /> Pariti (parity)</span>
      </div>
      <p className="text-sm text-slate-700 bg-slate-50 rounded-xl border border-slate-200 p-3 mt-3">{cur.note} <span className="text-slate-500">(minimum {cur.min} cakera)</span></p>
    </div>
  );
}

/* Ikon hero animasi - radar berdenyut untuk pemantauan rangkaian */
function RadarIcon({ size = 96 }) {
  return (
    <div className="relative flex items-center justify-center rounded-2xl bg-slate-900 border border-white/10" style={{ width: size, height: size }}>
      <Radar size={size * 0.5} className="text-rose-300" />
      <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-rose-400 ims-blink" />
      <span className="absolute top-3 right-6 w-2 h-2 rounded-full bg-fuchsia-300 ims-blink-delay" />
    </div>
  );
}

/* ---------------- NOTA 1: PENGENALAN & FUNGSI NMS ---------------- */
function NmsIntroNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Apakah Sistem Pemantauan Rangkaian (NMS)?" icon={Radar}>
        <p>Network Monitoring System (NMS) ialah satu set alat dan perisian yang direka untuk memantau, menganalisis dan mengurus prestasi rangkaian komputer dalam sesuatu organisasi. NMS membantu pentadbir memantau status kesihatan, prestasi dan kefungsian setiap komponen rangkaian - suis, penghala, pelayan, komputer pengguna dan peranti lain yang bersambung.</p>
        <p className="mt-3">NMS mengesan masalah seperti sambungan terputus, penggunaan bandwidth tinggi, dan ancaman keselamatan siber secara automatik dan masa nyata, membolehkan pentadbir bertindak sebelum gangguan menjadi lebih besar.</p>
      </InfoCard>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { icon: Gauge, t: 'Prestasi optimum', d: 'Pantau bandwidth, kelajuan dan kehilangan paket.' },
          { icon: Bell, t: 'Kesan gangguan segera', d: 'Amaran automatik bila berlaku isu.' },
          { icon: ShieldAlert, t: 'Tingkatkan keselamatan', d: 'Kesan pencerobohan dan aktiviti mencurigakan.' },
          { icon: FileWarning, t: 'Laporan & analisis', d: 'Data untuk pentadbiran dan perancangan.' },
          { icon: Wrench, t: 'Cekap & jimat kos', d: 'Kurangkan masa henti dan kos penyelenggaraan.' },
        ].map((c) => (
          <div key={c.t} className="rounded-xl bg-slate-50 border border-slate-200 p-3">
            <div className="w-9 h-9 rounded-lg bg-rose-50 flex items-center justify-center text-rose-700 mb-2"><c.icon size={17} /></div>
            <p className="font-black text-slate-900 text-sm">{c.t}</p>
            <p className="text-xs text-slate-600 mt-1">{c.d}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"5 Jenis Sistem Pemantauan Rangkaian"} className="text-rose-600 shrink-0" size={20} />5 Jenis Sistem Pemantauan Rangkaian</h3>
        <NotesTable headers={['Jenis', 'Fokus', 'Contoh Alat']} rows={[
          ['Kesalahan (Fault)', 'Mengesan kerosakan/gangguan; identify, diagnose, respond', 'Nagios, Zabbix, PRTG'],
          ['Konfigurasi (Configuration)', 'Menjejak perubahan konfigurasi peranti; rollback', 'SolarWinds NCM, RANCID, ManageEngine NCM'],
          ['Perakaunan (Accounting)', 'Rekod penggunaan bandwidth/sumber oleh pengguna', 'ntopng, NetFlow Analyzer, RADIUS Accounting'],
          ['Prestasi (Performance)', 'Bandwidth, latency, packet loss, ketersediaan', 'Cacti, SolarWinds NPM, Nagios'],
          ['Keselamatan (Security)', 'IDS/IPS, log aktiviti, SIEM', 'Snort, Suricata, OSSEC, Splunk, IBM QRadar'],
        ]} />
      </div>

      <FaultCycleDiagram />

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Pemantauan Konfigurasi" icon={GitBranch}>
          <p>Menyimpan salinan konfigurasi semasa setiap peranti; setiap perubahan direkodkan (siapa, bila, apa) untuk <b>rollback</b> pantas jika berlaku masalah. Menyokong pematuhan polisi keselamatan organisasi dan automasi backup berkala.</p>
        </InfoCard>
        <InfoCard title="Pemantauan Perakaunan" icon={Users}>
          <p>Merekod siapa menggunakan rangkaian, bila, dan sejauh mana sumber dimanfaatkan (bandwidth, IP, tempoh akses). Berguna untuk audit, pembahagian kos, penguatkuasaan dasar (kuota) dan pengesanan aktiviti mencurigakan.</p>
        </InfoCard>
      </div>

      <InfoCard title="Pemantauan Prestasi & Kesesakan (Bottleneck)" icon={Gauge}>
        <p>Parameter yang diukur: <b>kelajuan pemindahan data, bandwidth, latency</b> dan <b>kadar kehilangan paket</b>. Kesesakan prestasi NMS berpunca daripada CPU/memori server NMS tidak mencukupi, terlalu banyak peranti dipantau serentak, pangkalan data tidak dioptimum, sambungan rangkaian lambat, atau perisian NMS tidak dikemas kini.</p>
      </InfoCard>

      <InfoCard title="Pengurusan Keselamatan (IDS/IPS)" icon={ShieldAlert}>
        <NotesTable headers={['Sistem', 'Fungsi']} rows={[
          ['IDS (Intrusion Detection System)', 'Memantau trafik masa nyata, mengesan pola serangan (port scan, akses tidak sah, malware), memberi amaran.'],
          ['IPS (Intrusion Prevention System)', 'Turut menyekat trafik berbahaya secara automatik dan menutup sambungan mencurigakan sebelum menjejaskan sistem.'],
        ]} />
        <p className="mt-3">Penganalisis trafik seperti <b>Wireshark, SolarWinds NetFlow Traffic Analyzer, Zeek</b> dan <b>Darktrace</b> mengesan corak luar biasa (lonjakan bandwidth mendadak, sambungan ke pelayan tidak dikenali) sebagai amaran awal serangan siber.</p>
      </InfoCard>

      <Latihan items={['Apakah yang dimaksudkan dengan Sistem Pemantauan Rangkaian (NMS)?', 'Mengapakah NMS penting dalam pengurusan rangkaian komputer?', 'Nyatakan tiga contoh fungsi utama NMS.']} />
      <Ringkasan>NMS memantau rangkaian secara automatik dan masa nyata merentasi <b>5 jenis</b>: kesalahan (fault), konfigurasi, perakaunan, prestasi dan keselamatan. Kesalahan ditangani melalui kitaran <b>Kenal Pasti → Diagnosis → Tindak Balas</b>, manakala keselamatan disokong oleh IDS/IPS dan penganalisis trafik.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 2: PEMASANGAN PERISIAN NMS & AMARAN MASA NYATA ---------------- */
function NmsInstallNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Prosedur Pemasangan Perisian NMS" icon={DownloadCloud}>
        <p>Pemasangan perisian NMS bermula dengan perancangan awal dan pemilihan perisian yang sesuai (contoh: <b>Nagios, Zabbix, PRTG, WhatsUp Gold</b>), diikuti penyediaan pelayan dan keperluan sistem. Perisian dipasang dan dikonfigurasi untuk memantau peranti serta parameter yang ditetapkan, diuji untuk memastikan berfungsi baik, dan diakhiri dengan dokumentasi serta penyelenggaraan berkala.</p>
      </InfoCard>
      <FlowRow steps={['Perancangan & pemilihan perisian', 'Sediakan pelayan', 'Pasang & konfigurasi', 'Pengujian', 'Dokumentasi & penyelenggaraan']} />

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"Kaedah Pelaksanaan Amaran & Pelaporan Masa Nyata"} className="text-rose-600 shrink-0" size={20} />Kaedah Pelaksanaan Amaran & Pelaporan Masa Nyata</h3>
        <StepList steps={[
          { title: 'Pemasangan Perisian NMS', desc: 'Sistem seperti Zabbix, PRTG atau Nagios dipasang pada pelayan utama.' },
          { title: 'Konfigurasi Parameter NMS', desc: 'Nilai ambang (threshold) ditetapkan untuk parameter seperti penggunaan memori atau suhu CPU.' },
          { title: 'Integrasi Sistem Makluman', desc: 'Notifikasi diaktifkan apabila nilai pemantauan melebihi ambang, dihantar melalui saluran automatik (emel, SMS, dashboard).' },
          { title: 'Pelaporan Visual', desc: 'Dashboard masa nyata menunjukkan status kesihatan rangkaian, trafik semasa dan kejadian ralat.' },
          { title: 'Pengujian Senario Gangguan', desc: 'Simulasi gangguan mengukur keberkesanan amaran dan pelaporan dalam mengesan serta menangani masalah.' },
        ]} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Kepentingan Kepada Organisasi" icon={Award}>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Mengurangkan masa henti (downtime) - masalah dikenal pasti serta-merta.</li>
            <li>Meningkatkan keselamatan rangkaian - kesan cubaan pencerobohan.</li>
            <li>Menyokong pengurusan prestasi melalui data untuk analisis dan perancangan.</li>
            <li>Memudahkan penyelenggaraan proaktif - tindakan pencegahan sebelum kegagalan.</li>
          </ul>
        </InfoCard>
        <InfoCard title="Cabaran Pelaksanaan" icon={AlertTriangle}>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><b>Makluman palsu (false alarm)</b> - mengelirukan pentadbir dan mengurangkan keberkesanan sistem.</li>
            <li><b>Keperluan teknikal tinggi</b> - konfigurasi awal kompleks, data yang banyak.</li>
            <li><b>Kos operasi</b> - terutama sistem berskala besar memerlukan infrastruktur berprestasi tinggi.</li>
          </ul>
          <p className="mt-3">Organisasi perlu menyediakan latihan khusus dan memilih perisian yang sesuai dengan saiz rangkaian mereka.</p>
        </InfoCard>
      </div>

      <InfoCard title="Kemas Kini Perisian NMS" icon={RefreshCw}>
        <p>Tanpa kemas kini berterusan, NMS boleh menjadi tidak efisien, terdedah kepada risiko keselamatan, dan tidak dapat menyokong teknologi rangkaian terbaru. Kemas kini turut membawa peningkatan prestasi: pembaikan dan pengoptimuman kelajuan pemprosesan, algoritma pemantauan yang lebih baik, dan masa tindak balas yang lebih pantas - mengelakkan kelewatan pengesanan masalah yang boleh menjejaskan operasi organisasi.</p>
      </InfoCard>

      <Latihan items={['Apakah fungsi sistem pemantauan rangkaian?', 'Apakah langkah pertama sebelum memasang perisian sistem pemantauan rangkaian?', 'Mengapa ujian selepas pemasangan penting?']} />
      <Ringkasan>Pemasangan NMS: <b>rancang → sedia pelayan → pasang & konfigurasi → uji → dokumentasi & selenggara</b>. Amaran masa nyata memerlukan ambang parameter, integrasi notifikasi dan dashboard visual. Cabaran utama ialah <b>makluman palsu</b>, kerumitan teknikal dan kos; kemas kini berkala mengekalkan keselamatan dan prestasi.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 3: SNMP DALAM NMS ---------------- */
function SnmpNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Apakah SNMP?" icon={Network}>
        <p>Simple Network Management Protocol (SNMP) ialah protokol yang membolehkan pemantauan dan pengurusan peranti rangkaian (router, switch, server) secara automatik. Ia membantu mendapatkan maklumat status, mengesan ralat serta menghantar amaran masa nyata.</p>
      </InfoCard>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: Network, t: 'Manager', d: 'Perisian dalam NMS yang menghantar permintaan dan menerima maklum balas daripada peranti.' },
          { icon: Cpu, t: 'Agent', d: 'Perisian kecil pada peranti yang mengumpul data - status sambungan, CPU, suhu.' },
          { icon: Database, t: 'MIB', d: 'Management Information Base - struktur pangkalan data yang menyimpan maklumat khusus komponen rangkaian.' },
        ].map((c) => (
          <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-700 mb-3"><c.icon size={19} /></div>
            <p className="font-black text-slate-900 text-sm">{c.t}</p>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{c.d}</p>
          </div>
        ))}
      </div>

      <SnmpDiagram />

      <NotesTable headers={['Operasi', 'Fungsi']} rows={[
        ['GET Request', 'Pengurus mendapatkan maklumat daripada agen.'],
        ['SET Request', 'Pengurus mengubah konfigurasi atau menetapkan nilai parameter pada peranti.'],
        ['GETNEXT Request', 'Mendapatkan nilai objek seterusnya dalam MIB - sesuai untuk mengimbas keseluruhan senarai objek.'],
        ['GETBULK Request (SNMPv2+)', 'Mendapatkan sejumlah besar maklumat dalam satu masa, meningkatkan kecekapan pertanyaan.'],
        ['GET Response', 'Maklum balas agen kepada pengurus - mengandungi data diminta atau kod ralat.'],
        ['TRAP', 'Mesej amaran automatik daripada agen apabila berlaku kegagalan atau perubahan luar biasa (unsolicited).'],
        ['INFORM (SNMPv2+)', 'Seperti TRAP, tetapi memerlukan pengesahan penerimaan daripada pengurus - lebih dipercayai.'],
      ]} />

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"Perbandingan Versi SNMP"} className="text-rose-600 shrink-0" size={20} />Perbandingan Versi SNMP</h3>
        <SnmpVersionCards />
        <NotaPenting>Ketiga-tiga versi menggunakan protokol <b>UDP port 161</b> untuk permintaan/respons (TRAP menggunakan port 162). SNMPv3 menambah pengesahan pengguna, penyulitan data dan kawalan akses - lebih kompleks untuk dikonfigurasi tetapi paling selamat.</NotaPenting>
      </div>

      <Latihan items={['Terangkan peranan SNMP dalam Sistem Pemantauan Rangkaian.', 'Huraikan komponen utama dalam SNMP dan fungsi masing-masing.', 'Jelaskan perbezaan antara operasi GET dan SET dalam protokol SNMP.']} />
      <Ringkasan>SNMP beroperasi melalui <b>Manager, Agent</b> dan <b>MIB</b>. Operasi utama: <b>GET, SET, GETNEXT, GETBULK, GET Response, TRAP</b> dan <b>INFORM</b>. SNMPv1/v2c sesuai rangkaian kecil-sederhana; <b>SNMPv3</b> paling selamat dan sesuai untuk rangkaian besar/kritikal.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 4: PENGENALAN & JENIS NAS ---------------- */
function NasIntroNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Apakah Network Attached Storage (NAS)?" icon={HardDrive}>
        <p>NAS ialah sistem penyimpanan data berasaskan rangkaian yang membolehkan pelbagai pengguna dan peranti mengakses, menyimpan dan berkongsi data secara efisien. Ia bertindak sebagai pusat storan mudah diurus dengan perkongsian fail, backup automatik dan kawalan akses pengguna.</p>
      </InfoCard>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { t: 'Penyimpanan Berpusat & Pengurusan Akses', d: 'Lokasi storan utama; pentadbir mengurus akses melalui keizinan dan akaun pengguna.' },
          { t: 'Perkongsian Fail Merentas Rangkaian', d: 'Menyokong SMB, NFS dan FTP untuk keserasian pelbagai sistem operasi.' },
          { t: 'Salinan & Data Berulang', d: 'Backup automatik; menyokong RAID untuk redundancy dan integriti data.' },
        ].map((c) => (
          <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="font-black text-slate-900 text-sm">{c.t}</p>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{c.d}</p>
          </div>
        ))}
      </div>

      <InfoCard title="Fungsi NAS" icon={Layers}>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>Simpan dan urus data</b> untuk berbilang pengguna/peranti secara serentak tanpa gangguan prestasi.</li>
          <li><b>Perkongsian dan perolehan data</b> melalui protokol SMB (Windows/macOS) dan NFS (Linux) yang menyokong interoperabiliti.</li>
        </ul>
      </InfoCard>

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"3 Peringkat Jenis NAS"} className="text-rose-600 shrink-0" size={20} />3 Peringkat Jenis NAS</h3>
        <NotesTable headers={['Peringkat', 'Ciri-ciri']} rows={[
          ['Enterprise (Perusahaan)', 'Kapasiti sangat besar, kebolehpercayaan tinggi, sambungan 10GbE+, RAID lanjutan, replikasi merentas lokasi, keselamatan kukuh dan pemantauan canggih.'],
          ['Midmarket (Pertengahan)', 'Keseimbangan kos-prestasi; beberapa pengguna serentak, RAID asas, backup automatik, akses jauh; lebih mudah dikendalikan berbanding enterprise.'],
          ['Consumer (Pengguna)', 'Untuk individu/keluarga; storan media, sandaran fail; mudah dipasang; biasanya 1-2 bay cakera sahaja; tiada ciri lanjutan.'],
        ]} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Pengurusan Aplikasi NAS" icon={Settings}>
          <p>Melibatkan konfigurasi pengguna, kawalan akses, pengurusan cakera dan pemasangan aplikasi tambahan (sistem sandaran, media server, perkhidmatan awan) melalui dashboard pengeluar seperti <b>Synology</b> atau <b>QNAP</b>. Turut membolehkan kemas kini firmware dan modul keselamatan secara berkala.</p>
        </InfoCard>
        <InfoCard title="Pemantauan Kesihatan & Prestasi" icon={Activity}>
          <p>Pemerhatian suhu sistem, status cakera (SMART monitoring), beban CPU/RAM dan trafik rangkaian. Pemberitahuan automatik melalui e-mel atau apl mudah alih apabila cakera gagal, suhu tinggi, atau ruang storan hampir penuh - membolehkan tindakan pencegahan awal.</p>
        </InfoCard>
      </div>

      <Latihan items={['Terangkan konsep asas Network Attached Storage (NAS) dan peranannya dalam sistem rangkaian moden.', 'Huraikan tiga jenis NAS berdasarkan tahap penggunaannya dan berikan contoh bagi setiap jenis.']} />
      <Ringkasan>NAS ialah storan berasaskan rangkaian dengan 3 peranan (simpan berpusat, kongsi fail, backup/redundancy) dan 3 peringkat: <b>Enterprise, Midmarket, Consumer</b>. Pengurusan aplikasi (dashboard) dan pemantauan kesihatan (SMART, suhu, CPU/RAM) memastikan NAS beroperasi optimum.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 5: TATACARA PEMASANGAN NAS ---------------- */
function NasInstallNotes() {
  const req = (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Keperluan Perkakasan" icon={Cpu}>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><b>Peranti NAS</b> - unit utama dengan pemproses, RAM, slot cakera dan port rangkaian.</li>
            <li><b>HDD</b> direka untuk operasi 24/7 dan RAID - contoh WD Red, Seagate IronWolf.</li>
            <li><b>Sambungan rangkaian</b> - kabel Ethernet minimum Cat5e/Cat6 (gigabit); perusahaan perlukan 10GbE+.</li>
            <li><b>Bekalan kuasa & UPS</b> - elak kerosakan sistem akibat gangguan elektrik.</li>
          </ul>
        </InfoCard>
        <InfoCard title="Keperluan Perisian" icon={MonitorCog}>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><b>NAS OS</b>: DiskStation Manager (Synology), QTS (QNAP), atau TrueNAS - konfigurasi RAID, akaun, kawalan akses, pemantauan.</li>
            <li><b>Perisian tambahan</b>: sistem backup automatik, media server, cloud sync, perisian pemantauan.</li>
          </ul>
        </InfoCard>
      </div>
      <StepList steps={[
        { title: 'Penyambungan Fizikal', desc: 'Sambung NAS ke sumber kuasa dan rangkaian melalui kabel Ethernet; pasang HDD ke ruang yang disediakan.' },
        { title: 'Konfigurasi Awal & Persediaan Sistem', desc: 'Akses NAS melalui pelayar web menggunakan alamat IP (ditetapkan router) atau aplikasi pengeluar. Pasang NAS OS (DSM/QTS), tetapkan akaun pentadbir, tetapan rangkaian dan RAID jika perlu.' },
        { title: 'Penyepaduan ke Persekitaran Rangkaian', desc: 'Konfigurasi folder kongsi, cipta akaun pengguna dengan tahap keizinan, aktifkan protokol perkongsian fail (SMB, NFS, FTP) supaya serasi dengan Windows, Linux dan macOS.' },
        { title: 'Ciri Akses Jauh & Aplikasi Tambahan', desc: 'Konfigurasi Dynamic DNS, VPN atau QuickConnect untuk capaian jauh; pasang aplikasi backup, media server dan cloud sync mengikut keperluan.' },
      ]} />
    </>
  );
  const share = (
    <>
      <StepList steps={[
        { title: 'Cipta Folder Kongsi (Shared Folder)', desc: 'Akses dashboard NAS → File Sharing / Control Panel → Create Shared Folder. Berikan nama, lokasi (volume) dan tetapan seperti penyulitan jika diperlukan.' },
        { title: 'Tetapkan Kebenaran Akses (Permissions)', desc: 'Pilih akaun/kumpulan pengguna dan tetapkan hak akses: Read Only, Read/Write, atau Deny Access.' },
        { title: 'Aktifkan Protokol Perkongsian', desc: 'SMB/CIFS untuk Windows & macOS; NFS untuk Linux/UNIX; FTP/SFTP untuk klien FTP atau pemindahan fail jarak jauh - diaktifkan melalui File Services.' },
        { title: 'Akses Folder melalui Rangkaian', desc: 'Guna Windows Explorer, macOS Finder atau Linux file manager dengan alamat IP NAS.', code: ['~\\\\192.168.1.100\\folder-kongsi   # SMB', '~nfs://192.168.1.100/folder-kongsi   # NFS'] },
        { title: 'Ujian dan Pemantauan Akses', desc: 'Uji akses dari pelbagai peranti; pantau log akses dan penggunaan folder untuk mengesan aktiviti mencurigakan.' },
      ]} />
      <NotesTable headers={['Protokol Capaian Jauh', 'Kegunaan']} rows={[
        ['VPN', 'Sambungan selamat melalui rangkaian awam; menyulitkan data dan melindungi privasi.'],
        ['DDNS', 'Membolehkan NAS diakses menggunakan nama domain walaupun alamat IP berubah.'],
        ['QuickConnect / MyQNAPCloud', 'Perkhidmatan vendor (Synology/QNAP) untuk capaian jauh tanpa konfigurasi rangkaian kompleks.'],
        ['FTP/SFTP', 'Pemindahan fail; SFTP lebih selamat kerana sambungan terenkripsi SSH.'],
        ['WebDAV', 'Akses dan urus fail NAS melalui pelayar web atau aplikasi klien secara fleksibel.'],
      ]} />
    </>
  );
  const upd = (
    <>
      <InfoCard title="Kemas Kini Perisian NAS" icon={RefreshCw}>
        <p>Kemas kini NAS OS (DSM/QTS) dan aplikasi berkaitan penting untuk <b>penambahbaikan keselamatan</b> (tampal kelemahan), <b>penstabilan sistem</b> (betulkan pepijat), <b>penambahan ciri baharu</b>, dan <b>keserasian</b> dengan perkakasan/perisian terkini.</p>
      </InfoCard>
      <StepList steps={[
        { title: 'Log masuk ke dashboard NAS' },
        { title: 'Navigasi ke System Settings / Control Panel > Update & Restore' },
        { title: 'Semak kemas kini secara manual atau aktifkan auto-update' },
        { title: 'Muat turun dan pasang', desc: 'NAS mungkin akan reboot selepas proses selesai.' },
      ]} />
    </>
  );
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <SubTabs tabs={[{ label: '1. Keperluan & Pemasangan', content: req }, { label: '2. Folder Kongsi & Akses Jauh', content: share }, { label: '3. Kemas Kini Perisian', content: upd }]} />
      <Latihan items={['Terangkan secara ringkas kepentingan tatacara pemasangan NAS dalam sesebuah organisasi.', 'Apakah faktor utama yang perlu dipertimbangkan semasa memilih peranti storan untuk NAS?']} />
      <Ringkasan>Pemasangan NAS: <b>sambung fizikal → konfigurasi awal (NAS OS, RAID) → penyepaduan (folder kongsi, protokol SMB/NFS) → akses jauh (VPN/DDNS/QuickConnect) → kemas kini berkala</b>. Setiap folder kongsi memerlukan tetapan kebenaran (Read Only/Read-Write/Deny).</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 6: SISTEM STORAN RAID ---------------- */
function RaidNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Pengenalan RAID" icon={Layers}>
        <p>RAID (Redundant Array of Independent Disks) ialah teknologi storan yang menggabungkan beberapa cakera keras untuk membentuk satu sistem storan logik, meningkatkan keselamatan, prestasi dan kebolehpercayaan data. Digunakan meluas dalam NAS melalui konfigurasi seperti RAID 0, 1, 5, 6 dan 10.</p>
      </InfoCard>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          ['Redundansi Data', 'Salinan/pariti supaya data tidak hilang jika cakera gagal.'],
          ['Peningkatan Prestasi', 'Baca/tulis lebih pantas melalui striping.'],
          ['Kebolehpercayaan Sistem', 'NAS terus beroperasi walau satu/dua cakera rosak (bergantung tahap RAID).'],
          ['Pengurusan Storan Efisien', 'Gabungan kapasiti cakera untuk ruang tersusun.'],
        ].map(([t, d]) => (
          <div key={t} className="rounded-xl bg-white border border-slate-200 p-3"><p className="font-black text-slate-900 text-sm">{t}</p><p className="text-xs text-slate-600 mt-1">{d}</p></div>
        ))}
      </div>

      <RaidVisualizer />

      <NotesTable headers={['Tahap RAID', 'Ciri Utama', 'Min. Cakera', 'Redundansi', 'Kecekapan Storan']} rows={[
        ['RAID 0', 'Striping tanpa penduaan - prestasi sangat tinggi', '2', 'Tiada', '100%'],
        ['RAID 1', 'Mirroring - baca tinggi, tulis sederhana', '2', 'Tahan 1 cakera gagal', '50%'],
        ['RAID 5', 'Striping + 1 pariti teragih', '3', 'Tahan 1 cakera gagal', '(N-1)/N'],
        ['RAID 6', 'Striping + 2 lapisan pariti', '4', 'Tahan 2 cakera gagal', '(N-2)/N'],
        ['RAID 10', 'Gabungan mirror + stripe (RAID 1+0)', '4', 'Tinggi', '50%'],
      ]} />

      <InfoCard title="Contoh Pengiraan Kapasiti (RAID 5)" icon={Database}>
        <p className="font-mono text-sm bg-slate-50 border border-slate-200 rounded-xl p-3">NAS 4-bay × 4 TB (RAID 5) = 12 TB digunakan, 4 TB untuk pariti</p>
        <p className="mt-3">RAID 0 menggunakan 100% kapasiti (tiada redundansi); RAID 1 hanya 50% (data diduakan); RAID 5 ialah (N-1) cakera untuk data; RAID 6 ialah (N-2) cakera untuk data.</p>
      </InfoCard>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Prestasi NAS" icon={Gauge}>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Kelajuan sambungan rangkaian (1GbE, 2.5GbE, 10GbE+).</li>
            <li>Pemproses (CPU) dan RAM - multitugas dan akses fail lebih pantas.</li>
            <li>Jenis cakera (SSD lebih pantas) dan konfigurasi RAID (RAID 0 = prestasi maksimum, RAID 10 = prestasi + keselamatan).</li>
            <li>SSD caching mempercepat operasi bacaan berulang.</li>
          </ul>
        </InfoCard>
        <InfoCard title="Kapasiti NAS" icon={Boxes}>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Bilangan slot cakera (drive bays) - consumer 1-4 bay, enterprise 12+ bay atau expansion unit.</li>
            <li>Jenis RAID menentukan kapasiti sebenar boleh digunakan.</li>
            <li>Skalabiliti melalui JBOD (Just a Bunch of Disks) atau expansion chassis.</li>
          </ul>
        </InfoCard>
      </div>

      <Latihan items={['Terangkan perbezaan antara RAID 0, RAID 1 dan RAID 5 dari aspek prestasi dan perlindungan data.', 'Apakah faedah utama penggunaan RAID dalam sistem NAS? Huraikan dengan contoh yang sesuai.']} />
      <Ringkasan>RAID menggabungkan cakera untuk <b>redundansi, prestasi</b> dan <b>kebolehpercayaan</b>. <b>RAID 0</b> = laju tanpa redundansi; <b>RAID 1</b> = mirror (50%); <b>RAID 5/6</b> = striping + pariti ((N-1)/(N-2)); <b>RAID 10</b> = gabungan mirror+stripe. Kapasiti sebenar bergantung tahap RAID yang dipilih.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 7: PENGURUSAN CAPAIAN PENGGUNA NAS ---------------- */
function NasAccessNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Keistimewaan Kebolehcapaian NAS" icon={Users}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-2">
          {[
            ['Akses Pelbagai Peranti', 'Komputer, telefon pintar, tablet - selagi disambung ke rangkaian.'],
            ['Capaian Jauh', 'Melalui FTP, WebDAV atau aplikasi khas.'],
            ['Perkongsian Mudah', 'Kongsi fail pantas tanpa peranti fizikal tambahan.'],
            ['Sokongan Multi-platform', 'Windows, macOS dan Linux.'],
            ['Kawalan Akses Selamat', 'Akaun pengguna dan kata laluan mengawal hak akses.'],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl bg-rose-50 border border-rose-200 p-3"><p className="font-black text-rose-900 text-xs">{t}</p><p className="text-[11px] text-rose-800 mt-1">{d}</p></div>
          ))}
        </div>
      </InfoCard>

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"4 Kaedah Pengurusan Capaian Pengguna"} className="text-rose-600 shrink-0" size={20} />4 Kaedah Pengurusan Capaian Pengguna</h3>
        <NotesTable headers={['Kaedah', 'Penerangan']} rows={[
          ['Akaun Pengguna & Kumpulan', 'Pentadbir mencipta akaun individu/kumpulan dengan keizinan khusus kepada direktori tertentu.'],
          ['Kawalan Akses (Permissions)', 'Model DAC (Discretionary Access Control) menentukan siapa boleh baca, tulis atau ubah data.'],
          ['Pengesahan & 2FA', 'Kata laluan, integrasi LDAP/Active Directory, atau Two-Factor Authentication (2FA).'],
          ['Audit Log & Pemantauan', 'Merekod aktiviti pengguna untuk audit keselamatan dan pengesanan tingkah laku mencurigakan.'],
        ]} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Capaian Individu" icon={UserCog}>
          <p>Hak akses khusus kepada pengguna berdaftar; setiap pengguna mempunyai identiti sendiri dilindungi kata laluan. Membolehkan kawalan terperinci dan penjejakan aktiviti individu - sesuai untuk data sensitif, tapi meningkatkan beban pentadbiran apabila bilangan pengguna meningkat.</p>
        </InfoCard>
        <InfoCard title="Capaian Berkumpulan (Group Access)" icon={Users}>
          <p>Pengguna dikategorikan mengikut jabatan/peranan; setiap kumpulan diberi hak akses kolektif dan ahli mewarisi keizinan secara automatik. Lebih cekap untuk pentadbiran dan konsisten, mengurangkan risiko kesilapan konfigurasi.</p>
        </InfoCard>
      </div>

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"Tahap Kebenaran Akses"} className="text-rose-600 shrink-0" size={20} />Tahap Kebenaran Akses</h3>
        <NotesTable headers={['Tahap', 'Kebenaran', 'Contoh Penggunaan']} rows={[
          ['Read Permission', 'Lihat dan akses kandungan sahaja - tiada ubah/padam/tambah.', 'Semak fail polisi HR; pelajar akses nota kuliah.'],
          ['Write Permission', 'Ubah fail sedia ada, cipta fail baharu, padam data.', 'Kemas kini laporan kewangan; suntingan dokumen kolaboratif.'],
          ['Administrative Privileges', 'Akses penuh: tambah/buang pengguna, tetapkan hak akses, konfigurasi sistem dan backup.', 'Hanya untuk pentadbir sistem yang bertanggungjawab teknikal.'],
        ]} />
      </div>

      <Latihan items={['Jelaskan keistimewaan kebolehcapaian sistem NAS serta bagaimana ia menyokong keperluan organisasi masa kini.']} />
      <Ringkasan>NAS diurus melalui 4 kaedah: <b>akaun & kumpulan, permissions (DAC), pengesahan/2FA</b> dan <b>audit log</b>. Capaian boleh diberi secara <b>individu</b> (kawalan terperinci) atau <b>berkumpulan</b> (cekap untuk pasukan), dengan 3 tahap kebenaran: <b>Read, Write</b> dan <b>Administrative</b>.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 8: AKSES JAUH & KESELAMATAN NAS ---------------- */
function NasSecurityNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Akses Jauh NAS" icon={Cloud}>
        <p>Akses jauh (remote access) membolehkan pengguna bekerja secara mobil tanpa mengabaikan keselamatan dan prestasi, melalui VPN, FTP/SFTP atau perkhidmatan awan NAS.</p>
      </InfoCard>

      <NotesTable headers={['Kaedah', 'Keselamatan', 'Kemudahan', 'Kawalan', 'Prestasi']} rows={[
        ['VPN', 'Sangat tinggi', 'Sederhana', 'Tinggi', 'Tinggi'],
        ['FTP/SFTP', 'Sederhana (FTP) / Tinggi (SFTP)', 'Sederhana', 'Sederhana', 'Tinggi'],
        ['Perkhidmatan Awan (QuickConnect dll.)', 'Tinggi (bergantung pengilang)', 'Tinggi', 'Terhad', 'Sederhana'],
      ]} />
      <div className="grid md:grid-cols-3 gap-4">
        <InfoCard title="VPN" icon={Lock}>
          <p className="text-xs">Terowong penyulitan end-to-end; pengguna kelihatan seolah dalam rangkaian tempatan. Perlu konfigurasi pelayan VPN dan mungkin perisian klien khas.</p>
        </InfoCard>
        <InfoCard title="FTP / SFTP" icon={FileWarning}>
          <p className="text-xs">FTP biasa tidak selamat tanpa penyulitan - digalakkan guna SFTP (SSH). Mudah disediakan, sesuai perkongsian fail berskala sederhana.</p>
        </InfoCard>
        <InfoCard title="Perkhidmatan Awan NAS" icon={Cloud}>
          <p className="text-xs">Synology QuickConnect, QNAP myQNAPcloud, WD My Cloud - akses tanpa konfigurasi rangkaian kompleks, tapi bergantung pelayan pihak ketiga (cloud relay).</p>
        </InfoCard>
      </div>

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"Penyulitan, Pengesahan & Log Audit"} className="text-rose-600 shrink-0" size={20} />Penyulitan, Pengesahan & Log Audit</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <InfoCard title="Penyulitan (Encryption)" icon={Lock}>
            <p><b>Data-at-Rest</b>: melindungi data pada cakera (contoh AES-256), menghalang penceroboh membaca data walau cakera dikeluarkan.</p>
            <p className="mt-2"><b>Data-in-Transit</b>: HTTPS, SFTP atau VPN melindungi data semasa penghantaran.</p>
          </InfoCard>
          <InfoCard title="Pengesahan (Authentication)" icon={KeyRound}>
            <ul className="list-disc pl-5 space-y-1">
              <li>Nama pengguna & kata laluan (asas).</li>
              <li>2FA - lapisan tambahan melalui apl mudah alih.</li>
              <li>LDAP/Active Directory - pengesahan berpusat & role-based access.</li>
              <li>Public Key Authentication - untuk SFTP/SSH.</li>
            </ul>
          </InfoCard>
          <InfoCard title="Log Audit (Audit Logs)" icon={ScrollText}>
            <p>Merekod masa/tarikh capaian, identiti pengguna, fail diakses/diubah/dipadam, dan percubaan capaian gagal. Membolehkan jejak forensik, pemantauan pematuhan (cth. ISO 27001) dan amaran masa nyata terhadap anomali.</p>
          </InfoCard>
        </div>
      </div>

      <Latihan items={['Senaraikan kelebihan dan kekurangan penggunaan FTP, SFTP dan perkhidmatan awan NAS bagi tujuan capaian jauh.', 'Terangkan bagaimana log audit membantu dalam pengesanan ancaman dan pematuhan dasar keselamatan.']} />
      <Ringkasan>Akses jauh NAS melalui <b>VPN</b> (paling selamat), <b>FTP/SFTP</b> (mudah, guna SFTP untuk keselamatan) atau <b>perkhidmatan awan vendor</b> (mudah tapi bergantung pihak ketiga). Keselamatan data dibina atas 3 tunjang: <b>penyulitan</b> (at-rest/in-transit), <b>pengesahan</b> (kata laluan/2FA/LDAP) dan <b>log audit</b> untuk jejak forensik.</Ringkasan>
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
  const [activeQuestions, setActiveQuestions] = useState(() => shuffleQuestions(ikr3113QuizSets[0].questions));

  const currentSet = ikr3113QuizSets[kpIndex];
  const passScore = 18;

  const score = useMemo(() => activeQuestions.reduce((total, question, index) => total + (answers[index] === question.options.indexOf(question.correct) ? 1 : 0), 0), [answers, activeQuestions]);

  const retryLevel = () => {
    setAnswers({});
    setSubmitted(false);
    setActiveQuestions(shuffleQuestions(ikr3113QuizSets[kpIndex].questions));
  };

  const nextKp = () => {
    if (score >= passScore && kpIndex < ikr3113QuizSets.length - 1) {
      const nextIndex = kpIndex + 1;
      setHighestKp(previous => Math.max(previous, nextIndex));
      setKpIndex(nextIndex);
      setAnswers({});
      setSubmitted(false);
      setActiveQuestions(shuffleQuestions(ikr3113QuizSets[nextIndex].questions));
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
            <div className="text-xs font-black uppercase tracking-[.2em] text-rose-700">Tahap Kuiz</div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{currentSet.code} - {currentSet.title}</h2>
            <p className="text-sm text-slate-600 mt-2">Setiap KP mengandungi 30 soalan (10 easy, 10 medium, 10 hard KBAT). Lulus minimum ialah 18/30.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ikr3113QuizSets.map((item, index) => (
              <button key={item.id} disabled={index > highestKp || (index === kpIndex && submitted && score < passScore)} onClick={() => {
                if (index <= highestKp) {
                  setKpIndex(index);
                  setAnswers({});
                  setSubmitted(false);
                  setActiveQuestions(shuffleQuestions(ikr3113QuizSets[index].questions));
                }
              }} className={`rounded-full px-4 py-2 text-xs font-black border ${index === kpIndex ? 'bg-rose-600 border-rose-600 text-white' : 'bg-white border-slate-300 text-slate-700'} ${index > highestKp ? 'opacity-50 cursor-not-allowed' : ''}`}>{item.code}</button>
            ))}
          </div>
        </div>
      </div>

      {submitted && (
        <div className={`rounded-2xl p-6 mb-6 text-white ${score >= passScore ? 'bg-emerald-600' : 'bg-rose-600'}`}>
          <div className="flex items-center gap-3"><Award size={34} /><div><p className="text-sm font-bold opacity-90">Keputusan {currentSet.code}</p><h2 className="text-3xl font-black">{score} / {activeQuestions.length}</h2></div></div>
          <p className="mt-3 font-medium">
            {score >= passScore
              ? `Lulus ${currentSet.code}. Anda layak ${kpIndex < ikr3113QuizSets.length - 1 ? 'naik ke ' + ikr3113QuizSets[kpIndex + 1].code : 'menamatkan semua KP'}.`
              : `Belum lulus. Markah minimum ialah 18/30 - sila ulang ${currentSet.code} sebelum naik ke tahap seterusnya.`}
          </p>
        </div>
      )}

      <div className="space-y-5">
        {activeQuestions.map((question, index) => (
          <article key={`${currentSet.id}-${index}-${question.question}`} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2"><span className={`text-[10px] font-black uppercase tracking-wide rounded-full px-2.5 py-1 ${question.difficulty === 'hard' ? 'bg-rose-100 text-rose-700' : question.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{question.difficulty === 'hard' ? 'Hard KBAT' : question.difficulty === 'medium' ? 'Medium' : 'Easy'}</span></div>
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
                    className={`text-left p-3 rounded-xl border text-sm font-medium transition-all ${correct ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : wrong ? 'border-rose-500 bg-rose-50 text-rose-800' : selected ? 'border-rose-500 bg-rose-50 text-rose-800' : 'border-slate-200 hover:border-rose-300'}`}
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
          <button disabled={Object.keys(answers).length !== activeQuestions.length} onClick={handleSubmit} className="flex-1 bg-rose-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-black hover:bg-rose-700 transition-colors">Hantar Jawapan {currentSet.code}</button>
        ) : (
          <>
            {score >= passScore && kpIndex < ikr3113QuizSets.length - 1 && (
              <button onClick={nextKp} className="flex-1 bg-emerald-600 text-white px-6 py-4 rounded-xl font-black hover:bg-emerald-700">Naik ke {ikr3113QuizSets[kpIndex + 1].code}</button>
            )}
            <button onClick={retryLevel} className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-xl font-black hover:bg-slate-800"><RotateCcw size={19} /> Cuba Semula {currentSet.code}</button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- KOMPONEN UTAMA ---------------- */
export default function IKR3113({ onBackToPortal }) {
  const [view, setView] = useState('menu');
  const [readState, setReadState] = useState(() => {
    const fallback = [false, false, false, false, false, false, false, false];
    try {
      const saved = JSON.parse(localStorage.getItem('ikr3113-read-state'));
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
    try { localStorage.setItem('ikr3113-read-state', JSON.stringify(fallback)); } catch { /* storan tidak tersedia */ }
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
    try { localStorage.setItem('ikr3113-read-state', JSON.stringify(nextReadState)); } catch { /* storan tidak tersedia */ }
    const nextInLine = sections[requested + 1];
    if (nextInLine) setView(nextInLine.id);
  };

  if (view !== 'menu') {
    const content = {
      'nms-intro': <NmsIntroNotes />,
      'nms-install': <NmsInstallNotes />,
      snmp: <SnmpNotes />,
      'nas-intro': <NasIntroNotes />,
      'nas-install': <NasInstallNotes />,
      raid: <RaidNotes />,
      'nas-access': <NasAccessNotes />,
      'nas-security': <NasSecurityNotes />,
      quiz: <Quiz />,
    }[view];

    const showCompleteButton = sections.some((section) => section.id === view);
    const headerMeta = sections.find((section) => section.id === view) || featureCards.find((f) => f.id === view) || sections[0];

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <ImsAnimStyles />
        <div className="bg-slate-950 text-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Terminal size={30} className="text-rose-300" />
                <div>
                  <div className="text-[10px] uppercase tracking-[.2em] text-rose-300 font-black">Network Monitoring Services</div>
                  <div className="text-sm font-black">{completedCount}/{sections.length} bahagian</div>
                </div>
              </div>
              <div className="flex-1 max-w-md">
                <div className="flex items-center justify-between text-[10px] font-black tracking-[.18em] text-rose-200 uppercase"><span>Progress</span><span>{progressPercent}%</span></div>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-rose-300 to-fuchsia-300 transition-all" style={{ width: `${progressPercent}%` }} /></div>
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
        <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">IKR3113 Network Monitoring Services - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>
      </div>
    );
  }

  return (
    <div className="course-menu-page min-h-screen bg-slate-50 text-slate-900">
      <ImsAnimStyles />
      <ModuleMenu title="Modul IKR3113: Network Monitoring Services" icon={sections[0].icon} secondaryIcon={sections[1].icon}
        onBack={onBackToPortal} topics={sections} read={readState} onTopic={section => openSection(section.id)} onReset={resetProgress}
        description={<>Pemantauan rangkaian (NMS, SNMP) dan storan berasaskan rangkaian (NAS, RAID) - dipecahkan kepada 8 bahagian, lengkap dengan kuiz 180 soalan.</>}>
        <ModuleActivities activities={featureCards} simulations={simCards} quizLocked={!readState[sections.length - 1]} onOpen={openSection} />
      </ModuleMenu>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">IKR3113 Network Monitoring Services - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>
    </div>
  );
}

