import { Tabs } from 'expo-router';
import { View, Dimensions, StyleSheet, Pressable } from 'react-native';
import { BaseButton } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import FireIcon from '../../../assets/icons/fireIcon.svg';
import ProfileIcon from '../../../assets/icons/profileIcon.svg';
import ThemedText from '../../../components/ThemedText';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../redux/themeSlice';

const Tab = ({ isFocused, index, onPress, options, label }) => {
  const styles = useThemedStyles(themedStyles);

  const width = useSharedValue(60);
  const opacity = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  const animatedTextStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  if (isFocused) {
    width.value = withSpring(140);
    opacity.value = withDelay(200, withTiming(1));
  } else {
    width.value = withSpring(60);
    opacity.value = 0;
  }

  return (
    <Animated.View style={[styles.container, index === 1 ? styles.left : {}, animatedStyles]}>
      <Pressable onPress={onPress} style={styles.button}>
        {options.tabBarIcon()}
        <Animated.View style={animatedTextStyles}>
          <ThemedText text={label} size="body2" style="bold" />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

function MyTabBar({ state, descriptors, navigation }) {
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={styles.tabs}>
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
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
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
          />
        );
      })}
    </View>
  );
}

const themedStyles = (theme: Theme) => {
  return StyleSheet.create({
    tabs: {
      position: 'absolute',
      width: 196,
      flexDirection: 'row',
      left: Dimensions.get('window').width / 2 - 98,
      bottom: 10,
      justifyContent: 'flex-start',
    },
    container: {
      borderRadius: 20,
      height: 60,
      overflow: 'hidden',
    },
    button: {
      backgroundColor: '#E6E6E6',
      flexDirection: 'row',
      width: '100%',
      height: '100%',
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    left: {
      position: 'absolute',
      right: 0,
    },
  });
};

export default function Root() {
  return (
    <Tabs
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        key="dashboard"
        options={{
          title: 'Workouts',
          tabBarIcon: () => <FireIcon width={22} height={22} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        key="settings"
        options={{
          title: 'Settings',
          tabBarIcon: () => <ProfileIcon width={20} height={20} />,
        }}
      />
    </Tabs>
  );
}
