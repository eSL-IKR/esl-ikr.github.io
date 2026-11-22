import ModuleMenu, { ModuleActivities } from './ModuleMenu';
import { useMemo, useState } from 'react';
import { ikr3082QuizSets } from './IKR3082QuizData.js';
import {
  Archive,
  ArrowLeft,
  Award,
  Cable,
  Check,
  CheckCircle,
  ChevronRight,
  CircleDot,
  ClipboardCheck,
  ClipboardList,
  Cloud,
  Database,
  FileSearch,
  FileText,
  FolderOpen,
  GitBranch,
  Globe,
  History,
  Home,
  ListChecks,
  Lock,
  Map,
  Network,
  RotateCcw,
  ScanSearch,
  Server,
  ShieldAlert,
  Sparkles,
  UserCheck,
  XCircle,
} from 'lucide-react';

const sections = [
  { id: 'intro', title: 'Pengenalan Network Documentation', desc: 'Maksud, tujuan dan kepentingan rekod konfigurasi rangkaian.', icon: FileText, accent: 'blue' },
  { id: 'hardware', title: 'Perkakasan & Senarai Semak Pemasangan', desc: 'Jenis perkakasan, fungsi, jenama dan senarai semak pemasangan fizikal.', icon: Server, accent: 'indigo' },
  { id: 'configChecklist', title: 'Senarai Semak Konfigurasi', desc: 'Pra-konfigurasi, konfigurasi perkakasan, logik, keselamatan dan pengujian.', icon: ClipboardCheck, accent: 'emerald' },
  { id: 'diagram', title: 'Rajah Rangkaian & Topologi', desc: 'Rajah fizikal, logik, topologi dan berasaskan awan, serta simbol piawaian.', icon: Network, accent: 'violet' },
  { id: 'diagramChecklist', title: 'Senarai Semak Rajah Rangkaian', desc: 'Kriteria semakan peranti, sambungan, label, simbol dan kejelasan visual.', icon: ScanSearch, accent: 'teal' },
  { id: 'record', title: 'Prosedur Rekod Konfigurasi', desc: 'Definisi, kepentingan dan situasi memerlukan rekod konfigurasi.', icon: History, accent: 'amber' },
  { id: 'components', title: 'Komponen Rekod & Contoh Dokumentasi', desc: 'Maklumat IP, topologi, konfigurasi peranti dan prosedur pendokumentasian.', icon: Database, accent: 'orange' },
  { id: 'audit', title: 'Audit, Perubahan & Alat Bantu', desc: 'Proses audit, pengurusan perubahan dan alat seperti Cisco Prime & NetBox.', icon: ShieldAlert, accent: 'rose' },
];

