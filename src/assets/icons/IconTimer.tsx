import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const IconTimer = (props: SvgProps) => (
  <Svg viewBox='0 0 24 24' width={24} height={24} fill='none' {...props}>
    <Path
      strokeWidth={props.strokeWidth || 1.5}
      d='M12 9.5v4l2.5 1.5M12 5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Zm0 0V2m-2 0h4m6.329 3.592-1.5-1.5.75.75m-15.908.75 1.5-1.5-.75.75'
    />
  </Svg>
);
