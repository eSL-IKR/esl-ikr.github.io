## Gabungan — ASUS Z170-P interaktif dan Studio RGB

- Memulihkan 11 hotspot interaktif motherboard, beserta penerangan dan pilihan kamera/label.
- Mengekalkan 32 model komponen, galeri dan katalog Corsair/Elgato.
- Menambah mod Studio RGB, pencahayaan studio dan bahan PBR untuk casing/kipas.
- Mengekalkan mod Latihan dan Ujian.

# Changelog

## v14 (gabungan: portal v13 + makmal v10 + aset luar talian)

### Ditambah
- **Makmal PC 3D terkini:** Tab Pantas (hover 3D, bar watt, anggaran harga), tab Paparan model, katalog OpenDB 496 komponen.
- **Aset setempat dengan sandaran CDN** (`public/libs/`): Three.js r128 dan pemuat, Bootstrap 5.3, Font Awesome 6.4, html2canvas, fon Inter dan Fira Code, CSS Tailwind untuk simulasi Debian 13. Setiap halaman memuat fail setempat dahulu; jika gagal, ia mengambil daripada CDN. `tools/vendor-libs.sh` menjana semula folder ini.
- Registry aset komponen GLB (`public/pclab/component-asset*`, `ASSET-PIPELINE.md`, `tools/validate-component-assets.py`). Belum dipasang ke Pembina.

### Diubah
- Rupa makmal disamakan dengan eModul: kulit Codedex (fon piksel, butang emas, tepi keras) diganti aksen indigo dan butang bulat. Ikon gel dikekalkan.
- Google Fonts tidak lagi dimuat oleh makmal (guna fon sistem).
- `public/pclab/index.html` digabungkan secara tiga hala (asas v10, makmal v10, v12/v13): kawalan kamera klik/Ctrl+skrol, maklum balas perkakasan ke BIOS/POST dan penyegerakan tema portal kekal.
- Pembina terbenam kini guna kawalan roda yang membenarkan skrol halaman apabila halaman boleh diskrol (Ctrl/Cmd + roda untuk zum).

### Dibuang
- `public/pclab/pembina.html` lama (tidak dirujuk lagi; Pembina terkini terbenam dalam `index.html`).

### Dikekalkan
- Tema gelap/cerah, carian modul, bar kemajuan, Semak Kefahaman, kad simulasi NOS dan Monitoring, sandaran kemajuan JSON, DRACO untuk model hero.

## v12 (maklum balas jurutera: kawalan, maklum balas BIOS, sandaran)

### Ditambah
- **Kawalan kamera selamat.** Zum roda tetikus hanya aktif selepas klik pada model atau Ctrl + skrol; skrol biasa menggerakkan halaman. Butang "Kamera: bebas / dikunci" melepaskan sentuhan dan skrol di mobile.
- **Gelung maklum balas perkakasan ke BIOS.** Skrin BIOS/POST kini membaca komponen yang dipasang dalam 3D: tiada RAM memaparkan "No Memory Detected" (POST gagal), 1 modul = Single Channel, 2 = Dual Channel, storan dan amaran kabel/komponen yang belum dipasang. Jika belum memasang apa-apa, paparan asal kekal.
- **Sandaran kemajuan JSON** (butang disket pada header portal): simpan dan pulihkan semua kemajuan, lencana dan keputusan ujian.
- **DRACOLoader** untuk model hero (decoder setempat `public/draco/`) dan `dispose()` tekstur penuh.
- `PANDUAN_3D.md`: kod contoh pengawal kanvas, dispose, DRACO, susun atur 16:9 / 9:16.

## v11 (gabungan v10 + carian/kemajuan + tema)

### Ditambah
- **Mod gelap / mod cerah.** Butang tukar tema (bulan/matahari) pada header portal; butang terapung pada halaman modul. Pilihan disimpan dalam `localStorage` (kunci `ikr-tema`); jika tiada pilihan, ikut tetapan peranti. Tema ditetapkan sebelum cat pertama (skrip dalam `index.html`) supaya tiada kelipan.
- **Tema dikongsi dengan Makmal PC 3D.** Menukar tema dalam portal menukar tema simulator, dan sebaliknya (`postMessage` satu asal).
- **Makmal PC 3D** (simulator + pembina PC dengan data BuildCores OpenDB, 268 komponen: CPU, GPU, RAM, PSU, casing dan lain-lain) digabungkan ke dalam portal: hero 3D, butang "Makmal PC 3D" pada header, jalur Makmal PC, dan halaman `PCLab3D`.
- `tools/gen-dark-theme.py` + `tools/theme-base.css`: menjana `src/theme.css` daripada kelas Tailwind yang digunakan.

### Dikekalkan
- Carian modul, tab/pemilih semester, bar kemajuan (termasuk IKR3013/3023), lencana ciri, Semak Kefahaman dan Sebelumnya/Seterusnya pada nota Sem 3.

### Dibaiki
- Semua `localStorage` (set, remove) dibalut `try/catch`: tiada skrin putih pada mod peribadi.
- Lencana kad modul tidak lagi berganda.
- `PortalIKR.jsx` v10 tidak mengandungi carian/kemajuan; kedua-duanya digabungkan semula.

### Nota
- `three` ditambah dalam `package.json`: jalankan `npm install`.
- Folder salinan lama (`eModul-IKR-main`, `eModul-IKR-fixed`) dan `Fail Tambahan ...` tidak disertakan dalam zip ini.

## v13
- Simulasi amali diletak di sebelah Kuiz: IKR3103 (9 simulasi NOS) dan IKR3113 (VMware/TrueNAS). Fail dalam public/simulasi/.

## v15 — Semua Komponen 3D GLB (2026-11-17)
- 22 fail `.glb` bergeometri PBR baharu untuk perkakasan dan periferal, dijana offline melalui `trimesh`.
- `public/pclab/index.html`: pemuatan model asli dalam adegan pemasangan; fallback jika GLB gagal, cache Promise dan metadata raycast.
- `public/pclab/components-3d-viewer.html`: 24 model GLB boleh diputar, dizum, dipilih, dan dilihat dari pelbagai sudut.
- Butang `Fokus PC`, `GALERI 3D SEMUA KOMPONEN`; label komponen dimatikan pada mula untuk kurangkan pertindihan, masih boleh dihidupkan.
- Model terdahulu ASUS Z170-P dan FOIFKIN F600 dikekalkan. Kabel kekal TubeGeometry 3D dinamik.
- Rujuk `PANDUAN_SEMUA_KOMPONEN_3D.md`.

## v15 — Integrasi Corsair + Elgato (Pilihan D, 2026-11-17)
- Kekalkan semua 24 GLB asal dan fungsi kuiz/pemasangan.
- Tambah 8 GLB prosedural (4 Corsair, 4 Elgato) di `public/pclab/models/brands`.
- Galeri 32 model dengan penapis jenama serta akses daripada tab Perkakasan dan Katalog.
- Mod Belajar: pameran Corsair (RAM, PSU, kipas, AIO pilihan) dan Elgato di meja; tanpa kesan pada penilaian.
- Tambah skrip penjanaan semula dan panduan `PANDUAN_CORSAIR_ELGATO_3D.md`.
