import ModuleMenu, { ModuleActivities } from './ModuleMenu';
import { useMemo, useState } from 'react';
import { ikr3043QuizSets } from './IKR3043QuizData.js';
import {
  Activity,
  ArrowLeft,
  Award,
  Binary,
  BookOpen,
  Box,
  Bug,
  Calculator,
  CheckCircle,
  ChevronRight,
  CircleDot,
  ExternalLink,
  GitBranch,
  Globe,
  HardDrive,
  Home,
  KeyRound,
  Laptop,
  Lightbulb,
  Lock,
  Monitor,
  Network,
  Plug,
  Printer,
  Router,
  RotateCcw,
  ScanLine,
  Server,
  Share2,
  ShieldCheck,
  Sliders,
  Smartphone,
  Tablet,
  Terminal,
  Users,
  Waypoints,
  Wifi,
  XCircle,
} from 'lucide-react';

const sections = [
  {
    id: 'intro',
    title: 'Pengenalan Rangkaian Komputer',
    desc: 'Definisi, fungsi utama dan pertimbangan pemasangan fizikal rangkaian.',
    icon: BookOpen,
    accent: 'blue',
  },
  {
    id: 'types',
    title: 'Jenis Rangkaian',
    desc: 'LAN, MAN dan WAN mengikut skop liputan dan penggunaan.',
    icon: Globe,
    accent: 'emerald',
  },
  {
    id: 'topology',
    title: 'Topologi Rangkaian',
    desc: 'Susunan Bus, Star, Ring dan Mesh serta kesan pada prestasi.',
    icon: Waypoints,
    accent: 'teal',
  },
  {
    id: 'devices',
    title: 'Peranti Rangkaian',
    desc: 'Router, switch, hub, access point, modem dan asas pemasangan rak.',
    icon: Router,
    accent: 'orange',
  },
  {
    id: 'ip',
    title: 'Alamat IP & Subnetting',
    desc: 'IPv4, IPv6, network address, host address dan default gateway.',
    icon: Binary,
    accent: 'violet',
  },
  {
    id: 'protocol',
    title: 'Protokol Rangkaian',
    desc: 'TCP/IP, HTTP/HTTPS, FTP, SMTP, POP3, IMAP dan DNS.',
    icon: Share2,
    accent: 'indigo',
  },
  {
    id: 'security',
    title: 'Keselamatan Rangkaian',
    desc: 'Firewall, antivirus, encryption, VPN dan authentication.',
    icon: ShieldCheck,
    accent: 'rose',
  },
  {
    id: 'troubleshooting',
    title: 'Ujian Sambungan & Troubleshooting',
    desc: 'Ping, traceroute, packet analyzer dan command-line tools.',
    icon: Terminal,
    accent: 'amber',
  },
];

const featureCards = [
  {
    id: 'quiz',
    target: 'quiz',
    title: 'Kuiz Penilaian',
    desc: 'Uji kefahaman dengan 150 soalan (5 KP x 30 soalan). Buka setelah menyelesaikan semua 8 Nota Pembelajaran.',
    icon: Award,
    accent: 'rose',
  },
  {
    id: 'calculator',
    target: 'calculator',
    title: 'Kalkulator IP Address',
    desc: 'Kira subnet mask, network, broadcast, host range dan gateway secara automatik.',
    icon: Calculator,
    accent: 'blue',
  },
  {
    id: 'model3d',
    target: 'model3d',
    title: 'Simulasi 3D & AR',
    desc: 'Teroka model 3D peranti rangkaian sebenar - server, switch dan lain-lain - secara 360 darjah.',
    icon: Box,
    accent: 'teal',
  },
];

const networkModels = [
  {
    id: '69291271f83c43ccbadcc3b07f9c895c',
    title: 'Computer Networking',
    author: 'ARComputerFundamentals',
    authorProfile: 'https://sketchfab.com/adilaijaz10',
    page: 'https://sketchfab.com/3d-models/computer-networking-69291271f83c43ccbadcc3b07f9c895c',
    embed: 'https://sketchfab.com/models/69291271f83c43ccbadcc3b07f9c895c/embed?autostart=0&ui_ar=1&ui_help=1&ui_settings=1',
  },
  {
    id: '02d947f769384812a77c5ae23e24678b',
    title: 'SALE Server',
    author: 'rvh',
    authorProfile: 'https://sketchfab.com/rvh',
    page: 'https://sketchfab.com/3d-models/sale-server-02d947f769384812a77c5ae23e24678b',
    embed: 'https://sketchfab.com/models/02d947f769384812a77c5ae23e24678b/embed?autostart=0&ui_ar=1&ui_help=1&ui_settings=1',
  },
  {
    id: 'e4700c942ec74c8cbd1b226a1f9b4b23',
    title: 'Low Poly Network Equipment Pack 1',
    author: 'Ryangorman',
    authorProfile: 'https://sketchfab.com/Ryangorman',
    page: 'https://sketchfab.com/3d-models/low-poly-network-equipment-pack-1-e4700c942ec74c8cbd1b226a1f9b4b23',
    embed: 'https://sketchfab.com/models/e4700c942ec74c8cbd1b226a1f9b4b23/embed?autostart=0&ui_ar=1&ui_help=1&ui_settings=1',
  },
  {
    id: '974f1aa182fc4bb1b996310e32234448',
    title: 'Network Switch',
    author: 'saadiahmohamad',
    authorProfile: 'https://sketchfab.com/saadiahmohamad',
    page: 'https://sketchfab.com/3d-models/network-switch-974f1aa182fc4bb1b996310e32234448',
    embed: 'https://sketchfab.com/models/974f1aa182fc4bb1b996310e32234448/embed?autostart=0&ui_ar=1&ui_help=1&ui_settings=1',
  },
  {
    id: 'a9b0875a967f462b8ec63da1142ac0d6',
    title: 'The Workstation Host Chassis Server Network',
    author: 'mpc199075',
    authorProfile: 'https://sketchfab.com/mpc199075',
    page: 'https://sketchfab.com/3d-models/the-workstation-host-chassis-server-network-a9b0875a967f462b8ec63da1142ac0d6',
    embed: 'https://sketchfab.com/models/a9b0875a967f462b8ec63da1142ac0d6/embed?autostart=0&ui_ar=1&ui_help=1&ui_settings=1',
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
};

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
          <div className={`p-3 rounded-2xl border border-white/15 ${style.icon}`}><Icon size={28} className="text-white" /></div>
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight">{title}</h1>
            <p className="text-slate-300 mt-2 max-w-3xl text-sm md:text-base">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, children, icon: Icon = CircleDot }) {
  return (
    <article className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
      <h3 className="font-black text-slate-900 text-lg flex items-center gap-2 mb-3"><Icon size={20} className="text-blue-600" /> {title}</h3>
      <div className="text-sm md:text-base text-slate-600 leading-relaxed">{children}</div>
    </article>
  );
}

function NotesTableDevices({ headers, rows }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm">
        <thead><tr className="bg-blue-50 text-blue-900">{headers.map((h) => <th key={h} className="text-left font-black p-3 md:p-4">{h}</th>)}</tr></thead>
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

function NotaPentingDevices({ children }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 flex gap-3">
      <Lightbulb size={22} className="text-amber-600 shrink-0 mt-0.5" />
      <div><p className="text-xs font-black uppercase tracking-wide text-amber-700 mb-1">Nota Penting</p><div className="text-sm text-amber-900 leading-relaxed">{children}</div></div>
    </div>
  );
}

function RingkasanDevices({ children }) {
  return (
    <div className="rounded-2xl bg-slate-950 text-white p-5 md:p-6 flex gap-3">
      <CheckCircle size={22} className="text-emerald-300 shrink-0 mt-0.5" />
      <div><p className="text-xs font-black uppercase tracking-wide text-emerald-300 mb-1">Ringkasan</p><div className="text-sm text-slate-100 leading-relaxed">{children}</div></div>
    </div>
  );
}

