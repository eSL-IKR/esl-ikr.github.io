import ModulSem3 from './ModulSem3';
import { NOTES_IKR3153 } from './IKR3153Notes.js';
import { QUIZ_IKR3153 } from './IKR3153QuizData.js';
import { Bot, Code2, Terminal, Workflow, GitBranch, Wrench } from 'lucide-react';

const config = {
  code: 'IKR3153',
  name: 'Network Automation Services',
  tagline: 'Automasi rangkaian dengan Python, Bash, Perl, Ansible/Chef/Puppet, Git dan skrip.',
  theme: 'cyan',
  heroIcon: Bot,
  sectionIcons: [Bot, Code2, Terminal, Workflow, GitBranch, Wrench],
  palette: ['cyan', 'teal', 'blue'],
  notes: NOTES_IKR3153,
  quiz: QUIZ_IKR3153,
};

export default function IKR3153({ onBackToPortal }) {
  return <ModulSem3 config={config} onBackToPortal={onBackToPortal} />;
}
