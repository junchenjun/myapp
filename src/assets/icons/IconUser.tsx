import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const IconUser = (props: SvgProps) => (
  <Svg width={24} height={24} fill='none' {...props}>
    <Path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M12 15c-3.17 0-5.99 1.53-7.784 3.906-.386.511-.58.767-.573 1.112.005.267.172.604.382.769.272.213.649.213 1.402.213h13.146c.753 0 1.13 0 1.401-.213.21-.165.378-.502.383-.769.006-.345-.187-.6-.573-1.112C17.989 16.531 15.17 15 12 15ZM12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z'
    />
  </Svg>
);