const featureCards = [
  { id: 'quiz', target: 'quiz', title: 'Kuiz Penilaian', desc: '120 soalan (4 KP x 30 soalan). Buka setelah menyelesaikan semua 8 Nota.', icon: Award, accent: 'rose' },
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

/* Animasi CSS - KHUSUS modul Network Documentation (dokumen tersusun, checklist) */
function DocAnimStyles() {
  return (
    <style>{`
      @keyframes docFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes docScaleIn { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: scale(1); } }
      @keyframes docCheckPop { 0% { transform: scale(0); } 70% { transform: scale(1.25); } 100% { transform: scale(1); } }
      @keyframes docStack { from { opacity: 0; transform: translateY(10px) rotate(-1deg); } to { opacity: 1; transform: translateY(0) rotate(0deg); } }
      .doc-entry-title { animation: docFadeUp .5s ease-out both; }
      .doc-entry-icon { animation: docScaleIn .45s ease-out both; }
      .doc-entry-subtitle { animation: docFadeUp .5s ease-out .1s both; }
      .doc-reveal { animation: docFadeUp .5s ease-out both; }
      .doc-reveal-1{animation-delay:.05s}.doc-reveal-2{animation-delay:.1s}.doc-reveal-3{animation-delay:.15s}
      .doc-reveal-4{animation-delay:.2s}.doc-reveal-5{animation-delay:.25s}.doc-reveal-6{animation-delay:.3s}
      .doc-stack { animation: docStack .4s ease-out both; }
      .doc-check-pop { animation: docCheckPop .3s ease-out both; }
      .doc-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
      .doc-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(16,185,129,.25); border-color: #6ee7b7; }
      .doc-card:hover .doc-card-icon { animation: docScaleIn .3s ease-out; }
      @media (prefers-reduced-motion: reduce) {
        .doc-entry-title, .doc-entry-icon, .doc-entry-subtitle, .doc-reveal, .doc-stack, .doc-check-pop, .doc-card {
          animation: none !important; transition: none !important;
        }
        .doc-card:hover { transform: none; }
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
          <div className={`p-3 rounded-2xl border border-white/15 ${style.icon} doc-entry-icon`}><Icon size={28} className="text-white" /></div>
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight doc-entry-title">{title}</h1>
            <p className="text-slate-300 mt-2 max-w-3xl text-sm md:text-base doc-entry-subtitle">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, children, icon: Icon = CircleDot }) {
  return (
    <article className="doc-card doc-reveal bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
      <h3 className="font-black text-slate-900 text-lg flex items-center gap-2 mb-3"><Icon size={20} className="doc-card-icon text-emerald-600" /> {title}</h3>
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
        <thead><tr className="bg-emerald-50 text-emerald-900">{headers.map((h) => <th key={h} className="text-left font-black p-3 md:p-4">{h}</th>)}</tr></thead>
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

/* Checklist interaktif dengan progress bar animasi */
function InteractiveChecklist({ title, items }) {
  const [checked, setChecked] = useState(() => new Array(items.length).fill(false));
  const doneCount = checked.filter(Boolean).length;
  const pct = Math.round((doneCount / items.length) * 100);
  const status = pct === 100 ? { label: 'COMPLETE', tone: 'text-emerald-700 bg-emerald-100' } : pct >= 50 ? { label: 'REVIEW', tone: 'text-amber-700 bg-amber-100' } : { label: 'INCOMPLETE', tone: 'text-rose-700 bg-rose-100' };

  const toggle = (i) => setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h4 className="font-black text-slate-900 flex items-center gap-2"><ClipboardCheck size={19} className="text-emerald-600" /> {title}</h4>
        <span className={`rounded-full px-3 py-1 text-[10px] font-black ${status.tone}`}>{status.label}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2.5 mb-4 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs text-slate-400 mb-3">{doneCount}/{items.length} disemak ({pct}%) - visual latihan sahaja, bukan piawaian rasmi.</p>
      <div className="space-y-2">
        {items.map((item, i) => (
          <button key={item} onClick={() => toggle(i)} className={`w-full flex items-center gap-3 text-left text-sm rounded-xl border px-3 py-2.5 transition-colors ${checked[i] ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
            <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${checked[i] ? 'border-emerald-500 bg-emerald-500 doc-check-pop' : 'border-slate-300'}`}>
              {checked[i] && <Check size={13} className="text-white" />}
            </span>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}


function FlowRow({ steps }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <span className="rounded-xl bg-white border border-emerald-200 text-emerald-900 text-xs md:text-sm font-black px-3 py-2">{step}</span>
          {i < steps.length - 1 && <ChevronRight size={16} className="text-emerald-400 shrink-0" />}
        </div>
      ))}
    </div>
  );
}

/* ---------------- NOTA 1: PENGENALAN ---------------- */
function IntroNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Apakah Dokumentasi Rangkaian?" icon={FileText}>
        <p>Rekod konfigurasi rangkaian komputer merujuk kepada dokumen atau rekod terperinci yang menyimpan semua konfigurasi teknikal yang telah dilakukan ke atas peranti dan sistem rangkaian, termasuk <b>alamat IP, tetapan DNS, laluan trafik (routing)</b>, dan perincian perisian serta perkakasan yang digunakan.</p>
        <p className="mt-3">Dokumentasi yang kemas dan sistematik membolehkan pentadbir rangkaian melakukan pemantauan, analisis, dan pembaikan dengan lebih mudah, di samping membantu dalam pematuhan polisi keselamatan dan perancangan masa depan sistem rangkaian organisasi.</p>
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-8 shadow-sm">
        <h4 className="font-black text-slate-900 mb-6">Apa yang Perlu Didokumenkan?</h4>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { icon: Network, label: 'Design' }, { icon: Map, label: 'Topology' }, { icon: ClipboardList, label: 'Configuration' },
            { icon: Globe, label: 'IP' }, { icon: Cable, label: 'Connection' }, { icon: Archive, label: 'Inventory' }, { icon: FileText, label: 'Dokumentasi' },
          ].map((item, i, arr) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className={`doc-stack flex flex-col items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-4 w-24`} style={{ animationDelay: `${i * 0.08}s` }}>
                <item.icon size={22} className="text-emerald-700" />
                <span className="text-[10px] font-black text-emerald-800 text-center">{item.label}</span>
              </div>
              {i < arr.length - 1 && <ChevronRight size={16} className="text-slate-300 shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      <InfoCard title="Kepentingan Dokumentasi untuk Pengurusan Rangkaian" icon={ListChecks}>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { t: 'Penyelenggaraan (Maintenance)', d: 'Memudahkan kerja penyelenggaraan berkala kerana pentadbir tahu struktur & tetapan sedia ada.' },
            { t: 'Troubleshooting', d: 'Membantu mengesan punca masalah dengan pantas tanpa perlu meneka konfigurasi peranti.' },
            { t: 'Audit', d: 'Membuktikan pematuhan kepada polisi keselamatan organisasi (cth. ISO 27001).' },
            { t: 'Naik Taraf (Upgrade)', d: 'Membolehkan perancangan pengembangan rangkaian dilakukan secara terancang.' },
          ].map((item) => (
            <div key={item.t} className="rounded-xl bg-slate-50 border border-slate-200 p-3">
              <p className="text-sm font-black text-slate-900">{item.t}</p>
              <p className="text-xs text-slate-600 mt-1">{item.d}</p>
            </div>
          ))}
        </div>
      </InfoCard>

      <NotaPenting>
        Tanpa dokumentasi yang sistematik, organisasi terdedah kepada risiko: kesilapan pemasangan berulang, kehilangan maklumat penting (nombor siri, waranti), pengurusan penyelenggaraan terjejas, dan ancaman keselamatan yang sukar dikesan.
      </NotaPenting>

      <Ringkasan>
        Dokumentasi rangkaian merangkumi rekod konfigurasi (IP, DNS, routing), reka bentuk/topologi, dan senarai peranti. Ia penting untuk penyelenggaraan, troubleshooting, audit, dan naik taraf sistem rangkaian organisasi secara profesional dan sistematik.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 2: PERKAKASAN & SENARAI SEMAK PEMASANGAN ---------------- */
function HardwareNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Perkakasan Rangkaian Komputer" icon={Server}>
        <p>Perkakasan rangkaian merujuk kepada peranti-peranti fizikal yang diperlukan untuk membolehkan komunikasi antara komputer, peranti pintar, server, pencetak, dan peralatan lain dalam sesuatu rangkaian.</p>
        <div className="grid sm:grid-cols-3 gap-3 mt-4 text-sm">
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3"><b className="text-emerald-800">a) Menghubungkan</b><p className="mt-1 text-emerald-900">Switch & AP membenarkan pelbagai perkakasan berhubung dalam satu LAN.</p></div>
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3"><b className="text-emerald-800">b) Memindahkan Data</b><p className="mt-1 text-emerald-900">Router & switch pastikan data dihantar cekap, elak pertembungan data.</p></div>
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3"><b className="text-emerald-800">c) Kawal Keselamatan</b><p className="mt-1 text-emerald-900">Firewall memantau & menapis trafik data, halang akses tidak sah.</p></div>
        </div>
      </InfoCard>

      <NotesTable
        headers={['Jenis Perkakasan', 'Fungsi Utama', 'Jenama / Model (contoh sumber)']}
        rows={[
          ['Switch', 'Menyambungkan pelbagai perkakasan dalam LAN; mengurus penghantaran data', 'Cisco Catalyst 2960, TP-Link TL-SG1016'],
          ['Router', 'Menyambungkan dua atau lebih rangkaian; memilih laluan data terbaik', 'MikroTik RouterBOARD, Cisco ISR'],
          ['Firewall', 'Melindungi rangkaian dengan menapis trafik masuk & keluar', 'Fortinet FortiGate, Cisco ASA'],
          ['Wireless Access Point (AP)', 'Membolehkan sambungan tanpa wayar ke rangkaian berwayar', 'Ubiquiti UniFi AP, Aruba Instant On'],
          ['Modem', 'Menukar isyarat digital komputer kepada isyarat untuk kabel/talian telefon', 'DSL Modem, Cable Modem'],
          ['Network Interface Card (NIC)', 'Membolehkan komputer berkomunikasi melalui rangkaian', 'Intel Ethernet NIC, Realtek PCIe NIC'],
        ]}
      />
      <p className="text-xs text-slate-500 -mt-3">Jadual 1: Fungsi utama & contoh jenama setiap perkakasan rangkaian (sumber IKR3082/KP1)</p>

      <InfoCard title="Kepentingan Senarai Semak Pemasangan" icon={ClipboardCheck}>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { t: 'Memastikan Ketepatan', d: 'Elak kesilapan seperti sambungan port salah atau firmware tidak serasi.' },
            { t: 'Dokumentasi & Rekod', d: 'Simpan nombor siri, tarikh pemasangan, status ujian & tempoh waranti.' },
            { t: 'Sokong Penyelenggaraan', d: 'Beri gambaran jelas komponen dipasang & konfigurasi asal untuk pembaikan pantas.' },
            { t: 'Pemantauan Keselamatan', d: 'Kesan awal sebarang perubahan/penambahan perkakasan tanpa kebenaran.' },
          ].map((item) => (
            <div key={item.t} className="rounded-xl bg-slate-50 border border-slate-200 p-3">
              <p className="text-sm font-black text-slate-900">{item.t}</p>
              <p className="text-xs text-slate-600 mt-1">{item.d}</p>
            </div>
          ))}
        </div>
      </InfoCard>

      <InteractiveChecklist
        title="Contoh Senarai Semak Komponen Perkakasan Pemasangan"
        items={['Router - berfungsi (sambungan Internet)', 'Switch (Unmanaged/Managed) - berfungsi', 'Access Point (AP) - berfungsi (sambungan Wi-Fi)', 'Modem - berfungsi (jika sambungan DSL diperlukan)']}
      />

      <InteractiveChecklist
        title="Senarai Semak Lokasi & Tapak Pemasangan"
        items={['Semak lokasi pemasangan peralatan rangkaian', 'Pastikan bilik rangkaian ada sistem penyejuk baik', 'Pastikan soket kuasa mencukupi & mudah diakses', 'Periksa ruang rak (rack) untuk peralatan', 'Sediakan rak kabel untuk pengurusan kemas', 'Pastikan ada sokongan UPS jika kegagalan kuasa']}
      />

      <NotaPenting>
        Tanpa senarai semak pemasangan, risiko utama termasuk: kesilapan pemasangan (port/firmware salah), kehilangan maklumat waranti, pengurusan penyelenggaraan terjejas, dan ancaman keselamatan (pemasangan tidak sah tidak dikesan).
      </NotaPenting>

      <Ringkasan>
        Perkakasan rangkaian (Router, Switch, Firewall, AP, Modem, NIC) masing-masing berfungsi khusus untuk menghubungkan, memindahkan data, dan melindungi rangkaian. Senarai semak pemasangan memastikan setiap komponen dipasang, diuji dan didokumenkan dengan betul sebelum digunakan.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 3: SENARAI SEMAK KONFIGURASI ---------------- */
function ConfigChecklistNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Senarai Semak Konfigurasi Rangkaian Komputer" icon={ClipboardCheck}>
        <p>Senarai semak konfigurasi rangkaian komputer adalah alat penting dalam proses penyediaan dan penyelenggaraan rangkaian komputer. Ia menyediakan langkah-langkah terperinci atau item yang perlu diperiksa, disediakan, atau disahkan semasa menyediakan atau menyelenggara sistem rangkaian komputer.</p>
      </InfoCard>

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { t: 'Elak Langkah Terlepas', d: 'Setiap langkah (IP, subnet, gateway, DNS, firewall) ditandakan telah disemak.' },
          { t: 'Ketepatan & Kecekapan', d: 'Bantu pengguna kerja lebih fokus & tersusun, elak kesilapan berulang.' },
          { t: 'Bantu Troubleshooting', d: 'Semak semula senarai untuk kesan bahagian mana yang terlepas pandang.' },
          { t: 'Standardisasi', d: 'Semua peranti dikonfigurasi ikut piawaian sama (penamaan, IP, keselamatan).' },
        ].map((item) => (
          <div key={item.t} className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
            <p className="text-sm font-black text-emerald-900">{item.t}</p>
            <p className="text-xs text-emerald-800 mt-1">{item.d}</p>
          </div>
        ))}
      </div>

      <InteractiveChecklist
        title="a) Pra-konfigurasi"
        items={['Objektif & skop rangkaian ditentukan', 'Reka bentuk topologi dipilih (Star/Mesh/Hybrid)', 'Jenis alamat IP ditentukan (statik/dinamik)', 'Perancangan IP & subnetting disediakan', 'Senarai peranti dikenal pasti', 'Perisian diperlukan disenaraikan (DHCP/DNS/firewall)', 'Keperluan keselamatan dikenal pasti', 'Dokumentasi & label awal disediakan']}
      />

      <InteractiveChecklist
        title="b) Konfigurasi Perkakasan"
        items={['Router dipasang di lokasi sesuai + kuasa disediakan', 'Switch dipasang dalam rak, sumber kuasa stabil', 'Access Point dipasang untuk liputan optimum', 'Semua kabel Ethernet disambung dengan betul', 'Kuasa & LED indikator disemak', 'Ujian fizikal kabel dijalankan', 'Label & dokumentasi port disemak']}
      />

      <InteractiveChecklist
        title="c) Konfigurasi Logik"
        items={['Alamat IP setiap peranti ditetapkan', 'Subnet mask ditetapkan', 'Default gateway ditentukan', 'DNS server ditetapkan', 'DHCP diaktifkan (jika digunakan)', 'VLAN dikonfigurasikan (jika perlu)', 'Firewall rules ditentukan', 'NAT diaktifkan', 'Sambungan rangkaian diuji (ping/traceroute)']}
      />

      <InteractiveChecklist
        title="d) Keselamatan & Kawalan Akses"
        items={['Kata laluan kukuh ditetapkan untuk setiap peranti', 'Firewall diaktifkan pada peranti', 'Enkripsi data diaktifkan (WPA2/WPA3, SSL/TLS)', 'Port yang tidak digunakan disekat', 'VPN dikonfigurasikan (jika perlu)', 'Akses fizikal dikawal (bilik server dikunci)']}
      />

      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 md:p-6">
        <h4 className="font-black text-rose-800 flex items-center gap-2 mb-3"><XCircle size={19} /> Kesan Jika Konfigurasi Tanpa Senarai Semak</h4>
        <ul className="space-y-2 text-sm text-rose-900">
          <li className="flex items-start gap-2"><ChevronRight size={15} className="mt-0.5 shrink-0" /> Komputer gagal sambung rangkaian akibat tetapan IP salah / tiada gateway</li>
          <li className="flex items-start gap-2"><ChevronRight size={15} className="mt-0.5 shrink-0" /> Firewall tidak diaktifkan - sistem mudah diserang virus/penggodam</li>
          <li className="flex items-start gap-2"><ChevronRight size={15} className="mt-0.5 shrink-0" /> Server DHCP tidak dikonfigurasi - peranti lain tak dapat IP automatik</li>
          <li className="flex items-start gap-2"><ChevronRight size={15} className="mt-0.5 shrink-0" /> Kabel tersambung pada port salah/tidak diuji - sambungan fizikal gagal</li>
          <li className="flex items-start gap-2"><ChevronRight size={15} className="mt-0.5 shrink-0" /> Ujian ping/test connection terlepas - masalah dikesan lewat</li>
        </ul>
      </div>

      <Ringkasan>
        Senarai semak konfigurasi merangkumi 4 fasa: <b>Pra-konfigurasi &rarr; Konfigurasi Perkakasan &rarr; Konfigurasi Logik &rarr; Keselamatan &amp; Ujian</b>. Setiap fasa memastikan tiada langkah kritikal (IP, DHCP, firewall, ujian sambungan) tertinggal.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 4: RAJAH RANGKAIAN & TOPOLOGI ---------------- */
function DiagramNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Apakah Rajah Rangkaian Komputer?" icon={Network}>
        <p>Rajah rangkaian komputer ialah representasi visual bagi struktur dan hubungan antara pelbagai komponen dalam sistem rangkaian seperti komputer, peranti rangkaian (router, switch), server, pencetak dan sambungan komunikasi.</p>
      </InfoCard>

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { icon: Map, t: 'Rajah Fizikal', d: 'Menunjukkan lokasi sebenar peranti (bilik server, pejabat, makmal) - susun atur ruang fizikal.' },
          { icon: GitBranch, t: 'Rajah Logik', d: 'Fokus struktur logik - komunikasi melalui protokol, IP, subnet, VLAN, firewall.' },
          { icon: Network, t: 'Rajah Topologi', d: 'Menggambarkan bentuk susun atur asas: Star, Bus, Ring, atau Mesh.' },
          { icon: Cloud, t: 'Rajah Berasaskan Awan', d: 'Digunakan bila rangkaian melibatkan Azure/AWS/Google Cloud - sistem hibrid.' },
        ].map((item) => (
          <div key={item.t} className="doc-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="doc-card-icon w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center text-violet-700 mb-3"><item.icon size={20} /></div>
            <p className="font-black text-slate-900">{item.t}</p>
            <p className="text-sm text-slate-600 mt-2">{item.d}</p>
          </div>
        ))}
      </div>

      <InfoCard title="4 Jenis Topologi Rangkaian" icon={Network}>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Bintang (Star)</b> - semua peranti disambung ke satu pusat (switch/hub).</div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Bas (Bus)</b> - semua peranti berkongsi satu kabel utama.</div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Cincin (Ring)</b> - peranti disambung membentuk bulatan, data bergerak satu arah.</div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Mesh</b> - setiap peranti disambung ke semua peranti lain, kestabilan tinggi.</div>
        </div>
      </InfoCard>

      <NotesTable
        headers={['Komponen', 'Fungsi Utama']}
        rows={[
          ['Router', 'Mengarahkan trafik antara rangkaian; menyambung LAN ke WAN/Internet'],
          ['Switch', 'Menghubungkan peranti dalam LAN secara terpusat'],
          ['Firewall', 'Melindungi rangkaian dengan menyekat capaian tidak sah'],
          ['Server', 'Menyediakan perkhidmatan seperti fail, web dan aplikasi'],
          ['PC / Workstation', 'Digunakan oleh pengguna akhir'],
          ['Printer', 'Peranti untuk mencetak; dikongsi antara pengguna'],
          ['Access Point', 'Menyediakan sambungan tanpa wayar kepada rangkaian'],
          ['Kabel / Sambungan', 'Menyambungkan peranti secara fizikal'],
          ['IP Address / Label', 'Menandakan identiti logik bagi setiap peranti'],
          ['Cloud', 'Melambangkan rangkaian luar seperti Internet atau perkhidmatan awan'],
        ]}
      />
      <p className="text-xs text-slate-500 -mt-3">Jadual 2: Komponen penting dalam rajah rangkaian komputer & simbol piawaian (Cisco/IEEE)</p>

      <InfoCard title="Amalan Terbaik Melukis Rajah Rangkaian" icon={Sparkles}>
        <ul className="space-y-1.5 list-disc pl-5">
          <li>Guna simbol &amp; notasi standard (Cisco, IEEE) secara konsisten.</li>
          <li>Susun peranti ikut lapisan OSI: pengguna &rarr; access switch &rarr; distribution switch &rarr; core switch.</li>
          <li>Label setiap komponen dengan nama, IP address, jenis sambungan/VLAN.</li>
          <li>Guna warna dengan tujuan (cth. biru=LAN, hijau=WAN, merah=sambungan kritikal).</li>
          <li>Sertakan legenda dan tajuk rajah + tarikh kemaskini.</li>
          <li>Guna perisian sesuai: Microsoft Visio, Lucidchart, Draw.io atau GNS3.</li>
          <li>Kemas kini rajah secara berkala apabila infrastruktur berubah.</li>
        </ul>
      </InfoCard>

      <Ringkasan>
        4 jenis rajah utama: <b>Fizikal</b> (lokasi sebenar), <b>Logik</b> (aliran data/IP/VLAN), <b>Topologi</b> (Star/Bus/Ring/Mesh), dan <b>Berasaskan Awan</b> (sistem hibrid). Simbol piawaian (Cisco/IEEE) memastikan rajah konsisten dan mudah difahami semua pihak.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 5: SENARAI SEMAK RAJAH RANGKAIAN ---------------- */
function DiagramChecklistNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Kepentingan Senarai Semak Rajah Rangkaian" icon={ScanSearch}>
        <p>Senarai semak rajah rangkaian komputer ialah satu dokumen atau panduan berbentuk senarai yang digunakan untuk menyemak kelengkapan, ketepatan, dan pematuhan sesuatu gambarajah rangkaian komputer terhadap piawaian teknikal dan keperluan organisasi.</p>
        <div className="grid sm:grid-cols-2 gap-3 mt-4 text-sm">
          <div className="rounded-xl bg-teal-50 border border-teal-200 p-3"><b className="text-teal-800">Konsistensi</b><p className="mt-1 text-teal-900">Rajah dihasilkan ikut format, susun atur & simbol yang sama.</p></div>
          <div className="rounded-xl bg-teal-50 border border-teal-200 p-3"><b className="text-teal-800">Ketepatan</b><p className="mt-1 text-teal-900">Setiap sambungan, peranti & konfigurasi ditunjukkan tepat.</p></div>
          <div className="rounded-xl bg-teal-50 border border-teal-200 p-3"><b className="text-teal-800">Memudahkan Komunikasi</b><p className="mt-1 text-teal-900">Pihak bukan teknikal turut mudah faham struktur rangkaian.</p></div>
          <div className="rounded-xl bg-teal-50 border border-teal-200 p-3"><b className="text-teal-800">Dokumentasi Sah</b><p className="mt-1 text-teal-900">Boleh digunakan sebagai rujukan teknikal rasmi & audit.</p></div>
        </div>
      </InfoCard>

      <InteractiveChecklist
        title="Senarai Semak Rajah Rangkaian Komputer (Jadual 3, sumber)"
        items={[
          'Semua peranti (router, switch, server, PC, firewall, AP) ditunjukkan',
          'Kedudukan peranti disusun secara logik ikut topologi sebenar',
          'Semua sambungan antara peranti dilukis dengan jelas',
          'Jenis sambungan (straight/cross/fiber/wireless) dinyatakan',
          'Sambungan LAN, WAN atau WiFi dikenal pasti',
          'Semua peranti mempunyai label nama yang konsisten',
          'Alamat IP/logik ditunjukkan pada peranti yang memerlukan',
          'Simbol mengikut piawaian industri (Cisco/IEEE) digunakan',
          'Rajah kemas, mudah dibaca dan tidak berserabut',
          'Susun atur fizikal & lokasi bilik/server room ditunjukkan (jika rajah fizikal)',
          'Tajuk rajah, nama projek, tarikh & nama penyedia ditunjukkan',
          'Legenda/penjelasan simbol disediakan',
          'Peranti keselamatan (firewall, IDS/IPS) & zon (DMZ) ditandakan',
          'Rajah disimpan dalam format digital selamat (PDF/Visio)',
        ]}
      />

      <InfoCard title="Contoh Senario Melukis Rajah" icon={FileSearch}>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Senario 1: LAN Sederhana</b><p className="mt-1 text-slate-600">1 Router + 2 Switch (8-port) + 3 PC + 1 Server</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Senario 2: Rangkaian Wireless</b><p className="mt-1 text-slate-600">1 Router + 1 AP + 1 PC + 1 Laptop + 1 Tablet (garis putus-putus = wireless)</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Senario 3: Rangkaian Pejabat</b><p className="mt-1 text-slate-600">1 Router + 1 AP + 8 PC + 2 Laptop + 2 Switch + 1 Server + Cloud</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Senario 4: Rangkaian DMZ</b><p className="mt-1 text-slate-600">Zon Demilitarized Zone untuk pengasingan keselamatan</p></div>
        </div>
      </InfoCard>

      <Ringkasan>
        Senarai semak rajah rangkaian merangkumi 8 aspek utama: peranti, sambungan, label, alamat IP, simbol standard, kejelasan visual, skala/orientasi, dan maklumat tambahan (tajuk, legenda, versi). Ia jadi alat kawalan kualiti terakhir sebelum rajah digunakan secara rasmi.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 6: PROSEDUR REKOD KONFIGURASI ---------------- */
function RecordNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Apakah Rekod Konfigurasi Rangkaian?" icon={History}>
        <p>Dokumen rekod konfigurasi rangkaian adalah dokumen dalaman yang menerangkan keseluruhan struktur rangkaian komputer (LAN, WAN, pelayan, port rangkaian) sesebuah organisasi, serta merekod semua perubahan yang dibuat ke atas rangkaian.</p>
        <p className="mt-3">Pengurusan konfigurasi merangkumi proses dan alat untuk mengekalkan konsistensi rangkaian, menjejaki perubahan rangkaian, serta menyediakan dokumentasi rangkaian terkini.</p>
      </InfoCard>

      <div className="grid sm:grid-cols-2 gap-3">
        {[
          'Memudahkan Proses Troubleshooting - kenal pasti tetapan semasa dengan pantas',
          'Menyokong Penyelenggaraan Berkala - kemas kini firmware/kabel/peranti',
          'Konsistensi & Standardisasi - semua peranti ikut piawaian organisasi/vendor',
          'Asas Perancangan Kapasiti & Pengembangan - kenal pasti titik lemah',
          'Keperluan Audit & Pematuhan - bukti kawalan keselamatan (ISO 27001, NIST)',
          'Rujukan Semasa Pertukaran Kakitangan - elak kehilangan maklumat penting',
        ].map((item) => (
          <div key={item} className="flex items-start gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-900">
            <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" /> {item}
          </div>
        ))}
      </div>

      <InfoCard title="Situasi Rekod Konfigurasi Amat Diperlukan" icon={UserCheck}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <p className="font-black text-slate-900 text-sm">a) Semasa Migrasi Sistem</p>
            <p className="text-xs text-slate-600 mt-1">Tanpa rekod: risiko kehilangan fungsi/sambungan kritikal & sukar rollback ke sistem asal.</p>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <p className="font-black text-slate-900 text-sm">b) Penyelenggaraan &amp; Pembaikan</p>
            <p className="text-xs text-slate-600 mt-1">Panduan lengkap konfigurasi semula peranti pengganti; rujukan tetapan asal.</p>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <p className="font-black text-slate-900 text-sm">c) Audit Keselamatan</p>
            <p className="text-xs text-slate-600 mt-1">Buktikan pematuhan dasar (ISO/IEC 27001, CIS Controls, NIST).</p>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <p className="font-black text-slate-900 text-sm">d) Onboarding Staf Baharu</p>
            <p className="text-xs text-slate-600 mt-1">Staf baharu faham struktur rangkaian dengan cepat, latihan lebih fokus.</p>
          </div>
        </div>
      </InfoCard>

      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 md:p-6">
        <h4 className="font-black text-rose-800 flex items-center gap-2 mb-3"><XCircle size={19} /> Kesan Jika Tiada Rekod Konfigurasi Lengkap</h4>
        <ul className="grid sm:grid-cols-2 gap-2 text-sm text-rose-900">
          <li>&bull; Proses pembaikan memakan masa (kenal pasti konfigurasi secara manual)</li>
          <li>&bull; Risiko kehilangan tetapan asal selepas kemas kini</li>
          <li>&bull; Kesukaran mengesan titik kegagalan dalam topologi</li>
          <li>&bull; Ketidakupayaan mematuhi keperluan audit/keselamatan</li>
          <li>&bull; Konflik konfigurasi antara peranti</li>
          <li>&bull; Rangkaian sukar dikembangkan secara sistematik</li>
        </ul>
      </div>

      <Ringkasan>
        Rekod konfigurasi rangkaian ialah dokumen dalaman kritikal yang diperlukan semasa <b>migrasi sistem, penyelenggaraan, audit keselamatan,</b> dan <b>onboarding staf baharu</b>. Ketiadaannya membawa risiko downtime, konflik konfigurasi dan kegagalan audit.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 7: KOMPONEN REKOD & CONTOH DOKUMENTASI ---------------- */
function ComponentsNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Komponen Rekod Konfigurasi Rangkaian" icon={Database}>
        <p>Dokumentasi konfigurasi rangkaian sepatutnya mengandungi maklumat: <b>(a)</b> Alamat IP &amp; Perincian Peranti, <b>(b)</b> Rajah Topologi Rangkaian, <b>(c)</b> Konfigurasi Peranti, dan <b>(d)</b> Parameter Rangkaian Lain (jenis sambungan Internet, julat DHCP, port endpoint).</p>
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-1">Contoh Jadual Rekod Konfigurasi Statik</h4>
        <p className="text-xs text-slate-500 mb-4">Nilai IP di bawah ialah <b>contoh pembelajaran</b> dari sumber - bukan nilai wajib/standard.</p>
        <NotesTable
          headers={['Peranti / Fungsi', 'Lokasi', 'IP / Konfigurasi Penting', 'Deskripsi / Catatan']}
          rows={[
            ['Cisco_R1', 'Bilik Server', '10.0.0.254 / Subnet 10.0.0.0/24', 'Sambungan ke WAN, OSPF Area 0'],
            ['Switch_S1', 'Pej. Utama', '(Guna DHCP untuk pengurusan)', '24-Port Gigabit, VLAN 10 (VoIP)'],
            ['Firewall_F1 (ASA5516)', 'Bilik Server', '10.0.0.253 / Subnet 10.0.0.0/24', 'Basic NAPT, VPN Site-to-Site'],
            ['AP1 (Aironet)', 'Ruang Mesyuarat', '10.0.1.10 / Subnet 10.0.1.0/24', 'SSID: CorpNetwork, WPA2 Enterprise'],
          ]}
        />
      </div>

      <InfoCard title="Prosedur Mendokumentasi Konfigurasi (a-g)" icon={ClipboardList}>
        <ol className="space-y-2.5 list-decimal pl-5 text-sm">
          <li><b>Kenal pasti peranti &amp; maklumat awal</b> - senaraikan semua peranti berserta lokasi & fungsi.</li>
          <li><b>Ambil konfigurasi semasa</b> - jalankan <code className="bg-slate-100 px-1 rounded">show running-config</code> / <code className="bg-slate-100 px-1 rounded">show startup-config</code> pada setiap peranti.</li>
          <li><b>Rangka topologi rangkaian</b> - lukis semula rajah berdasarkan sambungan sebenar, label port & VLAN.</li>
          <li><b>Bina dokumentasi terperinci</b> - masukkan maklumat ke format berstruktur (jadual), lampirkan konfigurasi teks penuh.</li>
          <li><b>Semakan &amp; pengesahan</b> - semak semula dengan pasukan teknikal (peer review/audit dalaman).</li>
          <li><b>Penyimpanan &amp; penyelenggaraan</b> - simpan dalam repositori pusat, tetapkan jadual semakan berkala.</li>
          <li><b>Pengurusan Perubahan (Change Management)</b> - jejaki setiap permintaan perubahan; hanya personel diberi kuasa boleh ubah.</li>
        </ol>
      </InfoCard>

      <Ringkasan>
        4 komponen wajib dalam rekod konfigurasi: <b>Alamat IP &amp; peranti, Rajah topologi, Konfigurasi peranti (running-config),</b> dan <b>parameter rangkaian lain</b>. Prosedur pendokumentasian bergerak dari kenal pasti peranti hinggalah pengurusan perubahan yang terkawal.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 8: AUDIT, PERUBAHAN & ALAT BANTU ---------------- */
function AuditNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Proses Audit Konfigurasi" icon={ShieldAlert}>
        <p>Audit konfigurasi adalah langkah kritikal untuk memastikan dokumentasi dan pelaksanaan konfigurasi mematuhi piawaian yang ditetapkan. Cisco mengesyorkan audit konfigurasi secara berkala (<b>sekurang-kurangnya setiap bulan</b>) untuk memastikan tiada perubahan tidak sah dan menilai kualiti dokumentasi.</p>
        <p className="mt-3">Sistem seperti Cisco Prime Infrastructure atau RANCID boleh diatur untuk menyimpan <b>3-5 versi konfigurasi terdahulu</b> bagi setiap peranti, memudahkan perbandingan sekiranya berlaku masalah.</p>
      </InfoCard>

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { t: 'a) Repositori Pusat Konfigurasi', d: 'Pangkalan data pusat menyimpan semua fail konfigurasi peranti; arkib automatik setiap perubahan.' },
          { t: 'b) Sahkan Standard &amp; Audit', d: 'Dasar & nama konvensyen konsisten; audit berkala kesan versi firmware tak sejajar.' },
          { t: 'c) Log Perubahan &amp; Kawalan Akses', d: 'Sistem seperti TACACS+ catat setiap aktiviti - siapa, bila, apa perubahan.' },
          { t: 'd) Latihan &amp; Semakan Dokumen', d: 'Audit berkala termasuk semakan dokumentasi; betulkan ketidaksesuaian.' },
        ].map((item) => (
          <div key={item.t} className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <p className="text-sm font-black text-slate-900" dangerouslySetInnerHTML={{ __html: item.t }} />
            <p className="text-xs text-slate-600 mt-1">{item.d}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4">Alat Bantu Dokumentasi Rangkaian</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Server, name: 'Cisco Prime Network Control System', d: 'Platform pengurusan rangkaian menyeluruh - penemuan peranti automatik, pengarkiban backup, laporan audit.' },
            { icon: Database, name: 'NetBox', d: 'Perisian sumber terbuka untuk IPAM (Pengurusan Alamat IP) dan DCIM (Infrastruktur Pusat Data).' },
            { icon: History, name: 'SolarWinds NCM', d: 'Sandaran konfigurasi automatik, pengauditan perubahan, semak kepatuhan polisi - pelbagai vendor.' },
            { icon: FolderOpen, name: 'Microsoft Visio / Draw.io', d: 'Alat lukisan topologi untuk hasilkan diagram rangkaian yang kemas & profesional.' },
          ].map((tool) => (
            <div key={tool.name} className="doc-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="doc-card-icon w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-orange-700 mb-3"><tool.icon size={20} /></div>
              <p className="font-black text-slate-900 text-sm">{tool.name}</p>
              <p className="text-xs text-slate-600 mt-2">{tool.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-4">Workflow Verification &amp; Dokumentasi Akhir</h4>
        <FlowRow steps={['Inspect', 'Checklist', 'Network Diagram', 'IP Verification', 'Testing', 'Troubleshooting', 'Record Result', 'Final Documentation']} />
      </div>

      <div className="grid sm:grid-cols-4 gap-3">
        {[
          { icon: FileText, label: 'Draft', tone: 'bg-slate-100 text-slate-700' },
          { icon: ScanSearch, label: 'Review', tone: 'bg-amber-100 text-amber-700' },
          { icon: CheckCircle, label: 'Verified', tone: 'bg-emerald-100 text-emerald-700' },
          { icon: Archive, label: 'Final', tone: 'bg-indigo-100 text-indigo-700' },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-4 text-center ${s.tone}`}>
            <s.icon size={20} className="mx-auto mb-2" />
            <p className="text-xs font-black">{s.label}</p>
          </div>
        ))}
      </div>

      <Ringkasan>
        Audit konfigurasi berkala (bulanan) + repositori pusat + log perubahan (TACACS+) memastikan integriti rangkaian terjaga. Alat seperti <b>Cisco Prime, NetBox, SolarWinds NCM</b> dan <b>Visio/Draw.io</b> mengautomasikan &amp; memperkemas keseluruhan proses dokumentasi rangkaian.
      </Ringkasan>
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
  const [activeQuestions, setActiveQuestions] = useState(() => shuffleQuestions(ikr3082QuizSets[0].questions));

  const currentSet = ikr3082QuizSets[kpIndex];
  const passScore = 18;

  const score = useMemo(() => activeQuestions.reduce((total, question, index) => total + (answers[index] === question.options.indexOf(question.correct) ? 1 : 0), 0), [answers, activeQuestions]);

  const retryLevel = () => {
    setAnswers({});
    setSubmitted(false);
    setActiveQuestions(shuffleQuestions(ikr3082QuizSets[kpIndex].questions));
  };

  const nextKp = () => {
    if (score >= passScore && kpIndex < ikr3082QuizSets.length - 1) {
      const nextIndex = kpIndex + 1;
      setHighestKp(previous => Math.max(previous, nextIndex));
      setKpIndex(nextIndex);
      setAnswers({});
      setSubmitted(false);
      setActiveQuestions(shuffleQuestions(ikr3082QuizSets[nextIndex].questions));
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
            <div className="text-xs font-black uppercase tracking-[.2em] text-emerald-700">Tahap Kuiz</div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{currentSet.code} - {currentSet.title}</h2>
            <p className="text-sm text-slate-600 mt-2">Setiap KP mengandungi 30 soalan. Lulus minimum ialah 18/30.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ikr3082QuizSets.map((item, index) => (
              <button key={item.id} disabled={index > highestKp || (index === kpIndex && submitted && score < passScore)} onClick={() => {
                if (index <= highestKp) {
                  setKpIndex(index);
                  setAnswers({});
                  setSubmitted(false);
                  setActiveQuestions(shuffleQuestions(ikr3082QuizSets[index].questions));
                }
              }} className={`rounded-full px-4 py-2 text-xs font-black border ${index === kpIndex ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-300 text-slate-700'} ${index > highestKp ? 'opacity-50 cursor-not-allowed' : ''}`}>{item.code}</button>
            ))}
          </div>
        </div>
      </div>

      {submitted && (
        <div className={`rounded-2xl p-6 mb-6 text-white ${score >= passScore ? 'bg-emerald-600' : 'bg-rose-600'}`}>
          <div className="flex items-center gap-3"><Award size={34} /><div><p className="text-sm font-bold opacity-90">Keputusan {currentSet.code}</p><h2 className="text-3xl font-black">{score} / {activeQuestions.length}</h2></div></div>
          <p className="mt-3 font-medium">
            {score >= passScore
              ? `Lulus ${currentSet.code}. Anda layak ${kpIndex < ikr3082QuizSets.length - 1 ? 'naik ke ' + ikr3082QuizSets[kpIndex + 1].code : 'menamatkan semua KP'}.`
              : `Belum lulus. Markah minimum ialah 18/30 - sila ulang ${currentSet.code} sebelum naik ke tahap seterusnya.`}
          </p>
        </div>
      )}

      <div className="space-y-5">
        {activeQuestions.map((question, index) => (
          <article key={`${currentSet.id}-${index}-${question.question}`} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-black text-slate-900"><span className="text-emerald-600 mr-2">{index + 1}.</span>{question.question}</h3>
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
                    className={`text-left p-3 rounded-xl border text-sm font-medium transition-all ${correct ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : wrong ? 'border-rose-500 bg-rose-50 text-rose-800' : selected ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-slate-200 hover:border-emerald-300'}`}
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
          <button disabled={Object.keys(answers).length !== activeQuestions.length} onClick={handleSubmit} className="flex-1 bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-black hover:bg-emerald-700 transition-colors">Hantar Jawapan {currentSet.code}</button>
        ) : (
          <>
            {score >= passScore && kpIndex < ikr3082QuizSets.length - 1 && (
              <button onClick={nextKp} className="flex-1 bg-emerald-600 text-white px-6 py-4 rounded-xl font-black hover:bg-emerald-700">Naik ke {ikr3082QuizSets[kpIndex + 1].code}</button>
            )}
            <button onClick={retryLevel} className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-xl font-black hover:bg-slate-800"><RotateCcw size={19} /> Cuba Semula {currentSet.code}</button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- KOMPONEN UTAMA ---------------- */
export default function IKR3082({ onBackToPortal }) {
  const [view, setView] = useState('menu');
  const [readState, setReadState] = useState(() => {
    const fallback = [false, false, false, false, false, false, false, false];
    try {
      const saved = JSON.parse(localStorage.getItem('ikr3082-read-state'));
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
    try { localStorage.setItem('ikr3082-read-state', JSON.stringify(fallback)); } catch { /* storan tidak tersedia */ }
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
    try { localStorage.setItem('ikr3082-read-state', JSON.stringify(nextReadState)); } catch { /* storan tidak tersedia */ }
    const nextInLine = sections[requested + 1];
    if (nextInLine) setView(nextInLine.id);
  };

  if (view !== 'menu') {
    const content = {
      intro: <IntroNotes />,
      hardware: <HardwareNotes />,
      configChecklist: <ConfigChecklistNotes />,
      diagram: <DiagramNotes />,
      diagramChecklist: <DiagramChecklistNotes />,
      record: <RecordNotes />,
      components: <ComponentsNotes />,
      audit: <AuditNotes />,
      quiz: <Quiz />,
    }[view];

    const showCompleteButton = sections.some((section) => section.id === view);
    const headerMeta = sections.find((section) => section.id === view) || featureCards.find((f) => f.id === view) || sections[0];

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <DocAnimStyles />
        <div className="bg-slate-950 text-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileText size={30} className="text-emerald-300" />
                <div>
                  <div className="text-[10px] uppercase tracking-[.2em] text-emerald-300 font-black">Network Documentation</div>
                  <div className="text-sm font-black">{completedCount}/{sections.length} bahagian</div>
                </div>
              </div>
              <div className="flex-1 max-w-md">
                <div className="flex items-center justify-between text-[10px] font-black tracking-[.18em] text-emerald-200 uppercase"><span>Progress</span><span>{progressPercent}%</span></div>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-teal-300 transition-all" style={{ width: `${progressPercent}%` }} /></div>
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
        <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">IKR3082 Network Documentation - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>
      </div>
    );
  }

  return (
    <div className="course-menu-page min-h-screen bg-slate-50 text-slate-900">
      <DocAnimStyles />
      <ModuleMenu title="Modul IKR3082: Network Documentation" icon={sections[0].icon} secondaryIcon={sections[1].icon}
        onBack={onBackToPortal} topics={sections} read={readState} onTopic={section => openSection(section.id)} onReset={resetProgress}
        description={<>Senarai semak pemasangan &amp; konfigurasi, rajah rangkaian &amp; topologi, prosedur rekod konfigurasi, serta audit dan alat bantu seperti Cisco Prime &amp; NetBox - dipecahkan kepada 8 bahagian, lengkap dengan kuiz 120 soalan.</>}>
        <ModuleActivities activities={featureCards} quizLocked={!readState[sections.length - 1]} onOpen={openSection} />
      </ModuleMenu>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">IKR3082 Network Documentation - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>
    </div>
  );
}
