import ModuleMenu, { ModuleAction } from './ModuleMenu';
import { createElement, useMemo, useState } from 'react';
import {
  Activity, ArrowLeft, ArrowRight, Award, Blocks as BlocksIcon, Bot, BookOpen, Bug, Building2, Cable, CheckCircle, ChevronRight, ClipboardCheck, Cloud, Code,
  DatabaseBackup, Download, Filter, Flame, GitBranch, GraduationCap, Home, KeyRound, Lightbulb, ListChecks, Lock, Network, Plug,
  Puzzle, Radio, RefreshCw, Router, RotateCcw, Search, Server, ShieldAlert, ShieldCheck, Sparkles, Target, Terminal,
  Wifi, Workflow, XCircle,
} from 'lucide-react';

/*
  Shell kongsi untuk modul Semester 3 (IKR3143, IKR3153, IKR3163).
  Ikut kontrak modul eSL: default export menerima { onBackToPortal }, buka kunci berurutan
  (localStorage '<kod>-read-state'), kuiz terbuka selepas semua nota dibaca.
  Kelas Tailwind ditulis penuh (literal) supaya dikesan oleh Tailwind v4.
*/

const accentStyles = {
  red: { icon: 'bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-500/30', ring: 'hover:border-red-300 hover:shadow-red-200/60', badge: 'bg-red-100 text-red-700', topBar: 'from-red-400 to-red-600' },
  orange: { icon: 'bg-gradient-to-br from-orange-500 to-orange-700 shadow-lg shadow-orange-500/30', ring: 'hover:border-orange-300 hover:shadow-orange-200/60', badge: 'bg-orange-100 text-orange-700', topBar: 'from-orange-400 to-orange-600' },
  amber: { icon: 'bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg shadow-amber-500/30', ring: 'hover:border-amber-300 hover:shadow-amber-200/60', badge: 'bg-amber-100 text-amber-700', topBar: 'from-amber-400 to-amber-600' },
  cyan: { icon: 'bg-gradient-to-br from-cyan-500 to-cyan-700 shadow-lg shadow-cyan-500/30', ring: 'hover:border-cyan-300 hover:shadow-cyan-200/60', badge: 'bg-cyan-100 text-cyan-800', topBar: 'from-cyan-400 to-cyan-600' },
  teal: { icon: 'bg-gradient-to-br from-teal-500 to-teal-700 shadow-lg shadow-teal-500/30', ring: 'hover:border-teal-300 hover:shadow-teal-200/60', badge: 'bg-teal-100 text-teal-700', topBar: 'from-teal-400 to-teal-600' },
  blue: { icon: 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30', ring: 'hover:border-blue-300 hover:shadow-blue-200/60', badge: 'bg-blue-100 text-blue-700', topBar: 'from-blue-400 to-blue-600' },
  violet: { icon: 'bg-gradient-to-br from-violet-500 to-violet-700 shadow-lg shadow-violet-500/30', ring: 'hover:border-violet-300 hover:shadow-violet-200/60', badge: 'bg-violet-100 text-violet-700', topBar: 'from-violet-400 to-violet-600' },
  indigo: { icon: 'bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-500/30', ring: 'hover:border-indigo-300 hover:shadow-indigo-200/60', badge: 'bg-indigo-100 text-indigo-700', topBar: 'from-indigo-400 to-indigo-600' },
};

/* Tema utama modul (warna dominan header, butang, progress, kuiz) */
const themes = {
  red: {
    hero: 'from-slate-950 via-slate-900 to-red-800', pill: 'bg-red-400/15 border-red-300/20 text-red-100', grad: 'from-red-300 to-orange-300',
    sub: 'text-red-50/85', label: 'text-red-300', labelSoft: 'text-red-200', text: 'text-red-700', textStrong: 'text-red-600',
    bar: 'bg-gradient-to-r from-red-500 to-orange-400', barHead: 'bg-gradient-to-r from-red-300 to-orange-300',
    btn: 'bg-red-600 hover:bg-red-700', tabOn: 'bg-red-600 border-red-600 text-white', sel: 'border-red-500 bg-red-50 text-red-800',
    hoverOpt: 'hover:border-red-300', tableHead: 'bg-red-50 text-red-900', note: 'bg-red-50 border-red-200 text-red-900',
    code: 'text-red-300', link: 'hover:text-red-500', rule: 'border-red-500',
  },
  cyan: {
    hero: 'from-slate-950 via-slate-900 to-cyan-800', pill: 'bg-cyan-400/15 border-cyan-300/20 text-cyan-100', grad: 'from-cyan-300 to-teal-300',
    sub: 'text-cyan-50/85', label: 'text-cyan-300', labelSoft: 'text-cyan-200', text: 'text-cyan-800', textStrong: 'text-cyan-700',
    bar: 'bg-gradient-to-r from-cyan-500 to-teal-400', barHead: 'bg-gradient-to-r from-cyan-300 to-teal-300',
    btn: 'bg-cyan-700 hover:bg-cyan-800', tabOn: 'bg-cyan-700 border-cyan-700 text-white', sel: 'border-cyan-500 bg-cyan-50 text-cyan-900',
    hoverOpt: 'hover:border-cyan-300', tableHead: 'bg-cyan-50 text-cyan-900', note: 'bg-cyan-50 border-cyan-200 text-cyan-900',
    code: 'text-cyan-300', link: 'hover:text-cyan-600', rule: 'border-cyan-500',
  },
  violet: {
    hero: 'from-slate-950 via-slate-900 to-violet-800', pill: 'bg-violet-400/15 border-violet-300/20 text-violet-100', grad: 'from-violet-300 to-fuchsia-300',
    sub: 'text-violet-50/85', label: 'text-violet-300', labelSoft: 'text-violet-200', text: 'text-violet-700', textStrong: 'text-violet-600',
    bar: 'bg-gradient-to-r from-violet-500 to-fuchsia-400', barHead: 'bg-gradient-to-r from-violet-300 to-fuchsia-300',
    btn: 'bg-violet-600 hover:bg-violet-700', tabOn: 'bg-violet-600 border-violet-600 text-white', sel: 'border-violet-500 bg-violet-50 text-violet-800',
    hoverOpt: 'hover:border-violet-300', tableHead: 'bg-violet-50 text-violet-900', note: 'bg-violet-50 border-violet-200 text-violet-900',
    code: 'text-violet-300', link: 'hover:text-violet-500', rule: 'border-violet-500',
  },
};

function AnimStyles() {
  return (
    <style>{`
      @keyframes s3FadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes s3ScaleIn { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: scale(1); } }
      .s3-entry-title { animation: s3FadeUp .5s ease-out both; }
      .s3-entry-icon { animation: s3ScaleIn .45s ease-out both; }
      .s3-entry-sub { animation: s3FadeUp .5s ease-out .1s both; }
      .s3-reveal { animation: s3FadeUp .5s ease-out both; }
      .s3-reveal-1{animation-delay:.05s}.s3-reveal-2{animation-delay:.1s}.s3-reveal-3{animation-delay:.15s}
      .s3-reveal-4{animation-delay:.2s}.s3-reveal-5{animation-delay:.25s}.s3-reveal-6{animation-delay:.3s}
      .s3-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
      .s3-card:hover:not(:disabled) { transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(15,23,42,.18); }
      @media (prefers-reduced-motion: reduce) {
        .s3-entry-title, .s3-entry-icon, .s3-entry-sub, .s3-reveal, .s3-card { animation: none !important; transition: none !important; }
        .s3-card:hover:not(:disabled) { transform: none; }
      }
    `}</style>
  );
}

/*
  Peta kata kunci -> ikon untuk tajuk subtopik Nota Lengkap.
  Kunci huruf kecil, dipadankan pada permulaan perkataan. Padanan pertama menang (urutan penting:
  kata kunci khusus diletak sebelum yang umum). Tiada padanan -> BookOpen.
*/
const HEADING_ICONS = {
  tujuan: Target,
  firewall: Flame, 'tembok api': Flame,
  antivirus: ShieldCheck, pengukuhan: ShieldCheck, hardening: ShieldCheck,
  'tanpa wayar': Wifi, wireless: Wifi, ssid: Wifi, isyarat: Wifi,
  mfa: KeyRound, 'kata laluan': KeyRound, pengesahan: KeyRound, authentication: KeyRound,
  penyulitan: Lock, encryption: Lock, '3des': Lock,
  'kecerdasan buatan': Bot,
  'zero trust': ShieldAlert, ancaman: ShieldAlert, serangan: ShieldAlert, phishing: ShieldAlert, 'man-in-the-middle': ShieldAlert,
  cloud: Cloud, awan: Cloud, blockchain: BlocksIcon,
  patch: RefreshCw, tampalan: RefreshCw, 'kemas kini': RefreshCw, update: RefreshCw, 'service pack': RefreshCw, 'pakej perkhidmatan': RefreshCw,
  git: GitBranch, branching: GitBranch, 'version control': GitBranch,
  python: Terminal, phyton: Terminal, bash: Terminal, perl: Terminal, ssh: Terminal, terminal: Terminal,
  skrip: Terminal, script: Terminal, pengaturcaraan: Terminal, loop: Terminal,
  router: Router, protokol: Router,
  suis: Cable, switch: Cable, port: Cable, penapisan: Cable,
  saringan: Filter,
  ipv4: Network, ipv6: Network, subnet: Network, vlsm: Network, dns: Network, alamat: Network, pengalamatan: Network,
  segmentasi: Network, perimeter: Network, 'membahagikan rangkaian': Network,
  unicast: Radio, broadcast: Radio, multicast: Radio,
  pengauditan: ClipboardCheck, audit: ClipboardCheck,
  pemantauan: Activity, monitor: Activity,
  sandaran: DatabaseBackup, backup: DatabaseBackup,
  pemasangan: Download, installation: Download,
  api: Plug, extension: Puzzle, plugin: Puzzle,
  editor: Code, code: Code, ralat: Bug, cari: Search,
  pelayan: Server, server: Server,
  ansible: Workflow, chef: Workflow, puppet: Workflow, automasi: Workflow, automation: Workflow,
  fizikal: Building2,
  latihan: GraduationCap, kesedaran: GraduationCap,
  rumusan: ListChecks, kesimpulan: ListChecks,
  akses: KeyRound,
};

const escapeRegExp = (v) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const HEADING_ICON_RULES = Object.entries(HEADING_ICONS).map(([key, Icon]) => [new RegExp(`(^|[^a-z0-9])${escapeRegExp(key)}`), Icon]);

function findHeadingIcon(html) {
  const text = String(html || '').replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').toLowerCase().slice(0, 120);
  const hit = HEADING_ICON_RULES.find(([re]) => re.test(text));
  return hit ? hit[1] : BookOpen;
}

function SemakKefahaman({ questions }) {
  const [n, setN] = useState(0);
  const [sel, setSel] = useState(-1);
  const [checked, setChecked] = useState(false);
  const [err, setErr] = useState(false);
  const item = questions[n];
  const correct = checked && sel === item.answer;

  const choose = (i) => { if (correct) return; setSel(i); setChecked(false); setErr(false); };
  const check = () => { if (sel < 0) { setErr(true); return; } setChecked(true); };
  const another = () => {
    let next = n;
    if (questions.length > 1) while (next === n) next = Math.floor(Math.random() * questions.length);
    setN(next); setSel(-1); setChecked(false); setErr(false);
  };
  const optionClass = (i) => {
    if (sel !== i) return 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
    if (!checked) return 'border-slate-900 bg-slate-100 text-slate-900';
    return i === item.answer ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-rose-400 bg-rose-50 text-rose-800';
  };

  return (
    <section className="max-w-6xl mx-auto px-4 pb-6" aria-labelledby="semak-kefahaman">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={22} className="text-amber-500" aria-hidden="true" />
          <h3 id="semak-kefahaman" className="font-black text-slate-900">Semak Kefahaman</h3>
          <span className="ml-auto text-[11px] font-bold uppercase tracking-widest text-slate-400">{item.level}</span>
        </div>
        <p className="font-bold text-slate-900 mb-4">{item.q}</p>
        <div className="grid gap-2 mb-4" role="group" aria-label="Pilihan jawapan">
          {item.options.map((opt, i) => (
            <button key={opt} onClick={() => choose(i)} aria-pressed={sel === i} className={`flex items-center gap-3 text-left border rounded-xl px-4 py-3 min-h-11 text-sm font-semibold transition-colors ${optionClass(i)}`}>
              <span className="shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-black" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
              <span>{opt}</span>
            </button>
          ))}
        </div>
        {err && <p className="text-sm font-bold text-rose-600 mb-3" role="alert">Pilih satu jawapan dahulu.</p>}
        {checked && (
          <p className={`text-sm font-bold mb-3 ${correct ? 'text-emerald-700' : 'text-rose-700'}`} role="status">
            {correct ? 'Betul. Teruskan ke bahagian seterusnya.' : 'Belum tepat. Baca semula nota di atas, kemudian cuba lagi.'}
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          {!correct && <button onClick={check} className="bg-slate-900 text-white px-5 py-2.5 min-h-11 rounded-xl font-black text-sm hover:bg-slate-700 transition-colors">Semak jawapan</button>}
          <button onClick={another} className="border border-slate-200 bg-white text-slate-700 px-5 py-2.5 min-h-11 rounded-xl font-black text-sm hover:bg-slate-50 transition-colors">Soalan lain</button>
        </div>
      </div>
    </section>
  );
}

function HeadingIcon({ html, className }) {
  return createElement(findHeadingIcon(html), { size: 22, className, 'aria-hidden': 'true' });
}

const Html = ({ html, as: Tag = 'span', className }) => <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;

function PageHeader({ title, subtitle, icon: Icon, onBack, accent }) {
  const style = accentStyles[accent] || accentStyles.blue;
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${style.topBar}`} />
      <div className={`pointer-events-none absolute -right-20 -top-24 w-72 h-72 rounded-full blur-3xl opacity-40 ${style.icon}`} />
      <div className="max-w-6xl mx-auto px-4 py-5 md:py-7 relative z-10">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white mb-5 min-h-11">
          <ArrowLeft size={18} /> Kembali ke Menu Modul
        </button>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-2xl border border-white/15 ${style.icon} s3-entry-icon`}><Icon size={28} className="text-white" aria-hidden="true" /></div>
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight s3-entry-title">{title}</h1>
            <p className="text-slate-300 mt-2 max-w-3xl text-sm md:text-base s3-entry-sub">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const proseCls = '[&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.85em] [&_code]:text-slate-800 [&_b]:text-slate-900';

/* Papar senarai blok kandungan: p, ul, table, code, h (tajuk kecil), cap (kapsyen jadual/rajah) */
function Blocks({ blocks, theme }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        if (block.t === 'h') return <Html key={i} as="h4" html={block.html} className={`pt-2 font-black text-slate-900 text-base md:text-lg border-l-4 pl-3 ${theme.rule}`} />;
        if (block.t === 'p') return <Html key={i} as="p" html={block.html} className={`text-sm md:text-base text-slate-700 leading-relaxed ${proseCls}`} />;
        if (block.t === 'cap') return <Html key={i} as="p" html={block.html} className="text-xs font-bold text-slate-500 italic" />;
        if (block.t === 'ul') {
          return (
            <ul key={i} className={`space-y-2.5 text-sm md:text-base text-slate-700 leading-relaxed ${proseCls}`}>
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-3">
                  <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${theme.bar}`} aria-hidden="true" />
                  <Html html={item} className="min-w-0" />
                </li>
              ))}
            </ul>
          );
        }
        if (block.t === 'table') {
          return (
            <div key={i} className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-sm">
                <thead><tr className={theme.tableHead}>{block.head.map((h, k) => <Html key={k} as="th" html={h} className="text-left font-black p-3 md:p-4" />)}</tr></thead>
                <tbody>
                  {block.rows.map((row, r) => (
                    <tr key={r} className={r % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      {row.map((cell, c) => <Html key={c} as="td" html={cell} className="p-3 md:p-4 align-top border-t border-slate-200 text-slate-700" />)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return (
          <pre key={i} tabIndex={0} aria-label="Contoh kod atau konfigurasi" className="overflow-x-auto rounded-2xl bg-slate-950 p-4 md:p-5 text-xs md:text-sm leading-relaxed text-slate-100 shadow-sm"><code>{block.text}</code></pre>
        );
      })}
    </div>
  );
}

function QuickNote({ q, theme, showTitle }) {
  return (
    <div className="space-y-4">
      {showTitle && <h3 className="font-black text-slate-900 text-lg">{q.title}</h3>}
      {q.easy && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 flex gap-3">
          <Sparkles size={20} className="text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-amber-700 mb-1">Faham Mudah</p>
            <Html as="p" html={q.easy} className="text-sm md:text-base text-amber-900 leading-relaxed" />
          </div>
        </div>
      )}
      <Blocks blocks={q.blocks} theme={theme} />
      {q.sum && (
        <div className="rounded-2xl bg-slate-950 text-white p-4 md:p-5 flex gap-3">
          <ListChecks size={20} className={`${theme.code} shrink-0 mt-0.5`} aria-hidden="true" />
          <div>
            <p className={`text-xs font-black uppercase tracking-wide ${theme.code} mb-1`}>Ringkasan</p>
            <Html as="p" html={q.sum} className="text-sm text-slate-100 leading-relaxed" />
          </div>
        </div>
      )}
    </div>
  );
}

function NoteBody({ note, theme }) {
  const full = note.full || [];
  const quick = note.quick || [];
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {quick.length > 0 && (
        <section className="s3-reveal rounded-3xl border border-slate-200 bg-white p-5 md:p-7 shadow-sm">
          <p className={`text-xs font-black tracking-[.2em] ${theme.text} mb-1`}>RUMUSAN PANTAS</p>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-5">Faham dahulu intipati, kemudian baca nota lengkap</h2>
          <div className="space-y-8 divide-y divide-slate-100 [&>div:not(:first-child)]:pt-8">
            {quick.map((q, i) => <QuickNote key={i} q={q} theme={theme} showTitle={quick.length > 1} />)}
          </div>
        </section>
      )}

      {full.length > 0 && (
        <section>
          <p className={`text-xs font-black tracking-[.2em] ${theme.text}`}>NOTA LENGKAP</p>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1 mb-4">Kertas Penerangan</h2>
          <article className="rounded-3xl border border-slate-200 bg-white p-5 md:p-8 shadow-sm space-y-8">
            {full.map((sec, i) => (
              <div key={i} className={i > 0 ? 'pt-8 border-t border-slate-100' : ''}>
                <div className={`mb-4 flex items-start gap-3 border-l-4 pl-3 ${theme.rule}`}>
                  <HeadingIcon html={sec.h} className={`${theme.textStrong} shrink-0 mt-0.5`} />
                  <Html as="h3" html={sec.h === 'TUJUAN' ? 'Tujuan' : sec.h} className="font-black text-slate-900 text-lg md:text-xl" />
                </div>
                <Blocks blocks={sec.blocks} theme={theme} />
              </div>
            ))}
          </article>
        </section>
      )}
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

const prepare = (questions) => shuffleArray(questions).map((q) => ({ ...q, options: shuffleArray(q.options) }));

const levelBadge = {
  KBAT: ['bg-red-100 text-red-700', 'Hard KBAT'],
  sederhana: ['bg-amber-100 text-amber-700', 'Sederhana'],
  mudah: ['bg-emerald-100 text-emerald-700', 'Mudah'],
};

function Quiz({ sets, theme }) {
  const [kpIndex, setKpIndex] = useState(0);
  const [highestKp, setHighestKp] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [active, setActive] = useState(() => prepare(sets[0].questions));

  const current = sets[kpIndex];
  const total = current.questions.length;
  const passScore = Math.ceil(total * 0.6);
  const lastKp = kpIndex === sets.length - 1;

  const score = useMemo(
    () => active.reduce((sum, q, i) => sum + (answers[i] === q.options.indexOf(q.correct) ? 1 : 0), 0),
    [answers, active],
  );

  const load = (index) => {
    setHighestKp(previous => Math.max(previous, index));
    setKpIndex(index);
    setAnswers({});
    setSubmitted(false);
    setActive(prepare(sets[index].questions));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const allAnswered = Object.keys(answers).length === active.length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className={`text-xs font-black uppercase tracking-[.2em] ${theme.text}`}>Tahap Kuiz</div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{current.code} - {current.title}</h2>
            <p className="text-sm text-slate-600 mt-2">Setiap KP mengandungi {total} soalan (7 mudah, 7 sederhana, 6 KBAT). Lulus minimum ialah {passScore}/{total}.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {sets.map((item, index) => (
              <button
                key={item.id}
                disabled={index > highestKp || (index === kpIndex && submitted && score < passScore)}
                onClick={() => index <= highestKp && load(index)}
                className={`rounded-full px-4 py-2 min-h-11 text-xs font-black border ${index === kpIndex ? theme.tabOn : 'bg-white border-slate-300 text-slate-700'} ${index > highestKp ? 'opacity-50 cursor-not-allowed' : ''}`}
              >{item.code}</button>
            ))}
          </div>
        </div>
      </div>

      {submitted && (
        <div role="status" className={`rounded-2xl p-6 mb-6 text-white ${score >= passScore ? 'bg-emerald-600' : 'bg-red-600'}`}>
          <div className="flex items-center gap-3"><Award size={34} aria-hidden="true" /><div><p className="text-sm font-bold opacity-90">Keputusan {current.code}</p><h2 className="text-3xl font-black">{score} / {total}</h2></div></div>
          <p className="mt-3 font-medium">
            {score >= passScore
              ? `Lulus ${current.code}. ${lastKp ? 'Tahniah, anda telah menamatkan semua KP!' : `Anda layak naik ke ${sets[kpIndex + 1].code}.`}`
              : `Belum lulus. Markah minimum ialah ${passScore}/${total} - sila ulang ${current.code} sebelum naik ke tahap seterusnya.`}
          </p>
        </div>
      )}

      <div className="space-y-5">
        {active.map((q, index) => {
          const [badgeCls, badgeText] = levelBadge[q.difficulty] || levelBadge.mudah;
          const correctIdx = q.options.indexOf(q.correct);
          return (
            <article key={`${current.id}-${index}-${q.question}`} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2"><span className={`text-[10px] font-black uppercase tracking-wide rounded-full px-2.5 py-1 ${badgeCls}`}>{badgeText}</span></div>
              <h3 className="font-black text-slate-900"><span className={`${theme.textStrong} mr-2`}>{index + 1}.</span>{q.question}</h3>
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                {q.options.map((option, oi) => {
                  const selected = answers[index] === oi;
                  const correct = submitted && oi === correctIdx;
                  const wrong = submitted && selected && oi !== correctIdx;
                  return (
                    <button
                      key={`${q.question}-${option}`}
                      disabled={submitted}
                      aria-pressed={selected}
                      onClick={() => setAnswers((c) => ({ ...c, [index]: oi }))}
                      className={`text-left p-3 min-h-11 rounded-xl border text-sm font-medium transition-all ${correct ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : wrong ? 'border-red-500 bg-red-50 text-red-800' : selected ? theme.sel : `border-slate-200 ${theme.hoverOpt}`}`}
                    >
                      <span className="flex items-center gap-2">{correct ? <CheckCircle size={17} className="shrink-0" /> : wrong ? <XCircle size={17} className="shrink-0" /> : <span className="w-4 h-4 shrink-0 rounded-full border border-current" />}{option}</span>
                    </button>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-7 flex flex-col sm:flex-row gap-3">
        {!submitted ? (
          <button disabled={!allAnswered} onClick={() => allAnswered && setSubmitted(true)} className={`flex-1 ${theme.btn} disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-black transition-colors`}>Hantar Jawapan {current.code}</button>
        ) : (
          <>
            {score >= passScore && !lastKp && (
              <button onClick={() => load(kpIndex + 1)} className="flex-1 bg-emerald-600 text-white px-6 py-4 rounded-xl font-black hover:bg-emerald-700">Naik ke {sets[kpIndex + 1].code}</button>
            )}
            <button onClick={() => load(kpIndex)} className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-xl font-black hover:bg-slate-800"><RotateCcw size={19} /> Cuba Semula {current.code}</button>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * config: { code, name, tagline, theme: 'red'|'cyan'|'violet', heroIcon, sectionIcons[], palette[3], notes[], quiz[] }
 */
export default function ModulSem3({ config, onBackToPortal }) {
  const { code, name, tagline, theme: themeKey, heroIcon: HeroIcon, sectionIcons, palette, notes, quiz } = config;
  const theme = themes[themeKey];
  const storageKey = `${code.toLowerCase()}-read-state`;

  const sections = useMemo(() => notes.map((n, i) => ({
    id: `n${i + 1}`, title: `KP ${i + 1}: ${n.title}`, desc: n.sub, icon: sectionIcons[i % sectionIcons.length], accent: palette[i % palette.length],
  })), [notes, sectionIcons, palette]);

  const quizSets = useMemo(() => quiz.map((kp) => ({
    id: `kp${kp.kp}`,
    code: `KP ${kp.kp}/${quiz.length}`,
    title: kp.title,
    questions: kp.questions.map((q) => ({ difficulty: q.level, question: q.q, correct: q.options[q.answer], options: q.options })),
  })), [quiz]);

  const empty = () => sections.map(() => false);
  const [view, setView] = useState('menu');
  const [readState, setReadState] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (Array.isArray(saved) && saved.length === sections.length) return saved;
    } catch { /* guna lalai */ }
    return empty();
  });

  const save = (next) => {
    setReadState(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* storan tidak tersedia */ }
  };

  const completedCount = readState.filter(Boolean).length;
  const progressPercent = Math.round((completedCount / sections.length) * 100);
  const quizUnlocked = readState[sections.length - 1] === true;
  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const backToMenu = () => { setView('menu'); goTop(); };

  const openSection = (id) => {
    if (id === 'quiz') { if (!quizUnlocked) return; setView('quiz'); goTop(); return; }
    const idx = sections.findIndex((s) => s.id === id);
    if (idx < 0 || (idx > 0 && !readState[idx - 1])) return;
    setView(id); goTop();
  };

  const markReadingComplete = (id) => {
    const idx = sections.findIndex((s) => s.id === id);
    if (idx < 0) return;
    const next = [...readState];
    next[idx] = true;
    save(next);
    const nextSection = sections[idx + 1];
    setView(nextSection ? nextSection.id : 'menu');
    goTop();
  };

  const toggleRead = (id) => {
    const idx = sections.findIndex((s) => s.id === id);
    if (idx < 0) return;
    const next = [...readState];
    next[idx] = !next[idx];
    save(next);
  };

  const goToSection = (id) => { setView(id); goTop(); };

  const footer = <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">{code} {name} - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>;

  if (view !== 'menu') {
    const idx = sections.findIndex((s) => s.id === view);
    const meta = idx >= 0 ? sections[idx] : { title: 'Kuiz Penilaian', desc: `${quizSets.length} KP, setiap KP 20 soalan. Lulus minimum 12/20 untuk naik ke KP seterusnya.`, icon: Award, accent: palette[0] };
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <AnimStyles />
        <div className="bg-slate-950 text-white">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <HeroIcon size={30} className={theme.label} aria-hidden="true" />
              <div>
                <div className={`text-[10px] uppercase tracking-[.2em] ${theme.label} font-black`}>{name}</div>
                <div className="text-sm font-black">{completedCount}/{sections.length} bahagian</div>
              </div>
            </div>
            <div className="flex-1 max-w-md">
              <div className={`flex items-center justify-between text-[10px] font-black tracking-[.18em] ${theme.labelSoft} uppercase`}><span>Progress</span><span>{progressPercent}%</span></div>
              <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden"><div className={`h-full rounded-full ${theme.barHead} transition-all`} style={{ width: `${progressPercent}%` }} /></div>
            </div>
          </div>
        </div>
        <PageHeader title={meta.title} subtitle={meta.desc} icon={meta.icon} onBack={backToMenu} accent={meta.accent} />
        {idx >= 0 ? <NoteBody key={view} note={notes[idx]} theme={theme} /> : <Quiz sets={quizSets} theme={theme} />}
        {idx >= 0 && quiz[idx] && <SemakKefahaman key={view} questions={quiz[idx].questions} />}
        {idx >= 0 && (() => {
          const isRead = readState[idx] === true;
          const prev = sections[idx - 1];
          const nextSec = sections[idx + 1];
          const canNext = isRead && (nextSec || quizUnlocked);
          const nextLabel = nextSec ? 'Seterusnya' : 'Ke Kuiz';
          const goNext = () => { if (nextSec) goToSection(nextSec.id); else if (quizUnlocked) { setView('quiz'); goTop(); } };
          return (
            <div className="max-w-6xl mx-auto px-4 pb-8">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  {isRead ? (
                    <>
                      <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2.5 min-h-11 rounded-xl font-black text-sm"><CheckCircle size={17} aria-hidden="true" /> Sudah Dibaca</span>
                      <button onClick={() => toggleRead(view)} className="text-xs font-bold text-slate-500 hover:text-slate-800 underline underline-offset-4 min-h-11 px-2">Batal tanda baca</button>
                    </>
                  ) : (
                    <button onClick={() => markReadingComplete(view)} className="w-full sm:w-auto bg-emerald-600 text-white px-6 py-3 min-h-11 rounded-xl font-black hover:bg-emerald-700 transition-colors">
                      <span className="inline-flex items-center gap-2"><CheckCircle size={17} aria-hidden="true" /> Selesai Baca</span>
                    </button>
                  )}
                  <span className="text-xs font-bold text-slate-400 sm:ml-auto">Bahagian {idx + 1} / {sections.length}</span>
                </div>
                <div className="flex items-stretch justify-between gap-3">
                  <button onClick={() => (prev ? goToSection(prev.id) : backToMenu())} className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-5 py-3 min-h-11 rounded-xl font-black text-sm transition-colors">
                    <ArrowLeft size={17} aria-hidden="true" /> {prev ? 'Sebelumnya' : 'Senarai Bahagian'}
                  </button>
                  <button onClick={goNext} disabled={!canNext} className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-700 text-white px-5 py-3 min-h-11 rounded-xl font-black text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    {nextLabel} <ArrowRight size={17} aria-hidden="true" />
                  </button>
                </div>
                {!isRead && <p className="text-xs text-slate-500 -mt-1">Tekan "Selesai Baca" untuk membuka bahagian seterusnya.</p>}
              </div>
            </div>
          );
        })()}
        {footer}
      </div>
    );
  }

  return (
    <div className="course-menu-page min-h-screen bg-slate-50 text-slate-900">
      <AnimStyles />
      <ModuleMenu title={`Modul ${code}: ${name}`} icon={HeroIcon} secondaryIcon={sections[1].icon}
        onBack={onBackToPortal} topics={sections} read={readState} onTopic={section => openSection(section.id)} onReset={() => save(empty())}
        description={<>{tagline} Dipecahkan kepada {sections.length} bahagian, lengkap dengan kuiz {quizSets.length * 20} soalan.</>}>
        <ModuleAction icon={Award} title="Kuiz Penilaian"
          description={`${quizSets.length * 20} soalan (${quizSets.length} KP × 20 soalan). Selesaikan semua nota untuk membuka kuiz.`}
          accent="green" locked={!quizUnlocked} onClick={() => openSection('quiz')} />
      </ModuleMenu>
      {footer}
    </div>
  );
}
