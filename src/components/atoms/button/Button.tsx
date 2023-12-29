import React, { useEffect } from 'react';
import { Keyboard, Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IIcon } from '~assets/icons';
import { Icon } from '~components/atoms/icon/Icon';
import { Pressable } from '~components/atoms/pressable/Pressable';
import { Text } from '~components/atoms/text/Text';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

interface ICommonButtonProps {
  onPress?: () => void;
  title?: string;
  disabled?: boolean;
  icon?: IIcon;
  style?: StyleProp<ViewStyle>;
  alignment?: 'left' | 'center' | 'right';
}

interface IPrimaryButton extends ICommonButtonProps {
  variant: 'primary';
  loading?: boolean;
  float?: boolean;
}

interface IGhostButton extends ICommonButtonProps {
  variant: 'ghost';
}

export type IButtonProps = IPrimaryButton | IGhostButton;

export const Button = (props: IButtonProps) => {
  const { onPress, title, variant, disabled, icon, style, alignment = 'center' } = props;

  const insets = useSafeAreaInsets();
  const floatBottomInset = insets.bottom + 25;
  const styles = useThemedStyles(themedStyles(variant, floatBottomInset));
  // ios float only
  const floatBottomKeyboardInset = 14;
  const bottom = useSharedValue(floatBottomInset);
  const floatAnimation = variant === 'primary' && props.float && Platform.OS === 'ios';

  useEffect(() => {
    if (floatAnimation) {
      const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
        bottom.value = floatBottomKeyboardInset;
      });
      const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
        bottom.value = floatBottomInset;
      });

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }
  }, [bottom, floatBottomInset, floatAnimation]);

  const floatAnimatedStyles = useAnimatedStyle(() => {
    return {
      bottom: withTiming(bottom.value, { duration: 300 }),
    };
  });

  if (variant === 'primary') {
    const { loading, float } = props;
    const isDisabled = disabled || loading;
    return (
      <Animated.View
        style={[
          styles.container,
          styles[alignment],
          float && styles.float,
          floatAnimation && floatAnimatedStyles,
          style,
        ]}
      >
        <Pressable disabled={isDisabled} style={styles.button} onPress={onPress}>
          {icon && <Icon strokeWidth={2} icon={icon} colorKey='onPrimary' />}
          <Text text={title} variant='pLGMedium' colorKey='onPrimary' />
        </Pressable>
      </Animated.View>
    );
  } else if (variant === 'ghost') {
    return (
      <View style={[styles.container, styles[alignment], style]}>
        <Pressable disabled={disabled} style={styles.button} onPress={onPress}>
          {icon && <Icon icon={icon} colorKey='primary' />}
          <Text text={title} colorKey='primary' variant='pLGRegular' />
        </Pressable>
      </View>
    );
  }
};

const themedStyles = (variant: IButtonProps['variant'], floatBottomInset: number) => {
  return (theme: ITheme) => {
    return StyleSheet.create({
      container: {
        borderRadius: theme.radius.round,
        backgroundColor: variant === 'primary' ? theme.colors.primaryBright : undefined,
        alignSelf: 'center',
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
      },
      float: {
        position: 'absolute',
        bottom: floatBottomInset,
        elevation: 5,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
        shadowColor: theme.id === 'light' ? theme.colors.onSurface : theme.colors.primary,
      },
      left: {
        left: theme.spacing[3],
      },
      center: {},
      right: {
        right: theme.spacing[3],
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 58,
        borderRadius: theme.radius.round,
        flexDirection: 'row',
        gap: theme.spacing[1],
        alignContent: 'center',
        paddingHorizontal: theme.spacing[6],
      },
    });
  };
};
