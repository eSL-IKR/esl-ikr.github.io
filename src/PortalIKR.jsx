import SemesterRacks from './SemesterRacks';
import { LandingSupport } from './ux-patch/LandingSupport';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Box, Cpu, CircuitBoard, Network, Cable, ArrowLeft, Calculator, ChevronRight, Search, X, Loader2, Code2, Server, Database, GraduationCap, Waves, ClipboardCheck, Router, Terminal, Radar, Flame, Compass, ShieldCheck, Bot, Wrench} from 'lucide-react';

import PortalHero, { LabBand } from './PortalHero';
import ThemeToggle from './ThemeToggle';
import ProgressBackup from './ProgressBackup';
import useTheme from './useTheme';
import StudioNav from './StudioNav';
import './studio.css';
import './ux-patch/responsive-ux.css'; // ESL-IKR RESPONSIVE UX V1
import { ResumeLearning, LearningHub, Breadcrumb, StudentFooter, DeferredFeatures, readLastModule, storeLastModule } from './ux-patch/StudentExperience';
import { rankSearch, MODULE_NAMES } from './ux-patch/student-search';
import './ux-patch/student-experience.css'; // ESL-IKR STUDENT EXPERIENCE V1
// ESL-IKR LEARNING HUB V1

// Import modul menggunakan lazy loading untuk penjimatan data internet
const ModuleIKR3013 = lazy(() => import('./IKR3013')); 
const ModuleIKR3023 = lazy(() => import('./IKR3023'));
const ModuleIKR3033 = lazy(() => import('./IKR3033'));
const ModuleIKR3043 = lazy(() => import('./IKR3043'));
const ModuleIKR3053 = lazy(() => import('./IKR3053'));
const ModuleIKR3082 = lazy(() => import('./IKR3082'));
const ModuleIKR3093 = lazy(() => import('./IKR3093'));
const ModuleIKR3063 = lazy(() => import('./IKR3063'));
const ModuleIKR3073 = lazy(() => import('./IKR3073'));
const ModuleIKR3103 = lazy(() => import('./IKR3103'));
const ModuleIKR3113 = lazy(() => import('./IKR3113'));
const ModuleIKR3133 = lazy(() => import('./IKR3133'));
const ModuleIKR3122 = lazy(() => import('./IKR3122'));
const ModuleIKR3143 = lazy(() => import('./IKR3143'));
const ModuleIKR3153 = lazy(() => import('./IKR3153'));
const ModuleIKR3163 = lazy(() => import('./IKR3163'));
const ModulePCLab = lazy(() => import('./PCLab3D'));
const InkOrbitFeatures = lazy(() => import('./components/ui/ink-orbit-features'));

// Komponen Skrin Loading (Responsif)
const LoadingScreen = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white relative overflow-hidden px-4 text-center">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900"></div>
    <Loader2 size={48} className="text-blue-500 animate-spin mb-4 relative z-10" />
    <h2 className="text-xl md:text-2xl font-bold relative z-10 tracking-wide">Memuatkan Sistem...</h2>
    <p className="text-slate-400 text-xs md:text-sm mt-2 relative z-10">Menyediakan persekitaran pembelajaran.</p>
  </div>
);

const FEATURES = {
  IKR3013: [['ai', 'Perunding AI']],
  IKR3023: [['3d', 'Simulasi Rak 3D']],
  IKR3033: [['ai', 'FiberPintar AI'], ['otdr', 'OTDR']],
  IKR3043: [['calc', 'Kalkulator IP'], ['quiz', 'Kuiz 150 soalan']],
  IKR3053: [['quiz', 'Kuiz']],
  IKR3082: [['quiz', 'Kuiz']],
  IKR3063: [['quiz', 'Kuiz']],
  IKR3073: [['quiz', 'Kuiz']],
  IKR3093: [['quiz', 'Kuiz']],
  IKR3103: [['quiz', 'Kuiz 150 soalan']],
  IKR3113: [['quiz', 'Kuiz 180 soalan']],
  IKR3133: [['quiz', 'Kuiz 120 soalan']],
  IKR3122: [['quiz', 'Kuiz 180 soalan']],
  IKR3143: [['quiz', 'Kuiz 120 soalan']],
  IKR3153: [['quiz', 'Kuiz 80 soalan']],
  IKR3163: [['quiz', 'Kuiz 100 soalan']],
};

const FEATURE_ICONS = { ai: Bot, '3d': Box, calc: Calculator, otdr: Radar, quiz: ClipboardCheck };

// Kemajuan bacaan dibaca daripada localStorage. Kebanyakan modul simpan '<kod>-read-state' (tatasusunan benar/palsu);
// IKR3013 dan IKR3023 simpan bilangan topik dibuka (8 topik setiap satu).
const LEGACY_PROGRESS = { IKR3013: { key: 'ikr3013_progress', total: 8 }, IKR3023: { key: 'ikr3023_progress', total: 8 } };

function readProgress(code) {
  try {
    const legacy = LEGACY_PROGRESS[code];
    if (legacy) {
      const done = Math.min(legacy.total, Math.max(0, parseInt(localStorage.getItem(legacy.key), 10) || 0));
      return { done, total: legacy.total };
    }
    const saved = JSON.parse(localStorage.getItem(`${code.toLowerCase()}-read-state`));
    if (Array.isArray(saved) && saved.length > 0) return { done: saved.filter(Boolean).length, total: saved.length };
  } catch { /* storan tidak tersedia atau data rosak */ }
  return null;
}

