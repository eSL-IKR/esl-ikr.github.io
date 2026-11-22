import ModuleMenu, { ModuleActivities } from './ModuleMenu';
import { useMemo, useState } from 'react';
import { ikr3103QuizSets } from './IKR3103QuizData.js';
import HeadingIcon from './headingIcons';
import {
  Activity, ArrowLeft, Award, Cable, Check, CheckCircle, ChevronRight, CircleDot, ClipboardCheck,
  Copy, Fingerprint, Folder, FolderTree, Gauge, Globe, Home, KeyRound, ListChecks, Lock, Network,
  RotateCcw, Router, ScrollText, Search, Server, ShieldCheck, Sparkles, Terminal, TestTube,
  User, Users, Wrench, XCircle,
} from 'lucide-react';

const sections = [
  { id: 'web', title: 'Web Server, TCP/IP & Virtual Hosting', desc: 'Fungsi perkhidmatan rangkaian, web server, HTTP/HTTPS, reverse proxy dan 3 jenis virtual host.', icon: Globe, accent: 'blue' },
  { id: 'secure', title: 'SSL/TLS, Kawalan Akses, Logging & Pemantauan', desc: 'Penyulitan, pengesahan, kaedah authentication, access log/error log dan alat pemantauan.', icon: ShieldCheck, accent: 'indigo' },
  { id: 'dnsdhcp', title: 'Fungsi DNS Server & DHCP Server', desc: 'Proses DNS Lookup, jenis rekod, mesej DHCP, lease, IP pool dan kelebihan DHCP.', icon: Network, accent: 'violet' },
  { id: 'directory', title: 'Fungsi Directory Server (LDAP)', desc: 'Hierarki direktori, DN, object class, skema, indeks dan perisian directory server.', icon: FolderTree, accent: 'teal' },
  { id: 'webconf', title: 'Konfigurasi Web Server di Linux', desc: 'Apache/Nginx, virtual host, firewall UFW, pengujian, penyelenggaraan dan kemas kini.', icon: Server, accent: 'emerald' },
  { id: 'dnsconf', title: 'Konfigurasi DNS Server (BIND9)', desc: 'Zon dan fail zon, named-checkconf, nslookup/dig, DNSSEC dan ACL.', icon: Search, accent: 'amber' },
  { id: 'dhcpconf', title: 'Konfigurasi DHCP Server (ISC)', desc: 'dhcpd.conf, antaramuka, klien, dhcpd.leases, port 67/68 dan backup.', icon: Router, accent: 'orange' },
  { id: 'ldapconf', title: 'Konfigurasi Directory Server (OpenLDAP)', desc: 'slapd, LDIF, ldapadd/ldapsearch, SSL/TLS, slapcat dan audit.', icon: KeyRound, accent: 'rose' },
];

const featureCards = [
  { id: 'quiz', target: 'quiz', title: 'Kuiz Penilaian', desc: '150 soalan (5 KP x 30 soalan: 10 easy, 10 medium, 10 hard KBAT). Buka setelah menyelesaikan semua 8 Nota.', icon: Award, accent: 'rose' },
];