/* ---------------- NOTA 1: PENGENALAN ---------------- */
function IntroNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <InfoCard title="Definisi dan fungsi rangkaian" icon={Lightbulb}>
          <p>Rangkaian komputer merupakan sistem yang menghubungkan dua atau lebih peranti supaya data, sumber dan perkhidmatan dapat dikongsi. Rangkaian membolehkan pengguna berkomunikasi, berkongsi maklumat dan menggunakan sumber secara lebih cekap.</p>
          <ul className="mt-4 space-y-2 list-disc pl-5">
            <li>Perkongsian data dan fail antara pengguna.</li>
            <li>Perkongsian perkakasan seperti pencetak dan storan.</li>
            <li>Komunikasi antara pengguna dan peranti.</li>
            <li>Perkongsian sambungan Internet.</li>
            <li>Pengurusan sumber rangkaian secara berpusat.</li>
          </ul>
        </InfoCard>
        <InfoCard title="Pemasangan fizikal" icon={Plug}>
          <p>Dalam persekitaran rangkaian, peranti seperti komputer, server, router, switch dan peranti hujung perlu disusun, disambungkan dan dikonfigurasi supaya komunikasi dapat berlaku dengan baik.</p>
          <div className="mt-4 rounded-xl bg-blue-50 border border-blue-200 p-4 text-sm font-bold text-blue-900">
            Bagi pemasangan rangkaian fizikal, aspek lokasi peralatan, sambungan kabel, bekalan kuasa dan pengudaraan mesti diberi perhatian.
          </div>
        </InfoCard>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <p className="font-black text-slate-900">Data</p>
          <p className="text-sm text-slate-600 mt-1">Maklumat yang dihantar antara peranti.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <p className="font-black text-slate-900">Sumber</p>
          <p className="text-sm text-slate-600 mt-1">Contohnya fail, pencetak, internet dan perkhidmatan server.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <p className="font-black text-slate-900">Peranti</p>
          <p className="text-sm text-slate-600 mt-1">Peralatan yang menghantar, menerima atau mengurus trafik rangkaian.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- NOTA 2: JENIS RANGKAIAN ---------------- */
function TypesNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-6">
        <InfoCard title="LAN" icon={Router}>
          <p className="font-black text-slate-900 mb-1">Local Area Network</p>
          <p>Digunakan dalam kawasan yang terhad seperti rumah, makmal, sekolah atau pejabat. Biasanya menghubungkan peranti dalam lokasi yang sama menggunakan switch, kabel Ethernet atau sambungan tanpa wayar.</p>
        </InfoCard>
        <InfoCard title="MAN" icon={Server}>
          <p className="font-black text-slate-900 mb-1">Metropolitan Area Network</p>
          <p>Meliputi kawasan yang lebih besar seperti bandar atau kawasan metropolitan dan boleh menghubungkan beberapa rangkaian tempatan.</p>
        </InfoCard>
        <InfoCard title="WAN" icon={Globe}>
          <p className="font-black text-slate-900 mb-1">Wide Area Network</p>
          <p>Menghubungkan rangkaian yang berada pada lokasi yang jauh. Internet ialah contoh persekitaran WAN yang menghubungkan banyak rangkaian di seluruh dunia.</p>
        </InfoCard>
      </div>
      <div className="mt-6 rounded-2xl bg-slate-950 text-white p-6 text-sm font-bold">
        Skop liputan meningkat dari LAN &rarr; MAN &rarr; WAN, dan setiap peningkatan skop biasanya melibatkan lebih banyak peranti perantaraan (switch, router, ISP) untuk menyambungkan rangkaian.
      </div>
    </div>
  );
}

/* ---------------- NOTA 3: TOPOLOGI ---------------- */
function TopologyNotes() {
  const items = [
    { title: 'Bus', text: 'Semua peranti berkongsi satu kabel utama. Kerosakan pada kabel utama boleh menjejaskan keseluruhan komunikasi rangkaian.' },
    { title: 'Star', text: 'Setiap peranti disambungkan kepada peranti pusat seperti switch. Memudahkan pengurusan dan pengesanan masalah pada sambungan individu.' },
    { title: 'Ring', text: 'Peranti disusun membentuk gelung. Data bergerak mengikut susunan sambungan dalam rangkaian.' },
    { title: 'Mesh', text: 'Peranti mempunyai banyak sambungan terus antara satu sama lain. Menyediakan laluan alternatif tetapi memerlukan lebih banyak kabel dan port.' },
  ];
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item) => (
          <InfoCard key={item.title} title={item.title} icon={Waypoints}>
            <p>{item.text}</p>
          </InfoCard>
        ))}
      </div>
    </div>
  );
}

