import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const IconExpandUp = (props?: SvgProps) => (
  <Svg width={props?.width || '24'} height={props?.height || '24'} viewBox='0 0 24 25' fill='none'>
    <Path d='M18 15.5L12 9.5L6 15.5' stroke={props?.stroke} />
  </Svg>
);
