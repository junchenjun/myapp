import { createSlice } from '@reduxjs/toolkit';

export interface ColorTheme {
  surface300: string;
  surface200: string;
  primary: string;
  secondary: string;
  text300: string;
  text100: string;
}

export interface Theme {
  id: string;
  color: ColorTheme;
}

export const DARK_THEME_ID = 'DARK_THEME';
export const LIGHT_THEME_ID = 'LIGHT_THEME';

const lightThemeColors: ColorTheme = {
  surface300: '#EDEDED',
  surface200: '#FAFAFA',
  primary: '#C8F065',
  secondary: '#406631',
  text300: '#1F1F1F',
  text100: '#808080',
};

const darkThemeColors: ColorTheme = {
  surface300: '#EDEDED',
  surface200: '#FAFAFA',
  primary: '#C8F065',
  secondary: '#406631',
  text300: '#1F1F1F',
  text100: '#808080',
};

export const lightTheme: Theme = {
  id: LIGHT_THEME_ID,
  color: lightThemeColors,
};

export const darkTheme: Theme = {
  id: DARK_THEME_ID,
  color: darkThemeColors,
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
