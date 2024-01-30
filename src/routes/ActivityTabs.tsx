import { MaterialTopTabBarProps, createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';

import { Pressable } from '~components/atoms/pressable/Pressable';
import { PageHeader } from '~components/molecules/pageHeader/PageHeader';
import { ActivityScreen } from '~screens/activityScreen/ActivityScreen';
import { LibraryScreen } from '~screens/libraryScreen/LibraryScreen';
import { useTheme } from '~theme/ThemeContext';

const TopTab = createMaterialTopTabNavigator();

function TopTabBar({ state, descriptors, navigation, position }: MaterialTopTabBarProps) {
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

export function ActivityTabs() {
  const theme = useTheme();
  return (
    <TopTab.Navigator
      backBehavior='initialRoute'
      initialRouteName='activity'
      tabBar={props => <TopTabBar {...props} />}
      screenOptions={{
        tabBarShowIcon: false,
        tabBarPressColor: 'transparent',
      }}
      sceneContainerStyle={{ backgroundColor: theme.colors.surfaceExtraDim }}
    >
      <TopTab.Screen name='activity' key='activity' component={ActivityScreen} options={{ title: 'Activity' }} />
      <TopTab.Screen name='library' key='library' component={LibraryScreen} options={{ title: 'Library' }} />
    </TopTab.Navigator>
  );
}