/* ---------------- NOTA 4: PERANTI RANGKAIAN ---------------- */
function DevicesNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Router" icon={Router}>
        <p>Router menghubungkan dua atau lebih rangkaian dan menentukan laluan data dari satu rangkaian ke rangkaian lain.</p>
        <div className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Home router</b> - rumah/pejabat kecil, sedia DHCP, Wi-Fi &amp; keselamatan asas.</div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Enterprise router</b> - organisasi besar, prestasi &amp; keselamatan tinggi.</div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Wireless router</b> - gabung fungsi routing dengan sambungan Wi-Fi.</div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Core router</b> - teras rangkaian besar, trafik sangat tinggi.</div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 sm:col-span-2"><b>Edge router</b> - sempadan rangkaian dalaman dengan rangkaian luar (internet).</div>
        </div>
      </InfoCard>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Switch" icon={Share2}>
          <p>Menghubungkan peranti dalam LAN dan menghantar frame kepada port yang berkaitan berdasarkan alamat MAC.</p>
          <ul className="mt-3 space-y-1.5 list-disc pl-5">
            <li><b>Unmanaged</b> - plug-and-play, tiada konfigurasi.</li>
            <li><b>Managed</b> - menyokong VLAN, SNMP dan QoS.</li>
            <li><b>Smart switch</b> - berada antara unmanaged dan managed.</li>
          </ul>
        </InfoCard>
        <InfoCard title="Access Point" icon={Wifi}>
          <p>Menyediakan sambungan tanpa wayar supaya peranti seperti komputer riba dan telefon boleh menyertai rangkaian.</p>
          <ul className="mt-3 space-y-1.5 list-disc pl-5">
            <li><b>Standalone AP</b> - dikawal secara individu.</li>
            <li><b>Controller-based AP</b> - diurus berpusat melalui WLC (Wireless LAN Controller).</li>
          </ul>
        </InfoCard>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Hub & Modem" icon={Plug}>
          <p><b>Hub</b> ialah peranti sambungan asas yang menghantar isyarat kepada semua port yang tersedia dan kurang pintar berbanding switch.</p>
          <p className="mt-3"><b>Modem</b> berfungsi sebagai perantara antara rangkaian pengguna dengan perkhidmatan komunikasi yang disediakan oleh pembekal perkhidmatan.</p>
        </InfoCard>
        <InfoCard title="Asas Rak Server" icon={Server}>
          <p>Peralatan seperti router, switch dan firewall lazimnya dipasang dalam rak server yang standard.</p>
          <ul className="mt-3 space-y-1.5 list-disc pl-5">
            <li>Lebar rak piawai: <b>19 inci</b>. Satu rack unit (1U) &asymp; <b>1.75 inci</b>.</li>
            <li><b>Open frame rack</b>: struktur terbuka, pengudaraan maksimum.</li>
            <li><b>Enclosed rack</b>: ada pintu depan/belakang &amp; panel sisi, keselamatan fizikal lebih baik.</li>
            <li><b>2-post</b> untuk peralatan ringan (patch panel), <b>4-post</b> untuk peralatan berat (server).</li>
          </ul>
        </InfoCard>
      </div>

      {/* ======= 📚 NOTA TAMBAHAN ======= */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 text-center font-black text-sm tracking-wide">
        📚 NOTA TAMBAHAN - Peranti Nod Akhir, Peripheral, Router &amp; Wireless AP/WLC/LWAP
      </div>

      {/* ---- END NODE DEVICES ---- */}
      <InfoCard title="Peranti Nod Akhir (End Node / Computing Devices)" icon={Monitor}>
        <p>Peranti pengkomputeran (computing devices) ialah peranti nod akhir yang digunakan oleh pengguna untuk mengakses, memproses dan berinteraksi dengan rangkaian. Sumber mengenal pasti 5 jenis utama: <b>Desktop, Workstation, Laptop, Tablet</b> dan <b>Smartphone</b>.</p>
      </InfoCard>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon: Monitor, title: '🖥️ Desktop Computer', maksud: 'Komputer meja yang direka untuk digunakan di lokasi tetap.', ciri: 'Prestasi tinggi, boleh dinaik taraf (RAM/storan), tidak mudah alih.', kegunaan: 'Kerja pejabat, reka bentuk grafik ringan, pembelajaran di makmal komputer.', fungsi: 'Bersambung ke rangkaian melalui port Ethernet (NIC) atau Wi-Fi adapter.' },
          { icon: Server, title: '⚙️ Workstation', maksud: 'Komputer berprestasi tinggi direka untuk tugasan berat/profesional.', ciri: 'Pemproses & RAM lebih kuat, kad grafik profesional, storan besar.', kegunaan: 'Reka bentuk 3D/CAD, penyuntingan video, analisis data & sains.', fungsi: 'Sering bersambung ke rangkaian berkelajuan tinggi (Gigabit Ethernet).' },
          { icon: Laptop, title: '💻 Laptop', maksud: 'Komputer mudah alih yang menggabungkan semua komponen dalam satu unit.', ciri: 'Ringan, bateri terbina dalam, boleh dibawa ke mana-mana.', kegunaan: 'Kerja jarak jauh (remote work), pembelajaran mudah alih, mesyuarat.', fungsi: 'Bersambung melalui Wi-Fi atau port Ethernet apabila tersedia.' },
          { icon: Tablet, title: '📱 Tablet', maksud: 'Peranti mudah alih berskrin sentuh, lebih kecil daripada laptop.', ciri: 'Sangat ringan, jangka hayat bateri panjang, antara muka sentuh.', kegunaan: 'Semakan e-mel, pembentangan, aplikasi produktiviti ringan.', fungsi: 'Bersambung ke rangkaian terutamanya melalui Wi-Fi (sesetengah model sokong data mudah alih).' },
          { icon: Smartphone, title: '📲 Smartphone', maksud: 'Telefon pintar yang berfungsi juga sebagai peranti pengkomputeran mudah alih.', ciri: 'Paling mudah alih, sentiasa dibawa bersama pengguna.', kegunaan: 'Komunikasi, akses e-mel/aplikasi rangkaian di mana-mana sahaja.', fungsi: 'Bersambung melalui Wi-Fi atau rangkaian selular (4G/5G).' },
        ].map((d) => (
          <div key={d.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 mb-3"><d.icon size={19} /></div>
            <p className="font-black text-slate-900 text-sm">{d.title}</p>
            <div className="mt-2 space-y-1.5 text-xs text-slate-600">
              <p><b className="text-slate-800">Maksud:</b> {d.maksud}</p>
              <p><b className="text-slate-800">Ciri:</b> {d.ciri}</p>
              <p><b className="text-slate-800">Kegunaan:</b> {d.kegunaan}</p>
              <p><b className="text-slate-800">Fungsi rangkaian:</b> {d.fungsi}</p>
            </div>
          </div>
        ))}
      </div>

      <NotesTableDevices
        headers={['Peranti', 'Ciri Utama', 'Kegunaan', 'Sambungan Rangkaian']}
        rows={[
          ['Desktop', 'Prestasi tinggi, tidak mudah alih', 'Kerja pejabat, makmal komputer', 'Ethernet (NIC) / Wi-Fi'],
          ['Workstation', 'Prestasi sangat tinggi, storan besar', 'CAD, video editing, sains data', 'Gigabit Ethernet'],
          ['Laptop', 'Mudah alih, bateri terbina dalam', 'Kerja jarak jauh, mesyuarat', 'Wi-Fi / Ethernet'],
          ['Tablet', 'Ringan, skrin sentuh', 'E-mel, pembentangan', 'Wi-Fi (sesetengah + data mudah alih)'],
          ['Smartphone', 'Paling mudah alih', 'Komunikasi, akses aplikasi', 'Wi-Fi / 4G / 5G'],
        ]}
      />

      {/* ---- PERIPHERAL DEVICE ---- */}
      <InfoCard title="Peripheral Device" icon={Printer}>
        <p>Peripheral device merujuk kepada perkakasan tambahan yang disambungkan kepada peranti pengkomputeran untuk melengkapkan fungsi <b>input, output,</b> atau <b>penyimpanan data</b>. Ia boleh disambungkan terus kepada komputer atau terus kepada rangkaian melalui sambungan berwayar/tanpa wayar.</p>
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h4 className="font-black text-slate-900 mb-4">Rajah: Perkongsian Peripheral Dalam Rangkaian</h4>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="flex flex-col gap-2">
            {['PC 1', 'PC 2', 'PC 3'].map((pc) => (
              <div key={pc} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-700 flex items-center gap-2"><Monitor size={14} /> {pc}</div>
            ))}
          </div>
          <ChevronRight size={20} className="text-blue-400 rotate-90 sm:rotate-0" />
          <div className="rounded-xl bg-blue-600 text-white px-4 py-3 text-xs font-black flex items-center gap-2"><Share2 size={16} /> Network Switch</div>
          <ChevronRight size={20} className="text-blue-400 rotate-90 sm:rotate-0" />
          <div className="rounded-xl bg-emerald-600 text-white px-4 py-3 text-xs font-black flex items-center gap-2"><Printer size={16} /> Network Printer</div>
        </div>
      </div>

      <InfoCard title="i. Pencetak Rangkaian (Network Printer)" icon={Printer}>
        <p>Peranti yang disambungkan ke rangkaian (Wi-Fi/Ethernet) membolehkan pelbagai pengguna menghantar dokumen untuk dicetak tanpa kabel USB. Dikonfigurasi melalui print server atau dikongsi terus melalui sistem operasi (Windows/macOS/Linux).</p>
        <div className="grid sm:grid-cols-3 gap-2 mt-3 text-xs">
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-2.5"><b>Inkjet</b> - cetakan berwarna berkualiti tinggi (foto), sokong cloud &amp; remote printing (HP ePrint, Canon Cloud Printing).</div>
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-2.5"><b>Laser</b> - cetakan hitam-putih pantas &amp; kos efektif, auto duplexing, pengurusan kuota pengguna.</div>
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-2.5"><b>Multifungsi (All-in-One)</b> - gabung cetak, imbas, salin &amp; faks dalam satu peranti.</div>
        </div>
        <p className="mt-3"><b>Manfaat:</b> perkongsian sumber (kos rendah), keupayaan cetak jarak jauh dari mana-mana lokasi dalam rangkaian, termasuk dari telefon pintar/tablet.</p>
      </InfoCard>

      <InfoCard title="ii. Pengimbas Rangkaian (Network Scanner)" icon={ScanLine}>
        <p>Membolehkan pengguna mengimbas dokumen dan menghantarnya melalui Ethernet/Wi-Fi ke destinasi seperti e-mel, folder rangkaian, storan awan atau server dokumen.</p>
        <div className="grid sm:grid-cols-2 gap-2 mt-3 text-xs">
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-2.5"><b>Flatbed Scanner</b> - permukaan rata, sesuai dokumen tebal/tak rata (buku, gambar).</div>
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-2.5"><b>Sheet-fed Scanner</b> - dokumen disuap automatik, pantas untuk kertas banyak helai.</div>
        </div>
      </InfoCard>

      <InfoCard title="iii. Network Attached Storage (NAS)" icon={HardDrive}>
        <p>Storan yang disambungkan terus ke rangkaian, membolehkan perkongsian fail berpusat antara pengguna dalam LAN yang sama tanpa bergantung kepada satu komputer sebagai storan.</p>
      </InfoCard>

      {/* ---- ROUTER DEEP DIVE ---- */}
      <InfoCard title="Router & Jenis-Jenis Router (Mendalam)" icon={Router}>
        <p>Router menghubungkan dua atau lebih rangkaian dan menentukan laluan data terbaik. Berikut adalah 5 jenis router berdasarkan skala dan penggunaan.</p>
      </InfoCard>

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { icon: Home, title: '🏠 Home Router', skala: 'Rangkaian kecil (rumah)', ciri: 'DHCP, Wi-Fi terbina dalam, NAT & firewall asas', guna: 'Sambungan Internet isi rumah, capaian sederhana pengguna' },
          { icon: Users, title: '🏢 Enterprise Router', skala: 'Organisasi besar', ciri: 'Prestasi & keselamatan tinggi, sokong protokol lanjutan', guna: 'Ibu pejabat syarikat, kampus, hospital' },
          { icon: Wifi, title: '📡 Wireless Router', skala: 'Rumah / pejabat kecil', ciri: 'Gabung fungsi Router + Switch + AP dalam satu peranti', guna: 'Sambungan LAN & Wi-Fi serentak tanpa peranti berasingan' },
          { icon: GitBranch, title: '⚡ Core Router', skala: 'Teras rangkaian besar (backbone)', ciri: 'Throughput sangat tinggi, kestabilan maksimum', guna: 'ISP, backbone kampus/organisasi besar' },
        ].map((r) => (
          <div key={r.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-700 mb-3"><r.icon size={19} /></div>
            <p className="font-black text-slate-900 text-sm">{r.title}</p>
            <p className="text-xs text-slate-500 mt-1">Skala: {r.skala}</p>
            <p className="text-xs text-slate-600 mt-2"><b>Ciri:</b> {r.ciri}</p>
            <p className="text-xs text-slate-600 mt-1"><b>Kegunaan:</b> {r.guna}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm sm:col-span-2">
        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-700 mb-3"><ChevronRight size={19} /></div>
        <p className="font-black text-slate-900 text-sm mb-3">🌐 Edge Router - Sempadan Rangkaian</p>
        <p className="text-sm text-slate-600">Berada di sempadan (edge) antara rangkaian dalaman organisasi dengan rangkaian luar (ISP/Internet). Menguruskan trafik masuk &amp; keluar, sering menjalankan fungsi keselamatan tambahan sebelum data masuk ke rangkaian teras.</p>
      </div>

      <NotaPentingDevices>
        <b>Istilah Enterprise Router (kekal dari sumber):</b> Router peringkat enterprise menyokong protokol &amp; ciri lanjutan seperti <b>OSPF</b> dan <b>BGP</b> (protokol routing), <b>Firewall</b> terbina dalam, <b>VPN</b> (sambungan jauh selamat), <b>IDS/IPS</b> (pengesanan &amp; pencegahan pencerobohan), <b>QoS</b> (Quality of Service - utamakan trafik penting), serta <b>Redundancy</b> dan <b>Failover</b> (memastikan rangkaian terus berfungsi walaupun satu laluan/peranti gagal).
      </NotaPentingDevices>

      <NotesTableDevices
        headers={['Jenis Router', 'Skala Rangkaian', 'Ciri Utama']}
        rows={[
          ['Home Router', 'Kecil (rumah)', 'DHCP, Wi-Fi, keselamatan asas'],
          ['Enterprise Router', 'Besar (organisasi)', 'OSPF/BGP, Firewall, VPN, IDS/IPS, QoS, Redundancy, Failover'],
          ['Wireless Router', 'Kecil-sederhana', 'Gabungan Router + Switch + AP'],
          ['Core Router', 'Sangat besar (backbone)', 'Throughput tinggi, teras rangkaian'],
          ['Edge Router', 'Sempadan rangkaian', 'Pautan ke ISP/Internet, keselamatan sempadan'],
        ]}
      />

      {/* ---- WIRELESS AP TYPES, WLC, LWAP ---- */}
      <InfoCard title="Jenis-jenis Wireless Access Point" icon={Wifi}>
        <div className="grid sm:grid-cols-3 gap-2 text-sm mt-2">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Standalone / Autonomous AP</b> - dikonfigurasi & dikawal secara individu, sesuai rangkaian kecil-sederhana, tiada WLC diperlukan.</div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Controller-based AP</b> - dihubung ke Wireless Controller yang urus banyak AP berpusat, sesuai rangkaian besar.</div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><b>Cloud-managed AP</b> - dikonfigurasi & dipantau melalui platform awan.</div>
        </div>
      </InfoCard>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-8 shadow-sm">
        <h4 className="font-black text-slate-900 mb-1">Rajah: Hubungan WLC dengan Banyak AP</h4>
        <p className="text-xs text-slate-500 mb-6">WLC menguruskan konfigurasi, pengesahan &amp; keselamatan semua AP dari satu lokasi pusat.</p>
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-2xl bg-indigo-600 text-white px-6 py-3 font-black flex items-center gap-2"><Sliders size={18} /> Wireless LAN Controller (WLC)</div>
          <div className="flex gap-8 text-indigo-300 text-2xl leading-none">
            <span>/</span><span>|</span><span>\</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {['AP1', 'AP2', 'AP3'].map((ap) => (
              <div key={ap} className="flex flex-col items-center gap-1.5">
                <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs">{ap}</div>
                <div className="flex gap-1"><Users size={13} className="text-slate-400" /><Users size={13} className="text-slate-400" /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Wireless LAN Controller (WLC)" icon={Sliders}>
          <p>Peranti pengurusan rangkaian yang menguruskan beberapa AP secara berpusat - konfigurasi, pengesanan, pengesahan &amp; pengurusan.</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2"><b>+ Kelebihan:</b> Pengurusan berpusat, skalabiliti, keselamatan terpusat.</div>
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-2"><b>- Kekurangan:</b> Kos tinggi, sukar diurus, Single Point of Failure (SPOF).</div>
          </div>
        </InfoCard>
        <InfoCard title="Lightweight Wireless AP (LWAP)" icon={Wifi}>
          <p>AP direka khas untuk berfungsi bersama WLC - bergantung <b>sepenuhnya</b> kepada WLC untuk konfigurasi. Guna protokol <b>LWAPP</b> atau <b>CAPWAP</b> untuk berkomunikasi dengan WLC.</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2"><b>+ Kelebihan:</b> Pengurusan terpusat, skalabiliti, roaming lancar.</div>
            <div className="rounded-lg bg-rose-50 border border-rose-200 p-2"><b>- Kekurangan:</b> Bergantung penuh pada WLC, kos tambahan, konfigurasi terhad pada AP individu.</div>
          </div>
        </InfoCard>
      </div>

      <NotaPentingDevices>
        <b>Kebergantungan LWAP kepada WLC:</b> Jika WLC gagal berfungsi, <b>keseluruhan rangkaian LWAP turut gagal</b> - ini dipanggil <i>Single Point of Failure (SPOF)</i>. Sebaliknya, Autonomous/Standalone AP terus berfungsi secara individu walaupun tiada WLC, tetapi lebih sukar diurus dalam skala besar.
      </NotaPentingDevices>

      <RingkasanDevices>
        <b>End Node</b> (Desktop/Workstation/Laptop/Tablet/Smartphone) ialah peranti yang digunakan pengguna akhir. <b>Peripheral</b> (Printer/Scanner/NAS) melengkapkan fungsi input/output/storan yang dikongsi dalam rangkaian. <b>Router</b> hadir dalam 5 jenis (Home/Enterprise/Wireless/Core/Edge) mengikut skala. <b>WLC</b> mengurus banyak <b>LWAP</b> secara berpusat - cekap untuk rangkaian besar, tetapi mewujudkan risiko SPOF.
      </RingkasanDevices>
    </div>
  );
}

/* ---------------- NOTA 5: ALAMAT IP & SUBNETTING ---------------- */
function IPNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="IPv4" icon={Binary}>
          <p>Menggunakan alamat <b>32-bit</b> dan biasanya ditulis dalam empat bahagian perpuluhan (oktet), contohnya <code className="bg-slate-100 px-1.5 py-0.5 rounded">192.168.1.10</code>.</p>
        </InfoCard>
        <InfoCard title="IPv6" icon={Binary}>
          <p>Menggunakan alamat <b>128-bit</b> dan menyediakan ruang alamat yang jauh lebih besar berbanding IPv4.</p>
        </InfoCard>
      </div>

      <InfoCard title="Subnetting" icon={Waypoints}>
        <p>Subnetting membahagikan satu rangkaian kepada rangkaian yang lebih kecil (subnet). Ia membantu pengurusan alamat, pengasingan rangkaian dan kawalan trafik.</p>
        <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl bg-violet-50 border border-violet-200 p-3"><b className="text-violet-800">Network Address</b><p className="mt-1 text-violet-900">Menunjukkan rangkaian atau subnet.</p></div>
          <div className="rounded-xl bg-violet-50 border border-violet-200 p-3"><b className="text-violet-800">Host Address</b><p className="mt-1 text-violet-900">Mengenal pasti peranti dalam subnet.</p></div>
          <div className="rounded-xl bg-violet-50 border border-violet-200 p-3"><b className="text-violet-800">Default Gateway</b><p className="mt-1 text-violet-900">Laluan keluar peranti ke rangkaian lain.</p></div>
        </div>
      </InfoCard>

      <div className="rounded-2xl bg-slate-950 text-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm font-bold text-slate-200">Nak cuba kira subnet sendiri? Guna Kalkulator IP Address pada menu utama modul ini untuk pengiraan automatik lengkap dengan binary.</p>
        <span className="inline-flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-xl font-black text-sm whitespace-nowrap"><Calculator size={16} /> Kalkulator IP</span>
      </div>
    </div>
  );
}

/* ---------------- NOTA 6: PROTOKOL ---------------- */
function ProtocolNotes() {
  const rows = [
    ['TCP/IP', 'Set protokol asas yang digunakan untuk komunikasi dalam rangkaian dan internet.'],
    ['HTTP / HTTPS', 'Digunakan untuk komunikasi web. HTTPS menambah perlindungan melalui encryption.'],
    ['FTP', 'Digunakan untuk pemindahan fail antara sistem.'],
    ['SMTP', 'Digunakan untuk penghantaran e-mel.'],
    ['POP3', 'Digunakan untuk menerima atau mengambil e-mel daripada server.'],
    ['IMAP', 'Membolehkan e-mel diurus dan diselaraskan dengan server.'],
    ['DNS', 'Menukarkan nama domain kepada alamat IP yang boleh digunakan oleh peranti.'],
  ];
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <InfoCard title="Protokol rangkaian yang biasa digunakan" icon={Share2}>
        <p className="mb-4">Protokol ialah peraturan yang digunakan oleh peranti untuk berkomunikasi dan bertukar data.</p>
      </InfoCard>
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-indigo-50 text-indigo-900">
              <th className="text-left font-black p-4 w-48">Protokol</th>
              <th className="text-left font-black p-4">Fungsi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([name, desc], i) => (
              <tr key={name} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="p-4 font-black text-slate-900 align-top border-t border-slate-200">{name}</td>
                <td className="p-4 text-slate-600 align-top border-t border-slate-200">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- NOTA 7: KESELAMATAN ---------------- */
function SecurityNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <InfoCard title="Firewall" icon={ShieldCheck}>
        <p>Mengawal trafik masuk dan keluar berdasarkan peraturan keselamatan, menyaring trafik berdasarkan alamat IP, port dan protokol.</p>
        <div className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-3"><b>Network firewall</b> - tapis IP, port &amp; protokol.</div>
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-3"><b>Application firewall</b> - lindungi aplikasi web (cth. SQL injection).</div>
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-3"><b>NGFW</b> - penyaringan aplikasi + IDS/IPS.</div>
          <div className="rounded-xl bg-rose-50 border border-rose-200 p-3"><b>Virtual firewall</b> - berjalan dalam persekitaran maya/cloud.</div>
        </div>
      </InfoCard>

      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Antivirus & Encryption" icon={Bug}>
          <p><b>Antivirus</b> membantu mengesan, menyekat dan menangani perisian atau fail yang berbahaya kepada sistem.</p>
          <p className="mt-3"><b>Encryption</b> melindungi data dengan menukarkannya kepada bentuk yang sukar difahami tanpa kunci yang sesuai.</p>
        </InfoCard>
        <InfoCard title="VPN & Authentication" icon={KeyRound}>
          <p><b>VPN</b> mewujudkan sambungan rangkaian yang lebih terlindung melalui rangkaian awam, boleh digunakan untuk capaian jauh.</p>
          <p className="mt-3"><b>Authentication</b> memastikan pengguna yang cuba mengakses sistem ialah pengguna yang sah - contohnya akaun <b>Admin</b> (boleh ubah konfigurasi) berbanding <b>Pengguna biasa</b> (akses terhad).</p>
        </InfoCard>
      </div>
    </div>
  );
}

/* ---------------- NOTA 8: TROUBLESHOOTING ---------------- */
function TroubleshootingNotes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard title="Ping & Traceroute" icon={Activity}>
          <p><code className="bg-slate-100 px-1.5 py-0.5 rounded">ping</code> digunakan untuk menguji sama ada destinasi boleh dicapai dan memberi petunjuk asas tentang sambungan rangkaian.</p>
          <p className="mt-3"><code className="bg-slate-100 px-1.5 py-0.5 rounded">tracert</code> / <code className="bg-slate-100 px-1.5 py-0.5 rounded">traceroute</code> menunjukkan laluan atau hop yang dilalui oleh paket menuju ke destinasi.</p>
        </InfoCard>
        <InfoCard title="Wireshark" icon={Terminal}>
          <p>Wireshark ialah packet analyzer yang digunakan untuk melihat dan menganalisis trafik rangkaian bagi membantu mengenal pasti masalah komunikasi.</p>
        </InfoCard>
      </div>

      <InfoCard title="Command Line Tools" icon={Terminal}>
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><code className="font-black">ipconfig</code><p className="mt-1 text-sm">Melihat konfigurasi IP pada komputer.</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><code className="font-black">netstat</code><p className="mt-1 text-sm">Melihat sambungan dan statistik rangkaian.</p></div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><code className="font-black">nslookup</code><p className="mt-1 text-sm">Menguji resolusi nama domain menggunakan DNS.</p></div>
        </div>
      </InfoCard>

      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 text-sm font-bold text-amber-900">
        Urutan asas troubleshooting: periksa kabel &amp; kuasa &rarr; semak status sambungan &rarr; semak alamat IP &rarr; uji menggunakan ping &rarr; semak laluan dengan traceroute jika perlu &rarr; analisis trafik menggunakan packet analyzer.
      </div>
    </div>
  );
}

