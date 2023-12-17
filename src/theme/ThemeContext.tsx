import { Dispatch, ReactElement, createContext, useContext, useMemo, useReducer } from 'react';

import { themeColorsDark, themeColorsLight, themeFonts, themeRadius, themeSpacing } from '~theme/themeValues';

export type IThemedText = typeof themeFonts;

export interface ITheme {
  id: string;
  colors: typeof themeColorsLight | typeof themeColorsDark;
  fonts: typeof themeFonts;
  spacing: typeof themeSpacing;
  radius: typeof themeRadius;
}

export const DARK_THEME_ID = 'DARK_THEME';
export const LIGHT_THEME_ID = 'LIGHT_THEME';

interface IAction<T> {
  type: string;
  payload: T;
}

const initialTheme = {
  spacing: themeSpacing,
  radius: themeRadius,
  fonts: themeFonts,
  id: LIGHT_THEME_ID,
  colors: themeColorsLight,
};

const ThemeContext = createContext<ITheme>(initialTheme);

const ThemeDispatchContext = createContext({});

function themeReducer(theme: ITheme, action: IAction<string>) {
  switch (action.type) {
    case 'update': {
      if (action.payload === LIGHT_THEME_ID) {
        return { ...initialTheme, id: LIGHT_THEME_ID, colors: themeColorsLight };
      } else if (action.payload === DARK_THEME_ID) {
        return { ...initialTheme, id: DARK_THEME_ID, colors: themeColorsDark };
      }
      return theme;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

function ThemeProvider({ children }: { children: ReactElement }) {
  const [theme, dispatch] = useReducer(themeReducer, initialTheme);

  const themeMemoed = useMemo(() => theme, [theme]);

  return (
    <ThemeContext.Provider value={themeMemoed}>
      <ThemeDispatchContext.Provider value={dispatch}>{children}</ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

function useUpdateTheme() {
  const themeDispatch = useContext(ThemeDispatchContext) as Dispatch<IAction<string>>;

  return (id: typeof DARK_THEME_ID | typeof LIGHT_THEME_ID) =>
    themeDispatch({
      type: 'update',
      payload: id,
    });
}

type Generator<T extends object> = (theme: ITheme) => T;

const useThemedStyles = <T extends object>(fn: Generator<T>) => {
  const theme = useTheme();

  const ThemeAwareObject = useMemo(() => fn(theme), [fn, theme]);
  return ThemeAwareObject;
};

export { useThemedStyles, useUpdateTheme, useTheme, ThemeProvider };
