import { ReactElement } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Pressable } from '~components/pressable/Pressable';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

interface IProps {
  onPress?: () => void;
  children?: ReactElement | ReactElement[];
  style?: StyleProp<ViewStyle>;
}

export const Card = (props: IProps) => {
  const { onPress, children, style } = props;
  const styles = useThemedStyles(themedStyles);

  if (onPress) {
    return (
      <View style={[styles.container, style && style]}>
        <Pressable onPress={onPress} style={styles.padding}>
          <View style={[styles.flex, style && style]}>{children}</View>
        </Pressable>
      </View>
    );
  } else {
    return <View style={[styles.container, styles.padding, style && style]}>{children}</View>;
  }
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface100,
      borderColor: theme.colors.surface200,
      borderRadius: theme.border.borderRadius,
      borderWidth: 1,
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
    padding: {
      padding: 15,
    },
    flex: {
      display: 'flex',
      flexDirection: 'column',
    },
  });
};
