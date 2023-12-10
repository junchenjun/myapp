import { Tabs } from 'expo-router';
import React from 'react';

import { IconActivity, IconLightning, IconSettings } from '~assets/icons';
import { BottomTab } from '~components/BottomTab';
import { Icon } from '~components/icon/Icon';
import { PageHeader } from '~components/PageHeader';
import { IColorKeys } from '~utils/ThemeContext';

export default function Layout() {
  return (
    <Tabs
      tabBar={props => <BottomTab key={props.state.index} {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='activity'
        key='activity'
        options={{
          title: 'Activity',
          tabBarIcon: ({ color, size }) => <Icon icon={IconActivity} color={color as IColorKeys} size={size} />,
          headerShown: true,
          header: () => {
            return <PageHeader type='default' title='Activity' />;
          },
        }}
      />
      <Tabs.Screen
        name='index'
        key='home'
        options={{
          title: 'Workouts',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              icon={IconLightning}
              fill={focused ? (color as IColorKeys) : 'none'}
              color={color as IColorKeys}
              size={size}
            />
          ),
          headerShown: true,
          header: () => {
            return <PageHeader type='default' title='Workouts' />;
          },
        }}
      />
      <Tabs.Screen
        name='settings'
        key='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Icon icon={IconSettings} color={color as IColorKeys} size={size} />,
          headerShown: true,
          header: () => {
            return <PageHeader type='default' title='Settings' />;
          },
        }}
      />
    </Tabs>
  );
}
