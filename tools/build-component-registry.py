#!/usr/bin/env python3
"""Build the unified 3D asset registry from the builder and OpenDB catalogs."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "pclab"
BUILTIN = PUBLIC / "catalog-builtin.json"
OPENDB = PUBLIC / "catalog-opendb.json"
REGISTRY = PUBLIC / "component-assets.json"

CATEGORY_LABELS = {
    "case": "Casing",
    "mobo": "Motherboard",
    "cpu": "Pemproses (CPU)",
    "cooler": "Penyejuk CPU",
    "ram": "Memori (RAM)",
    "gpu": "Kad grafik (GPU)",
    "storage": "Storan",
    "psu": "Bekalan kuasa (PSU)",
}
ANCHORS = {
    "case": "case-origin",
    "mobo": "motherboard-origin",
    "cpu": "cpu-socket",
    "cooler": "cpu-cooler-anchor",
    "ram": "dimm-slots",
    "gpu": "pcie-slot",
    "storage": "storage-bay",
    "psu": "psu-bay",
}
MOBO_SIZE_CM = {"ATX": [24.4, 30.5], "mATX": [24.4, 24.4], "ITX": [17.0, 17.0]}


def read_json(path: Path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        raise SystemExit(f"Gagal membaca {path.relative_to(ROOT)}: {exc}")


def dimensions(category: str, product: dict):
    if category == "case" and isinstance(product.get("dim"), list) and len(product["dim"]) == 3:
        # Values follow the builder's local X/Y/Z axes (the source conversion
        # stores case depth/height/width in this order).
        return {
            "xCm": product["dim"][0],
            "yCm": product["dim"][1],
            "zCm": product["dim"][2],
            "axisDescription": "Dimensi X/Y/Z mengikut koordinat casing Three.js",
        }
    if category == "mobo":
        size = MOBO_SIZE_CM.get(product.get("ff"))
        if size:
            return {"xCm": size[0], "yCm": size[1], "zCm": None, "formFactorNominal": product.get("ff")}
    if category == "gpu" and product.get("len") is not None:
        return {"lengthMm": product["len"], "thicknessSlots": product.get("slots")}
    if category == "cooler":
        if product.get("type") == "air" and product.get("h") is not None:
            return {"heightMm": product["h"]}
        if product.get("type") == "aio" and product.get("rad") is not None:
            return {"radiatorSizeMm": product["rad"]}
    if category == "psu" and product.get("len") is not None:
        return {"lengthCm": product["len"]}
    return {}


def compatibility(category: str, product: dict):
    if category == "case":
        return {
            "motherboardFormFactors": product.get("sup", []),
            "powerSupplyFormFactors": product.get("psu", []),
            "maxGpuLengthMm": product.get("gpu"),
            "maxCpuCoolerHeightMm": product.get("cool"),
            "supportedRadiatorSizesMm": product.get("rad"),
            "radiatorSupportEstimated": bool(product.get("radEst")),
            "maxPsuLengthMm": product.get("psuLen"),
        }
    if category == "mobo":
        return {
            "formFactor": product.get("ff"),
            "cpuSocket": product.get("sock"),
            "memoryType": product.get("mem"),
            "memorySlots": product.get("slots"),
            "m2Slots": product.get("m2"),
            "chipset": product.get("chip"),
        }
    if category == "cpu":
        return {"socket": product.get("sock"), "tdpW": product.get("tdp"), "cores": product.get("cores"), "threads": product.get("thr"), "integratedGraphics": product.get("igpu")}
    if category == "cooler":
        return {"coolerType": product.get("type"), "supportedSockets": product.get("sock", []), "radiatorSizeMm": product.get("rad"), "heightMm": product.get("h"), "estimatedCoolingCapacityW": product.get("tdp")}
    if category == "ram":
        return {"memoryType": product.get("mem"), "capacityGB": product.get("gb"), "moduleCount": product.get("mods"), "speedMTs": product.get("spd")}
    if category == "gpu":
        return {"lengthMm": product.get("len"), "thicknessSlots": product.get("slots"), "powerDrawW": product.get("tdp"), "fanCount": product.get("fans")}
    if category == "storage":
        return {"driveType": product.get("kind"), "capacityGB": product.get("gb")}
    if category == "psu":
        return {"formFactor": product.get("ff"), "wattageW": product.get("w"), "lengthCm": product.get("len"), "efficiencyRating": product.get("eff")}
    return {}


def make_item(category: str, product: dict, previous: dict):
    component_id = str(product.get("id", "")).strip()
    name = str(product.get("n", "")).strip()
    if not component_id or not name:
        raise SystemExit(f"Rekod tanpa ID/nama ditemui dalam kategori {category}.")

    is_variant = bool(product.get("modelTag")) or "_v" in component_id
    if is_variant:
        source = "synthetic-visual-variant"
        variant_of = component_id.rsplit("_v", 1)[0]
        source_id = None
    elif product.get("src") == "od" or product.get("src") == "BuildCores OpenDB" or product.get("opendb") or product.get("odid"):
        source = "BuildCores OpenDB"
        source_id = product.get("opendb") or product.get("odid")
        variant_of = None
    else:
        source = "eModul IKR built-in"
        source_id = None
        variant_of = None

    old = previous.get((category, component_id), {})
    model_url = old.get("modelUrl")
    renderer = "glb" if model_url else "procedural"
    default_transform = {
        "anchor": ANCHORS[category],
        "position": [0, 0, 0],
        "rotationDeg": [0, 0, 0],
        "scale": [1, 1, 1],
        "fit": "contain",
    }
    transform = old.get("transform") or default_transform
    # Preserve any manually registered GLB and its author-tuned transform.
    price = product.get("price")
    result = {
        "id": component_id,
        "category": category,
        "name": name,
        "source": source,
        "sourceProductId": source_id,
        "variantOf": variant_of,
        "isVisualVariant": is_variant,
        "modelUrl": model_url,
        "expectedModelPath": f"models/components/{category}/{component_id}.glb",
        "format": "glb",
        "renderer": renderer,
        "price": price,
        "priceCurrency": "MYR" if price is not None else None,
        "priceIsEstimate": price is not None,
        "dimensions": dimensions(category, product),
        "compatibility": compatibility(category, product),
        "specifications": {k: v for k, v in product.items() if k not in {"id", "n", "modelTag"}},
        "transform": transform,
    }
    if is_variant:
        result["modelTag"] = product.get("modelTag", "Model 3D rekaan")
        result["priceNote"] = "Harga anggaran model asas; bukan harga SKU varian yang disahkan." if price is not None else None
    return result


def main():
    builtin = read_json(BUILTIN)
    opendb = read_json(OPENDB)
    previous_data = read_json(REGISTRY) if REGISTRY.exists() else {"items": []}
    previous = {(x.get("category"), x.get("id")): x for x in previous_data.get("items", [])}

    source_groups = [
        (builtin.get("db") or {}, "built-in catalog"),
        (opendb.get("db") or {}, "OpenDB catalog"),
    ]
    items = []
    seen = set()
    for group, label in source_groups:
        for category, products in group.items():
            if category not in CATEGORY_LABELS:
                raise SystemExit(f"Kategori tidak disokong dalam {label}: {category}")
            for product in products:
                key = (category, str(product.get("id", "")))
                if key in seen:
                    raise SystemExit(f"ID pendua antara katalog: {key}")
                seen.add(key)
                items.append(make_item(category, product, previous))

    by_key = {(item["category"], item["id"]): item for item in items}
    for item in items:
        if item["isVisualVariant"] and (item["category"], item["variantOf"]) not in by_key:
            raise SystemExit(f"Varian {item['id']} tiada komponen asas {item['variantOf']}.")

    category_counts = {}
    for category, label in CATEGORY_LABELS.items():
        category_items = [item for item in items if item["category"] == category]
        category_counts[category] = {
            "label": label,
            "count": len(category_items),
            "baseAndOpenDbProducts": sum(not x["isVisualVariant"] for x in category_items),
            "visualVariants": sum(x["isVisualVariant"] for x in category_items),
            "defaultTransform": {
                "anchor": ANCHORS[category],
                "position": [0, 0, 0],
                "rotationDeg": [0, 0, 0],
                "scale": [1, 1, 1],
                "fit": "contain",
            },
        }

    base_product_count = sum(not item["isVisualVariant"] for item in items)
    visual_variant_count = sum(item["isVisualVariant"] for item in items)
    manifest = {
        "schemaVersion": 1,
        "name": "eModul IKR PC Component Asset Registry",
        "description": "Registry metadata dan aset 3D pilihan komponen PC; GLB individu didaftarkan hanya apabila fail sebenar tersedia.",
        "count": len(items),
        "baseProductCount": base_product_count,
        "syntheticVisualVariantCount": visual_variant_count,
        "categories": category_counts,
        "assetPolicy": {
            "modelFormat": "glb",
            "lazyLoad": True,
            "cacheStrategy": "LRU with reference counting",
            "maxUnreferencedCacheEntries": 32,
            "fallbackRenderer": "procedural Three.js geometry",
            "note": "Jumlah pilihan katalog bukan jumlah model GLB. Model individu yang tiada kekal menggunakan geometri prosedural.",
        },
        "attribution": {
            "opendb": {
                "name": "BuildCores OpenDB",
                "url": "https://github.com/buildcores/buildcores-open-db",
                "license": "CC BY-NC-SA 4.0",
                "licenseUrl": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
                "scope": "Rekod produk yang source-nya BuildCores OpenDB, termasuk FOIFKIN F600.",
            },
            "eModul": {
                "name": "eModul IKR built-in catalog",
                "scope": "Komponen contoh dan spesifikasi yang dibina untuk simulator eModul IKR.",
            },
            "visualVariants": {
                "scope": "Varian warna yang dijana secara programatik untuk paparan 3D; bukan SKU sebenar yang disahkan.",
            },
        },
        "items": items,
    }
    REGISTRY.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Registry dibina: {len(items)} pilihan komponen")
    print(f"Rekod asas/OpenDB: {base_product_count}; varian visual rekaan: {visual_variant_count}")
    print("Kategori:", ", ".join(f"{k}={v['count']}" for k, v in category_counts.items()))
    print(f"GLB individu dikekalkan: {sum(bool(x['modelUrl']) for x in items)}")


if __name__ == "__main__":
    main()
