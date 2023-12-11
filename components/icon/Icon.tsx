import { icons } from '~assets/icons';
import { IColorKeys, useTheme } from '~utils/ThemeContext';

export type IIconType = (typeof icons)[keyof typeof icons];

export const Icon = ({
  icon,
  size = 24,
  color,
  fill = 'none',
}: {
  icon: IIconType;
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
