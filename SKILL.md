---
name: hezarfen-puppet-animation
description: Create short-form historical explainer videos with a locked Hezarfen character, hand-painted low-poly Istanbul backgrounds, and keyframed 2D puppet animation. Use for generating consistent character sheets, layered background plates, mechanically attached wing props, Remotion animations, shot plans, and English SRT narration in this visual language.
---

# Hezarfen Puppet Animation

Create original vertical historical shorts using a stable character/prop system and a 2D puppet over dimensional, hand-painted low-poly environments. Use this skill when the user wants the supplied Hezarfen look, RicksClips-like short-form grammar, or repeatable character/background generation.

## Non-negotiable visual identity

- Preserve the same Hezarfen: cream wrapped turban, curled moustache, pale oval face, teal vest, cream shirt, dark loose trousers, brown boots, and brown leather cross-body harness.
- Preserve the same hero prop: cream canvas folding wing with walnut ribs, muted red binding, visible wooden hinge brackets, and shoulder attachment points.
- Use a hybrid: outlined 2D puppet character plus a hand-painted low-poly/2.5D Istanbul set. Do not turn the result into flat SVG icons, photorealism, or a slideshow of unrelated stills.
- Give every set foreground material, an action plane, depth layers, skyline/water horizon, and motivated warm light.
- Keep the wing physically attached to the harness and torso. It must never float above the head, detach during motion, or change construction between shots.

## Asset pipeline

1. Load `templates/assets/pipeline-v6-character-sheet.png` as the identity reference for every character generation.
2. Load `templates/assets/pipeline-v6-scene-01-locked.png` for the approved color, lighting, camera, and material language.
3. Generate a clean character model sheet first. Include front, side, back, three-quarter, step, harness-check, and glide poses. Keep face, turban, costume, proportions, and wing attachment identical.
4. Generate transparent character pose assets only after the model sheet is approved. Use `templates/assets/v6-assets/` as the visual reference family.
5. Generate clean background plates with no character when puppet compositing is required. Use `templates/assets/v6-backgrounds/` as the set family.
6. Build motion in a real animation system such as Remotion or Blender: interpolate pose, position, rotation, scale, camera, foreground parallax, and prop states. Do not assemble a long video by placing still PNGs back-to-back with only a Ken Burns effect.
7. Keep caption text separate from the clean render. Produce an external English SRT; only burn captions when the user explicitly requests a captioned preview.

## Prompt construction

Write generation prompts in English. State the subject identity, composition, material, lighting, continuity constraints, and exclusions. For every new view, explicitly say `same locked Hezarfen character from the reference` and repeat the turban, moustache, teal vest, cream shirt, dark trousers, boots, and leather harness. For transparent assets, request a true transparent background and a complete silhouette.

Use these environment terms:

- tiled rooftop workshop, terracotta roof tiles, stone parapet, wooden workbench, rope coils, saw, hammer, paper, canvas, distant Galata Tower, minarets, layered rooftops, blue water horizon;
- side-follow rooftop edge for launch;
- wide Istanbul/Bosphorus aerial for consequence;
- warm golden-hour Üsküdar-inspired square for landing.

Always include exclusions: no modern objects, no watermark, no text, no extra characters unless explicitly requested, no floating props, no disconnected wing, no identity drift, no duplicate limbs, no melting architecture.

## Short-form shot grammar

Use 15–21 visual units for a 35–45 second short. The recommended causal order is:

`counter-intuitive hook → tactile prop proof → character reaction → measurement/reset → failed test → rebuild → harness check → launch → wide consequence → concise historical/legend tag`.

The first 0.8–2 seconds must show a physical hook: a wing hinge snaps, a ribbon points the wrong way, a canvas folds, or a boot leaves a roof tile. Alternate close prop inserts, readable medium character shots, reaction beats, technical top-down/POV beats, and wide geography. Motivate hard cuts with action, caption keyword, or SFX. Reserve the widest camera move for the flight payoff.

## Motion rules

- Animate the character with pose swaps and interpolated transforms; hold readable poses for 6–18 frames, then use 4–12 frame bounces/recoils.
- Use real contact: feet align with roof tiles, hands align with wing bars or harness buckles, and landing feet align with the square ground plane.
- Animate the wing from the shoulder/harness root. Use folded, half-open, open, flexing, and gliding states; preserve the same hinge geometry.
- Use foreground/midground/horizon layers with different camera rates for parallax. Do not shake during normal exposition; reserve shake for a failure or impact.
- Keep one hero prop continuous through at least four states: inert, assembly, test/mechanism, and consequence.
- Use a red wind ribbon and/or brass angle gauge as the secondary continuity prop; never teleport or redesign them between shots.

## Historical narration

Use cautious wording for the flight: `According to Evliya Çelebi` or `He was said to...`. Do not present the Galata-to-Üsküdar account as independently verified fact without a source note. Keep narration concise, energetic, and one causal sentence per 1.5–3 seconds. Generate a separate `.srt` with 30–45 seconds of timing.

## Quality gate before delivery

Reject and regenerate a shot if any of the following occurs: character identity changes, wing floats or detaches, tools move without an action, feet miss the ground, background loses depth, the shot is only a static still, two unintended copies of Hezarfen appear, captions cover the subject, or a cut breaks the causal action. Verify the final MP4 with ffprobe, extract representative frames, and inspect the first hook, prop close-up, failed test, launch, wide glide, and landing.

Read `references/style-bible.md` for the detailed palette and set bible, `references/prompt-pack.md` for reusable generation prompts, and `references/remotion-puppet-pattern.md` for the deterministic animation pattern. Use `templates/assets/` as approved visual references and `templates/remotion/` as the starter implementation.
