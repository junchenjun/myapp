import { ReactElement } from 'react';
import { Platform, Pressable as RNPressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { ITheme, useThemedStyles } from '~utils/ThemeContext';

interface IProps {
  onPress?: () => void;
  disabled?: boolean;
  children: ReactElement | ReactElement[];
  style?: StyleProp<ViewStyle>;
}

export const Pressable = (props: IProps) => {
  const { onPress, children, disabled, style } = props;
  const styles = useThemedStyles(themedStyles);
  const isDisabled = disabled;

  return (
    <RNPressable
      hitSlop={20}
      disabled={isDisabled}
      android_ripple={{
        color: styles.button.color,
        borderless: true,
      }}
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

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    button: {
      color: theme.colors.primary,
    },
    textDisabled: {
      opacity: 0.5,
    },
  });
};
