import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

import { Pressable } from '~components/pressable/Pressable';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

export const BottomTab = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={[styles.tabs, { bottom: 0 }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
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
          <Pressable onPress={onPress} rippleConfig={{ radius: 60 }} key={index}>
            <View style={styles.tab}>
              {options.tabBarIcon?.({
                focused: isFocused,
                color: isFocused ? 'primary' : 'onSurfaceExtraDim',
                size: 32,
              })}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const themedStyles = (theme: ITheme, insets: EdgeInsets) => {
  return StyleSheet.create({
    tabs: {
      position: 'absolute',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingBottom: insets.bottom || theme.spacing[4],
      backgroundColor: theme.colors.surface,
      paddingVertical: theme.spacing[4],
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      width: 40,
    },
  });
};
