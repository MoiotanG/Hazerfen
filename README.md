# Hezarfen Puppet Animation Skill

Reusable asset pack and production guide for short-form historical explainers with a locked Hezarfen character, hand-painted low-poly Istanbul backgrounds, mechanically attached folding wings, and real keyframed 2D puppet animation.

## Use with another AI

Give the AI this repository URL and tell it to read `SKILL.md` first. Use `templates/assets/pipeline-v6-character-sheet.png` as the character identity reference, `templates/assets/pipeline-v6-scene-01-locked.png` as the approved visual style reference, and `templates/assets/asset-manifest.json` to locate the other assets.

Run `python3 scripts/check_assets.py` to validate the pack. Run `python3 scripts/prepare_remotion_assets.py /path/to/remotion-project` to copy the assets into `public/v6`.
