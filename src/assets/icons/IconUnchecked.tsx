import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const IconUnchecked = (props: SvgProps) => (
  <Svg viewBox='0 0 24 24' {...props} fill='none'>
    <Path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z'
    />
  </Svg>
);
