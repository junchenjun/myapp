import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

export const IconAppearance = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox='0 0 24 24' fill='none' {...props}>
    <Circle cx={12} cy={12} r={8.75} />
    <Path fill={props.color} d='M16.243 7.757a6 6 0 1 0-8.486 8.486L12 12l4.243-4.243Z' />
  </Svg>
);
