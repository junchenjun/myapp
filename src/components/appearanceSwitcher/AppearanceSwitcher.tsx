import { Appearance, StyleSheet, View, useColorScheme } from 'react-native';

import { icons } from '~assets/icons';
import { SelectButton } from '~components/selectButton/SelectButton';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

type IColorMode = 'light' | 'dark' | null;

export const AppearanceSwitcher = () => {
  const styles = useThemedStyles(themedStyles);
  const colorScheme = useColorScheme();

  const setTheme = (v: IColorMode) => {
    Appearance.setColorScheme(v);
  };

  return (
    <View style={styles.modal}>
      <SelectButton
        icon={icons.Appearance}
        title='Light Mode'
        onPress={() => setTheme('light')}
        selected={colorScheme === 'light'}
      />
      <SelectButton
        icon={icons.Appearance}
        title='Dark Mode'
        onPress={() => setTheme('dark')}
        selected={colorScheme === 'dark'}
      />
      <SelectButton
        icon={icons.Appearance}
        title='System Default'
        onPress={() => setTheme(null)}
        selected={colorScheme === null}
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
