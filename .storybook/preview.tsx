import React, { useEffect } from 'react';
import { View, useColorScheme } from 'react-native';
import { ThemeProvider, appThemes, useTheme, useUpdateTheme } from '../src/theme/ThemeContext';
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
      updateTheme(appThemes.light);
    } else {
      updateTheme(appThemes.dark);
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
