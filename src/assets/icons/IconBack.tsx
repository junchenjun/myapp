import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const IconBack = (props: SvgProps) => (
  <Svg width={24} height={24} fill='none' viewBox='0 0 24 24' {...props}>
    <Path strokeLinecap='round' strokeWidth={1.5} d='m9 15-5-5m0 0 5-5m-5 5h10a6 6 0 0 1 6 6v2' />
  </Svg>
);
