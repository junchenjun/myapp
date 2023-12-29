import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { icons } from '~assets/icons';
import { Icon } from '~components/atoms/icon/Icon';
import { Pressable } from '~components/atoms/pressable/Pressable';
import { PageHeader } from '~components/molecules/pageHeader/PageHeader';
import { useTheme } from '~theme/ThemeContext';

export default function Layout() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const tabHeight = Platform.OS === 'android' ? 65 : 55 + insets.bottom;
  const iconSize = 27;

  const tabBarButton = (props: BottomTabBarButtonProps) => {
    return <Pressable {...props} onPress={props.onPress} />;
  };

  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          height: tabHeight,
          borderTopWidth: 0,
          elevation: 0,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 0,
        },
      }}
      initialRouteName='index'
      backBehavior='initialRoute'
      sceneContainerStyle={{ backgroundColor: theme.colors.surfaceExtraDim }}
    >
      <Tabs.Screen
        name='(activity)'
        key='activity'
        options={{
          tabBarShowLabel: false,
          title: 'Activity',
          tabBarButton,
          tabBarIcon: ({ focused }) => (
            <Icon icon={icons.Activity} colorKey={focused ? 'primary' : 'onSurfaceExtraDim'} size={iconSize - 1} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name='index'
        key='home'
        options={{
          tabBarShowLabel: false,
          title: 'Workouts',
          tabBarButton,
          tabBarIcon: ({ focused }) => (
            <Icon
              icon={icons.Lightning}
              fill={focused ? 'primary' : 'none'}
              colorKey={focused ? 'primary' : 'onSurfaceExtraDim'}
              size={iconSize + 1}
            />
          ),
          headerShown: true,
          header: () => {
            return <PageHeader variant='tabHeader' title='Workouts' />;
          },
        }}
      />
      <Tabs.Screen
        name='settings'
        key='settings'
        options={{
          tabBarShowLabel: false,
          title: 'Settings',
          tabBarButton,
          tabBarIcon: ({ focused }) => (
            <Icon icon={icons.Settings} colorKey={focused ? 'primary' : 'onSurfaceExtraDim'} size={iconSize} />
          ),
          headerShown: true,
          header: () => {
            return <PageHeader variant='tabHeader' title='Settings' />;
          },
        }}
      />
    </Tabs>
  );
}
