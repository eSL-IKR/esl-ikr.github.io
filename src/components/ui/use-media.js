import { useSyncExternalStore } from 'react';

// Langgan pertanyaan media (contoh: prefers-reduced-motion) tanpa setState dalam effect.
export function useMedia(query, serverValue = false) {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === 'undefined' || !window.matchMedia) return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener?.('change', onChange);
      return () => mql.removeEventListener?.('change', onChange);
    },
    () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : serverValue),
    () => serverValue,
  );
}
