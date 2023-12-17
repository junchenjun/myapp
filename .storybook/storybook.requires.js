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
    directory: "./src/components",
    files: "**/*.stories.?(ts|tsx|js|jsx)",
    importPathMatcher:
      "^\\.[\\\\/](?:src\\/components(?:\\/(?!\\.)(?:(?:(?!(?:^|\\/)\\.).)*?)\\/|\\/|$)(?!\\.)(?=.)[^/]*?\\.stories\\.(?:ts|tsx|js|jsx)?)$",
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
    "./src/components/accordion/Accordion.stories.tsx": require("../src/components/accordion/Accordion.stories.tsx"),
    "./src/components/button/Button.stories.tsx": require("../src/components/button/Button.stories.tsx"),
    "./src/components/card/Card.stories.tsx": require("../src/components/card/Card.stories.tsx"),
    "./src/components/label/Label.stories.tsx": require("../src/components/label/Label.stories.tsx"),
    "./src/components/menuItem/MenuItem.stories.tsx": require("../src/components/menuItem/MenuItem.stories.tsx"),
    "./src/components/pressable/Pressable.stories.tsx": require("../src/components/pressable/Pressable.stories.tsx"),
    "./src/components/selectButton/SelectButton.stories.tsx": require("../src/components/selectButton/SelectButton.stories.tsx"),
    "./src/components/text/Text.stories.tsx": require("../src/components/text/Text.stories.tsx"),
    "./src/components/workoutContainer/WorkoutContainer.stories.tsx": require("../src/components/workoutContainer/WorkoutContainer.stories.tsx"),
  };
};

configure(getStories, module, false);
