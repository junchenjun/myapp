import { Tabs } from 'expo-router';
import React from 'react';

import { icons } from '~assets/icons';
import { BottomTab } from '~components/BottomTab';
import { Icon } from '~components/icon/Icon';
import { PageHeader } from '~components/pageHeader/PageHeader';
import { IColorKeys } from '~utils/ThemeContext';

export default function Layout() {
  return (
    <Tabs
      tabBar={props => <BottomTab key={props.state.index} {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='index'
      backBehavior='initialRoute'
    >
      <Tabs.Screen
        name='activity'
        key='activity'
        options={{
          title: 'Activity',
          tabBarIcon: ({ color, size }) => <Icon icon={icons.activity} color={color as IColorKeys} size={size} />,
          headerShown: true,
          header: () => {
            return <PageHeader variant='default' title='Activity' />;
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
              icon={icons.lightning}
              fill={focused ? (color as IColorKeys) : 'none'}
              color={color as IColorKeys}
              size={size}
            />
          ),
          headerShown: true,
          header: () => {
            return <PageHeader variant='default' title='Workouts' />;
          },
        }}
      />
      <Tabs.Screen
        name='settings'
        key='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Icon icon={icons.settings} color={color as IColorKeys} size={size} />,
          headerShown: true,
          header: () => {
            return <PageHeader variant='default' title='Settings' />;
          },
        }}
      />
    </Tabs>
  );
}
