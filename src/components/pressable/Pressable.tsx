import { MouseEvent, ReactElement, ReactNode, useCallback } from 'react';
import { GestureResponderEvent, Platform, Pressable as RNPressable, StyleProp, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { ITheme, useTheme } from '~theme/ThemeContext';

interface IProps {
  onPress?: (e: MouseEvent<HTMLAnchorElement> | GestureResponderEvent) => void;
  disabled?: boolean;
  disabledOnPress?: boolean;
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
  tabBarButton?: boolean;
  iosScaleDownAnimation?: boolean;
}

export const Pressable = (props: IProps) => {
  const {
    onPress,
    children,
    disabled,
    style,
    rippleConfig,
    hitSlop,
    tabBarButton,
    disabledOnPress,
    iosScaleDownAnimation,
  } = props;
  const theme = useTheme();
  const onPressOpacity = useSharedValue(1);
  const onPressScale = useSharedValue(1);
  const scaleDownAnimation = (iosScaleDownAnimation && Platform.OS === 'ios') || tabBarButton;

  const rippleDisabled = rippleConfig?.disabled;
  const opacityValue = 0.35;

  if (disabled) {
    onPressOpacity.value = opacityValue;
  } else {
    onPressOpacity.value = 1;
  }

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
    scaleDownAnimation && (onPressScale.value = tabBarButton ? 0.91 : 0.99);
  }, [onPressOpacity, onPressScale, scaleDownAnimation, tabBarButton]);

  const onPressOut = useCallback(() => {
    !disabledOnPress && (onPressOpacity.value = 1);
    scaleDownAnimation && (onPressScale.value = 1);
  }, [disabledOnPress, onPressOpacity, onPressScale, scaleDownAnimation]);

  return (
    <Animated.View style={[onPressOpacityStyle, scaleDownAnimation && onPressScaleStyle, tabBarButton && { flex: 1 }]}>
      <RNPressable
        hitSlop={hitSlop ?? 20}
        disabled={disabled}
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
        style={[style, tabBarButton && { flex: 1 }]}
        onPressIn={Platform.OS === 'ios' || tabBarButton ? onPressIn : undefined}
        onPress={onPress}
        onPressOut={Platform.OS === 'ios' || tabBarButton ? onPressOut : undefined}
      >
        {children}
      </RNPressable>
    </Animated.View>
  );
};
