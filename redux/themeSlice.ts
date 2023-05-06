import { createSlice } from '@reduxjs/toolkit';

export interface ColorTheme {
  surface300: string;
  surface200: string;
  surface100: string;
  primary: string;
  secondary: string;
  text300: string;
  text200: string;
  text100: string;
  white: string;
  black: string;
  transprant05: string;
  transprant01: string;
}

export interface Theme {
  id: string;
  color: ColorTheme;
  borders?: {
    borderRadius: number;
  };
}

export const DARK_THEME_ID = 'DARK_THEME';
export const LIGHT_THEME_ID = 'LIGHT_THEME';

const lightThemeColors: ColorTheme = {
  surface300: '#D9D9D9',
  surface200: '#E6E6E6',
  surface100: '#FAFAFA',
  primary: '#0066FF',
  secondary: '#DADADA',
  text300: '#2C2C2C',
  text200: '#404040',
  text100: '#808080',
  white: '#ffffff',
  black: '#17171A',
  transprant05: 'rgba(0, 0, 0, 0.05)',
  transprant01: 'rgba(0, 0, 0, 0.02)',
};

const darkThemeColors: ColorTheme = {
  surface300: '#000000',
  surface200: '#242529',
  surface100: '#323337',
  primary: '#65C9EB',
  secondary: '#41424D',
  text300: '#E6E6E6',
  text200: '#B3B3B3',
  text100: '#8C8C8C',
  white: '#ffffff',
  black: '#17171A',
  transprant05: 'rgba(0, 0, 0, 0.05)',
  transprant01: 'rgba(0, 0, 0, 0.02)',
};

export const lightTheme: Theme = {
  id: LIGHT_THEME_ID,
  color: lightThemeColors,
  borders: {
    borderRadius: 8,
  },
};

export const darkTheme: Theme = {
  id: DARK_THEME_ID,
  color: darkThemeColors,
  borders: {
    borderRadius: 8,
  },
};

const initialState: {
  themeId: string;
  styles: Theme;
} = {
  themeId: LIGHT_THEME_ID,
  styles: lightTheme,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      if (action.payload === LIGHT_THEME_ID) {
        state.themeId = DARK_THEME_ID;
        state.styles = darkTheme;
      } else if (action.payload === DARK_THEME_ID) {
        state.styles = lightTheme;
        state.themeId = LIGHT_THEME_ID;
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
