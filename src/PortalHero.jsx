import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Boxes, Wrench, MonitorCog, X } from 'lucide-react';
import './portal-pro.css';

const HeroModel3D = lazy(() => import('./HeroModel3D'));
const MODEL_URL = `${import.meta.env.BASE_URL}models/gaming-pc.glb`;

function scrollToSemester() {
  const el = document.getElementById('pilih-semester');
  if (!el) return;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

export default function PortalHero() {
  const [isChooserOpen, setChooserOpen] = useState(false);
  const chooserTriggerRef = useRef(null);
  const chooserDialogRef = useRef(null);
  const chooserFirstLinkRef = useRef(null);
  // All generic Makmal links (desktop + phone) open the same 2-lab chooser.
  useEffect(() => {
    const openChooser = () => setChooserOpen(true);
    window.addEventListener('esl:open-lab-chooser', openChooser);
    return () => window.removeEventListener('esl:open-lab-chooser', openChooser);
  }, []);

  useEffect(() => {
    if (!isChooserOpen) return undefined;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    chooserFirstLinkRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setChooserOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !chooserDialogRef.current) return;
      const focusable = Array.from(
        chooserDialogRef.current.querySelectorAll('a[href], button:not([disabled])')
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      chooserTriggerRef.current?.focus();
    };
  }, [isChooserOpen]);

  return (
    <section className="pp-hero" aria-labelledby="pp-hero-title">
      <div className="pp-hero-bg" aria-hidden="true" />
      <div className="pp-hero-grid">
        <div>
          <p className="pp-eyebrow">
            <span className="pp-dot" aria-hidden="true" />
            eSL-IKR · Pembelajaran dan amali
          </p>
          <h2 id="pp-hero-title" className="pp-title">
            Fahami komputer dan rangkaian,<br className="hidden sm:block" />
            <span className="pp-grad">langkah demi langkah</span>
          </h2>
          <p className="pp-lead">
            Bina pemahaman melalui nota dan kuiz. Kemudian terokai komponen, pemasangan dan konfigurasi komputer dalam Makmal PC 3D.
          </p>
          <div className="pp-cta">
            <button
              ref={chooserTriggerRef}
              type="button"
              className="pp-btn pp-btn-primary"
              onClick={() => setChooserOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={isChooserOpen}
              aria-controls="pp-chooser-dialog"
            >
              Pilihan Makmal 3D
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
            <button type="button" className="pp-btn pp-btn-ghost" onClick={scrollToSemester}>
              Pilih semester
            </button>
          </div>
          <dl className="pp-stats">
            <div>
              <dt>Semester</dt>
              <dd>3</dd>
            </div>
            <div>
              <dt>Mod pembelajaran</dt>
              <dd>3</dd>
            </div>
            <div>
              <dt>Pasang Windows</dt>
              <dd>10 &amp; 11</dd>
            </div>
          </dl>
          <ol className="studio-route" aria-label="Laluan pembelajaran"><li>01 · Nota</li><li>02 · Latihan</li><li>03 · Ujian</li></ol>
        </div>
        <div className="pp-hero-preview">
          <Suspense
            fallback={
              <div className="pp-stage pp-stage-skeleton" aria-hidden="true">
                <div className="pp-stage-canvas" />
              </div>
            }
          >
            <HeroModel3D src={MODEL_URL} />
          </Suspense>

        </div>
      </div>
      {isChooserOpen && createPortal(
        <div
          className="pp-chooser-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setChooserOpen(false);
          }}
        >
          <section
            id="pp-chooser-dialog"
            ref={chooserDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pp-chooser-heading"
            aria-describedby="pp-chooser-description"
            className="pp-chooser-dialog"
          >
            <div className="pp-chooser-heading-row">
              <div>
                <p className="pp-chooser-eyebrow">eSL-IKR · SIMULATOR AMALI</p>
                <h2 id="pp-chooser-heading">Pilih Makmal Interaktif</h2>
                <p id="pp-chooser-description">Dua simulator amali, dibuka pada halaman masing-masing.</p>
              </div>
              <button
                type="button"
                className="pp-chooser-close"
                onClick={() => setChooserOpen(false)}
                aria-label="Tutup pilihan makmal"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="pp-chooser-grid">
              <a
                ref={chooserFirstLinkRef}
                className="pp-chooser-option"
                href={`${import.meta.env.BASE_URL}pclab/index.html`}
              >
                <img
                  className="pp-chooser-logo"
                  src={`${import.meta.env.BASE_URL}assets/makmal-pc-3d.webp`}
                  alt=""
                  width="84"
                  height="84"
                  decoding="async"
                />
                <span className="pp-chooser-option-content">
                  <strong>Makmal PC 3D</strong>
                  <span>Terokai perkakasan, perisian dan pembina PC.</span>
                  <span className="pp-chooser-open">Buka simulator <ArrowRight size={16} aria-hidden="true" /></span>
                </span>
              </a>
              <a
                className="pp-chooser-option"
                href={`${import.meta.env.BASE_URL}structured-cabling/index.html`}
              >
                <img
                  className="pp-chooser-logo"
                  src={`${import.meta.env.BASE_URL}assets/structured-cabling-3d.webp`}
                  alt=""
                  width="84"
                  height="84"
                  decoding="async"
                />
                <span className="pp-chooser-option-content">
                  <strong>Structured Cabling 3D</strong>
                  <span>Kenali kabel, RJ45, alat dan patch panel. Misi 1 tersedia.</span>
                  <span className="pp-chooser-open">Buka simulator <ArrowRight size={16} aria-hidden="true" /></span>
                </span>
              </a>
            </div>
          </section>
        </div>,
        document.body
      )}
    </section>
  );
}

const LAB_CARDS = [
  { tab: '', icon: Wrench, title: 'Simulator perkakasan', text: 'Bongkar dan pasang PC komponen demi komponen. Mod Belajar, Latihan dan Ujian dengan petunjuk lokasi dalam 3D.' },
  { tab: 'perisian', icon: MonitorCog, title: 'Simulator perisian', text: 'Dari pendrive boot sehingga desktop: BIOS, partition, Windows 10 dan 11, rangkaian serta alat semakan.' },
  { tab: 'pembina', icon: Boxes, title: 'Pembina PC 3D', text: 'Pilih casing, motherboard, CPU dan lain-lain, kemudian lihat keserasian dan hasilnya dalam 3D.' },
];

export function LabBand({ onOpenLab }) {
  return (
    <section className="pp-lab" aria-labelledby="pp-lab-title">
      <div className="pp-lab-head">
        <div>
          <p className="text-[11px] font-bold tracking-[.3em] text-indigo-700 uppercase font-mono mb-3">{'// Makmal PC 3D'}</p>
          <h2 id="pp-lab-title" className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
            Latih tangan sebelum menyentuh perkakasan
          </h2>
        </div>
      </div>
      <div className="pp-lab-grid">
        {LAB_CARDS.map(({ tab, icon: Icon, title, text }) => (
          <button key={title} type="button" className="pp-lab-card" onClick={() => onOpenLab(tab)}>
            <span className="pp-lab-icon">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
            <span className="pp-go">
              Buka
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
