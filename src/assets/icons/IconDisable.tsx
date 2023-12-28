import * as React from 'react';
import Svg, { SvgProps, Circle, Path } from 'react-native-svg';

export const IconDisable = (props: SvgProps) => (
  <Svg width={24} height={24} fill='none' viewBox='0 0 24 24' {...props}>
    <Circle cx={12} cy={12} r={9} strokeWidth={props.strokeWidth || 1.5} />
    <Path strokeWidth={props.strokeWidth || 1.5} d='M18 18 6 6' />
  </Svg>
);
