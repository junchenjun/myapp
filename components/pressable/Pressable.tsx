import { MouseEvent, ReactElement, ReactNode } from 'react';
import {
  GestureResponderEvent,
  Platform,
  Pressable as RNPressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { ITheme, useTheme } from '~utils/ThemeContext';

interface IProps {
  onPress?: (e: MouseEvent<HTMLAnchorElement> | GestureResponderEvent) => void;
  disabled?: boolean;
  children?: ReactElement | (ReactElement | undefined)[] | ReactNode;
  style?: StyleProp<ViewStyle>;
  rippleConfig?: {
    foreground?: boolean;
    radius?: number;
    borderless?: boolean;
    disabled?: boolean;
    color?: keyof ITheme['colors'];
  };
  hitSlop?: number;
}

export const Pressable = (props: IProps) => {
  const { onPress, children, disabled, style, rippleConfig, hitSlop } = props;
  const theme = useTheme();

  const isDisabled = disabled;

  const rippleDisabled = rippleConfig?.disabled;

  return (
    <RNPressable
      hitSlop={hitSlop ?? 20}
      disabled={isDisabled}
      android_ripple={
        !rippleDisabled
          ? {
              color: rippleConfig?.color ? theme.colors[rippleConfig.color] : theme.colors.ripple,
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

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.4,
  },
});
