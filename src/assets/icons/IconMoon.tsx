import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const IconMoon = (props: SvgProps) => (
  <Svg width={24} height={24} fill='none' {...props}>
    <Path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M21.955 12.957a8 8 0 1 1-10.91-10.911C5.97 2.525 2 6.8 2 12c0 5.523 4.477 10 10 10 5.2 0 9.473-3.97 9.955-9.043Z'
    />
  </Svg>
);
