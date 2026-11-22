# Simulator PC 3D (IKR)

Simulator 3D untuk belajar memasang perkakasan dan perisian PC. Fail utama: `index.html` (dalam folder ini: `public/pclab/`).
Mod: Belajar, Latihan Amali, Ujian Amali. Keputusan ujian boleh disalin, dicetak (PDF) dan dihantar ke eModul melalui `postMessage`.

## Bina PC (tiga tab)
- **Pembina lengkap:** slot komponen sebenar, carian, semakan keserasian, pautan kongsi dan cetak senarai.
- **Pantas (hover 3D):** hover pada pilihan untuk melihatnya dipasang pada model 3D, bar watt berbanding PSU, jumlah harga dan senarai semakan keserasian.
- **Paparan model:** model GLB PC gaming; matikan panel/kaca atau kumpulan bahagian untuk melihat bahagian dalam.

Pautan terus: `#pembina`, `#pantas`, `#model`, `#perisian`.

## Menjalankan
- Dalam eModul: `npm install` kemudian `npm run dev` (alamat `http://localhost:5173/eModul-IKR/`).
- Berdiri sendiri (GitHub Pages): letak folder `pclab/` (termasuk `catalog-opendb.json`, `.nojekyll`) dan `models/gaming-pc.glb`, kemudian hos. Fail `index.html` tidak boleh membuka katalog OpenDB jika dibuka terus dari cakera (`file://`); gunakan pelayan (`npm run dev`, GitHub Pages, atau `python -m http.server`).
- Memerlukan internet untuk Three.js (cdnjs/jsDelivr) dan fon (Google Fonts).

## Pilihan URL
- `?hw=20&sw=30` : tukar had masa ujian (minit). Lalai 15 dan 25.
- `#nointro` : langkau animasi masuk. Animasi juga dilangkau di dalam iframe eModul dan apabila sudah dilihat dalam sesi yang sama.

## Data dan lesen
- `catalog-opendb.json` datang daripada **BuildCores OpenDB** (CC BY-NC-SA 4.0, bukan komersial, atribusi dan kongsi dengan lesen sama). Lihat `NOTICE-OpenDB.md` dan `LICENSE-OpenDB-CC-BY-NC-SA-4.0.txt`.
- Harga komponen OpenDB dalam tab Pantas ialah anggaran kasar (ditanda "≈"). Spesifikasi komponen contoh (GPU 300 mm, penyejuk 155 mm, PSU 550W) ialah nilai contoh untuk latihan.
- Data OpenDB tiada maklumat sokongan radiator AIO; sokongan casing dalam katalog ialah anggaran.
- Kod pengesahan keputusan ialah semakan konsistensi ringkas, bukan keselamatan.

## Rupa dan aset (v14)
- Rupa makmal disamakan dengan eModul IKR: aksen indigo, butang bulat dan fon sistem. Kulit Codedex (fon piksel, butang emas) dibuang; ikon gel dikekalkan.
- Aset (Three.js r128 dan pemuat) dimuat dari `../libs/three/` dahulu, kemudian CDN jika gagal.
- Kawalan kamera: klik pada model atau tekan Ctrl + skrol untuk zum, supaya halaman masih boleh diskrol.
- Skrin BIOS/POST membaca komponen yang dipasang dalam 3D (contoh: tiada RAM memaparkan "No Memory Detected").
- Fail `component-asset-loader.js`, `component-assets*.json` dan `ASSET-PIPELINE.md` ialah registry model komponen GLB. Ia belum dipasang ke Pembina kerana belum ada model GLB komponen.

## ASUS Z170-P 3D (ditambah)
- Model asal pengguna: `models/asus-z170p.glb`, dengan tekstur terbenam.
- Mod **Perkakasan**: motherboard contoh digantikan oleh model GLB apabila berjaya dimuatkan; soket/slot dan pemasangan komponen masih menggunakan sistem interaktif sedia ada.
- Butang **Model 3D motherboard** membuka pemapar tempatan 360° `asus-z170p-viewer.html` (tanpa Sketchfab).
- Jika GLB gagal dimuatkan, bentuk asas asal tetap dipaparkan.
- Jalankan melalui `npm run dev` atau pelayan HTTP localhost, bukan dengan membuka fail HTML terus (`file://`).
