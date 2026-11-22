# Atribusi data komponen

Fail `catalog-opendb.json` ialah **karya adaptasi** daripada **BuildCores OpenDB**
(https://github.com/buildcores/buildcores-open-db), dilesenkan di bawah
**Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0)**:
https://creativecommons.org/licenses/by-nc-sa/4.0/ (teks penuh: `LICENSE-OpenDB-CC-BY-NC-SA-4.0.txt`).

Perubahan yang dibuat:
- Sebahagian rekod dipilih (496 daripada beribu-ribu) untuk kategori casing, motherboard, CPU,
  penyejuk CPU, RAM, GPU, storan dan PSU.
- Medan ditukar kepada skema ringkas yang digunakan Pembina PC 3D.
- Sokongan radiator casing (`radEst`) ialah anggaran berdasarkan jenis casing, bukan data OpenDB.
- Harga tidak disertakan (OpenDB tidak menyediakannya). Tab Pantas menunjukkan **anggaran kasar** (ditanda "≈") yang dikira oleh simulator untuk tujuan pembelajaran, bukan harga pasaran.

Syarat penggunaan: **bukan komersial**, atribusi mesti dikekalkan, dan adaptasi data ini mesti dikongsi
dengan lesen yang sama. Penggunaan komersial memerlukan kebenaran berasingan daripada pemegang lesen.
Model 3D `models/gaming-pc.glb` dibekalkan oleh pemilik portal; pastikan anda berhak menggunakannya.

Untuk menjana semula katalog: `python3 tools/convert-opendb.py <laluan>/open-db`
