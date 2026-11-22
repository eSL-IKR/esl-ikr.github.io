// Pengurusan tema gelap/cerah. Kunci 'ikr-tema' dikongsi dengan Makmal PC 3D (public/pclab/index.html).
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

export function applyTheme(theme, save = false) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;
  if (save) {
    try { localStorage.setItem(KEY, theme); } catch { /* storan tidak tersedia */ }
  }
  window.dispatchEvent(new CustomEvent('ikr-theme-change', { detail: theme }));
}

// Tema tersimpan diutamakan; jika tiada, ikut tetapan peranti (gelap/cerah).
export function initTheme() {
  applyTheme(getStoredTheme() || systemTheme());
}
