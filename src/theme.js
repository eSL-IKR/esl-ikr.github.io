// Tema portal tetap gelap; kunci 'ikr-tema' milik pilihan simulator, hanya dibaca untuk keserasian API.
const KEY = 'ikr-tema';

export function getStoredTheme() {
  try {
    const v = localStorage.getItem(KEY);
    if (v === 'dark' || v === 'light') return v;
  } catch { /* storan tidak tersedia (mod peribadi) */ }
  return null;
}

export function systemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function currentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

// esl-portal-dark-only-v1: never write the simulator's shared storage key.
export function applyTheme() {
  const root = document.documentElement;
  root.setAttribute('data-theme', 'dark');
  root.style.colorScheme = 'dark';
  window.dispatchEvent(new CustomEvent('ikr-theme-change', { detail: 'dark' }));
}

// Tema portal tidak bergantung pada tetapan simulator atau peranti.
export function initTheme() {
  applyTheme();
}
