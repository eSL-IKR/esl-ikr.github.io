import ModuleMenu, { ModuleActivities } from './ModuleMenu';
import { useMemo, useState } from 'react';
import { ikr3073QuizSets } from './IKR3073QuizData.js';
import HeadingIcon from './headingIcons';
import {
  ArrowDown,
  ArrowLeft,
  Award,
  Cable,
  CheckCircle,
  ChevronRight,
  CircleDot,
  Compass,
  Hash,
  HardDrive,
  ListChecks,
  ListOrdered,
  Lock,
  Network,
  Home,
  Route,
  RotateCcw,
  Router,
  Signpost,
  Sparkles,
  Terminal,
  Waypoints,
  XCircle,
} from 'lucide-react';

const sections = [
  { id: 'intro', title: 'Pengenalan kepada Penghala Rangkaian', desc: 'Fungsi router, peranan dalam rangkaian dan jenis-jenis penghala.', icon: Router, accent: 'blue' },
  { id: 'boot', title: 'Proses Booting & Sistem Pengoperasian (IOS)', desc: 'Peringkat but router dan Internetwork Operating System (IOS).', icon: HardDrive, accent: 'indigo' },
  { id: 'interfaces', title: 'Peranan, Fungsi & Interface Router', desc: 'Jenis-jenis interface router dan sambungan console.', icon: Cable, accent: 'violet' },
  { id: 'path', title: 'Path Determination & Longest Match', desc: 'Bagaimana router menentukan laluan terbaik untuk paket.', icon: Compass, accent: 'teal' },
  { id: 'forwarding', title: 'Penghantaran Paket & Mekanisme Forwarding', desc: 'Proses router menghantar paket ke destinasi.', icon: Waypoints, accent: 'emerald' },
  { id: 'config', title: 'Konfigurasi Asas Penghala Rangkaian', desc: 'Hostname, kata laluan, IP interface dan simpan konfigurasi.', icon: Terminal, accent: 'amber' },
  { id: 'table', title: 'Jadual Penghalaan & Administrative Distance', desc: 'Routing table, sumber laluan dan nilai Administrative Distance.', icon: Table2Icon, accent: 'orange' },
  { id: 'static', title: 'Static Routing', desc: 'Konfigurasi laluan statik, default route dan troubleshooting.', icon: Route, accent: 'rose' },
];

function Table2Icon(props) { return <ListOrdered {...props} />; }

const featureCards = [
  { id: 'quiz', target: 'quiz', title: 'Kuiz Penilaian', desc: '150 soalan (5 KP x 30 soalan). Buka setelah menyelesaikan semua 8 Nota.', icon: Award, accent: 'rose' },
];

