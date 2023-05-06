import { Tabs } from 'expo-router';
import { useSelector } from 'react-redux';

import { IconFire, IconProfile } from '../../../assets/icons';
import { BottomTabBar } from '../../../components/nav/BottomTabBar';
import { RootState } from '../../_layout';

export default function Root() {
  const theme = useSelector((state: RootState) => state.theme);

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
          tabBarIcon: () => <IconFire width={22} height={22} fill={theme.styles.color.text300} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        key="settings"
        options={{
          title: 'Other Stuff',
          tabBarIcon: () => (
            <IconProfile width={20} height={20} fill={theme.styles.color.text300} />
          ),
        }}
      />
    </Tabs>
  );
}
