import { StyleProp, ViewStyle } from 'react-native';

import { IIcon, icons } from '~assets/icons';
import { Pressable } from '~components/atoms/pressable/Pressable';
import { IThemeColorKeys, useTheme } from '~theme/ThemeContext';

export type IIconProps = {
  icon?: IIcon;
  size?: number;
  colorKey?: IThemeColorKeys;
  fill?: 'none' | IThemeColorKeys;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  strokeWidth?: 1.5 | 2;
};

export const Icon = ({
  icon = icons.Zap,
  size = 24,
  colorKey,
  fill = 'none',
  onPress,
  style,
  strokeWidth,
}: IIconProps) => {
  const theme = useTheme();

  const IconComponent = icon;

  const content = (
    <IconComponent
      width={size}
      height={size}
      stroke={colorKey ? theme.colors?.[colorKey] : theme.colors.onSurfaceDim}
      strokeWidth={strokeWidth}
      color={colorKey ? theme.colors?.[colorKey] : theme.colors.onSurfaceDim}
      fill={fill !== 'none' ? theme.colors?.[fill] : 'none'}
    />
  );

  return (
    <Pressable style={[{ width: size }, style]} onPress={onPress}>
      {content}
    </Pressable>
  );
};
