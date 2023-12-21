import { StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { SelectItem } from '~components/atoms/selectItem/SelectItem';
import { IAppColorScheme, ITheme, appColorScheme, useTheme, useThemedStyles } from '~theme/ThemeContext';
import { useUpdateAppColorScheme } from '~utils/hooks/useUpdateAppColorScheme';
import { saveToSecureStore, secureStoreKeys } from '~utils/secureStore';

export const AppearanceModal = () => {
  const theme = useTheme();
  const updateAppColorScheme = useUpdateAppColorScheme();

  const styles = useThemedStyles(themedStyles);

  const setTheme = (v: IAppColorScheme | null) => {
    saveToSecureStore(secureStoreKeys.colorscheme, v || '').then(() => {
      updateAppColorScheme(v);
    });
  };

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
