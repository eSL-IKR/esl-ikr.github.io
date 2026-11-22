import { useRef, useState } from 'react';
import { Download, Upload, Save } from 'lucide-react';

// Sandaran kemajuan tanpa akaun: eksport / import fail JSON.
// Hanya kunci milik eSL-IKR (awalan ikr / pembina-) disalin.
const OWN_KEY = /^(ikr|pembina-)/i;
const FORMAT = 'emodul-ikr-kemajuan';

function readAll() {
  const data = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && OWN_KEY.test(k)) data[k] = localStorage.getItem(k);
    }
  } catch { /* storan tidak tersedia */ }
  return data;
}

export default function ProgressBackup() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const fileRef = useRef(null);

  const exportJson = () => {
    const data = readAll();
    const n = Object.keys(data).length;
    if (!n) { setMsg('Tiada kemajuan untuk disimpan lagi.'); return; }
    const blob = new Blob([JSON.stringify({ format: FORMAT, versi: 1, tarikh: new Date().toISOString(), data }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `kemajuan-esl-ikr-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    setMsg(`Fail disimpan (${n} rekod).`);
  };

  const importJson = async (e) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    try {
      if (f.size > 2_000_000) throw new Error('besar');
      const j = JSON.parse(await f.text());
      if (j?.format !== FORMAT || typeof j.data !== 'object' || !j.data) throw new Error('format');
      let n = 0;
      for (const [k, v] of Object.entries(j.data)) {
        if (OWN_KEY.test(k) && typeof v === 'string' && v.length < 500_000) { localStorage.setItem(k, v); n++; }
      }
      setMsg(`${n} rekod dipulihkan. Memuat semula...`);
      setTimeout(() => window.location.reload(), 900);
    } catch {
      setMsg('Fail tidak sah. Pilih fail kemajuan yang dieksport daripada portal ini.');
    }
  };

  return (
    <div className="relative print:hidden">
      <button
        type="button"
        onClick={() => { setOpen(o => !o); setMsg(''); }}
        aria-expanded={open}
        aria-label="Simpan atau pulihkan kemajuan"
        title="Simpan / pulihkan kemajuan"
        className="inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <Save size={18} aria-hidden="true" />
      </button>
      {open && (
        <div role="dialog" aria-label="Sandaran kemajuan" className="absolute right-0 top-12 z-[70] w-72 rounded-2xl border border-slate-200 bg-white p-4 text-slate-700 shadow-xl">
          <p className="text-sm font-bold">Sandaran kemajuan</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">Kemajuan disimpan dalam pelayar ini sahaja. Simpan fail untuk dibawa ke komputer lain atau jika data pelayar dipadam.</p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={exportJson} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-indigo-700">
              <Download size={14} aria-hidden="true" /> Simpan
            </button>
            <button type="button" onClick={() => fileRef.current?.click()} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold hover:bg-slate-50">
              <Upload size={14} aria-hidden="true" /> Pulihkan
            </button>
          </div>
          <input ref={fileRef} type="file" accept="application/json,.json" onChange={importJson} className="hidden" />
          <p role="status" aria-live="polite" className="mt-2 min-h-4 text-xs font-semibold text-indigo-700">{msg}</p>
        </div>
      )}
    </div>
  );
}
