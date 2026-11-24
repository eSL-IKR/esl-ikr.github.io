import { useEffect, useRef, useState } from 'react';
import { Home, BookOpen, Box, Search, X, CircleHelp } from 'lucide-react';
import ManualLogo from './ManualLogo';
import ProgressBackup from './ProgressBackup';
import { MODULE_NAMES, rankSearch } from './ux-patch/student-search';

/** Single persistent responsive header with original search and progress backup. */
export default function StudioNav({ modules, onModule, onLab, onHome, onSemester, onGuide, onChooseLab, activeNav }) {
  const dialog = useRef(null);
  const input = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);

  const actions = [
    { id: 'home', title: 'Halaman utama', run: onHome },
    { id: 'semester', title: 'Pilih semester', run: onSemester },
    { id: 'panduan', title: 'Panduan pengguna dan FAQ', run: onGuide },
    { id: 'cabling', title: 'Structured Cabling 3D', description: 'RJ45 crimping patch panel kabel rangkaian', run: () => { window.location.href = `${import.meta.env.BASE_URL}structured-cabling/index.html`; } },
    { id: 'lab', title: 'Makmal PC 3D · Perkakasan', run: () => onLab('') },
    { id: 'software', title: 'Makmal PC 3D · Perisian', run: () => onLab('perisian') },
    { id: 'builder', title: 'Pembina PC 3D', run: () => onLab('pembina') },
    ...Object.entries(modules || {}).map(([id, description]) => ({ id, title: `${id} · ${MODULE_NAMES[id] || id}`, description, run: () => onModule(id) })),
  ];
  const results = rankSearch(actions, query);
  const current = label => activeNav === label ? 'location' : undefined;
  const launch = action => { setOpen(false); action.run(); };
  const showSearch = () => { setQuery(''); setSelected(0); setOpen(true); };

  useEffect(() => {
    const key = e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); setQuery(''); setSelected(0); setOpen(v => !v);
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (open) {
      if (!node.open) node.showModal();
      input.current?.focus();
    } else if (node.open) node.close();
  }, [open]);

  const links = [
    { label:'Utama', Icon:Home, run:onHome },
    { label:'Modul', Icon:BookOpen, run:onSemester },
    { label:'Makmal', Icon:Box, run:onChooseLab },
    { label:'Carian', Icon:Search, run:showSearch },
  ];
  const desktopLinks = [...links.slice(0, 3), {label:'Panduan', Icon:CircleHelp, run:onGuide}];

  return <>
    <nav className="studio-nav eslr-nav" aria-label="Navigasi utama eSL-IKR">
      <div className="studio-brand"><ManualLogo onHome={onHome} /></div>
      <div className="eslr-navlinks">
        {desktopLinks.map(({label,Icon,run}) => <button key={label} type="button" onClick={run} aria-current={current(label)}><Icon size={17} aria-hidden="true"/><span>{label === 'Makmal' ? 'Makmal 3D' : label}</span></button>)}
      </div>
      <button type="button" className="studio-topsearch" id="esl-search-trigger" onClick={showSearch} aria-haspopup="dialog" aria-expanded={open}
        aria-label="Cari modul, contoh firewall, VLAN atau IKR3153" title="Cari modul (Ctrl + K)">
        <Search size={19} aria-hidden="true" />
        <span>Cari modul atau topik...</span><kbd>Ctrl K</kbd>
      </button>
      <button type="button" className="eslr-help" onClick={onGuide} aria-current={current('Panduan')} aria-label="Panduan pengguna" title="Panduan pengguna"><CircleHelp size={21}/></button>
      <div className="studio-tools"><ProgressBackup /></div>
    </nav>
    <nav className="studio-bottom" aria-label="Navigasi telefon dan tablet">
      {links.map(({label,Icon,run}) => <button type="button" key={label} onClick={run} aria-current={label==='Carian'?undefined:current(label)} aria-pressed={label==='Carian'?open:undefined}><Icon size={22} aria-hidden="true"/><span>{label}</span></button>)}
    </nav>
    <dialog ref={dialog} className="studio-dialog" aria-labelledby="studio-search-title"
      onCancel={() => setOpen(false)} onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="studio-dialog-head"><h2 id="studio-search-title">Cari modul atau makmal</h2><button type="button" onClick={() => setOpen(false)} aria-label="Tutup carian"><X size={20} /></button></div>
      <label className="sr-only" htmlFor="studio-query">Kata carian</label>
      <input ref={input} id="studio-query" placeholder="Contoh: pasang komputer, kabel LAN, IP"
        value={query} onChange={e => { setQuery(e.target.value); setSelected(0); }} role="combobox"
        aria-expanded="true" aria-controls="studio-results" aria-autocomplete="list"
        aria-activedescendant={results[selected] ? `result-${results[selected].id}` : undefined}
        onKeyDown={e => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault(); const next = Math.max(0,Math.min(results.length - 1,selected + (e.key === 'ArrowDown' ? 1 : -1)));
            setSelected(next); document.getElementById(`result-${results[next]?.id}`)?.scrollIntoView({block:'nearest'});
          }
          if (e.key === 'Enter' && results[selected]) { e.preventDefault(); launch(results[selected]); }
        }} />
      <div className="esls-search-suggestions"><span>Cadangan carian</span>{['Komputer','Kabel LAN','IP address','Windows','Firewall'].map(word=><button key={word} type="button" onClick={()=>{setQuery(word);setSelected(0);input.current?.focus();}}>{word}</button>)}</div>
      <p className="esls-search-count" role="status" aria-live="polite">{results.length} hasil</p>
      <ul id="studio-results" role="listbox" aria-label="Hasil carian">
        {results.map((a,i) => <li key={a.id} id={`result-${a.id}`} role="option" aria-selected={i === selected}
          onMouseMove={() => setSelected(i)}><button type="button" tabIndex={-1} onClick={() => launch(a)}><strong>{a.title}</strong>{a.description && <span>{a.description.replace(a.id.toLowerCase(), '').trim()}</span>}</button></li>)}
      </ul>
      {!results.length && <p className="studio-empty" role="status">Tiada padanan. Cuba kata kunci pendek seperti kabel, komputer, IP atau Windows.</p>}
      <p className="studio-hint">↑ ↓ Pilih · Enter Buka · Esc Tutup</p>
    </dialog>
  </>;
}
