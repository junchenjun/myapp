import * as React from 'react';
import Svg, { SvgProps, Path, Circle } from 'react-native-svg';

export const IconRemove = (props: SvgProps) => (
  <Svg width={24} height={24} fill='none' viewBox='0 0 24 24' {...props}>
    <Circle cx={12} cy={12} r={9} stroke={props.color} strokeWidth={1.5} />
    <Path stroke={props.color} strokeWidth={1.5} d='M7.5 12h9' />
  </Svg>
);
