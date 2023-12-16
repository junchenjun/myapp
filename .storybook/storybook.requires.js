/* do not change this file, it is auto generated by storybook. */

import {
  configure,
  addDecorator,
  addParameters,
  addArgsEnhancer,
  clearDecorators,
} from "@storybook/react-native";

global.STORIES = [
  {
    titlePrefix: "",
    directory: "./components",
    files: "**/*.stories.?(ts|tsx|js|jsx)",
    importPathMatcher:
      "^\\.[\\\\/](?:components(?:\\/(?!\\.)(?:(?:(?!(?:^|\\/)\\.).)*?)\\/|\\/|$)(?!\\.)(?=.)[^/]*?\\.stories\\.(?:ts|tsx|js|jsx)?)$",
  },
];

import "@storybook/addon-ondevice-controls/register";
import "@storybook/addon-ondevice-actions/register";

import { argsEnhancers } from "@storybook/addon-actions/dist/modern/preset/addArgs";

import { decorators, parameters } from "./preview";

if (decorators) {
  if (__DEV__) {
    // stops the warning from showing on every HMR
    require("react-native").LogBox.ignoreLogs([
      "`clearDecorators` is deprecated and will be removed in Storybook 7.0",
    ]);
  }
  // workaround for global decorators getting infinitely applied on HMR, see https://github.com/storybookjs/react-native/issues/185
  clearDecorators();
  decorators.forEach((decorator) => addDecorator(decorator));
}

if (parameters) {
  addParameters(parameters);
}

try {
  argsEnhancers.forEach((enhancer) => addArgsEnhancer(enhancer));
} catch {}

const getStories = () => {
  return {
    "./components/accordion/Accordion.stories.tsx": require("../components/accordion/Accordion.stories.tsx"),
    "./components/button/Button.stories.tsx": require("../components/button/Button.stories.tsx"),
    "./components/card/Card.stories.tsx": require("../components/card/Card.stories.tsx"),
    "./components/label/Label.stories.tsx": require("../components/label/Label.stories.tsx"),
    "./components/menuItem/MenuItem.stories.tsx": require("../components/menuItem/MenuItem.stories.tsx"),
    "./components/pressable/Pressable.stories.tsx": require("../components/pressable/Pressable.stories.tsx"),
    "./components/selectButton/SelectButton.stories.tsx": require("../components/selectButton/SelectButton.stories.tsx"),
    "./components/text/Text.stories.tsx": require("../components/text/Text.stories.tsx"),
    "./components/workoutContainer/WorkoutContainer.stories.tsx": require("../components/workoutContainer/WorkoutContainer.stories.tsx"),
  };
};

configure(getStories, module, false);
