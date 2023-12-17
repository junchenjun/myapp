import { Dispatch, ReactElement, createContext, useContext, useMemo, useReducer } from 'react';

import { themeColorsDark, themeColorsLight, themeFonts, themeRadius, themeSpacing } from '~theme/themeValues';

export type IThemedText = typeof themeFonts;

export const appThemes = {
  light: 'light',
  dark: 'dark',
  system: 'system',
} as const;

export interface ITheme {
  id: (typeof appThemes)[keyof typeof appThemes];
  colors: typeof themeColorsLight | typeof themeColorsDark;
  fonts: typeof themeFonts;
  spacing: typeof themeSpacing;
  radius: typeof themeRadius;
}

interface IAction<T> {
  type: string;
  payload: T;
}

const initialTheme = {
  spacing: themeSpacing,
  radius: themeRadius,
  fonts: themeFonts,
  id: appThemes.light,
  colors: themeColorsLight,
};

const ThemeContext = createContext<ITheme>(initialTheme);

const ThemeDispatchContext = createContext({});

function themeReducer(theme: ITheme, action: IAction<(typeof appThemes)[keyof typeof appThemes]>) {
  switch (action.type) {
    case 'update': {
      if (action.payload === appThemes.light) {
        return { ...initialTheme, id: appThemes.light, colors: themeColorsLight };
      } else if (action.payload === appThemes.dark) {
        return { ...initialTheme, id: appThemes.dark, colors: themeColorsDark };
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
  const themeDispatch = useContext(ThemeDispatchContext) as Dispatch<
    IAction<(typeof appThemes)[keyof typeof appThemes]>
  >;

  return (id: (typeof appThemes)[keyof typeof appThemes]) =>
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
