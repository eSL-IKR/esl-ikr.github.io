# Pipeline aset 3D komponen PC, eModul IKR

## Katalog semasa

Pangkalan data pembina PC mempunyai 406 pilihan komponen dalam 8 kategori:

| Jenis rekod | Bilangan | Maksud |
|---|---:|---|
| Komponen asas / rekod produk OpenDB | 310 | 41 komponen contoh eModul IKR + 269 rekod BuildCores OpenDB (termasuk FOIFKIN F600) |
| Varian visual 3D | 96 | Varian warna/penampilan yang dijana dalam builder; bukan 96 SKU produk sebenar yang disahkan |
| Jumlah pilihan | 406 | Semua pilihan yang boleh muncul dalam katalog pembina |

406 pilihan tidak bermaksud 406 model GLB. Pada pakej ini:

- `public/models/gaming-pc.glb` ialah satu model PC lengkap untuk paparan contoh.
- Tiada model GLB individu bagi komponen didaftarkan setakat ini.
- Komponen yang belum mempunyai GLB masih dilukis menggunakan geometri prosedural Three.js yang memang sudah ada dalam pembina.

Jangan paparkan 406 sebagai bilangan aset GLB. Paparkan bilangan GLB yang berdaftar secara berasingan.

## Fail yang berkaitan

| Fail | Peranan |
|---|---|
| `public/pclab/catalog-opendb.json` | 268 rekod BuildCores OpenDB yang telah dipilih dan dinormalisasi |
| `public/pclab/catalog-builtin.json` | 138 pilihan daripada builder: 42 rekod asas (termasuk F600) + 96 varian visual |
| `public/pclab/component-assets.json` | Registry 406 pilihan, metadata dimensi/keserasian, transform dan URL GLB pilihan |
| `public/pclab/component-assets.schema.json` | JSON Schema untuk registry |
| `public/pclab/component-asset-loader.js` | Loader GLB lazy, cache, DRACO dan release reference |
| `public/pclab/models/components/<kategori>/<id>.glb` | Folder aset GLB individu apabila model sebenar tersedia |
| `tools/extract-builtin-catalog.js` | Ekstrak katalog asas daripada pembina supaya data sumber tidak perlu disalin manual |
| `tools/build-component-registry.py` | Gabungkan katalog asas + OpenDB dan bina registry 406 pilihan |
| `tools/register-component-glb.py` | Salin dan daftarkan satu model GLB kepada ID sedia ada |
| `tools/validate-component-assets.py` | Semak jumlah, ID, metadata, transform, URL dan header GLB |

## Skema item komponen

Setiap item mengandungi:

- `id`, `name`, `category`, `source` dan `sourceProductId`.
- `price`, `priceCurrency` dan `priceIsEstimate`. Rekod OpenDB yang tiada harga kekal `null`; harga tidak direka.
- `dimensions`: dimensi yang tersedia dengan unit yang jelas.
- `compatibility`: soket CPU, faktor bentuk motherboard/PSU, jenis RAM, panjang GPU dan had casing jika data tersedia.
- `specifications`: medan sumber asal yang dinormalisasi untuk rujukan lanjut.
- `modelUrl`: `null` sehingga fail GLB sebenar didaftarkan.
- `expectedModelPath`, `renderer` dan `transform`.

Contoh ringkas:

```json
{
  "id": "od-xxxxxxxx",
  "category": "gpu",
  "name": "Nama GPU daripada katalog",
  "source": "BuildCores OpenDB",
  "modelUrl": null,
  "expectedModelPath": "models/components/gpu/od-xxxxxxxx.glb",
  "format": "glb",
  "renderer": "procedural",
  "price": null,
  "dimensions": { "lengthMm": 305, "thicknessSlots": 2.5 },
  "compatibility": { "lengthMm": 305, "powerDrawW": 250 },
  "transform": {
    "anchor": "pcie-slot",
    "position": [0, 0, 0],
    "rotationDeg": [0, 0, 0],
    "scale": [1, 1, 1],
    "fit": "contain"
  }
}
```

Nilai pada contoh ini hanya menerangkan bentuk skema; ia bukan spesifikasi produk sebenar. Gunakan item sebenar dalam `component-assets.json`.

## Membina semula registry selepas katalog berubah

Dari folder root projek:

```bash
node tools/extract-builtin-catalog.js
python tools/build-component-registry.py
python tools/validate-component-assets.py
```

Pada Windows, jika arahan `python` tidak dikenali, gunakan `py -3`:

```powershell
py -3 tools/build-component-registry.py
py -3 tools/validate-component-assets.py
```

`build-component-registry.py` mengekalkan `modelUrl` dan `transform` yang telah didaftarkan sebelum ini bagi ID yang sama. Jangan ubah ID produk yang sudah digunakan oleh pembina.

## Mendaftarkan model GLB sebenar

