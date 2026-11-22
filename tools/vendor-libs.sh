#!/usr/bin/env bash
# Muat turun semula aset pihak ketiga ke public/libs/ (untuk kegunaan luar talian).
# Guna: bash tools/vendor-libs.sh   (perlu Node.js dan sambungan internet)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
LIBS="$ROOT/public/libs"
mkdir -p "$LIBS"/{three,bootstrap,html2canvas,fonts,tailwind,fontawesome/css,fontawesome/webfonts}
cd "$TMP"
for p in three@0.128.0 bootstrap@5.3.0 @fortawesome/fontawesome-free@6.4.0 html2canvas@1.4.1 @fontsource/inter@5.3.0 @fontsource/fira-code@5.3.0; do
  npm pack "$p" --silent >/dev/null
done
for t in *.tgz; do d="${t%.tgz}"; mkdir -p "$d"; tar xzf "$t" -C "$d"; done
cp three-0.128.0/package/build/three.min.js \
   three-0.128.0/package/examples/js/controls/OrbitControls.js \
   three-0.128.0/package/examples/js/environments/RoomEnvironment.js \
   three-0.128.0/package/examples/js/loaders/GLTFLoader.js "$LIBS/three/"
cp bootstrap-5.3.0/package/dist/css/bootstrap.min.css bootstrap-5.3.0/package/dist/js/bootstrap.bundle.min.js "$LIBS/bootstrap/"
cp fortawesome-fontawesome-free-6.4.0/package/css/all.min.css "$LIBS/fontawesome/css/"
cp fortawesome-fontawesome-free-6.4.0/package/webfonts/*.woff2 "$LIBS/fontawesome/webfonts/"
cp html2canvas-1.4.1/package/dist/html2canvas.min.js "$LIBS/html2canvas/"
for w in 300 400 500 600 700; do cp fontsource-inter-5.3.0/package/files/inter-latin-$w-normal.woff2 "$LIBS/fonts/"; done
for w in 400 500 600 700; do cp fontsource-fira-code-5.3.0/package/files/fira-code-latin-$w-normal.woff2 "$LIBS/fonts/"; done
# CSS Tailwind (v3) untuk simulasi Debian 13: ganti skrip cdn.tailwindcss.com
mkdir tw && cd tw && npm init -y >/dev/null && npm install tailwindcss@3.4.17 --no-audit --no-fund >/dev/null
printf '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n' > in.css
./node_modules/.bin/tailwindcss -i in.css -o "$LIBS/tailwind/nos-debian13-services.css" \
  --content "$ROOT/public/simulasi/nos-debian13-services.html" --minify
echo "Siap: $LIBS"
