import { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { IIcon } from '~assets/icons';
import { Icon } from '~components/icon/Icon';
import { Text } from '~components/text/Text';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

interface IHeader {
  variant?: 'default';
  title?: string;
}

interface ITopBarHeader {
  variant?: 'topBarHeader';
  title?: string;
}

interface IHeaderWithActions {
  variant?: 'actionHeader';
  title?: string;
  left?: {
    icon?: IIcon;
    component?: ReactElement;
    onPress?: () => void;
  };
  right?: {
    icon?: IIcon;
    component?: ReactElement;
    onPress?: () => void;
  };
  showTitle?: boolean;
}

type IPageHeader = IHeader | IHeaderWithActions | ITopBarHeader;

export const PageHeader = (props: IPageHeader) => {
  const { title, variant } = props;
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(themedStyles(insets, variant));
  const opacity = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  if (variant === 'actionHeader') {
    const { left, right, showTitle = true } = props;

    opacity.value = withTiming(showTitle ? 1 : 0, { duration: 200 });

    const componentLeft = left?.icon ? (
      <Icon icon={left.icon} color='onSurface' onPress={left.onPress} rippleColor='rippleDim' />
    ) : (
      left?.component
    );
    const componentRight = right?.icon ? (
      <Icon icon={right.icon} onPress={right.onPress} color='onSurface' rippleColor='rippleDim' />
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
  } else if (variant === 'default' || variant === 'topBarHeader' || variant === undefined) {
    return (
      <View style={[styles.container, styles.default]}>
        {title && (
          <Text variant='h3Regular' color='onSurface'>
            {title}
          </Text>
        )}
      </View>
    );
  }
};

const themedStyles = (insets: EdgeInsets, variant: IPageHeader['variant']) => {
  return (theme: ITheme) => {
    const paddingTop = insets.top < 40 ? 40 : insets.top;
    return StyleSheet.create({
      container: {
        paddingLeft: variant !== 'topBarHeader' ? theme.spacing[4] : 0,
        paddingRight: variant !== 'topBarHeader' ? theme.spacing[4] : 0,
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
      default: {
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
};
