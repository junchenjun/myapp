import React, { useEffect } from 'react';
import { View, useColorScheme } from 'react-native';
import { DARK_THEME_ID, LIGHT_THEME_ID, ThemeProvider, useTheme, useUpdateTheme } from './../src/utils/ThemeContext';
import { Story } from '@storybook/react-native';

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const Root = ({ Story }: { Story: Story }) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const updateTheme = useUpdateTheme();

  useEffect(() => {
    if (colorScheme === 'light') {
      updateTheme(LIGHT_THEME_ID);
    } else {
      updateTheme(DARK_THEME_ID);
    }
  }, [colorScheme]);
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        flex: 1,
        backgroundColor: theme.colors.surfaceExtraDim,
      }}
    >
      <Story />
    </View>
  );
};

export const decorators = [
  (Story: Story) => {
    return (
      <ThemeProvider>
        <Root Story={Story} />
      </ThemeProvider>
    );
  },
];
