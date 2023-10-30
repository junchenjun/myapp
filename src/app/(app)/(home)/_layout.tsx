import { Tabs } from 'expo-router';
import { ReactNode, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconFire, IconProfile } from '~assets/icons';
import { BottomTab } from '~components/BottomTab';
import { useAppSelector } from '~redux/store';
import { ITheme } from '~redux/themeSlice';
import { useThemedStyles } from '~utils/hooks/useThemedStyles';

export default function Root() {
  const theme = useAppSelector(state => state.theme);
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(themedStyles);

  const [initializing, setInitializing] = useState(true);

  return (
    <Tabs
      tabBar={({ state, descriptors, navigation }) => {
        return (
          <View style={[styles.tabs, { bottom: insets.bottom + 5 || 20 }]}>
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
                setInitializing(false);
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate({ params: {}, name: route.name, merge: true });
                }
              };

              return (
                <BottomTab
                  isFocused={isFocused}
                  index={index}
                  options={
                    options as {
                      tabBarIcon: () => ReactNode;
                    }
                  }
                  label={label as string}
                  onPress={onPress}
                  key={options.title}
                  initializing={initializing}
                />
              );
            })}
          </View>
        );
      }}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
        key='home'
        options={{
          title: 'Workouts',
          tabBarIcon: () => <IconFire width={22} height={22} fill={theme.color.primary} />,
        }}
      />
      <Tabs.Screen
        name='settings'
        key='settings'
        options={{
          title: 'Other Stuff',
          tabBarIcon: () => <IconProfile width={20} height={20} fill={theme.color.primary} />,
        }}
      />
    </Tabs>
  );
}

const themedStyles = (theme: ITheme) => {
  const TAB_WIDTH = 76;
  return StyleSheet.create({
    tabs: {
      position: 'absolute',
      width: TAB_WIDTH * 2 + TAB_WIDTH - 10,
      flexDirection: 'row',
      left: Dimensions.get('window').width / 2 - (TAB_WIDTH * 2 + TAB_WIDTH - 10) / 2,
      justifyContent: 'flex-start',
    },
    container: {
      borderRadius: 28,
      height: TAB_WIDTH,
      overflow: 'hidden',
    },
    tab: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: theme.color.secondary,
      flexDirection: 'row',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    left: {
      position: 'absolute',
      right: 0,
    },
    textView: {
      alignItems: 'center',
    },
  });
};
