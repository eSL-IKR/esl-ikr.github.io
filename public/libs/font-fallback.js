/* Gunakan fon tempatan dahulu. Jika fon tidak tersedia dan internet ada, cuba Google Fonts. */
(() => {
  const addGoogleFonts = () => {
    if (document.querySelector('link[data-ikr-font-fallback]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Pixelify+Sans:wght@400;600;700&display=swap';
    link.dataset.ikrFontFallback = 'true';
    document.head.appendChild(link);
  };
  if (!document.fonts || !document.fonts.load) { addGoogleFonts(); return; }
  document.fonts.load('400 14px "Nunito"').then((faces) => {
    if (!faces || !faces.length) addGoogleFonts();
  }).catch(addGoogleFonts);
})();
