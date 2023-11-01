import { ReactElement } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { Text } from '~components/text/Text';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

interface IProps {
  onPress?: () => void;
  title?: string;
  type?: 'primary';
  disabled?: boolean;
  loading?: boolean;
  leftComponent?: ReactElement;
  rightComponent?: ReactElement;
}

export const Button = (props: IProps) => {
  const { onPress, title, type = 'primary', disabled, leftComponent, rightComponent, loading } = props;
  const styles = useThemedStyles(themedStyles);
  const isDisabled = disabled || loading;

  if (type === 'primary') {
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
            styles.primary,
            pressed && Platform.OS === 'ios' ? { ...styles.disabled } : {},
          ]}
          onPress={onPress}
        >
          <View style={[styles.view, isDisabled && styles.disabled]}>
            {leftComponent || <View />}
            <Text text={title} size='body1' weight='regular' color='primary' />
            {rightComponent || <View />}
          </View>
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
      backgroundColor: theme.colors.surface300,
      maxWidth: 400,
    },
    button: {
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      height: 55,
      borderRadius: theme.border.borderRadius,
      width: '100%',
      color: theme.colors.ripple,
    },
    view: {
      width: '100%',
      height: '100%',
      borderRadius: theme.border.borderRadius,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 6,
      alignContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    primary: {
      backgroundColor: theme.colors.surface300,
    },
    disabled: {
      opacity: 0.5,
    },
  });
};
