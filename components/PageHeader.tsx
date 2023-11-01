import { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

import { IconGoBack } from '~assets/icons';
import { Pressable } from '~components/pressable/Pressable';
import { Text } from '~components/text/Text';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

type IIconType = 'goBack';

interface IPageHeader {
  title?: string;
  rightIcon?: IIconType;
  leftIcon?: IIconType;
  leftComponent?: ReactElement;
  rightComponent?: ReactElement;
  titleAlign?: 'center' | 'left';
  onPress?: () => void;
}

export const PageHeader = (props: IPageHeader) => {
  const { title, rightIcon, leftIcon, onPress, leftComponent, rightComponent, titleAlign = 'center' } = props;
  const styles = useThemedStyles(themedStyles);

  const iconSize = {
    width: 30,
    height: 30,
  };
  const iconColor = styles.icon.color;

  const icons = {
    goBack: <IconGoBack {...iconSize} stroke={iconColor} />,
  };

  const componentLeft = leftIcon ? <Pressable onPress={onPress}>{icons[leftIcon]}</Pressable> : leftComponent;
  const componentRight = rightIcon ? <Pressable onPress={onPress}>{icons[rightIcon]}</Pressable> : rightComponent;
  const componentPlaceholder = !(rightIcon && leftIcon) ? <View style={styles.empty} /> : null;

  return (
    <View style={[styles.container, titleAlign === 'left' && styles.left]}>
      {leftIcon || leftComponent ? componentLeft : componentPlaceholder}
      {title && (
        <View style={styles.title}>
          <Text size='heading3'>{title}</Text>
        </View>
      )}
      {rightIcon || rightComponent ? componentRight : componentPlaceholder}
    </View>
  );
};

const themedStyles = (theme: ITheme, insets: EdgeInsets) => {
  const paddingTop = insets.top < 40 ? 40 : insets.top;
  const height = paddingTop + 50;
  return StyleSheet.create({
    container: {
      padding: 20,
      paddingBottom: 18,
      paddingTop,
      alignItems: 'center',
      flexDirection: 'row',
      gap: 10,
      height,
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: theme.colors.transparentHeader,
      justifyContent: 'space-between',
    },
    title: {
      flex: 1,
    },
    left: {
      justifyContent: 'flex-start',
    },
    icon: {
      color: theme.colors.text300,
    },
    empty: {
      height: 30,
      width: 30,
    },
  });
};
