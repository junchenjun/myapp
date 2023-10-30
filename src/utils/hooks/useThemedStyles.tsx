import React from 'react';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppSelector } from '~redux/store';
import { ITheme } from '~redux/themeSlice';

type Generator<T extends object> = (theme: ITheme, insets: EdgeInsets) => T;

const useThemedStyles = <T extends object>(fn: Generator<T>) => {
  const theme = useAppSelector(state => state.theme);
  const insets = useSafeAreaInsets();

  const ThemeAwareObject = React.useMemo(() => fn(theme, insets), [fn, theme, insets]);
  return ThemeAwareObject;
};
export { useThemedStyles };
