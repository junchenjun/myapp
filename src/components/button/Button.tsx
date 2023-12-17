import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { IIcon } from '~assets/icons';
import { Icon } from '~components/icon/Icon';
import { Pressable } from '~components/pressable/Pressable';
import { Text } from '~components/text/Text';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

interface ICommonButtonProps {
  onPress?: () => void;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: IIcon;
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

  if (variant === 'primary') {
    return (
      <View style={[styles.container, elevated && styles.elevated]}>
        <Pressable
          iosScaleDownAnimation
          disabled={isDisabled}
          rippleConfig={{
            borderless: false,
          }}
          style={[styles.button, styles[variant]]}
          onPress={onPress}
        >
          {icon && <Icon icon={icon} color='onPrimary' />}
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
      elevation: 4,
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
