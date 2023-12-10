import { ReactElement } from 'react';
import { Platform, Pressable as RNPressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { useTheme, useThemedStyles } from '~utils/ThemeContext';

interface IProps {
  onPress?: () => void;
  disabled?: boolean;
  children: ReactElement | ReactElement[];
  style?: StyleProp<ViewStyle>;
  rippleConfig?: {
    rippleStyle?: 'light' | 'dark' | 'none';
    foreground?: boolean;
    radius?: number;
  };
}

export const Pressable = (props: IProps) => {
  const { onPress, children, disabled, style, rippleConfig } = props;
  const styles = useThemedStyles(themedStyles);
  const theme = useTheme();

  const isDisabled = disabled;

  const rippleStyle = rippleConfig?.rippleStyle || 'dark';

  return (
    <RNPressable
      hitSlop={20}
      disabled={isDisabled}
      android_ripple={
        rippleStyle !== 'none'
          ? {
              color: rippleStyle === 'dark' ? theme.colors.surfaceExtraDim : theme.colors.onSurfaceExtraDim,
              borderless: true,
              foreground: rippleConfig?.foreground,
              radius: rippleConfig?.radius,
            }
          : undefined
      }
      style={({ pressed }) => [
        disabled && styles.textDisabled,
        pressed && Platform.OS === 'ios' ? { ...styles.textDisabled } : {},
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
    textDisabled: {
      opacity: 0.5,
    },
  });
};
