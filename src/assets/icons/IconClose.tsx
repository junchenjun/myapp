import Svg, { SvgProps, Path } from 'react-native-svg';

export const IconClose = (props?: SvgProps): React.ReactNode => (
  <Svg viewBox='0 0 24 24' fill='none' {...props}>
    <Path stroke={props?.stroke} strokeLinecap='round' strokeLinejoin='round' d='m5 19 7-7M5 5l7 7m7 7-7-7m0 0 7-7' />
  </Svg>
);
