import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const IconExternal = (props: SvgProps) => (
  <Svg width={24} height={24} fill='none' viewBox='0 0 24 24' {...props}>
    <Path strokeWidth={1.5} d='M14 4h6m0 0v6m0-6-8 8' />
    <Path strokeLinecap='round' strokeWidth={1.5} d='M11 5H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4' />
  </Svg>
);
