import { ReactElement } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { Text } from '~components/text/Text';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

interface IProps {
  onPress?: () => void;
  title?: string;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  leftComponent?: ReactElement;
  rightComponent?: ReactElement;
}

export const Button = (props: IProps) => {
  const { onPress, title, type = 'primary', disabled, leftComponent, rightComponent, loading } = props;
  const styles = useThemedStyles(themedStyles);
  const isDisabled = disabled || loading;

  if (type === 'primary' || type === 'secondary') {
    return (
      <View style={[styles.container, isDisabled && styles.disabled]}>
        <Pressable
          disabled={isDisabled}
          android_ripple={{
            color: styles.button.color,
            borderless: false,
          }}
          style={({ pressed }) => [
            styles.button,
            styles[type],
            pressed && Platform.OS === 'ios' ? { ...styles.disabled } : {},
          ]}
          onPress={onPress}
        >
          {leftComponent || <View />}
          <Text text={title} size='body1' weight='regular' color={type === 'primary' ? 'textOnPrimary' : 'primary'} />
          {rightComponent || <View />}
        </Pressable>
      </View>
    );
  }
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      borderRadius: theme.border.borderRadius,
      overflow: 'hidden',
      width: '100%',
      maxWidth: 400,
      backgroundColor: theme.colors.surface100,
    },
    button: {
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      height: 55,
      borderRadius: theme.border.borderRadius,
      width: '100%',
      color: theme.colors.ripple,
      flexDirection: 'row',
      gap: 6,
      alignContent: 'center',
    },
    primary: {
      backgroundColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: 'transparent',
      borderColor: theme.colors.primary,
      borderWidth: 1,
    },
    disabled: {
      opacity: 0.6,
    },
  });
};
