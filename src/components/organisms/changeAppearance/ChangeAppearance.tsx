import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { SelectItem } from '~components/atoms/selectItem/SelectItem';
import {
  IAppColorScheme,
  ITheme,
  appColorScheme,
  useTheme,
  useThemedStyles,
  useUpdateTheme,
} from '~theme/ThemeContext';
import { saveToSecureStore, secureStoreKeys } from '~utils/secureStore';

export const ChangeAppearance = () => {
  const theme = useTheme();
  const updateTheme = useUpdateTheme();
  const styles = useThemedStyles(themedStyles);

  const setTheme = useCallback(
    (v: IAppColorScheme | null) => {
      saveToSecureStore(secureStoreKeys.colorscheme, v || '').then(() => {
        if (v === null) {
          updateTheme(theme.id, true);
        } else {
          if (v === appColorScheme.dark) {
            updateTheme(appColorScheme.dark, false);
          } else if (v === appColorScheme.light) {
            updateTheme(appColorScheme.light, false);
          }
        }
      });
    },
    [theme.id, updateTheme]
  );

  return (
    <View style={styles.modal}>
      <SelectItem
        variant='large'
        icon={icons.Sun}
        title='Light Mode'
        onPress={() => setTheme(appColorScheme.light)}
        selected={!theme.systemDefault && theme.id === appColorScheme.light}
      />
      <SelectItem
        variant='large'
        icon={icons.Moon}
        title='Dark Mode'
        onPress={() => setTheme(appColorScheme.dark)}
        selected={!theme.systemDefault && theme.id === appColorScheme.dark}
      />
      <SelectItem
        variant='large'
        icon={icons.Appearance}
        title='System Default'
        onPress={() => setTheme(null)}
        selected={theme.systemDefault}
      />
    </View>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    modal: {
      gap: theme.spacing[3],
    },
  });
};
