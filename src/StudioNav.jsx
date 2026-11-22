import { useEffect, useRef, useState } from 'react';
import { Home, BookOpen, Box, Search, X, Code2, Server, Database, GraduationCap } from 'lucide-react';
import ManualLogo from './ManualLogo';
import ThemeToggle from './ThemeToggle';
import ProgressBackup from './ProgressBackup';

/** ONE responsive header. Top: static full logo + one search trigger.
 * Scrolled: rotating symbol only; click symbol to reveal the SAME search trigger.
 * Ctrl+K remains available anywhere. Search modal is shared by both states.
 */
export default function StudioNav({ modules, onModule, onLab, onHome, onSemester }) {
  const dialog = useRef(null);
  const input = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const [compact, setCompact] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const actions = [
    { id: 'home', title: 'Halaman utama', run: onHome },
    { id: 'semester', title: 'Pilih semester', run: onSemester },
    { id: 'lab', title: 'Makmal PC 3D · Perkakasan', run: () => onLab('') },
    { id: 'software', title: 'Makmal PC 3D · Perisian', run: () => onLab('perisian') },
    { id: 'builder', title: 'Pembina PC 3D', run: () => onLab('pembina') },
    ...Object.entries(modules || {}).map(([id, description]) => ({ id, title: id, description, run: () => onModule(id) })),
  ];
  const term = query.trim().toLowerCase().replace(/\s+/g, '');
  const results = actions.filter(a => `${a.title} ${a.description || ''}`.toLowerCase().replace(/\s+/g, '').includes(term));
  const launch = action => { setOpen(false); action.run(); };
  const showSearch = () => { setQuery(''); setSelected(0); setOpen(true); };

  useEffect(() => {
    const key = e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); setQuery(''); setSelected(0); setOpen(v => !v);
      }
    };
    const scroll = () => {
      const scrolled = window.scrollY > 60;
      setCompact(scrolled);
      if (!scrolled) setExpanded(false);
    };
    window.addEventListener('keydown', key);
    window.addEventListener('scroll', scroll, { passive:true });
    scroll();
    return () => { window.removeEventListener('keydown', key); window.removeEventListener('scroll', scroll); };
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
    { label:'Semester', Icon:BookOpen, run:onSemester },
    { label:'Makmal', Icon:Box, run:()=>onLab('') },
    { label:'Carian', Icon:Search, run:showSearch },
  ];

  return <>
    <nav className={`studio-nav${compact ? ' is-compact' : ''}${compact && expanded ? ' has-search' : ''}`}
      aria-label="Navigasi utama eSL-IKR">
      <div className="studio-brand"><ManualLogo onHome={onHome} /></div>
      <button type="button" className="studio-compact-toggle" aria-label={expanded ? 'Sembunyikan bar carian' : 'Tunjukkan bar carian'}
        aria-expanded={expanded} aria-controls="esl-search-trigger"
        onClick={() => setExpanded(v => !v)} title={expanded ? 'Tutup carian' : 'Buka carian'}>
        <span className="studio-compact-rotor" aria-hidden="true">
          <img src={`${import.meta.env.BASE_URL}eSL-IKR-mark.png`} className="studio-compact-face studio-compact-front"
            alt="" draggable="false" />
          <img src={`${import.meta.env.BASE_URL}eSL-IKR-mark.png`} className="studio-compact-face studio-compact-back"
            alt="" draggable="false" />
        </span>
      </button>
      <button type="button" className="studio-topsearch" id="esl-search-trigger" onClick={showSearch}
        aria-label="Cari modul, contoh firewall, VLAN atau IKR3153" title="Cari modul (Ctrl + K)">
        <Search size={17} aria-hidden="true" />
        <span>Cari modul, contoh: firewall, VLAN atau IKR3153</span><kbd>Ctrl K</kbd>
      </button>
      <span className="studio-symbols" role="img" aria-label="Kod, pelayan dan pangkalan data">
        <Code2 size={20} /><Server size={20} /><Database size={20} />
      </span>
      <button type="button" className="studio-lab-link" onClick={() => onLab('')}><Box size={15} aria-hidden="true" /><span>Makmal PC 3D</span></button>
      <div className="studio-tools"><ProgressBackup /><ThemeToggle /></div>
      <span className="studio-learning"><GraduationCap size={18} aria-hidden="true" />Pusat E-Pembelajaran</span>
    </nav>
    <nav className="studio-bottom" aria-label="Navigasi telefon">
      {links.map(({label,Icon,run}) => <button key={label} onClick={run}><Icon size={20} aria-hidden="true" /><span>{label}</span></button>)}
    </nav>
    <dialog ref={dialog} className="studio-dialog" aria-labelledby="studio-search-title"
      onCancel={() => setOpen(false)} onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="studio-dialog-head"><h2 id="studio-search-title">Cari modul atau makmal</h2><button type="button" onClick={() => setOpen(false)} aria-label="Tutup carian"><X size={20} /></button></div>
      <label className="sr-only" htmlFor="studio-query">Kata carian</label>
      <input ref={input} id="studio-query" placeholder="Contoh: IKR3033, fiber, perisian"
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
      <ul id="studio-results" role="listbox" aria-label="Hasil carian">
        {results.map((a,i) => <li key={a.id} id={`result-${a.id}`} role="option" aria-selected={i === selected}
          onMouseMove={() => setSelected(i)}><button type="button" tabIndex={-1} onClick={() => launch(a)}><strong>{a.title}</strong>{a.description && <span>{a.description.replace(a.id.toLowerCase(), '').trim()}</span>}</button></li>)}
      </ul>
      {!results.length && <p className="studio-empty" role="status">Tiada hasil. Cuba kod modul atau kata kunci lain.</p>}
      <p className="studio-hint">↑ ↓ Pilih · Enter Buka · Esc Tutup</p>
    </dialog>
  </>;
}
