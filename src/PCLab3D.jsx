import { useEffect, useState } from 'react';
import { ArrowLeft, ExternalLink, Loader2 } from 'lucide-react';
import './portal-pro.css';
// esl-portal-dark-only-v1 : simulator theme is independent of portal.

// Makmal PC 3D dimuat dalam iframe daripada public/pclab/ supaya simulator dan pembina
// kekal sebagai halaman bebas. initialTab: '' (perkakasan), 'perisian' atau 'pembina'.
export default function PCLab3D({ onBackToPortal, initialTab = '' }) {
  const [loaded, setLoaded] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const base = `${import.meta.env.BASE_URL}pclab/index.html`;
  const src = initialTab ? `${base}#${initialTab}` : base;

  // Terima keputusan Ujian Amali daripada simulator (iframe satu asal) dan simpan dalam pelayar.
  useEffect(() => {
    const onMsg = (e) => {
      if (e.origin !== window.location.origin) return;
      const d = e.data;
      if (!d || d.type !== 'ikr-ujian-amali') return;
      setLastResult(d);
      try {
        const all = JSON.parse(localStorage.getItem('ikr-pclab-keputusan') || '[]');
        all.push({ ...d, diterima: Date.now() });
        localStorage.setItem('ikr-pclab-keputusan', JSON.stringify(all.slice(-50)));
      } catch { /* storan tidak tersedia */ }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);


  return (
    <div className="min-h-screen bg-slate-950">
      <header className="pp-labbar">
        <button
          type="button"
          onClick={onBackToPortal}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-indigo-300"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Portal
        </button>
        <h1 className="text-sm font-bold tracking-tight sm:text-base">Makmal PC 3D</h1>
        <span className="hidden text-xs text-slate-400 md:inline">Simulator perkakasan dan perisian, pembina PC</span>
        <a className="rounded-lg px-2 py-2 text-xs font-semibold text-emerald-200 hover:bg-white/10" href={`${import.meta.env.BASE_URL}pclab/post-lab.html`} target="_blank" rel="noopener noreferrer">Demo POST · BM / EN</a>
        <a
          href={base}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-indigo-300"
        >
          Buka tab baharu
          <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </header>
      {lastResult && (
        <p className="fixed bottom-4 right-4 z-50 max-w-sm rounded-lg bg-emerald-900 px-4 py-2 text-sm text-emerald-50 shadow-lg" role="status">
          Keputusan ujian disimpan: {lastResult.score}% ({lastResult.pass ? 'Kompeten' : 'Belum Kompeten'}), kod {lastResult.kod}
        </p>
      )}
      <div className="pp-labframe">
        {!loaded && (
          <div className="pp-labload" role="status">
            <Loader2 className="size-6 animate-spin" aria-hidden="true" />
            Memuatkan Makmal PC 3D...
          </div>
        )}
        <iframe title="Makmal PC 3D" src={src} allow="clipboard-write; fullscreen" onLoad={() => setLoaded(true)} />
      </div>
    </div>
  );
}
