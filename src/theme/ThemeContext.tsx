import { Dispatch, ReactElement, createContext, useCallback, useContext, useMemo, useReducer } from 'react';

import { themeColorsDark, themeColorsLight, themeFonts, themeRadius, themeSpacing } from '~theme/themeValues';

export type IThemedText = typeof themeFonts;

export const appColorScheme = {
  light: 'light',
  dark: 'dark',
} as const;

export type IAppColorScheme = (typeof appColorScheme)[keyof typeof appColorScheme];

export interface ITheme {
  id: IAppColorScheme;
  colors: typeof themeColorsLight | typeof themeColorsDark;
  fonts: typeof themeFonts;
  spacing: typeof themeSpacing;
  radius: typeof themeRadius;
  systemDefault: boolean;
}

interface IAction<T> {
  type: string;
  payload: T;
}

const initialTheme = {
  spacing: themeSpacing,
  radius: themeRadius,
  fonts: themeFonts,
  id: appColorScheme.light,
  systemDefault: true,
  colors: themeColorsLight,
};

const ThemeContext = createContext<ITheme>(initialTheme);

const ThemeDispatchContext = createContext({});

function themeReducer(theme: ITheme, action: IAction<{ id: IAppColorScheme; systemDefault: boolean }>) {
  switch (action.type) {
    case 'update': {
      if (action.payload.id === appColorScheme.light) {
        return {
          ...initialTheme,
          id: appColorScheme.light,
          colors: themeColorsLight,
          systemDefault: action.payload.systemDefault,
        };
      } else if (action.payload.id === appColorScheme.dark) {
        return {
          ...initialTheme,
          id: appColorScheme.dark,
          colors: themeColorsDark,
          systemDefault: action.payload.systemDefault,
        };
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
    IAction<{ id: IAppColorScheme; systemDefault: boolean }>
  >;

  return useCallback(
    (id: IAppColorScheme, systemDefault: boolean) => {
      themeDispatch({
        type: 'update',
        payload: { id, systemDefault },
      });
    },
    [themeDispatch]
  );
}

type Generator<T extends object> = (theme: ITheme) => T;

const useThemedStyles = <T extends object>(fn: Generator<T>) => {
  const theme = useTheme();

  const ThemeAwareObject = useMemo(() => fn(theme), [fn, theme]);
  return ThemeAwareObject;
};

export { useThemedStyles, useUpdateTheme, useTheme, ThemeProvider };
