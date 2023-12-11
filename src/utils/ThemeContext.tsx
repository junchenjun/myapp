import { Dispatch, ReactElement, createContext, useContext, useMemo, useReducer } from 'react';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

const colors = {
  gray: {
    100: '#ffffff',
    98: '#F7F8FA',
    96: '#F4F5F6',
    94: '#EBEDF0',
    92: '#E4E6EB',
    80: '#C6C6C9',
    70: '#AAABAE',
    60: '#8F9193',
    40: '#5D5E61',
    30: '#454749',
    17: '#1D1F21',
    12: '#181A1C',
    10: '#141517',
    6: '#0E1012',
    5: '#0A0B0D',
  },
  blue: {
    100: '#FFFFFF',
    80: '#AAC7FF',
    50: '#1275E3',
    20: '#002F64',
    10: '#001B3E',
  },
  red: {
    100: '#FFFFFF',
    80: '#FFB4AB',
    40: '#BA1A1A',
    20: '#690005',
  },
};

const lightColors = {
  // primary
  primary: colors.blue[50],
  onPrimary: colors.blue[100],
  // surface
  surfaceExtraBright: colors.gray[100],
  surfaceBright: colors.gray[98],
  surface: colors.gray[96],
  surfaceDim: colors.gray[94],
  surfaceExtraDim: colors.gray[92],
  onSurface: colors.blue[10],
  onSurfaceDim: colors.gray[40],
  onSurfaceExtraDim: colors.gray[70],
  // error
  error: colors.red[40],
  onError: colors.red[100],
  // android ripple
  rippleSurface: colors.gray[80],
};

const darkColors: typeof lightColors = {
  // primary
  primary: colors.blue[80],
  onPrimary: colors.blue[20],
  // surface
  surfaceExtraBright: colors.gray[17],
  surfaceBright: colors.gray[12],
  surface: colors.gray[10],
  surfaceDim: colors.gray[6],
  surfaceExtraDim: colors.gray[5],
  onSurface: colors.gray[98],
  onSurfaceDim: colors.gray[80],
  onSurfaceExtraDim: colors.gray[60],
  // error
  error: colors.red[80],
  onError: colors.red[20],
  // android ripple
  rippleSurface: colors.gray[30],
};

export type IColorKeys = keyof typeof lightColors;

const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
};

const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  round: 100,
};

const text = {
  // heading
  h1Light: {
    fontFamily: 'Kanit-Light',
    fontSize: 36,
  },
  h1Regular: {
    fontFamily: 'Kanit-Regular',
    fontSize: 36,
  },
  h1Medium: {
    fontFamily: 'Kanit-Medium',
    fontSize: 36,
  },
  h2Light: {
    fontFamily: 'Kanit-Light',
    fontSize: 32,
  },
  h2Regular: {
    fontFamily: 'Kanit-Regular',
    fontSize: 32,
  },
  h2Medium: {
    fontFamily: 'Kanit-Medium',
    fontSize: 32,
  },
  h3Light: {
    fontFamily: 'Kanit-Light',
    fontSize: 28,
  },
  h3Regular: {
    fontFamily: 'Kanit-Regular',
    fontSize: 28,
  },
  h3Medium: {
    fontFamily: 'Kanit-Medium',
    fontSize: 28,
  },
  h4Light: {
    fontFamily: 'Kanit-Light',
    fontSize: 24,
  },
  h4Regular: {
    fontFamily: 'Kanit-Regular',
    fontSize: 24,
  },
  h4Medium: {
    fontFamily: 'Kanit-Medium',
    fontSize: 24,
  },
  h5Light: {
    fontFamily: 'Kanit-Light',
    fontSize: 20,
  },
  h5Regular: {
    fontFamily: 'Kanit-Regular',
    fontSize: 20,
  },
  h5Medium: {
    fontFamily: 'Kanit-Medium',
    fontSize: 20,
  },
  h6Light: {
    fontFamily: 'Kanit-Light',
    fontSize: 16,
  },
  h6Regular: {
    fontFamily: 'Kanit-Regular',
    fontSize: 16,
  },
  h6Medium: {
    fontFamily: 'Kanit-Medium',
    fontSize: 16,
  },
  // paragraphs
  pLGItalic: {
    fontFamily: 'Kanit-Italic',
    fontSize: 18,
  },
  pLGLight: {
    fontFamily: 'Kanit-Light',
    fontSize: 18,
  },
  pLGRegular: {
    fontFamily: 'Kanit-Regular',
    fontSize: 18,
  },
  pLGMedium: {
    fontFamily: 'Kanit-Medium',
    fontSize: 18,
  },
  pMDItalic: {
    fontFamily: 'Kanit-Italic',
    fontSize: 16,
  },
  pMDLight: {
    fontFamily: 'Kanit-Light',
    fontSize: 16,
  },
  pMDRegular: {
    fontFamily: 'Kanit-Regular',
    fontSize: 16,
  },
  pMDMedium: {
    fontFamily: 'Kanit-Medium',
    fontSize: 16,
  },
  pSMItalic: {
    fontFamily: 'Kanit-Italic',
    fontSize: 14,
  },
  pSMLight: {
    fontFamily: 'Kanit-Light',
    fontSize: 14,
  },
  pSMRegular: {
    fontFamily: 'Kanit-Regular',
    fontSize: 14,
  },
  pSMMedium: {
    fontFamily: 'Kanit-Medium',
    fontSize: 14,
  },
  pXSItalic: {
    fontFamily: 'Kanit-Italic',
    fontSize: 12,
  },
  pXSLight: {
    fontFamily: 'Kanit-Light',
    fontSize: 12,
  },
  pXSRegular: {
    fontFamily: 'Kanit-Regular',
    fontSize: 12,
  },
  pXSMedium: {
    fontFamily: 'Kanit-Medium',
    fontSize: 12,
  },
};

export type IThemedText = typeof text;

export interface ITheme {
  id: string;
  colors: typeof lightColors;
  text: typeof text;
  spacing: typeof spacing;
  radius: typeof radius;
}

export const DARK_THEME_ID = 'DARK_THEME';
export const LIGHT_THEME_ID = 'LIGHT_THEME';

interface IAction<T> {
  type: string;
  payload: T;
}

const initialTheme = {
  spacing,
  radius,
  text,
  id: LIGHT_THEME_ID,
  colors: lightColors,
};

const ThemeContext = createContext<ITheme>(initialTheme);

const ThemeDispatchContext = createContext({});

function themeReducer(theme: ITheme, action: IAction<string>) {
  switch (action.type) {
    case 'update': {
      if (action.payload === LIGHT_THEME_ID) {
        return { ...initialTheme, id: LIGHT_THEME_ID, colors: lightColors };
      } else if (action.payload === DARK_THEME_ID) {
        return { ...initialTheme, id: DARK_THEME_ID, colors: darkColors };
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