const simCards = [
  { file: 'nos-1-cli-asas.html', title: '1. Latihan Asas CLI Linux', desc: '25 arahan asas Debian: mod latihan dan mod peperiksaan 5 minit.', icon: Terminal, accent: 'blue' },
  { file: 'nos-2-data-center-3d.html', title: '2. 3D Avatar Data Center', desc: 'Berjalan dalam bilik pelayan 3D dan konfigur 4 rak pelayan.', icon: Server, accent: 'indigo' },
  { file: 'nos-3-web-server.html', title: '3. Amali LA 2: Web Server', desc: '20 langkah Apache2, SSL, UserDir, PHP, WebDAV dengan paparan pelayar.', icon: Globe, accent: 'emerald' },
  { file: 'nos-4-dns-server.html', title: '4. Amali LA 3: DNS Server', desc: '18 langkah BIND9: zon forward/reverse, CNAME, SPF dan DoH.', icon: Search, accent: 'amber' },
  { file: 'nos-5-dhcp-server.html', title: '5. Amali LA 4: DHCP Server', desc: '12 langkah ISC-DHCP: julat IP, lease dan ujian klien.', icon: Router, accent: 'orange' },
  { file: 'nos-6-directory-server.html', title: '6. Amali LA 5: Directory Server', desc: '22 langkah OpenLDAP: base DN, pengguna, SSL/TLS dan LAM.', icon: FolderTree, accent: 'teal' },
  { file: 'nos-debian13-services.html', title: 'Simulator Debian 13: Servis Rangkaian', desc: 'Terminal bergaya GNOME untuk IP statik, DHCP, DNS, web dan LDAP.', icon: Network, accent: 'violet' },
  { file: 'nos-debian-simulator.html', title: 'Simulator Debian: Mod Bantuan', desc: '26 langkah server dan klien dengan nota arahan lengkap.', icon: Wrench, accent: 'blue' },
  { file: 'nos-debian-simulator-exam.html', title: 'Simulator Debian: Mod Peperiksaan', desc: '26 langkah yang sama tanpa petunjuk, untuk ujian amali.', icon: ClipboardCheck, accent: 'rose' },
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
function NosAnimStyles() {
  return (
    <style>{`
      @keyframes nosBlink { 0%, 100% { opacity: 1; } 50% { opacity: .25; } }
      @keyframes nosSpin { to { transform: rotate(360deg); } }
      @keyframes nosFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes nosScaleIn { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: scale(1); } }
      @keyframes nosBarPulse { 0%, 100% { opacity: .5; } 50% { opacity: 1; } }
      .nos-blink { animation: nosBlink 1.4s ease-in-out infinite; }
      .nos-blink-delay { animation: nosBlink 1.4s ease-in-out infinite; animation-delay: .5s; }
      .nos-fan { animation: nosSpin 2.5s linear infinite; transform-origin: center; }
      .nos-fan-fast { animation: nosSpin 1s linear infinite; transform-origin: center; }
      .nos-entry-title { animation: nosFadeUp .5s ease-out both; }
      .nos-entry-icon { animation: nosScaleIn .45s ease-out both; }
      .nos-entry-subtitle { animation: nosFadeUp .5s ease-out .1s both; }
      .nos-reveal { animation: nosFadeUp .5s ease-out both; }
      .nos-reveal-1{animation-delay:.05s}.nos-reveal-2{animation-delay:.1s}.nos-reveal-3{animation-delay:.15s}
      .nos-reveal-4{animation-delay:.2s}.nos-reveal-5{animation-delay:.25s}.nos-reveal-6{animation-delay:.3s}
      .nos-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
      .nos-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(22,163,74,.25); border-color: #86efac; }
      .nos-card:hover .nos-card-icon { animation: nosScaleIn .3s ease-out; }
      .nos-bar-pulse { animation: nosBarPulse 1.6s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce) {
        .nos-blink, .nos-blink-delay, .nos-fan, .nos-fan-fast, .nos-entry-title, .nos-entry-icon,
        .nos-entry-subtitle, .nos-reveal, .nos-card, .nos-bar-pulse { animation: none !important; transition: none !important; }
        .nos-card:hover { transform: none; }
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
          <div className={`p-3 rounded-2xl border border-white/15 ${style.icon} nos-entry-icon`}><Icon size={28} className="text-white" /></div>
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight nos-entry-title">{title}</h1>
            <p className="text-slate-300 mt-2 max-w-3xl text-sm md:text-base nos-entry-subtitle">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, children, icon: Icon = CircleDot }) {
  return (
    <article className="nos-card nos-reveal bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
      <h3 className="font-black text-slate-900 text-lg flex items-center gap-2 mb-3"><Icon size={20} className="nos-card-icon text-green-600" /> {title}</h3>
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
      <ListChecks size={22} className="text-green-300 shrink-0 mt-0.5" />
      <div><p className="text-xs font-black uppercase tracking-wide text-green-300 mb-1">Ringkasan</p><div className="text-sm text-slate-100 leading-relaxed">{children}</div></div>
    </div>
  );
}

function NotesTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm">
        <thead><tr className="bg-green-50 text-green-900">{headers.map((h) => <th key={h} className="text-left font-black p-3 md:p-4">{h}</th>)}</tr></thead>
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
          <span className="rounded-xl bg-white border border-green-200 text-green-900 text-xs md:text-sm font-black px-3 py-2">{step}</span>
          {i < steps.length - 1 && <ChevronRight size={16} className="text-green-400 shrink-0" />}
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
        <button type="button" onClick={copy} aria-label={`Salin ${title}`} className="inline-flex items-center gap-1 text-[11px] font-black text-slate-300 hover:text-white min-h-[28px] px-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400">
          {copied ? <><Check size={13} className="text-green-400" /> Disalin</> : <><Copy size={13} /> Salin</>}
        </button>
      </div>
      <pre className="p-4 text-[12.5px] leading-relaxed overflow-x-auto font-mono text-slate-100">
        {lines.map((l, i) => {
          const noPrompt = l.startsWith('~');
          const text = noPrompt ? l.slice(1) : l;
          return (
            <div key={i} className={text.startsWith('#') ? 'text-slate-500' : ''}>
              {prompt && !noPrompt && !text.startsWith('#') && <span className="text-green-400 select-none">$ </span>}{text || ' '}
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
          <span className="shrink-0 w-9 h-9 rounded-xl bg-green-600 text-white font-black flex items-center justify-center shadow-md shadow-green-600/25">{i + 1}</span>
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
          <button key={t.label} role="tab" aria-selected={active === i} onClick={() => setActive(i)} className={`min-h-[44px] px-4 rounded-full text-xs md:text-sm font-black border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-500 ${active === i ? 'bg-green-600 border-green-600 text-white' : 'bg-white border-slate-300 text-slate-700 hover:border-green-400'}`}>{t.label}</button>
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
function DnsLookupDiagram() {
  const [step, setStep] = useState(0);
  const nodes = [
    { id: 'client', x: 60, y: 120, label: 'Klien', sub: 'Pelayar / PC' },
    { id: 'resolver', x: 230, y: 120, label: 'Resolver', sub: 'DNS + cache' },
    { id: 'root', x: 420, y: 40, label: 'Root', sub: '.' },
    { id: 'tld', x: 560, y: 120, label: 'TLD', sub: '.com' },
    { id: 'auth', x: 420, y: 200, label: 'Authoritative', sub: 'contoh.com' },
  ];
  const at = (id) => nodes.find((n) => n.id === id);
  const steps = [
    { from: 'client', to: 'resolver', text: 'Klien menaip contoh.com. Pertanyaan dihantar ke DNS resolver; jika cache ada jawapan, proses tamat di sini.' },
    { from: 'resolver', to: 'root', text: 'Cache tiada jawapan, jadi resolver bertanya Root server (.) terlebih dahulu.' },
    { from: 'root', to: 'resolver', text: 'Root tidak tahu alamat contoh.com, tetapi merujuk resolver kepada TLD server bagi .com.' },
    { from: 'resolver', to: 'tld', text: 'Resolver bertanya TLD server (.com) dan mendapat rujukan ke authoritative server contoh.com.' },
    { from: 'resolver', to: 'auth', text: 'Authoritative server menyimpan rekod rasmi zon contoh.com dan memulangkan alamat IP (rekod A).' },
    { from: 'resolver', to: 'client', text: 'Resolver menyerahkan alamat IP kepada klien dan menyimpannya dalam cache. Pelayar kini boleh menyambung ke web server.' },
  ];
  const cur = steps[step];
  const activeIds = [cur.from, cur.to];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h4 className="font-black text-slate-900 flex items-center gap-2"><HeadingIcon text={"Proses DNS Lookup (interaktif)"} className="text-green-600 shrink-0" size={18} />Proses DNS Lookup (interaktif)</h4>
        <span className="text-xs font-black text-green-700 bg-green-50 rounded-full px-3 py-1">Langkah {step + 1} / {steps.length}</span>
      </div>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 660 250" className="w-full min-w-[520px]" role="img" aria-label="Rajah proses DNS lookup daripada klien ke resolver, root, TLD dan authoritative server">
          <defs><marker id="dnsArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#16a34a" /></marker></defs>
          {steps.map((s, i) => {
            const a = at(s.from), b = at(s.to);
            const on = i === step;
            return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={on ? '#16a34a' : '#cbd5e1'} strokeWidth={on ? 3 : 1.5} strokeDasharray={on ? '0' : '4 4'} markerEnd={on ? 'url(#dnsArrow)' : undefined} />;
          })}
          {nodes.map((n) => {
            const on = activeIds.includes(n.id);
            return (
              <g key={n.id}>
                <rect x={n.x - 48} y={n.y - 26} width="96" height="52" rx="12" fill={on ? '#16a34a' : '#0f172a'} stroke={on ? '#86efac' : '#334155'} strokeWidth="2" />
                <text x={n.x} y={n.y - 3} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800">{n.label}</text>
                <text x={n.x} y={n.y + 15} textAnchor="middle" fill={on ? '#dcfce7' : '#94a3b8'} fontSize="10.5">{n.sub}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="text-sm text-slate-700 bg-slate-50 rounded-xl border border-slate-200 p-3 mt-3 min-h-[64px]" aria-live="polite">{cur.text}</p>
      <div className="flex gap-2 mt-3">
        <button type="button" disabled={step === 0} onClick={() => setStep(step - 1)} className="min-h-[44px] px-4 rounded-xl border border-slate-300 text-sm font-black text-slate-700 disabled:opacity-40 hover:border-green-400">Sebelum</button>
        <button type="button" disabled={step === steps.length - 1} onClick={() => setStep(step + 1)} className="min-h-[44px] px-4 rounded-xl bg-green-600 text-white text-sm font-black disabled:opacity-40 hover:bg-green-700">Seterusnya</button>
        <button type="button" onClick={() => setStep(0)} className="min-h-[44px] px-4 rounded-xl text-sm font-black text-slate-500 hover:text-slate-800 inline-flex items-center gap-1"><RotateCcw size={14} /> Ulang</button>
      </div>
    </div>
  );
}

/* Rajah pertukaran mesej DHCP (DORA) - stepper interaktif */
function DhcpDoraDiagram() {
  const [step, setStep] = useState(1);
  const msgs = [
    { name: 'DHCPDISCOVER', dir: 'right', text: 'Klien yang baru bersambung menyiarkan permintaan untuk mencari DHCP server.' },
    { name: 'DHCPOFFER', dir: 'left', text: 'DHCP server menawarkan satu alamat IP daripada pool beserta tempoh lease dan tetapan rangkaian.' },
    { name: 'DHCPREQUEST', dir: 'right', text: 'Klien meminta alamat IP yang ditawarkan itu secara rasmi.' },
    { name: 'DHCPACK', dir: 'left', text: 'Server mengesahkan pemberian. Klien mula menggunakan IP, gateway dan DNS tersebut sehingga lease tamat.' },
  ];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h4 className="font-black text-slate-900 flex items-center gap-2"><HeadingIcon text={"Pertukaran Mesej DHCP (interaktif)"} className="text-green-600 shrink-0" size={18} />Pertukaran Mesej DHCP (interaktif)</h4>
        <span className="text-xs font-black text-green-700 bg-green-50 rounded-full px-3 py-1">Mesej {step} / 4</span>
      </div>
      <svg viewBox="0 0 520 260" className="w-full max-w-xl mx-auto" role="img" aria-label="Rajah empat mesej DHCP antara klien dan DHCP server">
        <defs><marker id="dhcpArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#16a34a" /></marker></defs>
        <rect x="20" y="10" width="110" height="40" rx="10" fill="#0f172a" /><text x="75" y="35" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800">Klien</text>
        <rect x="390" y="10" width="110" height="40" rx="10" fill="#0f172a" /><text x="445" y="35" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800">DHCP Server</text>
        <line x1="75" y1="50" x2="75" y2="250" stroke="#cbd5e1" strokeDasharray="5 5" /><line x1="445" y1="50" x2="445" y2="250" stroke="#cbd5e1" strokeDasharray="5 5" />
        {msgs.map((m, i) => {
          if (i >= step) return null;
          const y = 85 + i * 50; const on = i === step - 1;
          const x1 = m.dir === 'right' ? 78 : 442; const x2 = m.dir === 'right' ? 442 : 78;
          return (
            <g key={m.name}>
              <line x1={x1} y1={y} x2={x2} y2={y} stroke={on ? '#16a34a' : '#94a3b8'} strokeWidth={on ? 3 : 2} markerEnd="url(#dhcpArrow)" />
              <text x="260" y={y - 8} textAnchor="middle" fontSize="12" fontWeight="800" fill={on ? '#15803d' : '#64748b'}>{m.name}</text>
            </g>
          );
        })}
      </svg>
      <p className="text-sm text-slate-700 bg-slate-50 rounded-xl border border-slate-200 p-3 mt-3 min-h-[64px]" aria-live="polite">{msgs[step - 1].text}</p>
      <div className="flex gap-2 mt-3">
        <button type="button" disabled={step === 1} onClick={() => setStep(step - 1)} className="min-h-[44px] px-4 rounded-xl border border-slate-300 text-sm font-black text-slate-700 disabled:opacity-40 hover:border-green-400">Sebelum</button>
        <button type="button" disabled={step === 4} onClick={() => setStep(step + 1)} className="min-h-[44px] px-4 rounded-xl bg-green-600 text-white text-sm font-black disabled:opacity-40 hover:bg-green-700">Seterusnya</button>
        <button type="button" onClick={() => setStep(1)} className="min-h-[44px] px-4 rounded-xl text-sm font-black text-slate-500 hover:text-slate-800 inline-flex items-center gap-1"><RotateCcw size={14} /> Ulang</button>
      </div>
      <p className="text-xs text-slate-500 mt-3">Pelayan mendengar pada port 67 dan klien pada port 68 (UDP).</p>
    </div>
  );
}

/* Pokok direktori LDAP (mengikut contoh dalam Kertas Penerangan) */
function TreeNode({ dn, note, level = 0, icon: Icon = Folder }) {
  return (
    <div className="flex items-center gap-2 py-1" style={{ paddingLeft: level * 22 }}>
      <Icon size={15} className="text-green-600 shrink-0" />
      <code className="text-[13px] font-bold text-slate-800">{dn}</code>
      {note && <span className="text-xs text-slate-500">{note}</span>}
    </div>
  );
}

function LdapTree() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2"><HeadingIcon text={"Contoh Pokok Direktori (Directory Hierarchy)"} className="text-green-600 shrink-0" size={18} />Contoh Pokok Direktori (Directory Hierarchy)</h4>
      <div className="font-mono overflow-x-auto">
        <TreeNode dn="dc=example, dc=com" note="akar (root)" icon={FolderTree} />
        <TreeNode dn="ou=users" level={1} />
        <TreeNode dn="uid=john.doe" level={2} icon={User} />
        <TreeNode dn="uid=jane.smith" level={2} icon={User} />
        <TreeNode dn="ou=groups" level={1} />
        <TreeNode dn="cn=admins" level={2} icon={Users} />
        <TreeNode dn="cn=users" level={2} icon={Users} />
        <TreeNode dn="ou=computers" level={1} />
        <TreeNode dn="cn=server1" level={2} icon={Server} />
        <TreeNode dn="cn=workstation1" level={2} icon={Server} />
      </div>
      <p className="text-xs text-slate-500 mt-3">Setiap nod ialah satu entry dan dikenal pasti secara unik oleh Distinguished Name (DN), contohnya <code className="font-bold">uid=john.doe,ou=users,dc=example,dc=com</code>.</p>
    </div>
  );
}

function TerminalIcon({ size = 96 }) {
  return (
    <div className="relative flex items-center justify-center rounded-2xl bg-slate-900 border border-white/10" style={{ width: size, height: size }}>
      <Terminal size={size * 0.5} className="text-green-300" />
      <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-green-400 nos-blink" />
      <span className="absolute top-3 right-6 w-2 h-2 rounded-full bg-lime-300 nos-blink-delay" />
    </div>
  );
}



/* ---------------- NOTA 1: WEB SERVER, TCP/IP & VIRTUAL HOSTING ---------------- */
function WebNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Perkhidmatan Aplikasi Rangkaian" icon={Network}>
        <p>Perkhidmatan rangkaian ialah tugas yang dijalankan oleh sistem atau pelayan untuk peranti dan pengguna lain dalam rangkaian. Ia membolehkan komunikasi, pengurusan data, keselamatan dan perkongsian sumber berjalan dengan cekap dan boleh dipercayai.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          {[
            { icon: Globe, name: 'Web Server', d: 'Menghantar laman web, imej, video dan dokumen kepada pelayar.' },
            { icon: Search, name: 'DNS Server', d: 'Menterjemah nama domain kepada alamat IP.' },
            { icon: Router, name: 'DHCP Server', d: 'Memberi alamat IP dan tetapan rangkaian secara automatik.' },
            { icon: FolderTree, name: 'Directory Server', d: 'Menyimpan identiti pengguna dan mengawal akses.' },
          ].map((c) => (
            <div key={c.name} className="rounded-xl bg-slate-50 border border-slate-200 p-3">
              <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center text-green-700 mb-2"><c.icon size={17} /></div>
              <p className="font-black text-slate-900">{c.name}</p>
              <p className="text-xs text-slate-600 mt-1">{c.d}</p>
            </div>
          ))}
        </div>
      </InfoCard>

      <InfoCard title="Apakah Web Server?" icon={Globe}>
        <p>Web server ialah perisian atau sistem yang menghantar kandungan web (laman web, imej, video, dokumen) kepada pengguna melalui internet atau intranet. Ia menjadi perantara antara klien, biasanya pelayar seperti Chrome atau Firefox, dengan pelayan tempat maklumat disimpan.</p>
        <p className="mt-3">Web server bekerja dengan protokol <b>HTTP</b> (Hypertext Transfer Protocol) atau <b>HTTPS</b> (HTTP Secure). Pelayar menghantar permintaan apabila URL dimasukkan, dan web server mencari kandungan yang diminta lalu menghantarnya kembali.</p>
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2"><HeadingIcon text={"Aliran Permintaan HTTP"} className="text-green-600 shrink-0" size={18} />Aliran Permintaan HTTP</h4>
        <FlowRow steps={['Pengguna menaip URL', 'Pelayar hantar HTTP request', 'Web server cari kandungan', 'HTTP response dihantar', 'Halaman dipaparkan']} />
        <p className="text-sm text-slate-600 mt-4">Permintaan boleh berupa halaman HTML, imej, dokumen, atau skrip di pelayan seperti PHP, Python dan Node.js. Bagi www.example.com, web server akan mencari fail utama (index.html atau index.php).</p>
      </div>

      <Code title="Konfigurasi Apache (Rajah 1)" prompt={false} lines={['<VirtualHost *:80>', '    DocumentRoot /var/www/html', '    ServerName www.example.com', '</VirtualHost>']} />

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="TCP/IP Communication" icon={Cable}>
          <p>TCP/IP ialah protokol komunikasi asas internet. <b>TCP</b> memastikan data dihantar dengan betul, manakala <b>IP</b> memastikan data sampai ke destinasi yang betul. Komunikasi web biasanya melalui HTTP pada port <b>80</b> dan HTTPS pada port <b>443</b>.</p>
          <p className="mt-3">Memahami TCP/IP penting untuk mengkonfigurasi dan menyelesaikan masalah rangkaian penghosan web Linux.</p>
        </InfoCard>
        <div>
          <Code title="Nginx sebagai Reverse Proxy (Rajah 3)" prompt={false} lines={['server {', '    listen 80;', '    server_name mysite.com;', '    location / {', '        proxy_pass http://localhost:8080;', '        proxy_set_header Host $host;', '        proxy_set_header X-Real-IP $remote_addr;', '    }', '}']} />
        </div>
      </div>

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"Virtual Hosting: 3 Jenis Konfigurasi"} className="text-green-600 shrink-0" size={20} />Virtual Hosting: 3 Jenis Konfigurasi</h3>
        <p className="text-sm text-slate-600 mb-4">Virtual host membolehkan lebih daripada satu domain atau laman web dihoskan pada satu pelayan fizikal, dengan kandungan berbeza.</p>
        <NotesTable
          headers={['Jenis', 'Cara membezakan laman', 'Contoh']}
          rows={[
            ['Name-Based', 'Nama domain (hostname); satu alamat IP dikongsi', 'www.lamanweb1.com dan www.lamanweb2.com pada IP yang sama'],
            ['IP-Based', 'Setiap laman menggunakan alamat IP berbeza; perlu lebih daripada satu IP pada pelayan', '192.168.1.1 untuk Laman Web 1, 192.168.1.2 untuk Laman Web 2'],
            ['Port-Based', 'Nombor port berbeza pada satu alamat IP', 'www.lamanweb.com:80 dan www.lamanweb.com:8080'],
          ]}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Code title="IP-Based di Apache (Rajah 4)" prompt={false} lines={['<VirtualHost 192.168.1.1:80>   # Laman Web 1', '<VirtualHost 192.168.1.2:80>   # Laman Web 2']} />
        <Code title="IP-Based di Nginx (Rajah 5)" prompt={false} lines={['server { listen 192.168.1.1:80; }   # Laman Web 1', 'server { listen 192.168.1.2:80; }   # Laman Web 2']} />
      </div>
      <NotaPenting>Dalam Kertas Penerangan, Rajah 4 dan 5 diberi tajuk "Name-Based", tetapi kod di dalamnya membezakan laman melalui alamat IP. Ia sebenarnya contoh <b>IP-Based</b>.</NotaPenting>

      <Latihan items={['Nyatakan komponen utama dalam fungsi perkhidmatan rangkaian.', 'Terangkan fungsi Web Server dalam rangkaian.']} />
      <Ringkasan>Web server menghantar kandungan melalui <b>HTTP (80)</b> atau <b>HTTPS (443)</b> di atas TCP/IP. Satu pelayan boleh menghoskan banyak laman menerusi virtual host: <b>Name-Based, IP-Based</b> atau <b>Port-Based</b>. Nginx juga boleh bertindak sebagai reverse proxy ke aplikasi di belakangnya.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 2: SSL/TLS, KAWALAN AKSES, LOGGING & PEMANTAUAN ---------------- */
function SecureNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="SSL/TLS" icon={Lock}>
        <p>SSL/TLS (Secure Sockets Layer / Transport Layer Security) melindungi komunikasi antara pelayar dan web server. Ia menyulitkan data supaya kata laluan, maklumat kewangan dan data peribadi kekal sulit, serta membantu pengguna memastikan mereka berhubung dengan laman yang sah.</p>
      </InfoCard>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Lock, t: 'Penyulitan (Encryption)', d: 'Data antara server dan klien tidak boleh dibaca penggodam. Laman berawalan https:// dilindungi.' },
          { icon: Fingerprint, t: 'Pengesahan Identiti (Authentication)', d: 'Sijil digital yang disahkan pihak ketiga dipercayai (Let’s Encrypt, Comodo, DigiCert) membuktikan server itu sah.' },
          { icon: CheckCircle, t: 'Integriti Data (Data Integrity)', d: 'Data yang diubah dalam perjalanan dikesan; komunikasi gagal dan pengguna diberi amaran.' },
          { icon: ShieldCheck, t: 'Keselamatan Rangkaian', d: 'Turut melindungi FTPS, SMTPS, IMAPS dan OpenVPN, bukan HTTPS sahaja.' },
        ].map((c) => (
          <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-700 mb-3"><c.icon size={19} /></div>
            <p className="font-black text-slate-900 text-sm">{c.t}</p>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{c.d}</p>
          </div>
        ))}
      </div>

      <NotesTable headers={['Ciri', 'HTTP', 'HTTPS']} rows={[
        ['Keselamatan', 'Tidak selamat', 'Selamat (disulitkan)'],
        ['Penggunaan SSL/TLS', 'Tidak', 'Ya'],
        ['Port lalai', '80', '443'],
        ['Kebolehpercayaan', 'Rendah', 'Tinggi'],
        ['Prestasi', 'Sedikit lebih laju', 'Sedikit lebih lambat (kerana penyulitan)'],
        ['URL', 'http://www.contoh.com', 'https://www.contoh.com'],
      ]} />

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Access Control (Kawalan Akses)" icon={KeyRound}>
          <p>Mengawal siapa yang boleh menyentuh fail, folder, direktori dan aplikasi web berdasarkan:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1.5">
            <li><b>Alamat IP</b>: sekat atau benarkan, contohnya hanya IP dalaman.</li>
            <li><b>Fail .htaccess</b> (Apache): peraturan akses untuk direktori tertentu.</li>
            <li><b>File permissions</b>: hak read, write dan execute untuk pengguna, kumpulan atau umum.</li>
            <li><b>ACL</b>: senarai pengguna atau sistem yang dibenarkan atau ditolak.</li>
          </ul>
        </InfoCard>
        <InfoCard title="Authentication (Pengesahan)" icon={Fingerprint}>
          <p>Mengesahkan identiti pengguna sebelum akses diberi. Access control menentukan <i>apa</i> yang dibenarkan; authentication menentukan <i>siapa</i> pengguna itu.</p>
          <p className="mt-3">Kaedah yang digunakan: Basic, Digest, Form-Based, Token-Based dan integrasi LDAP/Active Directory.</p>
        </InfoCard>
      </div>

      <NotesTable headers={['Kaedah', 'Penerangan']} rows={[
        ['Basic Authentication', 'Nama pengguna dan kata laluan dihantar dalam bentuk base64. Tidak selamat tanpa SSL.'],
        ['Digest Authentication', 'Seperti Basic, tetapi data dienkripsi sebelum dihantar sehingga lebih selamat.'],
        ['Form-Based', 'Borang log masuk; kaedah umum dalam aplikasi web.'],
        ['Token-Based', 'OAuth 2.0 untuk akses API dan aplikasi pihak ketiga; JWT (JSON Web Token) membawa maklumat pengguna dalam aplikasi moden.'],
        ['LDAP / Active Directory', 'Menyepadukan pengesahan pusat dalam organisasi.'],
      ]} />
      <Code title="Authentication di Apache (Rajah 6)" prompt={false} lines={['AuthType Basic', 'AuthName "Kawasan Terhad"', 'AuthUserFile /etc/apache2/.htpasswd', 'Require valid-user']} />

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Logging (Rakaman)" icon={ScrollText}>
          <p><b>Access Log</b> merekod setiap permintaan: alamat IP, masa, URL, jenis pelayar dan status respons.</p>
          <p className="mt-2"><b>Error Log</b> merekod kegagalan seperti skrip gagal dijalankan, fail tidak dijumpai (404) dan ralat konfigurasi.</p>
          <ul className="mt-3 space-y-1 font-mono text-xs bg-slate-50 rounded-xl border border-slate-200 p-3 overflow-x-auto">
            <li>/var/log/apache2/access.log</li><li>/var/log/apache2/error.log</li><li>/var/log/nginx/access.log</li><li>/var/log/nginx/error.log</li>
          </ul>
        </InfoCard>
        <InfoCard title="Monitoring (Pemantauan)" icon={Activity}>
          <p>Pemerhatian masa nyata dan analisis prestasi untuk mengenal pasti:</p>
          <ul className="list-disc pl-5 mt-3 space-y-1.5">
            <li>Beban trafik yang tinggi</li>
            <li>Percubaan serangan seperti DDoS atau brute force</li>
            <li>Penggunaan CPU, RAM dan storan</li>
            <li>Status perkhidmatan: aktif, berhenti atau gagal</li>
          </ul>
        </InfoCard>
      </div>
      <NotesTable headers={['Alat pemantauan', 'Kegunaan']} rows={[
        ['Grafana + Prometheus', 'Visualisasi metrik dan amaran (alerting)'],
        ['ELK Stack (Elasticsearch, Logstash, Kibana)', 'Pengurusan log berskala besar dan analisis log secara visual'],
        ['Nagios / Zabbix', 'Pemantauan kesihatan pelayan dan sistem secara menyeluruh'],
      ]} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
        {[['Meningkatkan keselamatan', 'Kenal pasti percubaan pencerobohan'], ['Audit dan pematuhan', 'Ikut polisi dan standard industri'], ['Penyelesaian masalah', 'Cari punca ralat atau prestasi rendah'], ['Perancangan kapasiti', 'Naik taraf berdasarkan data penggunaan sebenar']].map(([t, d]) => (
          <div key={t} className="rounded-xl bg-white border border-slate-200 p-3"><p className="font-black text-slate-900">{t}</p><p className="text-xs text-slate-600 mt-1">{d}</p></div>
        ))}
      </div>
      <Ringkasan>SSL/TLS memberi <b>penyulitan, pengesahan identiti</b> dan <b>integriti data</b>. Access control menghadkan akses; authentication mengesahkan pengguna. Access log merekod permintaan, error log merekod kegagalan, dan alat seperti Grafana, ELK serta Nagios/Zabbix memantau pelayan.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 3: FUNGSI DNS SERVER & DHCP SERVER ---------------- */
function DnsDhcpNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="DNS Server" icon={Search}>
        <p>Domain Name System (DNS) menterjemah nama domain (contohnya www.google.com) kepada alamat IP. Pengguna tidak perlu mengingati alamat IP yang kompleks, dan komunikasi antara pengguna dengan pelayan berlaku dengan cekap. Di Linux, perisian yang paling banyak digunakan ialah <b>BIND9</b>. DNS menggunakan port <b>53</b> (TCP/UDP).</p>
      </InfoCard>
      <DnsLookupDiagram />
      <NotesTable headers={['Pelayan', 'Peranan dalam DNS Lookup']} rows={[
        ['Resolver / cache tempatan', 'Menerima pertanyaan klien; menjawab terus jika jawapan ada dalam cache.'],
        ['Root Server (.)', 'Peringkat pertama selepas cache; merujuk kepada TLD server yang betul.'],
        ['TLD Server (.com)', 'Menguruskan domain peringkat atas seperti .com dan merujuk kepada authoritative server.'],
        ['Authoritative DNS Server', 'Menyimpan rekod rasmi bagi domain seperti example.com dan memberi jawapan muktamad.'],
      ]} />
      <NotesTable headers={['Rekod', 'Fungsi']} rows={[
        ['A', 'Memetakan nama kepada alamat IP'],
        ['NS', 'Menetapkan pelayan nama (name server) bagi domain'],
        ['MX', 'Menetapkan pelayan e-mel'],
        ['CNAME', 'Nama alias yang menuding kepada nama lain'],
        ['PTR', 'Resolusi terbalik: alamat IP kepada nama'],
        ['SOA', 'Maklumat kuasa zon: Serial, Refresh, Retry, Expire, Minimum TTL'],
      ]} />

      <InfoCard title="DHCP Server" icon={Router}>
        <p>Dynamic Host Configuration Protocol (DHCP) memberi alamat IP secara automatik kepada peranti yang bersambung ke rangkaian. Alamat itu unik bagi setiap peranti supaya tiada pertindihan. <b>Klien DHCP</b> ialah perisian pada peranti (PC Windows atau Linux, telefon pintar, tablet) yang menerima alamat IP, hostname, DNS, gateway dan domain daripada server.</p>
      </InfoCard>
      <NotesTable headers={['Fungsi DHCP Server', 'Penerangan']} rows={[
        ['Menetapkan alamat IP', 'Memberi IP secara automatik kepada setiap klien tanpa konfigurasi manual.'],
        ['Menyediakan maklumat rangkaian lain', 'Default gateway, DNS server, subnet mask dan NTP server (penyegerakan masa).'],
        ['Mengurus IP address pool', 'Memantau alamat yang sedang digunakan, masih tersedia dan telah tamat tempoh.'],
        ['Memajak alamat IP (lease)', 'IP bersifat sementara; apabila lease tamat, alamat kembali ke pool.'],
        ['Memudahkan pengurusan', 'Kurang konfigurasi manual, jimat masa, kurang kesilapan, sesuai untuk rangkaian besar.'],
      ]} />
      <DhcpDoraDiagram />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
        {[
          ['Kurang konflik IP', 'Setiap peranti mendapat alamat unik.'],
          ['Pengurusan berpusat', 'Konfigurasi IP dikawal dari satu server.'],
          ['Skalabiliti', 'Rangkaian boleh menampung lebih banyak peranti.'],
          ['Konfigurasi semula automatik', 'Peranti yang berpindah rangkaian dapat tetapan baharu.'],
          ['Penjimatan masa', 'Peranti baharu disiapkan dengan cepat.'],
          ['Mudah untuk pengguna', 'Pengguna tidak perlu tahu alamat IP.'],
        ].map(([t, d]) => (
          <div key={t} className="rounded-xl bg-white border border-slate-200 p-3"><p className="font-black text-slate-900">{t}</p><p className="text-xs text-slate-600 mt-1">{d}</p></div>
        ))}
      </div>
      <Latihan items={['Terangkan fungsi DNS Server dalam rangkaian.']} />
      <Ringkasan>DNS menterjemah <b>nama kepada IP</b> melalui Root, TLD dan Authoritative server. DHCP memberi <b>IP, gateway, DNS dan subnet mask</b> secara automatik melalui pertukaran DISCOVER, OFFER, REQUEST dan ACK, dengan alamat dipajak (lease) daripada pool.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 4: FUNGSI DIRECTORY SERVER ---------------- */
function DirectoryNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Apakah Directory Server?" icon={FolderTree}>
        <p>Directory server menyimpan, mengurus dan menyediakan akses kepada maklumat yang teratur dalam bentuk direktori, biasanya untuk pengurusan identiti, kawalan akses dan pentadbiran rangkaian. Direktori mengandungi nama pengguna, kata laluan, alamat e-mel dan sumber rangkaian lain. Akses dibuat melalui protokol <b>LDAP</b> (Lightweight Directory Access Protocol).</p>
      </InfoCard>
      <LdapTree />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { t: 'Entry & Attribute', d: 'Setiap entri dikenali oleh Distinguished Name (DN) dan mempunyai atribut seperti uid, cn dan mail.' },
          { t: 'Object Class', d: 'Menentukan jenis objek (pengguna atau kumpulan) dan atribut yang berkaitan.' },
          { t: 'Skema (Schema)', d: 'Mentakrifkan jenis data yang boleh disimpan: object class, atribut dan peraturan carian.' },
          { t: 'Indeks (Indexing)', d: 'Mempercepat pencarian data pada atribut yang kerap dicari.' },
        ].map((c) => (
          <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="font-black text-slate-900 text-sm">{c.t}</p>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{c.d}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Menyediakan Akses kepada Data Direktori" icon={KeyRound}>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><b>Autentikasi</b>: pengguna log masuk sistem.</li>
            <li><b>Autorisasi</b>: mengawal akses kepada sumber tertentu.</li>
            <li><b>Konfigurasi sistem</b> berdasarkan identiti pengguna.</li>
          </ul>
        </InfoCard>
        <InfoCard title="Pengurusan Pengguna dan Kebenaran" icon={Users}>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Menambah, mengubah atau memadam akaun pengguna.</li>
            <li>Menetapkan kata laluan dan polisi keselamatan.</li>
            <li>Mengurus kumpulan pengguna dan keahlian.</li>
            <li>Menetapkan kebenaran akses kepada fail, folder, aplikasi atau pelayan.</li>
          </ul>
        </InfoCard>
      </div>

      <NotesTable headers={['Perisian', 'Ciri utama']} rows={[
        ['OpenLDAP', 'Sumber terbuka, menyokong LDAP, biasa dalam persekitaran Linux; menyimpan maklumat pengguna dan kumpulan dengan skalabiliti tinggi.'],
        ['Microsoft Active Directory (AD)', 'Digunakan dalam Windows untuk mengurus pengguna, komputer dan sumber; ada Group Policy, Domain Services dan menyokong Single Sign-On (SSO).'],
        ['Apache Directory Server', 'Sumber terbuka berasaskan Java, menyokong LDAP, modular dan mesra pengguna dengan alat GUI Apache Directory Studio.'],
        ['389 Directory Server', 'Projek sumber terbuka Red Hat untuk prestasi tinggi dan kebolehskalaan dalam organisasi besar.'],
        ['Red Hat Directory Server', 'Pengurusan identiti dan sumber dalam persekitaran Linux untuk organisasi berskala besar.'],
      ]} />
      <Latihan items={['Terangkan fungsi Directory Server dalam rangkaian.', 'Berikan contoh perisian yang popular dalam directory server.']} />
      <Ringkasan>Directory server menyimpan data dalam <b>hierarki pokok</b> (entry, DN, atribut, object class, skema, indeks) dan diakses melalui <b>LDAP</b>. Fungsinya: menyimpan maklumat, membekalkan autentikasi dan autorisasi, serta mengurus pengguna. Contoh: <b>OpenLDAP, Active Directory, Apache DS, 389 DS</b>.</Ringkasan>
    </div>
  );
}



/* ---------------- NOTA 5: KONFIGURASI, PENGUJIAN & PENYELENGGARAAN WEB SERVER ---------------- */
function WebConfNotes() {
  const config = (
    <>
      <p className="text-sm text-slate-600">Prosedur ini menggunakan Apache HTTP Server pada sistem berasaskan Debian/Ubuntu. Anda memerlukan akses root atau sudo.</p>
      <StepList steps={[
        { title: 'Kemas kini pakej sistem', desc: 'Buka terminal dan pastikan sistem terkini.', code: ['sudo apt update', 'sudo apt upgrade'] },
        { title: 'Pasang Apache atau Nginx', code: ['# Apache', 'sudo apt install apache2', '# Nginx', 'sudo apt install nginx'] },
        { title: 'Mula dan aktifkan perkhidmatan', desc: 'enable memastikan perkhidmatan bermula sendiri semasa boot.', code: ['sudo systemctl start apache2', 'sudo systemctl enable apache2', '# untuk Nginx gantikan apache2 dengan nginx'] },
        { title: 'Konfigurasi firewall (UFW)', desc: 'Benarkan trafik HTTP dan HTTPS, kemudian semak status.', code: ["sudo ufw allow 'Apache Full'", 'sudo ufw status'] },
        { title: 'Cipta fail virtual host', desc: 'Fail konfigurasi baharu disimpan dalam /etc/apache2/sites-available/.', code: ['sudo nano /etc/apache2/sites-available/contoh.conf'] },
      ]} />
      <Code title="contoh.conf" prompt={false} lines={['<VirtualHost *:80>', '    ServerAdmin admin@contoh.com', '    ServerName contoh.com', '    ServerAlias www.contoh.com', '    DocumentRoot /var/www/html/contoh', '    <Directory /var/www/html/contoh>', '        AllowOverride All', '        Require all granted', '    </Directory>', '    ErrorLog ${APACHE_LOG_DIR}/error.log', '    CustomLog ${APACHE_LOG_DIR}/access.log combined', '</VirtualHost>']} />
      <StepList steps={[
        { title: 'Aktifkan virtual host dan muat semula', code: ['sudo a2ensite contoh.conf', 'sudo systemctl reload apache2'] },
        { title: 'Uji konfigurasi', desc: 'Layari http://contoh.com atau alamat IP server dalam pelayar.' },
        { title: 'Tambah keselamatan (pilihan)', desc: 'Matikan Directory Listing supaya senarai fail tidak dipaparkan apabila index.html tiada. Aktifkan HTTPS dengan sijil SSL daripada Certificate Authority (CA) dan tetapkan dalam fail virtual host.' },
      ]} />
      <NotaPenting>Kertas Penerangan menulis <code>sudo apt install apache2-mod_ssl</code>. Pada Ubuntu/Debian, modul SSL sudah termasuk dalam pakej apache2 dan diaktifkan dengan <code>sudo a2enmod ssl</code>. Nama <code>mod_ssl</code> sebagai pakej berasingan digunakan pada CentOS/RHEL (<code>sudo yum install mod_ssl</code>).</NotaPenting>
    </>
  );
  const testing = (
    <>
      <NotesTable headers={['Ujian', 'Cara / Arahan', 'Hasil yang diharapkan']} rows={[
        ['Status perkhidmatan', 'sudo systemctl status apache2 (CentOS/RHEL: httpd)', 'running, stopped atau ada masalah'],
        ['Mula / henti / mula semula', 'systemctl start | stop | restart apache2', 'Perkhidmatan bertukar keadaan'],
        ['Semak port', 'sudo netstat -tuln | grep :80  atau  sudo ss -tuln | grep :80', 'Apache mendengar pada port 80 atau 443'],
        ['Capaian hos', 'ping nama-laman-anda.com', 'Paket dihantar dan diterima'],
        ['Respons HTTP', 'curl -I http://nama-laman-anda.com', 'HTTP/1.1 200 OK (-I meminta header sahaja)'],
        ['Muat turun halaman', 'wget http://nama-laman-anda.com', 'Halaman utama (HTML) dimuat turun'],
        ['Port terbuka', 'telnet nama-laman-anda.com 80  atau  nc -zv nama-laman-anda.com 80', 'Connected'],
        ['Penyelesaian DNS', 'nslookup atau dig nama-laman-anda.com', 'Nama diterjemah ke alamat IP yang betul'],
      ]} />
      <NotesTable headers={['Kod HTTP', 'Maksud']} rows={[
        ['200 OK', 'Laman berjaya diakses'],
        ['403 Forbidden', 'Akses dilarang'],
        ['404 Not Found', 'Halaman tidak dijumpai'],
        ['500 Internal Server Error', 'Kesalahan dalaman pada server'],
        ['502 Bad Gateway', 'Masalah server atau penyambung rangkaian'],
      ]} />
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Log, Prestasi & Keselamatan" icon={Gauge}>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><b>Log:</b> /var/log/apache2/ (access.log, error.log) atau /var/log/nginx/.</li>
            <li><b>Prestasi:</b> Apache Bench (ab), Siege, JMeter; pantau CPU, memori dan I/O cakera.</li>
            <li><b>SSL/TLS:</b> SSL Labs' SSL Test menilai sijil.</li>
            <li><b>Kelemahan:</b> Nikto, OWASP ZAP, Burp Suite.</li>
            <li><b>Konfigurasi:</b> semak .htaccess (Apache) atau nginx.conf (Nginx).</li>
          </ul>
        </InfoCard>
        <InfoCard title="Keserasian, Ketersediaan & Pemulihan" icon={TestTube}>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Uji pelbagai pelayar: Chrome, Firefox, Safari, Edge.</li>
            <li>Uji aksesibiliti dengan WAVE atau Axe (piawaian WCAG).</li>
            <li>Semak virtual host dan konfigurasi caching.</li>
            <li>Simulasi server tidak tersedia dan uji prosedur pemulihan daripada sandaran.</li>
          </ul>
        </InfoCard>
      </div>
    </>
  );
  const maintain = (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Penyelenggaraan Berkala" icon={Wrench}>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><b>Log:</b> semak berkala untuk ralat dan akses tidak sah; bersihkan log lama supaya ruang cakera tidak penuh.</li>
            <li><b>Backup:</b> automatik dan berkala untuk konfigurasi, fail laman dan pangkalan data; simpan luar talian atau di remote server; uji pemulihan.</li>
            <li><b>Pemantauan:</b> Nagios atau Zabbix untuk status masa nyata, sumber CPU, memori dan jalur lebar, dengan alert.</li>
            <li><b>Kemas kini:</b> OS (patch keselamatan), web server, dan pangkalan data (MySQL, PostgreSQL, MongoDB). Uji dahulu dalam persekitaran ujian.</li>
          </ul>
        </InfoCard>
        <InfoCard title="Prestasi & Keselamatan" icon={ShieldCheck}>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><b>Caching:</b> Varnish Cache atau Memcached; <b>Gzip</b> untuk mampatkan data.</li>
            <li><b>Firewall:</b> hadkan IP yang dibenarkan; <b>Fail2ban</b> menyekat IP yang cuba log masuk secara mencurigakan.</li>
            <li><b>Sijil:</b> HTTPS sah, diperbaharui sebelum tamat; Let’s Encrypt percuma dan boleh diperbaharui automatik.</li>
            <li><b>IDS/IPS:</b> Snort untuk mengesan DDoS, SQL injection dan XSS.</li>
            <li><b>Pematuhan:</b> PDPA (Malaysia) atau GDPR (Eropah); dokumenkan semua perubahan.</li>
          </ul>
        </InfoCard>
      </div>
    </>
  );
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <SubTabs tabs={[{ label: '1. Konfigurasi', content: config }, { label: '2. Pemeriksaan & Pengujian', content: testing }, { label: '3. Penyelenggaraan & Kemas Kini', content: maintain }]} />
      <Latihan items={['Nyatakan prosedur pemasangan web server sistem pengendalian berasaskan Linux.', 'Bagaimanakah cara menguji konfigurasi yang telah dibuat?', 'Nyatakan langkah-langkah penyelenggaraan berkala web server.']} />
      <Ringkasan>Urutan asas: <b>update, install, start dan enable, firewall, virtual host, a2ensite, reload, uji</b>. Ujian merangkumi status, port, curl/wget, DNS, log, prestasi dan keselamatan. Penyelenggaraan berpusat pada log, backup, kemas kini, caching, Fail2ban, sijil dan pematuhan.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 6: KONFIGURASI, PENGUJIAN & PENYELENGGARAAN DNS SERVER ---------------- */
function DnsConfNotes() {
  const config = (
    <>
      <p className="text-sm text-slate-600">BIND (Berkeley Internet Name Domain) ialah perisian DNS server yang paling lazim di Linux kerana stabil dan fleksibel. Prosedur berlaku untuk Ubuntu/Debian dan CentOS/RHEL.</p>
      <NotesTable headers={['', 'Ubuntu / Debian', 'CentOS / RHEL']} rows={[
        ['Kemas kini repositori', 'sudo apt update', 'sudo yum update'],
        ['Pasang BIND', 'sudo apt install bind9 bind9utils bind9-doc', 'sudo yum install bind bind-utils'],
        ['Fail konfigurasi utama', '/etc/bind/named.conf', '/etc/named.conf'],
        ['Fail untuk tambah zon', '/etc/bind/named.conf.local', '/etc/named.conf'],
        ['Nama perkhidmatan', 'bind9', 'named'],
      ]} />
      <StepList steps={[
        { title: 'Tambah zon DNS', desc: 'Edit fail konfigurasi dan tambah entri zon untuk domain contoh.com.', code: ['sudo nano /etc/bind/named.conf.local'] },
      ]} />
      <Code title="named.conf.local" prompt={false} lines={['zone "contoh.com" {', '    type master;', '    file "/etc/bind/db.contoh.com";   # lokasi fail zon', '};']} />
      <StepList steps={[{ title: 'Cipta fail zon', code: ['sudo nano /etc/bind/db.contoh.com'] }]} />
      <Code title="db.contoh.com" prompt={false} lines={['; Fail Zon untuk contoh.com', '$TTL    86400', '@   IN  SOA  ns1.contoh.com. admin.contoh.com. (', '        2023090801   ; Serial', '        3600         ; Refresh', '        1800         ; Retry', '        1209600      ; Expire', '        86400 )      ; Minimum TTL', ';', '@   IN  NS   ns1.contoh.com.', '@   IN  A    192.168.1.10', 'ns1 IN  A    192.168.1.10', 'www IN  A    192.168.1.10']} />
      <NotaPenting>Perhatikan titik di hujung <code>ns1.contoh.com.</code>. Nama tanpa titik dianggap relatif kepada zon dan akan ditambah nama zon sekali lagi. Naikkan nilai <b>Serial</b> setiap kali fail zon diubah.</NotaPenting>
      <StepList steps={[
        { title: 'Periksa konfigurasi dan fail zon', desc: 'Lakukan sebelum memulakan perkhidmatan.', code: ['sudo named-checkconf', 'sudo named-checkzone contoh.com /etc/bind/db.contoh.com'] },
        { title: 'Mula dan aktifkan BIND', code: ['# Ubuntu/Debian', 'sudo systemctl start bind9', 'sudo systemctl enable bind9', '# CentOS/RHEL', 'sudo systemctl start named', 'sudo systemctl enable named'] },
        { title: 'Uji DNS server', code: ['nslookup contoh.com 127.0.0.1', 'dig @127.0.0.1 contoh.com'] },
      ]} />
    </>
  );
  const testing = (
    <>
      <NotesTable headers={['Ujian', 'Arahan', 'Catatan']} rows={[
        ['Status perkhidmatan', 'sudo systemctl status bind9', 'Pastikan running'],
        ['Resolusi nama ke IP', 'nslookup example.com', 'Dapat alamat IP berkaitan'],
        ['Reverse DNS (nslookup)', 'nslookup 192.168.1.10', 'Dapat nama domain berkaitan'],
        ['Resolusi dengan dig', 'dig example.com', 'Maklumat lengkap jawapan DNS'],
        ['Reverse DNS (dig)', 'dig -x 192.168.1.10', 'Resolusi terbalik'],
        ['Fail konfigurasi', 'sudo named-checkconf', 'Semak named.conf'],
        ['Fail zon', 'sudo named-checkzone example.com /etc/bind/db.example.com', 'Semak fail zon'],
        ['Port 53', 'sudo netstat -tulnp | grep :53', 'TCP/UDP 53 mesti terbuka pada server dan firewall'],
        ['Log', 'sudo tail -f /var/log/syslog', 'Kesilapan atau aktiviti mencurigakan'],
        ['Klien luar', 'nslookup example.com IP_Server_DNS', 'Menguji capaian dari komputer klien'],
      ]} />
      <NotaPenting>Ujian di 127.0.0.1 membuktikan BIND berfungsi pada pelayan itu sendiri. Ujian dari klien dengan <code>IP_Server_DNS</code> pula mengesahkan port 53 boleh dicapai merentasi rangkaian dan firewall.</NotaPenting>
    </>
  );
  const maintain = (
    <div className="grid md:grid-cols-2 gap-6">
      <InfoCard title="Rekod DNS & Kemas Kini Perisian" icon={Wrench}>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Semak rekod A, CNAME, MX, PTR secara berkala supaya tepat dan terkini.</li>
          <li>Buang rekod lama atau tidak sah; tambah rekod baharu (subdomain, server e-mel).</li>
          <li>Selepas edit fail zon: <code>sudo systemctl reload bind9</code>.</li>
          <li>Kemas kini BIND: <code>sudo apt update</code> kemudian <code>sudo apt upgrade bind9</code>, lalu <code>sudo systemctl restart bind9</code>.</li>
        </ul>
      </InfoCard>
      <InfoCard title="Keselamatan DNS" icon={ShieldCheck}>
        <ul className="list-disc pl-5 space-y-1.5">
          <li><b>DNSSEC</b> menjamin integriti dan keaslian rekod; jana kunci dan tandatangani zon.</li>
          <li><b>ACL</b> dalam named.conf menghadkan siapa boleh menghantar pertanyaan.</li>
          <li>Lindungi pelayan daripada <b>DDoS</b>; DNS spoofing boleh mengganggu perkhidmatan.</li>
        </ul>
      </InfoCard>
    </div>
  );
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <SubTabs tabs={[{ label: '1. Konfigurasi BIND', content: config }, { label: '2. Pemeriksaan & Pengujian', content: testing }, { label: '3. Penyelenggaraan & Kemas Kini', content: maintain }]} />
      <Latihan items={['Apakah yang dimaksudkan dengan DNS?', 'Nyatakan fungsi utama DNS.', 'Terangkan panduan umum untuk memasang dan mengkonfigurasi DNS server menggunakan BIND.']} />
      <Ringkasan>BIND9: <b>pasang, tambah zon, cipta fail zon, named-checkconf dan named-checkzone, start dan enable, uji dengan nslookup atau dig</b>. Nama perkhidmatan ialah bind9 (Ubuntu) atau named (CentOS). Selenggara rekod, kemas kini BIND, dan lindungi dengan DNSSEC serta ACL.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 7: KONFIGURASI, PENGUJIAN & PENYELENGGARAAN DHCP SERVER ---------------- */
function DhcpConfNotes() {
  const config = (
    <>
      <p className="text-sm text-slate-600">Perisian yang digunakan ialah ISC DHCP Server pada Ubuntu/Debian. Anda memerlukan akses root atau sudo, dan server mesti mempunyai <b>alamat IP statik</b> supaya klien sentiasa dapat mencapainya.</p>
      <StepList steps={[
        { title: 'Kemas kini sistem', code: ['sudo apt update', 'sudo apt upgrade'] },
        { title: 'Pasang ISC DHCP Server', code: ['sudo apt install isc-dhcp-server'] },
        { title: 'Edit fail konfigurasi DHCP', desc: 'Fail terletak di /etc/dhcp/dhcpd.conf.', code: ['sudo nano /etc/dhcp/dhcpd.conf'] },
      ]} />
      <Code title="dhcpd.conf" prompt={false} lines={['subnet 192.168.1.0 netmask 255.255.255.0 {', '    range 192.168.1.10 192.168.1.100;          # julat IP untuk klien', '    option routers 192.168.1.1;                # gateway lalai', '    option domain-name-servers 8.8.8.8, 8.8.4.4;   # DNS server', '    default-lease-time 600;                    # tempoh sewa (saat)', '    max-lease-time 7200;                       # tempoh sewa maksimum', '}']} />
      <NotesTable headers={['Parameter', 'Fungsi']} rows={[
        ['range', 'Julat alamat IP yang diberikan kepada klien'],
        ['option routers', 'Alamat gateway lalai'],
        ['option domain-name-servers', 'DNS server untuk klien'],
        ['default-lease-time', 'Tempoh sewa lalai (saat)'],
        ['max-lease-time', 'Tempoh sewa maksimum (saat)'],
      ]} />
      <StepList steps={[
        { title: 'Tentukan antaramuka rangkaian', desc: 'Sunting /etc/default/isc-dhcp-server dan tetapkan INTERFACESv4 kepada nama antaramuka anda (gantikan eth0 jika berbeza).', code: ['sudo nano /etc/default/isc-dhcp-server', '# di dalam fail, tetapkan baris berikut:', '~INTERFACESv4="eth0"'] },
        { title: 'Mulakan dan dayakan DHCP server', code: ['sudo systemctl restart isc-dhcp-server', 'sudo systemctl status isc-dhcp-server', 'sudo systemctl enable isc-dhcp-server'] },
        { title: 'Uji dengan klien', desc: 'Windows: ipconfig /renew. Linux: sudo dhclient. Pastikan alamat diterima daripada julat yang ditetapkan.' },
        { title: 'Selesaikan masalah', desc: 'Jika klien tiada IP, semak log, semak antaramuka yang ditetapkan, dan pastikan firewall tidak menyekat port DHCP.', code: ['sudo tail -f /var/log/syslog', 'sudo ufw allow 67/udp', 'sudo ufw allow 68/udp'] },
        { title: 'Selenggara', desc: 'Pantau fail sewaan dan simpan sandaran konfigurasi secara berkala.', code: ['cat /var/lib/dhcp/dhcpd.leases'] },
      ]} />
    </>
  );
  const testing = (
    <>
      <NotesTable headers={['Langkah', 'Apa yang diperiksa', 'Arahan']} rows={[
        ['1. Status perkhidmatan', 'Mesti active (running)', 'sudo systemctl status isc-dhcp-server'],
        ['2. Fail konfigurasi', 'Skop, range, routers, DNS dalam dhcpd.conf', 'sudo nano /etc/dhcp/dhcpd.conf'],
        ['3. Log DHCP', 'Permintaan klien, IP diberikan, ralat', 'sudo tail -f /var/log/syslog'],
        ['4. Pemberian IP kepada klien', 'Klien terima IP dalam julat', 'Linux: sudo dhclient -r lalu sudo dhclient, dan ip a. Windows: ipconfig /release, ipconfig /renew, ipconfig'],
        ['5. Fail sewaan', 'IP diberikan, MAC klien, tempoh sewa; setiap klien IP unik', 'cat /var/lib/dhcp/dhcpd.leases'],
        ['6. DNS dan gateway', 'Klien terima tetapan betul; uji akses Internet', 'cat /etc/resolv.conf dan ip route'],
        ['7. Tempoh sewaan', 'Pendekkan lease untuk uji pembaharuan automatik', 'default-lease-time 600;'],
        ['8. VLAN (jika ada)', 'Setiap VLAN ada skop dan julat IP berbeza', 'Sambungkan klien ke VLAN berbeza dan semak IP'],
      ]} />
    </>
  );
  const maintain = (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Pemantauan & Kemas Kini Konfigurasi" icon={Activity}>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Semak status dengan systemctl dan lihat mesej DHCPDISCOVER, DHCPOFFER, DHCPREQUEST, DHCPACK dalam syslog.</li>
            <li>Pantau lease untuk melihat IP diberikan, tarikh luput dan alamat MAC klien.</li>
            <li>Untuk ubah julat atau opsi, edit dhcpd.conf lalu <code>sudo systemctl restart isc-dhcp-server</code>.</li>
            <li>Opsi tambahan: <code>option broadcast-address 192.168.1.255;</code></li>
          </ul>
        </InfoCard>
        <InfoCard title="Kemas Kini, Backup & Lease" icon={Wrench}>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Kemas kini: <code>sudo apt upgrade isc-dhcp-server</code> (Debian/Ubuntu) atau <code>sudo yum update dhcp</code> (Red Hat/CentOS); semak versi dengan <code>dhcpd --version</code>.</li>
            <li>Kehabisan IP: tambah julat dalam dhcpd.conf atau bersihkan klien lama daripada fail leases.</li>
            <li>Semak konflik port 67 dan 68 dengan <code>sudo netstat -tuln | grep :67</code>.</li>
            <li>Sebelum perubahan besar, salin dhcpd.conf ke dhcpd.conf.backup; pulihkan dengan menyalin semula lalu restart.</li>
          </ul>
        </InfoCard>
      </div>
      <Code title="Backup dan pemulihan konfigurasi" lines={['sudo cp /etc/dhcp/dhcpd.conf /etc/dhcp/dhcpd.conf.backup', '# untuk memulihkan:', 'sudo cp /etc/dhcp/dhcpd.conf.backup /etc/dhcp/dhcpd.conf', 'sudo systemctl restart isc-dhcp-server']} />
      <NotaPenting>Kertas Penerangan menyebut memadam fail <code>dhcpd.leases</code> jika sewaan bermasalah. Amalan yang lebih selamat ialah menghentikan perkhidmatan dahulu (<code>sudo systemctl stop isc-dhcp-server</code>), membuat salinan fail, dan barulah bertindak ke atasnya. Ini kerana ia menyimpan rekod semua IP yang sedang dipajak.</NotaPenting>
    </>
  );
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <SubTabs tabs={[{ label: '1. Konfigurasi ISC DHCP', content: config }, { label: '2. Pemeriksaan & Pengujian', content: testing }, { label: '3. Penyelenggaraan & Kemas Kini', content: maintain }]} />
      <Latihan items={['Apakah maksud DHCP server?', 'Terangkan prosedur pemasangan DHCP server di Linux.']} />
      <Ringkasan>ISC DHCP: <b>IP statik pada server, install, edit dhcpd.conf (range, routers, DNS, lease), tetapkan INTERFACESv4, restart dan enable, uji dengan klien</b>. Semak log, dhcpd.leases, port 67/68 (UDP) dan sandarkan konfigurasi sebelum perubahan.</Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 8: KONFIGURASI, PENGUJIAN & PENYELENGGARAAN DIRECTORY SERVER ---------------- */
function LdapConfNotes() {
  const config = (
    <>
      <NotesTable headers={['Keperluan minimum', 'Nilai']} rows={[
        ['CPU', 'Sekurang-kurangnya 1 core'],
        ['RAM', 'Minimum 512 MB (disyorkan 1 GB atau lebih)'],
        ['Ruang cakera', 'Sekurang-kurangnya 10 GB untuk pemasangan dan data'],
        ['Sistem operasi', 'Ubuntu, CentOS atau Debian'],
      ]} />
      <StepList steps={[
        { title: 'Kemas kini sistem', code: ['sudo apt update && sudo apt upgrade   # Ubuntu/Debian', 'sudo yum update                       # CentOS'] },
        { title: 'Pasang OpenLDAP dan alat berkaitan', desc: 'Pada Ubuntu/Debian, proses pemasangan meminta kata laluan pengguna admin LDAP; catat kata laluan itu.', code: ['# Ubuntu/Debian', 'sudo apt install slapd ldap-utils', '# CentOS', 'sudo yum install openldap openldap-servers openldap-clients'] },
        { title: 'Konfigurasi awal slapd', desc: "Jalankan wizard dan ikut langkah: pilih 'No' (pemasangan baharu), masukkan nama domain LDAP (contoh: example.com), nama organisasi (contoh: Example Inc.), dan tetapkan kata laluan untuk cn=admin,dc=example,dc=com. Biarkan pilihan lain sebagai default.", code: ['sudo dpkg-reconfigure slapd   # Ubuntu/Debian', 'sudo systemctl restart slapd'] },
      ]} />
      <Code title="base.ldif" prompt={false} lines={['dn: dc=example,dc=com', 'objectClass: dcObject', 'dc: example', 'description: Example Domain', '', 'dn: cn=admin,dc=example,dc=com', 'objectClass: organizationalRole', 'cn: admin', 'description: LDAP Administrator']} />
      <StepList steps={[{ title: 'Tambah struktur ke LDAP', desc: 'Anda akan diminta kata laluan admin LDAP.', code: ['ldapadd -x -D "cn=admin,dc=example,dc=com" -W -f base.ldif'] }]} />
      <Code title="users.ldif" prompt={false} lines={['dn: uid=johndoe,ou=users,dc=example,dc=com', 'objectClass: inetOrgPerson', 'objectClass: posixAccount', 'objectClass: top', 'cn: John Doe', 'sn: Doe', 'uid: johndoe', 'uidNumber: 1001', 'gidNumber: 1001', 'userPassword: password', 'homeDirectory: /home/johndoe']} />
      <NotaPenting>Entri pengguna di atas terletak di bawah <code>ou=users</code>. Fail base.ldif dalam Kertas Penerangan tidak mencipta <code>ou=users</code>, jadi entri itu perlu wujud terlebih dahulu (ditambah melalui LDIF dengan objectClass organizationalUnit) sebelum <code>ldapadd</code> pengguna, jika tidak ralat "No such object" akan muncul.</NotaPenting>
      <StepList steps={[
        { title: 'Tambah pengguna dan uji carian', code: ['ldapadd -x -D "cn=admin,dc=example,dc=com" -W -f users.ldif', 'ldapsearch -x -b "dc=example,dc=com"'] },
        { title: 'Tetapan keselamatan SSL/TLS', desc: 'Untuk komunikasi selamat, pastikan ada sijil SSL yang sah dan konfigurasikan slapd menggunakan TLS mengikut dokumentasi OpenLDAP.' },
        { title: 'Pemeliharaan dan dokumentasi', desc: 'Pantau log slapd, buat sandaran dengan slapcat, kemas kini sistem secara berkala, dan catat semua langkah serta panduan pengguna.', code: ['sudo tail -f /var/log/syslog   # Ubuntu/Debian', 'sudo journalctl -f            # CentOS', 'sudo slapcat > backup.ldif'] },
      ]} />
    </>
  );
  const testing = (
    <>
      <NotesTable headers={['Ujian', 'Arahan', 'Tujuan']} rows={[
        ['Status slapd', 'sudo systemctl status slapd  |  service slapd status', 'Pastikan perkhidmatan berjalan'],
        ['Log', 'sudo tail -f /var/log/slapd.log  atau  /var/log/syslog', 'Cari ralat'],
        ['Penyambungan', 'ldapsearch -x -b "dc=example,dc=com"', 'Paparkan entri jika berjaya'],
        ['Dari klien', 'ldapsearch -x -H ldap://<server_ip> -b "dc=example,dc=com"', 'Sambungan dari mesin klien'],
        ['Cari pengguna', 'ldapsearch -x -b "ou=users,dc=example,dc=com" "(uid=johndoe)"', 'Pengguna wujud dan boleh dicapai'],
        ['Tambah entri', 'ldapadd -x -D "cn=admin,dc=example,dc=com" -W -f new_user.ldif', 'Ujian menambah pengguna'],
        ['Padam entri', 'ldapdelete -x -D "cn=admin,dc=example,dc=com" -W "uid=newuser,ou=users,dc=example,dc=com"', 'Pastikan pengguna hilang selepas carian semula'],
        ['SSL/TLS', 'ldapsearch -H ldaps://example.com -x -b "dc=example,dc=com"', 'Sijil sah tanpa ralat'],
        ['Akses tanpa kebenaran', 'ldapsearch -x -b "dc=example,dc=com" -D "uid=unauthorizeduser,dc=example,dc=com"', 'Mesej akses ditolak'],
      ]} />
      <p className="text-sm text-slate-600">Selepas ujian, lakukan pemantauan berkala dengan Nagios, Zabbix atau Grafana, sandarkan dengan <code>slapcat &gt; backup.ldif</code>, kemas kini sistem, dan dokumenkan prosedur serta panduan pengguna.</p>
    </>
  );
  const maintain = (
    <div className="grid md:grid-cols-2 gap-6">
      <InfoCard title="Pemantauan & Backup" icon={Activity}>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Ketersediaan dan amaran: Nagios, Zabbix atau Grafana.</li>
          <li>Prestasi: <code>top</code> untuk CPU dan memori, <code>df -h</code> untuk ruang cakera.</li>
          <li>Backup berkala: <code>slapcat &gt; /path/to/backup.ldif</code>.</li>
          <li>Uji pemulihan secara berkala dalam persekitaran ujian.</li>
        </ul>
      </InfoCard>
      <InfoCard title="Kemas Kini & Penjagaan Data" icon={Wrench}>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Kemas kini OS: <code>sudo apt update &amp;&amp; sudo apt upgrade</code> atau <code>sudo yum update</code>; kemas kini perisian directory server.</li>
          <li>Bersihkan entri tidak diperlukan; buat dasar untuk pengguna tidak aktif.</li>
          <li>Audit berkala terhadap akses dan perubahan; semak log untuk kelakuan mencurigakan.</li>
        </ul>
      </InfoCard>
      <InfoCard title="Pengurusan Pengguna & Akses" icon={Users}>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Kaji dan kemas kini hak akses supaya hanya pengguna sah mempunyai akses.</li>
          <li>Dasar kata laluan kukuh dengan tempoh tamat.</li>
          <li>Pantau aktiviti pengguna untuk kelakuan mencurigakan.</li>
        </ul>
      </InfoCard>
      <InfoCard title="Dokumentasi, Latihan & Pemulihan Bencana" icon={ClipboardCheck}>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Dokumenkan prosedur penyelenggaraan, sandaran, pemulihan dan audit; rekod semua perubahan.</li>
          <li>Latih pengguna akhir dan kemas kini dokumentasi pengguna.</li>
          <li>Sediakan rancangan pemulihan bencana untuk kegagalan sistem atau serangan, dan uji secara berkala.</li>
        </ul>
      </InfoCard>
    </div>
  );
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <SubTabs tabs={[{ label: '1. Konfigurasi OpenLDAP', content: config }, { label: '2. Pemeriksaan & Pengujian', content: testing }, { label: '3. Penyelenggaraan & Kemas Kini', content: maintain }]} />
      <Latihan items={['Apakah maksud Directory Server?', 'Nyatakan fungsi Directory Server.', 'Terangkan langkah-langkah prosedur konfigurasi directory server dalam sistem operasi Linux.', 'Terangkan langkah-langkah penyelenggaraan dan kemas kini directory server.']} />
      <Ringkasan>OpenLDAP: <b>persediaan, pasang slapd dan ldap-utils, dpkg-reconfigure slapd, LDIF (ldapadd), tambah pengguna, ldapsearch, SSL/TLS, pemeliharaan</b>. Uji carian, tambah, padam, ldaps:// dan akses tanpa kebenaran. Selenggara dengan pemantauan, slapcat, audit, dasar akaun dan rancangan pemulihan bencana.</Ringkasan>
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
  const [activeQuestions, setActiveQuestions] = useState(() => shuffleQuestions(ikr3103QuizSets[0].questions));

  const currentSet = ikr3103QuizSets[kpIndex];
  const passScore = 18;

  const score = useMemo(() => activeQuestions.reduce((total, question, index) => total + (answers[index] === question.options.indexOf(question.correct) ? 1 : 0), 0), [answers, activeQuestions]);

  const retryLevel = () => {
    setAnswers({});
    setSubmitted(false);
    setActiveQuestions(shuffleQuestions(ikr3103QuizSets[kpIndex].questions));
  };

  const nextKp = () => {
    if (score >= passScore && kpIndex < ikr3103QuizSets.length - 1) {
      const nextIndex = kpIndex + 1;
      setHighestKp(previous => Math.max(previous, nextIndex));
      setKpIndex(nextIndex);
      setAnswers({});
      setSubmitted(false);
      setActiveQuestions(shuffleQuestions(ikr3103QuizSets[nextIndex].questions));
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
            <div className="text-xs font-black uppercase tracking-[.2em] text-green-700">Tahap Kuiz</div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{currentSet.code} - {currentSet.title}</h2>
            <p className="text-sm text-slate-600 mt-2">Setiap KP mengandungi 30 soalan (10 easy, 10 medium, 10 hard KBAT). Lulus minimum ialah 18/30.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ikr3103QuizSets.map((item, index) => (
              <button key={item.id} disabled={index > highestKp || (index === kpIndex && submitted && score < passScore)} onClick={() => {
                if (index <= highestKp) {
                  setKpIndex(index);
                  setAnswers({});
                  setSubmitted(false);
                  setActiveQuestions(shuffleQuestions(ikr3103QuizSets[index].questions));
                }
              }} className={`rounded-full px-4 py-2 text-xs font-black border ${index === kpIndex ? 'bg-green-600 border-green-600 text-white' : 'bg-white border-slate-300 text-slate-700'} ${index > highestKp ? 'opacity-50 cursor-not-allowed' : ''}`}>{item.code}</button>
            ))}
          </div>
        </div>
      </div>

      {submitted && (
        <div className={`rounded-2xl p-6 mb-6 text-white ${score >= passScore ? 'bg-emerald-600' : 'bg-rose-600'}`}>
          <div className="flex items-center gap-3"><Award size={34} /><div><p className="text-sm font-bold opacity-90">Keputusan {currentSet.code}</p><h2 className="text-3xl font-black">{score} / {activeQuestions.length}</h2></div></div>
          <p className="mt-3 font-medium">
            {score >= passScore
              ? `Lulus ${currentSet.code}. Anda layak ${kpIndex < ikr3103QuizSets.length - 1 ? 'naik ke ' + ikr3103QuizSets[kpIndex + 1].code : 'menamatkan semua KP'}.`
              : `Belum lulus. Markah minimum ialah 18/30 - sila ulang ${currentSet.code} sebelum naik ke tahap seterusnya.`}
          </p>
        </div>
      )}

      <div className="space-y-5">
        {activeQuestions.map((question, index) => (
          <article key={`${currentSet.id}-${index}-${question.question}`} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2"><span className={`text-[10px] font-black uppercase tracking-wide rounded-full px-2.5 py-1 ${question.difficulty === 'hard' ? 'bg-rose-100 text-rose-700' : question.difficulty === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{question.difficulty === 'hard' ? 'Hard KBAT' : question.difficulty === 'medium' ? 'Medium' : 'Easy'}</span></div>
            <h3 className="font-black text-slate-900"><span className="text-green-600 mr-2">{index + 1}.</span>{question.question}</h3>
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
                    className={`text-left p-3 rounded-xl border text-sm font-medium transition-all ${correct ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : wrong ? 'border-rose-500 bg-rose-50 text-rose-800' : selected ? 'border-green-500 bg-green-50 text-green-800' : 'border-slate-200 hover:border-green-300'}`}
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
          <button disabled={Object.keys(answers).length !== activeQuestions.length} onClick={handleSubmit} className="flex-1 bg-green-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-black hover:bg-green-700 transition-colors">Hantar Jawapan {currentSet.code}</button>
        ) : (
          <>
            {score >= passScore && kpIndex < ikr3103QuizSets.length - 1 && (
              <button onClick={nextKp} className="flex-1 bg-emerald-600 text-white px-6 py-4 rounded-xl font-black hover:bg-emerald-700">Naik ke {ikr3103QuizSets[kpIndex + 1].code}</button>
            )}
            <button onClick={retryLevel} className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-xl font-black hover:bg-slate-800"><RotateCcw size={19} /> Cuba Semula {currentSet.code}</button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- KOMPONEN UTAMA ---------------- */
export default function IKR3103({ onBackToPortal }) {
  const [view, setView] = useState('menu');
  const [readState, setReadState] = useState(() => {
    const fallback = [false, false, false, false, false, false, false, false];
    try {
      const saved = JSON.parse(localStorage.getItem('ikr3103-read-state'));
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
    try { localStorage.setItem('ikr3103-read-state', JSON.stringify(fallback)); } catch { /* storan tidak tersedia */ }
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
    try { localStorage.setItem('ikr3103-read-state', JSON.stringify(nextReadState)); } catch { /* storan tidak tersedia */ }
    const nextInLine = sections[requested + 1];
    if (nextInLine) setView(nextInLine.id);
  };

  if (view !== 'menu') {
    const content = {
      web: <WebNotes />,
      secure: <SecureNotes />,
      dnsdhcp: <DnsDhcpNotes />,
      directory: <DirectoryNotes />,
      webconf: <WebConfNotes />,
      dnsconf: <DnsConfNotes />,
      dhcpconf: <DhcpConfNotes />,
      ldapconf: <LdapConfNotes />,
      quiz: <Quiz />,
    }[view];

    const showCompleteButton = sections.some((section) => section.id === view);
    const headerMeta = sections.find((section) => section.id === view) || featureCards.find((f) => f.id === view) || sections[0];

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <NosAnimStyles />
        <div className="bg-slate-950 text-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Terminal size={30} className="text-green-300" />
                <div>
                  <div className="text-[10px] uppercase tracking-[.2em] text-green-300 font-black">Network Operating System</div>
                  <div className="text-sm font-black">{completedCount}/{sections.length} bahagian</div>
                </div>
              </div>
              <div className="flex-1 max-w-md">
                <div className="flex items-center justify-between text-[10px] font-black tracking-[.18em] text-green-200 uppercase"><span>Progress</span><span>{progressPercent}%</span></div>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-green-300 to-lime-300 transition-all" style={{ width: `${progressPercent}%` }} /></div>
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
        <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">IKR3103 Network Operating System - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>
      </div>
    );
  }

  return (
    <div className="course-menu-page min-h-screen bg-slate-50 text-slate-900">
      <NosAnimStyles />
      <ModuleMenu title="Modul IKR3103: Network Operating System" icon={sections[0].icon} secondaryIcon={sections[1].icon}
        onBack={onBackToPortal} topics={sections} read={readState} onTopic={section => openSection(section.id)} onReset={resetProgress}
        description={<>Fungsi dan konfigurasi perkhidmatan rangkaian di Linux: Web Server (Apache/Nginx), DNS Server (BIND9), DHCP Server (ISC) dan Directory Server (OpenLDAP) - dipecahkan kepada 8 bahagian, lengkap dengan kuiz 150 soalan.</>}>
        <ModuleActivities activities={featureCards} simulations={simCards} quizLocked={!readState[sections.length - 1]} onOpen={openSection} />
      </ModuleMenu>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">IKR3103 Network Operating System - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>
    </div>
  );
}

