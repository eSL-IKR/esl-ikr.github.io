import ModulSem3 from './ModulSem3';
import { NOTES_IKR3143 } from './IKR3143Notes.js';
import { QUIZ_IKR3143 } from './IKR3143QuizData.js';
import { ShieldCheck, Shield, ListChecks, AlertTriangle, Network, Lock } from 'lucide-react';

const config = {
  code: 'IKR3143',
  name: 'Network Security Hardening',
  tagline: 'Pengukuhan keselamatan rangkaian: CIA, dasar & audit, tindak balas ancaman, peralatan rangkaian dan sistem.',
  theme: 'red',
  heroIcon: ShieldCheck,
  sectionIcons: [ShieldCheck, Shield, ListChecks, AlertTriangle, Network, Lock],
  palette: ['red', 'orange', 'amber'],
  notes: NOTES_IKR3143,
  quiz: QUIZ_IKR3143,
};

export default function IKR3143({ onBackToPortal }) {
  return <ModulSem3 config={config} onBackToPortal={onBackToPortal} />;
}
