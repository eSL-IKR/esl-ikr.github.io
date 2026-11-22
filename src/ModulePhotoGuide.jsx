import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, Camera, ChevronLeft, ChevronRight, ImageOff, Info, CircuitBoard, Cable } from 'lucide-react';
import { photoSources, photoModules, hardwareExtras } from './module-photo-data.js';
import './module-photo-guide.css';

// Local educational photographs shipped with this portal (remain available offline).
const photoFiles = import.meta.glob('./module-photos/*.webp', { eager: true, import: 'default' });
const localPhoto = key => photoFiles[`./module-photos/${key}.webp`];
const localSources = {
  'motherboard-board': 'Papan induk', 'motherboard-rear-io': 'Panel I/O belakang',
  'jacket-stripper': 'Pengupas jaket kabel', 'wire-cutter': 'Pemotong wayar',
  'crimping-tool': 'Crimping tool', 'punch-down-tool': 'Punch down tool',
  'long-nose-pliers': 'Playar muncung tirus', 'screwdriver': 'Pemutar skru',
};
const originalCabling = [
  ['jacket-stripper','Pengupas jaket kabel','Kupas jaket luar kabel UTP dengan cermat supaya penebat pada setiap wayar kekal utuh.'],
  ['wire-cutter','Pemotong wayar','Selepas menyusun lapan wayar, potong hujungnya sama rata sebelum memasukkannya ke dalam palam RJ45.'],
  ['crimping-tool','Crimping tool','Selepas menyemak susunan wayar, masukkan palam RJ45 ke dalam rahang yang sepadan dan kelim palam pada kabel.'],
  ['punch-down-tool','Punch down tool','Tekan setiap wayar ke dalam terminal IDC pada keystone jack atau panel tampalan mengikut kod warna.'],
  ['long-nose-pliers','Playar muncung tirus','Gunakan hujung yang tirus untuk memegang bahagian kecil di ruang sempit.'],
  ['screwdriver','Pemutar skru','Pilih mata yang sepadan dengan kepala skru semasa memasang plat muka atau panel pada rak.'],
];
const makePhoto = (key, label, note) => {
  const entry = photoSources[key];
  if (entry) {
    const slug = encodeURIComponent(entry.filename.replace(/ /g, '_'));
    return {
      key, label, note,
      src: `https://commons.wikimedia.org/wiki/Special:FilePath/${slug}?width=960`,
      page: `https://commons.wikimedia.org/wiki/File:${slug}`,
      depicted: entry.subject, offline: false,
    };
  }
  const file = localPhoto(key);
  return { key, label, note, src:file, page:file, depicted:localSources[key] || label, offline:true };
};
function Photo({ entry, thumbnail=false }) {
  const [failed, setFailed] = useState(false);
  return failed || !entry.src ? <span className={'ikr-photo-unavailable' + (thumbnail ? ' is-small':'')}><ImageOff aria-hidden="true" size={thumbnail?16:36} /><span>{thumbnail?'Foto luar talian':'Gambar tidak dapat dimuat. Semak Internet atau buka sumber.'}</span></span>
    : <img src={entry.src} alt={thumbnail ? '' : `${entry.depicted} — foto rujukan untuk ${entry.label}`} loading={thumbnail?'lazy':'eager'} onError={()=>setFailed(true)} />;
}
export default function ModulePhotoGuide({ subject, topics = [] }) {
  const [selected, setSelected] = useState(0);
  const isCabling = subject === 'cabling' || subject === 'IKR3023';
  const isHardware = subject === 'hardware' || subject === 'IKR3013';
  let items;
  if (isCabling) items = originalCabling.map(([k,l,n])=>makePhoto(k,l,n));
  else {
    const keys = photoModules[isHardware?'IKR3013':subject] || [];
    items = keys.map((key,index)=>{
      const t = topics[index];
      return makePhoto(key,t?.title || `Gambar ${index + 1}`, t?.desc || t?.description || 'Foto rujukan bagi topik ini.');
    });
    if (isHardware) {
      // Start with two bundled real photographs so the module has an image offline.
      const localStart = hardwareExtras.slice(0,2).map(([k,l,n])=>makePhoto(k,l,n));
      const otherExamples = hardwareExtras.slice(2).map(([k,l,n])=>makePhoto(k,l,n));
      items = [...localStart, ...items, ...otherExamples];
    }
  }
  if (!items.length) return null;
  const index = Math.min(selected,items.length-1);
  const item = items[index];
  const title = isHardware?'Kenali komponen komputer':isCabling?'Alatan pemasangan rangkaian':`Galeri visual · ${subject}`;
  const Icon = isHardware ? CircuitBoard : isCabling ? Cable : Camera;
  const change = delta => setSelected(i=>(i+delta+items.length)%items.length);
  return <section className="ikr-photo-guide ikr-photo-guide-v2" aria-label={`${title}: gambar dan nota` }>
    <div className="ikr-guide-index">
      <div className="ikr-guide-heading"><span className="ikr-guide-eyebrow"><Camera size={14} aria-hidden="true"/> GAMBAR PEMBELAJARAN</span>
        <h2><Icon aria-hidden="true"/> {title}</h2><p>Tekan gambar atau tajuk untuk melihat gambar yang lebih besar bersama nota ringkas.</p></div>
      <div className="ikr-guide-options" role="group" aria-label="Senarai gambar rujukan">
        {items.map((entry,i)=><button key={`${entry.key}-${i}`} type="button" aria-pressed={i===index} onClick={()=>setSelected(i)}>
          <span className="ikr-thumb"><Photo key={`thumb-${entry.key}-${i}`} entry={entry} thumbnail /></span>
          <span className="ikr-option-copy"><strong>{entry.label}</strong><small>{i+1} / {items.length}</small></span>
        </button>)}
      </div>
      <p className="ikr-guide-small-note"><Info size={14} aria-hidden="true"/> Gambar ialah rujukan rupa atau persekitaran sebenar; ia mungkin bukan model perkakasan yang dinyatakan dalam nota.</p>
    </div>
    <figure className="ikr-guide-detail">
      <div className="ikr-photo-visual">
        <Photo key={`main-${item.key}-${index}`} entry={item}/>
        <span className="ikr-picture-badge">{item.offline?'Foto dalam projek':'Foto rujukan · internet'}</span>
      </div>
      <figcaption>
        <div className="ikr-guide-caption-top"><div><span className="ikr-guide-caption-kicker">NOTA RINGKAS</span><strong>{item.label}</strong></div>
          <span className="ikr-guide-counter">{String(index+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}</span></div>
        <p>{item.note}</p>
        <div className="ikr-guide-bottom">
          <span className="ikr-guide-image-kind">Dalam gambar: <b>{item.depicted}</b></span>
          <div className="ikr-guide-controls">
            <button type="button" aria-label="Gambar sebelumnya" onClick={()=>change(-1)}><ChevronLeft size={18}/></button>
            <button type="button" aria-label="Gambar seterusnya" onClick={()=>change(1)}><ChevronRight size={18}/></button>
          </div>
        </div>
        {item.page && <a className="ikr-guide-source" href={item.page} rel="noopener noreferrer" target="_blank">{item.offline?'Lihat gambar penuh':'Sumber & lesen gambar'} <ArrowUpRight size={14} aria-hidden="true"/></a>}
      </figcaption>
    </figure>
  </section>;
}
