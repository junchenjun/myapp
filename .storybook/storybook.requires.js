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
    "./src/components/atoms/button/Button.stories.tsx": require("../src/components/atoms/button/Button.stories.tsx"),
    "./src/components/atoms/card/Card.stories.tsx": require("../src/components/atoms/card/Card.stories.tsx"),
    "./src/components/atoms/icon/Icon.stories.tsx": require("../src/components/atoms/icon/Icon.stories.tsx"),
    "./src/components/atoms/label/Label.stories.tsx": require("../src/components/atoms/label/Label.stories.tsx"),
    "./src/components/atoms/menuItem/MenuItem.stories.tsx": require("../src/components/atoms/menuItem/MenuItem.stories.tsx"),
    "./src/components/atoms/selectItem/SelectItem.stories.tsx": require("../src/components/atoms/selectItem/SelectItem.stories.tsx"),
    "./src/components/atoms/text/Text.stories.tsx": require("../src/components/atoms/text/Text.stories.tsx"),
    "./src/components/molecules/accordion/Accordion.stories.tsx": require("../src/components/molecules/accordion/Accordion.stories.tsx"),
    "./src/components/molecules/weeklyActivity/WeeklyActivity.stories.tsx": require("../src/components/molecules/weeklyActivity/WeeklyActivity.stories.tsx"),
    "./src/components/organisms/workoutItem/WorkoutItem.stories.tsx": require("../src/components/organisms/workoutItem/WorkoutItem.stories.tsx"),
  };
};

configure(getStories, module, false);
