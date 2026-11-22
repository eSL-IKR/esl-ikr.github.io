> **Gabungan v15 (ASUS Z170-P 11 label + 32 GLB + Studio RGB):** Lihat [PANDUAN_GABUNGAN_11_LABEL_STUDIO_RGB.md](PANDUAN_GABUNGAN_11_LABEL_STUDIO_RGB.md).

## Makmal PC — Semua Komponen dalam 3D (GLB)

Versi ini menambah 22 model GLB 3D tempatan dalam `public/pclab/models/components` dan galeri 3D. Buka `PANDUAN_SEMUA_KOMPONEN_3D.md` untuk panduan lengkap.

# eModul IKR: Makmal PC 3D (v14)

Portal eModul IKR (Vite + React) bersama simulator PC 3D satu fail (Three.js). Mod: **Belajar**, **Latihan Amali**, **Ujian Amali**. Keputusan Ujian boleh dicetak (PDF), disalin, dan dihantar ke eModul melalui `postMessage`.

## Struktur
- `public/pclab/index.html` : simulator utama (Perkakasan, Perisian, Katalog, Pembina). Fail ini boleh berdiri sendiri.
- Pembina PC 3D terkini terbenam dalam `public/pclab/index.html` (`BLD_SRC`). `pembina.html` lama dibuang kerana tidak lagi dirujuk.
- `public/pclab/catalog-opendb.json` : 268 komponen daripada BuildCores OpenDB (harga tiada, anggaran kuasa sahaja).
- `public/models/gaming-pc.glb` : model hero halaman utama.
- `public/.nojekyll` : wajib untuk GitHub Pages (hanya perlu jika anda deploy folder statik terus).
- `src/` : portal React (`PortalIKR.jsx`, `PortalHero.jsx`, `HeroModel3D.jsx`, `PCLab3D.jsx`, `portal-pro.css`).
- `tools/convert-opendb.py` : jana semula katalog daripada `buildcores-open-db`.

## Hos pantas (tanpa build)
1. Muat naik `index.html`, `pembina.html`, `catalog-opendb.json` dan `.nojekyll` ke repo GitHub.
2. Settings > Pages > Deploy from branch > `main` / root.
3. Buka `https://<nama>.github.io/<repo>/`.

## Portal penuh (React)
```
npm install
npm run build
npx gh-pages -d dist
```
`.nojekyll` dalam `public/` akan disalin ke `dist/`.

## Tema gelap / cerah
- Butang tukar tema pada header portal (`src/ThemeToggle.jsx`); logik dalam `src/theme.js` dan `src/useTheme.js`.
- Pilihan disimpan dalam `localStorage` kunci `ikr-tema` (`dark` | `light`), dikongsi dengan Makmal PC 3D. Tanpa pilihan, ikut tetapan peranti.
- Warna mod gelap dijana: `python3 tools/gen-dark-theme.py` (menulis `src/theme.css`). Jalankan semula selepas menambah kelas warna Tailwind baharu.

## Pilihan URL
- `?hw=20&sw=30` : bilangan soalan Ujian Perkakasan / Perisian.
- `#nointro` : langkau intro.
- `#perisian` : terus ke tab Perisian.
- `#pembina&case=<id>` : terus ke Pembina dengan casing tertentu (contoh `od-5205c32c`).

## Ciri v2
Semakan keserasian sebenar (soket, DDR, panjang GPU, tinggi penyejuk, kuasa PSU, faktor bentuk), perangkap Ujian (CPU soket salah, RAM DDR3, PSU kecil), masa Ujian dan pengesan tukar tab, tetapan kualiti grafik automatik, kekunci papan (Tab/P/Enter), tutorial dan intro.

## Mengenai fail RAR BuildCores (200 MB+)
Kandungan 9 bahagian RAR sudah diperiksa:
- `buildcores-open-db`: data spesifikasi JSON sahaja. Sudah digunakan sebagai `catalog-opendb.json`.
- `buildcores-render-client`: klien untuk API render awan BuildCores. Ia perlukan kunci API, token bahagian belakang (backend) dan origin yang dibenarkan, jadi tidak boleh berjalan pada GitHub Pages statik.
- `react-native-filament-buildcores`: aplikasi demo mudah alih dengan beberapa model GLB contoh (dron, syiling, roket, FlightHelmet). Tiada model alat PC.

Oleh itu RAR **tidak** dimasukkan ke repo (melebihi had 100 MB sefail GitHub dan tidak mengandungi model bahagian PC). Paparan 3D dalam `index.html` dan `pembina.html` dijana secara prosedur dengan Three.js. Untuk model sebenar, letak fail `.glb` berlesen sendiri (butang "Model GLB" dalam Pembina).

## Lesen dan atribusi
Data OpenDB: CC BY-NC-SA 4.0 (atribusi, bukan komersial, kongsi serupa). Lihat `public/pclab/NOTICE-OpenDB.md` dan `LICENSE-OpenDB-CC-BY-NC-SA-4.0.txt`.

## Nota
- Three.js r128, Bootstrap, Font Awesome, html2canvas, fon Inter dan Fira Code disimpan setempat dalam `public/libs/` dan dimuat dahulu; jika gagal, halaman beralih ke CDN. Jana semula dengan `bash tools/vendor-libs.sh`. Lihat `public/libs/LICENSES.md`.
- Satu pengecualian: `cdn.tailwindcss.com` diganti dengan CSS yang dikompil (`public/libs/tailwind/`), dengan CDN sebagai sandaran.
- Kod pengesahan keputusan hanyalah semakan konsistensi, bukan keselamatan.
- Keserasian radiator F600 tidak diketahui dalam data; ia anggaran.

## Penambahan FOIFKIN F600 3D (2026-11-17)

Model casing GLB tersedia secara tempatan di `public/pclab/models/FOIFKIN_F600.glb`. Buka Makmal PC 3D → Belajar → Perkakasan → **Casing FOIFKIN F600 — 3D GLB**. Model casing juga dimuatkan dalam adegan utama (fallback rangka asal sekiranya gagal). Rujuk `PANDUAN_FOIFKIN_F600_3D.md` untuk penerangan, sumber dan had model prosedural.

## Tambahan Corsair + Elgato — 32 GLB
Pilihan D mengekalkan 24 model asal dan menambah 8 model prosedural baharu dalam `public/pclab/models/brands/`. Buka Makmal PC 3D → Belajar → Perkakasan → **Pamer set Corsair + Elgato** atau **8 model baharu 3D**. Dalam tab Katalog, pilih **Corsair / Elgato 3D**. Untuk cara guna dan spesifikasi, lihat `PANDUAN_CORSAIR_ELGATO_3D.md`.
