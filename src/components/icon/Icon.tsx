import { IIcon, icons } from '~assets/icons';
import { Pressable } from '~components/pressable/Pressable';
import { IThemeColorKeys, useTheme } from '~theme/ThemeContext';

export type IIconProps = {
  icon?: IIcon;
  size?: number;
  colorKey?: IThemeColorKeys;
  fill?: 'none' | IThemeColorKeys;
  onPress?: () => void;
  rippleColor?: Extract<IThemeColorKeys, 'rippleDim' | 'ripple'>;
};

export const Icon = ({ icon = icons.Zap, size = 24, colorKey, fill = 'none', onPress, rippleColor }: IIconProps) => {
  const theme = useTheme();

  const IconComponent = icon;

  const content = (
    <IconComponent
      width={size}
      height={size}
      stroke={colorKey ? theme.colors?.[colorKey] : theme.colors.onSurfaceDim}
      color={colorKey ? theme.colors?.[colorKey] : theme.colors.onSurfaceDim}
      fill={fill !== 'none' ? theme.colors?.[fill] : 'none'}
    />
  );

  return onPress ? (
    <Pressable style={{ width: size }} rippleConfig={{ radius: size, colorKey: rippleColor }} onPress={onPress}>
      {content}
    </Pressable>
  ) : (
    content
  );
};
