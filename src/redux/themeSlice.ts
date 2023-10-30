import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IThemeColors {
  surface400: string; // black
  surface300: string; // button background
  surface200: string; // card background
  surface100: string; // page background
  primary: string;
  secondary: string;
  text300: string;
  text200: string;
  text100: string;
  transparentHeader: string;
  ripple: string;
}

export interface ITheme {
  id: string;
  color: IThemeColors;
  borders: {
    borderRadius: number;
  };
}

export const DARK_THEME_ID = 'DARK_THEME';
export const LIGHT_THEME_ID = 'LIGHT_THEME';

const lightThemeColors: IThemeColors = {
  surface400: '#D9D9D9',
  surface300: '#E0F0FF',
  surface200: '#FBFCFE',
  surface100: '#ECF1F9',
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
  surface200: '#14161A',
  surface100: '#202329',
  primary: '#4DA9FF',
  secondary: '#95B0E5',
  text300: '#FEFEFE',
  text200: '#D1D1D1',
  text100: '#848484',
  transparentHeader: 'rgba(20, 22, 26, 0.8)',
  ripple: '#292929',
};

export const lightTheme: ITheme = {
  id: LIGHT_THEME_ID,
  color: lightThemeColors,
  borders: {
    borderRadius: 8,
  },
};

export const darkTheme: ITheme = {
  id: DARK_THEME_ID,
  color: darkThemeColors,
  borders: {
    borderRadius: 8,
  },
};

const initialState: ITheme = {
  ...lightTheme,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<typeof LIGHT_THEME_ID | typeof DARK_THEME_ID>) => {
      if (action.payload === LIGHT_THEME_ID) {
        return lightTheme;
        // setStatusBarStyle('dark');
      } else if (action.payload === DARK_THEME_ID) {
        return darkTheme;
        // setStatusBarStyle('light');
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
