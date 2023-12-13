import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';

export const IconLightning = (props: SvgProps) => (
  <Svg width={props.width} height={props.width} viewBox='0 0 24 24' strokeMiterlimit={2} {...props}>
    <G>
      <Path
        d='M12.9999 2L4.09332 12.6879C3.74451 13.1064 3.57011 13.3157 3.56744 13.4925C3.56512 13.6461 3.63359 13.7923 3.75312 13.8889C3.89061 14 4.16304 14 4.7079 14H11.9999L10.9999 22L19.9064 11.3121C20.2552 10.8936 20.4296 10.6843 20.4323 10.5075C20.4346 10.3539 20.3661 10.2077 20.2466 10.1111C20.1091 10 19.8367 10 19.2918 10H11.9999L12.9999 2Z'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </G>
  </Svg>
);
