import { Tabs } from 'expo-router';

import FireIcon from '../../../assets/icons/fireIcon.svg';
import ProfileIcon from '../../../assets/icons/profileIcon.svg';
import { MyTabBar } from '../../../components/BottomTabBar';

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
          title: 'Other Stuff',
          tabBarIcon: () => <ProfileIcon width={20} height={20} />,
        }}
      />
    </Tabs>
  );
}
