import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { EventMapBase, NavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { Animated, View } from 'react-native';

import { PageHeader } from '~components/pageHeader/PageHeader';
import { Pressable } from '~components/pressable/Pressable';
import { useTheme } from '~theme/ThemeContext';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  NavigationState,
  EventMapBase
>(Navigator);

function MyTabBar({ state, descriptors, navigation, position }: MaterialTopTabBarProps) {
  const theme = useTheme();

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.4)),
        });

        return (
          <Pressable
            key={label}
            onPress={onPress}
            style={{ marginLeft: index === 0 ? theme.spacing[4] : theme.spacing[2] }}
          >
            <Animated.View style={{ opacity }}>
              <PageHeader title={label} variant='topBarHeader' />
            </Animated.View>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function Layout() {
  return (
    <MaterialTopTabs
      backBehavior='initialRoute'
      initialRouteName='Activity'
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        tabBarShowIcon: false,
        // lazy: true,
      }}
    >
      <MaterialTopTabs.Screen name='activity' key='activity' options={{ title: 'Activity' }} />
      <MaterialTopTabs.Screen name='library' key='library' options={{ title: 'Library' }} />
    </MaterialTopTabs>
  );
}
