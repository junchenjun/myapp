import * as React from 'react';
import Svg, { SvgProps, Rect, Path } from 'react-native-svg';

export const IconCollections = (props: SvgProps) => (
  <Svg width={24} height={24} fill='none' viewBox='0 0 24 24' {...props}>
    <Rect width={18} height={8} x={3} y={4} strokeWidth={1.5} rx={2} />
    <Path strokeWidth={1.5} d='M16 18a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2M19 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2' />
  </Svg>
);
