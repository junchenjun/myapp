import React from "react";
import { View } from "react-native";
import { ThemeProvider } from './../src/utils/ThemeContext';
import { Story } from "@storybook/react-native";


export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story: Story) => (
    <ThemeProvider>
      <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, flex: 1 }}>
        <Story />
      </View>
    </ThemeProvider>
  ),
];