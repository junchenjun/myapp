import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const IconAdd = (props: SvgProps) => (
  <Svg fill="red" viewBox="0 0 24 24" {...props}>
    <Path
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4v8m0 8v-8m-8 0h8m0 0h8"
    />
  </Svg>
);
export default IconAdd;
