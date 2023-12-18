import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const IconExpandUp = (props: SvgProps) => (
  <Svg width={24} height={24} fill='none' viewBox='0 0 24 24' {...props}>
    <Path strokeLinecap='round' strokeWidth={1.5} d='m18 15-6-6-6 6' />
  </Svg>
);
