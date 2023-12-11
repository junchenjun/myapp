import { ReactElement } from 'react';
import { Platform, Pressable as RNPressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { useTheme, useThemedStyles } from '~utils/ThemeContext';

interface IProps {
  onPress?: () => void;
  disabled?: boolean;
  children?: ReactElement | (ReactElement | undefined)[];
  style?: StyleProp<ViewStyle>;
  rippleConfig?: {
    foreground?: boolean;
    radius?: number;
    borderless?: boolean;
    disabled?: boolean;
  };
}

export const Pressable = (props: IProps) => {
  const { onPress, children, disabled, style, rippleConfig } = props;
  const styles = useThemedStyles(themedStyles);
  const theme = useTheme();

  const isDisabled = disabled;

  const rippleDisabled = rippleConfig?.disabled;

  return (
    <RNPressable
      hitSlop={20}
      disabled={isDisabled}
      android_ripple={
        !rippleDisabled
          ? {
              color: theme.colors.rippleSurface,
              // default true
              borderless: rippleConfig?.borderless !== false,
              // default false
              foreground: rippleConfig?.foreground === true,
              radius: rippleConfig?.radius,
            }
          : undefined
      }
      style={({ pressed }) => [
        disabled && styles.disabled,
        pressed && Platform.OS === 'ios' ? { ...styles.disabled } : {},
        style && style,
      ]}
      onPress={onPress}
    >
      {children}
    </RNPressable>
  );
};

const themedStyles = () => {
  return StyleSheet.create({
    disabled: {
      opacity: 0.4,
    },
  });
};
