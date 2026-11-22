# Aset pihak ketiga (salinan setempat)

Fail dalam folder ini disalin tanpa ubahan daripada pakej npm yang dinyatakan, supaya eModul dan simulasi berfungsi tanpa internet.
Setiap halaman memuat fail setempat dahulu; jika gagal, ia mengambil daripada CDN sebagai sandaran.

| Fail | Sumber | Lesen |
|---|---|---|
| `three/*` | three@0.128.0 (build dan examples/js) | MIT |
| `bootstrap/*` | bootstrap@5.3.0 | MIT |
| `fontawesome/*` | @fortawesome/fontawesome-free@6.4.0 (hanya woff2) | Ikon CC BY 4.0, fon SIL OFL 1.1, kod MIT |
| `html2canvas/*` | html2canvas@1.4.1 | MIT |
| `fonts/inter-*` | @fontsource/inter@5.3.0 (subset latin) | SIL OFL 1.1 |
| `fonts/fira-code-*` | @fontsource/fira-code@5.3.0 (subset latin) | SIL OFL 1.1 |
| `tailwind/nos-debian13-services.css` | dijana daripada tailwindcss@3.4.17 | MIT |

Jana semula: `bash tools/vendor-libs.sh`.
