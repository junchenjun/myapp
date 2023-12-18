import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const IconPlus = (props: SvgProps) => (
  <Svg width={24} height={24} fill='none' {...props}>
    <Path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M12 5v14m-7-7h14' />
  </Svg>
);
