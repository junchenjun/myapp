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
  surface300: '#D1D1D1',
  surface200: '#EDEDED',
  surface100: '#FAFAFA',
  primary: '#9AF090',
  secondary: '#3D46E8',
  text300: '#1F1F1F',
  text200: '#333333',
  text100: '#808080',
  transprant05: 'rgba(0, 0, 0, 0.05)',
};

const darkThemeColors: ColorTheme = {
  surface300: '#D1D1D1',
  surface200: '#EDEDED',
  surface100: '#FAFAFA',
  primary: '#9AF090',
  secondary: '#3D46E8',
  text300: '#1F1F1F',
  text200: '#333333',
  text100: '#808080',
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
