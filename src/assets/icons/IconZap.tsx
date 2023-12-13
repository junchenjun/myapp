import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const IconZap = (props: SvgProps) => (
  <Svg width={24} height={24} fill='none' {...props}>
    <Path d='M9 17.5H3.5m3-5.5H2m7-5.5H4M17 3l-6.596 9.235c-.292.409-.438.613-.432.784a.5.5 0 0 0 .194.377c.135.104.386.104.889.104H16L15 21l6.596-9.235c.292-.409.438-.613.432-.784a.5.5 0 0 0-.194-.377c-.135-.104-.386-.104-.889-.104H16L17 3Z' />
  </Svg>
);
