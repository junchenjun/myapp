import React, { ReactElement } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { Text } from '~components/text/Text';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

interface ICommonButtonProps {
  onPress?: () => void;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactElement;
  elevated?: boolean;
}

interface IPrimaryButton extends ICommonButtonProps {
  variant?: 'primary';
}

interface IIconButton extends ICommonButtonProps {
  variant?: 'icon';
}

type IButton = IPrimaryButton | IIconButton;

export const Button = (props: IButton) => {
  const { onPress, title, variant = 'primary', disabled, loading, icon, elevated } = props;
  const styles = useThemedStyles(themedStyles);
  const isDisabled = disabled || loading;

  const disabledStyle = styles.lowOpacity;

  if (variant === 'primary') {
    return (
      <View style={[styles.container, elevated && styles.elevated]}>
        <Pressable
          disabled={isDisabled}
          android_ripple={{
            color: '#7BACFF',
            borderless: false,
          }}
          style={({ pressed }) => [
            styles.button,
            styles[variant],
            isDisabled && disabledStyle,
            pressed && Platform.OS === 'ios' ? { ...disabledStyle } : {},
          ]}
          onPress={onPress}
        >
          {icon}
          <Text text={title} color='onPrimary' />
        </Pressable>
      </View>
    );
  }
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      borderRadius: theme.radius.round,
      backgroundColor: theme.colors.surfaceExtraBright,
      alignSelf: 'center',
      overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    elevated: {
      elevation: 2,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 58,
      borderRadius: theme.radius.round,
      flexDirection: 'row',
      gap: theme.spacing[1],
      alignContent: 'center',
    },
    primary: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: theme.spacing[6],
    },
    lowOpacity: {
      opacity: 0.5,
    },
  });
};
