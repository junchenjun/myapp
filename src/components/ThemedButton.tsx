import { ReactElement } from 'react';
import { Platform, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { ThemedText } from '~components/ThemedText';
import { ITheme } from '~redux/themeSlice';
import { useThemedStyles } from '~utils/hooks/useThemedStyles';

interface IProps {
  onPress?: () => void;
  title?: string;
  type?: 'primary' | 'secondary' | 'text';
  style?: ViewStyle | ViewStyle[];
  float?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftComponent?: ReactElement;
  rightComponent?: ReactElement;
  component?: ReactElement;
}

export const ThemedButton = (props: IProps) => {
  const {
    onPress,
    title,
    type = 'primary',
    float,
    disabled,
    leftComponent,
    rightComponent,
    component,
    loading,
  } = props;
  const styles = useThemedStyles(themedStyles);
  const isDisabled = disabled || loading;
  const animated = loading !== undefined;

  const opacity = useSharedValue(isDisabled ? 0.5 : 1);

  if (isDisabled) {
    opacity.value = 0.5;
  } else {
    opacity.value = withTiming(1, {
      duration: 200,
    });
  }

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  if (component) {
    return (
      <Pressable
        hitSlop={20}
        disabled={isDisabled}
        android_ripple={{
          color: styles.button.color,
          borderless: true,
        }}
        style={({ pressed }) => [
          disabled && styles.textDisabled,
          pressed && Platform.OS === 'ios' ? { ...styles.textDisabled } : {},
        ]}
        onPress={onPress}
      >
        {component}
      </Pressable>
    );
  }

  if (type === 'text') {
    return (
      <Pressable
        hitSlop={20}
        disabled={isDisabled}
        android_ripple={{
          color: styles.button.color,
          borderless: true,
        }}
        style={({ pressed }) => [
          disabled && styles.textDisabled,
          pressed && Platform.OS === 'ios' ? { ...styles.textDisabled } : {},
        ]}
        onPress={onPress}
      >
        <ThemedText color='primary'>{title}</ThemedText>
      </Pressable>
    );
  } else {
    return (
      <View style={styles.container}>
        <Pressable
          disabled={isDisabled}
          android_ripple={{
            color: styles.button.color,
            borderless: false,
          }}
          style={({ pressed }) => [
            styles.button,
            float && styles.floatButton,
            styles[type],
            pressed && Platform.OS === 'ios' && !animated ? { ...styles.disabled } : {},
          ]}
          onPressIn={() => {
            if (Platform.OS === 'ios' && animated) {
              opacity.value = 0.5;
            }
          }}
          onPress={onPress}
        >
          <Animated.View style={[styles.view, isDisabled && styles.disabled, animatedStyles]}>
            {leftComponent || <View />}
            <ThemedText text={title} size='body1' weight='regular' color='primary' />
            {rightComponent || <View />}
          </Animated.View>
        </Pressable>
      </View>
    );
  }
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      borderRadius: theme.borders.borderRadius,
      overflow: 'hidden',
      width: '100%',
      backgroundColor: theme.color.surface300,
    },
    button: {
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      height: 55,
      borderRadius: theme.borders.borderRadius,
      width: '100%',
      color: theme.color.ripple,
    },
    floatButton: {
      backgroundColor: theme.color.surface200,
    },
    short: {
      height: 45,
    },
    medium: {
      height: 50,
    },
    tall: {
      height: 55,
    },
    view: {
      width: '100%',
      height: '100%',
      borderRadius: theme.borders.borderRadius,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 6,
      alignContent: 'center',
      borderWidth: 1,
      borderColor: theme.color.primary,
    },
    primary: {
      backgroundColor: theme.color.surface300,
    },
    secondary: {
      backgroundColor: theme.color.surface300,
    },
    disabled: {
      opacity: 0.5,
    },
    textDisabled: {
      opacity: 0.5,
    },
  });
};
