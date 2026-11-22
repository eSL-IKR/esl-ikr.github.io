// eSL-IKR visual gallery progressive enhancement for previously compiled dist output.
// Source Vite (npm run dev) uses ModulePhotoGuide; this only mounts if it is missing.
(function(){
'use strict';
const sources={
  "cpu": {
    "filename": "Cpu.jpg",
    "subject": "CPU komputer sebenar"
  },
  "cpu2": {
    "filename": "CPU-INTEL-CORE.jpg",
    "subject": "Pemproses Intel Core"
  },
  "mb": {
    "filename": "Computer_motherboard.jpg",
    "subject": "Papan induk komputer"
  },
  "mb2": {
    "filename": "Computer_Motherboard_Closeup.jpg",
    "subject": "Butiran papan induk"
  },
  "mb3": {
    "filename": "Desktop_Computer_Motherboard.jpg",
    "subject": "Soket dan slot motherboard"
  },
  "ram": {
    "filename": "RAM_Module_(SDRAM-DDR4).jpg",
    "subject": "Modul RAM DDR4"
  },
  "ram2": {
    "filename": "Memoria_RAM.JPG",
    "subject": "RAM dalam slot motherboard"
  },
  "ram3": {
    "filename": "DIMM_IMGP5807_smial_wp.jpg",
    "subject": "Perbandingan modul memori"
  },
  "ssd": {
    "filename": "Last_and_next-generation_storage_media.jpg",
    "subject": "Perbandingan SSD dan HDD"
  },
  "hdd": {
    "filename": "HDD-SATA.jpg",
    "subject": "Pemacu cakera keras SATA"
  },
  "psu": {
    "filename": "ATX_Computer_power_supply_unit.jpg",
    "subject": "Bekalan kuasa ATX"
  },
  "psu2": {
    "filename": "Power_Supply_ATX-450PNF.jpg",
    "subject": "Port dan suis bekalan kuasa"
  },
  "gpu": {
    "filename": "NVIDIA_GPU.jpg",
    "subject": "Cip GPU NVIDIA"
  },
  "gpu2": {
    "filename": "NVIDIA_G80_GPU.jpg",
    "subject": "Cip grafik komputer"
  },
  "cooler": {
    "filename": "1U_rack_mount_server_cooling_system_fan_heat-sink.jpg",
    "subject": "Kipas dan heatsink pelayan"
  },
  "cable": {
    "filename": "RJ45_Ethernet_Cable.jpg",
    "subject": "Kabel Ethernet RJ45"
  },
  "patchcable": {
    "filename": "Patch_cable_with_RJ45_connector.jpg",
    "subject": "Kabel patch RJ45"
  },
  "patchpanel": {
    "filename": "19-inch_rackmount_Ethernet_switches_and_patch_panels.jpg",
    "subject": "Switch dan patch panel dalam rak"
  },
  "patchback": {
    "filename": "Yellow_Network_Cables_Patchpanel_rear.jpg",
    "subject": "Belakang patch panel berlabel"
  },
  "networkcable": {
    "filename": "Network_cables_and_switch.jpg",
    "subject": "Kabel dan suis Ethernet"
  },
  "networkrack": {
    "filename": "Computer_rack_with_switches_and_cables.jpg",
    "subject": "Rak suis rangkaian"
  },
  "cablingrack": {
    "filename": "Networking_Rack.jpg",
    "subject": "Pengurusan kabel dalam rak"
  },
  "fiber": {
    "filename": "Optical_patchcord.jpg",
    "subject": "Patch cord gentian optik"
  },
  "fiber2": {
    "filename": "Optical_fiber_connectors-optical_patch_cable-01ASD.jpg",
    "subject": "Kepala penyambung gentian optik"
  },
  "splicer": {
    "filename": "Optic_fibre_splicer.jpg",
    "subject": "Mesin fusion splicer"
  },
  "splicer2": {
    "filename": "Fujikura-Fusion_Splicer_70S-01bASD.jpg",
    "subject": "Mesin pencantum fiber Fujikura"
  },
  "splicing": {
    "filename": "Optical_fiber_fusion_splicing.jpg",
    "subject": "Kerja fusion splicing"
  },
  "router": {
    "filename": "Wireless_Router.jpg",
    "subject": "Router tanpa wayar"
  },
  "router2": {
    "filename": "Wi-fi_router.jpg",
    "subject": "Router Wi-Fi"
  },
  "ap": {
    "filename": "Wireless_access_point.jpg",
    "subject": "Wireless access point"
  },
  "ap2": {
    "filename": "Access-point-wireless.jpg",
    "subject": "Peranti access point"
  },
  "antenna": {
    "filename": "Yagi-Uda_antenna_for_Wi-Fi_on_Router.jpg",
    "subject": "Antena luaran Wi-Fi"
  },
  "switch": {
    "filename": "Network_switches_arranged_in_a_server_rack_with_visible_LED_lights_indicating_connection_status_and_power_levels.jpg",
    "subject": "Switch Ethernet dalam rak"
  },
  "console": {
    "filename": "CiscoConsoleCable.jpg",
    "subject": "Kabel console Cisco"
  },
  "networkcore": {
    "filename": "Network_core_(14072854771).jpg",
    "subject": "Peralatan routing dan switching"
  },
  "serverrack": {
    "filename": "Computer_server_rack.jpg",
    "subject": "Rak pelayan komputer"
  },
  "serverrack2": {
    "filename": "Servers_in_a_Rack.jpg",
    "subject": "Barisan pelayan dalam rak"
  },
  "serverrack3": {
    "filename": "Computer_rack_HP.jpg",
    "subject": "Pelayan HP dan UPS dalam rak"
  },
  "server": {
    "filename": "CSIRO_ScienceImage_2042_A_row_of_computer_servers_in_a_server_rack.jpg",
    "subject": "Sistem pelayan dalam pusat data"
  },
  "servertech": {
    "filename": "Technician_with_laptop_working_on_server_rack_at_NERSC.jpg",
    "subject": "Juruteknik menyelenggara server"
  },
  "firewall": {
    "filename": "Barracuda_Networks_Spam_&_virus_firewall_400_(1).jpg",
    "subject": "Peralatan firewall Barracuda"
  },
  "firewallrack": {
    "filename": "Rack_with_varoius_servers.jpg",
    "subject": "Rak pelayan dan firewall"
  },
  "nas": {
    "filename": "Synology_ds410.JPG",
    "subject": "Storan rangkaian Synology NAS"
  },
  "nas2": {
    "filename": "Synology_nas_413j_back_open.jpg",
    "subject": "Bahagian dalam NAS Synology"
  },
  "nas3": {
    "filename": "Network_Attached_Storage.jpg",
    "subject": "Peranti network attached storage"
  },
  "nettopology": {
    "filename": "LAN-physicalTopology.png",
    "subject": "Pelan sambungan rangkaian LAN"
  },
  "netdiagram": {
    "filename": "Network_topology_diagram.png",
    "subject": "Rajah topologi rangkaian"
  },
  "netlayout": {
    "filename": "Network_layout.jpg",
    "subject": "Pelan susun atur rangkaian"
  },
  "admin": {
    "filename": "Professional_System_Administrator.jpg",
    "subject": "Pentadbir sistem di bilik pelayan"
  },
  "technician": {
    "filename": "Network_technician_troubleshooting_connection_issues.jpg",
    "subject": "Juruteknik menyemak rangkaian"
  },
  "worktech": {
    "filename": "Network_server_and_technician.jpg",
    "subject": "Juruteknik server dan perkakasan"
  },
  "storage": {
    "filename": "Sun_StorEdge_3300_(1).jpg",
    "subject": "Storan rak pelayan"
  },
  "catplug": {
    "filename": "Cat-5e_Ethernet_network_cable_RJ45_end_connectors.jpg",
    "subject": "Hujung penyambung kabel RJ45"
  },
  "networkport": {
    "filename": "Network_connector_(14017157970).jpg",
    "subject": "Penyambung rangkaian"
  },
  "fiberpatch": {
    "filename": "Optical_fiber_connectors-Splice_box-01ASD.jpg",
    "subject": "Kotak sambungan kabel fiber"
  },
  "cooler2": {
    "filename": "CPU_fan_and_heatsink.jpg",
    "subject": "Kipas dan heatsink CPU"
  },
  "keyboard": {
    "filename": "Computer_keyboard._15.jpg",
    "subject": "Papan kekunci komputer sebenar"
  },
  "virtualbox": {
    "filename": "Virtualbox_6.0_screenshot.png",
    "subject": "Paparan Oracle VirtualBox (mesin maya)"
  },
  "terminal": {
    "filename": "Terminal-linux-ubuntu.png",
    "subject": "Terminal Linux Ubuntu"
  },
  "zabbix": {
    "filename": "Zabbix_Dashboard.png",
    "subject": "Papan pemuka pemantauan Zabbix"
  },
  "nagios": {
    "filename": "Nagios_main_screen.png",
    "subject": "Skrin pemantauan Nagios"
  },
  "bmon": {
    "filename": "Bmon-expanded.png",
    "subject": "Perisian pemantauan bandwidth bmon"
  }
};
const mapping={
  "IKR3013": [
    "cpu",
    "mb",
    "ram",
    "ssd",
    "psu",
    "cooler2",
    "virtualbox",
    "keyboard"
  ],
  "IKR3033": [
    "fiber",
    "fiber2",
    "fiberpatch",
    "splicer",
    "splicing",
    "fiber",
    "splicer2",
    "technician"
  ],
  "IKR3043": [
    "networkrack",
    "netlayout",
    "nettopology",
    "switch",
    "router",
    "console",
    "firewall",
    "technician"
  ],
  "IKR3053": [
    "ap",
    "ap2",
    "router",
    "ap",
    "antenna",
    "router2",
    "ap2",
    "antenna"
  ],
  "IKR3082": [
    "netlayout",
    "networkrack",
    "technician",
    "nettopology",
    "netdiagram",
    "admin",
    "console",
    "servertech"
  ],
  "IKR3063": [
    "switch",
    "patchpanel",
    "networkport",
    "console",
    "networkcable",
    "switch",
    "networkcore",
    "networkrack"
  ],
  "IKR3073": [
    "networkcore",
    "serverrack",
    "router",
    "nettopology",
    "networkcable",
    "console",
    "networkrack",
    "netdiagram"
  ],
  "IKR3093": [
    "server",
    "virtualbox",
    "networkrack",
    "cooler",
    "storage",
    "terminal",
    "servertech",
    "serverrack2"
  ],
  "IKR3103": [
    "serverrack2",
    "server",
    "networkcore",
    "serverrack",
    "admin",
    "serverrack3",
    "networkrack",
    "servertech"
  ],
  "IKR3113": [
    "zabbix",
    "nagios",
    "bmon",
    "nas",
    "nas2",
    "storage",
    "nas3",
    "serverrack3"
  ],
  "IKR3133": [
    "firewall",
    "firewallrack",
    "networkrack",
    "firewall",
    "networkcore",
    "router",
    "serverrack",
    "servertech"
  ],
  "IKR3122": [
    "netlayout",
    "technician",
    "ap",
    "antenna",
    "router2",
    "networkrack",
    "cablingrack",
    "nettopology"
  ],
  "IKR3143": [
    "firewall",
    "firewallrack",
    "networkrack",
    "servertech",
    "networkcore",
    "admin"
  ],
  "IKR3153": [
    "terminal",
    "virtualbox",
    "console",
    "bmon",
    "networkrack",
    "serverrack"
  ],
  "IKR3163": [
    "technician",
    "networkrack",
    "nettopology",
    "netdiagram",
    "router",
    "servertech"
  ]
};
const hardware=[["motherboard-board", "Papan induk", "Perhatikan soket CPU, slot RAM, port PCIe dan bahagian I/O pada papan induk."], ["motherboard-rear-io", "Panel I/O belakang", "Kenal pasti port USB, audio, video dan rangkaian pada belakang komputer."], ["cpu2", "Pemproses CPU", "Komponen yang memproses arahan. Kenal pasti bentuk soket sebelum pemasangan."], ["ram3", "Jenis memori komputer", "Perhatikan kedudukan takuk pada modul RAM. Generasi berbeza tidak boleh ditukar sesuka hati."], ["gpu", "Pemproses grafik", "GPU memproses data grafik. Kad grafik lengkap biasanya dipasang pada slot PCIe motherboard."], ["psu", "Bekalan kuasa", "PSU menyediakan bekalan kuasa kepada papan induk, pemacu dan kad grafik."], ["psu2", "Port kuasa PSU", "Perhatikan sambungan AC dan suis kuasa di bahagian belakang PSU."], ["ssd", "SSD berbanding HDD", "SSD dan HDD menyimpan data secara kekal tetapi mempunyai teknologi berbeza."], ["hdd", "Pemacu HDD SATA", "HDD menggunakan piring magnet; sambung kabel SATA data dan kuasa dengan betul."], ["cooler", "Kipas dan heatsink", "Penyejukan membantu menyingkirkan haba pada CPU atau peranti berprestasi tinggi."]];
const local={"crimping-tool": "assets/crimping-tool-DTOiywst.webp", "jacket-stripper": "assets/jacket-stripper-DnMNgwq7.webp", "wire-cutter": "assets/wire-cutter-Df8cIaQ8.webp", "screwdriver": "assets/screwdriver-1wmoRRpt.webp", "motherboard-rear-io": "assets/motherboard-rear-io-CJfOUdWN.webp", "long-nose-pliers": "assets/long-nose-pliers-DTT2T-Bz.webp", "motherboard-board": "assets/motherboard-board-W8qA8zFP.webp", "punch-down-tool": "assets/punch-down-tool-DPacq5Qv.webp"};
const base=new URL('.',document.currentScript?.src||location.href).href;
const safe=str=>String(str||'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const url=(key)=>{
 const s=sources[key];
 if(s){const slug=encodeURIComponent(s.filename.replace(/ /g,'_'));return {src:'https://commons.wikimedia.org/wiki/Special:FilePath/'+slug+'?width=960',page:'https://commons.wikimedia.org/wiki/File:'+slug,depicted:s.subject,offline:false}}
 return {src:local[key]?new URL(local[key],base).href:'',page:local[key]?new URL(local[key],base).href:'',depicted:key.replaceAll('-',' '),offline:true}
};
function makeCard(key,label,note){return {key,label,note,...url(key)}}
function button(entry,i,count){return '<button type="button" data-guide-pick="'+i+'" aria-pressed="false"><span class="ikr-thumb"><img loading="lazy" src="'+safe(entry.src)+'" alt=""></span><span class="ikr-option-copy"><strong>'+safe(entry.label)+'</strong><small>'+(i+1)+' / '+count+'</small></span></button>'}
function ensure(){
 const menus=document.querySelectorAll('.course-overview');
 menus.forEach(menu=>{
 const title=menu.querySelector('.course-hero h1')?.textContent||'';
 const code=title.match(/IKR\d{4}/)?.[0];
 if(!code||code==='IKR3023'||!mapping[code])return;
 if(menu.querySelector('.ikr-photo-guide'))return; // React source already renders gallery
 if(code==='IKR3013'){
  const legacy=menu.parentElement?.querySelector('.course-extras > .ikr-photo-guide');
  if(legacy)legacy.style.display='none';
 }
 const topicEls=Array.from(menu.querySelectorAll('.course-topic-copy'));
 const items=mapping[code].map((key,i)=>{const s=topicEls[i];return makeCard(key,s?.querySelector('strong')?.textContent||'Topik '+(i+1),s?.querySelector('span')?.textContent||'Foto rujukan berkaitan topik.')});
 if(code==='IKR3013'){
   const photoStart=hardware.slice(0,2).map(([key,label,note])=>makeCard(key,label,note));
   const photoMore=hardware.slice(2).map(([key,label,note])=>makeCard(key,label,note));
   items.unshift(...photoStart);
   items.push(...photoMore);
 }
 const sect=document.createElement('section');sect.className='ikr-photo-guide ikr-photo-guide-v2';sect.dataset.enhancedGallery=code;
 sect.setAttribute('aria-label','Galeri gambar '+code);
 sect.innerHTML='<div class="ikr-guide-index"><div class="ikr-guide-heading"><span class="ikr-guide-eyebrow">▣ GAMBAR PEMBELAJARAN</span><h2>▦ '+(code==='IKR3013'?'Kenali komponen komputer':'Galeri visual · '+code)+'</h2><p>Pilih gambar untuk melihat foto sebenar bersama nota ringkas di panel kanan.</p></div><div class="ikr-guide-options">'+items.map((entry,i)=>button(entry,i,items.length)).join('')+'</div><p class="ikr-guide-small-note">ⓘ Gambar rujukan berkaitan topik; bukan pengesahan model perkakasan yang sama.</p></div><figure class="ikr-guide-detail"><div class="ikr-photo-visual" data-guide-visual></div><figcaption data-guide-caption></figcaption></figure>';
 menu.appendChild(sect);
 let active=0;
 const show=(i)=>{
  active=(i+items.length)%items.length;
  const item=items[active];
  sect.querySelectorAll('[data-guide-pick]').forEach((b,j)=>b.setAttribute('aria-pressed',String(j===active)));
  const visual=sect.querySelector('[data-guide-visual]');visual.textContent='';
  const img=document.createElement('img');img.src=item.src;img.alt=item.depicted+' — foto rujukan untuk '+item.label;img.loading='eager';
  img.onerror=()=>{visual.replaceChildren();const err=document.createElement('div');err.className='ikr-photo-unavailable';err.textContent='Gambar tidak dapat dimuat. Semak Internet atau buka sumber.';visual.appendChild(err)};
  visual.appendChild(img);
  const badge=document.createElement('span');badge.className='ikr-picture-badge';badge.textContent=item.offline?'Foto dalam projek':'Foto rujukan · internet';visual.appendChild(badge);
  sect.querySelector('[data-guide-caption]').innerHTML='<div class="ikr-guide-caption-top"><div><span class="ikr-guide-caption-kicker">NOTA RINGKAS</span><strong>'+safe(item.label)+'</strong></div><span class="ikr-guide-counter">'+String(active+1).padStart(2,'0')+' / '+String(items.length).padStart(2,'0')+'</span></div><p>'+safe(item.note)+'</p><div class="ikr-guide-bottom"><span class="ikr-guide-image-kind">Dalam gambar: <b>'+safe(item.depicted)+'</b></span><div class="ikr-guide-controls"><button type="button" aria-label="Gambar sebelumnya" data-delta="-1">‹</button><button type="button" aria-label="Gambar seterusnya" data-delta="1">›</button></div></div><a class="ikr-guide-source" target="_blank" rel="noopener noreferrer" href="'+safe(item.page)+'">'+(item.offline?'Lihat gambar penuh':'Sumber & lesen gambar')+' ↗</a>';
 };
 sect.addEventListener('error',evt=>{
  const img=evt.target;
  if(img instanceof HTMLImageElement && img.closest('.ikr-thumb')){
    const span=document.createElement('span');span.className='ikr-thumb-missing';span.title='Foto memerlukan Internet';span.textContent='▧';
    img.replaceWith(span);
  }
 },true);
 sect.addEventListener('click',evt=>{
  const picker=evt.target.closest('[data-guide-pick]');if(picker){show(Number(picker.dataset.guidePick));return}
  const delta=evt.target.closest('[data-delta]');if(delta)show(active+Number(delta.dataset.delta));
 });
 show(0);
 });
}
let scheduled=false;
const ob=new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;ensure()})});
ob.observe(document.body,{childList:true,subtree:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ensure);else ensure();
})();
