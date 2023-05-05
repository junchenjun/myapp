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
  transprant05: string;
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
  secondary: '#2C2C2C',
  text300: '#2C2C2C',
  text200: '#404040',
  text100: '#808080',
  white: '#ffffff',
  transprant05: 'rgba(0, 0, 0, 0.05)',
};

const darkThemeColors: ColorTheme = {
  surface300: '#D9D9D9',
  surface200: '#E6E6E6',
  surface100: '#FAFAFA',
  primary: '#0066FF',
  secondary: '#2C2C2C',
  text300: '#2C2C2C',
  text200: '#404040',
  text100: '#808080',
  white: '#ffffff',
  transprant05: 'rgba(0, 0, 0, 0.05)',
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
      state.themeId = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
