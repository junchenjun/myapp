import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
const IconEdit = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 6 4 16v4h4l10-10m-4-4 3-3 4 4-3 3m-4-4 4 4"
    />
  </Svg>
);
export default IconEdit;
