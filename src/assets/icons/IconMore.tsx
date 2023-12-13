import * as React from 'react';
import Svg, { SvgProps, Circle } from 'react-native-svg';

export const IconMore = (props: SvgProps) => (
  <Svg width={24} height={24} fill='none' {...props}>
    <Circle cx={12} cy={12} r={1} />
    <Circle cx={6} cy={12} r={1} />
    <Circle cx={18} cy={12} r={1} />
  </Svg>
);
