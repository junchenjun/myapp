import React, { useEffect } from 'react';
import { ScrollView, View, useColorScheme } from 'react-native';
import { ThemeProvider, appColorScheme, useTheme, useUpdateTheme } from '../src/theme/ThemeContext';
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
      updateTheme(appColorScheme.light, false);
    } else {
      updateTheme(appColorScheme.dark, false);
    }
  }, [colorScheme]);
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 15,
        minHeight: '100%',
        width: '100%',
        backgroundColor: theme.colors.surfaceExtraDim,
        overflow: 'hidden',
      }}
    >
      <Story />
    </ScrollView>
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
