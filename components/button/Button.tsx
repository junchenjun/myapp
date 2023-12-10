import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Icon } from '~components/icon/Icon';
import { Text } from '~components/text/Text';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

interface ICommonButtonProps {
  onPress?: () => void;
  title?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.FC<SvgProps>;
}

interface IPrimaryButton extends ICommonButtonProps {
  type?: 'primary';
}

interface IIconButton extends ICommonButtonProps {
  type?: 'icon';
}

type IButton = IPrimaryButton | IIconButton;

export const Button = (props: IButton) => {
  const { onPress, title, type = 'primary', disabled, loading, icon } = props;
  const styles = useThemedStyles(themedStyles);
  const isDisabled = disabled || loading;

  const disabledStyle = styles.lowOpacity;

  if (type === 'primary') {
    return (
      <View style={[styles.container]}>
        <Pressable
          disabled={isDisabled}
          android_ripple={{
            color: '#7BACFF',
            borderless: false,
          }}
          style={({ pressed }) => [
            styles.button,
            styles[type],
            isDisabled && disabledStyle,
            pressed && Platform.OS === 'ios' ? { ...disabledStyle } : {},
          ]}
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
      overflow: 'hidden',
      backgroundColor: theme.colors.surfaceExtraBright,
      alignSelf: 'center',
    },
    button: {
      overflow: 'hidden',
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
