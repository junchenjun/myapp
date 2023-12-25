import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Pressable } from '~components/atoms/pressable/Pressable';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export interface ICardProps {
  onPress?: () => void;
  children?: ReactNode | ReactNode[];
  style?: StyleProp<ViewStyle>;
}

export const Card = (props: ICardProps) => {
  const { onPress, children, style } = props;
  const styles = useThemedStyles(themedStyles);

  if (onPress) {
    return (
      <View style={[styles.pressableContainer, style && style]}>
        <Pressable
          onPress={onPress}
          rippleConfig={{ borderless: false }}
          style={styles.container}
          iosScaleDownAnimation
        >
          <View style={[styles.flex]}>{children}</View>
        </Pressable>
      </View>
    );
  } else {
    return <View style={[styles.container, style && style]}>{children}</View>;
  }
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    pressableContainer: {
      borderRadius: theme.radius.sm,
      overflow: 'hidden',
    },
    container: {
      backgroundColor: theme.colors.surfaceExtraBright,
      borderRadius: theme.radius.sm,
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      padding: theme.spacing[5],
      overflow: 'hidden',
    },
    flex: {
      display: 'flex',
      flexDirection: 'column',
    },
  });
};