function CardMeta({ code, progress }) {
  const features = FEATURES[code] || [];
  const p = progress[code];
  const pct = p ? Math.round((p.done / p.total) * 100) : 0;
  return (
    <div className="relative z-10 mb-5 md:mb-6">
      <ul className="flex flex-wrap gap-2 mb-4" aria-label="Ciri modul">
        {features.map(([key, label]) => {
          const Icon = FEATURE_ICONS[key];
          return (
            <li key={label} className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
              <Icon size={13} aria-hidden="true" /> {label}
            </li>
          );
        })}
      </ul>
      {p && (
        <div>
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1.5">
            <span>{p.done === p.total ? 'Selesai dibaca' : p.done === 0 ? 'Belum dibaca' : 'Bacaan'}</span>
            <span>{p.done}/{p.total} bahagian</span>
          </div>
          <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Kemajuan bacaan">
            <div className={`h-full rounded-full transition-all ${p.done === p.total ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}

const SEMESTERS = [
  { n: 1, count: 6, hover: 'hover:border-blue-300 hover:shadow-[0_16px_36px_rgb(37,99,235,0.15)]', title: 'group-hover:text-blue-700', chev: 'text-blue-600' },
  { n: 2, count: 7, hover: 'hover:border-cyan-300 hover:shadow-[0_16px_36px_rgb(6,182,212,0.15)]', title: 'group-hover:text-cyan-700', chev: 'text-cyan-600' },
  { n: 3, count: 3, hover: 'hover:border-violet-300 hover:shadow-[0_16px_36px_rgb(124,58,237,0.15)]', title: 'group-hover:text-violet-700', chev: 'text-violet-600' },
];

const SEM_OF = {
  IKR3013: 1,
  IKR3023: 1,
  IKR3033: 1,
  IKR3043: 1,
  IKR3053: 1,
  IKR3082: 1,
  IKR3063: 2,
  IKR3073: 2,
  IKR3093: 2,
  IKR3103: 2,
  IKR3113: 2,
  IKR3133: 2,
  IKR3122: 2,
  IKR3143: 3,
  IKR3153: 3,
  IKR3163: 3,
};

const MODULE_TEXT = {
  IKR3013: 'ikr3013 computer hardware & software pelajari anatomi dalaman komputer, evolusi komponen fizikal, sistem operasi, dan gunakan perunding ai untuk mereka spesifikasi pc. perunding ai',
  IKR3023: 'ikr3023 network structured cabling kuasai topologi rangkaian, standard pengkabelan, jenis media kabel, fungsi patch panel, dan simulasi rak server 3d maya. simulasi rak 3d',
  IKR3033: 'ikr3033 fiber cabling kuasai struktur gentian optik, pemilihan kabel dan penyambung, fusion splicing, pengujian kuasa optik, otdr serta konsultasi fiberpintar ai. fiberpintar ai otdr',
  IKR3043: 'ikr3043 computer fundamental network nota asas rangkaian, jenis rangkaian, topologi, peranti, alamat ip & subnetting, protokol, keselamatan dan troubleshooting, lengkap dengan kalkulator ip dan kuiz 150 soalan. kalkulator ip kuiz 150 soalan',
  IKR3053: 'ikr3053 wireless technology wireless access point, senibina ap, konfigurasi rf (2.4ghz/5ghz, channel, antenna), band steering dan piawaian wi-fi 802.11, lengkap dengan kuiz. kuiz',
  IKR3082: 'ikr3082 network documentation senarai semak pemasangan & konfigurasi, rajah rangkaian & topologi, prosedur rekod konfigurasi, audit dan alat bantu, lengkap dengan kuiz. kuiz',
  IKR3063: 'ikr3063 ethernet switching essentials jenis suis, kaedah pensuisan, antara muka, konfigurasi asas, vlan, inter-vlan routing dan keselamatan rangkaian (stp & port security), lengkap dengan kuiz. kuiz',
  IKR3073: 'ikr3073 basic routing configuration pengenalan router, boot & ios, path determination, packet forwarding, konfigurasi asas, jadual penghalaan & static routing, lengkap dengan kuiz. kuiz',
  IKR3093: 'ikr3093 server essentials senibina pelayan, mesin maya & hypervisor, pemasangan perkakasan, penyejukan, pengujian & raid, perisian os server, instalasi dan pengujian os, lengkap dengan kuiz. kuiz',
  IKR3103: 'ikr3103 network operating system perkhidmatan rangkaian di linux: web server (apache/nginx), dns (bind9), dhcp (isc) dan directory server (openldap), lengkap dengan kuiz 150 soalan. kuiz 150 soalan',
  IKR3113: 'ikr3113 network monitoring services pemantauan rangkaian (nms, snmp) dan storan nas/raid, lengkap dengan kuiz 180 soalan. kuiz 180 soalan',
  IKR3133: 'ikr3133 network security essentials konsep, dasar, peraturan dan konfigurasi firewall rangkaian, lengkap dengan kuiz 120 soalan. kuiz 120 soalan',
  IKR3122: 'ikr3122 project management tinjauan tapak, wlan, liputan isyarat dan lukisan rangkaian, lengkap dengan kuiz 180 soalan. kuiz 180 soalan',
  IKR3143: 'ikr3143 network security hardening pengukuhan keselamatan rangkaian, dasar & audit, peralatan rangkaian dan sistem, lengkap dengan kuiz 120 soalan. kuiz 120 soalan',
  IKR3153: 'ikr3153 network automation services python, bash, perl, ansible/chef/puppet, git dan skrip automasi rangkaian, lengkap dengan kuiz 80 soalan. kuiz 80 soalan',
  IKR3163: 'ikr3163 network maintenance ipv4, subnetting, vlsm, ipv6, ancaman siber dan hardening end node, lengkap dengan kuiz 100 soalan. kuiz 100 soalan',
};

export default function PortalIKR() {
  const [activeSLe, setActiveSLe] = useState(null);
  const [activeSem, setActiveSem] = useState(null);
  const [landingTarget, setLandingTarget] = useState(null);
  const [lastModule,setLastModule] = useState(readLastModule);
  const [visibleSection,setVisibleSection] = useState('Utama');
  const [chooserOpen,setChooserOpen] = useState(false);
  const [labTab, setLabTab] = useState('');
  const { theme } = useTheme();
  const openLab = (tab) => {
    setLabTab(tab);
    setActiveSLe('PCLAB');
  };
  // Halaman modul tiada header portal, jadi butang tema diletakkan terapung.
  const withTheme = (node) => (
    <>
      <div className="esls-module-context"><Breadcrumb semester={SEM_OF[activeSLe]} code={activeSLe} onHome={()=>goLanding('home')} onSemester={()=>chooseSemester(SEM_OF[activeSLe])}/></div>
      {node}
      <ThemeToggle floating />
    </>
  );
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const searching = q !== '';
  const matchedCodes = searching ? new Set(rankSearch(Object.entries(MODULE_TEXT).map(([id,description])=>({id,title:MODULE_NAMES[id],description})),q).map(a=>a.id)) : null;
  const show = (code) => searching ? matchedCodes.has(code) : SEM_OF[code] === activeSem;
  const matchCount = Object.keys(SEM_OF).filter(show).length;
  // Dibaca semula pada setiap render, jadi kemajuan terkini muncul apabila pengguna kembali ke senarai modul
  const progress = Object.fromEntries(Object.keys(FEATURES).map((c) => [c, readProgress(c)]));

  const openModule = (code) => {
    if (!Object.prototype.hasOwnProperty.call(SEM_OF,code)) return;
    storeLastModule(code);setLastModule(code);setQuery('');setActiveSem(SEM_OF[code]);setActiveSLe(code);
  };
  const chooseSemester = (n) => {setActiveSLe(null);setQuery('');setActiveSem(n);setLandingTarget(null);window.scrollTo({top:0,behavior:'auto'});};
  const activeNav = chooserOpen?'Makmal':activeSem!==null||searching?'Modul':visibleSection;
  useEffect(() => {
    window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  }, [activeSLe, activeSem]);
  useEffect(() => {
    const modal = e=>setChooserOpen(Boolean(e.detail));
    window.addEventListener('esls:chooser-state',modal);
    return ()=>window.removeEventListener('esls:chooser-state',modal);
  }, []);
  useEffect(() => {
    if (activeSLe || activeSem!==null || searching) return;
    let frame=0;
    const measure=()=>{
      frame=0;
      const line=Math.min(window.innerHeight*.35,240);
      const sections=[['eslux-guide','Panduan'],['esls-path-title','Panduan'],['pilih-semester','Modul'],['esls-labs','Makmal'],['faq','Panduan']];
      let current='Utama';
      for(const [id,label] of sections){const node=document.getElementById(id);if(node&&node.getBoundingClientRect().top<=line)current=label;}
      setVisibleSection(current);
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(measure);};
    window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);schedule();
    return ()=>{window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);if(frame)cancelAnimationFrame(frame);};
  },[activeSLe,activeSem,searching]);

  // Wait until the original landing components have mounted before navigating.
  const goLanding = (target) => {
    setActiveSLe(null); setQuery(''); setActiveSem(null); setLandingTarget({ target });
  };
  useEffect(() => {
    if (!landingTarget || activeSem !== null || searching || activeSLe) return;
    let frame=0, timer=0, observer=null;
    const navigate=()=>{
      observer?.disconnect();window.clearTimeout(timer);
      frame=requestAnimationFrame(() => {
      const { target } = landingTarget;
      if (target === 'makmal') window.dispatchEvent(new Event('esl:open-lab-chooser'));
      else if (target === 'home') window.scrollTo({ top: 0, behavior: 'auto' });
      else document.getElementById(target)?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      setLandingTarget(null);
      });
    };
    const content=document.getElementById('esls-main');
    if(landingTarget.target==='faq' && content && !content.querySelector('.eslux-features') && typeof MutationObserver!=='undefined'){
      observer=new MutationObserver(()=>{if(content.querySelector('.eslux-features'))navigate();});
      observer.observe(content,{childList:true,subtree:true});
      timer=window.setTimeout(navigate,1800);
    }else navigate();
    return ()=>{observer?.disconnect();window.clearTimeout(timer);if(frame)cancelAnimationFrame(frame);};
  }, [landingTarget, activeSem, searching, activeSLe]);

  if (activeSLe === 'PCLAB') {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <ModulePCLab initialTab={labTab} onBackToPortal={() => setActiveSLe(null)} />
      </Suspense>
    );
  }

  if (activeSLe === 'IKR3013') {
    return withTheme(
      <Suspense fallback={<LoadingScreen />}>
        <ModuleIKR3013 onBackToPortal={() => setActiveSLe(null)} />
      </Suspense>
    );
  }
  
  if (activeSLe === 'IKR3023') {
    return withTheme(
      <Suspense fallback={<LoadingScreen />}>
        <ModuleIKR3023 onBackToPortal={() => setActiveSLe(null)} />
      </Suspense>
    );
  }

  if (activeSLe === 'IKR3033') {
    return withTheme(
      <Suspense fallback={<LoadingScreen />}>
        <ModuleIKR3033 onBackToPortal={() => setActiveSLe(null)} />
      </Suspense>
    );
  }

  if (activeSLe === 'IKR3043') {
    return withTheme(
      <Suspense fallback={<LoadingScreen />}>
        <ModuleIKR3043 onBackToPortal={() => setActiveSLe(null)} />
      </Suspense>
    );
  }

  if (activeSLe === 'IKR3053') {
    return withTheme(
      <Suspense fallback={<LoadingScreen />}>
        <ModuleIKR3053 onBackToPortal={() => setActiveSLe(null)} />
      </Suspense>
    );
  }

  if (activeSLe === 'IKR3082') {
    return withTheme(
      <Suspense fallback={<LoadingScreen />}>
        <ModuleIKR3082 onBackToPortal={() => setActiveSLe(null)} />
      </Suspense>
    );
  }

  if (activeSLe === 'IKR3093') {
    return withTheme(
      <Suspense fallback={<LoadingScreen />}>
        <ModuleIKR3093 onBackToPortal={() => setActiveSLe(null)} />
      </Suspense>
    );
  }

  if (activeSLe === 'IKR3063') {
    return withTheme(
      <Suspense fallback={<LoadingScreen />}>
        <ModuleIKR3063 onBackToPortal={() => setActiveSLe(null)} />
      </Suspense>
    );
  }

  if (activeSLe === 'IKR3073') {
    return withTheme(
      <Suspense fallback={<LoadingScreen />}>
        <ModuleIKR3073 onBackToPortal={() => setActiveSLe(null)} />
      </Suspense>
    );
  }

  if (activeSLe === 'IKR3103') {
    return withTheme(
      <Suspense fallback={<LoadingScreen />}>
        <ModuleIKR3103 onBackToPortal={() => setActiveSLe(null)} />
      </Suspense>
    );
  }

  if (activeSLe === 'IKR3113') {
    return withTheme(
      <Suspense fallback={<LoadingScreen />}>
        <ModuleIKR3113 onBackToPortal={() => setActiveSLe(null)} />
      </Suspense>
    );
  }

  if (activeSLe === 'IKR3133') {
    return withTheme(
      <Suspense fallback={<LoadingScreen />}>
        <ModuleIKR3133 onBackToPortal={() => setActiveSLe(null)} />
      </Suspense>
    );
  }

  if (activeSLe === 'IKR3122') {
    return withTheme(
      <Suspense fallback={<LoadingScreen />}>
        <ModuleIKR3122 onBackToPortal={() => setActiveSLe(null)} />
      </Suspense>
    );
  }

  if (activeSLe === 'IKR3143') {
    return withTheme(
      <Suspense fallback={<LoadingScreen />}>
        <ModuleIKR3143 onBackToPortal={() => setActiveSLe(null)} />
      </Suspense>
    );
  }
  if (activeSLe === 'IKR3153') {
    return withTheme(
      <Suspense fallback={<LoadingScreen />}>
        <ModuleIKR3153 onBackToPortal={() => setActiveSLe(null)} />
      </Suspense>
    );
  }
  if (activeSLe === 'IKR3163') {
    return withTheme(
      <Suspense fallback={<LoadingScreen />}>
        <ModuleIKR3163 onBackToPortal={() => setActiveSLe(null)} />
      </Suspense>
    );
  }

  return (
    <div className="studio-portal eslr-portal min-h-screen font-sans flex flex-col selection:bg-blue-300 selection:text-blue-900 bg-slate-50 relative overflow-hidden">
      <a className="esls-skip" href="#esls-main" onClick={e=>{e.preventDefault();document.getElementById('esls-main')?.focus();}}>Langkau ke kandungan</a>
      <StudioNav modules={MODULE_TEXT} onModule={openModule} onLab={openLab} activeNav={activeNav}
        onHome={() => goLanding('home')}
        onSemester={() => goLanding('pilih-semester')}
        onGuide={() => goLanding('eslux-guide')}
        onChooseLab={() => goLanding('makmal')} />
      
      {/* KOD CSS ANIMASI */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      {/* LATAR BELAKANG TEMA IT */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.04]" 
          style={{ 
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
            backgroundSize: '32px 32px' 
          }}>
        </div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] max-w-2xl max-h-2xl bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] max-w-2xl max-h-2xl bg-indigo-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] max-w-2xl max-h-2xl bg-purple-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Identiti institusi dan eSL-IKR dikekalkan dalam StudioNav sahaja.
          Header lama sengaja dibuang bagi mengelakkan navigasi/logo berganda. */}

      {/* KANDUNGAN UTAMA (Responsif) */}
      <main id="esls-main" tabIndex={-1} className={`flex-1 max-w-6xl mx-auto w-full px-4 py-8 md:py-12 relative z-10 flex flex-col justify-center${activeSem === null && !searching ? ' eslr-main' : ''}`}>
        
        {activeSem === null && !searching && (
          <>
{/* HERO SECTION IT: teks asal dikekalkan, kini bersama model 3D */}
        <PortalHero onOpenLab={openLab} />
          </>
        )}

        {/* Carian pendua dibuang. Gunakan carian pada navigasi header (Ctrl+K). */}

        {activeSem === null && !searching && (
          <>
            <ResumeLearning code={lastModule} semester={SEM_OF[lastModule]} progress={progress[lastModule]} onOpen={openModule}/>
            <LearningHub onBegin={()=>openModule('IKR3013')} onReview={()=>goLanding('pilih-semester')} onPractice={()=>goLanding('makmal')}/>
            <SemesterRacks semesters={SEMESTERS} onSelect={chooseSemester} />

            <LabBand onOpenLab={openLab} />
            <DeferredFeatures eager={landingTarget?.target==='faq'}><Suspense fallback={<div className="esls-feature-placeholder" aria-hidden="true"/>}>
              <InkOrbitFeatures theme={theme} brand="eSL-IKR" className="eslux-features" />
            </Suspense></DeferredFeatures>
            <LandingSupport />
          </>
        )}


        {/* SENARAI MODUL MENGIKUT SEMESTER */}
        {(activeSem !== null || searching) && (
          <>
            <Breadcrumb semester={activeSem} searching={searching} onHome={()=>goLanding('home')}/>
            {searching ? (
              <div className="max-w-6xl mx-auto w-full mb-6 md:mb-8">
                <h2 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900">Hasil carian</h2>
                <p className="text-slate-600 font-medium mt-2" role="status">{matchCount} modul sepadan dengan &ldquo;{query.trim()}&rdquo;</p>
              </div>
            ) : (
            <div className="max-w-6xl mx-auto w-full mb-8 md:mb-10">
              <button onClick={() => setActiveSem(null)} className="inline-flex items-center gap-2 bg-white/80 hover:bg-white border border-slate-200 px-4 py-2 min-h-11 rounded-xl text-sm font-bold text-slate-700 shadow-sm transition-colors">
                <ArrowLeft size={18} aria-hidden="true" /> Semua Semester
              </button>
              <p className="text-[11px] font-bold tracking-[.3em] text-blue-700 uppercase font-mono mt-6 mb-2">{`// Rack ${String(activeSem).padStart(2, '0')}`}</p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">Semester {activeSem}</h2>
              <p className="text-slate-600 font-medium mt-2">{SEMESTERS[activeSem - 1].count} modul tersedia. Pilih modul untuk memulakan sesi.</p>
              <div className="flex flex-wrap gap-2 mt-4" role="group" aria-label="Tukar semester">
                {SEMESTERS.map((sem) => (
                  <button key={sem.n} onClick={() => setActiveSem(sem.n)} aria-pressed={sem.n === activeSem}
                    className={`px-4 min-h-11 rounded-xl text-sm font-black border transition-colors ${sem.n === activeSem ? 'bg-slate-900 text-white border-slate-900' : 'bg-white/80 text-slate-600 border-slate-200 hover:bg-white'}`}>
                    Sem {sem.n}
                  </button>
                ))}
              </div>
            </div>
            )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pb-12">
          {searching && matchCount === 0 && (
            <p className="md:col-span-2 text-slate-600 font-medium">Tiada modul sepadan. Cuba kata kunci lain.</p>
          )}
          {/* KAD IKR3013 */}
          {show('IKR3013') && (
          <button 
            onClick={() => openModule('IKR3013')}
            className="group text-left bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.12)] hover:-translate-y-2 hover:border-blue-200 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-125 duration-700"></div>
            
            <div className="relative z-10 flex-1">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
                <Cpu className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              
              <div className="inline-block px-3 py-1 bg-blue-50/80 border border-blue-100 text-blue-700 text-[10px] font-black rounded-lg mb-3 md:mb-4 tracking-widest uppercase shadow-sm">
                Modul IKR 3013
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-3 md:mb-4 group-hover:text-blue-700 transition-colors">Computer Hardware & Software</h3>
              
              <p className="text-slate-700 text-xs md:text-sm leading-relaxed mb-4 font-medium">
                Pelajari anatomi dalaman komputer, evolusi komponen fizikal, sistem operasi, dan gunakan Perunding AI untuk mereka spesifikasi PC.
              </p>
            </div>

            <CardMeta code="IKR3013" progress={progress} />

            <div className="relative z-10 mt-auto flex items-center gap-3 md:gap-4">
              <div className="bg-slate-900 text-white p-2.5 md:p-3 rounded-xl group-hover:bg-blue-600 transition-colors shadow-md">
                <ChevronRight size={20} strokeWidth={2.75} color="#ffffff" className="md:w-6 md:h-6" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors uppercase tracking-wide">Buka Modul</span>
            </div>
          </button>
          )}

          {/* KAD IKR3023 */}
          {show('IKR3023') && (
          <button 
            onClick={() => openModule('IKR3023')}
            className="group text-left bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(16,185,129,0.12)] hover:-translate-y-2 hover:border-emerald-200 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-emerald-100 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-125 duration-700"></div>
            
            <div className="relative z-10 flex-1">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-shadow">
                <Network className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              
              <div className="inline-block px-3 py-1 bg-emerald-50/80 border border-emerald-100 text-emerald-700 text-[10px] font-black rounded-lg mb-3 md:mb-4 tracking-widest uppercase shadow-sm">
                Modul IKR 3023
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-3 md:mb-4 group-hover:text-emerald-700 transition-colors">Network Structured Cabling</h3>
              
              <p className="text-slate-700 text-xs md:text-sm leading-relaxed mb-4 font-medium">
                Kuasai topologi rangkaian, standard pengkabelan, jenis media kabel, fungsi Patch Panel, dan simulasi Rak Server 3D maya.
              </p>
            </div>

            <CardMeta code="IKR3023" progress={progress} />

            <div className="relative z-10 mt-auto flex items-center gap-3 md:gap-4">
              <div className="bg-slate-900 text-white p-2.5 md:p-3 rounded-xl group-hover:bg-emerald-600 transition-colors shadow-md">
                <ChevronRight size={20} strokeWidth={2.75} color="#ffffff" className="md:w-6 md:h-6" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-emerald-600 transition-colors uppercase tracking-wide">Buka Modul</span>
            </div>
          </button>
          )}

          {/* KAD IKR3033 */}
          {show('IKR3033') && (
          <button 
            onClick={() => openModule('IKR3033')}
            className="group text-left bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(6,182,212,0.15)] hover:-translate-y-2 hover:border-cyan-200 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-cyan-100 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-125 duration-700"></div>
            <div className="relative z-10 flex-1">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-shadow">
                <Cable className="w-6 h-6 md:w-8 md:h-8" />
              </div>

              <div className="inline-block px-3 py-1 bg-cyan-50/80 border border-cyan-100 text-cyan-700 text-[10px] font-black rounded-lg mb-3 md:mb-4 tracking-widest uppercase shadow-sm">
                Modul IKR 3033
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 group-hover:text-cyan-700 transition-colors">Fiber Cabling</h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 font-medium">
                Kuasai struktur gentian optik, pemilihan kabel dan penyambung, fusion splicing, pengujian kuasa optik, OTDR serta konsultasi FiberPintar AI.
              </p>
            </div>

            <CardMeta code="IKR3033" progress={progress} />

            <div className="relative z-10 mt-auto flex items-center gap-3 md:gap-4">
              <div className="bg-slate-900 text-white p-2.5 md:p-3 rounded-xl group-hover:bg-cyan-600 transition-colors shadow-md">
                <ChevronRight size={20} strokeWidth={2.75} color="#ffffff" className="md:w-6 md:h-6" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-cyan-600 transition-colors uppercase tracking-wide">Buka Modul</span>
            </div>
          </button>
          )}

          {/* KAD IKR3043 */}
          {show('IKR3043') && (
          <button 
            onClick={() => openModule('IKR3043')}
            className="group text-left bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.15)] hover:-translate-y-2 hover:border-blue-200 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-125 duration-700"></div>
            <div className="relative z-10 flex-1">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
                <Network className="w-6 h-6 md:w-8 md:h-8" />
              </div>

              <div className="inline-block px-3 py-1 bg-blue-50/80 border border-blue-100 text-blue-700 text-[10px] font-black rounded-lg mb-3 md:mb-4 tracking-widest uppercase shadow-sm">
                Modul IKR 3043
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 group-hover:text-blue-700 transition-colors">Computer Fundamental Network</h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 font-medium">
                Nota asas rangkaian, jenis rangkaian, topologi, peranti, alamat IP &amp; subnetting, protokol, keselamatan dan troubleshooting, lengkap dengan kalkulator IP dan kuiz 150 soalan.
              </p>
            </div>

            <CardMeta code="IKR3043" progress={progress} />

            <div className="relative z-10 mt-auto flex items-center gap-3 md:gap-4">
              <div className="bg-slate-900 text-white p-2.5 md:p-3 rounded-xl group-hover:bg-blue-600 transition-colors shadow-md">
                <ChevronRight size={20} strokeWidth={2.75} color="#ffffff" className="md:w-6 md:h-6" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors uppercase tracking-wide">Buka Modul</span>
            </div>
          </button>
          )}

          {/* KAD IKR3053 */}
          {show('IKR3053') && (
          <button 
            onClick={() => openModule('IKR3053')}
            className="group text-left bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(99,102,241,0.15)] hover:-translate-y-2 hover:border-indigo-200 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-indigo-100 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-125 duration-700"></div>
            <div className="relative z-10 flex-1">
              <div className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
                <Waves className="w-6 h-6 md:w-8 md:h-8" />
              </div>

              <div className="inline-block px-3 py-1 bg-indigo-50/80 border border-indigo-100 text-indigo-700 text-[10px] font-black rounded-lg mb-3 md:mb-4 tracking-widest uppercase shadow-sm">
                Modul IKR 3053
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 group-hover:text-indigo-700 transition-colors">Wireless Technology</h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 font-medium">
                Wireless Access Point, senibina AP, konfigurasi RF (2.4GHz/5GHz, channel, antenna), band steering dan piawaian Wi-Fi 802.11, lengkap dengan kuiz.
              </p>
            </div>

            <CardMeta code="IKR3053" progress={progress} />

            <div className="relative z-10 mt-auto flex items-center gap-3 md:gap-4">
              <div className="bg-slate-900 text-white p-2.5 md:p-3 rounded-xl group-hover:bg-indigo-600 transition-colors shadow-md">
                <ChevronRight size={20} strokeWidth={2.75} color="#ffffff" className="md:w-6 md:h-6" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors uppercase tracking-wide">Buka Modul</span>
            </div>
          </button>
          )}

          {/* KAD IKR3082 */}
          {show('IKR3082') && (
          <button 
            onClick={() => openModule('IKR3082')}
            className="group text-left bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(16,185,129,0.15)] hover:-translate-y-2 hover:border-emerald-200 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-emerald-100 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-125 duration-700"></div>
            <div className="relative z-10 flex-1">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-shadow">
                <ClipboardCheck className="w-6 h-6 md:w-8 md:h-8" />
              </div>

              <div className="inline-block px-3 py-1 bg-emerald-50/80 border border-emerald-100 text-emerald-700 text-[10px] font-black rounded-lg mb-3 md:mb-4 tracking-widest uppercase shadow-sm">
                Modul IKR 3082
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 group-hover:text-emerald-700 transition-colors">Network Documentation</h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 font-medium">
                Senarai semak pemasangan &amp; konfigurasi, rajah rangkaian &amp; topologi, prosedur rekod konfigurasi, audit dan alat bantu, lengkap dengan kuiz.
              </p>
            </div>

            <CardMeta code="IKR3082" progress={progress} />

            <div className="relative z-10 mt-auto flex items-center gap-3 md:gap-4">
              <div className="bg-slate-900 text-white p-2.5 md:p-3 rounded-xl group-hover:bg-emerald-600 transition-colors shadow-md">
                <ChevronRight size={20} strokeWidth={2.75} color="#ffffff" className="md:w-6 md:h-6" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-emerald-600 transition-colors uppercase tracking-wide">Buka Modul</span>
            </div>
          </button>
          )}


          {/* KAD IKR3063 */}
          {show('IKR3063') && (
          <button 
            onClick={() => openModule('IKR3063')}
            className="group text-left bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(217,119,6,0.15)] hover:-translate-y-2 hover:border-amber-200 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-amber-100 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-125 duration-700"></div>
            <div className="relative z-10 flex-1">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-shadow">
                <Network className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div className="inline-block px-3 py-1 bg-amber-50/80 border border-amber-100 text-amber-700 text-[10px] font-black rounded-lg mb-3 md:mb-4 tracking-widest uppercase shadow-sm">
                Modul IKR 3063
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 group-hover:text-amber-700 transition-colors">Ethernet Switching Essentials</h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 font-medium">
                Jenis suis, kaedah pensuisan, antara muka, konfigurasi asas, VLAN, Inter-VLAN Routing dan keselamatan rangkaian (STP &amp; Port Security), lengkap dengan kuiz.
              </p>
            </div>
            <CardMeta code="IKR3063" progress={progress} />

            <div className="relative z-10 mt-auto flex items-center gap-3 md:gap-4">
              <div className="bg-slate-900 text-white p-2.5 md:p-3 rounded-xl group-hover:bg-amber-600 transition-colors shadow-md">
                <ChevronRight size={20} strokeWidth={2.75} color="#ffffff" className="md:w-6 md:h-6" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-amber-600 transition-colors uppercase tracking-wide">Buka Modul</span>
            </div>
          </button>
          )}

          {/* KAD IKR3073 */}
          {show('IKR3073') && (
          <button 
            onClick={() => openModule('IKR3073')}
            className="group text-left bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(2,132,199,0.15)] hover:-translate-y-2 hover:border-sky-200 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-sky-100 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-125 duration-700"></div>
            <div className="relative z-10 flex-1">
              <div className="bg-gradient-to-br from-sky-500 to-blue-700 text-white w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-sky-500/30 group-hover:shadow-sky-500/50 transition-shadow">
                <Router className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div className="inline-block px-3 py-1 bg-sky-50/80 border border-sky-100 text-sky-700 text-[10px] font-black rounded-lg mb-3 md:mb-4 tracking-widest uppercase shadow-sm">
                Modul IKR 3073
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 group-hover:text-sky-700 transition-colors">Basic Routing Configuration</h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 font-medium">
                Pengenalan router, boot &amp; IOS, path determination, packet forwarding, konfigurasi asas, jadual penghalaan &amp; static routing, lengkap dengan kuiz.
              </p>
            </div>
            <CardMeta code="IKR3073" progress={progress} />

            <div className="relative z-10 mt-auto flex items-center gap-3 md:gap-4">
              <div className="bg-slate-900 text-white p-2.5 md:p-3 rounded-xl group-hover:bg-sky-600 transition-colors shadow-md">
                <ChevronRight size={20} strokeWidth={2.75} color="#ffffff" className="md:w-6 md:h-6" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-sky-600 transition-colors uppercase tracking-wide">Buka Modul</span>
            </div>
          </button>
          )}

          {/* KAD IKR3093 */}
          {show('IKR3093') && (
          <button 
            onClick={() => openModule('IKR3093')}
            className="group text-left bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(6,182,212,0.15)] hover:-translate-y-2 hover:border-cyan-200 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-cyan-100 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-125 duration-700"></div>
            <div className="relative z-10 flex-1">
              <div className="bg-gradient-to-br from-slate-700 to-cyan-700 text-white w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-shadow">
                <Server className="w-6 h-6 md:w-8 md:h-8" />
              </div>

              <div className="inline-block px-3 py-1 bg-cyan-50/80 border border-cyan-100 text-cyan-700 text-[10px] font-black rounded-lg mb-3 md:mb-4 tracking-widest uppercase shadow-sm">
                Modul IKR 3093
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 group-hover:text-cyan-700 transition-colors">Server Essentials</h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 font-medium">
                Senibina pelayan, mesin maya &amp; hypervisor, pemasangan perkakasan, penyejukan, pengujian &amp; RAID, perisian OS server, instalasi dan pengujian OS, lengkap dengan kuiz.
              </p>
            </div>

            <CardMeta code="IKR3093" progress={progress} />

            <div className="relative z-10 mt-auto flex items-center gap-3 md:gap-4">
              <div className="bg-slate-900 text-white p-2.5 md:p-3 rounded-xl group-hover:bg-cyan-600 transition-colors shadow-md">
                <ChevronRight size={20} strokeWidth={2.75} color="#ffffff" className="md:w-6 md:h-6" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-cyan-600 transition-colors uppercase tracking-wide">Buka Modul</span>
            </div>
          </button>
          )}

          {/* KAD IKR3103 */}
          {show('IKR3103') && (
          <button 
            onClick={() => openModule('IKR3103')}
            className="group text-left bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(22,163,74,0.15)] hover:-translate-y-2 hover:border-green-200 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-green-100 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-125 duration-700"></div>
            <div className="relative z-10 flex-1">
              <div className="bg-gradient-to-br from-green-500 to-emerald-700 text-white w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-shadow">
                <Terminal className="w-6 h-6 md:w-8 md:h-8" />
              </div>

              <div className="inline-block px-3 py-1 bg-green-50/80 border border-green-100 text-green-700 text-[10px] font-black rounded-lg mb-3 md:mb-4 tracking-widest uppercase shadow-sm">
                Modul IKR 3103
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 group-hover:text-green-700 transition-colors">Network Operating System</h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 font-medium">
                Perkhidmatan rangkaian di Linux: Web Server (Apache/Nginx), DNS (BIND9), DHCP (ISC) dan Directory Server (OpenLDAP), lengkap dengan kuiz 150 soalan.
              </p>
            </div>

            <CardMeta code="IKR3103" progress={progress} />

            <div className="relative z-10 mt-auto flex items-center gap-3 md:gap-4">
              <div className="bg-slate-900 text-white p-2.5 md:p-3 rounded-xl group-hover:bg-green-600 transition-colors shadow-md">
                <ChevronRight size={20} strokeWidth={2.75} color="#ffffff" className="md:w-6 md:h-6" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-green-600 transition-colors uppercase tracking-wide">Buka Modul</span>
            </div>
          </button>
          )}

          {/* KAD IKR3113 */}
          {show('IKR3113') && (
          <button 
            onClick={() => openModule('IKR3113')}
            className="group text-left bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(225,29,72,0.15)] hover:-translate-y-2 hover:border-rose-200 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-rose-100 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-125 duration-700"></div>
            <div className="relative z-10 flex-1">
              <div className="bg-gradient-to-br from-rose-500 to-fuchsia-700 text-white w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-rose-500/30 group-hover:shadow-rose-500/50 transition-shadow">
                <Radar className="w-6 h-6 md:w-8 md:h-8" />
              </div>

              <div className="inline-block px-3 py-1 bg-rose-50/80 border border-rose-100 text-rose-700 text-[10px] font-black rounded-lg mb-3 md:mb-4 tracking-widest uppercase shadow-sm">
                Modul IKR 3113
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 group-hover:text-rose-700 transition-colors">Network Monitoring Services</h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 font-medium">
                Pemantauan rangkaian (NMS, SNMP) dan storan NAS/RAID, lengkap dengan kuiz 180 soalan.
              </p>
            </div>

            <CardMeta code="IKR3113" progress={progress} />

            <div className="relative z-10 mt-auto flex items-center gap-3 md:gap-4">
              <div className="bg-slate-900 text-white p-2.5 md:p-3 rounded-xl group-hover:bg-rose-600 transition-colors shadow-md">
                <ChevronRight size={20} strokeWidth={2.75} color="#ffffff" className="md:w-6 md:h-6" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-rose-600 transition-colors uppercase tracking-wide">Buka Modul</span>
            </div>
          </button>
          )}

          {/* KAD IKR3133 */}
          {show('IKR3133') && (
          <button 
            onClick={() => openModule('IKR3133')}
            className="group text-left bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(220,38,38,0.15)] hover:-translate-y-2 hover:border-red-200 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-red-100 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-125 duration-700"></div>
            <div className="relative z-10 flex-1">
              <div className="bg-gradient-to-br from-red-500 to-orange-700 text-white w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-red-500/30 group-hover:shadow-red-500/50 transition-shadow">
                <Flame className="w-6 h-6 md:w-8 md:h-8" />
              </div>

              <div className="inline-block px-3 py-1 bg-red-50/80 border border-red-100 text-red-700 text-[10px] font-black rounded-lg mb-3 md:mb-4 tracking-widest uppercase shadow-sm">
                Modul IKR 3133
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 group-hover:text-red-700 transition-colors">Network Security Essentials</h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 font-medium">
                Konsep, dasar, peraturan dan konfigurasi firewall rangkaian, lengkap dengan kuiz 120 soalan.
              </p>
            </div>

            <CardMeta code="IKR3133" progress={progress} />

            <div className="relative z-10 mt-auto flex items-center gap-3 md:gap-4">
              <div className="bg-slate-900 text-white p-2.5 md:p-3 rounded-xl group-hover:bg-red-600 transition-colors shadow-md">
                <ChevronRight size={20} strokeWidth={2.75} color="#ffffff" className="md:w-6 md:h-6" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-red-600 transition-colors uppercase tracking-wide">Buka Modul</span>
            </div>
          </button>
          )}

          {/* KAD IKR3122 */}
          {show('IKR3122') && (
          <button 
            onClick={() => openModule('IKR3122')}
            className="group text-left bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(124,58,237,0.15)] hover:-translate-y-2 hover:border-violet-200 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-violet-100 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-125 duration-700"></div>
            <div className="relative z-10 flex-1">
              <div className="bg-gradient-to-br from-violet-500 to-fuchsia-700 text-white w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
                <Compass className="w-6 h-6 md:w-8 md:h-8" />
              </div>

              <div className="inline-block px-3 py-1 bg-violet-50/80 border border-violet-100 text-violet-700 text-[10px] font-black rounded-lg mb-3 md:mb-4 tracking-widest uppercase shadow-sm">
                Modul IKR 3122
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 group-hover:text-violet-700 transition-colors">Project Management</h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 font-medium">
                Tinjauan tapak, WLAN, liputan isyarat dan lukisan rangkaian, lengkap dengan kuiz 180 soalan.
              </p>
            </div>

            <CardMeta code="IKR3122" progress={progress} />

            <div className="relative z-10 mt-auto flex items-center gap-3 md:gap-4">
              <div className="bg-slate-900 text-white p-2.5 md:p-3 rounded-xl group-hover:bg-violet-600 transition-colors shadow-md">
                <ChevronRight size={20} strokeWidth={2.75} color="#ffffff" className="md:w-6 md:h-6" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-violet-600 transition-colors uppercase tracking-wide">Buka Modul</span>
            </div>
          </button>
          )}



          {/* KAD IKR3143 */}
          {show('IKR3143') && (
          <button 
            onClick={() => openModule('IKR3143')}
            className="group text-left bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(220,38,38,0.15)] hover:-translate-y-2 hover:border-red-200 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-red-100 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-125 duration-700"></div>
            <div className="relative z-10 flex-1">
              <div className="bg-gradient-to-br from-red-500 to-orange-700 text-white w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-red-500/30 group-hover:shadow-red-500/50 transition-shadow">
                <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />
              </div>

              <div className="inline-block px-3 py-1 bg-red-50/80 border-red-100 text-red-700 text-[10px] font-black rounded-lg mb-3 md:mb-4 tracking-widest uppercase shadow-sm">
                Modul IKR 3143
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 group-hover:text-red-700 transition-colors">Network Security Hardening</h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 font-medium">
                Pengukuhan keselamatan rangkaian, dasar &amp; audit, peralatan rangkaian dan sistem, lengkap dengan kuiz 120 soalan.
              </p>
            </div>

            <CardMeta code="IKR3143" progress={progress} />

            <div className="relative z-10 mt-auto flex items-center gap-3 md:gap-4">
              <div className="bg-slate-900 text-white p-2.5 md:p-3 rounded-xl group-hover:bg-red-600 transition-colors shadow-md">
                <ChevronRight size={20} strokeWidth={2.75} color="#ffffff" className="md:w-6 md:h-6" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-red-600 transition-colors uppercase tracking-wide">Buka Modul</span>
            </div>
          </button>
          )}

          {/* KAD IKR3153 */}
          {show('IKR3153') && (
          <button 
            onClick={() => openModule('IKR3153')}
            className="group text-left bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(8,145,178,0.15)] hover:-translate-y-2 hover:border-cyan-200 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-cyan-100 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-125 duration-700"></div>
            <div className="relative z-10 flex-1">
              <div className="bg-gradient-to-br from-cyan-500 to-teal-700 text-white w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-shadow">
                <Bot className="w-6 h-6 md:w-8 md:h-8" />
              </div>

              <div className="inline-block px-3 py-1 bg-cyan-50/80 border-cyan-100 text-cyan-700 text-[10px] font-black rounded-lg mb-3 md:mb-4 tracking-widest uppercase shadow-sm">
                Modul IKR 3153
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 group-hover:text-cyan-700 transition-colors">Network Automation Services</h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 font-medium">
                Python, Bash, Perl, Ansible/Chef/Puppet, Git dan skrip automasi rangkaian, lengkap dengan kuiz 80 soalan.
              </p>
            </div>

            <CardMeta code="IKR3153" progress={progress} />

            <div className="relative z-10 mt-auto flex items-center gap-3 md:gap-4">
              <div className="bg-slate-900 text-white p-2.5 md:p-3 rounded-xl group-hover:bg-cyan-600 transition-colors shadow-md">
                <ChevronRight size={20} strokeWidth={2.75} color="#ffffff" className="md:w-6 md:h-6" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-cyan-600 transition-colors uppercase tracking-wide">Buka Modul</span>
            </div>
          </button>
          )}

          {/* KAD IKR3163 */}
          {show('IKR3163') && (
          <button 
            onClick={() => openModule('IKR3163')}
            className="group text-left bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(124,58,237,0.15)] hover:-translate-y-2 hover:border-violet-200 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-bl from-violet-100 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-125 duration-700"></div>
            <div className="relative z-10 flex-1">
              <div className="bg-gradient-to-br from-violet-500 to-purple-700 text-white w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow">
                <Wrench className="w-6 h-6 md:w-8 md:h-8" />
              </div>

              <div className="inline-block px-3 py-1 bg-violet-50/80 border-violet-100 text-violet-700 text-[10px] font-black rounded-lg mb-3 md:mb-4 tracking-widest uppercase shadow-sm">
                Modul IKR 3163
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 group-hover:text-violet-700 transition-colors">Network Maintenance</h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 font-medium">
                IPv4, subnetting, VLSM, IPv6, ancaman siber dan hardening end node, lengkap dengan kuiz 100 soalan.
              </p>
            </div>

            <CardMeta code="IKR3163" progress={progress} />

            <div className="relative z-10 mt-auto flex items-center gap-3 md:gap-4">
              <div className="bg-slate-900 text-white p-2.5 md:p-3 rounded-xl group-hover:bg-violet-600 transition-colors shadow-md">
                <ChevronRight size={20} strokeWidth={2.75} color="#ffffff" className="md:w-6 md:h-6" />
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-violet-600 transition-colors uppercase tracking-wide">Buka Modul</span>
            </div>
          </button>
          )}


        </div>
          </>
        )}
      </main>

      {/* FOOTER */}
      <StudentFooter onHome={()=>goLanding('home')} onSemester={chooseSemester} onGuide={()=>goLanding('eslux-guide')} onFaq={()=>goLanding('faq')}/>
    </div>
  );
}
