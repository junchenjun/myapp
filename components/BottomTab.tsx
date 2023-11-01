import { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { Text } from '~components/text/Text';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

interface ITab {
  isFocused: boolean;
  index: number;
  onPress: () => void;
  options: {
    tabBarIcon: () => ReactNode;
  };
  label: string;
  initializing: boolean;
}

const TAB_WIDTH = 76;

export const BottomTab = ({ isFocused, index, onPress, options, label, initializing }: ITab) => {
  const styles = useThemedStyles(themedStyles);

  const defaultActiveTab = isFocused && initializing;

  const tabWidth = useSharedValue(defaultActiveTab ? TAB_WIDTH * 2 : TAB_WIDTH);
  const opacity = useSharedValue(defaultActiveTab ? 1 : 0);
  const color = useSharedValue(1);
  const textViewWidth = useSharedValue(defaultActiveTab ? 90 : 0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(tabWidth.value, {
        duration: 200,
      }),
    };
  });

  const animatedTextStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      width: withTiming(textViewWidth.value, {
        duration: 200,
      }),
    };
  });

  if (!initializing) {
    if (isFocused) {
      tabWidth.value = TAB_WIDTH * 2;
      opacity.value = withDelay(100, withTiming(1));
      textViewWidth.value = 90;
    } else {
      tabWidth.value = TAB_WIDTH;
      opacity.value = 0;
      textViewWidth.value = 0;
    }
  }

  return (
    <Animated.View style={[styles.container, index === 1 ? styles.left : {}, animatedStyles]}>
      <Pressable
        onPress={onPress}
        onPressIn={() => (color.value = 0.9)}
        onPressOut={() => (color.value = 1)}
        style={styles.button}
        children={() => (
          <View style={[styles.tab]}>
            {options.tabBarIcon()}
            <Animated.View style={[styles.textView, animatedTextStyles]}>
              <Text text={label} size='body2' weight='bold' color='primary' />
            </Animated.View>
          </View>
        )}
      />
    </Animated.View>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      borderRadius: 28,
      height: TAB_WIDTH,
      overflow: 'hidden',
    },
    tab: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: theme.colors.surface400,
      flexDirection: 'row',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    left: {
      position: 'absolute',
      right: 0,
    },
    textView: {
      alignItems: 'center',
    },
  });
};
