import { MouseEvent, ReactElement, ReactNode, useCallback } from 'react';
import { GestureResponderEvent, Platform, Pressable as RNPressable, StyleProp, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { IThemeColorKeys, useTheme } from '~theme/ThemeContext';

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
    colorKey?: Extract<IThemeColorKeys, 'rippleDim' | 'ripple'>;
  };
  hitSlop?: number;
  tabBarButton?: boolean;
  iosScaleDownAnimation?: boolean;
}

export const Pressable = (props: IProps) => {
  const { onPress, children, disabled, style, rippleConfig, hitSlop, tabBarButton, iosScaleDownAnimation } = props;
  const theme = useTheme();
  const onPressOpacity = useSharedValue(1);
  const onPressScale = useSharedValue(1);
  const scaleDownAnimation = (iosScaleDownAnimation && Platform.OS === 'ios') || tabBarButton;
  // const scaleDownAnimation = iosScaleDownAnimation || tabBarButton;

  const rippleDisabled = rippleConfig?.disabled;
  // const rippleDisabled = true;
  const opacityValue = 0.4;

  const onPressOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(onPressOpacity.value, { duration: 100 }),
    };
  });
  const onPressScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(onPressScale.value, { duration: 100 }) }],
  }));

  const onPressIn = useCallback(() => {
    onPressOpacity.value = opacityValue;
    scaleDownAnimation && (onPressScale.value = tabBarButton ? 0.91 : 0.98);
  }, [onPressOpacity, onPressScale, scaleDownAnimation, tabBarButton]);

  const onPressOut = useCallback(() => {
    onPressOpacity.value = 1;
    scaleDownAnimation && (onPressScale.value = 1);
  }, [onPressOpacity, onPressScale, scaleDownAnimation]);

  return onPress ? (
    <Animated.View style={[onPressOpacityStyle, scaleDownAnimation && onPressScaleStyle, tabBarButton && { flex: 1 }]}>
      <RNPressable
        hitSlop={hitSlop ?? 20}
        disabled={disabled}
        android_ripple={
          !rippleDisabled
            ? {
                color: rippleConfig?.colorKey ? theme.colors[rippleConfig.colorKey] : theme.colors.ripple,
                // default true
                borderless: rippleConfig?.borderless !== false,
                // default false
                foreground: rippleConfig?.foreground === true,
                radius: rippleConfig?.radius,
              }
            : undefined
        }
        style={[style, disabled && { opacity: opacityValue }, tabBarButton && { flex: 1 }]}
        onPressIn={Platform.OS === 'ios' || tabBarButton ? onPressIn : undefined}
        // onPressIn={onPressIn}
        onPress={onPress}
        onPressOut={Platform.OS === 'ios' || tabBarButton ? onPressOut : undefined}
        // onPressOut={onPressOut}
      >
        {children}
      </RNPressable>
    </Animated.View>
  ) : (
    <View style={[style, disabled && { opacity: opacityValue }]}>{children}</View>
  );
};
