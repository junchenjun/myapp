import { SvgProps } from 'react-native-svg';

import { IColorKeys, useTheme } from '~utils/ThemeContext';

export const Icon = ({
  icon,
  size = 24,
  color,
  fill = 'none',
}: {
  icon: React.FC<SvgProps>;
  size?: number;
  color?: IColorKeys;
  fill?: 'none' | IColorKeys;
}) => {
  const theme = useTheme();

  const Component = icon;
  return (
    <Component
      width={size}
      height={size}
      stroke={color ? theme.colors?.[color] : theme.colors.onSurfaceDim}
      fill={fill !== 'none' ? theme.colors?.[fill] : 'none'}
    />
  );
};
