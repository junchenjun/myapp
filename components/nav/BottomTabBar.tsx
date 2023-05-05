import { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Theme } from '../../redux/themeSlice';
import { useThemedStyles } from '../../utils/hooks/useThemedStyles';
import ThemedText from '../element/ThemedText';

const TAB_WIDTH = 76;

const Tab = ({ isFocused, index, onPress, options, label, initializing }) => {
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

  const animatedPressableStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(color.value, {
            duration: 200,
          }),
        },
      ],
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
        children={({ pressed }) => (
          <Animated.View style={[styles.tab, animatedPressableStyles]}>
            {options.tabBarIcon()}
            <Animated.View style={[styles.textView, animatedTextStyles]}>
              <ThemedText text={label} size="body2" weight="bold" color="white" />
            </Animated.View>
          </Animated.View>
        )}
      />
    </Animated.View>
  );
};

export const BottomTabBar = ({ state, descriptors, navigation }) => {
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
    tab: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: theme.color.secondary,
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
