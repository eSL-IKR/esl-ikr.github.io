import ModuleMenu, { ModuleActivities } from './ModuleMenu';
import { useMemo, useState } from 'react';
import { ikr3063QuizSets } from './IKR3063QuizData.js';
import HeadingIcon from './headingIcons';
import {
  ArrowLeft,
  ArrowRightLeft,
  Award,
  Cable,
  CheckCircle,
  ChevronRight,
  CircleDot,
  GitFork,
  Home,
  KeyRound,
  Layers,
  ListChecks,
  ListTree,
  Lock,
  Network,
  RotateCcw,
  Scan,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Split,
  Table2,
  Terminal,
  XCircle,
  Zap,
} from 'lucide-react';

const sections = [
  { id: 'intro', title: 'Pengenalan Suis Rangkaian', desc: 'Fungsi suis, Managed vs Unmanaged Switch.', icon: Network, accent: 'blue' },
  { id: 'types', title: 'Jenis-Jenis Suis', desc: 'Layer 2 Switch vs Layer 3 Switch dan senibina dalaman suis.', icon: Layers, accent: 'indigo' },
  { id: 'methods', title: 'Kaedah Pensuisan dalam Rangkaian', desc: 'Store-and-Forward, Cut-Through, dan Fragment-Free.', icon: Split, accent: 'violet' },
  { id: 'interface', title: 'Antara Muka Suis', desc: 'Console Port, CLI, Telnet dan SSH.', icon: Terminal, accent: 'teal' },
  { id: 'config', title: 'Konfigurasi Asas Suis Rangkaian', desc: 'Kata laluan, alamat IP pengurusan, Access Port dan Trunk Port.', icon: Cable, accent: 'emerald' },
  { id: 'vlan', title: 'Pengenalan kepada VLAN', desc: 'Virtual LAN, VLAN tagging 802.1Q.', icon: GitFork, accent: 'amber' },
  { id: 'intervlan', title: 'Inter-VLAN Routing', desc: 'Komunikasi antara VLAN berbeza dan pertimbangan ACL.', icon: ArrowRightLeft, accent: 'orange' },
  { id: 'security', title: 'Keselamatan & Pengurusan Rangkaian', desc: 'Spanning Tree Protocol (STP) dan Port Security.', icon: ShieldCheck, accent: 'rose' },
];

