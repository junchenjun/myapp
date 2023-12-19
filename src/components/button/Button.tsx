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
  icon?: IIcon;
  elevated?: boolean;
}

interface IPrimaryButton extends ICommonButtonProps {
  variant: 'primary';
  loading?: boolean;
}

interface IIconButton extends ICommonButtonProps {
  variant: 'ghost';
}

export type IButtonProps = IPrimaryButton | IIconButton;

export const Button = (props: IButtonProps) => {
  const { onPress, title, variant, disabled, icon, elevated } = props;
  const styles = useThemedStyles(themedStyles(variant));

  if (variant === 'primary') {
    const { loading } = props;
    const isDisabled = disabled || loading;
    return (
      <View style={[styles.container, elevated && styles.elevated]}>
        <Pressable
          iosScaleDownAnimation
          disabled={isDisabled}
          rippleConfig={{
            borderless: false,
          }}
          style={styles.button}
          onPress={onPress}
        >
          {icon && <Icon icon={icon} colorKey='onPrimary' />}
          <Text text={title} variant='pLGRegular' colorKey='onPrimary' />
        </Pressable>
      </View>
    );
  } else if (variant === 'ghost') {
    return (
      <View style={[styles.container, elevated && styles.elevated]}>
        <Pressable
          iosScaleDownAnimation
          disabled={disabled}
          rippleConfig={{
            borderless: false,
          }}
          style={styles.button}
          onPress={onPress}
        >
          {icon && <Icon icon={icon} colorKey='primary' />}
          <Text text={title} colorKey='primary' variant='pLGRegular' />
        </Pressable>
      </View>
    );
  }
};

const themedStyles = (variant: IButtonProps['variant']) => {
  return (theme: ITheme) => {
    return StyleSheet.create({
      container: {
        borderRadius: theme.radius.round,
        backgroundColor: variant === 'primary' ? theme.colors.primary : undefined,
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
        backgroundColor: variant === 'primary' ? theme.colors.primary : undefined,
        paddingHorizontal: theme.spacing[6],
      },
      lowOpacity: {
        opacity: 0.5,
      },
    });
  };
};
