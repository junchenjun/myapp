import { Tabs } from 'expo-router';

import { IconFire, IconProfile } from '../../../assets/icons';
import { BottomTabBar } from '../../../components/nav/BottomTabBar';

export default function Root() {
  return (
    <Tabs
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        key="dashboard"
        options={{
          title: 'Workouts',
          tabBarIcon: () => <IconFire width={22} height={22} fill="white" />,
        }}
      />
      <Tabs.Screen
        name="settings"
        key="settings"
        options={{
          title: 'Other Stuff',
          tabBarIcon: () => <IconProfile width={20} height={20} fill="white" />,
        }}
      />
    </Tabs>
  );
}
