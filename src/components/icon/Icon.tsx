import { IIcon, icons } from '~assets/icons';
import { Pressable } from '~components/pressable/Pressable';
import { ITheme, useTheme } from '~theme/ThemeContext';

export const Icon = ({
  icon = icons.Zap,
  size = 24,
  color,
  fill = 'none',
  onPress,
  rippleColor,
}: {
  icon?: IIcon;
  size?: number;
  color?: keyof ITheme['colors'];
  fill?: 'none' | keyof ITheme['colors'];
  onPress?: () => void;
  rippleColor?: keyof Pick<ITheme['colors'], 'ripple' | 'rippleDim'>;
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
    <Pressable style={{ width: size }} rippleConfig={{ radius: size, color: rippleColor }} onPress={onPress}>
      {content}
    </Pressable>
  ) : (
    content
  );
};
