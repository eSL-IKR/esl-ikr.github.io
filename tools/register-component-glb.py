#!/usr/bin/env python3
"""Register one real per-component GLB in the eModul IKR asset registry."""
import argparse
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "pclab"
REGISTRY = PUBLIC / "component-assets.json"
ALLOWED = {"case", "mobo", "cpu", "cooler", "ram", "gpu", "storage", "psu"}


def parse_vec(values):
    if values is None:
        return None
    try:
        result = [float(value) for value in values]
    except ValueError as exc:
        raise argparse.ArgumentTypeError("Transform mesti berupa nombor.") from exc
    if len(result) != 3:
        raise argparse.ArgumentTypeError("Transform mesti mempunyai 3 nombor: X Y Z.")
    return result


def validate_glb(path: Path):
    size = path.stat().st_size
    if size < 20:
        raise ValueError("Fail terlalu kecil untuk GLB yang sah.")
    with path.open("rb") as stream:
        header = stream.read(12)
    magic = header[:4]
    version = int.from_bytes(header[4:8], "little")
    declared_length = int.from_bytes(header[8:12], "little")
    if magic != b"glTF":
        raise ValueError("Fail bukan GLB binari: header 'glTF' tiada.")
    if version != 2:
        raise ValueError(f"Hanya GLB glTF 2.0 disokong; versi ditemui: {version}.")
    if declared_length != size:
        raise ValueError(f"Saiz header GLB ({declared_length}) tidak sama dengan saiz fail ({size}).")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--category", required=True, choices=sorted(ALLOWED))
    parser.add_argument("--id", required=True, help="ID tepat dalam component-assets.json")
    parser.add_argument("--file", required=True, type=Path, help="Fail GLB sumber")
    parser.add_argument("--fit", choices=["contain", "fill", "none"], default="contain")
    parser.add_argument("--position", nargs=3, metavar=("X", "Y", "Z"))
    parser.add_argument("--rotation-deg", nargs=3, metavar=("X", "Y", "Z"))
    parser.add_argument("--scale", nargs=3, metavar=("X", "Y", "Z"))
    parser.add_argument("--force", action="store_true", help="Gantikan GLB sedia ada untuk komponen ini.")
    args = parser.parse_args()

    component_id = args.id.strip()
    if not re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9._-]{0,100}", component_id):
        parser.error("ID mengandungi aksara yang tidak dibenarkan.")

    source = args.file.expanduser().resolve()
    if not source.is_file():
        parser.error(f"Fail tidak dijumpai: {source}")
    try:
        validate_glb(source)
    except ValueError as exc:
        parser.error(str(exc))

    try:
        registry = json.loads(REGISTRY.read_text(encoding="utf-8"))
    except Exception as exc:
        parser.error(f"Registry tidak dapat dibaca: {exc}")

    item = next((x for x in registry.get("items", []) if x.get("category") == args.category and x.get("id") == component_id), None)
    if item is None:
        parser.error("ID komponen tidak wujud dalam registry. Jalankan tools/build-component-registry.py dahulu.")

    relative = Path("models") / "components" / args.category / f"{component_id}.glb"
    destination = PUBLIC / relative
    if destination.exists() and not args.force:
        parser.error(f"Model sudah wujud: {destination}. Gunakan --force jika benar-benar mahu menggantikannya.")
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, destination)

    item["modelUrl"] = relative.as_posix()
    item["renderer"] = "glb"
    transform = item.setdefault("transform", {})
    if args.position:
        transform["position"] = parse_vec(args.position)
    if args.rotation_deg:
        transform["rotationDeg"] = parse_vec(args.rotation_deg)
    if args.scale:
        transform["scale"] = parse_vec(args.scale)
    transform["fit"] = args.fit

    REGISTRY.write_text(json.dumps(registry, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"OK: {item['name']}")
    print(f"GLB: {destination.relative_to(ROOT).as_posix()}")
    print("Registry dikemas kini. Jalankan tools/validate-component-assets.py untuk pengesahan.")


if __name__ == "__main__":
    main()
