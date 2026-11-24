// ESL-IKR STUDENT EXPERIENCE V1 — additive UI, no account or database.
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, BookOpen, GraduationCap, History, Wrench, ChevronRight, Home, Brain, ClipboardCheck } from 'lucide-react';
import { MODULE_NAMES } from './student-search';
export const LAST_KEY = 'ikr-last-module-v1';
export function readLastModule() {
 try { const v=localStorage.getItem(LAST_KEY); return Object.prototype.hasOwnProperty.call(MODULE_NAMES,v)?v:null; } catch { return null; }
}
export function storeLastModule(code) {
 if (!Object.prototype.hasOwnProperty.call(MODULE_NAMES,code)) return;
 try { localStorage.setItem(LAST_KEY,code); } catch { /* storage disabled */ }
}
export function ResumeLearning({code,semester,progress,onOpen}) {
 if (!code || !MODULE_NAMES[code]) return null;
 const valid = progress && Number.isFinite(progress.done) && Number.isFinite(progress.total) && progress.total>0;
 const pct=valid?Math.max(0,Math.min(100,Math.round(progress.done/progress.total*100))):0;
 return <section className="esls-resume" aria-labelledby="esls-resume-title">
  <div className="esls-resume-icon"><History aria-hidden="true" size={26}/></div>
  <div className="esls-resume-copy">
   <h2 id="esls-resume-title">Sambung pembelajaran anda</h2>
   <p className="esls-meta">Semester {semester} · {code}</p>
   <h3>{MODULE_NAMES[code]}</h3>
   {valid ? <><div className="esls-progress-label"><span>{progress.done}/{progress.total} bahagian dibuka</span><span>{pct}% bacaan</span></div><div className="esls-progress" role="progressbar" aria-label="Kemajuan bacaan" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}><span style={{width:`${pct}%`}}/></div></> : <p className="esls-meta">Belum ada rekod bacaan untuk modul ini.</p>}
   <p className="esls-meta">Buka semula modul terakhir pada peranti ini.</p>
  </div>
  <button type="button" className="esls-primary" onClick={()=>onOpen(code)}>Sambung Belajar <ArrowRight size={18} aria-hidden="true"/></button>
 </section>;
}
// ESL-IKR LEARNING HUB V1 — one section, original three actions.
export function LearningHub({onBegin, onReview, onPractice}) {
  const steps = [
    {Icon:BookOpen, title:'Baca nota', desc:'Fahami konsep asas.'},
    {Icon:Brain, title:'Jawab kuiz', desc:'Semak kefahaman.'},
    {Icon:Wrench, title:'Buat amali', desc:'Berlatih dalam simulator.'},
    {Icon:ClipboardCheck, title:'Ambil ujian', desc:'Nilai kemahiran anda.'},
  ];
  const paths = [
    {Icon:GraduationCap, title:'Saya baru bermula', desc:'Kenali asas komputer melalui IKR3013.', run:onBegin, primary:true},
    {Icon:BookOpen, title:'Ulang kaji', desc:'Pilih semester, nota dan kuiz.', run:onReview},
    {Icon:Wrench, title:'Lakukan amali', desc:'Terokai dua makmal 3D.', run:onPractice},
  ];
  return (
    <section id="eslux-guide" className="eslh-hub" aria-labelledby="eslh-title">
      <header className="eslh-head">
        <GraduationCap size={28} aria-hidden="true" />
        <div>
          <h2 id="eslh-title">Mulakan pembelajaran anda</h2>
          <p>Belajar mengikut tahap dan keperluan anda.</p>
        </div>
      </header>
      <div className="eslh-body">
        <div className="eslh-paths" aria-labelledby="eslh-path-title">
          <h3 id="eslh-path-title">Pilih laluan anda</h3>
          <div className="eslh-actions">
            {paths.map(({Icon,title,desc,run,primary}) => (
              <button type="button" key={title} onClick={run} className={primary ? 'eslh-action eslh-first' : 'eslh-action'}>
                <Icon size={23} aria-hidden="true" />
                <span className="eslh-action-copy">
                  <strong>{title}</strong>
                  <small>{desc}</small>
                  {primary && <span className="eslh-recommend">Disarankan untuk pemula</span>}
                </span>
                <ChevronRight size={19} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
        <div className="eslh-process" aria-labelledby="eslh-process-title">
          <h3 id="eslh-process-title">Cara pembelajaran</h3>
          <ol className="eslh-timeline">
            {steps.map(({Icon,title,desc},index) => (
              <li key={title}>
                <span className="eslh-step-no" aria-hidden="true">{index+1}</span>
                <Icon size={20} aria-hidden="true" />
                <span className="eslh-step-copy"><strong>{title}</strong><small>{desc}</small></span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
export function Breadcrumb({semester,code,searching,onHome,onSemester}) {
 return <nav className="esls-breadcrumb" aria-label="Laluan halaman"><ol>
 <li><button type="button" onClick={onHome}><Home size={16} aria-hidden="true"/>Utama</button></li>
 {searching ? <li aria-current="page"><ChevronRight size={15} aria-hidden="true"/>Hasil carian</li> : <><li><ChevronRight size={15} aria-hidden="true"/>{code?<button type="button" onClick={onSemester}>Semester {semester}</button>:<span aria-current="page">Semester {semester}</span>}</li>{code&&<li aria-current="page"><ChevronRight size={15} aria-hidden="true"/>{code}</li>}</>}
 </ol></nav>;
}
export function StudentFooter({onHome,onSemester,onGuide,onFaq}) {
 return <footer className="esls-footer"><div className="esls-footer-inner">
 <div className="esls-footer-brand"><img src={`${import.meta.env.BASE_URL}eSL-IKR-logo.png`} alt="eSL-IKR" width="190" height="54" loading="lazy" decoding="async"/><p>eSmart Learning IKR — portal pembelajaran interaktif Teknologi Komputer Rangkaian.</p><button type="button" onClick={onHome}>Kembali ke utama <ArrowRight size={15} aria-hidden="true"/></button></div>
 <div><h2>Pembelajaran</h2>{[1,2,3].map(n=><button type="button" key={n} onClick={()=>onSemester(n)}>Semester {n}</button>)}</div>
 <div><h2>Bantuan</h2><button type="button" onClick={onGuide}>Panduan pengguna</button><button type="button" onClick={onFaq}>Soalan lazim (FAQ)</button><p>Kemajuan disimpan pada pelayar anda.</p></div>
 <div className="esls-institution"><img src={`${import.meta.env.BASE_URL}adtec-jtm-sandakan.png`} alt="ADTEC JTM Kampus Sandakan" width="210" height="72" loading="lazy" decoding="async"/><p>ADTEC JTM Kampus Sandakan<br/>Teknologi Komputer Rangkaian</p></div>
 </div><p className="esls-copyright">© 2026 TKR ADTEC Sandakan</p></footer>;
}
// Defer only the decorative feature diagrams. Existing hero and rack engines keep their own visibility observers.
export function DeferredFeatures({children,eager=false}) {
 const ref=useRef(null), [ready,setReady]=useState(false);
 useEffect(()=>{
  if (ready) return;
  if (eager || !ref.current || typeof IntersectionObserver==='undefined') {setReady(true);return;}
  const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){setReady(true);observer.disconnect();}},{rootMargin:'400px 0px'});
  observer.observe(ref.current);return ()=>observer.disconnect();
 },[ready,eager]);
 return <div ref={ref} className="esls-deferred">{ready||eager?children:<div className="esls-feature-placeholder" aria-hidden="true"/>}</div>;
}
