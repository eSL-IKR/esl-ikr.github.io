"""Semak public/pclab/component-assets.json: jumlah, ID unik, transform, URL dan header GLB."""

import json
import struct
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PCLAB = ROOT / "public" / "pclab"
FITS = {"contain", "fill", "none"}


def vec3_ok(v):
    return (
        isinstance(v, list)
        and len(v) == 3
        and all(isinstance(x, (int, float)) for x in v)
    )


def main():
    data = json.loads((PCLAB / "component-assets.json").read_text(encoding="utf-8"))
    items = data["items"]
    errors = []

    if data["count"] != len(items):
        errors.append(f"count={data['count']} tetapi items={len(items)}")
    variants = sum(1 for i in items if i["isVisualVariant"])
    if data["syntheticVisualVariantCount"] != variants:
        errors.append(
            f"syntheticVisualVariantCount={data['syntheticVisualVariantCount']} tetapi varian={variants}"
        )
    if data["baseProductCount"] != len(items) - variants:
        errors.append(
            f"baseProductCount={data['baseProductCount']} tetapi asas={len(items) - variants}"
        )

    seen = set()
    for item in items:
        key = (item["category"], item["id"])
        if key in seen:
            errors.append(f"ID berulang: {key}")
        seen.add(key)
        if item["category"] not in data["categories"]:
            errors.append(f"kategori tidak dikenali: {key}")
        t = item["transform"]
        if not (
            vec3_ok(t["position"])
            and vec3_ok(t["rotationDeg"])
            and vec3_ok(t["scale"])
            and t["fit"] in FITS
        ):
            errors.append(f"transform tidak sah: {key}")
        url = item["modelUrl"]
        if url:
            path = PCLAB / url
            if not path.is_file():
                errors.append(f"GLB tiada: {key} -> {url}")
                continue
            head = path.read_bytes()[:12]
            magic, version, length = (
                struct.unpack("<4sII", head) if len(head) == 12 else (b"", 0, 0)
            )
            if magic != b"glTF" or version != 2 or length != path.stat().st_size:
                errors.append(f"header GLB tidak sah: {key}")

    glb = sum(1 for i in items if i["modelUrl"])
    print(
        f"{len(items)} pilihan ({len(items) - variants} asas, {variants} varian visual), {glb} GLB berdaftar"
    )
    for e in errors:
        print("RALAT:", e)
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
