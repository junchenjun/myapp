import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import { EventMapBase, NavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { View } from 'react-native';

import { Pressable } from '~components/atoms/pressable/Pressable';
import { PageHeader } from '~components/molecules/pageHeader/PageHeader';
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
    <View style={{ flexDirection: 'row', backgroundColor: theme.colors.surfaceExtraDim }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || '';

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
        const labelOpacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.4)),
        });

        return (
          <Pressable
            key={label}
            onPress={onPress}
            style={{ marginLeft: index === 0 ? theme.spacing[4] : theme.spacing[2] }}
          >
            <PageHeader
              topBarHeaderAnimatedStyle={{
                opacity: labelOpacity,
              }}
              title={label}
              variant='topBarHeader'
            />
          </Pressable>
        );
      })}
    </View>
  );
}

export default function Layout() {
  const theme = useTheme();

  return (
    <MaterialTopTabs
      backBehavior='initialRoute'
      initialRouteName='Activity'
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        tabBarShowIcon: false,
        tabBarPressColor: 'transparent',
      }}
      sceneContainerStyle={{ backgroundColor: theme.colors.surfaceExtraDim }}
    >
      <MaterialTopTabs.Screen name='activity' key='activity' options={{ title: 'Activity' }} />
      <MaterialTopTabs.Screen name='library' key='library' options={{ title: 'Library' }} />
    </MaterialTopTabs>
  );
}
