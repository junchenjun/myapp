import { setStatusBarStyle } from 'expo-status-bar';
import { useCallback } from 'react';
import { Appearance, useColorScheme } from 'react-native';

import { IAppColorScheme, appColorScheme, useUpdateTheme } from '~theme/ThemeContext';

export function useUpdateAppColorScheme() {
  const colorScheme = useColorScheme();
  const updateTheme = useUpdateTheme();

  const updateAppColorScheme = useCallback(
    (v: IAppColorScheme | null) => {
      if (!v) {
        if (colorScheme === 'light') {
          updateTheme(appColorScheme.light, true);
          setStatusBarStyle('dark');
          Appearance.setColorScheme(null);
        } else {
          updateTheme(appColorScheme.dark, true);
          setStatusBarStyle('light');
          Appearance.setColorScheme(null);
        }
      } else {
        if (v === appColorScheme.dark) {
          updateTheme(appColorScheme.dark, false);
          setStatusBarStyle('light');
          Appearance.setColorScheme('dark');
        } else if (v === appColorScheme.light) {
          updateTheme(appColorScheme.light, false);
          setStatusBarStyle('dark');
          Appearance.setColorScheme('light');
        }
      }
    },
    [colorScheme, updateTheme]
  );

  return updateAppColorScheme;
}