/* ---------------- SIMULASI 3D & AR ---------------- */
function Model3DAR() {
  const [activeId, setActiveId] = useState(networkModels[0].id);
  const model = networkModels.find((m) => m.id === activeId) || networkModels[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 md:p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-black text-teal-700">
              <Box size={15} /> MODEL INTERAKTIF 360&deg;
            </div>
            <h2 className="mt-3 text-2xl font-black text-slate-900">{model.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
              Seret model untuk memutarkannya, cubit atau gunakan roda tetikus untuk zum, dan pilih paparan skrin penuh bagi pemerhatian yang lebih jelas.
            </p>
          </div>
          <a
            href={model.page}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-black text-white hover:bg-slate-800"
          >
            <ExternalLink size={18} /> Buka Paparan Penuh
          </a>
        </div>

        <div className="relative aspect-video min-h-[380px] bg-slate-950">
          <iframe
            key={model.id}
            title={`Model 3D dan AR - ${model.title}`}
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
          Model <a href={model.page} target="_blank" rel="noreferrer" className="font-bold text-teal-700 hover:underline">{model.title}</a> oleh{' '}
          <a href={model.authorProfile} target="_blank" rel="noreferrer" className="font-bold text-teal-700 hover:underline">{model.author}</a> melalui Sketchfab.
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
        <h3 className="font-black text-slate-900 mb-4">Pilih model lain ({networkModels.length} model tersedia)</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {networkModels.map((item) => {
            const active = item.id === model.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={`text-left rounded-xl border p-4 transition-all ${active ? 'border-teal-500 bg-teal-50 shadow-sm' : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'}`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${active ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <Box size={16} />
                  </div>
                  {active && <span className="text-[10px] font-black uppercase tracking-wide text-teal-700">Aktif</span>}
                </div>
                <p className="mt-2.5 text-sm font-bold text-slate-800 leading-snug">{item.title}</p>
                <p className="text-[11px] text-slate-500 mt-1">oleh {item.author}</p>
              </button>
            );
          })}
        </div>
      </section>
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
  // Acak susunan soalan DAN susunan pilihan jawapan setiap soalan supaya
  // jawapan betul tidak sentiasa berada di kedudukan pertama.
  return shuffleArray(items).map((question) => ({
    ...question,
    options: shuffleArray(question.options),
  }));
}

function Quiz() {
  const [kpIndex, setKpIndex] = useState(0);
  const [highestKp, setHighestKp] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState(() => shuffleQuestions(ikr3043QuizSets[0].questions));

  const currentKp = ikr3043QuizSets[kpIndex];
  const kpQuestions = activeQuestions;

  const score = useMemo(() => {
    return kpQuestions.reduce((total, question, index) => total + (answers[index] === question.options.indexOf(question.correct) ? 1 : 0), 0);
  }, [answers, kpQuestions]);

  const passScore = 18;

  const retryLevel = () => {
    setAnswers({});
    setSubmitted(false);
    setActiveQuestions(shuffleQuestions(ikr3043QuizSets[kpIndex].questions));
  };

  const nextKp = () => {
    if (score >= passScore && kpIndex < ikr3043QuizSets.length - 1) {
      const nextIndex = kpIndex + 1;
      setHighestKp(previous => Math.max(previous, nextIndex));
      setKpIndex(nextIndex);
      setAnswers({});
      setSubmitted(false);
      setActiveQuestions(shuffleQuestions(ikr3043QuizSets[nextIndex].questions));
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== kpQuestions.length) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-black uppercase tracking-[.2em] text-blue-700">Tahap Kuiz</div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{currentKp.code} - {currentKp.title}</h2>
            <p className="text-sm text-slate-600 mt-2">Setiap KP mengandungi 30 soalan. Lulus minimum ialah 18/30.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ikr3043QuizSets.map((item, index) => (
              <button key={item.id} disabled={index > highestKp || (index === kpIndex && submitted && score < passScore)} onClick={() => {
                if (index <= highestKp) {
                  setKpIndex(index);
                  setAnswers({});
                  setSubmitted(false);
                  setActiveQuestions(shuffleQuestions(ikr3043QuizSets[index].questions));
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
              ? `Lulus ${currentKp.code}. Anda layak ${kpIndex < ikr3043QuizSets.length - 1 ? 'naik ke ' + ikr3043QuizSets[kpIndex + 1].code : 'menamatkan semua KP'}.`
              : `Belum lulus. Markah minimum ialah 18/30. Sila ulang ${currentKp.code} sebelum naik ke tahap seterusnya.`}
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
            {score >= passScore && kpIndex < ikr3043QuizSets.length - 1 && (
              <button onClick={nextKp} className="flex-1 bg-emerald-600 text-white px-6 py-4 rounded-xl font-black hover:bg-emerald-700">Naik ke {ikr3043QuizSets[kpIndex + 1].code}</button>
            )}
            <button onClick={retryLevel} className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-xl font-black hover:bg-slate-800"><RotateCcw size={19} /> Cuba Semula {currentKp.code}</button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- KALKULATOR IP ---------------- */
function parseIPStr(s) {
  const parts = String(s).trim().split('.');
  if (parts.length !== 4 || parts.some((x) => x === '' || !/^\d+$/.test(x) || Number(x) < 0 || Number(x) > 255)) {
    throw new Error('IP Address tidak sah. Gunakan format seperti 192.168.10.25');
  }
  return parts.map(Number);
}
function ipArrToInt(a) { return (((a[0] << 24) >>> 0) + (a[1] << 16) + (a[2] << 8) + a[3]) >>> 0; }
function intToIPStr(n) { return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.'); }
function binIPStr(s) { return parseIPStr(s).map((x) => x.toString(2).padStart(8, '0')).join('.'); }
function maskIntFromPrefix(prefix) { return prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0; }

function classifyIP(firstOctet) {
  if (firstOctet === 127) return 'loopback';
  if (firstOctet >= 1 && firstOctet <= 126) return 'A';
  if (firstOctet >= 128 && firstOctet <= 191) return 'B';
  if (firstOctet >= 192 && firstOctet <= 223) return 'C';
  if (firstOctet >= 224 && firstOctet <= 239) return 'D';
  if (firstOctet >= 240 && firstOctet <= 255) return 'E';
  return 'special';
}

const classLabels = {
  A: 'Class A',
  B: 'Class B',
  C: 'Class C',
  D: 'Class D (Multicast)',
  E: 'Class E (Eksperimen/Reserved)',
  loopback: 'Loopback (127.0.0.0/8) - bukan Class A biasa',
  special: 'Julat khas/tidak sah (0.x.x.x)',
};

const classTable = [
  ['A', '1 - 126', '255.0.0.0 (/8)', 'Rangkaian sangat besar'],
  ['B', '128 - 191', '255.255.0.0 (/16)', 'Rangkaian sederhana'],
  ['C', '192 - 223', '255.255.255.0 (/24)', 'Rangkaian kecil'],
  ['D', '224 - 239', 'Tiada mask host biasa', 'Multicast'],
  ['E', '240 - 255', 'Tiada mask host biasa', 'Eksperimen/Reserved'],
];

const commonCidr = [
  ['/24', '255.255.255.0', '254'],
  ['/25', '255.255.255.128', '126'],
  ['/26', '255.255.255.192', '62'],
  ['/27', '255.255.255.224', '30'],
  ['/28', '255.255.255.240', '14'],
  ['/29', '255.255.255.248', '6'],
  ['/30', '255.255.255.252', '2'],
];

const tutorialSteps = [
  { title: 'Kenal pasti Class IP.', text: <>Lihat oktet pertama. Contoh <code className="bg-slate-100 px-1 rounded">192</code>.x.x.x &rarr; antara 192-223 &rarr; <b>Class C</b>. Rujuk jadual Class di bawah.</> },
  { title: 'Tulis IP Address.', text: <>Contoh: <code className="bg-slate-100 px-1 rounded">192.168.10.25/24</code>. Nombor selepas <b>/</b> ialah prefix.</> },
  { title: 'Tukar prefix kepada subnet mask.', text: <>/24 bermaksud 24 bit ialah <b>1</b>, manakala 8 bit terakhir ialah <b>0</b> &rarr; <code className="bg-slate-100 px-1 rounded">255.255.255.0</code>.</> },
  { title: 'Tukar IP kepada binary.', text: <>Setiap oktet mempunyai 8 bit. Contoh 192 = <b>11000000</b>.</> },
  { title: 'Cari Network Address.', text: <>Lakukan operasi <b>AND</b> antara IP binary dan subnet mask binary.</> },
  { title: 'Cari Broadcast Address.', text: <>Ambil network dan tukar semua bit host kepada <b>1</b>.</> },
  { title: 'Cari host yang boleh digunakan.', text: <>Host pertama = Network + 1, host terakhir = Broadcast &minus; 1.</> },
  { title: 'Tentukan Gateway.', text: <>Gateway sering ditetapkan sebagai host pertama atau host terakhir.</> },
  { title: 'Formula bilangan host.', text: <>Usable host = 2<sup>(32&minus;prefix)</sup> &minus; 2.</> },
];

function IPCalculator() {
  const [ip, setIp] = useState('192.168.10.25');
  const [prefix, setPrefix] = useState(24);
  const [gatewayMode, setGatewayMode] = useState('first');
  const [gatewayCustom, setGatewayCustom] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    try {
      const ipArr = parseIPStr(ip);
      const p = Number(prefix);
      const cls = classifyIP(ipArr[0]);

      if (cls === 'D' || cls === 'E' || cls === 'loopback' || cls === 'special') {
        setResult({
          restricted: true,
          cls,
          clsLabel: classLabels[cls],
          ip: ipArr.join('.'),
          binaryIpRow: [ipArr.join('.'), binIPStr(ipArr.join('.'))],
        });
        setError('');
        return;
      }

      const ipInt = ipArrToInt(ipArr);
      const mask = maskIntFromPrefix(p);
      const network = (ipInt & mask) >>> 0;
      const wildcard = (~mask) >>> 0;
      const broadcast = (network | wildcard) >>> 0;
      const total = 2 ** (32 - p);
      const first = p >= 31 ? network : (network + 1) >>> 0;
      const last = p >= 31 ? broadcast : (broadcast - 1) >>> 0;
      const usable = p >= 31 ? (p === 31 ? 2 : 1) : Math.max(0, total - 2);

      let gateway;
      if (gatewayMode === 'first') gateway = intToIPStr(first);
      else if (gatewayMode === 'last') gateway = intToIPStr(last);
      else { gateway = gatewayCustom.trim(); parseIPStr(gateway); }

      const maskIP = intToIPStr(mask);
      const netIP = intToIPStr(network);
      const bcIP = intToIPStr(broadcast);
      const wcIP = intToIPStr(wildcard);

      setResult({
        restricted: false,
        ip: ipArr.join('.'), mask: maskIP, prefix: `/${p}`, wildcard: wcIP,
        network: netIP, broadcast: bcIP, first: intToIPStr(first), last: intToIPStr(last),
        hosts: usable.toLocaleString(), gateway, cls, clsLabel: classLabels[cls],
        binary: {
          ip: [ipArr.join('.'), binIPStr(ipArr.join('.'))],
          mask: [maskIP, binIPStr(maskIP)],
          network: [netIP, binIPStr(netIP)],
          broadcast: [bcIP, binIPStr(bcIP)],
          wildcard: [wcIP, binIPStr(wcIP)],
        },
      });
      setError('');
    } catch (e) {
      setError(e.message);
      setResult(null);
    }
  };

  const resetCalc = () => {
    setIp('192.168.10.25');
    setPrefix(24);
    setGatewayMode('first');
    setGatewayCustom('');
    setError('');
    setResult(null);
  };

  const resultRows = result && !result.restricted ? [
    ['IP Address', result.ip], ['Subnet Mask', result.mask], ['Prefix', result.prefix], ['Wildcard Mask', result.wildcard],
    ['Network Address', result.network], ['Broadcast Address', result.broadcast], ['First Usable Host', result.first],
    ['Last Usable Host', result.last], ['Usable Hosts', result.hosts], ['Gateway', result.gateway],
  ] : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-6 items-start">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2"><Calculator size={22} className="text-blue-600" /> Pengiraan IP Address</h2>
          <p className="text-sm text-slate-500 mt-1">Masukkan IPv4 dan prefix CIDR. Contoh: 192.168.10.25 / 24</p>

          <div className="grid sm:grid-cols-2 gap-4 mt-5">
            <label className="text-sm font-bold text-slate-700">
              IP Address
              <input value={ip} onChange={(e) => setIp(e.target.value)} placeholder="192.168.10.25" className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-normal outline-none focus:border-blue-500" />
            </label>
            <label className="text-sm font-bold text-slate-700">
              CIDR / Prefix
              <select value={prefix} onChange={(e) => setPrefix(Number(e.target.value))} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-normal outline-none focus:border-blue-500">
                {Array.from({ length: 33 }, (_, i) => i).map((n) => <option key={n} value={n}>/{n}</option>)}
              </select>
            </label>
            <label className="text-sm font-bold text-slate-700">
              Gateway
              <select value={gatewayMode} onChange={(e) => setGatewayMode(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-normal outline-none focus:border-blue-500">
                <option value="first">Host pertama (Network + 1)</option>
                <option value="last">Host terakhir (Broadcast - 1)</option>
                <option value="custom">Masukkan sendiri</option>
              </select>
            </label>
            <label className="text-sm font-bold text-slate-700">
              Gateway custom
              <input value={gatewayCustom} onChange={(e) => setGatewayCustom(e.target.value)} disabled={gatewayMode !== 'custom'} placeholder="Contoh: 192.168.10.1" className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-normal outline-none focus:border-blue-500 disabled:bg-slate-100" />
            </label>
          </div>

          <div className="flex gap-3 mt-5">
            <button onClick={calculate} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-black text-sm hover:bg-blue-700">Kira IP</button>
            <button onClick={resetCalc} className="bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl font-black text-sm hover:bg-slate-200">Reset</button>
          </div>

          {error && <div className="mt-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-sm font-bold text-rose-700">&#9888; {error}</div>}

          {result && result.restricted && (
            <div className="mt-6">
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm font-bold text-amber-900">
                &#9888; {result.ip} ialah <span className="underline">{result.clsLabel}</span>. Ini bukan alamat host IPv4 biasa, jadi pengiraan network/broadcast/host tidak sesuai digunakan seperti Class A/B/C.
              </div>
              <div className="mt-4 grid sm:grid-cols-2 gap-2.5">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <p className="text-[11px] font-black uppercase tracking-wide text-slate-400">IP Address</p>
                  <p className="font-mono text-sm font-bold text-slate-900 mt-0.5">{result.ip}</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <p className="text-[11px] font-black uppercase tracking-wide text-amber-500">Klasifikasi</p>
                  <p className="font-mono text-sm font-bold text-amber-900 mt-0.5">{result.clsLabel}</p>
                </div>
              </div>
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-xs font-mono">
                  <thead><tr className="bg-slate-100"><th className="text-left p-2.5 font-black">Bahagian</th><th className="text-left p-2.5 font-black">Decimal</th><th className="text-left p-2.5 font-black">Binary</th></tr></thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="p-2.5 border-t border-slate-200">Ip</td>
                      <td className="p-2.5 border-t border-slate-200">{result.binaryIpRow[0]}</td>
                      <td className="p-2.5 border-t border-slate-200 text-blue-700">{result.binaryIpRow[1]}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {result && !result.restricted && (
            <div className="mt-6">
              <div className="grid sm:grid-cols-2 gap-2.5">
                {resultRows.map(([label, value]) => (
                  <div key={label} className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                    <p className="text-[11px] font-black uppercase tracking-wide text-slate-400">{label}</p>
                    <p className="font-mono text-sm font-bold text-slate-900 break-all mt-0.5">{value}</p>
                  </div>
                ))}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:col-span-2">
                  <p className="text-[11px] font-black uppercase tracking-wide text-blue-400">IP Class (rujukan classful)</p>
                  <p className="font-mono text-sm font-bold text-blue-900 mt-0.5">{result.clsLabel}</p>
                </div>
              </div>

              <h3 className="text-lg font-black text-slate-900 mt-6 mb-3">Binary</h3>
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-xs font-mono">
                  <thead><tr className="bg-slate-100"><th className="text-left p-2.5 font-black">Bahagian</th><th className="text-left p-2.5 font-black">Decimal</th><th className="text-left p-2.5 font-black">Binary</th></tr></thead>
                  <tbody>
                    {Object.entries(result.binary).map(([key, [dec, bin]], i) => (
                      <tr key={key} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="p-2.5 border-t border-slate-200 capitalize">{key}</td>
                        <td className="p-2.5 border-t border-slate-200">{dec}</td>
                        <td className="p-2.5 border-t border-slate-200 text-blue-700">{bin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <aside className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm lg:sticky lg:top-4">
          <h2 className="text-lg font-black text-slate-900">Info Tutorial: Cara Mengira IP</h2>
          <p className="text-sm text-slate-500 mt-1">Ikut langkah ini untuk faham pengiraan secara manual.</p>

          <h3 className="text-sm font-black text-slate-900 mt-5 mb-2">Julat Kelas IP (Classful)</h3>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-xs font-mono">
              <thead><tr className="bg-slate-100"><th className="text-left p-2 font-black">Kelas</th><th className="text-left p-2 font-black">Oktet 1</th><th className="text-left p-2 font-black">Default Mask</th><th className="text-left p-2 font-black">Guna</th></tr></thead>
              <tbody>
                {classTable.map(([cls, range, mask, use], i) => (
                  <tr key={cls} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="p-2 border-t border-slate-200 font-black">{cls}</td>
                    <td className="p-2 border-t border-slate-200">{range}</td>
                    <td className="p-2 border-t border-slate-200">{mask}</td>
                    <td className="p-2 border-t border-slate-200 font-sans">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Nota: <code className="bg-slate-100 px-1 rounded">127.0.0.0/8</code> dikecualikan daripada Class A biasa kerana julat itu digunakan untuk <b>loopback</b>.</p>

          <div className="mt-5 space-y-3">
            {tutorialSteps.map((step, i) => (
              <div key={step.title} className="flex gap-3">
                <div className="min-w-[28px] h-7 rounded-full bg-blue-100 text-blue-700 font-black flex items-center justify-center text-xs">{i + 1}</div>
                <p className="text-sm text-slate-600"><b className="text-slate-900">{step.title}</b><br />{step.text}</p>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-black text-slate-900 mt-6 mb-2">Nilai CIDR yang biasa</h3>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-xs font-mono">
              <thead><tr className="bg-slate-100"><th className="text-left p-2 font-black">CIDR</th><th className="text-left p-2 font-black">Subnet Mask</th><th className="text-left p-2 font-black">Usable Host</th></tr></thead>
              <tbody>
                {commonCidr.map(([cidr, mask, host], i) => (
                  <tr key={cidr} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="p-2 border-t border-slate-200">{cidr}</td>
                    <td className="p-2 border-t border-slate-200">{mask}</td>
                    <td className="p-2 border-t border-slate-200">{host}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ---------------- KOMPONEN UTAMA ---------------- */
export default function IKR3043({ onBackToPortal }) {
  const [view, setView] = useState('menu');
  const [readState, setReadState] = useState(() => {
    const fallback = [false, false, false, false, false, false, false, false];
    try {
      const saved = JSON.parse(localStorage.getItem('ikr3043-read-state'));
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
    try { localStorage.setItem('ikr3043-read-state', JSON.stringify(fallback)); } catch { /* storan tidak tersedia */ }
  };

  const featureMeta = {
    quiz: { title: 'Kuiz Penilaian', subtitle: 'Penilaian berasaskan 150 soalan (5 KP) dengan mekanisme naik level / lulus.', icon: Award, accent: 'rose' },
    calculator: { title: 'Kalkulator IP Address', subtitle: 'Kira subnet mask, network, broadcast, host range dan gateway.', icon: Calculator, accent: 'blue' },
    model3d: { title: 'Simulasi 3D & AR', subtitle: 'Teroka model 3D peranti rangkaian sebenar secara 360 darjah.', icon: Box, accent: 'teal' },
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

    if (id === 'calculator' || id === 'model3d') {
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
    try { localStorage.setItem('ikr3043-read-state', JSON.stringify(nextReadState)); } catch { /* storan tidak tersedia */ }

    const nextInLine = sections[requested + 1];
    if (nextInLine) setView(nextInLine.id);
  };

  if (view !== 'menu') {
    const content = {
      intro: <IntroNotes />,
      types: <TypesNotes />,
      topology: <TopologyNotes />,
      devices: <DevicesNotes />,
      ip: <IPNotes />,
      protocol: <ProtocolNotes />,
      security: <SecurityNotes />,
      troubleshooting: <TroubleshootingNotes />,
      quiz: <Quiz />,
      calculator: <IPCalculator />,
      model3d: <Model3DAR />,
    }[view];

    const showCompleteButton = sections.some((section) => section.id === view);
    const headerMeta = sections.find((section) => section.id === view) || featureMeta[view] || sections[0];

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <div className="bg-slate-950 text-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Network size={30} className="text-blue-300" />
                <div>
                  <div className="text-[10px] uppercase tracking-[.2em] text-blue-300 font-black">Computer Network Fundamentals</div>
                  <div className="text-sm font-black">{completedCount}/{sections.length} bahagian</div>
                </div>
              </div>
              <div className="flex-1 max-w-md">
                <div className="flex items-center justify-between text-[10px] font-black tracking-[.18em] text-blue-200 uppercase">
                  <span>Progress</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-300 to-emerald-300 transition-all" style={{ width: `${progressPercent}%` }} />
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
        <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">IKR3043 Computer Fundamental Network - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>
      </div>
    );
  }

  return (
    <div className="course-menu-page min-h-screen bg-slate-50 text-slate-900">
      <ModuleMenu title="Modul IKR3043: Computer Fundamental Network" icon={sections[0].icon} secondaryIcon={sections[1].icon}
        onBack={onBackToPortal} topics={sections} read={readState} onTopic={section => openSection(section.id)} onReset={resetProgress}
        description={<>Nota asas rangkaian komputer dipecahkan kepada 8 bahagian: pengenalan, jenis rangkaian, topologi, peranti, alamat IP &amp; subnetting, protokol, keselamatan serta troubleshooting - lengkap dengan kalkulator IP dan kuiz 150 soalan.</>}>
        <ModuleActivities activities={featureCards} quizLocked={!readState[sections.length - 1]} onOpen={openSection} />
      </ModuleMenu>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-xs text-slate-500">IKR3043 Computer Fundamental Network - eSL-IKR, ADTEC JTM Kampus Sandakan</footer>
    </div>
  );
}
