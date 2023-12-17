import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const IconChecked = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox='0 0 24 24' {...props} stroke='none'>
    <Path
      fillRule='evenodd'
      d='M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1Zm5.207 8.707a1 1 0 0 0-1.414-1.414L10.5 13.586l-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l6-6Z'
      clipRule='evenodd'
    />
  </Svg>
);
