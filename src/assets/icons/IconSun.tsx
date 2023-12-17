import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const IconSun = (props: SvgProps) => (
  <Svg width={24} height={24} fill='none' {...props}>
    <Path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z'
    />
  </Svg>
);
