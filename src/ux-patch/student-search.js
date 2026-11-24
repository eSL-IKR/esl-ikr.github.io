// ESL-IKR STUDENT EXPERIENCE V1 — local, deterministic search; no network calls.
export const MODULE_NAMES = Object.freeze({
 IKR3013:'Computer Hardware & Software', IKR3023:'Network Structured Cabling',
 IKR3033:'Fiber Cabling', IKR3043:'Computer Fundamental Network',
 IKR3053:'Wireless Technology', IKR3082:'Network Documentation',
 IKR3063:'Ethernet Switching Essentials', IKR3073:'Basic Routing Configuration',
 IKR3093:'Server Essentials', IKR3103:'Network Operating System',
 IKR3113:'Network Monitoring Services', IKR3133:'Network Security Essentials',
 IKR3122:'Project Management', IKR3143:'Network Security Hardening',
 IKR3153:'Network Automation Services', IKR3163:'Network Maintenance',
});
const ALIASES = {
 IKR3013:'komputer pc pasang pemasangan bina motherboard cpu ram gpu perkakasan hardware perisian windows sistem operasi computer assembly',
 IKR3023:'kabel lan ethernet rj45 buat crimping crimp susun wayar t568a t568b patch panel cable tester pengkabelan network cable',
 IKR3033:'fiber fibre gentian optik kabel splicing otdr',
 IKR3043:'kira pengiraan ip address alamat ip subnet mask subnetting rangkaian asas network calculator ping',
 IKR3053:'wifi wi fi wireless tanpa wayar access point ap',
 IKR3082:'dokumentasi rekod rajah topologi audit network documentation',
 IKR3063:'switch suis vlan trunk native port security stp ethernet',
 IKR3073:'router routing penghala konfigurasi static route cisco',
 IKR3093:'server pelayan raid vm virtual machine hypervisor pasang pemasangan os',
 IKR3103:'linux ubuntu dns dhcp apache nginx web server directory openldap nos',
 IKR3113:'monitor pemantauan nms snmp nas storan raid',
 IKR3133:'firewall keselamatan security konfigurasi peraturan network',
 IKR3122:'projek pengurusan project survey tinjauan tapak wlan',
 IKR3143:'hardening pengukuhan security keselamatan audit',
 IKR3153:'automasi automation python bash skrip ansible git',
 IKR3163:'maintenance penyelenggaraan troubleshooting ipv4 ipv6 vlsm subnet ancaman',
 lab:'komputer pc pasang pemasangan bongkar perkakasan motherboard cpu ram hardware amali simulator',
 software:'windows 10 11 pasang pemasangan install bios boot pendrive partition perisian os sistem operasi amali simulator',
 builder:'bina build pc komputer komponen gaming pilih keserasian motherboard gpu',
 cabling:'kabel lan rj45 buat pasang crimping crimp t568a t568b patch panel cable tester amali simulator pengkabelan',
};
const STOP = new Set(['cara','bagaimana','macam','mana','nak','ingin','mahu','saya','untuk','yang','dan','guna','menggunakan','belajar','the','how','to','a','an','of','and']);
export function normalize(value) {
 return String(value || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/\bikr[\s-]+(?=\d)/g,'ikr').replace(/[^a-z0-9]+/g,' ').trim();
}
export function rankSearch(actions, query) {
 const phrase = normalize(query);
 if (!phrase) return actions;
 const all = phrase.split(' ');
 const tokens = all.filter(t => !STOP.has(t));
 if (!tokens.length) return [];
 return actions.map((action,index)=>{
  const title = normalize(action.title), id=normalize(action.id), desc=normalize(action.description), aliases=normalize(ALIASES[action.id]);
  const fields=[id,title,aliases,desc];
  const has = (field,token)=>token.length<=2 ? field.split(' ').includes(token) : field.includes(token);
  if (!tokens.every(t=>fields.some(f=>has(f,t)))) return null;
  const score=(id===phrase?100:0)+(title.includes(phrase)?35:0)+(aliases.includes(phrase)?18:0)+(desc.includes(phrase)?8:0)+tokens.reduce((sum,t)=>sum+(has(id,t)?16:0)+(has(title,t)?10:0)+(has(aliases,t)?5:0)+(has(desc,t)?2:0),0);
  return {action,index,score};
 }).filter(Boolean).sort((a,b)=>b.score-a.score||a.index-b.index).map(x=>x.action);
}
