import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {HezarfenV6, DURATION_FRAMES, FPS, HEIGHT, WIDTH} from './v6';

const Root: React.FC = () => (
  <Composition
    id="HezarfenV6"
    component={HezarfenV6}
    durationInFrames={DURATION_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);

registerRoot(Root);
