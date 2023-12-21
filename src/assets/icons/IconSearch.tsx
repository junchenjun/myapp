import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const IconSearch = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox='0 0 24 24' fill='none' {...props}>
    <Path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z'
    />
  </Svg>
);
