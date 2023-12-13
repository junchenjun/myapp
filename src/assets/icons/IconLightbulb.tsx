import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const IconLightbulb = (props: SvgProps) => (
  <Svg width={24} height={24} fill='none' {...props}>
    <Path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M9.5 22h5m.5-6.674a7 7 0 1 0-6 0V16c0 .932 0 1.398.152 1.765a2 2 0 0 0 1.083 1.083C10.602 19 11.068 19 12 19c.932 0 1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083C15 17.398 15 16.932 15 16v-.674Z'
    />
  </Svg>
);
