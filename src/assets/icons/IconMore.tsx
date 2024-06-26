import * as React from 'react';
import Svg, { SvgProps, Circle } from 'react-native-svg';

export const IconMore = (props: SvgProps) => (
  <Svg viewBox='0 0 24 24' width={24} height={24} {...props} fill={props.color}>
    <Circle cx={12} cy={12} r={1} />
    <Circle cx={6} cy={12} r={1} />
    <Circle cx={18} cy={12} r={1} />
  </Svg>
);
