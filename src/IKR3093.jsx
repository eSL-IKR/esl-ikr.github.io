import ModuleMenu, { ModuleActivities } from './ModuleMenu';
import { useMemo, useState } from 'react';
import { ikr3093QuizSets } from './IKR3093QuizData.js';
import HeadingIcon from './headingIcons';
import {
  ArrowDown,
  ArrowLeft,
  Award,
  Box,
  Boxes,
  Cable,
  CheckCircle,
  ChevronRight,
  CircleDot,
  ClipboardCheck,
  Cpu,
  Fan,
  Gauge,
  GitBranch,
  HardDrive,
  History,
  Home,
  Layers,
  ListChecks,
  Lock,
  MemoryStick,
  MonitorCog,
  Network,
  PlugZap,
  Power,
  RotateCcw,
  Server,
  Settings,
  Shield,
  Snowflake,
  Sparkles,
  TestTube,
  Wrench,
  XCircle,
  Zap,
} from 'lucide-react';

const sections = [
  { id: 'intro', title: 'Senibina & Jenis Sistem Pelayan', desc: 'Rajah seni bina server, server hardware dan perbandingan Server vs PC.', icon: Server, accent: 'blue' },
  { id: 'vm', title: 'Mesin Maya & Hypervisor', desc: 'Virtual Machine, Hypervisor Jenis 1/2, System VM vs Process VM.', icon: Boxes, accent: 'indigo' },
  { id: 'assembly', title: 'Pemasangan & Penyusunan Perkakasan', desc: 'Persediaan lokasi, rak server, pengurusan kabel dan kuasa.', icon: Wrench, accent: 'violet' },
  { id: 'connections', title: 'Sambungan Komponen & Sistem Penyejukan', desc: 'IDE/SATA/NVMe, Air Cooling vs Liquid Cooling, langkah pemasangan komponen.', icon: Snowflake, accent: 'teal' },
  { id: 'testing', title: 'Pemeriksaan, Pengujian Perkakasan & RAID', desc: 'Power-On Test, alat diagnostik, stress test, RAID dan partition.', icon: TestTube, accent: 'emerald' },
  { id: 'os', title: 'Perisian Sistem Operasi Server', desc: 'Windows Server, Linux, UNIX serta fungsi OS server.', icon: MonitorCog, accent: 'amber' },
  { id: 'install', title: 'Prosedur Instalasi & Penyelenggaraan OS Server', desc: 'Persediaan, pemasangan, konfigurasi selepas pasang, virtualisasi & penyelenggaraan.', icon: History, accent: 'orange' },
  { id: 'ostesting', title: 'Pengujian Perisian Sistem Operasi (OS) Pelayan', desc: 'Ujian fungsian, prestasi, keselamatan, kebolehskalaan dan tekanan.', icon: ClipboardCheck, accent: 'rose' },
];

