import { ReactElement } from 'react';
import { Animated, StyleSheet, TextStyle, View } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { IIcon } from '~assets/icons';
import { Icon } from '~components/atoms/icon/Icon';
import { Text } from '~components/atoms/text/Text';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

interface IHeader {
  variant: 'tabHeader';
  title: string;
}

// @react-navigation/material-top-tabs
interface ITopBarHeader {
  variant: 'topBarHeader';
  title: string;
  // Animated from 'react-native';
  topBarHeaderAnimatedStyle: Animated.WithAnimatedObject<TextStyle>;
}

interface IHeaderWithActions {
  variant: 'actionHeader';
  title: string;
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
  const styles = useThemedStyles(themedStyles(insets));
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
      <Icon icon={left.icon} colorKey='onSurface' onPress={left.onPress} rippleColor='rippleDim' />
    ) : (
      left?.component
    );
    const componentRight = right?.icon ? (
      <Icon icon={right.icon} onPress={right.onPress} colorKey='onSurface' rippleColor='rippleDim' />
    ) : (
      right?.component
    );

    return (
      <View style={styles.container}>
        <View style={styles.left}>{left?.icon || left?.component ? componentLeft : null}</View>
        <Text variant='pLGRegular' text={title} animatedStyles={animatedStyles} colorKey='onSurfaceDim' />
        <View style={styles.right}>{right?.icon || right?.component ? componentRight : null}</View>
      </View>
    );
  } else if (variant === 'tabHeader') {
    return (
      <View style={[styles.container, styles.tabHeader]}>
        <Text variant='h3Regular' colorKey='onSurface'>
          {title}
        </Text>
      </View>
    );
  } else if (variant === 'topBarHeader') {
    return (
      <View style={[styles.container, styles.topBarHeader]}>
        <Animated.Text style={[styles.topBarHeaderLabel, props.topBarHeaderAnimatedStyle]}>{title}</Animated.Text>
      </View>
    );
  }
};

const themedStyles = (insets: EdgeInsets) => {
  return (theme: ITheme) => {
    const paddingTop = insets.top < 40 ? 40 : insets.top;
    return StyleSheet.create({
      container: {
        paddingLeft: theme.spacing[4],
        paddingRight: theme.spacing[4],
        paddingBottom: theme.spacing[2],
        paddingTop,
        alignItems: 'flex-end',
        flexDirection: 'row',
        gap: theme.spacing[1],
        position: 'relative',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.surfaceExtraDim,
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
      tabHeader: {
        paddingBottom: theme.spacing[1],
      },
      topBarHeader: {
        paddingBottom: theme.spacing[1],
        paddingLeft: 0,
        paddingRight: 0,
      },
      topBarHeaderLabel: {
        color: theme.colors.onSurface,
        ...theme.fonts.h3Regular,
      },
    });
  };
};
