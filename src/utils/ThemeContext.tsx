import { Dispatch, ReactElement, createContext, useContext, useMemo, useReducer } from 'react';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ITheme {
  id: string;
  colors: IThemeColors;
  border: {
    borderRadius: number;
  };
}

export const DARK_THEME_ID = 'DARK_THEME';
export const LIGHT_THEME_ID = 'LIGHT_THEME';

interface IAction<T> {
  type: string;
  payload: T;
}

interface IThemeColors {
  primary: string; // button text, button border, bright
  textOnPrimary: string;
  secondary: string;
  surface400: string;
  surface300: string;
  surface200: string;
  surface100: string;
  text300: string;
  text200: string;
  text100: string;
  ripple: string;
}

const lightThemeColors: IThemeColors = {
  primary: '#30302E',
  textOnPrimary: '#ffffff',
  secondary: '#425F85',
  surface400: '#BFBFBF',
  surface300: '#E3E3E3',
  surface200: '#FDFDFD',
  surface100: '#FFFFFF',
  text300: '#30302E',
  text200: '#60605F',
  text100: '#8C8C8B',
  ripple: '#E3E3E3',
};

const darkThemeColors: IThemeColors = {
  primary: '#30302E',
  textOnPrimary: '#ffffff',
  secondary: '#425F85',
  surface400: '#BFBFBF',
  surface300: '#E3E3E3',
  surface200: '#FDFDFD',
  surface100: '#FFFFFF',
  text300: '#30302E',
  text200: '#60605F',
  text100: '#8C8C8B',
  ripple: '#E3E3E3',
};

const shared = {
  border: {
    borderRadius: 8,
  },
};

const lightTheme = {
  ...shared,
  id: LIGHT_THEME_ID,
  colors: lightThemeColors,
};

const darkTheme = {
  ...shared,
  id: DARK_THEME_ID,
  colors: darkThemeColors,
};

const initialTheme = lightTheme;

const ThemeContext = createContext<ITheme>(initialTheme);

const ThemeDispatchContext = createContext({});

function themeReducer(theme: ITheme, action: IAction<string>) {
  switch (action.type) {
    case 'update': {
      if (action.payload === LIGHT_THEME_ID) {
        return lightTheme;
      } else if (action.payload === DARK_THEME_ID) {
        return darkTheme;
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

type Generator<T extends object> = (theme: ITheme, insets: EdgeInsets) => T;

const useThemedStyles = <T extends object>(fn: Generator<T>) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const ThemeAwareObject = useMemo(() => fn(theme, insets), [fn, theme, insets]);
  return ThemeAwareObject;
};

export { useThemedStyles, useUpdateTheme, useTheme, ThemeProvider };
