/* Loader local-first untuk halaman simulasi berdikari. */
window.IKRAssetLoader = {
  loadScript(localUrl, cdnUrl) {
    return new Promise((resolve, reject) => {
      const append = (src, fallback) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(src);
        script.onerror = () => {
          script.remove();
          if (fallback) append(fallback, null);
          else reject(new Error(`Gagal memuatkan skrip: ${localUrl}`));
        };
        document.head.appendChild(script);
      };
      append(localUrl, cdnUrl);
    });
  },
  loadStyle(localUrl, cdnUrl) {
    return new Promise((resolve, reject) => {
      const append = (href, fallback) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet'; link.href = href;
        link.onload = () => resolve(href);
        link.onerror = () => {
          link.remove();
          if (fallback) append(fallback, null);
          else reject(new Error(`Gagal memuatkan stylesheet: ${localUrl}`));
        };
        document.head.appendChild(link);
      };
      append(localUrl, cdnUrl);
    });
  },
  async loadBootstrap(base = '../libs/') {
    await this.loadStyle(base + 'bootstrap.min.css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
    return this.loadScript(base + 'bootstrap.bundle.min.js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js');
  }
};
