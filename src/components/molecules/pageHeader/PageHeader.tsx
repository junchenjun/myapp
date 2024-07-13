import { ReactElement } from 'react';
import { Animated, EnterKeyHintTypeOptions, StyleSheet, TextStyle, View, useWindowDimensions } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { IIcon } from '~assets/icons';
import { Icon } from '~components/atoms/icon/Icon';
import { Input } from '~components/atoms/input/Input';
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

export interface IActionPageHeader {
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
  searchBar?: {
    onChangeText?: (text: string) => void;
    placeholder?: string;
    value?: string;
    icon?: IIcon;
    enterKeyHint?: EnterKeyHintTypeOptions;
  };
}

type IPageHeader = IHeader | IActionPageHeader | ITopBarHeader;

export const PageHeader = (props: IPageHeader) => {
  const { title, variant } = props;
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();
  const styles = useThemedStyles(themedStyles(insets, windowWidth));
  const opacity = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  if (variant === 'actionHeader') {
    const { left, right, searchBar, showTitle = true } = props;

    opacity.value = withTiming(showTitle ? 1 : 0, { duration: 200 });

    const componentLeft = left?.icon ? (
      <Icon icon={left.icon} colorKey='onSurface' onPress={left.onPress} />
    ) : (
      left?.component
    );
    const componentRight = right?.icon ? (
      <Icon icon={right.icon} onPress={right.onPress} colorKey='onSurface' />
    ) : (
      right?.component
    );

    return (
      <View style={[styles.container, searchBar && styles.withSearchBar]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.left}>{left?.icon || left?.component ? componentLeft : null}</View>
          <Text
            variant='h6Regular'
            text={title}
            animatedStyles={animatedStyles}
            colorKey='onSurfaceDim'
            style={styles.title}
          />
          <View style={styles.right}>{right?.icon || right?.component ? componentRight : null}</View>
        </View>
        {searchBar && (
          <Input
            variant='enclosed'
            value={searchBar?.value}
            onChangeValue={searchBar?.onChangeText}
            showMessage={false}
            placeholder={searchBar?.placeholder}
            icon={searchBar.icon}
            enterKeyHint={searchBar.enterKeyHint}
          />
        )}
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

const themedStyles = (insets: EdgeInsets, windowWidth: number) => {
  const iconSize = 60;
  return (theme: ITheme) => {
    const paddingTop = insets.top < 40 ? 40 : insets.top + theme.spacing[2];
    return StyleSheet.create({
      container: {
        paddingLeft: theme.spacing[4],
        paddingRight: theme.spacing[4],
        paddingBottom: theme.spacing[2],
        paddingTop,
        alignItems: 'center',
        flexDirection: 'row',
        gap: theme.spacing[1],
        position: 'relative',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.surfaceExtraDim,
      },
      withSearchBar: {
        flexDirection: 'column',
        gap: theme.spacing[3],
        paddingBottom: theme.spacing[2],
      },
      left: {
        width: iconSize,
        flex: 1,
      },
      right: {
        width: iconSize,
        flex: 1,
        alignItems: 'flex-end',
      },
      title: {
        width: windowWidth - iconSize * 2,
        textAlign: 'center',
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
