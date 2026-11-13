# Remotion Puppet Pattern

Use a 1080×1920, 30 fps composition for a 35–45 second vertical short. Build the scene from independent layers:

1. Background plate: `<Img>` with controlled scale/pan.
2. Character pose: transparent PNG selected by pose state.
3. Hero wing: transparent prop or an integrated launch pose, anchored to the shoulder/harness root.
4. Secondary continuity: wind ribbon, gauge, dust, paper, or canvas.
5. Foreground occluder: roof edge, table, or parapet.
6. Camera treatment: scene-level transform, not random object teleportation.

Use `useCurrentFrame`, `interpolate`, and easing for keyframes. Use pose swaps at action beats and tween x/y/rotation/scale between them. A typical 40-second structure is 15–21 sequences averaging 1.5–2.6 seconds: hook, prop insert, medium setup, reaction, diagram, failure, rebuild, harness check, launch, wide glide, landing/tag.

Do not concatenate still images and call it animation. A valid render must contain moving character transforms, camera movement, prop state changes, or parallax within shots. Verify by extracting frames at the start, middle, and end of each major beat.

For an external narration file, keep the MP4 silent and write the `.srt` separately. If a captioned preview is needed, create a second export with short beat captions rather than burning the full narration sentences.
