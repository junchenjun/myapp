import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const IconRuler = (props: SvgProps) => (
  <Svg viewBox='0 0 24 24' width={24} height={24} fill='none' {...props}>
    <Path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M14.5 5.5 16 7m-4.5 1.5L13 10m-4.5 1.5L10 13m-4.5 1.5L7 16m-4.434 1.566 3.868 3.868c.198.198.297.297.411.334a.5.5 0 0 0 .31 0c.114-.037.213-.136.41-.334l13.87-13.868c.197-.198.296-.297.333-.411a.499.499 0 0 0 0-.31c-.037-.114-.136-.213-.334-.41l-3.868-3.87c-.198-.197-.297-.296-.412-.333a.5.5 0 0 0-.309 0c-.114.037-.213.136-.41.334L2.564 16.434c-.197.198-.296.297-.333.412a.5.5 0 0 0 0 .309c.037.114.136.213.334.41Z'
    />
  </Svg>
);
