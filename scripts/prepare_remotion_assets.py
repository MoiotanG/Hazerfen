#!/usr/bin/env python3
"""Copy the bundled assets into a Remotion project's public/v6 directory."""
from pathlib import Path
import argparse
import shutil

ROOT = Path(__file__).resolve().parents[1]
ASSET_ROOT = ROOT / "templates/assets"

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("project", type=Path, help="Remotion project directory")
args = parser.parse_args()
public = args.project.resolve() / "public" / "v6"
public.mkdir(parents=True, exist_ok=True)

files = [
    ASSET_ROOT / "pipeline-v6-character-sheet.png",
    ASSET_ROOT / "pipeline-v6-scene-01-locked.png",
    *sorted((ASSET_ROOT / "v6-assets").glob("*.png")),
    *sorted((ASSET_ROOT / "v6-backgrounds").glob("*.png")),
]
for src in files:
    dst = public / src.name
    shutil.copy2(src, dst)
    print(f"copied {src.relative_to(ROOT)} -> {dst}")
print(f"Prepared {len(files)} assets in {public}")