const featureCards = [
  { id: 'quiz', target: 'quiz', title: 'Kuiz Penilaian', desc: '60 soalan (2 KP x 30 soalan). Buka setelah menyelesaikan semua 8 Nota.', icon: Award, accent: 'rose' },
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

function SwitchAnimStyles() {
  return (
    <style>{`
      @keyframes swBlink { 0%, 100% { opacity: 1; } 50% { opacity: .2; } }
      @keyframes swFlow { 0% { transform: translateX(-6px); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateX(14px); opacity: 0; } }
      @keyframes swFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes swScaleIn { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: scale(1); } }
      .sw-blink { animation: swBlink 1.3s ease-in-out infinite; }
      .sw-blink-delay { animation: swBlink 1.3s ease-in-out infinite; animation-delay: .4s; }
      .sw-flow { animation: swFlow 1.3s linear infinite; }
      .sw-entry-title { animation: swFadeUp .5s ease-out both; }
      .sw-entry-icon { animation: swScaleIn .45s ease-out both; }
      .sw-entry-subtitle { animation: swFadeUp .5s ease-out .1s both; }
      .sw-reveal { animation: swFadeUp .5s ease-out both; }
      .sw-reveal-1{animation-delay:.05s}.sw-reveal-2{animation-delay:.1s}.sw-reveal-3{animation-delay:.15s}
      .sw-reveal-4{animation-delay:.2s}.sw-reveal-5{animation-delay:.25s}.sw-reveal-6{animation-delay:.3s}
      .sw-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
      .sw-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px -8px rgba(217,119,6,.25); border-color: #fcd34d; }
      @media (prefers-reduced-motion: reduce) {
        .sw-blink, .sw-blink-delay, .sw-flow, .sw-entry-title, .sw-entry-icon, .sw-entry-subtitle, .sw-reveal, .sw-card { animation: none !important; transition: none !important; }
        .sw-card:hover { transform: none; }
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
          <div className={`p-3 rounded-2xl border border-white/15 ${style.icon} sw-entry-icon`}><Icon size={28} className="text-white" /></div>
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight sw-entry-title">{title}</h1>
            <p className="text-slate-300 mt-2 max-w-3xl text-sm md:text-base sw-entry-subtitle">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, children, icon: Icon = CircleDot }) {
  return (
    <article className="sw-card sw-reveal bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
      <h3 className="font-black text-slate-900 text-lg flex items-center gap-2 mb-3"><Icon size={20} className="text-amber-600" /> {title}</h3>
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
      <ListChecks size={22} className="text-amber-300 shrink-0 mt-0.5" />
      <div><p className="text-xs font-black uppercase tracking-wide text-amber-300 mb-1">Ringkasan</p><div className="text-sm text-slate-100 leading-relaxed">{children}</div></div>
    </div>
  );
}

function NotesTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm">
        <thead><tr className="bg-amber-50 text-amber-900">{headers.map((h) => <th key={h} className="text-left font-black p-3 md:p-4">{h}</th>)}</tr></thead>
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
          <span className="rounded-xl bg-white border border-amber-200 text-amber-900 text-xs md:text-sm font-black px-3 py-2">{step}</span>
          {i < steps.length - 1 && <ChevronRight size={16} className="text-amber-400 shrink-0" />}
        </div>
      ))}
    </div>
  );
}

function CodeBlock({ children }) {
  return <pre className="bg-slate-950 text-emerald-300 rounded-xl p-4 text-xs md:text-sm overflow-x-auto font-mono">{children}</pre>;
}

/* ---------------- NOTA 1: PENGENALAN SUIS ---------------- */
function IntroNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Apakah Suis (Switch) Rangkaian?" icon={Network}>
        <p>Suis ialah peranti rangkaian yang menghubungkan pelbagai peranti (komputer, pencetak, AP) dalam satu Local Area Network (LAN) dan menghantar data (frame) berdasarkan <b>alamat MAC</b> peranti destinasi - jauh lebih pintar berbanding hub yang menghantar data ke semua port.</p>
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-8 shadow-sm">
        <h4 className="font-black text-slate-900 mb-6 flex items-center gap-2"><HeadingIcon text={"Suis Menghubungkan Pelbagai Peranti dalam LAN"} className="text-amber-600 shrink-0" size={18} />Suis Menghubungkan Pelbagai Peranti dalam LAN</h4>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex flex-col gap-2">
            {['PC 1', 'PC 2', 'PC 3'].map((pc) => (
              <div key={pc} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-700">{pc}</div>
            ))}
          </div>
          <div className="relative flex items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 sw-blink absolute -top-3" />
            <ChevronRight size={20} className="text-amber-400" />
          </div>
          <div className="rounded-2xl bg-amber-600 text-white px-6 py-4 font-black flex items-center gap-2"><Network size={20} /> SUIS</div>
          <ChevronRight size={20} className="text-amber-400" />
          <div className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-700">Pencetak / Server</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Unmanaged Switch" icon={Cable}>
          <ul className="space-y-1.5 list-disc pl-5">
            <li>Plug-and-play - tiada konfigurasi diperlukan</li>
            <li>Kos rendah, mudah digunakan</li>
            <li>Sesuai rangkaian kecil (rumah/pejabat kecil)</li>
          </ul>
        </InfoCard>
        <InfoCard title="Managed Switch" icon={Terminal}>
          <ul className="space-y-1.5 list-disc pl-5">
            <li>Boleh dikonfigurasi: VLAN, SNMP, QoS</li>
            <li>Kawalan &amp; pemantauan lebih terperinci</li>
            <li>Sesuai rangkaian organisasi/enterprise</li>
          </ul>
        </InfoCard>
      </div>

      <NotaPenting>
        Pemilihan antara Managed dan Unmanaged Switch bergantung kepada <b>keperluan pengurusan rangkaian</b>. Rangkaian kecil tanpa keperluan VLAN/pemantauan cukup dengan Unmanaged Switch (lebih kos-efektif); rangkaian organisasi yang memerlukan kawalan terperinci wajib menggunakan Managed Switch.
      </NotaPenting>

      <Ringkasan>
        Suis menghubungkan peranti dalam LAN menggunakan alamat MAC. <b>Unmanaged Switch</b> (plug-and-play, murah) sesuai rangkaian kecil; <b>Managed Switch</b> (boleh konfigurasi VLAN/SNMP/QoS) sesuai rangkaian organisasi yang memerlukan kawalan lebih terperinci.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 2: JENIS-JENIS SUIS ---------------- */
function TypesNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Layer 2 Switch" icon={Layers}>
          <p>Beroperasi pada <b>Lapisan 2 (Data Link)</b> model OSI - membuat keputusan penghantaran frame berdasarkan alamat MAC sahaja.</p>
          <div className="mt-3 bg-blue-50 text-blue-800 rounded-xl p-3 text-sm font-bold">Sesuai: rangkaian LAN asas dalam satu VLAN/segmen</div>
        </InfoCard>
        <InfoCard title="Layer 3 Switch" icon={ArrowRightLeft}>
          <p>Menggabungkan fungsi suis dengan keupayaan <b>routing</b> (Lapisan 3) - boleh menghalakan trafik antara VLAN/rangkaian pada kelajuan wayar (wire-speed).</p>
          <div className="mt-3 bg-orange-50 text-orange-800 rounded-xl p-3 text-sm font-bold">Sesuai: rangkaian besar dengan pelbagai VLAN</div>
        </InfoCard>
      </div>

      <div>
        <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2"><HeadingIcon text={"Senibina Dalaman Suis"} className="text-amber-600 shrink-0" size={20} />Senibina Dalaman Suis</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { name: 'Backplane', d: 'Membolehkan pemindahan data pantas antara port-port dalam suis.' },
            { name: 'Forwarding Engine', d: 'Tentukan port destinasi berdasarkan jadual alamat MAC.' },
            { name: 'Buffer Memory', d: 'Simpan frame sementara semasa kesesakan trafik.' },
            { name: 'Control Plane', d: 'Urus operasi kawalan seperti STP & pembelajaran MAC.' },
          ].map((c) => (
            <div key={c.name} className="rounded-xl bg-slate-50 border border-slate-200 p-3">
              <p className="font-black text-slate-900 text-sm">{c.name}</p>
              <p className="text-xs text-slate-600 mt-1.5">{c.d}</p>
            </div>
          ))}
        </div>
      </div>

      <NotesTable
        headers={['Ciri', 'Layer 2 Switch', 'Layer 3 Switch']}
        rows={[
          ['Lapisan OSI', 'Data Link (Lapisan 2)', 'Network (Lapisan 3)'],
          ['Keputusan Penghantaran', 'Alamat MAC sahaja', 'Alamat MAC + Alamat IP'],
          ['Routing antara VLAN', 'Tidak boleh', 'Boleh (wire-speed)'],
          ['Kos', 'Lebih rendah', 'Lebih tinggi'],
        ]}
      />

      <Ringkasan>
        <b>Layer 2 Switch</b> beroperasi pada alamat MAC sahaja - sesuai LAN asas. <b>Layer 3 Switch</b> tambah keupayaan routing untuk Inter-VLAN Routing pada kelajuan wayar. Senibina dalaman suis (Backplane, Forwarding Engine, Buffer Memory, Control Plane) bekerja bersama memproses dan menghantar frame dengan pantas.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 3: KAEDAH PENSUISAN ---------------- */
function MethodsNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="3 Kaedah Pensuisan (Switching Methods)" icon={Split}>
        <p>Kaedah pensuisan menentukan bagaimana suis memproses dan menghantar frame yang diterima - setiap kaedah memberi pertukaran (trade-off) antara kelajuan dan ketepatan.</p>
      </InfoCard>

      <div className="grid md:grid-cols-3 gap-4">
        <InfoCard title="Store-and-Forward" icon={ListTree}>
          <p className="text-sm">Tunggu <b>keseluruhan frame</b> diterima dan semak ralat sebelum dihantar.</p>
          <div className="mt-3 grid grid-cols-1 gap-2 text-xs">
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2">+ Paling tepat, kesan ralat</div>
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-2">- Paling perlahan</div>
          </div>
        </InfoCard>
        <InfoCard title="Cut-Through" icon={Zap}>
          <p className="text-sm">Terus hantar sebaik sahaja <b>alamat destinasi</b> dibaca (tanpa tunggu keseluruhan frame).</p>
          <div className="mt-3 grid grid-cols-1 gap-2 text-xs">
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2">+ Paling pantas</div>
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-2">- Tiada semakan ralat</div>
          </div>
        </InfoCard>
        <InfoCard title="Fragment-Free" icon={ShieldAlert}>
          <p className="text-sm">Semak <b>64 byte pertama</b> sahaja (had collision) sebelum menghantar.</p>
          <div className="mt-3 grid grid-cols-1 gap-2 text-xs">
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2">+ Imbangan kelajuan & ketepatan</div>
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-2">- Tak kesan semua ralat</div>
          </div>
        </InfoCard>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2"><HeadingIcon text={"Visual Perbandingan Kelajuan vs Ketepatan"} className="text-amber-600 shrink-0" size={18} />Visual Perbandingan Kelajuan vs Ketepatan</h4>
        <div className="space-y-3">
          {[{ name: 'Cut-Through', pct: 90, tone: 'bg-amber-500' }, { name: 'Fragment-Free', pct: 60, tone: 'bg-orange-500' }, { name: 'Store-and-Forward', pct: 25, tone: 'bg-slate-500' }].map((item) => (
            <div key={item.name}>
              <div className="flex justify-between text-xs font-bold text-slate-600 mb-1"><span>{item.name}</span><span>Kelajuan relatif</span></div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full ${item.tone} rounded-full`} style={{ width: `${item.pct}%` }} /></div>
            </div>
          ))}
        </div>
      </div>

      <Ringkasan>
        <b>Store-and-Forward</b> = tepat tapi perlahan. <b>Cut-Through</b> = pantas tapi tiada semakan ralat. <b>Fragment-Free</b> = imbangan antara kedua-duanya (semak 64 byte pertama sahaja). Pilihan bergantung keperluan aplikasi - masa nyata (Cut-Through) vs ketepatan data (Store-and-Forward).
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 4: ANTARA MUKA SUIS ---------------- */
function InterfaceNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Console Port" icon={Terminal}>
        <p>Port fizikal khas untuk konfigurasi awal suis <b>secara terus</b> (tanpa memerlukan sambungan rangkaian) menggunakan kabel console dan perisian terminal emulator (contohnya PuTTY).</p>
      </InfoCard>

      <InfoCard title="Command Line Interface (CLI)" icon={Terminal}>
        <p>Antara muka berasaskan teks untuk berinteraksi dan mengkonfigurasi suis Cisco melalui arahan.</p>
        <CodeBlock>{`Switch> enable
Switch# configure terminal
Switch(config)# hostname SW1`}</CodeBlock>
      </InfoCard>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Telnet" icon={Scan}>
          <p>Membolehkan pengurusan jauh (remote) suis melalui rangkaian.</p>
          <div className="mt-3 bg-rose-50 border border-rose-200 rounded-xl p-3 text-sm font-bold text-rose-800">⚠️ Tidak selamat - data (termasuk kata laluan) dihantar sebagai teks biasa (tidak disulitkan)</div>
        </InfoCard>
        <InfoCard title="SSH (Secure Shell)" icon={ShieldCheck}>
          <p>Alternatif selamat kepada Telnet untuk pengurusan jauh suis.</p>
          <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-sm font-bold text-emerald-800">✅ Selamat - sambungan disulitkan sepenuhnya</div>
        </InfoCard>
      </div>

      <NotaPenting>
        Untuk membolehkan pengurusan jauh (Telnet/SSH), suis mesti dikonfigurasi dengan <b>alamat IP pengurusan (management IP)</b> terlebih dahulu - lazimnya melalui VLAN interface (contoh: VLAN 1 atau VLAN pengurusan khusus).
      </NotaPenting>

      <Ringkasan>
        Konfigurasi awal suis dilakukan melalui <b>Console Port + CLI</b> (tanpa rangkaian). Untuk pengurusan jauh selepas IP pengurusan ditetapkan, guna <b>SSH</b> (selamat, disyorkan) berbanding <b>Telnet</b> (tidak disulitkan, berisiko).
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 5: KONFIGURASI ASAS ---------------- */
function ConfigNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Konfigurasi Kata Laluan" icon={KeyRound}>
        <p>Kata laluan wajib ditetapkan untuk elakkan capaian tidak sah kepada mod konfigurasi suis.</p>
        <CodeBlock>{`Switch(config)# enable secret CiscoPass123
Switch(config)# line console 0
Switch(config-line)# password consolepass
Switch(config-line)# login`}</CodeBlock>
      </InfoCard>

      <InfoCard title="Alamat IP Pengurusan (Management IP)" icon={Network}>
        <p>Ditetapkan pada VLAN interface untuk membolehkan capaian jauh (Telnet/SSH).</p>
        <CodeBlock>{`Switch(config)# interface vlan 1
Switch(config-if)# ip address 192.168.1.10 255.255.255.0
Switch(config-if)# no shutdown`}</CodeBlock>
      </InfoCard>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Access Port" icon={Cable}>
          <p className="text-sm">Membawa trafik untuk <b>satu VLAN sahaja</b> - digunakan untuk sambungan ke peranti akhir (PC, printer).</p>
          <CodeBlock>{`interface fastEthernet 0/1
 switchport mode access
 switchport access vlan 10`}</CodeBlock>
        </InfoCard>
        <InfoCard title="Trunk Port" icon={GitFork}>
          <p className="text-sm">Membawa trafik untuk <b>pelbagai VLAN</b> - digunakan untuk sambungan antara suis.</p>
          <CodeBlock>{`interface fastEthernet 0/24
 switchport mode trunk
 switchport trunk allowed vlan 10,20`}</CodeBlock>
        </InfoCard>
      </div>

      <Ringkasan>
        Konfigurasi asas suis merangkumi: <b>kata laluan</b> (enable secret, console), <b>IP pengurusan</b> (VLAN interface), serta konfigurasi port sebagai <b>Access Port</b> (satu VLAN, untuk peranti akhir) atau <b>Trunk Port</b> (pelbagai VLAN, antara suis).
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 6: PENGENALAN VLAN ---------------- */
function VlanNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Apakah VLAN (Virtual LAN)?" icon={GitFork}>
        <p>VLAN membahagikan satu rangkaian fizikal kepada beberapa rangkaian <b>logik</b> berasingan - peranti dalam VLAN yang sama boleh berkomunikasi terus walaupun disambung ke suis fizikal berbeza, manakala peranti dalam VLAN berbeza diasingkan secara logik.</p>
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-8 shadow-sm">
        <h4 className="font-black text-slate-900 mb-6 flex items-center gap-2"><HeadingIcon text={"Contoh: Satu Suis Fizikal, Dua VLAN Logik"} className="text-amber-600 shrink-0" size={18} />Contoh: Satu Suis Fizikal, Dua VLAN Logik</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 text-center">
            <p className="font-black text-blue-800">VLAN 10 - Kewangan</p>
            <p className="text-xs text-blue-600 mt-1">PC1, PC2</p>
          </div>
          <div className="rounded-xl bg-orange-50 border border-orange-200 p-4 text-center">
            <p className="font-black text-orange-800">VLAN 20 - Pemasaran</p>
            <p className="text-xs text-orange-600 mt-1">PC3, PC4</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-4 text-center">Kedua-dua VLAN berkongsi suis fizikal yang sama, tetapi diasingkan secara logik - tiada komunikasi terus tanpa Inter-VLAN Routing.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Kelebihan VLAN" icon={CheckCircle}>
          <ul className="space-y-1.5 list-disc pl-5">
            <li>Meningkatkan keselamatan (asingkan kumpulan pengguna)</li>
            <li>Kurangkan trafik broadcast (hanya dalam VLAN sama)</li>
            <li>Pengurusan rangkaian lebih tersusun (ikut jabatan/fungsi)</li>
          </ul>
        </InfoCard>
        <InfoCard title="802.1Q - VLAN Tagging" icon={Table2}>
          <p>Piawaian IEEE yang menandakan setiap frame dengan <b>ID VLAN</b> semasa melalui trunk port, membolehkan suis penerima mengenal pasti VLAN asal frame tersebut.</p>
        </InfoCard>
      </div>

      <Ringkasan>
        VLAN mengasingkan rangkaian fizikal kepada kumpulan <b>logik</b> berasingan untuk keselamatan &amp; pengurusan trafik yang lebih baik. <b>802.1Q</b> ialah piawaian tagging yang membolehkan pelbagai VLAN dihantar melalui satu trunk port yang sama.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 7: INTER-VLAN ROUTING ---------------- */
function IntervlanNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Mengapa Inter-VLAN Routing Diperlukan?" icon={ArrowRightLeft}>
        <p>Peranti dalam VLAN berbeza <b>tidak boleh berkomunikasi terus</b> walaupun disambung ke suis yang sama, kerana VLAN mengasingkan rangkaian secara logik. Inter-VLAN Routing membolehkan komunikasi antara VLAN melalui <b>router</b> atau <b>Layer 3 Switch</b>.</p>
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2"><HeadingIcon text={"Rajah: Inter-VLAN Routing"} className="text-amber-600 shrink-0" size={18} />Rajah: Inter-VLAN Routing</h4>
        <FlowRow steps={['VLAN 10 (PC1)', 'Trunk Port', 'Router / Layer 3 Switch', 'Trunk Port', 'VLAN 20 (PC2)']} />
      </div>

      <InfoCard title="Kaedah Pelaksanaan" icon={GitFork}>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Router-on-a-Stick</b><p className="mt-1 text-xs">Satu port router disambung ke trunk port suis, dikonfigurasi dengan sub-interface untuk setiap VLAN.</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Layer 3 Switch (SVI)</b><p className="mt-1 text-xs">Switch Virtual Interface (SVI) dikonfigurasi untuk setiap VLAN terus pada suis Layer 3.</p></div>
        </div>
      </InfoCard>

      <NotaPenting>
        Pertimbangan keselamatan penting: guna <b>Access Control List (ACL)</b> untuk mengawal jenis trafik yang dibenarkan antara VLAN. Tanpa ACL, semua trafik antara VLAN dibenarkan sepenuhnya - meningkatkan risiko capaian tidak sah antara jabatan/kumpulan pengguna.
      </NotaPenting>

      <Ringkasan>
        Inter-VLAN Routing membolehkan komunikasi antara VLAN berbeza melalui <b>router-on-a-stick</b> atau <b>Layer 3 Switch (SVI)</b>. Sentiasa gabungkan dengan <b>ACL</b> untuk kawal jenis trafik yang dibenarkan merentasi VLAN bagi mengekalkan keselamatan.
      </Ringkasan>
    </div>
  );
}

