import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const IconSwitch = (props: SvgProps) => (
  <Svg width={24} height={24} fill='none' viewBox='0 0 24 24' {...props}>
    <Path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M4 17h16m0 0-4-4m4 4-4 4m4-14H4m0 0 4-4M4 7l4 4'
    />
  </Svg>
);
