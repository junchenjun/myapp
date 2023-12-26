import * as React from 'react';
import Svg, { SvgProps, Path, G } from 'react-native-svg';

export const IconSettings = (props: SvgProps) => (
  <Svg width={props.width} height={props.width} viewBox='0 0 24 24' {...props} fill={props.color}>
    <G>
      <Path
        fill={props.color}
        d='M12 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM19 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM19 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z'
      />
      <Path
        fill={props.color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={props.strokeWidth || 1.5}
        d='M12 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM19 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM19 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z'
      />
    </G>
  </Svg>
);
