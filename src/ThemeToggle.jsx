import { Moon, Sun } from 'lucide-react';
import useTheme from './useTheme';

// Butang tukar tema. floating: butang terapung untuk halaman modul yang tiada header portal.
export default function ThemeToggle({ floating = false }) {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';
  const Icon = dark ? Sun : Moon;
  const base = 'inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 print:hidden';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark}
      aria-label={dark ? 'Tukar ke mod cerah' : 'Tukar ke mod gelap'}
      title={dark ? 'Mod cerah' : 'Mod gelap'}
      className={floating ? `${base} fixed bottom-4 left-4 z-[60] size-11 shadow-lg` : base}
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  );
}
