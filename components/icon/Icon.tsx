import { IIcon } from '~assets/icons';
import { Pressable } from '~components/pressable/Pressable';
import { IColorKeys, useTheme } from '~utils/ThemeContext';

export const Icon = ({
  icon,
  size = 24,
  color,
  fill = 'none',
  onPress,
  rippleColor,
}: {
  icon: IIcon;
  size?: number;
  color?: IColorKeys;
  fill?: 'none' | IColorKeys;
  onPress?: () => void;
  rippleColor?: IColorKeys;
}) => {
  const theme = useTheme();

  const IconComponent = icon;

  const content = (
    <IconComponent
      width={size}
      height={size}
      stroke={color ? theme.colors?.[color] : theme.colors.onSurfaceDim}
      color={color ? theme.colors?.[color] : theme.colors.onSurfaceDim}
      fill={fill !== 'none' ? theme.colors?.[fill] : 'none'}
    />
  );

  return onPress ? (
    <Pressable
      style={{ width: size }}
      rippleConfig={{ radius: size, foreground: true, color: rippleColor }}
      onPress={onPress}
    >
      {content}
    </Pressable>
  ) : (
    content
  );
};
