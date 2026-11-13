#!/usr/bin/env python3
"""Validate the bundled Hezarfen identity, pose, wing and background assets."""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    "SKILL.md",
    "templates/assets/pipeline-v6-character-sheet.png",
    "templates/assets/pipeline-v6-scene-01-locked.png",
    "templates/assets/asset-manifest.json",
    "templates/assets/v6-assets/hezarfen-neutral.png",
    "templates/assets/v6-assets/hezarfen-step.png",
    "templates/assets/v6-assets/hezarfen-launch.png",
    "templates/assets/v6-assets/wing-folded.png",
    "templates/assets/v6-assets/wing-open.png",
    "templates/assets/v6-backgrounds/roof-workshop.png",
    "templates/assets/v6-backgrounds/roof-edge.png",
    "templates/assets/v6-backgrounds/istanbul-aerial.png",
    "templates/assets/v6-backgrounds/uskudar-square.png",
    "templates/remotion/hezarfen-v6.tsx",
]

missing = []
for rel in REQUIRED:
    p = ROOT / rel
    if not p.is_file() or p.stat().st_size == 0:
        missing.append(rel)
    else:
        print(f"OK  {rel}  ({p.stat().st_size:,} bytes)")

if missing:
    print("\nMissing or empty files:", file=sys.stderr)
    for rel in missing:
        print(f"- {rel}", file=sys.stderr)
    sys.exit(1)

print(f"\nAsset pack OK: {len(REQUIRED)} required files present.")
