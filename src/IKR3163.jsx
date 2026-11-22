import ModulSem3 from './ModulSem3';
import { NOTES_IKR3163 } from './IKR3163Notes.js';
import { QUIZ_IKR3163 } from './IKR3163QuizData.js';
import { Wrench, Network, Globe, Calculator, Layers, ShieldCheck } from 'lucide-react';

const config = {
  code: 'IKR3163',
  name: 'Network Maintenance',
  tagline: 'Penyelenggaraan rangkaian: IPv4, subnetting, VLSM, IPv6, ancaman siber dan hardening end node.',
  theme: 'violet',
  heroIcon: Wrench,
  sectionIcons: [Network, Globe, Calculator, Layers, Globe, ShieldCheck],
  palette: ['violet', 'indigo', 'blue'],
  notes: NOTES_IKR3163,
  quiz: QUIZ_IKR3163,
};

export default function IKR3163({ onBackToPortal }) {
  return <ModulSem3 config={config} onBackToPortal={onBackToPortal} />;
}