const featureCards = [
  { id: 'quiz', target: 'quiz', title: 'Kuiz Penilaian', desc: '180 soalan (6 KP x 30 soalan). Buka setelah menyelesaikan semua 8 Nota.', icon: Award, accent: 'rose' },
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

/* Animasi CSS - KHUSUS modul Server Essentials (server room, blink LED, kipas berputar) */
function ServerAnimStyles() {
  return (
    <style>{`
      @keyframes srvBlink { 0%, 100% { opacity: 1; } 50% { opacity: .25; } }
      @keyframes srvSpin { to { transform: rotate(360deg); } }
      @keyframes srvFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes srvScaleIn { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: scale(1); } }
      @keyframes srvBarPulse { 0%, 100% { opacity: .5; } 50% { opacity: 1; } }
      .srv-blink { animation: srvBlink 1.4s ease-in-out infinite; }
      .srv-blink-delay { animation: srvBlink 1.4s ease-in-out infinite; animation-delay: .5s; }
      .srv-fan { animation: srvSpin 2.5s linear infinite; transform-origin: center; }
      .srv-fan-fast { animation: srvSpin 1s linear infinite; transform-origin: center; }
      .srv-entry-title { animation: srvFadeUp .5s ease-out both; }
      .srv-entry-icon { animation: srvScaleIn .45s ease-out both; }
      .srv-entry-subtitle { animation: srvFadeUp .5s ease-out .1s both; }
      .srv-reveal { animation: srvFadeUp .5s ease-out both; }
      .srv-reveal-1{animation-delay:.05s}.srv-reveal-2{animation-delay:.1s}.srv-reveal-3{animation-delay:.15s}
      .srv-reveal-4{animation-delay:.2s}.srv-reveal-5{animation-delay:.25s}.srv-reveal-6{animation-delay:.3s}
      .srv-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
      .srv-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(6,182,212,.25); border-color: #67e8f9; }
      .srv-card:hover .srv-card-icon { animation: srvScaleIn .3s ease-out; }
      .srv-bar-pulse { animation: srvBarPulse 1.6s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce) {
        .srv-blink, .srv-blink-delay, .srv-fan, .srv-fan-fast, .srv-entry-title, .srv-entry-icon,
        .srv-entry-subtitle, .srv-reveal, .srv-card, .srv-bar-pulse { animation: none !important; transition: none !important; }
        .srv-card:hover { transform: none; }
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
          <div className={`p-3 rounded-2xl border border-white/15 ${style.icon} srv-entry-icon`}><Icon size={28} className="text-white" /></div>
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight srv-entry-title">{title}</h1>
            <p className="text-slate-300 mt-2 max-w-3xl text-sm md:text-base srv-entry-subtitle">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, children, icon: Icon = CircleDot }) {
  return (
    <article className="srv-card srv-reveal bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
      <h3 className="font-black text-slate-900 text-lg flex items-center gap-2 mb-3"><Icon size={20} className="srv-card-icon text-cyan-600" /> {title}</h3>
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
      <ListChecks size={22} className="text-cyan-300 shrink-0 mt-0.5" />
      <div><p className="text-xs font-black uppercase tracking-wide text-cyan-300 mb-1">Ringkasan</p><div className="text-sm text-slate-100 leading-relaxed">{children}</div></div>
    </div>
  );
}

function NotesTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm">
        <thead><tr className="bg-cyan-50 text-cyan-900">{headers.map((h) => <th key={h} className="text-left font-black p-3 md:p-4">{h}</th>)}</tr></thead>
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
            {i < steps.length - 1 && <ArrowDown size={18} className="text-cyan-600 my-1.5" />}
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
          <span className="rounded-xl bg-white border border-cyan-200 text-cyan-900 text-xs md:text-sm font-black px-3 py-2">{step}</span>
          {i < steps.length - 1 && <ChevronRight size={16} className="text-cyan-400 shrink-0" />}
        </div>
      ))}
    </div>
  );
}

/* Simbol server dengan lampu LED berkelip - elemen visual signature modul ini */
function ServerRackIcon({ size = 96 }) {
  return (
    <div className="relative flex items-center justify-center rounded-2xl bg-slate-900 border border-white/10" style={{ width: size, height: size }}>
      <Server size={size * 0.5} className="text-cyan-300" />
      <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-emerald-400 srv-blink" />
      <span className="absolute top-3 right-6 w-2 h-2 rounded-full bg-cyan-400 srv-blink-delay" />
    </div>
  );
}

/* ---------------- NOTA 1: SENIBINA & JENIS SISTEM PELAYAN ---------------- */
function IntroNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-6 items-center">
        <InfoCard title="Rajah Seni Bina Sistem Pelayan" icon={Network}>
          <p>Rajah seni bina sistem pelayan ialah gambaran grafik yang menunjukkan bagaimana <b>klien (client), pelayan (server), pangkalan data (database), rangkaian (network)</b> dan lapisan keselamatan seperti <b>firewall</b> saling berhubung dan berfungsi dalam sesuatu sistem komputer.</p>
          <p className="mt-3">Ia membantu memahami bagaimana data dihantar dan diterima - contohnya apabila pengguna membuka laman web, permintaan melalui beberapa peringkat sebelum maklumat dipaparkan di skrin, termasuk bagaimana pelayan menerima permintaan, memprosesnya, dan menghantar maklumat semula.</p>
        </InfoCard>
        <div className="flex flex-col items-center gap-4 bg-slate-950 rounded-2xl p-6">
          <ServerRackIcon size={120} />
          <div className="flex items-center gap-3 text-white">
            <Server size={18} className="text-cyan-300" />
            <span className="text-xs font-bold text-slate-300">Client → Server → Database → Network → Firewall</span>
          </div>
        </div>
      </div>

      <InfoCard title="Server Hardware" icon={Cpu}>
        <p>Server hardware merujuk kepada komponen fizikal yang membina dan mengendalikan sesebuah server. Ia direka khas untuk beroperasi secara berterusan dan menampung beban kerja tinggi.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 text-sm">
          {[
            { icon: Cpu, name: 'CPU', d: 'Intel Xeon / AMD EPYC - memproses arahan & data' },
            { icon: MemoryStick, name: 'RAM', d: 'ECC RAM - simpan data sementara & elak ralat sistem' },
            { icon: HardDrive, name: 'Storan', d: 'HDD/SSD, konfigurasi RAID untuk keselamatan & kelajuan' },
            { icon: Layers, name: 'Motherboard', d: 'Sokong CPU berganda, slot RAM banyak' },
            { icon: Power, name: 'PSU', d: 'Redundant PSU - jamin server terus berfungsi jika 1 gagal' },
            { icon: Network, name: 'NIC', d: 'Sambungan rangkaian pantas & stabil' },
            { icon: Box, name: 'Chassis', d: 'Tower, Rack-mounted, atau Blade' },
            { icon: Snowflake, name: 'Sistem Penyejukan', d: 'Kipas besar, heatsink, atau penyejukan cecair' },
          ].map((c) => (
            <div key={c.name} className="rounded-xl bg-slate-50 border border-slate-200 p-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-700 mb-2"><c.icon size={17} /></div>
              <p className="font-black text-slate-900">{c.name}</p>
              <p className="text-xs text-slate-600 mt-1">{c.d}</p>
            </div>
          ))}
        </div>
      </InfoCard>

      <NotesTable
        headers={['Aspek', 'Server', 'PC Biasa']}
        rows={[
          ['Tujuan', 'Menyediakan perkhidmatan kepada client dalam rangkaian', 'Digunakan individu untuk kerja harian'],
          ['CPU', 'Multi-core jenis pelayan (Xeon, EPYC)', 'CPU consumer (Core i5/i7, Ryzen)'],
          ['RAM', 'ECC RAM, kapasiti besar (hingga ratusan GB)', 'RAM biasa, 8-32GB'],
          ['Storan', 'RAID, hot-swappable, keselamatan tinggi', 'HDD/SSD tunggal, tiada keselamatan tambahan'],
          ['PSU', 'Redundant (2 unit atau lebih)', 'Satu unit sahaja'],
          ['Kebolehpercayaan', 'Tinggi - direka 24/7 tanpa henti', 'Sederhana - ikut keperluan harian'],
          ['Reka Bentuk', 'Chassis khas (rack, tower, blade)', 'Reka bentuk desktop/laptop biasa'],
        ]}
      />

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"3 Jenis Sistem Pelayan"} className="text-cyan-600 shrink-0" size={20} />3 Jenis Sistem Pelayan</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 mb-3"><Server size={19} /></div>
            <p className="font-black text-slate-900">Tower Server</p>
            <p className="text-xs text-slate-600 mt-1.5">Berdiri bebas macam desktop, mudah upgrade, tiada perlu rak. Sesuai pejabat kecil/organisasi baru bermula.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 mb-3"><Box size={19} /></div>
            <p className="font-black text-slate-900">Appliance Server</p>
            <p className="text-xs text-slate-600 mt-1.5">Satu tugas khusus, plug-and-play. Contoh: firewall appliance (Cisco ASA), NAS appliance.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 mb-3"><Boxes size={19} /></div>
            <p className="font-black text-slate-900">Virtual Machine (VM)</p>
            <p className="text-xs text-slate-600 mt-1.5">Pelayan maya dalam satu pelayan fizikal. Jimat kos & ruang, mudah dipindah/ditiru/dipulihkan.</p>
          </div>
        </div>
      </div>

      <Ringkasan>
        Rajah seni bina pelayan merangkumi Client, Server, Database, Network dan Firewall. Server hardware (CPU/RAM/Storan/PSU/NIC/Chassis/Penyejukan) direka untuk operasi 24/7 - jauh berbeza daripada PC biasa. 3 jenis sistem pelayan: <b>Tower, Appliance,</b> dan <b>Virtual Machine</b>.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 2: MESIN MAYA & HYPERVISOR ---------------- */
function VmNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Apakah Mesin Maya (Virtual Machine - VM)?" icon={Boxes}>
        <p>Mesin Maya (VM) ialah sejenis perisian yang mensimulasikan komputer sebenar, membolehkan pengguna menjalankan sistem operasi atau aplikasi seolah-olah menggunakan komputer fizikal berasingan. VM wujud di dalam komputer fizikal dan dikendalikan oleh perisian yang dikenali sebagai <b>Hypervisor</b>.</p>
        <p className="mt-3">Contohnya, seseorang boleh menjalankan Linux dalam VM walaupun komputer sebenar menggunakan Windows - berguna untuk ujian, latihan dan pembangunan tanpa risiko kepada sistem utama.</p>
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2"><HeadingIcon text={"Bagaimana Hypervisor Berfungsi"} className="text-cyan-600 shrink-0" size={18} />Bagaimana Hypervisor Berfungsi</h4>
        <FlowRow steps={['Perkakasan Fizikal', 'Hypervisor', 'VM 1 (E-mel)', 'VM 2 (Web)', 'VM 3 (Pangkalan Data)']} />
        <p className="text-sm text-slate-600 mt-4">Hypervisor bertindak sebagai pengurus antara perkakasan komputer sebenar dengan mesin maya, membahagikan sumber seperti RAM, CPU dan storan untuk digunakan oleh VM secara tersendiri.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Hypervisor Jenis 1 (Bare-metal)" icon={Server}>
          <p>Dipasang <b>terus pada perkakasan</b> tanpa sistem operasi asas.</p>
          <div className="mt-3 bg-blue-50 text-blue-800 rounded-xl p-3 text-sm font-bold">Contoh: VMware ESXi, Microsoft Hyper-V</div>
        </InfoCard>
        <InfoCard title="Hypervisor Jenis 2 (Hosted)" icon={MonitorCog}>
          <p>Dipasang <b>dalam sistem operasi yang sedia ada</b> (seperti aplikasi biasa).</p>
          <div className="mt-3 bg-orange-50 text-orange-800 rounded-xl p-3 text-sm font-bold">Contoh: VirtualBox, VMware Workstation</div>
        </InfoCard>
      </div>

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"2 Jenis Mesin Maya"} className="text-cyan-600 shrink-0" size={20} />2 Jenis Mesin Maya</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <InfoCard title="Mesin Maya Sistem (System VM)" icon={Boxes}>
            <ul className="space-y-1.5 list-disc pl-5">
              <li>Jalankan sistem operasi penuh seperti Windows atau Linux</li>
              <li>Boleh beroperasi secara bebas dari sistem asal</li>
              <li>Sesuai untuk pelayan dan cloud computing</li>
            </ul>
            <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-700">Contoh: VMware Workstation, Oracle VirtualBox, Microsoft Hyper-V</div>
          </InfoCard>
          <InfoCard title="Mesin Maya Proses (Process VM)" icon={Box}>
            <ul className="space-y-1.5 list-disc pl-5">
              <li>Hanya jalankan satu aplikasi sahaja</li>
              <li>Lebih ringan dan pantas</li>
              <li>Tidak memerlukan sistem operasi penuh</li>
            </ul>
            <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-700">Contoh: Java Virtual Machine (JVM), .NET CLR</div>
          </InfoCard>
        </div>
      </div>

      <NotaPenting>
        Satu pelayan fizikal boleh mempunyai VM untuk pelayan e-mel, VM lain untuk pelayan web, dan satu lagi untuk pangkalan data - <b>semuanya dalam satu mesin fizikal</b>. Ini amat menjimatkan kos dan ruang berbanding membeli pelayan fizikal berasingan untuk setiap perkhidmatan.
      </NotaPenting>

      <Ringkasan>
        VM disimulasikan oleh <b>Hypervisor</b> (Jenis 1 bare-metal atau Jenis 2 hosted). Dua jenis VM: <b>System VM</b> (jalankan OS penuh) dan <b>Process VM</b> (jalankan satu aplikasi sahaja seperti JVM). VM sangat berguna dalam pusat data untuk menjimatkan kos & ruang fizikal.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 3: PEMASANGAN & PENYUSUNAN PERKAKASAN ---------------- */
function AssemblyNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Persediaan Lokasi & Peralatan" icon={Wrench}>
        <p>Langkah awal pemasangan pelayan adalah memastikan lokasi kerja selamat dan bersih. Kawasan kerja mesti bebas daripada habuk dan cas statik kerana komponen elektronik sangat sensitif.</p>
        <div className="grid sm:grid-cols-2 gap-3 mt-4 text-sm">
          <div className="rounded-xl bg-cyan-50 border border-cyan-200 p-3"><b className="text-cyan-800">Tali Anti-Statik</b><p className="mt-1 text-cyan-900">Wajib digunakan & disambung ke permukaan pembumian untuk elak kerosakan cas statik.</p></div>
          <div className="rounded-xl bg-cyan-50 border border-cyan-200 p-3"><b className="text-cyan-800">Peralatan Asas</b><p className="mt-1 text-cyan-900">Pemutar skru pelbagai saiz, lampu suluh, dan manual pengguna setiap komponen.</p></div>
        </div>
      </InfoCard>

      <InfoCard title="Rak Pelayan (Server Rack)" icon={Server}>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Lebar piawai</b><p className="mt-1">19 inci</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Unit ketinggian</b><p className="mt-1">Rack Unit (U)</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Rel gelangsar</b><p className="mt-1">Memudahkan pelayan ditarik keluar/masuk untuk penyelenggaraan</p></div>
        </div>
        <p className="mt-3">Peralatan berat perlu dipasang pada bahagian bawah rak untuk mengekalkan kestabilan; peralatan ringan (switch/patch panel) di bahagian atas. Ruang hadapan-belakang perlu dikekalkan untuk aliran udara.</p>
      </InfoCard>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Pengurusan Kuasa" icon={PlugZap}>
          <ul className="space-y-1.5 list-disc pl-5">
            <li><b>PDU (Power Distribution Unit)</b> - agihkan kuasa kepada peralatan dalam rak</li>
            <li><b>UPS</b> - kuasa sandaran semasa gangguan bekalan elektrik</li>
          </ul>
        </InfoCard>
        <InfoCard title="Pengurusan Kabel" icon={Cable}>
          <ul className="space-y-1.5 list-disc pl-5">
            <li>Gunakan <b>cable ties</b> untuk kabel kemas & aliran udara lancar</li>
            <li>Asingkan kabel kuasa &amp; data - elak gangguan elektromagnet (EMI)</li>
            <li><b>Cable management arm</b> - kabel bergerak bersama pelayan semasa ditarik keluar</li>
            <li>Label setiap kabel untuk memudahkan penyelenggaraan masa hadapan</li>
          </ul>
        </InfoCard>
      </div>

      <NotaPenting>
        Pemasangan motherboard ke casis mesti menggunakan <b>standoff (penyangga)</b> untuk mengelakkan sentuhan langsung dengan logam casis - kelalaian ini boleh menyebabkan <b>litar pintas (short circuit)</b> yang merosakkan komponen apabila pelayan dihidupkan.
      </NotaPenting>

      <Ringkasan>
        Pemasangan pelayan bermula dengan persediaan lokasi bebas habuk/statik, guna rak 19 inci dengan pengurusan haba &amp; kuasa (PDU/UPS) yang betul, serta pengurusan kabel kemas (cable ties, label, cable management arm) untuk memudahkan penyelenggaraan jangka panjang.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 4: SAMBUNGAN KOMPONEN & SISTEM PENYEJUKAN ---------------- */
function ConnectionsNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Sambungan Komponen Storan" icon={Cable}>
        <p>Jenis kabel yang digunakan bergantung kepada teknologi dan kelajuan pemindahan data yang disokong.</p>
        <div className="grid sm:grid-cols-3 gap-3 mt-4 text-sm">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>IDE / ATA</b><p className="mt-1">Integrated Drive Electronics - teknologi lama</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>SATA</b><p className="mt-1">Sambungan storan standard moden</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>NVMe</b><p className="mt-1">Kelajuan pemindahan data lebih tinggi berbanding SATA</p></div>
        </div>
      </InfoCard>

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"Sistem Pengurusan Penyejukan CPU"} className="text-cyan-600 shrink-0" size={20} />Sistem Pengurusan Penyejukan CPU</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <InfoCard title="Penyejukan Udara (Air Cooling)" icon={Fan}>
            <p>Menggunakan kipas dan heatsink - haba daripada CPU dipindahkan ke heatsink dan disejukkan oleh kipas.</p>
            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2"><b>+ Kos rendah, mudah dipasang &amp; disenggara</b></div>
              <div className="rounded-lg bg-rose-50 border border-rose-200 p-2"><b>- Kurang berkesan sistem berprestasi tinggi, lebih bunyi</b></div>
            </div>
          </InfoCard>
          <InfoCard title="Penyejukan Cecair (Liquid Cooling)" icon={Snowflake}>
            <p>Menggunakan cecair penyejuk, pam, radiator dan tiub - cecair menyerap haba CPU dan dialirkan ke radiator.</p>
            <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2"><b>+ Lebih senyap, efisien untuk sistem berkuasa tinggi</b></div>
              <div className="rounded-lg bg-rose-50 border border-rose-200 p-2"><b>- Kos tinggi, pemasangan rumit, perlu penyelenggaraan</b></div>
            </div>
          </InfoCard>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2"><HeadingIcon text={"Susunan Pemasangan Komponen Pelayan"} className="text-cyan-600 shrink-0" size={18} />Susunan Pemasangan Komponen Pelayan</h4>
        <FlowVertical steps={['i. Papan Induk (Motherboard)', 'ii. Pemproses (CPU)', 'iii. Sistem Penyejukan', 'iv. Memori (RAM)', 'v. Storan (HDD/SSD)', 'vi. Bekalan Kuasa (PSU)']} />
      </div>

      <InfoCard title="Butiran Penting Setiap Langkah" icon={Cpu}>
        <ul className="space-y-2 list-disc pl-5">
          <li><b>Motherboard:</b> gunakan standoff, pastikan penjajaran lubang skru betul.</li>
          <li><b>CPU:</b> pegang pada tepi sahaja, jajarkan mengikut tanda segi tiga kecil, kunci dengan tuil.</li>
          <li><b>Penyejukan:</b> sapukan thermal paste secukupnya sebelum pasang heatsink untuk pengaliran haba efisien.</li>
          <li><b>RAM:</b> ikut susunan slot dalam manual (konfigurasi dual-channel), tekan sehingga bunyi &lsquo;klik&rsquo;.</li>
          <li><b>Storan:</b> masuk ke tray/rel khas, sambung kabel SATA atau NVMe.</li>
        </ul>
      </InfoCard>

      <Ringkasan>
        Sambungan storan berkembang dari IDE/ATA ke SATA/NVMe (lebih pantas). Penyejukan CPU guna <b>Air Cooling</b> (murah, mudah) atau <b>Liquid Cooling</b> (senyap, efisien tapi mahal). Pemasangan komponen ikut susunan tetap: Motherboard &rarr; CPU &rarr; Penyejukan &rarr; RAM &rarr; Storan &rarr; PSU.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 5: PEMERIKSAAN, PENGUJIAN PERKAKASAN & RAID ---------------- */
function TestingNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="i. Pemeriksaan Fizikal" icon={CheckCircle}>
          <p>Pastikan semua komponen (RAM, CPU, kad tambahan, kabel) terpasang kemas dan tidak longgar. Susun kabel rapi menggunakan cable ties untuk aliran udara lancar.</p>
        </InfoCard>
        <InfoCard title="ii. Pemeriksaan Keselamatan" icon={Shield}>
          <p>Pastikan tiada objek logam kecil (skru tertinggal) di dalam casis - boleh menyebabkan litar pintas. Semak tiada kabel terjepit atau terputus menggunakan lampu suluh.</p>
        </InfoCard>
      </div>

      <InfoCard title="iii. Ujian Kuasa (Power-On Test)" icon={Power}>
        <ul className="space-y-1.5 list-disc pl-5">
          <li>Hidupkan suis bekalan kuasa dan tekan butang kuasa pelayan.</li>
          <li>Perhatikan sistem berjaya memaparkan skrin BIOS/UEFI (tanda komponen dikesan berfungsi).</li>
          <li>Periksa semua kipas berputar lancar tanpa bunyi luar biasa (geseran/ketukan/dengungan).</li>
        </ul>
      </InfoCard>

      <InfoCard title="iv. Ujian Diagnostik" icon={TestTube}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>MemTest86</b><p className="mt-1 text-xs">Uji RAM, pastikan tiada ralat memori</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Prime95 / Intel Diagnostic</b><p className="mt-1 text-xs">Uji kestabilan &amp; suhu CPU</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>CrystalDiskInfo / SMART</b><p className="mt-1 text-xs">Nilai kesihatan HDD/SSD</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>HWMonitor</b><p className="mt-1 text-xs">Pantau suhu sistem keseluruhan</p></div>
        </div>
        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-sm font-bold text-emerald-800">Suhu selamat (idle): di bawah 70°C</div>
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-sm font-bold text-amber-800">Had suhu bawah beban: 85-90°C</div>
        </div>
      </InfoCard>

      <InfoCard title="Ujian Tekanan (Stress Test)" icon={Gauge}>
        <p>Jalankan gabungan ujian RAM, CPU dan cakera secara serentak selama beberapa jam untuk mensimulasikan penggunaan berat. Perhatikan tindak balas sistem, kestabilan suhu, serta tiada &lsquo;crash&rsquo; atau ralat - membantu kenal pasti masalah awal sebelum pelayan digunakan sebenar.</p>
      </InfoCard>

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"RAID (Redundant Array of Independent Disks)"} className="text-cyan-600 shrink-0" size={20} />RAID (Redundant Array of Independent Disks)</h3>
        <NotesTable
          headers={['Jenis RAID', 'Ciri']}
          rows={[
            ['RAID 0', 'Gabung storan untuk prestasi tinggi, tetapi tiada keselamatan data'],
            ['RAID 1', 'Cermin (mirror) dua cakera untuk keselamatan - jika satu rosak, data masih ada'],
            ['RAID 5 / 10', 'Gabungan prestasi dan redundansi data'],
          ]}
        />
        <p className="text-sm text-slate-600 mt-3">Boleh dikonfigurasi melalui <b>BIOS/UEFI</b> (software RAID) atau <b>RAID controller</b> (hardware RAID - lebih stabil &amp; berprestasi tinggi).</p>
      </div>

      <InfoCard title="Format & Partition Cakera" icon={HardDrive}>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Windows</b><p className="mt-1">diskpart atau Disk Management &rarr; sistem fail NTFS</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Linux</b><p className="mt-1">fdisk, parted, atau gparted &rarr; sistem fail ext4/XFS</p></div>
        </div>
      </InfoCard>

      <Ringkasan>
        Selepas pemasangan: <b>Pemeriksaan Fizikal &rarr; Keselamatan &rarr; Ujian Kuasa &rarr; Ujian Diagnostik &rarr; Stress Test (jika perlu)</b>. Storan dikonfigurasi RAID (0/1/5/10) mengikut keperluan prestasi/keselamatan, kemudian dipartisi &amp; diformat (NTFS untuk Windows, ext4/XFS untuk Linux).
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 6: PERISIAN SISTEM OPERASI SERVER ---------------- */
function OsNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Perisian Sistem Operasi Server" icon={MonitorCog}>
        <p>OS server ialah perisian direka khas untuk menguruskan operasi server dalam rangkaian - berbeza daripada OS PC biasa kerana perlu menyokong ramai pengguna, beroperasi 24/7, dan menyediakan perkhidmatan kritikal.</p>
      </InfoCard>

      <InfoCard title="Fungsi Sistem Operasi Server" icon={Settings}>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Pengurusan Perkakasan</b><p className="mt-1 text-xs">Pengantara antara perkakasan &amp; perisian, sediakan drivers</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Pengurusan Fail</b><p className="mt-1 text-xs">Susun/simpan data, kebenaran akses, NTFS/EXT4</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Pengurusan Proses</b><p className="mt-1 text-xs">Jalankan beratus proses serentak (Apache, MySQL, dll)</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Perkhidmatan Rangkaian</b><p className="mt-1 text-xs">DNS, DHCP, FTP, HTTP, SMB, NFS</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Keselamatan Sistem</b><p className="mt-1 text-xs">Firewall, akaun pengguna, 2FA, enkripsi, log</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Pengurusan Pengguna</b><p className="mt-1 text-xs">Cipta akaun/kumpulan, RBAC</p></div>
        </div>
      </InfoCard>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="font-black text-slate-900">Windows Server</p>
          <p className="text-xs text-slate-500 mt-1">2022 / 2019, Active Directory</p>
          <p className="text-sm text-slate-600 mt-2">GUI mesra pengguna, sokongan rasmi Microsoft, integrasi SQL Server/Exchange.</p>
          <div className="mt-2 text-xs text-rose-700">Kos lesen tinggi, kurang fleksibel</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="font-black text-slate-900">Linux</p>
          <p className="text-xs text-slate-500 mt-1">Ubuntu, RHEL, CentOS, Debian</p>
          <p className="text-sm text-slate-600 mt-2">CLI, sokong Apache/NGINX/MySQL/Docker, tiada kos lesen, stabil.</p>
          <div className="mt-2 text-xs text-rose-700">Perlu kemahiran teknikal</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="font-black text-slate-900">UNIX</p>
          <p className="text-xs text-slate-500 mt-1">IBM AIX, HP-UX, Oracle Solaris</p>
          <p className="text-sm text-slate-600 mt-2">Sangat stabil &amp; selamat, sesuai server misi kritikal skala besar.</p>
          <div className="mt-2 text-xs text-rose-700">Sukar untuk pengguna biasa, kos tinggi</div>
        </div>
      </div>

      <Ringkasan>
        OS server (Windows Server/Linux/UNIX) menguruskan perkakasan, fail, proses, perkhidmatan rangkaian (DNS/DHCP), keselamatan dan pengguna. Pilihan bergantung keperluan: <b>Windows Server</b> untuk kemudahan GUI &amp; ekosistem Microsoft, <b>Linux</b> untuk kos rendah &amp; fleksibiliti, <b>UNIX</b> untuk misi kritikal berskala besar.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 7: PROSEDUR INSTALASI & PENYELENGGARAAN OS SERVER ---------------- */
function InstallNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Prosedur Pemasangan OS Server" icon={History}>
        <p>Prosedur ini bukan sahaja melibatkan pemasangan teknikal, tetapi juga strategi memastikan operasi server berjalan lancar dan boleh dipercayai dalam jangka masa panjang.</p>
      </InfoCard>

      <FlowVertical steps={['i. Persediaan Awal (perkakasan, media USB/DVD, konfigurasi rangkaian)', 'ii. Pemasangan Sistem Pengendalian (boot, partition, bahasa, akaun)', 'iii. Konfigurasi Selepas Pemasangan (IP statik, domain, update, peranan server)', 'iv. Pemasangan Secara Maya (VMware/Hyper-V, jika berkenaan)']} />

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Persediaan Awal" icon={ClipboardCheck}>
          <ul className="space-y-1.5 list-disc pl-5">
            <li>Semak perkakasan (CPU, RAM, ruang cakera)</li>
            <li>Sediakan media (USB/DVD bootable dengan fail ISO)</li>
            <li>Rancang pemilihan jenis OS yang sesuai</li>
          </ul>
        </InfoCard>
        <InfoCard title="Konfigurasi Selepas Pemasangan" icon={Settings}>
          <ul className="space-y-1.5 list-disc pl-5">
            <li>Tetapkan IP statik, DNS, default gateway</li>
            <li>Sambung LAN &amp; uji ping ke gateway/server lain</li>
            <li>Pasang peranan server (DNS, DHCP, Active Directory)</li>
            <li>Konfigurasikan firewall &amp; tetapan keselamatan</li>
          </ul>
        </InfoCard>
      </div>

      <NotaPenting>
        Pemasangan OS server perlu <b>clean install</b> (pemasangan bersih) supaya tiada fail sistem lama bercampur. Dalam persekitaran moden, banyak server dipasang secara maya menggunakan VMware/Hyper-V - OS dipasang pada VM yang telah ditetapkan spesifikasinya (saiz cakera maya, RAM, dll) terlebih dahulu.
      </NotaPenting>

      <InfoCard title="Penyelenggaraan & Pengurusan Server" icon={Wrench}>
        <p>Penjagaan selepas pemasangan OS penting untuk prestasi konsisten, kebolehpercayaan dan keselamatan sistem.</p>
        <div className="mt-4 grid sm:grid-cols-2 gap-2">
          {['Pantau prestasi sistem & penggunaan sumber', 'Jalankan kemas kini perisian secara berkala', 'Backup data penting secara automatik', 'Semak log keselamatan dan sistem', 'Kaji polisi akses dan keselamatan', 'Gunakan alat pengurusan (Admin Center/Webmin)'].map((item) => (
            <div key={item} className="flex items-start gap-2 rounded-xl bg-slate-50 border border-slate-200 p-3 text-sm">
              <CheckCircle size={16} className="text-cyan-600 shrink-0 mt-0.5" /> {item}
            </div>
          ))}
        </div>
        <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-3"><b className="text-blue-800">Windows Admin Center</b><p className="mt-1 text-blue-900">Alat pengurusan untuk Windows Server</p></div>
          <div className="rounded-xl bg-orange-50 border border-orange-200 p-3"><b className="text-orange-800">Cockpit / Webmin</b><p className="mt-1 text-orange-900">Alat pengurusan untuk Linux</p></div>
        </div>
      </InfoCard>

      <Ringkasan>
        4 fasa pemasangan OS server: <b>Persediaan &rarr; Pemasangan &rarr; Konfigurasi Selepas Pemasangan &rarr; (Virtualisasi jika berkenaan)</b>. Penyelenggaraan berterusan (kemas kini, backup, semakan log) penting untuk kestabilan &amp; keselamatan jangka panjang, dibantu alat seperti Windows Admin Center atau Webmin.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 8: PENGUJIAN PERISIAN OS PELAYAN ---------------- */
function OsTestingNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Kepentingan Pengujian Perisian OS Server" icon={ClipboardCheck}>
        <p>Pengujian perisian sistem operasi pelayan memastikan OS berfungsi dengan stabil, selamat dan mengikut keperluan <b>sebelum</b> digunakan dalam persekitaran produksi sebenar - mengesan dan membetulkan masalah lebih awal untuk mengelakkan gangguan perkhidmatan sebenar.</p>
      </InfoCard>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon: CheckCircle, title: 'Ujian Fungsian', d: 'Menyemak sama ada semua fungsi asas OS server berjalan seperti dirancang.' },
          { icon: Gauge, title: 'Ujian Prestasi', d: 'Menilai kelajuan dan kecekapan OS server di bawah beban kerja tertentu.' },
          { icon: Shield, title: 'Ujian Keselamatan', d: 'Menyemak sama ada OS server terdedah kepada ancaman/kelemahan keselamatan.' },
          { icon: GitBranch, title: 'Ujian Kebolehskalaan', d: 'Menilai keupayaan OS menampung peningkatan beban kerja/bilangan pengguna.' },
          { icon: Zap, title: 'Ujian Tekanan', d: 'Mensimulasikan penggunaan melampau untuk lihat had ketahanan sistem.' },
        ].map((item) => (
          <div key={item.title} className="srv-card rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="srv-card-icon w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-700 mb-3"><item.icon size={19} /></div>
            <p className="font-black text-slate-900 text-sm">{item.title}</p>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{item.d}</p>
          </div>
        ))}
      </div>

      <InfoCard title="Apa yang Perlu Diuji Selepas Pemasangan OS" icon={ListChecks}>
        <ul className="space-y-2 list-disc pl-5">
          <li>Perkhidmatan rangkaian (DNS/DHCP/perkongsian fail) - pastikan berfungsi & boleh diakses client</li>
          <li>Akaun pengguna dan kebenaran akses (RBAC) - sahkan kawalan akses berfungsi seperti dikonfigurasikan</li>
          <li>Penggunaan CPU, memori, storan dan kestabilan sistem di bawah beban kerja tinggi</li>
        </ul>
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2"><HeadingIcon text={"Alur Pengujian OS Server"} className="text-cyan-600 shrink-0" size={18} />Alur Pengujian OS Server</h4>
        <FlowRow steps={['Fungsian', 'Prestasi', 'Keselamatan', 'Kebolehskalaan', 'Tekanan', 'Sedia Produksi']} />
      </div>

      <NotaPenting>
        Pengujian OS server perlu dijalankan <b>secara berulang</b> (bukan sekali sahaja) sepanjang hayat operasi pelayan, kerana konfigurasi, beban kerja dan ancaman keselamatan berubah dari semasa ke semasa - memerlukan pengesahan berterusan.
      </NotaPenting>

      <Ringkasan>
        5 jenis pengujian OS server: <b>Fungsian, Prestasi, Keselamatan, Kebolehskalaan,</b> dan <b>Tekanan</b>. Semua perlu lulus - termasuk ujian perkhidmatan rangkaian dan RBAC - sebelum pelayan digunakan dalam persekitaran produksi sebenar, dan diulang secara berkala sepanjang hayat operasi.
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
  const [activeQuestions, setActiveQuestions] = useState(() => shuffleQuestions(ikr3093QuizSets[0].questions));

  const currentSet = ikr3093QuizSets[kpIndex];
  const passScore = 18;

  const score = useMemo(() => activeQuestions.reduce((total, question, index) => total + (answers[index] === question.options.indexOf(question.correct) ? 1 : 0), 0), [answers, activeQuestions]);

  const retryLevel = () => {
    setAnswers({});
    setSubmitted(false);
    setActiveQuestions(shuffleQuestions(ikr3093QuizSets[kpIndex].questions));
  };

  const nextKp = () => {
    if (score >= passScore && kpIndex < ikr3093QuizSets.length - 1) {
      const nextIndex = kpIndex + 1;
      setHighestKp(previous => Math.max(previous, nextIndex));
      setKpIndex(nextIndex);
      setAnswers({});
      setSubmitted(false);
      setActiveQuestions(shuffleQuestions(ikr3093QuizSets[nextIndex].questions));
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
            <div className="text-xs font-black uppercase tracking-[.2em] text-cyan-700">Tahap Kuiz</div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{currentSet.code} - {currentSet.title}</h2>
            <p className="text-sm text-slate-600 mt-2">Setiap KP mengandungi 30 soalan. Lulus minimum ialah 18/30.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ikr3093QuizSets.map((item, index) => (
              <button key={item.id} disabled={index > highestKp || (index === kpIndex && submitted && score < passScore)} onClick={() => {
                if (index <= highestKp) {
                  setKpIndex(index);
                  setAnswers({});
                  setSubmitted(false);
                  setActiveQuestions(shuffleQuestions(ikr3093QuizSets[index].questions));
                }
              }} className={`rounded-full px-4 py-2 text-xs font-black border ${index === kpIndex ? 'bg-cyan-600 border-cyan-600 text-white' : 'bg-white border-slate-300 text-slate-700'} ${index > highestKp ? 'opacity-50 cursor-not-allowed' : ''}`}>{item.code}</button>
            ))}
          </div>
        </div>
      </div>

      {submitted && (
        <div className={`rounded-2xl p-6 mb-6 text-white ${score >= passScore ? 'bg-emerald-600' : 'bg-rose-600'}`}>
          <div className="flex items-center gap-3"><Award size={34} /><div><p className="text-sm font-bold opacity-90">Keputusan {currentSet.code}</p><h2 className="text-3xl font-black">{score} / {activeQuestions.length}</h2></div></div>
          <p className="mt-3 font-medium">
            {score >= passScore
              ? `Lulus ${currentSet.code}. Anda layak ${kpIndex < ikr3093QuizSets.length - 1 ? 'naik ke ' + ikr3093QuizSets[kpIndex + 1].code : 'menamatkan semua KP'}.`
              : `Belum lulus. Markah minimum ialah 18/30 - sila ulang ${currentSet.code} sebelum naik ke tahap seterusnya.`}
          </p>
        </div>
      )}

      <div className="space-y-5">
        {activeQuestions.map((question, index) => (
          <article key={`${currentSet.id}-${index}-${question.question}`} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-black text-slate-900"><span className="text-cyan-600 mr-2">{index + 1}.</span>{question.question}</h3>
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
                    className={`text-left p-3 rounded-xl border text-sm font-medium transition-all ${correct ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : wrong ? 'border-rose-500 bg-rose-50 text-rose-800' : selected ? 'border-cyan-500 bg-cyan-50 text-cyan-800' : 'border-slate-200 hover:border-cyan-300'}`}
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
          <button disabled={Object.keys(answers).length !== activeQuestions.length} onClick={handleSubmit} className="flex-1 bg-cyan-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-black hover:bg-cyan-700 transition-colors">Hantar Jawapan {currentSet.code}</button>
        ) : (
          <>
            {score >= passScore && kpIndex < ikr3093QuizSets.length - 1 && (
              <button onClick={nextKp} className="flex-1 bg-emerald-600 text-white px-6 py-4 rounded-xl font-black hover:bg-emerald-700">Naik ke {ikr3093QuizSets[kpIndex + 1].code}</button>
            )}
            <button onClick={retryLevel} className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-xl font-black hover:bg-slate-800"><RotateCcw size={19} /> Cuba Semula {currentSet.code}</button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- KOMPONEN UTAMA ---------------- */
export default function IKR3093({ onBackToPortal }) {
  const [view, setView] = useState('menu');
  const [readState, setReadState] = useState(() => {
    const fallback = [false, false, false, false, false, false, false, false];
    try {
      const saved = JSON.parse(localStorage.getItem('ikr3093-read-state'));
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
    try { localStorage.setItem('ikr3093-read-state', JSON.stringify(fallback)); } catch { /* storan tidak tersedia */ }
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
    try { localStorage.setItem('ikr3093-read-state', JSON.stringify(nextReadState)); } catch { /* storan tidak tersedia */ }
    const nextInLine = sections[requested + 1];
    if (nextInLine) setView(nextInLine.id);
  };

  if (view !== 'menu') {
    const content = {
      intro: <IntroNotes />,
      vm: <VmNotes />,
      assembly: <AssemblyNotes />,
      connections: <ConnectionsNotes />,
      testing: <TestingNotes />,
      os: <OsNotes />,
      install: <InstallNotes />,
      ostesting: <OsTestingNotes />,
      quiz: <Quiz />,
    }[view];

    const showCompleteButton = sections.some((section) => section.id === view);
    const headerMeta = sections.find((section) => section.id === view) || featureCards.find((f) => f.id === view) || sections[0];

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <ServerAnimStyles />
        <div className="bg-slate-950 text-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Server size={30} className="text-cyan-300" />
                <div>
                  <div className="text-[10px] uppercase tracking-[.2em] text-cyan-300 font-black">Server Essentials</div>
                  <div className="text-sm font-black">{completedCount}/{sections.length} bahagian</div>
                </div>
              </div>
              <div className="flex-1 max-w-md">
                <div className="flex items-center justify-between text-[10px] font-black tracking-[.18em] text-cyan-200 uppercase"><span>Progress</span><span>{progressPercent}%</span></div>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-300 transition-all" style={{ width: `${progressPercent}%` }} /></div>
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
        <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">IKR3093 Server Essentials - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>
      </div>
    );
  }

  return (
    <div className="course-menu-page min-h-screen bg-slate-50 text-slate-900">
      <ServerAnimStyles />
      <ModuleMenu title="Modul IKR3093: Server Essentials" icon={sections[0].icon} secondaryIcon={sections[1].icon}
        onBack={onBackToPortal} topics={sections} read={readState} onTopic={section => openSection(section.id)} onReset={resetProgress}
        description={<>Senibina pelayan, mesin maya &amp; hypervisor, pemasangan perkakasan, sistem penyejukan, pengujian &amp; RAID, perisian OS server, prosedur instalasi dan pengujian OS - dipecahkan kepada 8 bahagian, lengkap dengan kuiz 180 soalan.</>}>
        <ModuleActivities activities={featureCards} quizLocked={!readState[sections.length - 1]} onOpen={openSection} />
      </ModuleMenu>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">IKR3093 Server Essentials - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>
    </div>
  );
}
