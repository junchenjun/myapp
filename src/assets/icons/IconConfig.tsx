import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const IconConfig = (props: SvgProps) => (
  <Svg width={24} height={24} fill='none' viewBox='0 0 24 24' {...props}>
    <Path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={props.strokeWidth || 1.5}
      d='M3 8h12m0 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0Zm-6 8h12M9 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
    />
  </Svg>
);
