import { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { EdgeInsets } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';

import { Icon } from '~components/icon/Icon';
import { Pressable } from '~components/pressable/Pressable';
import { Text } from '~components/text/Text';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

interface IHeader {
  type: 'default';
  title?: string;
}

interface IHeaderWithActions {
  type: 'actionHeader';
  title?: string;
  left?: {
    icon?: React.FC<SvgProps>;
    component?: ReactElement;
    onPress?: () => void;
  };
  right?: {
    icon?: React.FC<SvgProps>;
    component?: ReactElement;
    onPress?: () => void;
  };
  showTitle?: boolean;
}

type IPageHeader = IHeader | IHeaderWithActions;

export const PageHeader = (props: IPageHeader) => {
  const { title, type } = props;
  const styles = useThemedStyles(themedStyles);
  const opacity = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  if (type === 'actionHeader') {
    const { left, right, showTitle = true } = props;

    opacity.value = withTiming(showTitle ? 1 : 0, { duration: 200 });

    const iconSize = 26;

    const componentLeft = left?.icon ? (
      <Pressable onPress={left.onPress} style={{ width: iconSize }} rippleConfig={{ rippleStyle: 'light', radius: 24 }}>
        <Icon icon={left.icon} color='onSurface' size={iconSize} />
      </Pressable>
    ) : (
      left?.component
    );
    const componentRight = right?.icon ? (
      <Pressable
        onPress={right.onPress}
        style={{ width: iconSize }}
        rippleConfig={{ rippleStyle: 'light', radius: iconSize }}
      >
        <Icon icon={right.icon} color='onSurface' size={iconSize} />
      </Pressable>
    ) : (
      right?.component
    );

    return (
      <View style={styles.container}>
        <View style={styles.left}>{left?.icon || left?.component ? componentLeft : null}</View>
        {title && <Text text={title} animatedStyles={animatedStyles} color='onSurfaceDim' />}
        <View style={styles.right}>{right?.icon || right?.component ? componentRight : null}</View>
      </View>
    );
  } else if (type === 'default') {
    return (
      <View style={[styles.container, styles.short]}>
        {title && (
          <Text type='h3Regular' color='onSurface'>
            {title}
          </Text>
        )}
      </View>
    );
  }
};

const themedStyles = (theme: ITheme, insets: EdgeInsets) => {
  const paddingTop = insets.top < 50 ? 50 : insets.top;
  return StyleSheet.create({
    container: {
      padding: theme.spacing[4],
      paddingBottom: theme.spacing[3],
      paddingTop,
      alignItems: 'flex-end',
      flexDirection: 'row',
      gap: theme.spacing[1],
      overflow: 'hidden',
      position: 'relative',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.surfaceExtraDim,
    },
    short: {
      paddingBottom: theme.spacing[1],
    },
    left: {
      width: 60,
      flex: 1,
    },
    right: {
      width: 60,
      flex: 1,
      alignItems: 'flex-end',
    },
  });
};
