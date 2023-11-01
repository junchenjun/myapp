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
  surface400: string; // accent, chip background, darkest surface
  surface300: string; // button background
  surface200: string; // card background
  surface100: string; // page background, lightest surface
  primary: string; // button text, button border, bright
  secondary: string; // unused
  text300: string;
  text200: string;
  text100: string;
  transparentHeader: string;
  ripple: string;
}

const lightThemeColors: IThemeColors = {
  surface400: '#D9D9D9',
  surface300: '#E0F0FF',
  surface200: '#ECF1F9',
  surface100: '#FBFCFE',
  primary: '#0066FF',
  secondary: '#17171A',
  text300: '#2C2C2C',
  text200: '#404040',
  text100: '#808080',
  transparentHeader: 'rgba(251, 252, 254, 0.9)',
  ripple: '#B2DAFF',
};

const darkThemeColors: IThemeColors = {
  surface400: '#000000',
  surface300: '#0A1724',
  surface200: '#202329',
  surface100: '#14161A',
  primary: '#4DA9FF',
  secondary: '#95B0E5',
  text300: '#FEFEFE',
  text200: '#D1D1D1',
  text100: '#848484',
  transparentHeader: 'rgba(20, 22, 26, 0.8)',
  ripple: '#292929',
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
