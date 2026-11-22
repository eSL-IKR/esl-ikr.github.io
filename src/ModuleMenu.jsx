import { createElement, isValidElement } from 'react';
import { ArrowUpRight, Award, BookOpen, CheckCircle, ChevronRight, Download, Home, Info, Lock, RotateCcw } from 'lucide-react';
import './module-menu.css';
import ModulePhotoGuide from './ModulePhotoGuide';

function iconNode(icon) {
  return isValidElement(icon) ? icon : createElement(icon, { 'aria-hidden': true });
}

export function ModuleAction({ icon, title, description, accent, locked, available, href, onClick }) {
  const contents = <>
    <span className="course-action-icon" aria-hidden="true">{iconNode(icon)}</span>
    <strong>{title}</strong>
    <span className="course-action-desc">{description}</span>
    {locked && <span className="course-action-state"><Lock size={12} aria-hidden="true" /> Terkunci</span>}
    {available && <span className="course-action-state is-open"><CheckCircle size={12} aria-hidden="true" /> Dibuka</span>}
    {href && <ArrowUpRight className="course-external" size={15} aria-hidden="true" />}
  </>;
  return href
    ? <a className="course-action" data-accent={accent} href={href} target="_blank" rel="noopener noreferrer">{contents}</a>
    : <button className="course-action" data-accent={accent} type="button" disabled={locked} onClick={onClick}>{contents}</button>;
}

export function ModuleActivities({ activities, simulations = [], quizLocked, onOpen }) {
  return <>
    {activities.map(card => (
      <ModuleAction key={card.id} icon={card.icon} title={card.title} description={card.desc}
        accent={card.id === 'quiz' ? 'green' : card.accent} locked={card.id === 'quiz' && quizLocked}
        available={card.id === 'quiz' && !quizLocked}
        onClick={() => onOpen(card.target)} />
    ))}
    {simulations.map(sim => (
      <ModuleAction key={sim.file} icon={sim.icon} title={sim.title} description={sim.desc} accent={sim.accent}
        href={`${import.meta.env.BASE_URL}simulasi/${sim.file}`} />
    ))}
  </>;
}

export function ModuleGuide({ icon, title, description, action, onClick }) {
  return (
    <section className="course-guide">
      <span className="course-guide-icon" aria-hidden="true">{iconNode(icon)}</span>
      <div><h2>{title}</h2><p>{description}</p></div>
      <button type="button" onClick={onClick}>{action}<ChevronRight size={16} aria-hidden="true" /></button>
    </section>
  );
}

export default function ModuleMenu({
  title, icon, secondaryIcon, onBack, download, topics, read, onTopic, onReset,
  progressTitle = 'Prestasi Bacaan Anda', progressIcon: ProgressIcon = Award, description, children,
}) {
  const count = read.filter(Boolean).length;
  const percent = Math.round(count / topics.length * 100);
  const nextIndex = read.findIndex(done => !done);
  const currentIndex = nextIndex < 0 ? 0 : nextIndex;
  const noteLabel = count > 0 && nextIndex >= 0 ? 'Sambung bacaan' : 'Buka nota';

  return (
    <main className="course-overview">
      <header className="course-hero">
        <span className="course-hero-icon course-hero-left" aria-hidden="true">{iconNode(secondaryIcon)}</span>
        <span className="course-hero-icon course-hero-right" aria-hidden="true">{iconNode(icon)}</span>
        <button className="course-back" type="button" onClick={onBack}><Home size={16} aria-hidden="true" /> Kembali ke Portal Utama</button>
        <h1>{title}</h1>
        <span className="course-format">E-Learning Interaktif</span>
        {download
          ? <a className="course-primary" href={download.href} download={download.local || undefined}
              target={download.local ? undefined : '_blank'} rel={download.local ? undefined : 'noopener noreferrer'}>
              <Download size={18} aria-hidden="true" />{download.label}
            </a>
          : <button className="course-primary" type="button" onClick={() => onTopic(topics[currentIndex], currentIndex)}>
              <BookOpen size={18} aria-hidden="true" />{noteLabel}
            </button>}
      </header>
      <section className="course-progress" aria-label={progressTitle}>
        <div className="course-progress-head">
          <div>
            <h2><ProgressIcon size={19} aria-hidden="true" />{progressTitle}</h2>
            {nextIndex < 0
              ? <p className="course-finished"><CheckCircle size={14} aria-hidden="true" /> Semua topik selesai. Kuiz penilaian kini dibuka.</p>
              : <p><BookOpen size={14} aria-hidden="true" /><span>Topik seterusnya: <strong>{topics[nextIndex].title}</strong></span></p>}
          </div>
          <strong className="course-percent">{percent}%</strong>
        </div>
        <progress value={count} max={topics.length} aria-label="Kemajuan bacaan">{percent}%</progress>
        <div className="course-progress-meta">
          <span>Mula</span><span>{count} daripada {topics.length} topik dibaca</span>
          {count > 0 && <button type="button" onClick={onReset}><RotateCcw size={13} aria-hidden="true" /> Mula semula</button>}
        </div>
      </section>
      <section className="course-topic-grid" aria-label="Topik pembelajaran">
        {topics.map((topic, index) => {
          const locked = index > 0 && !read[index - 1];
          const state = locked ? 'Selesaikan topik sebelumnya untuk membuka' : read[index] ? 'Selesai dibaca' : 'Buka topik';
          return (
            <button className="course-topic" type="button" key={topic.id} disabled={locked}
              aria-label={`${topic.title}. ${state}`} title={state} onClick={() => onTopic(topic, index)}>
              <span className={`course-topic-icon ${topic.color || ''}`} aria-hidden="true">{iconNode(topic.icon)}</span>
              <span className="course-topic-copy"><strong>{topic.title}</strong><span>{topic.desc || topic.description}</span></span>
              <span className={`course-topic-state${read[index] ? ' is-read' : ''}`} aria-hidden="true">
                {locked ? <Lock size={16} /> : read[index] ? <CheckCircle size={19} /> : <ChevronRight size={19} />}
              </span>
            </button>
          );
        })}
      </section>
      <section className="course-actions" aria-label="Panduan, penilaian dan aktiviti">{children}</section>
      {description && <details className="course-about"><summary><Info size={16} aria-hidden="true" /> Kandungan modul</summary><p>{description}</p></details>}
      {title.match(/IKR\d{4}/)?.[0] !== 'IKR3023' && <ModulePhotoGuide subject={title.match(/IKR\d{4}/)?.[0]} topics={topics} />}
    </main>
  );
}
