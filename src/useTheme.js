import { useCallback, useEffect, useState } from 'react';
import { applyTheme, currentTheme } from './theme';

export default function useTheme() {
  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    const onChange = (e) => setTheme(e.detail === 'dark' ? 'dark' : 'light');
    window.addEventListener('ikr-theme-change', onChange);
    return () => window.removeEventListener('ikr-theme-change', onChange);
  }, []);

  const toggle = useCallback(() => applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true), []);
  return { theme, toggle };
}
