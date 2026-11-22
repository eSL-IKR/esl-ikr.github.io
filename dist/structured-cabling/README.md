# IKR3023 Network Structured Cabling 3D Simulator

## Status: Fasa 1 + 2 (belum lengkap)

| Fasa | Status |
|---|---|
| 1 Sistem reka bentuk, UI responsif, adegan Three.js | Siap (belum diuji dalam pelayar sebenar oleh pembangun) |
| 2 Inventori, muat GLB, pilih objek, Misi 1 | Siap (belum diuji dalam pelayar sebenar oleh pembangun) |
| 3-8 Potong/kupas/susun, crimp, punch down, tester, markah penuh, optimasi | **Belum dibina** |

Misi 2-8 hanya paparan ruang letak. Tiada kerja palsu: butang Seterusnya hanya aktif selepas Misi 1 disahkan.

## Cara jalankan
```
cd IKR3023-Structured-Cabling
python -m http.server 8000
```
Buka http://localhost:8000. **Jangan** buka index.html terus (file:// atau content:// Android) kerana GLB tidak akan dimuat.

Three.js dimuat dari CDN jsDelivr (v0.170.0). Untuk makmal tanpa internet: muat turun `three@0.170.0` ke folder `vendor/` dan ubah `importmap` dalam index.html.

## Apa yang berfungsi (Fasa 2)
- 12 model GLB dimuat dengan bar kemajuan; model kritikal dahulu, alat di latar belakang; ralat + butang Cuba Semula.
- Klik/ketik objek 3D atau kad inventori; cincin pilihan, tooltip, kamera fokus/set semula.
- Misi 1: pilih kabel + plug + panel; keserasian dinilai (kabel berperisai memerlukan plug dan panel berperisai). Pilihan salah direkod sebagai kesilapan.
- Mod Berpandu (petunjuk) dan Peperiksaan (tiada petunjuk, jawapan keserasian tidak didedahkan) mempunyai tingkah laku berasingan.
- Kemajuan disimpan dalam localStorage. Bunyi pilihan (Web Audio).

## Had diketahui
- Plug dan panel berperisai ialah kad pilihan sahaja (tiada model 3D); ditanda "Prototaip".
- Cat6A diwakili model `16_CAT6_STP_FTP` (F/UTP).
- Bangku kerja ialah geometri prosedur Three.js.
- Plug RJ45, panel, tester dan keystone digabung mengikut bahan untuk prestasi. Fasa 4-6 akan memuat versi bahagian-berasingan.
- Tekstur GLB dikecilkan ke 1024 px (pemotong kabel 7.7 MB → 0.9 MB). Pemampatan Draco/Meshopt belum dibuat.
- Susun atur bangku (kedudukan/orientasi model) ditetapkan secara automatik dan **belum disahkan secara visual**; laras `pos`, `size`, `layFlat` dalam `data/components.json` jika perlu.
