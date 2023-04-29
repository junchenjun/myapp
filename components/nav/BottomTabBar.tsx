import { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import ThemedText from '../element/ThemedText';
import { RootState } from '../../app/_layout';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { Theme } from '../../redux/themeSlice';

const TAB_WIDTH = 76;

const Tab = ({ isFocused, index, onPress, options, label, initializing }) => {
  const styles = useThemedStyles(themedStyles);
  const theme = useSelector((state: RootState) => state.theme.styles);

  const defaultActiveTab = isFocused && initializing;

  const width = useSharedValue(defaultActiveTab ? TAB_WIDTH * 2 : TAB_WIDTH);
  const opacity = useSharedValue(defaultActiveTab ? 1 : 0);
  const color = useSharedValue(theme.color.text300);
  const xxxx = useSharedValue(defaultActiveTab ? 90 : 0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(width.value, {
        duration: 200,
      }),
    };
  });

  const animatedTextStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      width: withTiming(xxxx.value, {
        duration: 200,
      }),
      alignItems: 'center',
    };
  });

  const animatedPressableStyles = useAnimatedStyle(() => {
    return {
      color: withTiming(color.value, {
        duration: 200,
      }),
    };
  });

  if (!initializing) {
    if (isFocused) {
      width.value = TAB_WIDTH * 2;
      opacity.value = withDelay(100, withTiming(1));
      xxxx.value = 90;
    } else {
      width.value = TAB_WIDTH;
      opacity.value = 0;
      xxxx.value = 0;
    }
  }

  return (
    <Animated.View style={[styles.container, index === 1 ? styles.left : {}, animatedStyles]}>
      <Pressable
        onPress={onPress}
        onPressIn={() => (color.value = theme.color.text100)}
        onPressOut={() => (color.value = theme.color.text300)}
        children={({ pressed }) => (
          <View style={styles.button}>
            {options.tabBarIcon()}
            <Animated.View style={animatedTextStyles}>
              <ThemedText
                text={label}
                size="body2"
                weight="bold"
                animatedStyles={animatedPressableStyles}
              />
            </Animated.View>
          </View>
        )}
      />
    </Animated.View>
  );
};

export const MyTabBar = ({ state, descriptors, navigation }) => {
  const [initializing, setInitializing] = useState(true);
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={[styles.tabs, { bottom: insets.bottom + 5 || 20 }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          setInitializing(false);
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        return (
          <Tab
            isFocused={isFocused}
            index={index}
            options={options}
            label={label}
            onPress={onPress}
            key={options.title}
            initializing={initializing}
          />
        );
      })}
    </View>
  );
};

const themedStyles = (theme: Theme) => {
  return StyleSheet.create({
    tabs: {
      position: 'absolute',
      width: TAB_WIDTH * 2 + TAB_WIDTH - 10,
      flexDirection: 'row',
      left: Dimensions.get('window').width / 2 - (TAB_WIDTH * 2 + TAB_WIDTH - 10) / 2,
      justifyContent: 'flex-start',
    },
    container: {
      borderRadius: 28,
      height: TAB_WIDTH,
      overflow: 'hidden',
    },
    button: {
      backgroundColor: '#CCCCCC',
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
  });
};
