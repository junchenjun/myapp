import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const IconMore = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M6 12.01V12m6 .01V12m6 .01V12"
    />
  </Svg>
);
export default IconMore;