const accentStyles = {
  blue: { icon: 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/30', ring: 'hover:border-blue-300 hover:shadow-blue-200/60', badge: 'bg-blue-100 text-blue-700', topBar: 'from-blue-400 to-blue-600' },
  indigo: { icon: 'bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-500/30', ring: 'hover:border-indigo-300 hover:shadow-indigo-200/60', badge: 'bg-indigo-100 text-indigo-700', topBar: 'from-indigo-400 to-indigo-600' },
  violet: { icon: 'bg-gradient-to-br from-violet-500 to-violet-700 shadow-lg shadow-violet-500/30', ring: 'hover:border-violet-300 hover:shadow-violet-200/60', badge: 'bg-violet-100 text-violet-700', topBar: 'from-violet-400 to-violet-600' },
  teal: { icon: 'bg-gradient-to-br from-teal-500 to-teal-700 shadow-lg shadow-teal-500/30', ring: 'hover:border-teal-300 hover:shadow-teal-200/60', badge: 'bg-teal-100 text-teal-700', topBar: 'from-teal-400 to-teal-600' },
  emerald: { icon: 'bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/30', ring: 'hover:border-emerald-300 hover:shadow-emerald-200/60', badge: 'bg-emerald-100 text-emerald-700', topBar: 'from-emerald-400 to-emerald-600' },
  amber: { icon: 'bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg shadow-amber-500/30', ring: 'hover:border-amber-300 hover:shadow-amber-200/60', badge: 'bg-amber-100 text-amber-700', topBar: 'from-amber-400 to-amber-600' },
  orange: { icon: 'bg-gradient-to-br from-orange-500 to-orange-700 shadow-lg shadow-orange-500/30', ring: 'hover:border-orange-300 hover:shadow-orange-200/60', badge: 'bg-orange-100 text-orange-700', topBar: 'from-orange-400 to-orange-600' },
  rose: { icon: 'bg-gradient-to-br from-rose-500 to-rose-700 shadow-lg shadow-rose-500/30', ring: 'hover:border-rose-300 hover:shadow-rose-200/60', badge: 'bg-rose-100 text-rose-700', topBar: 'from-rose-400 to-rose-600' },
};

function RouteAnimStyles() {
  return (
    <style>{`
      @keyframes rtDash { to { stroke-dashoffset: 0; } }
      @keyframes rtFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes rtScaleIn { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: scale(1); } }
      @keyframes rtPing { 0% { transform: scale(.9); opacity: .8; } 100% { transform: scale(1.6); opacity: 0; } }
      .rt-dash { stroke-dasharray: 300; stroke-dashoffset: 300; animation: rtDash 1.4s ease-out forwards; }
      .rt-entry-title { animation: rtFadeUp .5s ease-out both; }
      .rt-entry-icon { animation: rtScaleIn .45s ease-out both; }
      .rt-entry-subtitle { animation: rtFadeUp .5s ease-out .1s both; }
      .rt-reveal { animation: rtFadeUp .5s ease-out both; }
      .rt-reveal-1{animation-delay:.05s}.rt-reveal-2{animation-delay:.1s}.rt-reveal-3{animation-delay:.15s}
      .rt-reveal-4{animation-delay:.2s}.rt-reveal-5{animation-delay:.25s}.rt-reveal-6{animation-delay:.3s}
      .rt-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
      .rt-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(2,132,199,.25); border-color: #7dd3fc; }
      .rt-ping { animation: rtPing 1.6s ease-out infinite; }
      @media (prefers-reduced-motion: reduce) {
        .rt-dash, .rt-entry-title, .rt-entry-icon, .rt-entry-subtitle, .rt-reveal, .rt-card, .rt-ping { animation: none !important; transition: none !important; }
        .rt-card:hover { transform: none; }
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
          <div className={`p-3 rounded-2xl border border-white/15 ${style.icon} rt-entry-icon`}><Icon size={28} className="text-white" /></div>
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight rt-entry-title">{title}</h1>
            <p className="text-slate-300 mt-2 max-w-3xl text-sm md:text-base rt-entry-subtitle">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, children, icon: Icon = CircleDot }) {
  return (
    <article className="rt-card rt-reveal bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
      <h3 className="font-black text-slate-900 text-lg flex items-center gap-2 mb-3"><Icon size={20} className="text-sky-600" /> {title}</h3>
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
      <ListChecks size={22} className="text-sky-300 shrink-0 mt-0.5" />
      <div><p className="text-xs font-black uppercase tracking-wide text-sky-300 mb-1">Ringkasan</p><div className="text-sm text-slate-100 leading-relaxed">{children}</div></div>
    </div>
  );
}

function NotesTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm">
        <thead><tr className="bg-sky-50 text-sky-900">{headers.map((h) => <th key={h} className="text-left font-black p-3 md:p-4">{h}</th>)}</tr></thead>
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

function FlowVertical({ steps }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <div className="flex flex-col items-stretch">
        {steps.map((step, i) => (
          <div key={step} className="flex flex-col items-center">
            <div className="w-full rounded-xl bg-slate-900 text-white text-sm font-bold text-center py-3 px-4">{step}</div>
            {i < steps.length - 1 && <ArrowDown size={18} className="text-sky-600 my-1.5" />}
          </div>
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
          <span className="rounded-xl bg-white border border-sky-200 text-sky-900 text-xs md:text-sm font-black px-3 py-2">{step}</span>
          {i < steps.length - 1 && <ChevronRight size={16} className="text-sky-400 shrink-0" />}
        </div>
      ))}
    </div>
  );
}

function CodeBlock({ children }) {
  return <pre className="bg-slate-950 text-emerald-300 rounded-xl p-4 text-xs md:text-sm overflow-x-auto font-mono">{children}</pre>;
}

/* ---------------- NOTA 1: PENGENALAN PENGHALA ---------------- */
function IntroNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Apakah Penghala (Router)?" icon={Router}>
        <p>Router ialah peranti rangkaian yang menghubungkan <b>dua atau lebih rangkaian berbeza</b> (contohnya LAN dengan WAN/Internet) dan menentukan laluan terbaik untuk menghantar paket data antara rangkaian tersebut - berbeza daripada suis yang beroperasi dalam SATU rangkaian sahaja.</p>
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-8 shadow-sm">
        <h4 className="font-black text-slate-900 mb-6 flex items-center gap-2"><HeadingIcon text={"Router Menghubungkan Rangkaian Berbeza"} className="text-sky-600 shrink-0" size={18} />Router Menghubungkan Rangkaian Berbeza</h4>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-700">Rangkaian A (LAN)</div>
          <ChevronRight size={22} className="text-sky-400" />
          <div className="relative rounded-2xl bg-sky-600 text-white px-6 py-4 font-black flex items-center gap-2">
            <div className="absolute inset-0 rounded-2xl border-2 border-sky-400 rt-ping" />
            <Router size={20} /> ROUTER
          </div>
          <ChevronRight size={22} className="text-sky-400" />
          <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-700">Rangkaian B (Internet/WAN)</div>
        </div>
      </div>

      <InfoCard title="Peranan & Fungsi Router" icon={Network}>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Path Determination</b><p className="mt-1 text-xs">Tentukan laluan terbaik untuk hantar paket</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Packet Forwarding</b><p className="mt-1 text-xs">Hantar paket ke destinasi mengikut laluan dipilih</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Penghubung Rangkaian</b><p className="mt-1 text-xs">Sambungkan pelbagai jenis rangkaian (LAN-WAN)</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Keselamatan Asas</b><p className="mt-1 text-xs">Boleh laksana ACL untuk kawal trafik</p></div>
        </div>
      </InfoCard>

      <Ringkasan>
        Router menghubungkan <b>rangkaian berbeza</b> (bukan hanya peranti dalam satu rangkaian seperti suis) dan berfungsi menentukan laluan terbaik (Path Determination) serta menghantar paket (Packet Forwarding) antara rangkaian tersebut.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 2: BOOT & IOS ---------------- */
function BootNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Apakah IOS (Internetwork Operating System)?" icon={HardDrive}>
        <p>IOS ialah sistem operasi khusus yang dibangunkan oleh Cisco untuk menguruskan operasi router dan suis - menyediakan Command Line Interface (CLI) untuk konfigurasi dan pengurusan peranti.</p>
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2"><HeadingIcon text={"Peringkat Proses Booting Router"} className="text-sky-600 shrink-0" size={18} />Peringkat Proses Booting Router</h4>
        <FlowVertical steps={['1. Power-On Self Test (POST)', '2. Muatkan Bootstrap dari ROM', '3. Cari & Muatkan IOS (Flash Memory)', '4. Cari & Muatkan Konfigurasi (NVRAM)', '5. Router Sedia Digunakan (CLI Prompt)']} />
      </div>

      <InfoCard title="Jenis Memori dalam Router" icon={HardDrive}>
        <NotesTable
          headers={['Jenis Memori', 'Kandungan']}
          rows={[
            ['ROM', 'Bootstrap program, mikrokod diagnostik'],
            ['Flash Memory', 'Fail imej IOS (sistem operasi router)'],
            ['NVRAM', 'Startup-configuration (konfigurasi tersimpan)'],
            ['RAM', 'Running-configuration (konfigurasi aktif) & jadual routing'],
          ]}
        />
      </InfoCard>

      <NotaPenting>
        Konfigurasi yang sedang berjalan (<code className="bg-amber-100 px-1 rounded">running-config</code>) disimpan dalam <b>RAM</b> dan akan <b>hilang</b> jika router dimatikan tanpa disimpan. Gunakan arahan <code className="bg-amber-100 px-1 rounded">copy running-config startup-config</code> untuk simpan konfigurasi secara kekal ke NVRAM.
      </NotaPenting>

      <Ringkasan>
        IOS ialah sistem operasi Cisco untuk router. Proses booting melalui 5 peringkat: POST &rarr; Bootstrap (ROM) &rarr; Muat IOS (Flash) &rarr; Muat Konfigurasi (NVRAM) &rarr; Sedia CLI. Empat jenis memori utama: <b>ROM, Flash, NVRAM,</b> dan <b>RAM</b>, masing-masing menyimpan komponen berbeza.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 3: INTERFACE ROUTER ---------------- */
function InterfacesNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Jenis-Jenis Interface Router" icon={Cable}>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Ethernet / FastEthernet / GigabitEthernet</b><p className="mt-1 text-xs">Sambungan LAN berwayar</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Serial Interface</b><p className="mt-1 text-xs">Sambungan WAN (contoh: talian sewa)</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Console Port</b><p className="mt-1 text-xs">Konfigurasi awal secara terus (tanpa rangkaian)</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>AUX Port</b><p className="mt-1 text-xs">Pengurusan jauh melalui modem (sandaran)</p></div>
        </div>
      </InfoCard>

      <InfoCard title="Menyambung ke Router melalui Console" icon={Terminal}>
        <p>Sambungan awal ke router menggunakan kabel console (rollover cable) dan perisian terminal emulator seperti PuTTY atau Tera Term, dengan tetapan piawai:</p>
        <div className="grid sm:grid-cols-4 gap-2 mt-3 text-xs">
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-2 text-center"><b>9600</b><p>bps</p></div>
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-2 text-center"><b>8</b><p>data bits</p></div>
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-2 text-center"><b>None</b><p>parity</p></div>
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-2 text-center"><b>1</b><p>stop bit</p></div>
        </div>
      </InfoCard>

      <Ringkasan>
        Router mempunyai pelbagai jenis interface: <b>Ethernet</b> (LAN), <b>Serial</b> (WAN), <b>Console</b> (konfigurasi terus), dan <b>AUX</b> (pengurusan jauh sandaran). Sambungan console menggunakan tetapan piawai 9600-8-None-1 untuk konfigurasi awal.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 4: PATH DETERMINATION & LONGEST MATCH ---------------- */
function PathNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Path Determination" icon={Compass}>
        <p>Path Determination ialah proses router menganalisis alamat IP destinasi paket dan membandingkannya dengan entri dalam <b>jadual penghalaan (routing table)</b> untuk menentukan laluan terbaik menghantar paket tersebut.</p>
      </InfoCard>

      <InfoCard title="Longest Match Rule" icon={Signpost}>
        <p>Apabila terdapat <b>lebih daripada satu</b> entri dalam jadual penghalaan yang sepadan dengan alamat destinasi, router akan memilih entri dengan <b>subnet mask paling khusus (terpanjang)</b> - bukan entri paling umum.</p>
        <div className="mt-4 rounded-xl bg-sky-50 border border-sky-200 p-4 text-sm">
          <p className="font-bold text-sky-800">Contoh:</p>
          <p className="mt-1 text-sky-900">Destinasi: <code className="bg-white px-1 rounded">192.168.1.10</code></p>
          <p className="text-sky-900">Entri A: <code className="bg-white px-1 rounded">192.168.0.0/16</code> (umum)</p>
          <p className="text-sky-900">Entri B: <code className="bg-white px-1 rounded">192.168.1.0/24</code> (lebih khusus) &larr; <b>Dipilih (Longest Match)</b></p>
        </div>
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2"><HeadingIcon text={"Komponen Entri Jadual Penghalaan"} className="text-sky-600 shrink-0" size={18} />Komponen Entri Jadual Penghalaan</h4>
        <FlowRow steps={['Destination Network', 'Next Hop', 'Exit Interface', 'Metric', 'Route Source']} />
      </div>

      <InfoCard title="3 Sumber Laluan (Route Sources)" icon={Route}>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3"><b className="text-emerald-800">Directly Connected</b><p className="mt-1 text-emerald-900 text-xs">Rangkaian yang disambung terus ke interface router</p></div>
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-3"><b className="text-blue-800">Static Route</b><p className="mt-1 text-blue-900 text-xs">Dikonfigurasikan secara manual oleh pentadbir</p></div>
          <div className="rounded-xl bg-violet-50 border border-violet-200 p-3"><b className="text-violet-800">Dynamic Route</b><p className="mt-1 text-violet-900 text-xs">Dipelajari secara automatik melalui protokol routing (OSPF, RIP)</p></div>
        </div>
      </InfoCard>

      <Ringkasan>
        Path Determination guna jadual penghalaan untuk pilih laluan terbaik, menerapkan <b>Longest Match Rule</b> apabila berbilang laluan sepadan (pilih subnet mask paling khusus). 3 sumber laluan: <b>Directly Connected, Static,</b> dan <b>Dynamic</b>.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 5: PENGHANTARAN PAKET & FORWARDING ---------------- */
function ForwardingNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Mekanisme Penghantaran Paket (Packet Forwarding)" icon={Waypoints}>
        <p>Selepas router menentukan laluan terbaik (Path Determination), ia akan menghantar paket melalui <b>exit interface</b> yang ditetapkan dalam jadual penghalaan menuju ke <b>next hop</b> (router seterusnya) atau terus ke destinasi jika berada dalam rangkaian yang disambung terus.</p>
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2"><HeadingIcon text={"Proses Penghantaran Paket"} className="text-sky-600 shrink-0" size={18} />Proses Penghantaran Paket</h4>
        <FlowVertical steps={['Paket tiba di router', 'Semak alamat IP destinasi', 'Cari padanan dalam jadual penghalaan (Longest Match)', 'Tentukan next hop & exit interface', 'Hantar paket melalui exit interface']} />
      </div>

      <InfoCard title="Apa Berlaku Jika Tiada Padanan Laluan?" icon={XCircle}>
        <p>Jika tiada entri dalam jadual penghalaan sepadan dengan destinasi paket, dan tiada <b>default route</b> dikonfigurasikan, router akan <b>membuang (drop)</b> paket tersebut dan menghantar mesej ralat "Destination Unreachable" kepada penghantar.</p>
      </InfoCard>

      <Ringkasan>
        Router menghantar paket berdasarkan keputusan Path Determination - melalui <b>exit interface</b> yang ditetapkan menuju <b>next hop</b>. Jika tiada padanan laluan (dan tiada default route), paket akan <b>dibuang</b>.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 6: KONFIGURASI ASAS ---------------- */
function ConfigNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Konfigurasi Asas Router" icon={Terminal}>
        <p>Langkah asas mengkonfigurasi router Cisco melalui CLI, bermula dari mod User EXEC ke Global Configuration.</p>
        <CodeBlock>{`Router> enable
Router# configure terminal
Router(config)# hostname R1
R1(config)# enable secret CiscoPass123`}</CodeBlock>
      </InfoCard>

      <InfoCard title="Konfigurasi Alamat IP pada Interface" icon={Network}>
        <CodeBlock>{`R1(config)# interface gigabitEthernet 0/0
R1(config-if)# ip address 192.168.1.1 255.255.255.0
R1(config-if)# no shutdown
R1(config-if)# description Sambungan LAN Pejabat`}</CodeBlock>
        <p className="mt-3 text-sm">Arahan <code className="bg-slate-100 px-1 rounded">no shutdown</code> WAJIB dijalankan - interface router secara lalai dalam keadaan <i>administratively down</i> sehingga diaktifkan.</p>
      </InfoCard>

      <InfoCard title="Menyimpan & Menguji Konfigurasi" icon={CheckCircle}>
        <CodeBlock>{`R1# copy running-config startup-config
R1# show running-config
R1# show ip interface brief
R1# ping 192.168.1.2`}</CodeBlock>
      </InfoCard>

      <NotaPenting>
        Sentiasa gunakan <code className="bg-amber-100 px-1 rounded">copy running-config startup-config</code> selepas konfigurasi selesai - jika tidak, semua tetapan akan <b>hilang</b> apabila router dimatikan atau di-restart (kerana running-config hanya disimpan dalam RAM).
      </NotaPenting>

      <Ringkasan>
        Konfigurasi asas router merangkumi: <b>hostname, kata laluan (enable secret), alamat IP pada interface</b> (dengan <code>no shutdown</code> wajib), dan <b>penyimpanan konfigurasi</b> (copy running-config startup-config) supaya kekal selepas restart.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 7: JADUAL PENGHALAAN & AD ---------------- */
function TableNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Jadual Penghalaan (Routing Table)" icon={ListOrdered}>
        <p>Setiap router menyimpan jadual penghalaan dalam RAM, disemak melalui arahan <code className="bg-slate-100 px-1 rounded">show ip route</code>, mengandungi entri laluan yang diketahui daripada 3 sumber (Directly Connected, Static, Dynamic).</p>
      </InfoCard>

      <InfoCard title="Administrative Distance (AD)" icon={Hash}>
        <p>AD ialah nilai yang menunjukkan <b>tahap kepercayaan</b> terhadap sumber laluan - nilai lebih rendah = lebih dipercayai dan diutamakan apabila berlaku konflik antara sumber laluan berbeza untuk destinasi yang sama.</p>
      </InfoCard>

      <NotesTable
        headers={['Sumber Laluan', 'Administrative Distance (AD)']}
        rows={[
          ['Directly Connected', '0'],
          ['Static Route', '1'],
          ['EIGRP (Internal)', '90'],
          ['OSPF', '110'],
          ['RIP', '120'],
          ['External EIGRP', '170'],
          ['Unknown / Tidak Dipercayai', '255 (tidak digunakan)'],
        ]}
      />

      <NotaPenting>
        Apabila terdapat DUA sumber laluan berbeza (contoh: Static Route dan OSPF) untuk destinasi yang SAMA, router akan memilih laluan dengan <b>AD paling rendah</b> - dalam kes ini, Static Route (AD=1) diutamakan berbanding OSPF (AD=110).
      </NotaPenting>

      <Ringkasan>
        Jadual penghalaan menyimpan semua laluan yang diketahui router. <b>Administrative Distance</b> menentukan sumber laluan mana diutamakan bila berlaku konflik - Directly Connected (0) paling dipercayai, diikuti Static (1), kemudian protokol dinamik (OSPF=110, RIP=120, dsb).
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 8: STATIC ROUTING ---------------- */
function StaticNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Apakah Static Routing?" icon={Route}>
        <p>Static Route ialah laluan yang dikonfigurasikan <b>secara manual</b> oleh pentadbir rangkaian - sesuai untuk rangkaian kecil/stabil yang tidak kerap berubah, kerana tidak memerlukan overhead protokol routing dinamik.</p>
      </InfoCard>

      <InfoCard title="Sintaks Konfigurasi Static Route" icon={Terminal}>
        <CodeBlock>{`R1(config)# ip route [destinasi] [subnet mask] [next-hop]

# Contoh:
R1(config)# ip route 192.168.2.0 255.255.255.0 10.0.0.2`}</CodeBlock>
      </InfoCard>

      <InfoCard title="Default Route (Route of Last Resort)" icon={Signpost}>
        <p>Digunakan sebagai laluan &ldquo;lalai&rdquo; apabila tiada padanan khusus lain dijumpai dalam jadual penghalaan - biasa digunakan untuk hantar semua trafik tidak dikenali ke Internet melalui ISP.</p>
        <CodeBlock>{`R1(config)# ip route 0.0.0.0 0.0.0.0 [next-hop-ISP]`}</CodeBlock>
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2"><HeadingIcon text={"Troubleshooting Static Route"} className="text-sky-600 shrink-0" size={18} />Troubleshooting Static Route</h4>
        <FlowRow steps={['show ip route', 'ping / traceroute', 'show running-config', 'show logging']} />
        <p className="text-sm text-slate-600 mt-4">Gunakan gabungan arahan ini untuk mengesahkan laluan wujud dalam jadual, menguji kesampaian (reachability), dan menyemak konfigurasi/log bagi kesan sebarang kesilapan taip atau next-hop yang salah.</p>
      </div>

      <Ringkasan>
        Static Route dikonfigurasi manual (<code>ip route [destinasi] [mask] [next-hop]</code>), sesuai rangkaian kecil/stabil. <b>Default Route</b> (<code>0.0.0.0 0.0.0.0</code>) bertindak sebagai laluan lalai. Troubleshooting guna <b>show ip route, ping/traceroute,</b> dan <b>show running-config</b>.
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
  const [activeQuestions, setActiveQuestions] = useState(() => shuffleQuestions(ikr3073QuizSets[0].questions));

  const currentSet = ikr3073QuizSets[kpIndex];
  const passScore = 18;

  const score = useMemo(() => activeQuestions.reduce((total, question, index) => total + (answers[index] === question.options.indexOf(question.correct) ? 1 : 0), 0), [answers, activeQuestions]);

  const retryLevel = () => {
    setAnswers({});
    setSubmitted(false);
    setActiveQuestions(shuffleQuestions(ikr3073QuizSets[kpIndex].questions));
  };

  const nextKp = () => {
    if (score >= passScore && kpIndex < ikr3073QuizSets.length - 1) {
      const nextIndex = kpIndex + 1;
      setHighestKp(previous => Math.max(previous, nextIndex));
      setKpIndex(nextIndex);
      setAnswers({});
      setSubmitted(false);
      setActiveQuestions(shuffleQuestions(ikr3073QuizSets[nextIndex].questions));
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
            <div className="text-xs font-black uppercase tracking-[.2em] text-sky-700">Tahap Kuiz</div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{currentSet.code} - {currentSet.title}</h2>
            <p className="text-sm text-slate-600 mt-2">Setiap KP mengandungi 30 soalan. Lulus minimum ialah 18/30.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ikr3073QuizSets.map((item, index) => (
              <button key={item.id} disabled={index > highestKp || (index === kpIndex && submitted && score < passScore)} onClick={() => {
                if (index <= highestKp) {
                  setKpIndex(index);
                  setAnswers({});
                  setSubmitted(false);
                  setActiveQuestions(shuffleQuestions(ikr3073QuizSets[index].questions));
                }
              }} className={`rounded-full px-4 py-2 text-xs font-black border ${index === kpIndex ? 'bg-sky-600 border-sky-600 text-white' : 'bg-white border-slate-300 text-slate-700'} ${index > highestKp ? 'opacity-50 cursor-not-allowed' : ''}`}>{item.code}</button>
            ))}
          </div>
        </div>
      </div>

      {submitted && (
        <div className={`rounded-2xl p-6 mb-6 text-white ${score >= passScore ? 'bg-emerald-600' : 'bg-rose-600'}`}>
          <div className="flex items-center gap-3"><Award size={34} /><div><p className="text-sm font-bold opacity-90">Keputusan {currentSet.code}</p><h2 className="text-3xl font-black">{score} / {activeQuestions.length}</h2></div></div>
          <p className="mt-3 font-medium">
            {score >= passScore
              ? `Lulus ${currentSet.code}. Anda layak ${kpIndex < ikr3073QuizSets.length - 1 ? 'naik ke ' + ikr3073QuizSets[kpIndex + 1].code : 'menamatkan semua KP'}.`
              : `Belum lulus. Markah minimum ialah 18/30 - sila ulang ${currentSet.code} sebelum naik ke tahap seterusnya.`}
          </p>
        </div>
      )}

      <div className="space-y-5">
        {activeQuestions.map((question, index) => (
          <article key={`${currentSet.id}-${index}-${question.question}`} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-black text-slate-900"><span className="text-sky-600 mr-2">{index + 1}.</span>{question.question}</h3>
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
                    className={`text-left p-3 rounded-xl border text-sm font-medium transition-all ${correct ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : wrong ? 'border-rose-500 bg-rose-50 text-rose-800' : selected ? 'border-sky-500 bg-sky-50 text-sky-800' : 'border-slate-200 hover:border-sky-300'}`}
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
          <button disabled={Object.keys(answers).length !== activeQuestions.length} onClick={handleSubmit} className="flex-1 bg-sky-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-black hover:bg-sky-700 transition-colors">Hantar Jawapan {currentSet.code}</button>
        ) : (
          <>
            {score >= passScore && kpIndex < ikr3073QuizSets.length - 1 && (
              <button onClick={nextKp} className="flex-1 bg-emerald-600 text-white px-6 py-4 rounded-xl font-black hover:bg-emerald-700">Naik ke {ikr3073QuizSets[kpIndex + 1].code}</button>
            )}
            <button onClick={retryLevel} className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-xl font-black hover:bg-slate-800"><RotateCcw size={19} /> Cuba Semula {currentSet.code}</button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- KOMPONEN UTAMA ---------------- */
export default function IKR3073({ onBackToPortal }) {
  const [view, setView] = useState('menu');
  const [readState, setReadState] = useState(() => {
    const fallback = [false, false, false, false, false, false, false, false];
    try {
      const saved = JSON.parse(localStorage.getItem('ikr3073-read-state'));
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
    try { localStorage.setItem('ikr3073-read-state', JSON.stringify(fallback)); } catch { /* storan tidak tersedia */ }
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
    try { localStorage.setItem('ikr3073-read-state', JSON.stringify(nextReadState)); } catch { /* storan tidak tersedia */ }
    const nextInLine = sections[requested + 1];
    if (nextInLine) setView(nextInLine.id);
  };

  if (view !== 'menu') {
    const content = {
      intro: <IntroNotes />,
      boot: <BootNotes />,
      interfaces: <InterfacesNotes />,
      path: <PathNotes />,
      forwarding: <ForwardingNotes />,
      config: <ConfigNotes />,
      table: <TableNotes />,
      static: <StaticNotes />,
      quiz: <Quiz />,
    }[view];

    const showCompleteButton = sections.some((section) => section.id === view);
    const headerMeta = sections.find((section) => section.id === view) || featureCards.find((f) => f.id === view) || sections[0];

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <RouteAnimStyles />
        <div className="bg-slate-950 text-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Router size={30} className="text-sky-300" />
                <div>
                  <div className="text-[10px] uppercase tracking-[.2em] text-sky-300 font-black">Basic Routing Configuration</div>
                  <div className="text-sm font-black">{completedCount}/{sections.length} bahagian</div>
                </div>
              </div>
              <div className="flex-1 max-w-md">
                <div className="flex items-center justify-between text-[10px] font-black tracking-[.18em] text-sky-200 uppercase"><span>Progress</span><span>{progressPercent}%</span></div>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-sky-300 to-blue-300 transition-all" style={{ width: `${progressPercent}%` }} /></div>
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
        <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">IKR3073 Basic Routing Configuration - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>
      </div>
    );
  }

  return (
    <div className="course-menu-page min-h-screen bg-slate-50 text-slate-900">
      <RouteAnimStyles />
      <ModuleMenu title="Modul IKR3073: Basic Routing Configuration" icon={sections[0].icon} secondaryIcon={sections[1].icon}
        onBack={onBackToPortal} topics={sections} read={readState} onTopic={section => openSection(section.id)} onReset={resetProgress}
        description={<>Pengenalan router, proses booting &amp; IOS, interface, path determination, packet forwarding, konfigurasi asas, jadual penghalaan &amp; Administrative Distance, serta static routing - dipecahkan kepada 8 bahagian, lengkap dengan kuiz 150 soalan.</>}>
        <ModuleActivities activities={featureCards} quizLocked={!readState[sections.length - 1]} onOpen={openSection} />
      </ModuleMenu>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">IKR3073 Basic Routing Configuration - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>
    </div>
  );
}
