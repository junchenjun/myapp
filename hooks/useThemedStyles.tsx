import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../app/_layout';
import { Theme } from '../redux/themeSlice';

type Generator<T extends object> = (theme: Theme) => T;

const useThemedStyles = <T extends object>(fn: Generator<T>) => {
  const theme = useSelector((state: RootState) => state.theme.styles);

  const ThemeAwareObject = React.useMemo(() => fn(theme), [fn, theme]);
  return ThemeAwareObject;
};
export { useThemedStyles };