1. Dapatkan atau cipta model bagi komponen yang betul.
2. Pastikan lesen membenarkan penggunaan dalam projek ini.
3. Pastikan model berada dalam orientasi yang sesuai dan skala boleh dibandingkan dengan model prosedural.
4. Daftarkan menggunakan ID sebenar dalam registry:

```powershell
py -3 tools/register-component-glb.py --category gpu --id od-xxxxxxxx --file "D:/Models/gpu.glb" --fit contain
```

Jika perlu pelarasan khusus:

```powershell
py -3 tools/register-component-glb.py --category gpu --id od-xxxxxxxx --file "D:/Models/gpu.glb" --fit contain --position 0 0 0 --rotation-deg 0 90 0 --scale 1 1 1
```

Gunakan `--force` hanya apabila memang mahu menggantikan aset yang sudah didaftarkan. Skrip menyemak header GLB 2.0 dan panjang fail sebelum menyalin.

Selepas mendaftar:

```powershell
py -3 tools/validate-component-assets.py
```

Loader hanya meminta fail GLB apabila komponen tersebut dipasang dalam konfigurasi 3D. Jika `modelUrl` kosong, fail hilang atau loader gagal, geometri prosedural sedia ada kekal sebagai fallback.

## Transform dan titik pemasangan

- `case`: origin casing.
- `mobo`: origin motherboard.
- `cpu`: kawasan soket CPU.
- `cooler`: anchor penyejuk CPU.
- `ram`: slot DIMM.
- `gpu`: slot PCIe.
- `storage`: ruang pemasangan storan.
- `psu`: ruang PSU.

`position` ialah offset tempatan `[x,y,z]`, `rotationDeg` ialah putaran paksi dalam darjah dan `scale` ialah faktor skala. `fit`:

- `contain`: skala seragam supaya model muat dalam bounding box prosedural.
- `fill`: skala setiap paksi secara berasingan; boleh mengubah nisbah bentuk, gunakan dengan berhati-hati.
- `none`: gunakan skala manual tanpa auto-fit.

Setiap aset memerlukan pemeriksaan visual kerana model GLB pihak ketiga mungkin mempunyai origin, paksi dan saiz unit yang berbeza.

## Pengoptimuman prestasi

1. Lazy loading: Jangan muatkan ratusan model semasa halaman dibuka. Muatkan hanya aset komponen yang dipasang/dipilih.
2. Promise deduplication: Jika URL yang sama diminta berulang kali, loader berkongsi permintaan yang sedang berjalan.
3. LRU + reference counting: Cache menyimpan model yang pernah digunakan; model yang tidak lagi dirujuk boleh dikeluarkan apabila had cache dicapai.
4. DRACO: Loader dikonfigurasi dengan decoder setempat di `public/draco/`.
5. InstancedMesh: Sesuai untuk objek berulang yang benar-benar berkongsi geometri/material (contoh skru atau LED). Jangan gabungkan GPU/CPU/RAM berasingan menjadi satu instance jika pengguna perlu memilih atau menggantikannya.
6. Tekstur: Draco memampatkan geometri, bukan semestinya tekstur. Untuk tekstur, pertimbangkan KTX2/Basis Universal dalam pipeline berasingan apabila loader dan transcoder KTX2 ditambah.
7. Dispose: Apabila cache mengeluarkan scene yang tiada rujukan, geometri, material dan tekstur perlu dilepaskan. Jangan dispose bahan yang masih digunakan oleh instance aktif.
8. Reduced motion: Kekalkan `prefers-reduced-motion` untuk animasi UI.

Contoh pemampatan GLB dengan glTF Transform:

```bash
npm install --global @gltf-transform/cli
gltf-transform optimize input.glb output.glb --compress draco
```

Pengurangan 70 hingga 80% bukan jaminan. Ia bergantung pada geometri, tekstur, material dan tetapan eksport.

## Lesen dan atribusi

Data BuildCores OpenDB digunakan di bawah CC BY-NC-SA 4.0. Kekalkan atribusi dan fail lesen:

- `NOTICE-OpenDB.md`
- `LICENSE-OpenDB-CC-BY-NC-SA-4.0.txt`

Lesen tersebut mempunyai syarat atribusi, bukan komersial dan perkongsian serupa. Semak lesen aset GLB pihak ketiga secara berasingan; lesen data OpenDB tidak memberikan hak kepada model 3D yang tidak terkandung dalam pangkalan data itu.

## Had semasa

- Registry dan loader GLB individu sudah disediakan, tetapi aset GLB individu belum dibekalkan.
- Model `gaming-pc.glb` ialah PC lengkap, bukan pecahan casing, motherboard, GPU dan bahagian lain.
- Geometri prosedural ialah fallback aktif dan bukan model fotorealistik produk sebenar.
- Sebelum mengiklankan konfigurator sebagai model produk sebenar, setiap GLB perlu disemak dari segi ketepatan model, skala, titik pemasangan, material dan lesen.