/* ---------------- NOTA 8: KESELAMATAN & PENGURUSAN ---------------- */
function SecurityNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Spanning Tree Protocol (STP)" icon={GitFork}>
        <p>STP mengelakkan <b>gelung rangkaian (network loop)</b> yang berlaku apabila terdapat laluan berlebihan (redundant) antara suis. Tanpa STP, gelung boleh menyebabkan <b>broadcast storm</b> yang melumpuhkan seluruh rangkaian.</p>
        <p className="mt-3">STP mengira kos laluan dan memilih <i>root bridge</i>, kemudian secara automatik meletakkan port berlebihan dalam keadaan <b>blocking</b> - kekal sedia sebagai laluan sandaran jika laluan utama gagal.</p>
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2"><HeadingIcon text={"Rajah: STP Menyekat Laluan Berlebihan"} className="text-amber-600 shrink-0" size={18} />Rajah: STP Menyekat Laluan Berlebihan</h4>
        <div className="flex items-center justify-center gap-6">
          <div className="rounded-xl bg-slate-900 text-white px-4 py-3 font-black text-sm">Suis A</div>
          <div className="flex flex-col gap-3">
            <div className="text-xs font-bold text-emerald-700 flex items-center gap-2"><ChevronRight size={14} /> Laluan Aktif</div>
            <div className="text-xs font-bold text-rose-500 flex items-center gap-2"><Zap size={14} /> Laluan Blocking (sandaran)</div>
          </div>
          <div className="rounded-xl bg-slate-900 text-white px-4 py-3 font-black text-sm">Suis B</div>
        </div>
      </div>

      <InfoCard title="Port Security" icon={Lock}>
        <p>Mengehadkan/mengawal peranti (alamat MAC) yang dibenarkan bersambung ke sesuatu port suis - mengelakkan peranti tidak dibenarkan daripada mengakses rangkaian.</p>
        <CodeBlock>{`interface fastEthernet 0/5
 switchport port-security
 switchport port-security maximum 1
 switchport port-security mac-address sticky
 switchport port-security violation shutdown`}</CodeBlock>
        <p className="mt-3 text-sm">Apabila pelanggaran dikesan (contoh: alamat MAC tidak dibenarkan atau melebihi had), port akan <b>disekat/dinyahaktifkan (shutdown)</b> mengikut konfigurasi <code className="bg-slate-100 px-1 rounded">violation</code>.</p>
      </InfoCard>

      <Ringkasan>
        <b>STP</b> elakkan gelung rangkaian &amp; broadcast storm dengan menyekat laluan berlebihan secara automatik (keadaan blocking). <b>Port Security</b> hadkan alamat MAC dibenarkan pada setiap port untuk elak capaian tidak sah. Kedua-dua ciri ini penting untuk kestabilan &amp; keselamatan rangkaian bersuis.
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
  const [activeQuestions, setActiveQuestions] = useState(() => shuffleQuestions(ikr3063QuizSets[0].questions));

  const currentSet = ikr3063QuizSets[kpIndex];
  const passScore = 18;

  const score = useMemo(() => activeQuestions.reduce((total, question, index) => total + (answers[index] === question.options.indexOf(question.correct) ? 1 : 0), 0), [answers, activeQuestions]);

  const retryLevel = () => {
    setAnswers({});
    setSubmitted(false);
    setActiveQuestions(shuffleQuestions(ikr3063QuizSets[kpIndex].questions));
  };

  const nextKp = () => {
    if (score >= passScore && kpIndex < ikr3063QuizSets.length - 1) {
      const nextIndex = kpIndex + 1;
      setHighestKp(previous => Math.max(previous, nextIndex));
      setKpIndex(nextIndex);
      setAnswers({});
      setSubmitted(false);
      setActiveQuestions(shuffleQuestions(ikr3063QuizSets[nextIndex].questions));
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
            <div className="text-xs font-black uppercase tracking-[.2em] text-amber-700">Tahap Kuiz</div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{currentSet.code} - {currentSet.title}</h2>
            <p className="text-sm text-slate-600 mt-2">Setiap KP mengandungi 30 soalan. Lulus minimum ialah 18/30.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ikr3063QuizSets.map((item, index) => (
              <button key={item.id} disabled={index > highestKp || (index === kpIndex && submitted && score < passScore)} onClick={() => {
                if (index <= highestKp) {
                  setKpIndex(index);
                  setAnswers({});
                  setSubmitted(false);
                  setActiveQuestions(shuffleQuestions(ikr3063QuizSets[index].questions));
                }
              }} className={`rounded-full px-4 py-2 text-xs font-black border ${index === kpIndex ? 'bg-amber-600 border-amber-600 text-white' : 'bg-white border-slate-300 text-slate-700'} ${index > highestKp ? 'opacity-50 cursor-not-allowed' : ''}`}>{item.code}</button>
            ))}
          </div>
        </div>
      </div>

      {submitted && (
        <div className={`rounded-2xl p-6 mb-6 text-white ${score >= passScore ? 'bg-emerald-600' : 'bg-rose-600'}`}>
          <div className="flex items-center gap-3"><Award size={34} /><div><p className="text-sm font-bold opacity-90">Keputusan {currentSet.code}</p><h2 className="text-3xl font-black">{score} / {activeQuestions.length}</h2></div></div>
          <p className="mt-3 font-medium">
            {score >= passScore
              ? `Lulus ${currentSet.code}. Anda layak ${kpIndex < ikr3063QuizSets.length - 1 ? 'naik ke ' + ikr3063QuizSets[kpIndex + 1].code : 'menamatkan semua KP'}.`
              : `Belum lulus. Markah minimum ialah 18/30 - sila ulang ${currentSet.code} sebelum naik ke tahap seterusnya.`}
          </p>
        </div>
      )}

      <div className="space-y-5">
        {activeQuestions.map((question, index) => (
          <article key={`${currentSet.id}-${index}-${question.question}`} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-black text-slate-900"><span className="text-amber-600 mr-2">{index + 1}.</span>{question.question}</h3>
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
                    className={`text-left p-3 rounded-xl border text-sm font-medium transition-all ${correct ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : wrong ? 'border-rose-500 bg-rose-50 text-rose-800' : selected ? 'border-amber-500 bg-amber-50 text-amber-800' : 'border-slate-200 hover:border-amber-300'}`}
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
          <button disabled={Object.keys(answers).length !== activeQuestions.length} onClick={handleSubmit} className="flex-1 bg-amber-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl font-black hover:bg-amber-700 transition-colors">Hantar Jawapan {currentSet.code}</button>
        ) : (
          <>
            {score >= passScore && kpIndex < ikr3063QuizSets.length - 1 && (
              <button onClick={nextKp} className="flex-1 bg-emerald-600 text-white px-6 py-4 rounded-xl font-black hover:bg-emerald-700">Naik ke {ikr3063QuizSets[kpIndex + 1].code}</button>
            )}
            <button onClick={retryLevel} className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-xl font-black hover:bg-slate-800"><RotateCcw size={19} /> Cuba Semula {currentSet.code}</button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- KOMPONEN UTAMA ---------------- */
export default function IKR3063({ onBackToPortal }) {
  const [view, setView] = useState('menu');
  const [readState, setReadState] = useState(() => {
    const fallback = [false, false, false, false, false, false, false, false];
    try {
      const saved = JSON.parse(localStorage.getItem('ikr3063-read-state'));
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
    try { localStorage.setItem('ikr3063-read-state', JSON.stringify(fallback)); } catch { /* storan tidak tersedia */ }
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
    try { localStorage.setItem('ikr3063-read-state', JSON.stringify(nextReadState)); } catch { /* storan tidak tersedia */ }
    const nextInLine = sections[requested + 1];
    if (nextInLine) setView(nextInLine.id);
  };

  if (view !== 'menu') {
    const content = {
      intro: <IntroNotes />,
      types: <TypesNotes />,
      methods: <MethodsNotes />,
      interface: <InterfaceNotes />,
      config: <ConfigNotes />,
      vlan: <VlanNotes />,
      intervlan: <IntervlanNotes />,
      security: <SecurityNotes />,
      quiz: <Quiz />,
    }[view];

    const showCompleteButton = sections.some((section) => section.id === view);
    const headerMeta = sections.find((section) => section.id === view) || featureCards.find((f) => f.id === view) || sections[0];

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <SwitchAnimStyles />
        <div className="bg-slate-950 text-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Network size={30} className="text-amber-300" />
                <div>
                  <div className="text-[10px] uppercase tracking-[.2em] text-amber-300 font-black">Ethernet Switching Essentials</div>
                  <div className="text-sm font-black">{completedCount}/{sections.length} bahagian</div>
                </div>
              </div>
              <div className="flex-1 max-w-md">
                <div className="flex items-center justify-between text-[10px] font-black tracking-[.18em] text-amber-200 uppercase"><span>Progress</span><span>{progressPercent}%</span></div>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-amber-300 to-orange-300 transition-all" style={{ width: `${progressPercent}%` }} /></div>
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
        <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">IKR3063 Ethernet Switching Essentials - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>
      </div>
    );
  }

  return (
    <div className="course-menu-page min-h-screen bg-slate-50 text-slate-900">
      <SwitchAnimStyles />
      <ModuleMenu title="Modul IKR3063: Ethernet Switching Essentials" icon={sections[0].icon} secondaryIcon={sections[1].icon}
        onBack={onBackToPortal} topics={sections} read={readState} onTopic={section => openSection(section.id)} onReset={resetProgress}
        description={<>Jenis suis, kaedah pensuisan, antara muka suis, konfigurasi asas, VLAN, Inter-VLAN Routing serta keselamatan rangkaian (STP &amp; Port Security) - dipecahkan kepada 8 bahagian, lengkap dengan kuiz 60 soalan.</>}>
        <ModuleActivities activities={featureCards} quizLocked={!readState[sections.length - 1]} onOpen={openSection} />
      </ModuleMenu>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">IKR3063 Ethernet Switching Essentials - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>
    </div>
  );
}
