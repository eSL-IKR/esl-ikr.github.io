import { createElement } from 'react';
import {
  Activity, BookOpen, Cable, ClipboardList, Cloud, Cpu, Filter, Flame, Globe, HardDrive, KeyRound, Layers, Lock,
  Network, Radio, Router, Scale, Server, Share2, ShieldAlert, ShieldCheck, Shuffle, Table, Terminal, Wifi, Workflow,
} from 'lucide-react';

/*
  Peta kata kunci -> ikon untuk tajuk (h3/h4) dalam nota modul. Kunci huruf kecil, dipadankan pada permulaan perkataan.
  Padanan pertama menang; tiada padanan -> BookOpen.
*/
const ICONS = {
  firewall: Flame, 'tembok api': Flame, dmz: ShieldCheck, acl: Filter, nat: Shuffle,
  'wi-fi': Wifi, wifi: Wifi, wlan: Wifi, frekuensi: Wifi, saluran: Wifi, antena: Wifi, liputan: Wifi, isyarat: Wifi,
  penyulitan: Lock, 'kata laluan': KeyRound,
  ancaman: ShieldAlert, serangan: ShieldAlert,
  keselamatan: ShieldCheck, security: ShieldCheck,
  booting: Terminal, boot: Terminal, cli: Terminal, perintah: Terminal, skrip: Terminal,
  router: Router, penghalaan: Router, routing: Router, ospf: Router, rip: Router,
  suis: Cable, switch: Cable, kabel: Cable, port: Cable,
  vlan: Network, stp: Workflow, subnet: Network, topologi: Network, rangkaian: Network, lan: Network,
  dns: Globe, dhcp: Share2, snmp: Activity, nms: Activity, pemantauan: Activity, monitor: Activity,
  raid: HardDrive, cakera: HardDrive, storan: HardDrive, nas: HardDrive,
  hypervisor: Layers, 'mesin maya': Layers, virtual: Layers,
  pelayan: Server, server: Server, awan: Cloud, cloud: Cloud,
  jadual: Table, perbandingan: Scale, vs: Scale,
  projek: ClipboardList, risiko: ClipboardList, gantt: ClipboardList, bajet: ClipboardList,
  komponen: Cpu, senibina: Cpu, peranti: Cpu, perkakasan: Cpu,
  aliran: Workflow, proses: Workflow, kitaran: Workflow,
  siaran: Radio, broadcast: Radio,
};

const escapeRegExp = (v) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const RULES = Object.entries(ICONS).map(([key, Icon]) => [new RegExp(`(^|[^a-z0-9])${escapeRegExp(key)}`), Icon]);

function findIcon(text) {
  const t = String(text || '').toLowerCase().slice(0, 120);
  const hit = RULES.find(([re]) => re.test(t));
  return hit ? hit[1] : BookOpen;
}

export default function HeadingIcon({ text, className = '', size = 20 }) {
  return createElement(findIcon(text), { size, className, 'aria-hidden': 'true' });
}
